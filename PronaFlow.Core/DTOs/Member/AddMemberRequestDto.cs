using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.Member;

public class AddMemberRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    public string Role { get; set; } = "member"; // Mặc định là 'member'
}