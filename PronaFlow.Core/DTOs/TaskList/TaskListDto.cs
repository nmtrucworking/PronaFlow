namespace PronaFlow.Core.DTOs.TaskList;

public class TaskListDto
{
    public long Id { get; set; }
    public long ProjectId { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Position { get; set; }
}