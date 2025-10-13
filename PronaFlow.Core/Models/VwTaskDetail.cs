using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class VwTaskDetail
{
    public long TaskId { get; set; }

    public string TaskName { get; set; } = null!;

    public string? TaskDescription { get; set; }

    public string TaskPriority { get; set; } = null!;

    public string TaskStatus { get; set; } = null!;

    public DateOnly? TaskStartDate { get; set; }

    public DateTime? TaskEndDate { get; set; }

    public DateTime TaskCreatedAt { get; set; }

    public long ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public long TaskListId { get; set; }

    public string TaskListName { get; set; } = null!;

    public long CreatorId { get; set; }

    public string CreatorFullName { get; set; } = null!;

    public long WorkspaceId { get; set; }
}
