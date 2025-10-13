using PronaFlow.Core.DTOs.Member;
using PronaFlow.Core.DTOs.Project;

namespace PronaFlow.Core.Interfaces;

public interface IProjectService
{
    Task<ProjectDto> CreateProjectAsync(long workspaceId, ProjectCreateDto projectDto, long creatorId);
    Task<IEnumerable<ProjectDto>> GetProjectsByWorkspaceAsync(long workspaceId, long userId);
    Task<ProjectDto?> GetProjectByIdAsync(long projectId, long userId);
    Task<bool> UpdateProjectAsync(long projectId, ProjectUpdateDto projectDto, long userId);
    Task<bool> SoftDeleteProjectAsync(long projectId, long userId);

    // Methods for Member
    Task<IEnumerable<MemberDto>> GetProjectMembersAsync(long projectId, long userId);
    Task<MemberDto?> AddMemberToProjectAsync(long projectId, AddMemberRequestDto dto, long currentUserId);
    Task<bool> RemoveMemberFromProjectAsync(long projectId, long memberIdToRemove, long currentUserId);
}