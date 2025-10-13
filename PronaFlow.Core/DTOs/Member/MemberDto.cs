namespace PronaFlow.Core.DTOs.Member;

public class MemberDto
{
    public long UserId { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
}