using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.DTOs.Comment;
using PronaFlow.Core.Interfaces;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Authorize]
[ApiController]
public class CommentsController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentsController(ICommentService commentService)
    {
        _commentService = commentService;
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

    [HttpGet("api/projects/{projectId}/comments")]
    public async Task<IActionResult> GetProjectComments(long projectId)
    {
        var userId = GetCurrentUserId();
        var comments = await _commentService.GetCommentsForTargetAsync("project", projectId, userId);
        return Ok(comments);
    }

    [HttpPost("api/projects/{projectId}/comments")]
    public async Task<IActionResult> CreateProjectComment(long projectId, CommentCreateDto dto)
    {
        var userId = GetCurrentUserId();
        var comment = await _commentService.CreateCommentAsync("project", projectId, dto, userId);
        return Ok(comment);
    }

    [HttpGet("api/tasks/{taskId}/comments")]
    public async Task<IActionResult> GetTaskComments(long taskId)
    {
        var userId = GetCurrentUserId();
        var comments = await _commentService.GetCommentsForTargetAsync("task", taskId, userId);
        return Ok(comments);
    }

    [HttpPost("api/tasks/{taskId}/comments")]
    public async Task<IActionResult> CreateTaskComment(long taskId, CommentCreateDto dto)
    {
        var userId = GetCurrentUserId();
        var comment = await _commentService.CreateCommentAsync("task", taskId, dto, userId);
        return Ok(comment);
    }

    [HttpDelete("api/comments/{commentId}")]
    public async Task<IActionResult> DeleteComment(long commentId)
    {
        var userId = GetCurrentUserId();
        var success = await _commentService.DeleteCommentAsync(commentId, userId);
        if (!success) return NotFound();
        return NoContent();
    }
}