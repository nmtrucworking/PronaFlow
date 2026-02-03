# 🔧 Storage Configuration Guide

**Last Updated:** February 3, 2026

---

## Environment Variables

Add these to your `.env` file:

```bash
################################################################################
# STORAGE CONFIGURATION
################################################################################

# Storage Backend
STORAGE_TYPE=local                          # Options: local, s3, azure
STORAGE_PATH=./storage                      # For local storage

# AWS S3 Configuration (if using S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=pronaflow-production
AWS_S3_ENDPOINT=https://s3.amazonaws.com    # Custom S3 endpoint (optional)

# Azure Blob Storage Configuration (if using Azure)
AZURE_STORAGE_ACCOUNT_NAME=pronaflow
AZURE_STORAGE_ACCOUNT_KEY=your-account-key
AZURE_CONTAINER_NAME=pronaflow-storage

# File Upload Limits
MAX_FILE_SIZE_MB=100                        # Max file size (development)
MAX_FILE_SIZE_ENTERPRISE_MB=1000            # Max file size (enterprise plan)
MAX_UPLOAD_TIMEOUT_SECONDS=300              # 5 minutes timeout for uploads
CHUNK_SIZE_MB=5                             # Chunk size for large file uploads

# Storage Quotas by Tier
STORAGE_QUOTA_FREE_GB=1
STORAGE_QUOTA_PRO_GB=50
STORAGE_QUOTA_ENTERPRISE_GB=1000

# File Type Whitelist
ALLOWED_UPLOAD_EXTENSIONS=jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx,txt,zip,mp4,mp3
BLOCKED_UPLOAD_EXTENSIONS=exe,bat,sh,com,scr,vbs,js,jar,app,dmg,iso

# Malware Scanning
ENABLE_MALWARE_SCANNING=true
MALWARE_SCAN_SERVICE=clamav               # Options: clamav, virustotal
CLAMAV_HOST=localhost
CLAMAV_PORT=3310

# VirusTotal API (if using VirusTotal)
VIRUSTOTAL_API_KEY=your-api-key

# File Retention & Cleanup
CLEANUP_ENABLED=true
CLEANUP_SCHEDULE=0 2 * * *                 # 2 AM daily (cron format)
EXPORT_RETENTION_DAYS=7
TEMP_CLEANUP_HOURS=48
TRASH_BIN_RETENTION_DAYS=30

# Storage Tiers (S3)
STORAGE_TIER_HOT=STANDARD
STORAGE_TIER_WARM=STANDARD_IA
STORAGE_TIER_COLD=GLACIER
HOT_TO_WARM_DAYS=30
WARM_TO_COLD_DAYS=180

# Cache Configuration
ENABLE_CACHE=true
PREVIEW_CACHE_TTL_DAYS=30
THUMBNAIL_CACHE_TTL_DAYS=90
THUMBNAIL_SIZES=100x100,300x300,500x500

# CDN Configuration
CDN_ENABLED=false
CDN_URL=https://cdn.example.com/files      # If using CDN (CloudFront, Cloudflare, etc.)
CDN_CACHE_TTL_DAYS=30

# Encryption
ENABLE_ENCRYPTION_AT_REST=true
ENCRYPTION_KEY=your-encryption-key         # Must be 32 bytes (256-bit)
ENCRYPTION_ALGORITHM=AES-256-GCM

# Audit Logging
STORAGE_AUDIT_LOG_ENABLED=true
STORAGE_AUDIT_LOG_PATH=./storage/logs
STORAGE_OPERATIONS_LOG=./storage/logs/operations.log

# Public/Shareable Links
PUBLIC_LINK_EXPIRY_HOURS=24
PUBLIC_LINK_MAX_DOWNLOADS=10               # 0 = unlimited
PUBLIC_LINK_ENABLE_PASSWORD=true

# Virus/Malware Quarantine
QUARANTINE_ENABLED=true
QUARANTINE_PATH=./storage/quarantine
QUARANTINE_RETENTION_DAYS=30
```

---

## Local Development Setup

### 1. Create Storage Directories

The `.gitkeep` files already exist, so directories are preserved. Just ensure write permissions:

```bash
# Windows
icacls storage /grant:r %USERNAME%:F /t

# macOS/Linux
chmod -R 755 storage
```

### 2. Configure .env for Local Development

```bash
STORAGE_TYPE=local
STORAGE_PATH=./storage
MAX_FILE_SIZE_MB=100
ENABLE_MALWARE_SCANNING=false
CLEANUP_ENABLED=false
```

### 3. Test File Upload

```bash
# Using cURL
curl -X POST http://localhost:8000/api/v1/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@sample.pdf" \
  -F "task_id=task-123"

# Or use the frontend UI
# Navigate to any task and click "Add Attachment"
```

---

## AWS S3 Production Setup

### 1. Create S3 Bucket

```bash
aws s3 mb s3://pronaflow-production \
  --region us-east-1 \
  --acl private
```

### 2. Enable Versioning

```bash
aws s3api put-bucket-versioning \
  --bucket pronaflow-production \
  --versioning-configuration Status=Enabled
```

### 3. Enable Encryption

```bash
aws s3api put-bucket-encryption \
  --bucket pronaflow-production \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
```

### 4. Set Bucket Policy (Block Public Access)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyUnencryptedObjectUploads",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::pronaflow-production/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "AES256"
        }
      }
    },
    {
      "Sid": "DenyPublicAccess",
      "Effect": "Deny",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::pronaflow-production/*",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalType": "Anonymous"
        }
      }
    }
  ]
}
```

### 5. Create IAM User for Application

```bash
# Create user
aws iam create-user --user-name pronaflow-app

# Create policy
cat > s3-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::pronaflow-production",
        "arn:aws:s3:::pronaflow-production/*"
      ]
    }
  ]
}
EOF

# Attach policy
aws iam put-user-policy \
  --user-name pronaflow-app \
  --policy-name pronaflow-s3-access \
  --policy-document file://s3-policy.json

# Create access keys
aws iam create-access-key --user-name pronaflow-app
```

### 6. Add to Environment

```bash
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=pronaflow-production
STORAGE_TYPE=s3
```

---

## Setup Lifecycle Policies (S3)

Move files between storage tiers automatically:

```bash
cat > lifecycle-policy.json << 'EOF'
{
  "Rules": [
    {
      "Id": "ArchiveToGlacier",
      "Status": "Enabled",
      "Prefix": "uploads/",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 180,
          "StorageClass": "GLACIER"
        }
      ],
      "Expiration": {
        "Days": 2555
      }
    },
    {
      "Id": "DeleteTemp",
      "Status": "Enabled",
      "Prefix": "temp/",
      "Expiration": {
        "Days": 2
      }
    }
  ]
}
EOF

aws s3api put-bucket-lifecycle-configuration \
  --bucket pronaflow-production \
  --lifecycle-configuration file://lifecycle-policy.json
```

---

## Malware Scanning Setup

### Option 1: ClamAV (Open Source)

#### Docker Setup

```yaml
# docker-compose.yml
services:
  clamav:
    image: clamav/clamav:latest
    ports:
      - "3310:3310"
    volumes:
      - clamav-data:/var/lib/clamav
    environment:
      - CLAMAV_NOFRESHCLAMUPDATE=true

volumes:
  clamav-data:
```

#### Backend Integration

```python
import pyclamd

class MalwareScanService:
    def __init__(self, host='localhost', port=3310):
        self.clam = pyclamd.ClamdNetworkSocket(host, port)
    
    def scan_file(self, file_path):
        if not self.clam.ping():
            raise Exception("ClamAV not available")
        
        result = self.clam.scan_file(file_path)
        if result:
            for fpath, (virus_status, virus_name) in result.items():
                if virus_status == 'FOUND':
                    return {'status': 'INFECTED', 'virus': virus_name}
        
        return {'status': 'CLEAN'}
```

### Option 2: VirusTotal API

```python
import requests

class MalwareScanService:
    def __init__(self, api_key):
        self.api_key = api_key
        self.url = "https://www.virustotal.com/api/v3"
    
    def scan_file(self, file_path):
        headers = {"x-apikey": self.api_key}
        
        with open(file_path, 'rb') as f:
            files = {"file": f}
            response = requests.post(
                f"{self.url}/files",
                files=files,
                headers=headers
            )
        
        return response.json()
```

---

## Monitoring & Alerts

### CloudWatch Metrics (AWS)

```python
import boto3

cloudwatch = boto3.client('cloudwatch')

cloudwatch.put_metric_data(
    Namespace='PronaFlow/Storage',
    MetricData=[
        {
            'MetricName': 'TotalStorageUsed',
            'Value': total_size_gb,
            'Unit': 'Gigabytes'
        },
        {
            'MetricName': 'FileUploadCount',
            'Value': upload_count,
            'Unit': 'Count'
        }
    ]
)
```

### S3 Event Notifications

```bash
aws s3api put-bucket-notification-configuration \
  --bucket pronaflow-production \
  --notification-configuration '{
    "SQSConfigurations": [{
      "QueueArn": "arn:aws:sqs:us-east-1:123456789:storage-events",
      "Events": ["s3:ObjectCreated:*", "s3:ObjectRemoved:*"]
    }]
  }'
```

---

## Backup Strategy

### Daily Backups to Separate Bucket

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_BUCKET="pronaflow-backups"

aws s3 sync s3://pronaflow-production/uploads/ \
  s3://$BACKUP_BUCKET/daily/$DATE/uploads/
```

### Restore from Backup

```bash
DATE=20240115_120000
aws s3 sync s3://pronaflow-backups/daily/$DATE/ \
  s3://pronaflow-production/
```

---

## Performance Optimization

### Enable CloudFront CDN

```bash
# Create CloudFront distribution for S3
aws cloudfront create-distribution \
  --distribution-config '{
    "CallerReference": "pronaflow-cdn",
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3Origin",
      "ViewerProtocolPolicy": "https-only",
      "AllowedMethods": ["GET", "HEAD"],
      "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
    },
    "Enabled": true
  }'
```

### Multipart Upload for Large Files

```python
from boto3.s3.transfer import S3Transfer

transfer = S3Transfer(s3_client)
transfer.upload_file(
    'large-file.zip',
    'pronaflow-production',
    'uploads/projects/project-1/large-file.zip',
    extra_args={'Metadata': {'user': 'user-123'}}
)
```

---

## Troubleshooting

### Issue: S3 Access Denied

```bash
# Check IAM permissions
aws iam get-user-policy --user-name pronaflow-app --policy-name pronaflow-s3-access

# Check bucket policy
aws s3api get-bucket-policy --bucket pronaflow-production
```

### Issue: File Upload Timeout

```python
# Increase timeout in config
session = boto3.Session()
s3_client = session.client(
    's3',
    config=botocore.config.Config(
        connect_timeout=30,
        retries={'max_attempts': 3}
    )
)
```

### Issue: ClamAV Not Responding

```bash
# Check ClamAV status
docker logs clamav

# Update virus definitions
docker exec clamav freshclam
```

---

## Security Best Practices Checklist

- [ ] Use private S3 bucket (no public access)
- [ ] Enable versioning on S3 bucket
- [ ] Enable encryption at rest (SSE-S3 or KMS)
- [ ] Rotate AWS access keys quarterly
- [ ] Use VPC endpoints for S3 (no internet exposure)
- [ ] Enable bucket logging and monitoring
- [ ] Implement lifecycle policies for cost optimization
- [ ] Setup MFA delete protection
- [ ] Enable CloudTrail for audit logging
- [ ] Use separate buckets for production/staging
- [ ] Implement malware scanning for all uploads
- [ ] Set up file integrity monitoring (checksums)

---

## References

- [AWS S3 Security](https://docs.aws.amazon.com/s3/latest/userguide/security.html)
- [ClamAV Documentation](https://www.clamav.net/)
- [boto3 S3 API](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html)
