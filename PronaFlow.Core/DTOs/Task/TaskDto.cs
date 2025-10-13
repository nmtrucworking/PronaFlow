namespace PronaFlow.Core.DTOs.Task;

public class TaskDto
{
    public long Id { get; set; }
    public long ProjectId { get; set; }
    public long TaskListId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Priority { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateOnly? StartDate { get; set; }
    public DateOnly? EndDate { get; set; }

    public bool IsArchived { get; set; } = false;
    public bool IsDeleted { get; set; } = false;
    public DateOnly? DeletedAt { get; set; }
    public DateOnly? CreateAt { get; set; }
    public DateOnly? UpdateAt { get; set; }
    public long CreatorId { get; set; }
    public bool IsRecurring { get; set; } = false;
    public string? RecurrenceRule { get; set; } = string.Empty;
    public DateOnly NextRecurrenceDate { get; set; }

}