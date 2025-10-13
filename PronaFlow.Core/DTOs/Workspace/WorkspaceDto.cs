// return data

using System;

namespace PronaFlow.Core.DTOs.Workspace;

/* 
 * Workspace Data Transfer Object (DTO)
 * This class is used to transfer workspace data between different layers of the application.
 */
public class WorkspaceDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public long OwnerId { get; set; } 

}