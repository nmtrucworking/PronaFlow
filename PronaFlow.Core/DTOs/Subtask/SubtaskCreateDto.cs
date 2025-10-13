using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.Subtask;

public class SubtaskCreateDto
{
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;
}