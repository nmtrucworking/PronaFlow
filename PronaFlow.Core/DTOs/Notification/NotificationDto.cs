namespace PronaFlow.Core.DTOs.Notification;

public class NotificationDto
{
    public long ActivityId { get; set; }
    public string Message { get; set; } = string.Empty;
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; }
}