```mermaid
erDiagram
    %% =========== Entity ===========
    %% Module 1
    USER {
        uuid user_id PK
        string email
        string username
        string password_hash
        enum status "PENDING, ACTIVE, SUSPENDED"
    }
    USER_AUTH {
        uuid user_auth_id PK
        uuid user_id FK
        uuid provider_id FK
        string provider_user_id
    }
    Audit_Log {
        UUID audit_id PK
        UUID user_id FK
        varchar action 
        varchar ip_address
        timestamp created_at 
    }

    Auth_Provider {
        UUID provider_id PK
        enum name
        timestamp created_at
    }
    ROLES {
        uuid role_id PK
        string role_name
        int hierarchy_level
    }
    PERMISSIONS {
        uuid permission_id PK
        string code
        text description
    }
    ROLE_PERMISSION {
        uuid role_id FK
        uuid permission_id FK
    }
    USER_ROLE {
        uuid user_role_id PK
        uuid user_id FK
        uuid role_id FK
    }
    SESSION {
        uuid session_id PK
        uuid user_id FK
        string device_info
        timestamp last_active_at
    }
    MFA_CONFIG {
        uuid mfa_id PK
        uuid user_id FK
        string secret_key
        boolean enabled
    }
    MFA_BACKUP_CODE {
        uuid backup_code_id PK
        uuid mfa_id FK
        string code_hash
    }
    PASSWORD_RESET_TOKEN {
        uuid token_id PK
        uuid user_id FK
        string token_hash
        timestamp expires_at
    }
    %% Module 2
    WORKSPACE {
        uuid workspace_id PK
        string name
        uuid owner_id FK
        enum status
        boolean is_deleted
    }
    WORKSPACE_MEMBER {
        uuid workspace_member_id PK
        uuid workspace_id FK
        uuid user_id FK
        enum role "OWNER, ADMIN, MEMBER, VIEWER"
    }
    WORKSPACE_INVITATION {
        uuid invitation_id PK
        uuid workspace_id FK
        string email
        enum invited_role
        string token_hash
    }
    WORKSPACE_SETTING {
        uuid workspace_id PK
        string timezone
        string work_days
        string work_hours
    }
    WORKSPACE_ACCESS_LOG {
        uuid access_id PK
        uuid user_id FK
        uuid workspace_id FK
        timestamp accessed_at
    }

    %% Module 3
    PROJECT {
        uuid project_id PK
        uuid workspace_id FK
        string name
        enum status "NOT_STARTED, IN_PROGRESS, DONE..."
        enum governance_mode "SIMPLE, STRICT"
    }
    PROJECT_MEMBER {
        uuid project_member_id PK
        uuid project_id FK
        uuid user_id FK
        enum role
    }
    PROJECT_LIFECYCLE_STATE {
        uuid state_id PK
        uuid project_id FK
        enum state
        uuid changed_by
    }
    PROJECT_BASELINE {
        uuid baseline_id PK
        uuid project_id FK
        int version
        boolean is_active
    }
    PROJECT_CHANGE_REQUEST {
        uuid pcr_id PK
        uuid project_id FK
        enum status
        uuid requested_by
    }
    PROJECT_TEMPLATE {
        uuid template_id PK
        uuid workspace_id FK
        string name
    }
    PROJECT_ARCHIVE {
        uuid archive_id PK
        uuid project_id FK
        text reason
    }

    %% Module 4
    TASK {
        uuid task_id PK
        uuid project_id FK
        uuid task_list_id FK
        string title
        enum status
        enum priority
        timestamp planned_start
        timestamp planned_end
    }
    TASK_LIST {
        uuid task_list_id PK
        uuid project_id FK
        string name
        int position
    }
    SUBTASK {
        uuid subtask_id PK
        uuid task_id FK
        string title
        boolean is_done
    }
    TASK_ASSIGNEE {
        uuid task_assignee_id PK
        uuid task_id FK
        uuid user_id FK
        boolean is_primary
    }
    TASK_DEPENDENCY {
        uuid dependency_id PK
        uuid predecessor_task_id FK
        uuid successor_task_id FK
        enum dependency_type "FS, SS, FF, SF"
    }
    TASK_CUSTOM_FIELD {
        uuid field_id PK
        uuid project_id FK
        string name
        enum data_type
    }
    TASK_CUSTOM_FIELD_VALUE {
        uuid value_id PK
        uuid task_id FK
        uuid field_id FK
        jsonb value
    }
    TASK_TAG_MAP {
        uuid task_id FK
        uuid tag_id FK
    }
    TASK_WATCHER {
        uuid watcher_id PK
        uuid task_id FK
        uuid user_id FK
    }
    TASK_TEMPLATE {
        uuid template_id PK
        uuid project_id FK
        jsonb definition
    }
    TASK_RECURRING_RULE {
        uuid recurrence_id PK
        uuid task_id FK
        enum pattern
    }

    %% Module 5
    TASK_BASELINE {
        uuid id PK
        uuid baseline_id FK
        uuid task_id FK
        timestamp snapshot_start_date
        timestamp snapshot_end_date
    }
    CALENDAR_EXCEPTION {
        uuid exception_id PK
        uuid workspace_id FK
        date exception_date
        boolean is_working_day
    }
    USER_LEAVE_REQUEST {
        uuid leave_id PK
        uuid user_id FK
        date start_date
        date end_date
    }
    SLA_POLICY {
        uuid policy_id PK
        uuid workspace_id FK
        enum priority_code
    }
    SIMULATION_SCENARIO {
        uuid scenario_id PK
        uuid project_id FK
        string name
        json change_log
    }
    WORKSPACE_CALENDAR_CONFIG {
        uuid config_id PK
        uuid workspace_id FK
        json work_hours
    }

    %% Module 6
    Approval_Action {
        UUID action_id PK
        UUID approval_id FK
        enum action
        UUID actor_id
        varchar checksum
        timestamp action_at
    }
    Approval_Request {
        UUID approval_id PK
        enum target_type
        UUID target_id
        enum status 
        UUID request_by
        timestamp request_at 
    }

    Backlink {
        UUID backlink_id PK
        enum source_type 
        UUID source_id 
        UUID target_note_id FK
        timestamp created_at 
    }

    Comment {
        UUID comment_id PK
        UUID task_id FK
        UUID parent_comment_id FK "NULL = root"
        UUID author_id FK
        text content "Rich-text (HTML, JSON)"
        boolean is_edited
        timestamp created_at
        timestamp edited_at
    }

    Comment_Edit_History {
        UUID history_id PK
        UUID comment_id FK
        text old_content
        timestamp edited_at
    }
    MENTION {
        uuid history_id PK
        uuid comment_id FK
        text old_content
    }
    FILE {
        uuid file_id PK
        uuid task_id FK
        uuid uploaded_by FK
        string filename
    }
    FILE_VERSION {
        uuid version_id PK
        uuid file_id FK
        int version_number
        string checksum
    }
    USER_PRESENCE {
        uuid presence_id PK
        uuid user_id FK
        uuid task_id FK
        timestamp last_heartbeat
    }
    NOTE {
        uuid note_id PK
        uuid project_id FK
        uuid parent_note_id FK
        string title
        text content
    }
    NOTE_VERSION {
        uuid version_id PK
        uuid note_id FK
        text content_snapshot
    }
    NOTE_TEMPLATE {
        uuid template_id PK
        uuid owner_id
        text content
    }
    PUBLIC_NOTE_LINK {
        uuid public_id PK
        uuid note_id FK
        string slug
    }

    %% Module 7
    NOTIFICATION {
        uuid notification_id PK
        uuid user_id FK
        uuid event_id FK
        string title
        boolean is_read
    }
    NOTIFICATION_ITEM {
        uuid item_id PK
        uuid notification_id FK
        uuid actor_id FK
        string action
    }
    NOTIFICATION_PREFERENCE {
        uuid preference_id PK
        uuid user_id FK
        enum channel
        boolean enabled
    }
    SUBSCRIPTION {
        uuid subscription_id PK
        uuid user_id FK
        enum target_type
        uuid target_id
    }
    DELIVERY_CHANNEL {
        uuid channel_id PK
        enum name
    }
    DELIVERY_ATTEMPT {
        uuid attempt_id PK
        uuid notification_id FK
        uuid channel_id FK
        enum status
    }
    NOTIFICATION_TEMPLATE {
        uuid template_id PK
        string event_type
        string language
        text body
    }
    NOTIFICATION_INTERACTION {
        uuid interaction_id PK
        uuid notification_id FK
        enum action
    }
    NOTIFICATION_DIGEST {
        uuid digest_id PK
        uuid user_id FK
        jsonb content_snapshot
    }
    DOMAIN_EVENT {
        uuid event_id PK
        string event_type
        jsonb payload
    }
    EVENT_CONSUMER {
        uuid consumer_id PK
        uuid event_id FK
        string consumer_name
    }

    %% Module 8
    Anonymization_Log {
        UUID log_id PK
        UUID user_id FK
        enum entity_type
        UUID entity_id
        timestamp anonymized_at
    }

    Archived_Project {
        UUID project_id "PK, FK"
        timestamp archived_at
        UUID archived_by
        enum data_tier
        boolean is_read_only
    }
    
    Archive_Job {
        UUID job_id PK
        UUID policy_id FK
        UUID entity_id
        enum status 
        timestamp executed_at
        text error_log
    }

    Archive_Policy {
        UUID policy_id PK
        enum entity_type
        enum trigger_status
        int inactive_days
        enum target_tier
        boolean is_active
    }

    Data_Export_File {
        UUID file_id PK
        UUID export_id FK
        text file_path
        varchar checksum
        timestamp expires_at
        timestamp created_at 
    }

    Data_Export_Request {
        UUID export_id PK
        UUID workspace_id FK  
        UUID requested_by
        enum format 
        enum status
        timestamp requested_at
    }
    
    Data_Tier {
        UUID tier_id PK
        enum name 
        int max_latency_ms
        varchar storage_type 
    }
    TRASH_ITEM {
        uuid trash_id PK
        enum entity_type
        uuid entity_id
        timestamp purge_after
    }
    RETENTION_POLICY {
        uuid retention_id PK
        enum entity_type
        int retention_days
    }

    %% Module 9
    USER_SETTINGS {
        uuid id PK
        uuid user_id FK
        string language
        enum theme_mode
    }
    Dashboard_Layouts {
        UUID id
        UUID user_id
        UUID workspace_id
        jsonb layout_schema
        booelean is_active
        timestamp created_at
    }
    USER_WIDGET {
        uuid id PK
        uuid user_id
        uuid widget_id
    }
    WIDGET {
        uuid id PK
        string code
        string name
    }
    UI_VIEW_PREFERENCE {
        uuid id PK
        uuid user_id
        enum entity_type
        enum view_mode
    }
    KEYBOARD_SHORTCUT {
        uuid id PK
        uuid user_id
        string key_combo
    }
    %% Module 10
    %% Module 11
    %% Module 12
    Api_Scope {
        UUID scope_id PK
        varchar code
        text description
    }

    Api_Token {
        UUID token_id "PK"
        UUID user_id "FK, Owner"
        varchar name 
        varchar token_hash "Never store plaintext"
        timestamp expires_at "nullable"
        timestamp revoked_at "nullable"
        timestamp created_at "nullable"
    }

    Api_Token_Scope {
        UUID token_id FK
        UUID scope_id FK
    }

    Api_Usage_Log {
        UUID log_id
        UUID token_id
        varchar endpoint
        varchar http_method
        int status_code
        timestamp request_at
    }
    WEBHOOK_ENDPOINT {
        uuid webhook_id PK
        uuid workspace_id FK
        string target_url
    }
    WEBHOOK_EVENT {
        uuid webhook_event_id PK
        uuid webhook_id FK
        string event_type
    }
    WEBHOOK_DELIVERY {
        uuid delivery_id PK
        uuid webhook_id FK
        int response_code
    }
    OAUTH_APP {
        uuid app_id PK
        enum provider
        string client_id
    }
    OAUTH_CONNECTION {
        uuid connection_id PK
        uuid user_id FK
        uuid app_id FK
        string access_token
    }
    INTEGRATION_BINDING {
        uuid binding_id PK
        uuid connection_id FK
        enum internal_entity
    }
    PLUGIN {
        uuid plugin_id PK
        string name
        jsonb manifest
    }
    PLUGIN_INSTALLATION {
        uuid installation_id PK
        uuid plugin_id FK
        uuid workspace_id FK
    }
    CONSENT_GRANT {
        uuid consent_id PK
        uuid user_id FK
        uuid app_id
        text scopes
    }
    
    %% Module 13
    %% Module 14
    %% Module 15
    %% Module 16

    %% =========== Relationship ===========
    %% Module 1
    USER ||--o{ USER_AUTH : has
    Auth_Provider ||--o{ USER_AUTH : provides
    USER ||--o{ USER_ROLE : assigned
    ROLES ||--o{ USER_ROLE : grants
    ROLES ||--o{ ROLE_PERMISSION : contains
    PERMISSIONS ||--o{ ROLE_PERMISSION : defines
    USER ||--o{ SESSION : maintains
    USER ||--|| MFA_CONFIG : secures
    MFA_CONFIG ||--o{ MFA_BACKUP_CODE : generates
    USER ||--o{ PASSWORD_RESET_TOKEN : requests
    USER ||--o{ Audit_Log : triggers

    %% Module 2
    USER ||--o{ WORKSPACE_MEMBER : participates
    WORKSPACE ||--o{ WORKSPACE_MEMBER : contains
    WORKSPACE ||--o{ WORKSPACE_INVITATION : invites
    USER ||--o{ WORKSPACE_INVITATION : sends
    WORKSPACE ||--|| WORKSPACE_SETTING : configures
    USER ||--o{ WORKSPACE_ACCESS_LOG : switches
    WORKSPACE ||--o{ WORKSPACE_ACCESS_LOG : accessed

    %% Module 3
    WORKSPACE ||--o{ PROJECT : owns
    PROJECT ||--o{ PROJECT_MEMBER : assigns
    USER ||--o{ PROJECT_MEMBER : joins
    PROJECT ||--o{ PROJECT_LIFECYCLE_STATE : transitions
    PROJECT ||--o{ PROJECT_BASELINE : snapshots
    PROJECT ||--o{ PROJECT_CHANGE_REQUEST : controls
    WORKSPACE ||--o{ PROJECT_TEMPLATE : defines
    PROJECT ||--|| PROJECT_ARCHIVE : archived

    %% Module 4
    PROJECT ||--o{ TASK_LIST : contains
    TASK_LIST ||--o{ TASK : includes
    TASK ||--o{ SUBTASK : breaks_into
    TASK ||--o{ TASK_ASSIGNEE : assigned
    USER ||--o{ TASK_ASSIGNEE : works_on
    TASK ||--o{ TASK_DEPENDENCY : precedes
    TASK ||--o{ TASK_DEPENDENCY : succeeds
    TASK ||--o{ TASK_WATCHER : watched_by
    TASK ||--o{ TASK_CUSTOM_FIELD_VALUE : has
    TASK_CUSTOM_FIELD ||--o{ TASK_CUSTOM_FIELD_VALUE : defines
    TASK ||--o{ TASK_TAG_MAP : tagged
    TASK ||--o{ TASK_RECURRING_RULE : repeats

    %% Module 5
    PROJECT_BASELINE ||--o{ TASK_BASELINE : contains
    TASK ||--o{ TASK_BASELINE : snapshotted
    WORKSPACE ||--o{ WORKSPACE_CALENDAR_CONFIG : defines
    WORKSPACE ||--o{ CALENDAR_EXCEPTION : has_exceptions
    USER ||--o{ USER_LEAVE_REQUEST : requests
    WORKSPACE ||--o{ SLA_POLICY : enforces
    PROJECT ||--o{ SIMULATION_SCENARIO : simulates

    %% Module 6
    TASK ||--o{ Comment : discusses
    Comment ||--o{ Comment : replies
    Comment ||--o{ MENTION : mentions
    TASK ||--o{ FILE : attaches
    FILE ||--o{ FILE_VERSION : versions
    FILE ||--o{ Approval_Request : requires
    Approval_Request ||--o{ Approval_Action : logs
    TASK ||--o{ USER_PRESENCE : viewed_by
    PROJECT ||--o{ NOTE : wiki
    NOTE ||--o{ NOTE : hierarchy
    NOTE ||--o{ NOTE_VERSION : snapshots
    NOTE ||--o{ PUBLIC_NOTE_LINK : published
    NOTE ||--o{ Backlink : referenced_by

    %% Module 7
    DOMAIN_EVENT ||--o{ NOTIFICATION : triggers
    DOMAIN_EVENT ||--o{ EVENT_CONSUMER : processed_by
    NOTIFICATION ||--o{ NOTIFICATION_ITEM : aggregates
    USER ||--o{ NOTIFICATION : receives
    USER ||--o{ SUBSCRIPTION : watches
    USER ||--o{ NOTIFICATION_PREFERENCE : configures
    NOTIFICATION ||--o{ DELIVERY_ATTEMPT : delivers
    DELIVERY_CHANNEL ||--o{ DELIVERY_ATTEMPT : via
    NOTIFICATION ||--o{ NOTIFICATION_INTERACTION : tracks
    USER ||--o{ NOTIFICATION_DIGEST : receives_digest

    %% Module 8
    Archive_Policy ||--o{ Archive_Job : triggers
    Archive_Job ||--|| Archived_Project : processes
    Archived_Project ||--|| Data_Tier : stored_in
    RETENTION_POLICY ||--o{ TRASH_ITEM : governs
    WORKSPACE ||--o{ Data_Export_Request : requests
    Data_Export_Request ||--|| Data_Export_File : produces
    USER ||--o{ Anonymization_Log : anonymized

    %% Module 9
    USER ||--|| USER_SETTINGS : configures
    USER ||--o{ DASHBOARD_LAYOUTS : customizes
    USER ||--o{ USER_WIDGET : enables
    WIDGET ||--o{ USER_WIDGET : instance_of
    USER ||--o{ KEYBOARD_SHORTCUT : defines
    USER ||--o{ UI_VIEW_PREFERENCE : prefers

    %% Module 10
    %% Module 11
    %% Module 12
    USER ||--o{ Api_Token : generates
    Api_Token ||--o{ Api_Token_Scope : has
    Api_Scope ||--o{ Api_Token_Scope : grants
    Api_Token ||--o{ Api_Usage_Log : logs
    WORKSPACE ||--o{ WEBHOOK_ENDPOINT : registers
    WEBHOOK_ENDPOINT ||--o{ WEBHOOK_EVENT : subscribes
    WEBHOOK_ENDPOINT ||--o{ WEBHOOK_DELIVERY : delivers
    USER ||--o{ OAUTH_CONNECTION : connects
    OAUTH_APP ||--o{ OAUTH_CONNECTION : authenticates
    OAUTH_CONNECTION ||--o{ INTEGRATION_BINDING : maps
    PLUGIN ||--o{ PLUGIN_INSTALLATION : installed
    WORKSPACE ||--o{ PLUGIN_INSTALLATION : enables
    USER ||--o{ CONSENT_GRANT : authorizes

    %% Module 13
    %% Module 14
    %% Module 15
    %% Module 16



```