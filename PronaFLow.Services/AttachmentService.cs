using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PronaFlow.Core.Data;
using PronaFlow.Core.DTOs.Attachment;
using PronaFlow.Core.Interfaces;
using PronaFlow.Core.Models;
using System.Security;

namespace PronaFlow.Services;

public class AttachmentService : IAttachmentService
{
    private readonly PronaFlowDbContext _context;
    private readonly IActivityService _activityService;
    private readonly IWebHostEnvironment _env;

    public AttachmentService(PronaFlowDbContext context, IActivityService activityService, IWebHostEnvironment env)
    {
        _context = context;
        _activityService = activityService;
        _env = env;
    }

    private async Task CheckTargetAccessAsync(string attachableType, long attachableId, long userId)
    {
        bool hasAccess = false;
        if (attachableType.Equals("project", StringComparison.OrdinalIgnoreCase))
        {
            hasAccess = await _context.ProjectMembers.AnyAsync(pm => pm.ProjectId == attachableId && pm.UserId == userId);
        }
        else if (attachableType.Equals("task", StringComparison.OrdinalIgnoreCase))
        {
            hasAccess = await _context.Tasks
                .Where(t => t.Id == attachableId)
                .AnyAsync(t => t.Project.ProjectMembers.Any(pm => pm.UserId == userId));
        }

        if (!hasAccess)
        {
            throw new SecurityException($"Permission denied to access {attachableType} with ID {attachableId}.");
        }
    }

    public async Task<AttachmentDto> UploadAttachmentAsync(string attachableType, long attachableId, IFormFile file, long userId)
    {
        await CheckTargetAccessAsync(attachableType, attachableId, userId);

        if (file == null || file.Length == 0)
        {
            throw new ArgumentException("File is empty.");
        }

        var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
        var uploadsFolderPath = Path.Combine(_env.WebRootPath, "uploads");
        if (!Directory.Exists(uploadsFolderPath))
        {
            Directory.CreateDirectory(uploadsFolderPath);
        }
        var filePath = Path.Combine(uploadsFolderPath, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var attachment = new Attachment
        {
            UploadedByUserId = userId,
            AttachableId = attachableId,
            AttachableType = attachableType.ToLower(),
            OriginalFilename = file.FileName,
            StoragePath = $"/uploads/{uniqueFileName}",
            FileType = file.ContentType,
            FileSize = file.Length,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Attachments.AddAsync(attachment);
        await _context.SaveChangesAsync();

        await _activityService.LogActivityAsync(userId, "attachment_add", attachableId, attachableType, file.FileName);

        return new AttachmentDto
        {
            Id = attachment.Id,
            UploadedByUserId = attachment.UploadedByUserId,
            OriginalFilename = attachment.OriginalFilename,
            StoragePath = attachment.StoragePath,
            FileType = attachment.FileType,
            FileSize = (long)attachment.FileSize,
            CreatedAt = attachment.CreatedAt
        };
    }

    public async Task<IEnumerable<AttachmentDto>> GetAttachmentsForTargetAsync(string attachableType, long attachableId, long userId)
    {
        await CheckTargetAccessAsync(attachableType, attachableId, userId);

        return await _context.Attachments
            .Where(a => a.AttachableType == attachableType.ToLower() && a.AttachableId == attachableId)
            .Select(a => new AttachmentDto
            {
                Id = a.Id,
                UploadedByUserId = a.UploadedByUserId,
                OriginalFilename = a.OriginalFilename,
                StoragePath = a.StoragePath,
                FileType = a.FileType ?? string.Empty,
                FileSize = a.FileSize ?? 0,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();
    }
    
    public async Task<bool> DeleteAttachmentAsync(long attachmentId, long userId)
    {
        var attachment = await _context.Attachments.FindAsync(attachmentId);
        if (attachment == null) return false;

        if (attachment.UploadedByUserId != userId)
        {
            throw new SecurityException("Only the uploader can delete this attachment.");
        }

        var physicalPath = Path.Combine(_env.WebRootPath, attachment.StoragePath.TrimStart('/'));
        if (File.Exists(physicalPath))
        {
            File.Delete(physicalPath);
        }

        _context.Attachments.Remove(attachment);
        var success = await _context.SaveChangesAsync() > 0;

        if (success)
        {
            await _activityService.LogActivityAsync(userId, "attachment_remove", attachment.AttachableId, attachment.AttachableType, attachment.OriginalFilename);
        }

        return success;
    }
}