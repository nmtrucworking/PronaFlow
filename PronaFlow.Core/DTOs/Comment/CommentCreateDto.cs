using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.Comment;

public class CommentCreateDto
{
    [Required]
    public string Content { get; set; } = string.Empty;
}