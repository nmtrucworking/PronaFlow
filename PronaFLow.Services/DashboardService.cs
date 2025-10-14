using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Dashboard;
using PronaFlow.Core.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PronaFlow.Services;

public class DashboardService : IDashboardService
{
    private readonly PronaFlowDbContext _context;

    public DashboardService(PronaFlowDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardStatsDto> GetStatisticsAsync(long userId)
    {
        // 1. Đếm tổng số dự án mà người dùng là thành viên và dự án đó chưa bị xóa hoặc lưu trữ.
        var totalProjects = await _context.ProjectMembers
            .CountAsync(pm => pm.UserId == userId && !pm.Project.IsDeleted && !pm.Project.IsArchived);

        // 2. Lấy các công việc được gán cho người dùng mà chưa bị xóa.
        var userTasks = _context.Tasks
            .Where(t => t.Users.Any(u => u.Id == userId) && !t.IsDeleted);

        // 3. Đếm số công việc đang trong trạng thái "in-progress".
        var tasksInProgress = await userTasks
            .CountAsync(t => t.Status == "in-progress");

        // 4. Đếm số công việc đã quá hạn (ngày kết thúc trong quá khứ và trạng thái chưa phải là "done").
        var today = DateTime.UtcNow;
        var tasksOverdue = await userTasks
            .CountAsync(t => t.EndDate < today && t.Status != "done");

        var stats = new DashboardStatsDto
        {
            TotalProjects = totalProjects,
            TasksInProgress = tasksInProgress,
            TasksOverdue = tasksOverdue
        };

        return stats;
    }
}