using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.Interfaces;

[Authorize(Roles = "admin")]
[ApiController]
[Area("Admin")]
[Route("api/[area]/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IAdminService _adminService;
    public ProjectsController(IAdminService adminService) { _adminService = adminService; }

    [HttpGet]
    public async Task<IActionResult> GetAllProjects()
    {
        return Ok(await _adminService.GetAllProjectsAsync());
    }

    [HttpPut("{id}/archive")]
    public async Task<IActionResult> ArchiveProject(int id)
    {
        var result = await _adminService.ArchiveProjectAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }

    [HttpPut("{id}/unarchive")]
    public async Task<IActionResult> UnarchiveProject(int id)
    {
        var result = await _adminService.UnarchiveProjectAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}