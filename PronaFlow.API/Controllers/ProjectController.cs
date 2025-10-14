using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PronaFlow.Core.DTOs.Member;
using PronaFlow.Core.DTOs.Project;
using PronaFlow.Core.Interfaces;
using System.Security;
using System.Security.Claims;

namespace PronaFlow.API.Controllers;

[Authorize]
[Route("api/workspaces/{workspaceId}/projects")]
[ApiController]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
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


    /* API Endpoint: Get Projects by Workspace
     * GET /api/workspaces/{workspaceId}/projects
     * This API endpoint retrieves all projects associated with a specific workspace.
     * It requires the user to be authenticated and authorized.
     * -----------------------
     * @param workspaceId - The ID of workspace to fetch projects for.
     * @return A list of projects in the specified workspace.
     */
    [HttpGet]
    public async Task<IActionResult> GetProjects(long workspaceId)
    {
        var userId = GetCurrentUserId();
        var projects = await _projectService.GetProjectsByWorkspaceAsync(workspaceId, userId);
        return Ok(projects);
    }

    // API Endpoint: Get Project by ID
    // GET /api/workspaces/{workspaceId}/projects/{projectId}
    [HttpGet("{projectId}")]
    public async Task<IActionResult> GetProjectById(long workspaceId, long projectId)
    {
        // Note: workspaceId is not use here, but kept for route consistence
        // Logic Authorization is handled in service layer
        var userId = GetCurrentUserId();
        var project = await _projectService.GetProjectByIdAsync(projectId, userId);

        if (project == null)
        {
            return NotFound("Project not found or access denied.");
        }

        return Ok(project);
    }

    // API Endpoint: Create Projecy
    // POST /api/workspaces/{workspaceId}/projects
    [HttpPost]
    public async Task<IActionResult> CreateProject(long workspaceId, ProjectCreateDto projectDto)
    {
        var userId = GetCurrentUserId();
        try
        {
            var createdProject = await _projectService.CreateProjectAsync(workspaceId, projectDto, userId);
            // return 201 with location header
            // Return CreateAtAction with route to GetProjectByid action for location header
            return CreatedAtAction(nameof(GetProjectById), new { workspaceId = workspaceId, projectId = createdProject.Id }, createdProject);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // API Endpoint: Update Project
    // PUT /api/workspaces/{workspaceId}/projects/{projectId}
    [HttpPut("{projectId}")]
    public async Task<IActionResult> UpdateProject(long workspaceId, long projectId, ProjectUpdateDto projectDto)
    {
        var userId = GetCurrentUserId();
        try
        {
            var success = await _projectService.UpdateProjectAsync(projectId, projectDto, userId);
            if (!success)
            {
                return NotFound("Project not found.");
            }
            return NoContent(); 
        }
        catch (SecurityException ex)
        {
            return Forbid(ex.Message); // 403 Forbidden if permission denied
        }
    }


    // API Endpoint: Delete Project
    // DELETE /api/workspaces/{workspaceId}/projects
    [HttpDelete("{projectId}")]
    public async Task<IActionResult> DeleteProject(long workspaceId, long projectId)
    {
        var userId = GetCurrentUserId();
        var success = await _projectService.SoftDeleteProjectAsync(projectId, userId);

        if (!success)
        {
            return NotFound("Project not found.");
        }
        return NoContent();
    }

    // API Endpoint: 
    [HttpGet("{projectId}/members")]
    public async Task<IActionResult> GetMembers(long projectId)
    {
        var userId = GetCurrentUserId();
        var members = await _projectService.GetProjectMembersAsync(projectId, userId);
        return Ok(members);
    }

    // API Endpoint: 
    [HttpPost("{projectId}/members")]
    public async Task<IActionResult> AddMember(long projectId, AddMemberRequestDto dto)
    {
        var userId = GetCurrentUserId();
        var newMember = await _projectService.AddMemberToProjectAsync(projectId, dto, userId);
        if (newMember == null) return NotFound();
        return Ok(newMember);
    }

    // API Endpoint: 
    [HttpDelete("{projectId}/members/{memberId}")]
    public async Task<IActionResult> RemoveMember(long projectId, long memberId)
    {
        var userId = GetCurrentUserId();
        try 
        {
            var success = await _projectService.RemoveMemberFromProjectAsync(projectId, memberId, userId);
            if (!success) return NotFound();
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (SecurityException ex)
        {
            return Forbid(ex.Message);
        }
    }
}