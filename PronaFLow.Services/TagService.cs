using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Tag;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System.Security;

namespace PronaFlow.Services;

public class TagService : ITagService
{
    private readonly PronaFlowDbContext _context;
    private readonly IActivityService _activityService;

    public TagService(PronaFlowDbContext context, IActivityService activityService)
    {
        _context = context;
        _activityService = activityService;
    }

    private async Task CheckWorkspaceOwnershipAsync(long workspaceId, long userId)
    {
        var isOwner = await _context.Workspaces.AnyAsync(w => w.Id == workspaceId && w.OwnerId == userId);
        if (!isOwner)
        {
            throw new SecurityException("Permission denied to access this workspace.");
        }
    }

    public async Task<TagDto> CreateTagAsync(long workspaceId, TagCreateDto dto, long userId)
    {
        await CheckWorkspaceOwnershipAsync(workspaceId, userId);

        var tag = new Tag
        {
            WorkspaceId = workspaceId,
            Name = dto.Name,
            ColorHex = dto.ColorHex
        };

        await _context.Tags.AddAsync(tag);
        await _context.SaveChangesAsync();

        return new TagDto { Id = tag.Id, Name = tag.Name, ColorHex = tag.ColorHex };
    }

    public async Task<bool> DeleteTagAsync(long tagId, long userId)
    {
        var tag = await _context.Tags.FindAsync(tagId);
        if (tag == null) return false;

        await CheckWorkspaceOwnershipAsync(tag.WorkspaceId, userId);

        // Quan trọng: Trước khi xóa tag, xóa tất cả các liên kết của nó với các project
        //
        // EF Core 5+ sẽ tự động xử lý việc xóa khỏi bảng nối khi mối quan hệ nhiều-nhiều được cấu hình.
        // Tuy nhiên, để chắc chắn, chúng ta có thể làm thủ công nếu cần.
        _context.Tags.Remove(tag);

        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<TagDto>> GetTagsForWorkspaceAsync(long workspaceId, long userId)
    {
        await CheckWorkspaceOwnershipAsync(workspaceId, userId);
        return await _context.Tags
            .Where(t => t.WorkspaceId == workspaceId)
            .Select(t => new TagDto { Id = t.Id, Name = t.Name, ColorHex = t.ColorHex })
            .ToListAsync();
    }

    public async Task<bool> AssignTagsToProjectAsync(long projectId, List<long> tagIds, long userId)
    {
        var project = await _context.Projects
            .Include(p => p.Tags) // Nạp các tags hiện có
            .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project == null) return false;

        // Kiểm tra người dùng có phải là thành viên của dự án không
        var isMember = await _context.ProjectMembers.AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);
        if (!isMember)
        {
            throw new SecurityException("Permission denied to assign tags to this project.");
        }

        // Tìm các tag object từ danh sách tagIds
        var tagsToAssign = await _context.Tags
            .Where(t => tagIds.Contains(t.Id) && t.WorkspaceId == project.WorkspaceId) // Đảm bảo tags thuộc cùng workspace
            .ToListAsync();

        // Chiến lược "Thay thế toàn bộ"
        project.Tags = tagsToAssign;

        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            await _activityService.LogActivityAsync(userId, "project_update_tags", projectId, "project");
        }

        return success;
    }
}