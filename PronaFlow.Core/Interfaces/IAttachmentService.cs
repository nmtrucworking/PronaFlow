using Microsoft.AspNetCore.Http;
using PronaFlow.Core.DTOs.Attachment;

namespace PronaFlow.Core.Interfaces;

public interface IAttachmentService
{
    Task<AttachmentDto> UploadAttachmentAsync(string attachableType, long attachableId, IFormFile file, long userId);
    Task<IEnumerable<AttachmentDto>> GetAttachmentsForTargetAsync(string attachableType, long attachableId, long userId);
    Task<bool> DeleteAttachmentAsync(long attachmentId, long userId);
}