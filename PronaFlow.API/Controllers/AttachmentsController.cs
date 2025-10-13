using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.Interfaces;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Authorize]
[ApiController]
public class AttachmentsController : ControllerBase
{
    private readonly IAttachmentService _attachmentService;

    public AttachmentsController(IAttachmentService attachmentService)
    {
        _attachmentService = attachmentService;
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

    // Endpoint để upload file cho Project
    [HttpPost("api/projects/{projectId}/attachments")]
    public async Task<IActionResult> UploadForProject(long projectId, IFormFile file)
    {
        var userId = GetCurrentUserId();
        var result = await _attachmentService.UploadAttachmentAsync("project", projectId, file, userId);
        return Ok(result);
    }

    // Endpoint để upload file cho Task
    [HttpPost("api/tasks/{taskId}/attachments")]
    public async Task<IActionResult> UploadForTask(long taskId, IFormFile file)
    {
        var userId = GetCurrentUserId();
        var result = await _attachmentService.UploadAttachmentAsync("task", taskId, file, userId);
        return Ok(result);
    }

    [HttpDelete("api/attachments/{attachmentId}")]
    public async Task<IActionResult> DeleteAttachment(long attachmentId)
    {
        var userId = GetCurrentUserId();
        var success = await _attachmentService.DeleteAttachmentAsync(attachmentId, userId);
        if (!success) return NotFound();
        return NoContent();
    }
}