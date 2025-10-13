using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.Project;

public class ProjectUpdateDto
{
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? CoverImageUrl { get; set; }
    [Required]
    public string Status { get; set; } = "not-started"; // not-started, in-progress, in-review, completed
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public bool IsArchived { get; set;  }
}