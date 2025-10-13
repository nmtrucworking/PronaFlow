namespace PronaFlow.Core.DTOs.Trash;

public class TrashItemDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ItemType { get; set; } = string.Empty; // "Project" or "Task"
    public DateTime? DeletedAt { get; set; }
}