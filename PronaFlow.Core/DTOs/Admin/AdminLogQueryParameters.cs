public class AdminLogQueryParameters
{
    public string User { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public int Page { get; set; }
    public int PageSize { get; set; }
}