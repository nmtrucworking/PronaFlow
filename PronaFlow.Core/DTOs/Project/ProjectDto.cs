namespace PronaFlow.Core.DTOs.Project;
using PronaFlow.Core.DTOs.Member;
using PronaFlow.Core.DTOs.Tag;

public class ProjectDto
{
    public long Id { get; set; }
    public long WorkspaceId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? CoverImageUrl { get; set; }

    public string Status { get; set; } = string.Empty;
    public string ProjectType { get; set; } = string.Empty;
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }

    public bool IsArchived { get; set; } = false;
    public bool IsDeleted { get; set; } = false;
    public DateOnly? DeletedAt { get; set; }

    public ICollection<MemberDto> Members { get; set; } = new List<MemberDto>();
    public ICollection<TagDto> Tags { get; set; } = new List<TagDto>();
    public int TotalTasks { get; set; }
    public int CompletedTasks { get; set; }
}