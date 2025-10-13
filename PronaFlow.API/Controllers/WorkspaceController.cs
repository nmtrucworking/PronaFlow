using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.DTOs.Workspace;
using PronaFlow.Core.Interfaces;
using PronaFLow.Core.DTOs.Workspace;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Authorize] // YÊU CẦU XÁC THỰC CHO TẤT CẢ CÁC ACTION TRONG CONTROLLER NÀY
[Route("api/[controller]")]
[ApiController]
public class WorkspacesController : ControllerBase
{
    private readonly IWorkspaceService _workspaceService;

    public WorkspacesController(IWorkspaceService workspaceService)
    {
        _workspaceService = workspaceService;
    }

    private long GetCurrentUserId()
    {
        // Lấy User ID từ claim 'NameIdentifier' trong JWT token
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !long.TryParse(userIdClaim.Value, out var userId))
        {
            // Tình huống này gần như không xảy ra nếu token hợp lệ
            throw new InvalidOperationException("User ID not found in token.");
        }
        return userId;
    }

    [HttpGet]
    public async Task<IActionResult> GetUserWorkspaces()
    {
        var userId = GetCurrentUserId();
        var workspaces = await _workspaceService.GetWorkspacesForUserAsync(userId);
        return Ok(workspaces);
    }

    [HttpPost]
    public async Task<IActionResult> CreateWorkspace(WorkspaceCreateDto workspaceDto)
    {
        var userId = GetCurrentUserId();
        var createdWorkspace = await _workspaceService.CreateWorkspaceAsync(workspaceDto, userId);
        return CreatedAtAction(nameof(GetUserWorkspaces), new { id = createdWorkspace.Id }, createdWorkspace);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateWorkspace(long id, WorkspaceCreateDto workspaceDto)
    {
        var userId = GetCurrentUserId();
        var success = await _workspaceService.UpdateWorkspaceAsync(id, workspaceDto, userId);

        if (!success)
        {
            return NotFound("Workspace not found or permission denied.");
        }
        return NoContent(); // 204 No Content - Thành công
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWorkspace(long id)
    {
        var userId = GetCurrentUserId();
        var (success, error) = await _workspaceService.DeleteWorkspaceAsync(id, userId);

        if (!success)
        {
            // Trả về lỗi 404 nếu không tìm thấy, 400 nếu có lỗi nghiệp vụ
            if (error != null && error.Contains("not empty"))
            {
                return BadRequest(error); // 400 Bad Request
            }
            return NotFound(error); // 404 Not Found
        }
        return NoContent();
    }
}