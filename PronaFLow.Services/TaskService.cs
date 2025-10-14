using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Task;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace PronaFlow.Services;

public class TaskService : ITaskService
{
    private readonly PronaFlowDbContext _context;
    private readonly IActivityService _activityService;

    public TaskService(PronaFlowDbContext context, IActivityService activityService)
    {
        _context = context;
        _activityService = activityService;

    }

    private async Task CheckProjectMembershipAsync(long projectId, long userId)
    {
        var isMember = await _context.ProjectMembers
            .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);

        if (!isMember)
        {
            throw new SecurityException("User is not a member of this project.");
        }
    }

    public async Task<TaskDto> CreateTaskAsync(long taskListId, TaskCreateDto dto, long creatorId)
    {
        var taskList = await _context.TaskLists.FindAsync(taskListId);
        if (taskList == null)
        {
            throw new KeyNotFoundException("TaskList not found.");
        }

        await CheckProjectMembershipAsync(taskList.ProjectId, creatorId);

        var task = new PronaTask
        {
            ProjectId = taskList.ProjectId,
            TaskListId = taskListId,
            Name = dto.Name,
            Description = dto.Description,
            Priority = dto.Priority,
            CreatorId = creatorId,
            Status = "not-started", // Trạng thái mặc định khi tạo
            IsDeleted = false,
            CreatedAt = DateTime.UtcNow
        };

        // Assignees
        if (dto.AssigneeIds != null && dto.AssigneeIds.Any())
        {
            var assignees = await _context.Users
                .Where(u => dto.AssigneeIds.Contains(u.Id))
                .ToListAsync();
            task.Users = assignees; // Gán danh sách user vào navigation property
        }

        await _context.Tasks.AddAsync(task);
        await _context.SaveChangesAsync();

        await _activityService.LogActivityAsync(creatorId, "task_create", task.Id, "task", content: task.Name);
        if (task.Users.Any())
        {
            foreach (var user in task.Users)
            {
                await _activityService.LogActivityAsync(creatorId, "task_assign", task.Id, "task", $"{{ \"assignee_id\": {user.Id} }}");
            }
        }

        return new TaskDto
        {
            Id = task.Id,
            ProjectId = task.ProjectId,
            TaskListId = task.TaskListId,
            Name = task.Name,
            Description = task.Description,
            Priority = task.Priority,
            Status = task.Status,
            CreatorId = task.CreatorId
        };
    }

    public async Task<bool> SoftDeleteTaskAsync(long taskId, long userId)
    {
        var task = await _context.Tasks.FindAsync(taskId);
        if (task == null) return false;

        await CheckProjectMembershipAsync(task.ProjectId, userId);

        task.IsDeleted = true; // Thực hiện xóa mềm
        task.DeletedAt = DateTime.UtcNow;

        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<TaskDto>> GetTasksForProjectAsync(long projectId, long userId, TaskQueryParameters queryParams)
    {
        await CheckProjectMembershipAsync(projectId, userId);

        // Bắt đầu xây dựng câu truy vấn, chưa thực thi
        var query = _context.Tasks
            .Where(t => t.ProjectId == projectId && t.IsDeleted == false);

        // 1. Áp dụng logic Tìm kiếm (Search)
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            query = query.Where(t => t.Name.Contains(queryParams.Search) || (t.Description != null && t.Description.Contains(queryParams.Search)));
        }

        // 2. Áp dụng logic Lọc (Filter)
        if (!string.IsNullOrEmpty(queryParams.FilterByStatus))
        {
            query = query.Where(t => t.Status == queryParams.FilterByStatus);
        }

        if (queryParams.FilterByAssigneeId.HasValue)
        {
            query = query.Where(t => t.Users.Any(u => u.Id == queryParams.FilterByAssigneeId.Value));
        }

        // 3. Áp dụng logic Sắp xếp (Sort)
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            // Mặc định sắp xếp tăng dần
            bool isDescending = queryParams.SortDir?.ToLower() == "desc";

            switch (queryParams.SortBy.ToLower())
            {
                case "enddate":
                    query = isDescending ? query.OrderByDescending(t => t.EndDate) : query.OrderBy(t => t.EndDate);
                    break;
                case "name":
                    query = isDescending ? query.OrderByDescending(t => t.Name) : query.OrderBy(t => t.Name);
                    break;
                case "priority":
                    // Sắp xếp Priority cần logic phức tạp hơn một chút nếu muốn "high" > "normal" > "low"
                    // Tạm thời sắp xếp theo alphabet
                    query = isDescending ? query.OrderByDescending(t => t.Priority) : query.OrderBy(t => t.Priority);
                    break;
                default:
                    query = query.OrderBy(t => t.Id); // Sắp xếp mặc định
                    break;
            }
        }
        else
        {
            query = query.OrderBy(t => t.Id);
        }

        // Cuối cùng, thực thi câu truy vấn và map sang DTO
        return await query
            .Select(t => new TaskDto
            {
                Id = t.Id,
                ProjectId = t.ProjectId,
                TaskListId = t.TaskListId,
                Name = t.Name,
                Status = t.Status,
                Priority = t.Priority,
                //EndDate = t.EndDate
                // ... các trường khác
            })
            .ToListAsync();
    }
    public async Task<bool> AssignUserToTaskAsync(long taskId, long assigneeId, long currentUserId)
    {
        var task = await _context.Tasks.Include(t => t.Users).FirstOrDefaultAsync(t => t.Id == taskId);
        if (task == null) return false;

        // Kiểm tra quyền: người dùng hiện tại phải là thành viên dự án
        await CheckProjectMembershipAsync(task.ProjectId, currentUserId);

        // Kiểm tra người được gán cũng phải là thành viên dự án
        var assignee = await _context.Users.FindAsync(assigneeId);
        if (assignee == null) throw new KeyNotFoundException("Assignee user not found.");
        await CheckProjectMembershipAsync(task.ProjectId, assigneeId);

        if (task.Users.Any(u => u.Id == assigneeId))
        {
            return true; // Đã được gán từ trước, coi như thành công
        }

        task.Users.Add(assignee);
        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            await _activityService.LogActivityAsync(currentUserId, "task_assign", taskId, "task", $"{{ \"assigneeId\": {assigneeId} }}");
        }

        return success;
    }

    public async Task<bool> UnassignUserFromTaskAsync(long taskId, long assigneeId, long currentUserId)
    {
        var task = await _context.Tasks.Include(t => t.Users).FirstOrDefaultAsync(t => t.Id == taskId);
        if (task == null) return false;

        await CheckProjectMembershipAsync(task.ProjectId, currentUserId);

        var assigneeToRemove = task.Users.FirstOrDefault(u => u.Id == assigneeId);
        if (assigneeToRemove == null)
        {
            return true; // Không có trong danh sách, coi như thành công
        }

        task.Users.Remove(assigneeToRemove);
        // ... Ghi log hoạt động bỏ gán
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<TaskDto>> GetUpcomingTasksForUserAsync(long userId)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var upcomingLimit = today.AddDays(7); // Lấy các công việc trong vòng 7 ngày tới

        var upcomingTasks = await _context.Tasks
            // Chỉ lấy các task được gán cho người dùng này
            .Where(t => t.Users.Any(u => u.Id == userId))
            // Loại bỏ các task đã xóa hoặc đã hoàn thành
            .Where(t => !t.IsDeleted && t.Status != "done")
            // Lọc các task có ngày hết hạn trong tương lai gần
            .Where(t => t.EndDate != null && t.EndDate.Value.Date >= DateTime.UtcNow.Date && t.EndDate.Value.Date <= DateTime.UtcNow.Date.AddDays(7))
            // Sắp xếp các task đến hạn sớm nhất lên đầu
            .OrderBy(t => t.EndDate)
            // Giới hạn số lượng kết quả để tránh quá tải
            .Take(10)
            .Select(t => new TaskDto
            {
                Id = t.Id,
                Name = t.Name,
                Status = t.Status,
                Priority = t.Priority,
                //EndDate = t.EndDate,
                ProjectId = t.ProjectId,
                // Bạn có thể join thêm để lấy ProjectName và TaskListName nếu cần
                // ProjectName = t.Project.Name, 
                // TaskListName = t.TaskList.Name 
            })
            .ToListAsync();

        return upcomingTasks;
    }
}

