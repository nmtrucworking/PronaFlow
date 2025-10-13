using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Comment;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System.Security;

namespace PronaFlow.Services;

public class CommentService : ICommentService
{
    private readonly PronaFlowDbContext _context;
    private readonly IActivityService _activityService;

    public CommentService(PronaFlowDbContext context, IActivityService activityService)
    {
        _context = context;
        _activityService = activityService;
    }

    // Helper để kiểm tra quyền truy cập vào đối tượng cha
    private async Task CheckTargetAccessAsync(string commentableType, long commentableId, long userId)
    {
        bool hasAccess = false;
        if (commentableType.Equals("project", StringComparison.OrdinalIgnoreCase))
        {
            hasAccess = await _context.ProjectMembers.AnyAsync(pm => pm.ProjectId == commentableId && pm.UserId == userId);
        }
        else if (commentableType.Equals("task", StringComparison.OrdinalIgnoreCase))
        {
            hasAccess = await _context.Tasks
                .Where(t => t.Id == commentableId)
                .AnyAsync(t => t.Project.ProjectMembers.Any(pm => pm.UserId == userId));
        }

        if (!hasAccess)
        {
            throw new SecurityException($"Permission denied to access {commentableType} with ID {commentableId}.");
        }
    }

    public async Task<CommentDto> CreateCommentAsync(string commentableType, long commentableId, CommentCreateDto dto, long userId)
    {
        await CheckTargetAccessAsync(commentableType, commentableId, userId);

        var comment = new Comment
        {
            UserId = userId,
            Content = dto.Content,
            CommentableId = commentableId,
            CommentableType = commentableType.ToLower(),
            CreatedAt = DateTime.UtcNow
        };

        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();

        // Ghi lại hoạt động
        await _activityService.LogActivityAsync(userId, "comment_add", commentableId, commentableType, dto.Content);

        // Cần truy vấn lại để lấy UserFullName
        var createdComment = await _context.Comments
            .Include(c => c.User)
            .Where(c => c.Id == comment.Id)
            .Select(c => new CommentDto
            {
                Id = c.Id,
                Content = c.Content,
                UserId = c.UserId,
                UserFullName = c.User.FullName,
                CreatedAt = c.CreatedAt
            })
            .FirstAsync();

        return createdComment;
    }

    public async Task<bool> DeleteCommentAsync(long commentId, long userId)
    {
        var comment = await _context.Comments.FindAsync(commentId);
        if (comment == null) return false;

        // Chỉ người tạo comment mới được xóa
        if (comment.UserId != userId)
        {
            throw new SecurityException("Only the author can delete this comment.");
        }

        _context.Comments.Remove(comment);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<CommentDto>> GetCommentsForTargetAsync(string commentableType, long commentableId, long userId)
    {
        await CheckTargetAccessAsync(commentableType, commentableId, userId);

        return await _context.Comments
            .Include(c => c.User) // Join với bảng User để lấy tên
            .Where(c => c.CommentableType == commentableType.ToLower() && c.CommentableId == commentableId)
            .OrderBy(c => c.CreatedAt)
            .Select(c => new CommentDto
            {
                Id = c.Id,
                Content = c.Content,
                UserId = c.UserId,
                UserFullName = c.User.FullName,
                CreatedAt = c.CreatedAt
            })
            .ToListAsync();
    }
}