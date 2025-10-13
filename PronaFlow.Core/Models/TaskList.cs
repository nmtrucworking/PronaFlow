using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class TaskList
{
    public long Id { get; set; }

    public long ProjectId { get; set; }

    public string Name { get; set; } = null!;

    public int Position { get; set; }

    public virtual Project Project { get; set; } = null!;

    public virtual ICollection<PronaTask> Tasks { get; set; } = new List<PronaTask>();
}
