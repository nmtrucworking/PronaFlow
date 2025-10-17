using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Admin;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
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

            // Dữ liệu tăng trưởng người dùng trong 7 ngày gần nhất
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

        // ... (Triển khai các phương thức còn lại cho Project, Logs, Update Role, Deactivate,...)
        // Ví dụ cho GetAllProjectsAsync
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

        private int GetCurrentAdminId()
        {
            // Lấy ID từ claims của JWT token
            var userIdClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                throw new UnauthorizedAccessException("Cannot identify current admin user.");
            }
            return userId;
        }

        public async Task<bool> UpdateUserRoleAsync(int userId, string newRole)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return false; // Hoặc ném ra một Exception cụ thể
            }

            var adminId = GetCurrentAdminId();

            // Validate newRole
            if (newRole.ToLower() != "admin" && newRole.ToLower() != "user")
            {
                throw new ArgumentException("Invalid role specified.");
            }

            user.Role = newRole.ToLower();
            // Ghi lại hoạt động này
            _context.Activities.Add(new Activity
            {
                UserId = adminId, 
                ActionType = "admin_update_role",
                TargetId = user.Id,
                TargetType = "User",
                Content = $"Admin changed role of user '{user.FullName}' to '{newRole}'."
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

            user.IsDeleted = true;
            user.DeletedAt = DateTime.UtcNow;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RestoreUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null || !user.IsDeleted)
            {
                return false;
            }

            user.IsDeleted = false;
            user.DeletedAt = null;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ArchiveProjectAsync(int projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null || project.IsArchived) return false;

            project.IsArchived = true;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UnarchiveProjectAsync(int projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null || !project.IsArchived) return false;

            project.IsArchived = false;
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

            return await query
                .OrderByDescending(a => a.CreatedAt)
                .Take(100) // ✨ Giới hạn kết quả để tránh quá tải, nên kết hợp phân trang
                .Select(a => new AdminActivityLogDto
                {
                    Id = (int)a.Id,
                    CreatedAt = a.CreatedAt,
                    UserId = (int)a.UserId,
                    UserFullName = a.User.FullName,
                    ActionType = a.ActionType,
                    TargetType = a.TargetType,
                    TargetId = a.TargetId,
                    Description = a.Description
                })
                .ToListAsync();
        }
    }
}