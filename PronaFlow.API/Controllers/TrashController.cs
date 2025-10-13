using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.Interfaces;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Authorize]
[Route("api/trash")]
[ApiController]
public class TrashController : ControllerBase
{
    private readonly ITrashService _trashService;

    public TrashController(ITrashService trashService)
    {
        _trashService = trashService;
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
    public async Task<IActionResult> GetTrash()
    {
        var userId = GetCurrentUserId();
        var items = await _trashService.GetTrashedItemsAsync(userId);
        return Ok(items);
    }

    [HttpPost("restore/{itemType}/{itemId}")]
    public async Task<IActionResult> Restore(string itemType, long itemId)
    {
        var userId = GetCurrentUserId();
        var success = await _trashService.RestoreItemAsync(itemType, itemId, userId);
        if (!success) return NotFound();
        return Ok(new { message = $"{itemType} restored successfully." });
    }

    [HttpDelete("permanent/{itemType}/{itemId}")]
    public async Task<IActionResult> DeletePermanently(string itemType, long itemId)
    {
        var userId = GetCurrentUserId();
        var success = await _trashService.PermanentlyDeleteItemAsync(itemType, itemId, userId);
        if (!success) return NotFound();
        return NoContent();
    }
}