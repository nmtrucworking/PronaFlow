using PronaFlow.Core.DTOs.Activity;
using PronaFlow.Core.DTOs.Notification;

namespace PronaFlow.Core.Interfaces;

public interface IActivityService
{
    Task LogActivityAsync(long userId, string actionType, long targetId, string targetType, string? content = null);
    Task<IEnumerable<ActivityDto>> GetActivitiesForTargetAsync(long targetId, string targetType);
    Task<IEnumerable<NotificationDto>> GetNotificationsForUserAsync(long userId);
}