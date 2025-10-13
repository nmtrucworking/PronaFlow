using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class Tag
{
    public long Id { get; set; }

    public long WorkspaceId { get; set; }

    public string Name { get; set; } = null!;

    public string ColorHex { get; set; } = null!;

    public virtual Workspace Workspace { get; set; } = null!;

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
}
