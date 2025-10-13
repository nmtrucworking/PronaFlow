using System;
using System.Collections.Generic;

namespace PronaFlow.Core.Models;

public partial class Attachment
{
    public long Id { get; set; }

    public long UploadedByUserId { get; set; }

    public long AttachableId { get; set; }

    public string AttachableType { get; set; } = null!;

    public string OriginalFilename { get; set; } = null!;

    public string StoragePath { get; set; } = null!;

    public string? FileType { get; set; }

    public long? FileSize { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User UploadedByUser { get; set; } = null!;
}
