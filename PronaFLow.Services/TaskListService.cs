using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.TaskList;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace PronaFLow.Services;
public class TaskListService: ITaskListService
{
    private readonly PronaFlowDbContext _context;
    private readonly IActivityService _activityService;

    public TaskListService(PronaFlowDbContext context, IActivityService activityService)
    {
        _context = context;
        _activityService = activityService;
    }

    // Helper private: Check if user is a member of the project
    private async Task CheckProjectMembershipAsync(long projectId, long userId)
    {
        var isMember = await _context.ProjectMembers
            .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);

        if (!isMember)
        {
            throw new SecurityException("User is not a member of this project.");
        }
    }

    public async Task<TaskListDto> CreateTaskListAsync(long projectId, TaskListCreateDto dto, long userId)
    {
        await CheckProjectMembershipAsync(projectId, userId);

        // Auto-sign postion as the last item
        var maxPosition = await _context.TaskLists
            .Where(tL => tL.ProjectId == projectId)
            .Select(tL => (int?)tL.Position)
            .MaxAsync();

        var newPosition = (maxPosition ?? -1) + 1; // If no items, start at 0 
        var taskList = new TaskList
        {
            ProjectId = projectId,
            Name = dto.Name,
            Position = newPosition
        };

        await _context.TaskLists.AddAsync(taskList);
        await _context.SaveChangesAsync();

        return new TaskListDto
        {
            Id = taskList.Id,
            ProjectId = taskList.ProjectId,
            Name = taskList.Name,
            Position = taskList.Position
        };
    }

    public async Task<bool> DeleteTaskListAsync(long taskListId, long userId)
    {
        var taskList = await _context.TaskLists
            .Include(tl => tl.Tasks) // Include Tasks to check if empty
            .FirstOrDefaultAsync(tl => tl.Id == taskListId);

        if (taskList == null) return false;

        await CheckProjectMembershipAsync(taskList.ProjectId, userId);

        // If the task list contains tasks, prevent deletion
        if (taskList.Tasks.Any())
        {
            throw new InvalidOperationException("Cannot delete a task list that contains tasks. Please move or delete all tasks first.");
        }

        _context.TaskLists.Remove(taskList);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<TaskListDto>> GetTaskListsForProjectAsync(long projectId, long userId)
    {
        await CheckProjectMembershipAsync(projectId, userId);

        return await _context.TaskLists
            .Where(tl => tl.ProjectId == projectId)
            .OrderBy(tl => tl.Position) // Sort by position
            .Select(tl => new TaskListDto
            {
                Id = tl.Id,
                ProjectId = tl.ProjectId,
                Name = tl.Name,
                Position = tl.Position
            })
            .ToListAsync();
    }

}
