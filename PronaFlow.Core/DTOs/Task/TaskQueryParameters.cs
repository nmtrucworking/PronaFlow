using Microsoft.AspNetCore.Mvc;

namespace PronaFlow.Core.DTOs.Task;

public class TaskQueryParameters
{
    [FromQuery(Name = "search")]
    public string? Search { get; set; }

    [FromQuery(Name = "status")]
    public string? FilterByStatus { get; set; }

    [FromQuery(Name = "assigneeId")]
    public long? FilterByAssigneeId { get; set; }

    [FromQuery(Name = "sortBy")]
    public string? SortBy { get; set; } // Ví dụ: "name", "endDate", "priority"

    [FromQuery(Name = "sortDir")]
    public string? SortDir { get; set; } = "asc"; // "asc" hoặc "desc"
}