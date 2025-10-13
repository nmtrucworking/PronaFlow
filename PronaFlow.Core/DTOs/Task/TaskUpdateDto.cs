using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.Task;

public class  TaskupdateDto
{
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Priority { get; set; }
    public string? Status { get; set; }
    public List<long>? AssigneeIds { get; set; }
    public DateOnly? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}