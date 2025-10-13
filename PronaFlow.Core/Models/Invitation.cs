using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class Invitation
{
    public long Id { get; set; }

    public long ProjectId { get; set; }

    public long InviterId { get; set; }

    public string InviteeEmail { get; set; } = null!;

    public string Token { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime? ExpiresAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User Inviter { get; set; } = null!;

    public virtual Project Project { get; set; } = null!;
}
