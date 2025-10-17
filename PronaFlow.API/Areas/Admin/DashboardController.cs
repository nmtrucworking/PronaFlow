using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.Interfaces;
using System.Threading.Tasks;

namespace PronaFlow.API.Areas.Admin.Controllers
{
    [Authorize(Roles = "admin")]
    [ApiController]
    [Area("Admin")]
    [Route("api/[area]/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public DashboardController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var stats = await _adminService.GetDashboardStatsAsync();
            return Ok(stats);
        }
    }
}