public class AdminDashboardStatsDto
{
    public int TotalUsers { get; set; }
    public int ActiveProjects { get; set; }
    public int TotalWorkspaces { get; set; }
    public int TotalTasks { get; set; }
    public List<UserGrowthDto>? UserGrowth { get; set; }
}

public class UserGrowthDto
{
    public string Date { get; set; } = string.Empty;
    public int Count { get; set; }
}