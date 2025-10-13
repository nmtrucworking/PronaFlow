using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class VwProjectDetail
{
    public long ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public string ProjectStatus { get; set; } = null!;

    public long WorkspaceId { get; set; }

    public int? TotalTasks { get; set; }

    public int? CompletedTasks { get; set; }

    public int? MemberCount { get; set; }
}
