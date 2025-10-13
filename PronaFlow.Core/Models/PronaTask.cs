using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class PronaTask
{
    public long Id { get; set; }

    public long ProjectId { get; set; }

    public long TaskListId { get; set; }

    public long CreatorId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string Priority { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateOnly? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public bool IsRecurring { get; set; }

    public string? RecurrenceRule { get; set; }

    public DateOnly? NextRecurrenceDate { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime? DeletedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User Creator { get; set; } = null!;

    public virtual Project Project { get; set; } = null!;

    public virtual ICollection<Subtask> Subtasks { get; set; } = new List<Subtask>();

    public virtual TaskList TaskList { get; set; } = null!;

    public virtual ICollection<PronaTask> BlockingTasks { get; set; } = new List<PronaTask>();

    public virtual ICollection<PronaTask> Tasks { get; set; } = new List<PronaTask>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
