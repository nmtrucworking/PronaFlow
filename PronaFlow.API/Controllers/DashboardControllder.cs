using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.Interfaces; // Giả sử bạn có IDashboardService
using System.Security.Claims;

[Authorize]
[Route("api/dashboard")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
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

    [HttpGet("statistics")]
    public async Task<IActionResult> GetStatistics()
    {
        var userId = GetCurrentUserId();
        var stats = await _dashboardService.GetStatisticsAsync(userId);
        return Ok(stats);
    }
}