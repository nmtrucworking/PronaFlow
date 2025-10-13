namespace PronaFlow.Core.DTOs.Attachment;

public class AttachmentDto
{
    public long Id { get; set; }
    public long UploadedByUserId { get; set; }
    public string OriginalFilename { get; set; } = string.Empty;
    public string StoragePath { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public DateTime CreatedAt { get; set; }
}