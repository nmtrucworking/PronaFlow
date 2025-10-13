namespace PronaFlow.Core.DTOs.Subtask;

public class SubtaskDto
{
    public long Id { get; set; }
    public long TaskId { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public int Position { get; set; }
}