public class AdminProjectViewDto
{
    public int Id { get; set; }
    public string ProjectName { get; set; }
    public string WorkspaceName { get; set; }
    public string WorkspaceOwner { get; set; }
    public int MemberCount { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsArchived { get; set; }
}