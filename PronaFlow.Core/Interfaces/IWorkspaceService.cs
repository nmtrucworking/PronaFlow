/* 
 * IWorkspaceService.cs
 * 
 */

using PronaFlow.Core.DTOs.Workspace;
using PronaFlow.Core.Models;

namespace PronaFlow.Core.Interfaces;

public interface IWorkspaceService
{
    Task<IEnumerable<WorkspaceDto>> GetWorkspacesForUserAsync(long userId);
    Task<WorkspaceDto?> GetWorkspaceByIdAsync(long workspaceId, long userId);
    Task<WorkspaceDto> CreateWorkspaceAsync(WorkspaceCreateDto workspaceDto, long userId);
    Task<bool> UpdateWorkspaceAsync(long workspaceId, WorkspaceCreateDto workspaceDto, long userId);
    Task<(bool Success, string? Error)> DeleteWorkspaceAsync(long workspaceId, long userId);
}