using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.DTOs.Subtask;
using PronaFlow.Core.Interfaces;
using PronaFlow.Services;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SubtaskController : ControllerBase
{
    private readonly ISubtaskService _subtaskService;

    public SubtaskController(ISubtaskService subtaskService)
    {
        _subtaskService = subtaskService;
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

    // API Endpint:
    // GET /api/tasks/{taskId}/subtasks
    [HttpGet("api/tasks/{taskId}/subtasks")]
    public async Task<IActionResult> GetSubtasks(long taskId)
    {
        var userId = GetCurrentUserId();
        var subtasks = await _subtaskService.GetSubtasksForTaskAsync(taskId, userId);
        return Ok(subtasks);
    }

    // API Endpint:
    [HttpPost("api/tasks/{taskId}/subtasks")]
    public async Task<IActionResult> CreateSubtask(long taskId, SubtaskCreateDto dto)
    {
        var userId = GetCurrentUserId();
        var createdSubtask = await _subtaskService.CreateSubtaskAsync(taskId, dto, userId);
        return Ok(createdSubtask);
    }

    // API Endpint:
    [HttpPut("api/subtasks/{subtaskId}")]
    public async Task<IActionResult> UpdateSubtask(long subtaskId, SubtaskUpdateDto dto)
    {
        var userId = GetCurrentUserId();
        var success = await _subtaskService.UpdateSubtaskAsync(subtaskId, dto, userId);
        if (!success) return NotFound();
        return NoContent();
    }

    // API Endpint:
    [HttpDelete("api/subtasks/{subtaskId}")]
    public async Task<IActionResult> DeleteSubtask(long subtaskId)
    {
        var userId = GetCurrentUserId();
        var success = await _subtaskService.DeleteSubtaskAsync(subtaskId, userId);
        if (!success) return NotFound();
        return NoContent();
    }
}
