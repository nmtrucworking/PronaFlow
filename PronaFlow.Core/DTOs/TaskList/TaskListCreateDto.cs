using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.TaskList;

public class  TaskListCreateDto
{
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } = "Phrase";
}