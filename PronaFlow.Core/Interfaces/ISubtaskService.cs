using PronaFlow.Core.DTOs.Subtask;

namespace PronaFlow.Core.Interfaces;

public interface ISubtaskService
{
    Task<IEnumerable<SubtaskDto>> GetSubtasksForTaskAsync(long taskId, long userId);
    Task<SubtaskDto> CreateSubtaskAsync(long taskId, SubtaskCreateDto dto, long userId);
    Task<bool> UpdateSubtaskAsync(long subtaskId, SubtaskUpdateDto dto, long userId);
    Task<bool> DeleteSubtaskAsync(long subtaskId, long userId);
}