> Explicit user consent (GDPR-safe)

|Field|Type|
|---|---|
|consent_id (PK)|UUID|
|user_id (FK)|UUID|
|app_type|enum|
|app_id|UUID|
|scopes|text|
|granted_at|timestamp|
|revoked_at|timestamp|