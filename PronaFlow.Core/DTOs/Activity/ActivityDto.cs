namespace PronaFlow.Core.DTOs.Activity;

public class ActivityDto
{
    public long Id { get; set; }
    public long UserId { get; set; }
    public string ActionType { get; set; } = string.Empty;
    public long TargetId { get; set; }
    public string TargetType { get; set; } = string.Empty;
    public string? Content { get; set; }
    public DateTime CreatedAt { get; set; }
}