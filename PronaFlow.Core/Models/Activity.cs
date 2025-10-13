using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class Activity
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string ActionType { get; set; } = null!;

    public long TargetId { get; set; }

    public string TargetType { get; set; } = null!;

    public string? Content { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<NotificationRecipient> NotificationRecipients { get; set; } = new List<NotificationRecipient>();

    public virtual User User { get; set; } = null!;
}
