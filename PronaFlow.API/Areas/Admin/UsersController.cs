using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.Interfaces;
using System.ComponentModel.DataAnnotations;
using System;
using System.Threading.Tasks;

namespace PronaFlow.API.Areas.Admin.Controllers
{
    public class UpdateRoleDto
    {
        [Required]
        public string Role { get; set; }
    }

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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _adminService.UpdateUserRoleAsync(id, dto.Role);
                if (!result) return NotFound($"User with ID {id} not found.");
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeactivateUser(int id)
        {
            var result = await _adminService.DeactivateUserAsync(id);
            if (!result) return NotFound($"User with ID {id} not found or already deactivated.");
            return NoContent();
        }

        [HttpPut("{id}/restore")]
        public async Task<IActionResult> RestoreUser(int id)
        {
            var result = await _adminService.RestoreUserAsync(id);
            if (!result) return NotFound($"User with ID {id} not found or not deactivated.");
            return NoContent();
        }
    }
}