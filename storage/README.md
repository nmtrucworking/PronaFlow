# 💾 Storage Directory - Architecture & Best Practices

**Last Updated:** February 3, 2026  
**Status:** ✅ Restructured & Documented

---

## 📋 Overview

The `storage/` directory manages all file-based persistence for PronaFlow, including user uploads, temporary files, and exports. This directory is excluded from git (`**/storage/` in `.gitignore`) to prevent bloating the repository.

---

## 📁 Directory Structure

```
storage/
├── README.md                      # This file
├── .gitkeep                       # Preserve empty directories in git
│
├── uploads/                       # User-generated files
│   ├── avatars/                   # User profile pictures
│   ├── projects/                  # Project-level attachments
│   ├── tasks/                     # Task attachments & files
│   ├── notes/                     # Note attachments
│   ├── exports/                   # Exported data (CSV, PDF, etc.)
│   └── .gitkeep
│
├── temp/                          # Temporary processing files
│   ├── conversions/               # File format conversions
│   ├── previews/                  # Generated file previews
│   ├── imports/                   # Temporary import files
│   └── .gitkeep
│
├── cache/                         # Cache layer for fast access
│   ├── thumbnails/                # Cached image thumbnails
│   ├── previews/                  # Cached document previews
│   └── .gitkeep
│
├── archive/                       # Cold storage for archived projects
│   ├── projects/                  # Archived project data
│   ├── backups/                   # System backups
│   └── .gitkeep
│
└── logs/                          # Storage operation logs
    ├── uploads.log                # File upload activities
    ├── cleanup.log                # Cleanup operations
    └── errors.log                 # Storage errors
```

---

## 🎯 Directory Purposes

### `uploads/`
**Purpose:** Store all user-generated and uploaded files  
**Retention:** Based on storage quota and project lifecycle  
**Access:** Via authenticated API endpoints

#### `uploads/avatars/`
- User profile pictures
- **Format:** JPG, PNG (500×500px recommended)
- **Max Size:** 5MB per file
- **Naming:** `{user_id}/{file_id}.{ext}`

#### `uploads/projects/`
- Project cover images, templates
- **Format:** Images, documents
- **Max Size:** 50MB per file
- **Naming:** `{project_id}/{file_id}.{ext}`

#### `uploads/tasks/`
- Task attachments, documents, media
- **Format:** All safe formats (no executables)
- **Max Size:** 100MB per file (Free), 1GB (Enterprise)
- **Naming:** `{project_id}/tasks/{task_id}/{file_id}.{ext}`
- **Versioning:** File versions stored with `.v{N}` suffix

#### `uploads/notes/`
- Note attachments
- **Format:** Images, documents
- **Max Size:** 50MB per file
- **Naming:** `{project_id}/notes/{note_id}/{file_id}.{ext}`

#### `uploads/exports/`
- Generated exports (CSV, PDF, Excel, JSON)
- **Retention:** 7 days (configurable)
- **Naming:** `{user_id}/{export_id}_{timestamp}.{ext}`

---

### `temp/`
**Purpose:** Temporary files during processing  
**Retention:** Auto-cleaned after 24-48 hours  
**Access:** Internal backend only

#### `temp/conversions/`
- Format conversions (e.g., image to WebP for previews)
- Auto-deleted after processing

#### `temp/previews/`
- Generated previews during async processing
- Moved to `cache/previews/` on success

#### `temp/imports/`
- Staging area for bulk imports
- Cleaned up after import completion

---

### `cache/`
**Purpose:** Fast access to frequently-needed files  
**Retention:** User-configurable (24h - 30 days)  
**Storage Tier:** Can be served from CDN

#### `cache/thumbnails/`
- Image thumbnails (100×100, 300×300 variants)
- Automatically regenerated if deleted
- Recommended: 200MB - 1GB storage

#### `cache/previews/`
- Document previews (PDF → PNG, Office → PDF)
- Lazy-generated on first access
- Recommended: 500MB - 2GB storage

---

### `archive/`
**Purpose:** Cold storage for archived/deleted items  
**Retention:** Based on compliance settings (90-365 days)  
**Storage Tier:** Cheaper cloud storage (S3 Glacier, etc.)

#### `archive/projects/`
- Archived project data (when status = ARCHIVED)
- Keep for compliance & recovery
- **Retention:** 1 year (configurable)

#### `archive/backups/`
- Daily database backups
- **Retention:** 30 days rolling window

---

### `logs/`
**Purpose:** Audit trail for storage operations  
**Retention:** 90 days (configurable)

#### Files
- **uploads.log:** All file uploads (user, file, size, timestamp)
- **cleanup.log:** Storage cleanup operations
- **errors.log:** Upload errors, quota violations

---

## 🔐 Security Considerations

### File Upload Validation
```python
# ✅ DO
- Validate file extensions against whitelist
- Check MIME type (not just extension)
- Scan files for malware (ClamAV, VirusTotal)
- Generate checksums (SHA256)
- Enforce max file size limits

# ❌ DON'T
- Trust user-provided filenames
- Execute uploaded files
- Store in web-accessible directory
- Keep original uploaded filename
```

### Access Control
- Files accessible only via authenticated API
- User can only access files in their workspace
- Admin/PM can access workspace files
- Public links have expiry (configurable)

### Storage Encryption
- At-rest encryption for S3 (AWS-KMS, customer-managed keys)
- In-transit encryption (HTTPS/TLS)
- Encryption keys never stored in code

---

## 📊 Storage Quota Management

### Free Plan
- **Total Storage:** 1GB (500MB files + 500MB backups)
- **Per-File Limit:** 100MB
- **Avatar:** 5MB max
- **Retention:** 30 days after deletion

### Pro Plan
- **Total Storage:** 50GB
- **Per-File Limit:** 1GB
- **Retention:** 90 days after deletion

### Enterprise Plan
- **Total Storage:** Custom (100GB - 10TB)
- **Per-File Limit:** Custom (up to 5GB)
- **Retention:** Custom (1-5 years)

---

## 🧹 Cleanup & Maintenance

### Automatic Cleanup Tasks (Daily @ 2 AM UTC)

```bash
# 1. Clear expired temporary files
# 2. Delete expired exports (> 7 days)
# 3. Remove preview cache for deleted files
# 4. Archive old projects (inactive > 180 days)
# 5. Rotate storage logs (compress, archive)
```

### Manual Cleanup Commands

```bash
# Clean all temp files
# npm run storage:cleanup:temp

# Archive inactive projects
# npm run storage:archive:projects

# Generate storage report
# npm run storage:report
```

---

## 🔄 Storage Tiers & Transitions

### HOT Storage
- **Where:** Local SSD or S3 with standard access
- **Speed:** <100ms access
- **Cost:** ~$0.023/GB/month (S3 standard)
- **Data:** Active projects, recent files

### WARM Storage
- **Where:** S3 with infrequent access
- **Speed:** ~200-500ms access
- **Cost:** ~$0.0125/GB/month (S3-IA)
- **Data:** Projects archived 30+ days ago

### COLD Storage
- **Where:** S3 Glacier or Glacier Deep Archive
- **Speed:** ~4-24 hours retrieval time
- **Cost:** ~$0.004-0.00099/GB/month
- **Data:** Archived projects 180+ days ago
- **Retrieval:** On-demand, charged per retrieval

### Transition Policy
```
1. New file → HOT (day 0-30)
2. Inactive → WARM (day 31-180)
3. Archived → COLD (day 181+)
4. Deleted → Trash bin (day 0-30)
5. Permanent delete → Removed (day 30+)
```

---

## 🗂️ File Naming Convention

### Standard Format
```
{storage_type}/{owner_type}/{owner_id}/{resource_type}/{resource_id}/{file_id}.{version}.{ext}
```

### Examples
```
uploads/users/uuid-123/avatars/avatar-1/file-uuid.v1.jpg
uploads/projects/proj-456/tasks/task-789/attachment.v2.pdf
exports/users/uuid-123/report-export_2024-01-15.csv
cache/previews/file-uuid/preview.png
archive/projects/proj-456/backup.tar.gz
```

### Benefits
- **Namespace isolation:** Different owners don't conflict
- **Audit trail:** Clear ownership and context
- **Versioning:** Multiple versions easily tracked
- **Easy cleanup:** Remove by owner ID

---

## 🔌 Integration Points

### Backend (Python/FastAPI)
```python
from app.services.storage import StorageService

# Upload file
file_path = StorageService.upload_file(
    user_id=user.id,
    file=upload_file,
    storage_type="uploads/tasks",
    resource_id=task_id
)

# Get download URL
download_url = StorageService.get_download_url(file_id, expires_in_hours=24)

# List user files
files = StorageService.list_files(user_id=user.id, storage_type="uploads/avatars")
```

### Frontend (React/TypeScript)
```typescript
// Upload file
const response = await fetch('/api/v1/files/upload', {
  method: 'POST',
  body: formData,
  headers: { 'Authorization': `Bearer ${token}` }
});

// Download file
window.location.href = `/api/v1/files/${fileId}/download`;

// Delete file
await fetch(`/api/v1/files/${fileId}`, { method: 'DELETE' });
```

---

## 📈 Monitoring & Metrics

### Key Metrics to Track
- **Total Storage Used:** Current usage vs. quota
- **Upload Rate:** Files/day, GB/day
- **Average File Size:** To detect anomalies
- **Storage Tier Distribution:** HOT vs. WARM vs. COLD
- **Cleanup Success Rate:** % of scheduled cleanups completed
- **Error Rate:** Failed uploads, malware detections

### Dashboard Endpoints
```
GET /api/v1/admin/storage/usage              # Storage quota overview
GET /api/v1/admin/storage/metrics             # Time-series metrics
GET /api/v1/admin/storage/tier-distribution   # HOT/WARM/COLD breakdown
GET /api/v1/admin/storage/files/largest       # Top 100 largest files
```

---

## 🚀 Environment Configuration

### .env Variables
```bash
# Local Storage (Development)
STORAGE_TYPE=local
STORAGE_PATH=./storage

# S3 Storage (Production)
STORAGE_TYPE=s3
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=pronaflow-prod

# Storage Limits
MAX_FILE_SIZE_MB=100
MAX_STORAGE_QUOTA_GB=1000

# Cleanup & Maintenance
CLEANUP_ENABLED=true
CLEANUP_SCHEDULE="0 2 * * *"  # 2 AM daily
EXPORT_RETENTION_DAYS=7
TEMP_CLEANUP_HOURS=48

# Cache TTL
PREVIEW_CACHE_TTL_DAYS=30
THUMBNAIL_CACHE_TTL_DAYS=90
```

---

## 📚 References

- [File Upload Endpoint](../apps/backend/API_DOCUMENTATION.md#upload-file)
- [Storage Service](../apps/backend/app/services/storage.py)
- [File Model](../apps/backend/app/db/models/tasks.py#File)
- [Module 6: Collaboration Hub](../docs/docs%20-%20PronaFlow%20React%26FastAPI/01-Requirements/Functional-Modules/6%20-%20Unified%20Collaboration%20Hub.md)

---

## ✅ Checklist for Developers

### When Handling File Uploads
- [ ] Validate file extension & MIME type
- [ ] Check file size against limit
- [ ] Generate checksum (SHA256)
- [ ] Save with standardized naming
- [ ] Create audit log entry
- [ ] Queue malware scan
- [ ] Return file ID (not path) to user

### When Creating Storage Features
- [ ] Consider storage quota impact
- [ ] Implement cleanup for temporary files
- [ ] Add compression for appropriate types
- [ ] Cache previews & thumbnails
- [ ] Implement soft-delete before permanent delete
- [ ] Log all storage operations
- [ ] Test with large files (100MB+)

---

## 🔗 Related Documentation

- **Backend API:** [API_DOCUMENTATION.md](../apps/backend/API_DOCUMENTATION.md)
- **Database Models:** [tasks.py - File Model](../apps/backend/app/db/models/tasks.py)
- **Frontend Integration:** [File Upload Component](../apps/frontend/src/components)
- **DevOps:** [Docker volumes configuration](../docker-compose.yml)

