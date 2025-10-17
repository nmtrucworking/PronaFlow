using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Admin;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PronaFlow.Services
{
    public class AdminService : IAdminService
    {
        private readonly PronaFlowDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AdminService(PronaFlowDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<AdminDashboardStatsDto> GetDashboardStatsAsync()
        {
            var totalUsers = await _context.Users.CountAsync();
            var activeProjects = await _context.Projects.CountAsync(p => !p.IsDeleted && !p.IsArchived);
            var totalWorkspaces = await _context.Workspaces.CountAsync();
            var totalTasks = await _context.Tasks.CountAsync();

            var userGrowth = await _context.Users
                .Where(u => u.CreatedAt >= DateTime.UtcNow.AddDays(-7))
                .GroupBy(u => u.CreatedAt.Date)
                .Select(g => new UserGrowthDto { Date = g.Key.ToString("MMM dd"), Count = g.Count() })
                .OrderBy(g => g.Date)
                .ToListAsync();

            return new AdminDashboardStatsDto
            {
                TotalUsers = totalUsers,
                ActiveProjects = activeProjects,
                TotalWorkspaces = totalWorkspaces,
                TotalTasks = totalTasks,
                UserGrowth = userGrowth
            };
        }

        public async Task<IEnumerable<AdminUserViewDto>> GetAllUsersAsync()
        {
            return await _context.Users
                .Select(u => new AdminUserViewDto
                {
                    Id = (int)u.Id,
                    FullName = u.FullName,
                    Email = u.Email,
                    Role = u.Role,
                    CreatedAt = u.CreatedAt,
                    IsDeleted = u.IsDeleted
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<AdminProjectViewDto>> GetAllProjectsAsync()
        {
            return await _context.Projects
                .Include(p => p.Workspace)
                .ThenInclude(w => w.Owner)
                .Include(p => p.ProjectMembers)
                .Select(p => new AdminProjectViewDto
                {
                    Id = (int)p.Id,
                    ProjectName = p.Name,
                    WorkspaceName = p.Workspace.Name,
                    WorkspaceOwner = p.Workspace.Owner.FullName,
                    MemberCount = p.ProjectMembers.Count(),
                    Status = p.Status,
                    CreatedAt = p.CreatedAt,
                    IsArchived = p.IsArchived
                }).ToListAsync();
        }

        private async Task<int> GetCurrentAdminIdAsync()
        {
            var userIdClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                throw new UnauthorizedAccessException("Cannot identify current admin user.");
            }
            // Asynchronous check could be added here if needed, for example:
            // var adminExists = await _context.Users.AnyAsync(u => u.Id == userId && u.Role == "admin");
            // if (!adminExists) throw new UnauthorizedAccessException("User is not an admin.");
            return userId;
        }

        public async Task<bool> UpdateUserRoleAsync(int userId, string newRole)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return false;
            }

            var adminId = await GetCurrentAdminIdAsync();
            var normalizedRole = newRole.ToLower();

            if (normalizedRole != "admin" && normalizedRole != "user")
            {
                throw new ArgumentException("Invalid role specified.");
            }

            user.Role = normalizedRole;
            _context.Activities.Add(new Activity
            {
                UserId = adminId,
                ActionType = "admin_update_role",
                TargetId = user.Id,
                TargetType = "User",
                Content = $"Admin changed role of user '{user.FullName}' to '{newRole}'.",
                CreatedAt = DateTime.UtcNow
            });

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeactivateUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null || user.IsDeleted)
            {
                return false;
            }

            var adminId = await GetCurrentAdminIdAsync();
            user.IsDeleted = true;
            user.DeletedAt = DateTime.UtcNow;

            _context.Activities.Add(new Activity
            {
                UserId = adminId,
                ActionType = "admin_deactivate_user",
                TargetId = user.Id,
                TargetType = "User",
                Content = $"Admin deactivated user '{user.FullName}'.",
                CreatedAt = DateTime.UtcNow
            });

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RestoreUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null || !user.IsDeleted)
            {
                return false;
            }

            var adminId = await GetCurrentAdminIdAsync();
            user.IsDeleted = false;
            user.DeletedAt = null;

            _context.Activities.Add(new Activity
            {
                UserId = adminId,
                ActionType = "admin_restore_user",
                TargetId = user.Id,
                TargetType = "User",
                Content = $"Admin restored user '{user.FullName}'.",
                CreatedAt = DateTime.UtcNow
            });

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ArchiveProjectAsync(int projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null || project.IsArchived) return false;

            var adminId = await GetCurrentAdminIdAsync();
            project.IsArchived = true;

            _context.Activities.Add(new Activity
            {
                UserId = adminId,
                ActionType = "admin_archive_project",
                TargetId = project.Id,
                TargetType = "Project",
                Content = $"Admin archived project '{project.Name}'.",
                CreatedAt = DateTime.UtcNow
            });

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UnarchiveProjectAsync(int projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null || !project.IsArchived) return false;

            var adminId = await GetCurrentAdminIdAsync();
            project.IsArchived = false;

            _context.Activities.Add(new Activity
            {
                UserId = adminId,
                ActionType = "admin_unarchive_project",
                TargetId = project.Id,
                TargetType = "Project",
                Content = $"Admin unarchived project '{project.Name}'.",
                CreatedAt = DateTime.UtcNow
            });

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<AdminActivityLogDto>> GetActivityLogsAsync(AdminLogQueryParameters queryParams)
        {
            var query = _context.Activities
                .Include(a => a.User)
                .AsNoTracking();

            if (!string.IsNullOrWhiteSpace(queryParams.User))
            {
                query = query.Where(a => a.User.FullName.Contains(queryParams.User) || a.User.Email.Contains(queryParams.User));
            }

            if (!string.IsNullOrWhiteSpace(queryParams.Action))
            {
                query = query.Where(a => a.ActionType.Contains(queryParams.Action));
            }

            // Implement pagination
            var page = queryParams.Page > 0 ? queryParams.Page : 1;
            var pageSize = queryParams.PageSize > 0 ? queryParams.PageSize : 20;

            return await query
                .OrderByDescending(a => a.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(a => new AdminActivityLogDto
                {
                    Id = (int)a.Id,
                    CreatedAt = a.CreatedAt,
                    UserId = (int)a.UserId,
                    UserFullName = a.User.FullName,
                    ActionType = a.ActionType,
                    TargetType = a.TargetType,
                    TargetId = a.TargetId,
                    Description = a.Description // Assuming 'Content' maps to 'Description'
                })
                .ToListAsync();
        }
    }
}