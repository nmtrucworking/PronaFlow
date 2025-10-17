using PronaFlow.Core.DTOs.Admin;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace PronaFlow.Core.Interfaces
{
    public interface IAdminService
    {
        Task<AdminDashboardStatsDto> GetDashboardStatsAsync();
        Task<IEnumerable<AdminUserViewDto>> GetAllUsersAsync();
        Task<IEnumerable<AdminProjectViewDto>> GetAllProjectsAsync();
        Task<IEnumerable<AdminActivityLogDto>> GetActivityLogsAsync(AdminLogQueryParameters queryParams);
        Task<bool> UpdateUserRoleAsync(int userId, string newRole);
        Task<bool> DeactivateUserAsync(int userId);
        Task<bool> RestoreUserAsync(int userId);
        Task<bool> ArchiveProjectAsync(int projectId);
        Task<bool> UnarchiveProjectAsync(int projectId);
    }
}