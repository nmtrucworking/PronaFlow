using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.Subtask;

public class SubtaskUpdateDto
{
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;
    [Required]
    public bool IsCompleted { get; set; }
}