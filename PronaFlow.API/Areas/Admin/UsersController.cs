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
    public class UsersController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public UsersController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _adminService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPut("{id}/role")]
        public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UpdateRoleDto dto)
        {
            var result = await _adminService.UpdateUserRoleAsync(id, dto.Role);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeactivateUser(int id)
        {
            var result = await _adminService.DeactivateUserAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPut("{id}/restore")]
        public async Task<IActionResult> RestoreUser(int id)
        {
            var result = await _adminService.RestoreUserAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}