// get data when creating a new workspace
using System;
using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.Workspace;

/*
 * Workspace Creation Data Transfer Object (DTO)
 * This class is used to transfer data when creating a new workspace.
 * */
public class WorkspaceCreateDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; } = string.Empty;
}