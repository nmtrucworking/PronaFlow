using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Subtask;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System.Security;

namespace PronaFlow.Services;

public class SubtaskService : ISubtaskService
{
    private readonly PronaFlowDbContext _context;

    public SubtaskService(PronaFlowDbContext context)
    {
        _context = context;
    }

    // Helper để kiểm tra quyền truy cập vào công việc cha
    private async Task CheckParentTaskAccessAsync(long taskId, long userId)
    {
        var canAccess = await _context.Tasks
            .Where(t => t.Id == taskId)
            .AnyAsync(t => t.Project.ProjectMembers.Any(pm => pm.UserId == userId));

        if (!canAccess)
        {
            throw new SecurityException("Permission denied to access this task.");
        }
    }

    public async Task<SubtaskDto> CreateSubtaskAsync(long taskId, SubtaskCreateDto dto, long userId)
    {
        await CheckParentTaskAccessAsync(taskId, userId);

        var maxPosition = await _context.Subtasks
            .Where(st => st.TaskId == taskId)
            .Select(st => (int?)st.Position)
            .MaxAsync() ?? -1;

        var subtask = new Subtask
        {
            TaskId = taskId,
            Name = dto.Name,
            IsCompleted = false,
            Position = maxPosition + 1
        };

        await _context.Subtasks.AddAsync(subtask);
        await _context.SaveChangesAsync();

        return new SubtaskDto { /* ... map properties ... */ };
    }

    public async Task<bool> DeleteSubtaskAsync(long subtaskId, long userId)
    {
        var subtask = await _context.Subtasks.FindAsync(subtaskId);
        if (subtask == null) return false;

        await CheckParentTaskAccessAsync(subtask.TaskId, userId);

        _context.Subtasks.Remove(subtask);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<SubtaskDto>> GetSubtasksForTaskAsync(long taskId, long userId)
    {
        await CheckParentTaskAccessAsync(taskId, userId);

        return await _context.Subtasks
            .Where(st => st.TaskId == taskId)
            .OrderBy(st => st.Position)
            .Select(st => new SubtaskDto
            {
                Id = st.Id,
                TaskId = st.TaskId,
                Name = st.Name,
                IsCompleted = st.IsCompleted,
                Position = st.Position
            })
            .ToListAsync();
    }

    public async Task<bool> UpdateSubtaskAsync(long subtaskId, SubtaskUpdateDto dto, long userId)
    {
        var subtask = await _context.Subtasks.FindAsync(subtaskId);
        if (subtask == null) return false;

        await CheckParentTaskAccessAsync(subtask.TaskId, userId);

        subtask.Name = dto.Name;
        subtask.IsCompleted = dto.IsCompleted;

        return await _context.SaveChangesAsync() > 0;
    }
}