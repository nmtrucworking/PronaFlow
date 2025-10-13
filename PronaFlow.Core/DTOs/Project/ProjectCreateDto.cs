using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.Project;

public class ProjectCreateDto
{
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;

    // project.status will be mofified from context of Kanban board
    [Required]
    public string Status { get; set; } = string.Empty;
}