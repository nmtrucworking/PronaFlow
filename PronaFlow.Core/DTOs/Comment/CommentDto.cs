namespace PronaFlow.Core.DTOs.Comment;

public class CommentDto
{
    public long Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public long UserId { get; set; }
    public string UserFullName { get; set; } = string.Empty; // will get by JOIN
    public DateTime CreatedAt { get; set; }
}