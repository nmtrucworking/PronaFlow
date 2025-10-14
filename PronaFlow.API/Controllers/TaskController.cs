using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.DTOs.Task;
using PronaFlow.Core.Interfaces;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Authorize]
[Route("api/")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    private long GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !long.TryParse(userIdClaim.Value, out var userId))
        {
            throw new InvalidOperationException("User ID not found in token.");
        }
        return userId;
    }

    [HttpGet("projects/{projectId}/tasks")]
    public async Task<IActionResult> GetTasks(long projectId, [FromQuery] TaskQueryParameters queryParams)
    {
        try
        {
            var userId = GetCurrentUserId();
            var tasks = await _taskService.GetTasksForProjectAsync(projectId, userId, queryParams);
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("tasklists/{taskListId}/tasks")]
    public async Task<IActionResult> CreateTask(long taskListId, TaskCreateDto dto)
    {
        try
        {
            var userId = GetCurrentUserId();
            var createdTask = await _taskService.CreateTaskAsync(taskListId, dto, userId);
            return Ok(createdTask);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("tasks/{taskId}")]
    public async Task<IActionResult> DeleteTask(long taskId)
    {
        try
        {
            var userId = GetCurrentUserId();
            var success = await _taskService.SoftDeleteTaskAsync(taskId, userId);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return Forbid(ex.Message);
        }
    }

    [HttpPost("tasks/{taskId}/assignees/{assigneeId}")]
    public async Task<IActionResult> AssignTask(long taskId, long assigneeId)
    {
        var userId = GetCurrentUserId();
        var success = await _taskService.AssignUserToTaskAsync(taskId, assigneeId, userId);
        if (!success) return NotFound();
        return NoContent();
    }

    [HttpDelete("tasks/{taskId}/assignees/{assigneeId}")]
    public async Task<IActionResult> UnassignTask(long taskId, long assigneeId)
    {
        var userId = GetCurrentUserId();
        var success = await _taskService.UnassignUserFromTaskAsync(taskId, assigneeId, userId);
        if (!success) return NotFound();
        return NoContent();
    }

    [HttpGet("/api/tasks/upcoming")] // Route ở cấp độ gốc
    public async Task<IActionResult> GetUpcomingTasks()
    {
        try
        {
            var userId = GetCurrentUserId();
            // Bạn sẽ cần thêm phương thức GetUpcomingTasksForUserAsync vào ITaskService và TaskService
            var tasks = await _taskService.GetUpcomingTasksForUserAsync(userId);
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}