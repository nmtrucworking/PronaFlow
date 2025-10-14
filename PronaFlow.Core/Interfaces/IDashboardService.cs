using PronaFlow.Core.DTOs.Dashboard;
using System.Threading.Tasks;

namespace PronaFlow.Core.Interfaces;

public interface IDashboardService
{
    Task<DashboardStatsDto> GetStatisticsAsync(long userId);
}