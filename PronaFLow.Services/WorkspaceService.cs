using Microsoft.EntityFrameworkCore;

// External Libraries
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Workspace;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using PronaFLow.Core.DTOs.Workspace;

namespace PronaFlow.Services;

public class WorkspaceService : IWorkspaceService
{
    private readonly PronaFlowDbContext _context;

    public WorkspaceService(PronaFlowDbContext context)
    {
        _context = context;
    }

    public async Task<WorkspaceDto> CreateWorkspaceAsync(WorkspaceCreateDto workspaceDto, long userId)
    {
        var workspace = new Workspace
        {
            Name = workspaceDto.Name,
            Description = workspaceDto.Description,
            OwnerId = userId
        };

        await _context.Workspaces.AddAsync(workspace);
        await _context.SaveChangesAsync();

        return new WorkspaceDto
        {
            Id = workspace.Id,
            Name = workspace.Name,
            Description = workspace.Description,
            OwnerId = workspace.OwnerId
        };
    }

    public async Task<(bool Success, string? Error)> DeleteWorkspaceAsync(long workspaceId, long userId)
    {
        var workspace = await _context.Workspaces.FirstOrDefaultAsync(w => w.Id == workspaceId && w.OwnerId == userId);

        if (workspace == null)
        {
            return (false, "Workspace not found or you don't have permission to delete it.");
        }

        var hasProjects = await _context.Projects.AnyAsync(p => p.WorkspaceId == workspaceId);
        if (hasProjects)
        {
            return (false, "Workspace is not empty. Please move or delete all projects before deleting the workspace.");
        }

        _context.Workspaces.Remove(workspace);
        await _context.SaveChangesAsync();
        return (true, null);
    }

    public async Task<WorkspaceDto?> GetWorkspaceByIdAsync(long workspaceId, long userId)
    {
        var workspace = await _context.Workspaces
            .AsNoTracking()
            .Where(w => w.Id == workspaceId && w.OwnerId == userId)
            .Select(w => new WorkspaceDto
            {
                Id = w.Id,
                Name = w.Name,
                Description = w.Description,
                OwnerId = w.OwnerId
            })
            .FirstOrDefaultAsync();

        return workspace;
    }

    public async Task<IEnumerable<WorkspaceDto>> GetWorkspacesForUserAsync(long userId)
    {
        return await _context.Workspaces
            .AsNoTracking()
            .Where(w => w.OwnerId == userId)
            .Select(w => new WorkspaceDto
            {
                Id = w.Id,
                Name = w.Name,
                Description = w.Description,
                OwnerId = w.OwnerId
            })
            .ToListAsync();
    }

    public async Task<bool> UpdateWorkspaceAsync(long workspaceId, WorkspaceCreateDto workspaceDto, long userId)
    {
        var workspace = await _context.Workspaces
            .FirstOrDefaultAsync(w => w.Id == workspaceId && w.OwnerId == userId);

        if (workspace == null)
        {
            return false; // Không tìm thấy hoặc không có quyền
        }

        workspace.Name = workspaceDto.Name;
        workspace.Description = workspaceDto.Description;

        await _context.SaveChangesAsync();
        return true;
    }

    Task<(bool Success, string? Error)> IWorkspaceService.DeleteWorkspaceAsync(long workspaceId, long userId)
    {
        throw new NotImplementedException();
    }
}
