> Quản lý phiên đăng nhập

# 1. Phân hệ 1
|Field|Type|
|---|---|
|session_id (PK)|UUID|
|user_id (FK)|UUID|
|device_info|varchar|
|ip_address|varchar|
|geo_location|varchar|
|last_active_at|timestamp|
|is_current|boolean|
|revoked_at|timestamp|