using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class NotificationRecipient
{
    public long ActivityId { get; set; }

    public long UserId { get; set; }

    public bool IsRead { get; set; }

    public virtual Activity Activity { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
