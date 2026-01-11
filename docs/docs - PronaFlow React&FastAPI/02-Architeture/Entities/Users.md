> Định danh cốt lõi của hệ thống

## 1. Phân hệ 1

|Field|Type|Note|
|---|---|---|
|user_id (PK)|UUID||
|email|varchar|unique|
|username|varchar|unique|
|password_hash|varchar|nullable (OAuth user)|
|status|enum|PENDING / ACTIVE / SUSPENDED|
|email_verified_at|timestamp||
|created_at|timestamp||
|updated_at|timestamp||