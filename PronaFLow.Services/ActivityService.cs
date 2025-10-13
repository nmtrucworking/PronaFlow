using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Activity;
using PronaFlow.Core.DTOs.Notification;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System.Text.Json;

namespace PronaFlow.Services;

public class ActivityService : IActivityService
{
    private readonly PronaFlowDbContext _context;

    public ActivityService(PronaFlowDbContext context)
    {
        _context = context;
    }

    public async Task LogActivityAsync(long userId, string actionType, long targetId, string targetType, string? content = null)
    {
        var activity = new Activity
        {
            UserId = userId,
            ActionType = actionType,
            TargetId = targetId,
            TargetType = targetType,
            Content = content,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Activities.AddAsync(activity);
        await _context.SaveChangesAsync();

        var recipients = new List<long>();

        switch (actionType)
        {
            case "project_add_member": //
                if (content != null)
                {
                    // Giả định content là JSON có dạng: { "memberId": 123 }
                    using var doc = JsonDocument.Parse(content);
                    if (doc.RootElement.TryGetProperty("memberId", out var memberIdElement))
                    {
                        recipients.Add(memberIdElement.GetInt64());
                    }
                }
                break;

            case "task_assign": //
                if (content != null)
                {
                    // Giả định content là JSON có dạng: { "assigneeId": 123 }
                    using var doc = JsonDocument.Parse(content);
                    if (doc.RootElement.TryGetProperty("assigneeId", out var assigneeIdElement))
                    {
                        recipients.Add(assigneeIdElement.GetInt64());
                    }
                }
                break;

                // Thêm các trường hợp khác ở đây, ví dụ: "user_mention"
        }

        // Tạo các bản ghi NotificationRecipient cho những người cần nhận thông báo
        foreach (var recipientId in recipients)
        {
            // Không tự gửi thông báo cho chính mình
            if (recipientId == userId) continue;

            var notification = new NotificationRecipient
            {
                ActivityId = activity.Id,
                UserId = recipientId,
                IsRead = false
            };
            await _context.NotificationRecipients.AddAsync(notification);
        }

        if (recipients.Any())
        {
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<ActivityDto>> GetActivitiesForTargetAsync(long targetId, string targetType)
    {
        return await _context.Activities
            .Include(a => a.User) // Join với bảng User để lấy tên người thực hiện
            .Where(a => a.TargetId == targetId && a.TargetType == targetType)
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new ActivityDto
            {
                Id = a.Id,
                UserId = a.UserId,
                ActionType = a.ActionType,
                TargetId = a.TargetId,
                TargetType = a.TargetType,
                Content = a.Content,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<NotificationDto>> GetNotificationsForUserAsync(long userId)
    {
        var notifications = await _context.NotificationRecipients
            .Include(nr => nr.Activity).ThenInclude(a => a.User) // Join đến Activity và User thực hiện hành động
            .Where(nr => nr.UserId == userId)
            .OrderByDescending(nr => nr.Activity.CreatedAt)
            .Take(50) // Giới hạn 50 thông báo gần nhất
            .ToListAsync();

        // Map dữ liệu sang DTO và tạo Message thân thiện
        return notifications.Select(nr => new NotificationDto
        {
            ActivityId = nr.ActivityId,
            IsRead = nr.IsRead,
            CreatedAt = nr.Activity.CreatedAt,
            Message = CreateNotificationMessage(nr.Activity) // Hàm helper tạo message
        });
    }

    private string CreateNotificationMessage(Activity activity)
    {
        // Get userName
        string actor = activity.User?.FullName ?? "Someone";

        string contentInfo = !string.IsNullOrEmpty(activity.Content) ? $"\"{activity.Content}\"" : "";

        switch (activity.ActionType)
        {
            // Project Actions
            case "project_add_member":
                return $"{actor} added you to a project.";

            case "project_remove_member":
                return $"{actor} removed you from a project.";

            // Task Actions
            case "task_assign":
                return $"{actor} assigned a task to you.";

            case "task_update_status":
                return $"{actor} updated the status of a task you are assigned to.";

            case "task_set_deadline":
                return $"{actor} set a new deadline for the task {contentInfo}.";

            case "task_change_priority":
                return $"{actor} changed the priority of the task {contentInfo}.";

            // Interaction Actions
            case "comment_add":
                return $"{actor} left a comment.";

            case "user_mention":
                return $"{actor} mentioned you in a comment.";

            case "attachment_add":
                return $"{actor} added a new attachment: {contentInfo}.";

            // System Actions
            case "system_task_overdue":
                return $"The task {contentInfo} is now overdue.";

            case "system_deadline_reminder":
                return $"Reminder: The task {contentInfo} is due soon.";

            // Default case for any other action types
            default:
                return "You have a new notification.";
        }
    }
}