using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.DTOs.TaskList;
using PronaFlow.Core.Interfaces;
using PronaFlow.Services;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Authorize]
[Route("api/projects/{projectId}/tasklists")]
[ApiController]
public class TaskListsController : ControllerBase
{
    private readonly ITaskListService _taskListService;

    public TaskListsController(ITaskListService taskListService)
    {
        _taskListService = taskListService;
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

    [HttpGet]
    public async Task<IActionResult> GetTaskLists(long projectId)
    {
        try
        {
            var userId = GetCurrentUserId();
            var taskLists = await _taskListService.GetTaskListsForProjectAsync(projectId, userId);
            return Ok(taskLists);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateTaskList(long projectId, TaskListCreateDto dto)
    {
        try
        {
            var userId = GetCurrentUserId();
            var createdTaskList = await _taskListService.CreateTaskListAsync(projectId, dto, userId);
            return Ok(createdTaskList);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{taskListId}")]
    public async Task<IActionResult> DeleteTaskList(long projectId, long taskListId)
    {
        try
        {
            var userId = GetCurrentUserId();
            var success = await _taskListService.DeleteTaskListAsync(taskListId, userId);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}