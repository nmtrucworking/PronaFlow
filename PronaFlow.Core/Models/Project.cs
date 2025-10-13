using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class Project
{
    public long Id { get; set; }

    public long WorkspaceId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? CoverImageUrl { get; set; }

    public string Status { get; set; } = null!;

    public string ProjectType { get; set; } = null!;

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public bool IsArchived { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime? DeletedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<Invitation> Invitations { get; set; } = new List<Invitation>();

    public virtual ICollection<ProjectMember> ProjectMembers { get; set; } = new List<ProjectMember>();

    public virtual ICollection<TaskList> TaskLists { get; set; } = new List<TaskList>();

    public virtual ICollection<PronaTask> Tasks { get; set; } = new List<PronaTask>();

    public virtual Workspace Workspace { get; set; } = null!;

    public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();
}
