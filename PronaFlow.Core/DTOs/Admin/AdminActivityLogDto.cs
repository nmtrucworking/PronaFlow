public class AdminActivityLogDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public int UserId { get; set; }
    public string UserFullName { get; set; }
    public string ActionType { get; set; }
    public string TargetType { get; set; }
    public int? TargetId { get; set; }
    public string Description { get; set; }
}