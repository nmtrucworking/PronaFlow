using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class Subtask
{
    public long Id { get; set; }

    public long TaskId { get; set; }

    public string Name { get; set; } = null!;

    public bool IsCompleted { get; set; }

    public int Position { get; set; }

    public virtual PronaTask Task { get; set; } = null!;
}
