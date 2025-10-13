using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Member;
using PronaFlow.Core.DTOs.Project;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System.Security;

namespace PronaFlow.Services;

public class ProjectService : IProjectService
{
    private readonly PronaFlowDbContext _context;
    private readonly IActivityService _activityService; 

    public ProjectService(PronaFlowDbContext context, IActivityService activityService)
    {
        _context = context;
        _activityService = activityService;
    }

    public async Task<ProjectDto> CreateProjectAsync(long workspaceId, ProjectCreateDto projectDto, long creatorId)
    {
        // Check if the workspace exists and belongs to the creator
        var workspace = await _context.Workspaces
            .FirstOrDefaultAsync(w => w.Id == workspaceId && w.OwnerId == creatorId);

        if (workspace == null)
        {
            throw new SecurityException("Workspace not found or permission denied.");
        }

        var project = new Project
        {
            WorkspaceId = workspaceId,
            Name = projectDto.Name,
            Status = projectDto.Status,
            ProjectType = "personal", // default value is 'personal'
            IsArchived = false,
            IsDeleted = false
        };

        await _context.Projects.AddAsync(project);
        await _context.SaveChangesAsync(); 

        //
        var projectMember = new ProjectMember
        {
            ProjectId = project.Id,
            UserId = creatorId,
            Role = "admin" // Creator is admin by default
        };

        await _context.ProjectMembers.AddAsync(projectMember);
        await _context.SaveChangesAsync();

        await _activityService.LogActivityAsync(creatorId, "project_create", project.Id, "project");

        // Map a new DTO to return
        return new ProjectDto
        {
            Id = project.Id,
            WorkspaceId = project.WorkspaceId,
            Name = project.Name,
            Status = project.Status,
            ProjectType = project.ProjectType
        };
    }

    public async Task<IEnumerable<ProjectDto>> GetProjectsByWorkspaceAsync(long workspaceId, long userId)
    {
        // Return projects where the user is a member and not deleted
        return await _context.Projects
            .Where(p => p.WorkspaceId == workspaceId && p.IsDeleted == false && p.ProjectMembers.Any(pm => pm.UserId == userId))
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                WorkspaceId = p.WorkspaceId,
                Name = p.Name,
                Description = p.Description,
                CoverImageUrl = p.CoverImageUrl,
                Status = p.Status,
                ProjectType = p.ProjectType,
                StartDate = p.StartDate,
                EndDate = p.EndDate
            })
            .ToListAsync();
    }

    // Return a project by ID if the user is a member of that project
    public async Task<ProjectDto?> GetProjectByIdAsync(long projectId, long userId)
    {
        return await _context.Projects
            .AsNoTracking()
            .Where(p => p.Id == projectId && p.IsDeleted == false && p.ProjectMembers.Any(pm => pm.UserId == userId))
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                WorkspaceId = p.WorkspaceId,
                Name = p.Name,
                Description = p.Description,
                CoverImageUrl = p.CoverImageUrl,
                Status = p.Status,
                ProjectType = p.ProjectType,
                StartDate = p.StartDate,
                EndDate = p.EndDate
            })
            .FirstOrDefaultAsync();
    }

    // Update project details if the user is an admin of that project
    public async Task<bool> UpdateProjectAsync(long projectId, ProjectUpdateDto projectDto, long userId)
    {
        var project = await _context.Projects
            .Include(p => p.ProjectMembers)
            .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project == null) return false;

        // Check authorization: is the user an admin of this project?
        var isUserAdmin = project.ProjectMembers.Any(pm => pm.UserId == userId && pm.Role == "admin");
        if (!isUserAdmin)
        {
            throw new SecurityException("Permission denied to update this project.");
        }

        // Update the project details
        project.Name = projectDto.Name;
        project.Description = projectDto.Description;
        project.CoverImageUrl = projectDto.CoverImageUrl;
        project.Status = projectDto.Status;
        project.StartDate = projectDto.StartDate;
        project.EndDate = projectDto.EndDate;

        return await _context.SaveChangesAsync() > 0; 
        // Return true if at least one record was updated.
    }



    public async Task<bool> SoftDeleteProjectAsync(long projectId, long userId)
    {
        var project = await _context.Projects
            .Include(p => p.ProjectMembers)
            .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project == null) return false;

        // Check if the user is an admin of this project -> only admin can delete
        var member = project.ProjectMembers.FirstOrDefault(pm => pm.UserId == userId);
        if (member == null || member.Role != "admin")
        {
            throw new SecurityException("Permission denied to delete this project.");
        }

        project.IsDeleted = true; 
        project.DeletedAt = DateTime.UtcNow;

        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<MemberDto>> GetProjectMembersAsync(long projectId, long userId)
    {
        var isCurrentUserMember = await _context.ProjectMembers
            .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);

        if (!isCurrentUserMember)
        {
            throw new SecurityException("Access denied. You are not a member of this project.");
        }

        return await _context.ProjectMembers
            .Include(pm => pm.User)
            .Where(pm => pm.ProjectId == projectId)
            .Select(pm => new MemberDto
            {
                UserId = pm.UserId,
                FullName = pm.User.FullName,
                Email = pm.User.Email,
                Role = pm.Role
            })
            .ToListAsync();
    }

    public async Task<MemberDto?> AddMemberToProjectAsync(long projectId, AddMemberRequestDto dto, long currentUserId)
    {
        var project = await _context.Projects.FindAsync(projectId);
        if (project == null) return null;

        // Kiểm tra quyền: Chỉ admin của dự án mới được thêm thành viên
        var currentUserMembership = await _context.ProjectMembers
            .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId);

        if (currentUserMembership?.Role != "admin")
        {
            throw new SecurityException("Only project admins can add new members.");
        }

        var userToAdd = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (userToAdd == null)
        {
            // Trong tương lai, bạn có thể tích hợp hệ thống gửi lời mời (invitations) ở đây
            throw new KeyNotFoundException($"User with email {dto.Email} not found.");
        }

        var isAlreadyMember = await _context.ProjectMembers
            .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == userToAdd.Id);
        if (isAlreadyMember)
        {
            throw new InvalidOperationException("User is already a member of this project.");
        }

        // Tự động chuyển project type từ 'personal' sang 'team' khi mời thành viên đầu tiên
        //
        if (project.ProjectType == "personal")
        {
            project.ProjectType = "team";
        }

        var newMember = new ProjectMember
        {
            ProjectId = projectId,
            UserId = userToAdd.Id,
            Role = dto.Role
        };

        await _context.ProjectMembers.AddAsync(newMember);
        await _context.SaveChangesAsync();

        // Ghi lại hoạt động
        await _activityService.LogActivityAsync(currentUserId, "project_add_member", projectId, "project", $"{{ \"memberId\": {userToAdd.Id} }}");
        return new MemberDto { 
           //
        };
    }

    public async Task<bool> RemoveMemberFromProjectAsync(long projectId, long memberIdToRemove, long currentUserId)
    {
        // Kiểm tra quyền: Chỉ admin của dự án mới được xóa thành viên
        var currentUserMembership = await _context.ProjectMembers
            .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId);

        if (currentUserMembership?.Role != "admin")
        {
            throw new SecurityException("Only project admins can remove members.");
        }

        var memberToRemove = await _context.ProjectMembers
            .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == memberIdToRemove);

        if (memberToRemove == null) return false;

        // TODO: Thêm logic phức tạp hơn, ví dụ: không cho xóa admin cuối cùng của dự án

        _context.ProjectMembers.Remove(memberToRemove);
        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            // Ghi lại hoạt động
            await _activityService.LogActivityAsync(currentUserId, "project_remove_member", projectId, "project", $"{{ \"removed_user_id\": {memberIdToRemove} }}");
        }

        return success;
    }
}