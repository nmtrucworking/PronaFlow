using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.Interfaces;

[Authorize(Roles = "admin")]
[ApiController]
[Area("Admin")]
[Route("api/[area]/[controller]")]
public class LogsController : ControllerBase
{
    private readonly IAdminService _adminService;
    public LogsController(IAdminService adminService) { _adminService = adminService; }

    [HttpGet]
    public async Task<IActionResult> GetLogs([FromQuery] AdminLogQueryParameters queryParams)
    {
        return Ok(await _adminService.GetActivityLogsAsync(queryParams));
    }
}