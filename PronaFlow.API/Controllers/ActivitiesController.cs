using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.Interfaces;

namespace PronaFlow.API.Controllers;

[Authorize]
[Route("api/activities")]
[ApiController]
public class ActivitiesController : ControllerBase
{
    private readonly IActivityService _activityService;

    public ActivitiesController(IActivityService activityService)
    {
        _activityService = activityService;
    }

    [HttpGet]
    public async Task<IActionResult> GetActivities([FromQuery] long targetId, [FromQuery] string targetType)
    {
        if (targetId <= 0 || string.IsNullOrEmpty(targetType))
        {
            return BadRequest("targetId and targetType are required.");
        }

        var activities = await _activityService.GetActivitiesForTargetAsync(targetId, targetType);
        return Ok(activities);
    }
}