using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.Interfaces;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Authorize]
[Route("api/notifications")]
[ApiController]
public class NotificationsController : ControllerBase
{
    private readonly IActivityService _activityService;

    public NotificationsController(IActivityService activityService)
    {
        _activityService = activityService;
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
    public async Task<IActionResult> GetMyNotifications()
    {
        var userId = GetCurrentUserId();
        var notifications = await _activityService.GetNotificationsForUserAsync(userId);
        return Ok(notifications);
    }
}