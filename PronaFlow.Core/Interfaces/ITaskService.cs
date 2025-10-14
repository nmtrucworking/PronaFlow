using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.DTOs.Project;
using PronaFlow.Core.DTOs.Task;

namespace PronaFlow.Core.Interfaces;

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetTasksForProjectAsync(long projectId, long userId, TaskQueryParameters queryParams);
    Task<TaskDto> CreateTaskAsync(long taskListId, TaskCreateDto dto, long creatorId);
    Task<bool> SoftDeleteTaskAsync(long taskId, long userId);

    Task<bool> AssignUserToTaskAsync(long taskId, long assigneeId, long currentUserId);
    Task<bool> UnassignUserFromTaskAsync(long taskId, long assigneeId, long currentUserId);

    Task<IEnumerable<TaskDto>> GetUpcomingTasksForUserAsync(long userId);
}