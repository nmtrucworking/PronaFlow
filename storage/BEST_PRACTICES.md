# 🏆 Storage Best Practices & Implementation Guide

**Last Updated:** February 3, 2026

---

## 📌 Quick Reference

| Aspect | Best Practice | Implementation |
|--------|---------------|-----------------|
| **Upload Validation** | Whitelist-based file type checking | Check extension + MIME type + magic bytes |
| **File Naming** | UUID + timestamp + original extension | `{file_id}_{timestamp}.{ext}` |
| **Storage Path** | Nested by context (user/project/task) | `uploads/{project}/{task}/{file_id}.ext` |
| **Versioning** | Automatic version tracking | Store `.v1`, `.v2` files, keep metadata |
| **Cleanup** | Auto-delete after 30/60/90 days | Implement scheduled cleanup tasks |
| **Malware** | Scan all files immediately | ClamAV or VirusTotal integration |
| **Encryption** | AES-256 at rest + HTTPS in transit | S3-KMS or application-level encryption |
| **Quota** | Per-user/workspace limits | Enforce during upload |
| **Monitoring** | Log all operations | Track uploads, deletes, scans, errors |

---

## 🔒 Security Implementation

### 1. Input Validation

```python
# ✅ SECURE Upload Validation
import hashlib
import magic
from pathlib import Path

class FileValidator:
    # Whitelist of safe MIME types
    ALLOWED_MIME_TYPES = {
        'image/jpeg': ['jpg', 'jpeg'],
        'image/png': ['png'],
        'image/gif': ['gif'],
        'application/pdf': ['pdf'],
        'text/plain': ['txt'],
        'application/zip': ['zip'],
    }
    
    BLOCKED_EXTENSIONS = {
        'exe', 'bat', 'sh', 'com', 'scr', 'vbs', 'jar',
        'app', 'dmg', 'iso', 'msi', 'dll', 'so', 'dylib'
    }
    
    @staticmethod
    def validate_upload(file_obj, filename: str, max_size_mb: int = 100):
        """
        Comprehensive file validation
        
        Returns:
            (is_valid: bool, error_message: str | None)
        """
        # 1. Check extension
        file_ext = Path(filename).suffix.lower().lstrip('.')
        if file_ext in FileValidator.BLOCKED_EXTENSIONS:
            return False, f"Blocked file type: .{file_ext}"
        
        # 2. Check file size
        file_obj.seek(0, 2)
        file_size = file_obj.tell()
        file_obj.seek(0)
        
        if file_size > max_size_mb * 1024 * 1024:
            return False, f"File exceeds {max_size_mb}MB limit"
        
        if file_size == 0:
            return False, "Empty file not allowed"
        
        # 3. Check MIME type (magic bytes)
        mime = magic.from_buffer(file_obj.read(1024), mime=True)
        file_obj.seek(0)
        
        if mime not in FileValidator.ALLOWED_MIME_TYPES:
            return False, f"Invalid file type: {mime}"
        
        # 4. Verify extension matches MIME type
        if file_ext not in FileValidator.ALLOWED_MIME_TYPES[mime]:
            return False, f"Extension mismatch: {file_ext} vs {mime}"
        
        return True, None

# Usage
validator = FileValidator()
is_valid, error = validator.validate_upload(file_obj, "document.pdf", max_size_mb=100)
if not is_valid:
    raise HTTPException(status_code=400, detail=error)
```

### 2. Safe File Storage

```python
import uuid
import hashlib
from datetime import datetime
from pathlib import Path

class StorageManager:
    def __init__(self, storage_path: str):
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(parents=True, exist_ok=True)
    
    @staticmethod
    def generate_safe_filename(original_filename: str) -> tuple[str, str]:
        """
        Generate safe filename while preserving original
        
        Returns:
            (safe_filename, file_id)
        """
        file_id = str(uuid.uuid4())
        ext = Path(original_filename).suffix.lower()
        timestamp = datetime.utcnow().isoformat()
        
        # Store original as metadata, use UUID for actual file
        safe_filename = f"{file_id}{ext}"
        
        return safe_filename, file_id
    
    def save_file(self, file_obj, project_id: str, task_id: str, original_filename: str):
        """
        Save file with version control
        """
        # 1. Validate
        is_valid, error = FileValidator.validate_upload(file_obj, original_filename)
        if not is_valid:
            raise ValueError(error)
        
        # 2. Generate safe filename
        safe_filename, file_id = self.generate_safe_filename(original_filename)
        
        # 3. Create nested directory structure
        file_dir = self.storage_path / 'uploads' / project_id / 'tasks' / task_id
        file_dir.mkdir(parents=True, exist_ok=True)
        
        # 4. Generate checksum BEFORE saving
        file_obj.seek(0)
        checksum = hashlib.sha256()
        file_data = file_obj.read()
        checksum.update(file_data)
        checksum_hex = checksum.hexdigest()
        
        # 5. Check if file already exists (by checksum)
        file_path = file_dir / safe_filename
        if file_path.exists():
            existing_checksum = self._compute_file_checksum(file_path)
            if existing_checksum == checksum_hex:
                return file_id, "DUPLICATE"  # File already exists
        
        # 6. Save file atomically (write to temp, then move)
        temp_path = file_path.with_suffix('.tmp')
        temp_path.write_bytes(file_data)
        temp_path.replace(file_path)
        
        # 7. Return metadata
        return file_id, checksum_hex, file_path
    
    @staticmethod
    def _compute_file_checksum(file_path: Path) -> str:
        """Compute SHA256 checksum of existing file"""
        checksum = hashlib.sha256()
        with open(file_path, 'rb') as f:
            for chunk in iter(lambda: f.read(4096), b''):
                checksum.update(chunk)
        return checksum.hexdigest()
```

### 3. Malware Scanning

```python
import asyncio
from enum import Enum

class ScanStatus(str, Enum):
    PENDING = "pending"
    SCANNING = "scanning"
    CLEAN = "clean"
    INFECTED = "infected"
    QUARANTINED = "quarantined"

class MalwareScanService:
    def __init__(self, scan_engine='clamav'):
        self.scan_engine = scan_engine
        if scan_engine == 'clamav':
            import pyclamd
            self.clam = pyclamd.ClamdNetworkSocket('localhost', 3310)
        elif scan_engine == 'virustotal':
            self.api_key = os.getenv('VIRUSTOTAL_API_KEY')
    
    async def scan_file_async(self, file_path: str):
        """
        Async file scanning (non-blocking)
        """
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(
            None, 
            self._scan_file_sync, 
            file_path
        )
        return result
    
    def _scan_file_sync(self, file_path: str):
        """Blocking scan operation"""
        try:
            if self.scan_engine == 'clamav':
                result = self.clam.scan_file(file_path)
                if result:
                    for path, (status, virus_name) in result.items():
                        if status == 'FOUND':
                            return {
                                'status': ScanStatus.INFECTED,
                                'virus': virus_name,
                                'path': path
                            }
                return {'status': ScanStatus.CLEAN}
            
            elif self.scan_engine == 'virustotal':
                return self._scan_virustotal(file_path)
        
        except Exception as e:
            return {
                'status': ScanStatus.QUARANTINED,
                'error': str(e)
            }
    
    def _scan_virustotal(self, file_path: str):
        """Scan using VirusTotal API"""
        import requests
        
        with open(file_path, 'rb') as f:
            files = {'file': f}
            headers = {'x-apikey': self.api_key}
            response = requests.post(
                'https://www.virustotal.com/api/v3/files',
                files=files,
                headers=headers
            )
        
        if response.status_code != 200:
            return {'status': ScanStatus.QUARANTINED, 'error': response.text}
        
        return {'status': ScanStatus.CLEAN, 'vt_response': response.json()}
```

### 4. Access Control

```python
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

class FileAccessControl:
    @staticmethod
    def can_access_file(user_id: str, file_id: str, db: Session) -> bool:
        """
        Check if user has permission to access file
        """
        # Get file metadata
        file = db.query(File).filter(File.id == file_id).first()
        if not file:
            raise HTTPException(status_code=404, detail="File not found")
        
        # Get task to check project
        task = db.query(Task).filter(Task.id == file.task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        
        # Check project access
        project = db.query(Project).filter(Project.id == task.project_id).first()
        
        # Get user project access
        member = db.query(ProjectMember).filter(
            and_(
                ProjectMember.project_id == project.id,
                ProjectMember.user_id == user_id
            )
        ).first()
        
        if not member:
            raise HTTPException(
                status_code=403, 
                detail="Access denied"
            )
        
        return True
    
    @staticmethod
    def get_download_url(file_id: str, expires_in_hours: int = 24) -> str:
        """
        Generate time-limited download URL
        """
        expiry = datetime.utcnow() + timedelta(hours=expires_in_hours)
        
        payload = {
            'file_id': file_id,
            'exp': expiry,
            'iat': datetime.utcnow()
        }
        
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return f"/api/v1/files/{file_id}/download?token={token}"
```

---

## 📊 Storage Implementation Examples

### FastAPI Upload Endpoint

```python
from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/v1/files", tags=["Files"])

@router.post("/upload", response_model=FileResponse)
async def upload_file(
    task_id: str = Query(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Upload file to task with automatic scanning & versioning
    """
    try:
        # 1. Validate file
        is_valid, error = FileValidator.validate_upload(file.file, file.filename)
        if not is_valid:
            raise HTTPException(status_code=400, detail=error)
        
        # 2. Save file safely
        storage_mgr = StorageManager(settings.STORAGE_PATH)
        file_id, checksum, file_path = storage_mgr.save_file(
            file.file,
            project_id=current_user.current_workspace_id,
            task_id=task_id,
            original_filename=file.filename
        )
        
        # 3. Create file record in database
        file_obj = File(
            id=uuid.uuid4(),
            task_id=uuid.UUID(task_id),
            uploaded_by=current_user.id,
            filename=file.filename,
            mime_type=file.content_type,
            size=file.size,
            storage_path=str(file_path),
            storage_provider="local",
            current_version=1
        )
        db.add(file_obj)
        db.flush()
        
        # 4. Create version record
        version = FileVersion(
            id=uuid.uuid4(),
            file_id=file_obj.id,
            version_number=1,
            storage_path=str(file_path),
            size=file.size,
            checksum=checksum
        )
        db.add(version)
        
        # 5. Queue async malware scan
        if settings.ENABLE_MALWARE_SCANNING:
            scan_service = MalwareScanService()
            asyncio.create_task(
                scan_service.scan_file_async(str(file_path))
            )
        
        db.commit()
        
        return FileResponse(
            id=file_obj.id,
            filename=file.filename,
            size=file.size,
            created_at=file_obj.created_at
        )
    
    except Exception as e:
        db.rollback()
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="Upload failed")

@router.get("/{file_id}/download")
async def download_file(
    file_id: str,
    token: str = Query(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Download file with access control
    """
    # Verify token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        if payload['file_id'] != file_id:
            raise HTTPException(status_code=403, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    
    # Check access
    FileAccessControl.can_access_file(current_user.id, file_id, db)
    
    # Get file
    file = db.query(File).filter(File.id == file_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    
    # Log download
    logger.info(f"File download: {file_id} by {current_user.id}")
    
    # Return file
    return FileResponse(
        path=file.storage_path,
        filename=file.filename,
        media_type=file.mime_type
    )

@router.delete("/{file_id}")
async def delete_file(
    file_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Soft-delete file (move to trash, permanent delete after 30 days)
    """
    file = db.query(File).filter(File.id == file_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    
    # Check ownership
    FileAccessControl.can_access_file(current_user.id, file_id, db)
    
    # Soft delete
    file.deleted_at = datetime.utcnow()
    db.commit()
    
    logger.info(f"File soft-deleted: {file_id} by {current_user.id}")
    
    return {"status": "deleted"}
```

---

## 🧹 Cleanup & Maintenance Tasks

```python
from celery import Celery
from datetime import timedelta

app = Celery('pronaflow')

@app.task(name='storage.cleanup_temp')
def cleanup_temp_files():
    """Delete temporary files older than 48 hours"""
    temp_path = Path(settings.STORAGE_PATH) / 'temp'
    now = datetime.utcnow()
    
    for file in temp_path.rglob('*'):
        if file.is_file():
            age = now - datetime.fromtimestamp(file.stat().st_mtime)
            if age > timedelta(hours=48):
                file.unlink()
                logger.info(f"Deleted temp file: {file}")

@app.task(name='storage.cleanup_exports')
def cleanup_exports():
    """Delete old exports"""
    exports_path = Path(settings.STORAGE_PATH) / 'uploads' / 'exports'
    now = datetime.utcnow()
    
    for file in exports_path.glob('*'):
        if file.is_file():
            age = now - datetime.fromtimestamp(file.stat().st_mtime)
            if age > timedelta(days=settings.EXPORT_RETENTION_DAYS):
                file.unlink()

@app.task(name='storage.empty_trash')
def empty_trash():
    """Permanently delete files in trash older than 30 days"""
    db = SessionLocal()
    
    deletion_threshold = datetime.utcnow() - timedelta(
        days=settings.TRASH_BIN_RETENTION_DAYS
    )
    
    old_files = db.query(File).filter(
        and_(
            File.deleted_at != None,
            File.deleted_at < deletion_threshold
        )
    ).all()
    
    for file in old_files:
        # Delete from storage
        if Path(file.storage_path).exists():
            Path(file.storage_path).unlink()
        
        # Delete from database
        db.delete(file)
        logger.info(f"Permanently deleted: {file.id}")
    
    db.commit()

# Schedule tasks
from celery.schedules import crontab

app.conf.beat_schedule = {
    'cleanup-temp': {
        'task': 'storage.cleanup_temp',
        'schedule': crontab(hour=2, minute=0),  # 2 AM daily
    },
    'cleanup-exports': {
        'task': 'storage.cleanup_exports',
        'schedule': crontab(hour=3, minute=0),  # 3 AM daily
    },
    'empty-trash': {
        'task': 'storage.empty_trash',
        'schedule': crontab(hour=4, minute=0),  # 4 AM daily
    },
}
```

---

## 📈 Monitoring & Logging

```python
import logging

logger = logging.getLogger('storage')

def log_file_operation(operation: str, file_id: str, user_id: str, status: str, metadata: dict = None):
    """
    Log all file operations for audit trail
    """
    log_entry = {
        'timestamp': datetime.utcnow().isoformat(),
        'operation': operation,  # upload, download, delete, scan
        'file_id': file_id,
        'user_id': user_id,
        'status': status,  # success, failure, error
        'metadata': metadata or {}
    }
    
    logger.info(json.dumps(log_entry))

# Usage in upload endpoint
log_file_operation(
    operation='upload',
    file_id=str(file_obj.id),
    user_id=str(current_user.id),
    status='success',
    metadata={'filename': file.filename, 'size': file.size}
)
```

---

## ✅ Checklist for Storage Implementation

- [ ] Implement file upload validation (extension, MIME, magic bytes)
- [ ] Setup malware scanning (ClamAV or VirusTotal)
- [ ] Implement versioning for files
- [ ] Add access control checks
- [ ] Setup cleanup tasks (temp, exports, trash)
- [ ] Implement audit logging
- [ ] Setup S3/Azure storage (if not local)
- [ ] Configure lifecycle policies
- [ ] Setup CDN (CloudFront/Cloudflare)
- [ ] Implement quotas per user/workspace
- [ ] Add preview generation (async)
- [ ] Implement thumbnail caching
- [ ] Setup monitoring & alerts
- [ ] Create backup strategy
- [ ] Document storage architecture
