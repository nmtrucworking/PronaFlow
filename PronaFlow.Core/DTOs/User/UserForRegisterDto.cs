// Data Transfer Objects (DTOs) for User Registration

using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.User;

public class UserForRegisterDto
{
    [Required]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
    public string Password { get; set; } = string.Empty;
}