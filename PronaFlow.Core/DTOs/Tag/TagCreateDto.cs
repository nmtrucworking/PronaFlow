using System.ComponentModel.DataAnnotations;

namespace PronaFlow.Core.DTOs.Tag;

public class TagCreateDto
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", ErrorMessage = "Color must be a valid hex code (e.g., #FF5733).")]
    public string ColorHex { get; set; } = string.Empty;
}