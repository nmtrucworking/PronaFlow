>Liên kết User ↔ AuthProvider (OAuth / Local)

# 1. Phân hệ 1

|Field|Type|Note|
|---|---|---|
|user_auth_id (PK)|UUID||
|user_id (FK)|UUID||
|provider_id (FK)|UUID||
|provider_user_id|varchar|id từ Google/GitHub|
|created_at|timestamp||