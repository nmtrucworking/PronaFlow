> Accouting / Auditing ( #AAA)
# Module 1

| Field       | Type      |     |                                   |
| ----------- | --------- | --- | --------------------------------- |
| audit_id () | UUID      | PK  |                                   |
| user_id ()  | UUID      | FK  | Người thực hiện                   |
| action      | varchar   |     | CRUD, Anonymize                   |
| entity_type | string    |     | Task, Comment, Project, Note, ... |
| entity_id   | UUID      |     | ID của bản ghi bị tác động        |
| ip_address  | varchar   |     |                                   |
| created_at  | timestamp |     |                                   |

```mermaid
erDiagram
    Audit_Log {
        uuid audit_id PK
        uuid user_id FK "Người thực hiện"
        string action "CREATE, UPDATE, DELETE, ANONYMIZE"
        string entity_type "TASK, COMMENT, PROJECT, NOTE"
        uuid entity_id "ID của bản ghi bị tác động"
        string ip_address
        timestamp created_at
    }

    Audit_Log ||--o| DATA_DIFF : has_details
```