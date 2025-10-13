using PronaFlow.Core.DTOs.TaskList;

namespace PronaFlow.Core.Interfaces;

public interface ITaskListService
{
    Task<IEnumerable<TaskListDto>> GetTaskListsForProjectAsync(long projectId, long userId);
    Task<TaskListDto> CreateTaskListAsync(long projectId, TaskListCreateDto dto, long userId);
    Task<bool> DeleteTaskListAsync(long taskListId, long userId);
}
