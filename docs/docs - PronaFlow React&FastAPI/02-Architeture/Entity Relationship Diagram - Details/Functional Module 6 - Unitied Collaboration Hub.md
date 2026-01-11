# Entity
|Domain|Entity|
|---|---|
|Discussion|Comment, CommentThread, Mention|
|Digital Asset|File, FileVersion|
|Approval|ApprovalRequest, ApprovalAction|
|Presence|UserPresence|
|Notes / Wiki|Note, NoteVersion, NoteTemplate|
|Search / Link|Backlink|

# ERD
```mermaid
erDiagram
    TASK ||--o{ COMMENT : has
    COMMENT ||--o{ COMMENT : replies
    COMMENT ||--o{ MENTION : mentions

    TASK ||--o{ FILE : attaches
    FILE ||--o{ FILE_VERSION : versions

    FILE ||--o{ APPROVAL_REQUEST : requires
    APPROVAL_REQUEST ||--o{ APPROVAL_ACTION : logs

    TASK ||--o{ USER_PRESENCE : viewed_by

    PROJECT ||--o{ NOTE : contains
    NOTE ||--o{ NOTE : hierarchy
    NOTE ||--o{ NOTE_VERSION : snapshots

    NOTE ||--o{ PUBLIC_NOTE_LINK : published
    NOTE ||--o{ BACKLINK : referenced_by

```