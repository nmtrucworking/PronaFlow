using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class Comment
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string Content { get; set; } = null!;

    public long CommentableId { get; set; }

    public string CommentableType { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
