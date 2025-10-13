using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class ProjectMember
{
    public long ProjectId { get; set; }

    public long UserId { get; set; }

    public string Role { get; set; } = null!;

    public virtual Project Project { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
