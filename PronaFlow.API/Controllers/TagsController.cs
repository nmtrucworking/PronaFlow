using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.DTOs.Tag;
using PronaFlow.Core.Interfaces;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Authorize]
[ApiController]
public class TagsController : ControllerBase
{
    private readonly ITagService _tagService;

    public TagsController(ITagService tagService)
    {
        _tagService = tagService;
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

    [HttpGet("api/workspaces/{workspaceId}/tags")]
    public async Task<IActionResult> GetTags(long workspaceId)
    {
        var userId = GetCurrentUserId();
        var tags = await _tagService.GetTagsForWorkspaceAsync(workspaceId, userId);
        return Ok(tags);
    }

    [HttpPost("api/workspaces/{workspaceId}/tags")]
    public async Task<IActionResult> CreateTag(long workspaceId, TagCreateDto dto)
    {
        var userId = GetCurrentUserId();
        var tag = await _tagService.CreateTagAsync(workspaceId, dto, userId);
        return Ok(tag);
    }

    [HttpDelete("api/tags/{tagId}")]
    public async Task<IActionResult> DeleteTag(long tagId)
    {
        var userId = GetCurrentUserId();
        var success = await _tagService.DeleteTagAsync(tagId, userId);
        if (!success) return NotFound();
        return NoContent();
    }

    [HttpPut("api/projects/{projectId}/tags")]
    public async Task<IActionResult> AssignTagsToProject(long projectId, [FromBody] List<long> tagIds)
    {
        var userId = GetCurrentUserId();
        var success = await _tagService.AssignTagsToProjectAsync(projectId, tagIds, userId);
        if (!success) return NotFound("Project not found or tags are invalid.");
        return NoContent();
    }
}