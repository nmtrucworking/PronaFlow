public class AdminProjectViewDto
{
    public int Id { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string WorkspaceName { get; set; } = string.Empty;
    public string WorkspaceOwner { get; set; } = string.Empty;
    public int MemberCount { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public bool IsArchived { get; set; }
}