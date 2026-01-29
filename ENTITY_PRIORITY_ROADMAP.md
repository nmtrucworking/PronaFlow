# PRIORITY ENTITY IMPLEMENTATION ROADMAP

## Quick Summary
- **Total Entities:** 170+
- **Existing:** 5 (Users, Project, ProjectMember, Task, Note)
- **Missing:** 165+
- **Critical for MVP:** 25 entities
- **High Priority (Beta):** 22 entities
- **Medium Priority (Post-Beta):** 25+ entities

---

## CRITICAL TIER - Must Implement for MVP (Week 1-3)

### Module 1: Identity & Access
```
✓ Users (EXISTS)
✗ AuditLog - audit_id (PK) | user_id → Users | action, entity_type, entity_id, ip_address
```

### Module 2: Multi-Tenancy
```
✗ Workspace - workspace_id (PK) | owner_id → Users | name, description, status, is_deleted
✗ WorkspaceMember - workspace_member_id (PK) | workspace_id, user_id → Users | role, joined_at
✗ Tag - tag_id (PK) | workspace_id | name, color_code, entity_type_limit
```

### Module 3: Project Lifecycle
```
✓ Project (EXISTS but needs completion)
  NEEDS: governance_mode, visibility, archived_at fields
✓ ProjectMember (EXISTS but needs completion)
✗ ProjectTagMap - project_id, tag_id (both FK, composite PK)
```

### Module 4: Task Execution
```
✓ Task (EXISTS but needs completion)
  NEEDS: task_list_id, is_milestone, planned_start, planned_end, actual_start, actual_end, estimated_hours fields
✗ TaskList - task_list_id (PK) | project_id → Project | name, position, is_archived
✗ TaskAssignee - task_assignee_id (PK) | task_id, user_id → Users | is_primary
✗ Subtask - subtask_id (PK) | task_id → Task | assignee_id → Users | title, is_done, position
✗ TaskDependency - dependency_id (PK) | predecessor_task_id, successor_task_id → Task | dependency_type
✗ TaskTagMap - task_id, tag_id (both FK, composite PK)
```

### Module 5: Time Tracking
```
✗ TimeEntry - time_entry_id (PK) | user_id, task_id → Users/Task | start_time, end_time, duration_minutes, is_billable
```

### Module 6: Collaboration
```
✓ Note (EXISTS but minimal)
  NEEDS: parent_note_id, content, status (DRAFT/PUBLISHED/ARCHIVED), is_public fields
✗ Comment - comment_id (PK) | task_id, parent_comment_id → Task/Comment | author_id → Users | content, is_edited, timestamps
✗ File - file_id (PK) | task_id → Task | uploaded_by → Users | filename, mime_type, size, current_version, storage_tier
✗ Mention - mention_id (PK) | comment_id, user_id, actor_id → Comment/Users | created_at, is_notified
```

### Module 7: Notifications
```
✗ Notification - notification_id (PK) | user_id, event_id → Users | title, content, priority, is_read, expires_at
✗ NotificationPreference - preference_id (PK) | user_id → Users | channel, event_type, enabled
```

### Module 9: Personalization
```
✗ UserSettings - id (PK) | user_id → Users | language, theme_mode, base_font_size, font_family, density_mode, color_blind_mode
✗ DashboardLayouts - id (PK) | user_id, workspace_id → Users/Workspace | layout_schema (jsonb), is_active
```

### Module 12: Integration
```
✗ WebhookEndpoint - webhook_id (PK) | workspace_id → Workspace | target_url, secret_key, is_active
```

---

## HIGH PRIORITY TIER - Implement in Beta (Week 3-5)

### Module 4: Task Extensions
```
✗ TaskWatcher - watcher_id (PK) | task_id, user_id → Task/Users | created_at
✗ TaskTemplate - template_id (PK) | project_id → Project | name, definition (jsonb)
✗ TaskCustomField - field_id (PK) | project_id → Project | name, data_type, options (jsonb)
✗ TaskRecurringRule - recurrence_id (PK) | task_id → Task | pattern, config (jsonb), next_run_at, is_active
```

### Module 6: Collaboration Extensions
```
✗ FileVersion - version_id (PK) | file_id → File | version_number, checksum, storage_path, created_by
✗ ApprovalRequest - approval_id (PK) | requested_by → Users | target_type, target_id, status, timestamps
✗ Backlink - backlink_id (PK) | target_note_id → Note | source_type, source_id, created_at
```

### Module 9: UX Extensions
```
✗ UIViewPreference - id (PK) | user_id → Users | entity_type, view_mode, sort_by, filter_schema (jsonb)
✗ UserWidget - id (PK) | user_id → Users | widget_id, position, size, is_visible, collapsed
```

### Module 11: Reporting
```
✗ TimeEntry variants for reporting
✗ ResourceUtilization - utilization_id (PK) | user_id → Users | period_start, period_end, utilization_percentage
✗ KPI - kpi_id (PK) | project_id → Project | name, target_value, current_value, updated_at
```

### Module 12: Integration Extensions
```
✗ IntegrationBinding - binding_id (PK) | workspace_id → Workspace | integration_type, config (jsonb), is_active
✗ WebhookEvent - event_id (PK) | webhook_id → WebhookEndpoint | entity_type, event_type, payload (jsonb), triggered_at
```

### Module 3: Project Extensions
```
✗ ProjectTemplate - template_id (PK) | workspace_id → Workspace | created_by → Users | name, description, is_global
```

---

## MEDIUM PRIORITY TIER - Post-Beta Features (Week 6+)

### Module 4: Advanced Task Features
```
✗ TaskCustomFieldValue - value_id (PK) | task_id, field_id → Task/TaskCustomField | value
✗ ChecklistItem - item_id (PK) | checklist_id → OnboardingChecklist | description, completion_condition, order_no
```

### Module 5: Time & Reporting
```
✗ Timesheet - timesheet_id (PK) | user_id → Users | period_start, period_end, total_hours, status
✗ TimesheetEntry - entry_id (PK) | timesheet_id, task_id → Timesheet/Task | date, hours, description
✗ TimesheetApproval - approval_id (PK) | timesheet_id, approver_id → Timesheet/Users | status, timestamps
```

### Module 6: Documentation
```
✗ NoteVersion - version_id (PK) | note_id, created_by → Note/Users | content_snapshot, created_at
✗ PublicNoteLink - public_id (PK) | note_id → Note | slug, password_hash, expired_at
```

### Module 8: Archiving
```
✗ ArchivedProject - project_id (PK/FK) | archived_by → Users | archived_at, data_tier, is_read_only
✗ TrashItem - trash_id (PK) | deleted_by → Users | original_type, original_id, deleted_at, can_restore
```

### Module 10: AI/ML
```
✗ InferenceRequest - request_id (PK) | model_id → MLModel | input_data (jsonb), status, timestamps
✗ InferenceResult - result_id (PK) | request_id → InferenceRequest | output_data (jsonb), confidence_score
✗ RiskSignal - signal_id (PK) | project_id → Project | risk_type, severity, description, created_at
```

### Module 12: OAuth & API
```
✗ OAuthConnection - connection_id (PK) | user_id → Users | provider, access_token, refresh_token, expires_at
✗ ApiToken - token_id (PK) | user_id → Users | token_hash, scope, expires_at, created_at
```

### Module 14: Feature Management
```
✗ FeatureFlag - flag_key (PK) | name, description, enabled, rollout_percentage, updated_by → Users
```

### Module 15: Knowledge Base
```
✗ Article - article_id (PK) | created_by → Users | slug, status, visibility, created_at
✗ Category - category_id (PK) | parent_category_id (self-ref) | name, description
```

### Module 16: Onboarding
```
✗ OnboardingChecklist - checklist_id (PK) | reward_id → OnboardingReward | persona_role
✗ UserOnboardingStatus - status_id (PK) | user_id, checklist_id → Users/OnboardingChecklist | completed_at
```

---

## STRUCTURED ENTITY LIST BY MODULE

### **MODULE 1: IDENTITY & ACCESS MANAGEMENT**

#### Critical (MVP)
- **Users** ✓ EXISTS
- **AuditLog** ✗ MISSING | audit_id | [user_id → Users, action, entity_type, entity_id, ip_address, created_at]

#### High Priority
- **UserAuth** | auth_id | [user_id → Users, auth_method, provider, external_id]
- **UserRole** | (user_id, role_id) | [role assignment, assigned_at]
- **Session** | session_id | [user_id → Users, token_hash, expires_at]

#### Medium Priority
- **AdminUser** | admin_id | [user_id → Users, privileges (jsonb)]
- **AdminRole** | role_id | [name, permissions (jsonb)]
- **Roles** | role_id | [name, description, permissions (jsonb)]

---

### **MODULE 2: MULTI-TENANCY & WORKSPACE**

#### Critical (MVP)
- **Workspace** ✗ MISSING | workspace_id | [owner_id → Users, name, description, status, is_deleted, deleted_at]
- **WorkspaceMember** ✗ MISSING | workspace_member_id | [workspace_id, user_id → Users, role, joined_at, left_at]
- **Tag** ✗ MISSING | tag_id | [workspace_id, name, color_code, entity_type_limit]

#### High Priority
- **WorkspaceSetting** | setting_id | [workspace_id → Workspace, config_key, config_value]
- **WorkspaceInvitation** | invitation_id | [workspace_id → Workspace, invited_email, role, expires_at]

#### Medium Priority
- **WorkspaceAccessLog** | log_id | [workspace_id, user_id → Workspace/Users, action, created_at]
- **WorkspaceSubscription** | subscription_id | [workspace_id → Workspace, plan_id, status]

---

### **MODULE 3: PROJECT LIFECYCLE MANAGEMENT**

#### Critical (MVP)
- **Project** ✓ EXISTS (needs: governance_mode, visibility, archived_at)
- **ProjectMember** ✓ EXISTS (complete as defined)
- **ProjectTagMap** ✗ MISSING | (project_id, tag_id) composite

#### High Priority
- **ProjectTemplate** ✗ MISSING | template_id | [workspace_id → Workspace, created_by → Users, name, is_global]

#### Medium Priority
- **ProjectBaseline** | baseline_id | [project_id → Project, baseline_name, snapshot_data]
- **ProjectArchive** | project_id (FK) | [archived_by → Users, archived_at, data_tier, is_read_only]
- **ProjectChangeRequest** | change_id | [project_id → Project, requested_by → Users, description, status]
- **ProjectLifecycleState** | state_id | [project_id → Project, phase, status, transitioned_at]

---

### **MODULE 4: TASK EXECUTION & ORCHESTRATION**

#### Critical (MVP)
- **Task** ✓ EXISTS (needs completion of all fields)
- **TaskList** ✗ MISSING | task_list_id | [project_id → Project, name, position, is_archived]
- **TaskAssignee** ✗ MISSING | task_assignee_id | [task_id, user_id → Task/Users, is_primary]
- **Subtask** ✗ MISSING | subtask_id | [task_id → Task, assignee_id → Users, title, is_done, position]
- **TaskDependency** ✗ MISSING | dependency_id | [predecessor_task_id, successor_task_id → Task, type]
- **TaskTagMap** ✗ MISSING | (task_id, tag_id) composite

#### High Priority
- **TaskWatcher** | watcher_id | [task_id, user_id → Task/Users]
- **TaskTemplate** | template_id | [project_id → Project, name, definition (jsonb)]
- **TaskCustomField** | field_id | [project_id → Project, name, data_type, options (jsonb)]
- **TaskRecurringRule** | recurrence_id | [task_id → Task, pattern, config (jsonb), next_run_at]

#### Medium Priority
- **TaskCustomFieldValue** | value_id | [task_id, field_id → Task/TaskCustomField, value]
- **ChecklistItem** | item_id | [checklist_id, description, completion_condition, order_no]
- **FlowStep** | step_id | [task_id → Task, sequence, duration_hours, dependencies (jsonb)]

---

### **MODULE 5: TEMPORAL PLANNING & SCHEDULING**

#### Critical (MVP)
- **TimeEntry** ✗ MISSING | time_entry_id | [user_id, task_id → Users/Task, start/end times, duration_minutes, is_billable]

#### High Priority
- **Timesheet** | timesheet_id | [user_id → Users, period_start, period_end, total_hours, status]
- **TimesheetEntry** | entry_id | [timesheet_id, task_id → Timesheet/Task, date, hours, description]
- **TimesheetApproval** | approval_id | [timesheet_id, approver_id → Timesheet/Users, status]

---

### **MODULE 6: UNIFIED COLLABORATION HUB**

#### Critical (MVP)
- **Note** ✓ EXISTS (needs: content, status, is_public, parent_note_id)
- **Comment** ✗ MISSING | comment_id | [task_id, parent_comment_id → Task/Comment, author_id → Users, content, timestamps]
- **File** ✗ MISSING | file_id | [task_id → Task, uploaded_by → Users, filename, mime_type, size, current_version]
- **Mention** ✗ MISSING | mention_id | [comment_id, user_id, actor_id → Comment/Users, created_at, is_notified]

#### High Priority
- **FileVersion** | version_id | [file_id → File, version_number, checksum, storage_path, created_by]
- **ApprovalRequest** | approval_id | [target_type, target_id, requested_by → Users, status, timestamps]
- **Backlink** | backlink_id | [target_note_id → Note, source_type, source_id, created_at]

#### Medium Priority
- **NoteVersion** | version_id | [note_id, created_by → Note/Users, content_snapshot, created_at]
- **PublicNoteLink** | public_id | [note_id → Note, slug, password_hash, expired_at]
- **NoteTemplate** | template_id | [scope, owner_id → Users, name, content]
- **NoteTagMap** | (note_id, tag_id) composite
- **Article** | article_id | [created_by → Users, slug, status, visibility, created_at]

---

### **MODULE 7: EVENT-DRIVEN NOTIFICATION SYSTEM**

#### Critical (MVP)
- **Notification** ✗ MISSING | notification_id | [user_id, event_id → Users, title, content, priority, is_read, expires_at]
- **NotificationPreference** ✗ MISSING | preference_id | [user_id → Users, channel, event_type, enabled]

#### High Priority
- **NotificationTemplate** | template_id | [event_type, subject, body, variables (jsonb)]
- **DomainEvent** | event_id | [aggregate_type, aggregate_id, event_type, payload (jsonb)]

#### Medium Priority
- **NotificationItem** | item_id | [notification_id → Notification, recipient_id → Users, status, sent_at]
- **NotificationDigest** | digest_id | [user_id → Users, period, items (jsonb), sent_at]
- **NotificationInteraction** | interaction_id | [notification_id → Notification, action, created_at]

---

### **MODULE 8: DATA ARCHIVING & COMPLIANCE**

#### Medium Priority
- **ArchivedProject** | project_id (FK) | [archived_by → Users, archived_at, data_tier, is_read_only]
- **DataExportRequest** | export_id | [user_id → Users, entity_type, status, requested_at]
- **DataExportFile** | file_id | [export_id → DataExportRequest, filename, size, created_at]
- **TrashItem** | trash_id | [deleted_by → Users, original_type, original_id, deleted_at, can_restore]

#### Low Priority
- **ArchiveJob** | job_id | [project_id → Project, status, started_at, completed_at]
- **ArchivePolicy** | policy_id | [workspace_id → Workspace, retention_days, auto_delete]
- **RetentionPolicy** | policy_id | [workspace_id → Workspace, entity_type, retention_days]

---

### **MODULE 9: USER EXPERIENCE & PERSONALIZATION**

#### Critical (MVP)
- **UserSettings** ✗ MISSING | id | [user_id → Users, language, theme_mode, font_size, font_family, density, color_blind_mode]
- **DashboardLayouts** ✗ MISSING | id | [user_id, workspace_id → Users/Workspace, layout_schema (jsonb), is_active]

#### High Priority
- **UIViewPreference** ✗ MISSING | id | [user_id → Users, entity_type, view_mode, sort_by, filter_schema (jsonb)]
- **UserWidget** | id | [user_id → Users, widget_id, position, size, is_visible, collapsed]

#### Medium Priority
- **PersonaProfile** | persona_id | [user_id → Users, role_type, preferences (jsonb)]
- **UserChecklistProgress** | progress_id | [user_id, checklist_id → Users/OnboardingChecklist, completed_items]

---

### **MODULE 10: INTELLIGENT DECISION SUPPORT (AI/ML)**

#### High Priority
- **InferenceRequest** | request_id | [model_id → MLModel, input_data (jsonb), status, created_at]
- **InferenceResult** | result_id | [request_id → InferenceRequest, output_data (jsonb), confidence_score]
- **RiskSignal** | signal_id | [project_id → Project, risk_type, severity, description, created_at]

#### Medium Priority
- **MLModel** | model_id | [name, version, status, accuracy_score, created_at]
- **ModelVersion** | version_id | [model_id → MLModel, version_number, metrics (jsonb), deployed_at]
- **ModelMetric** | metric_id | [model_id → MLModel, metric_name, value, measured_at]

---

### **MODULE 11: ADVANCED ANALYTICS & REPORTING**

#### High Priority
- **ResourceUtilization** | utilization_id | [user_id → Users, period_start, period_end, utilization_percentage]
- **KPI** | kpi_id | [project_id → Project, name, target_value, current_value, updated_at]

#### Medium Priority
- **ReportDefinition** | report_id | [workspace_id → Workspace, created_by → Users, name, query (jsonb), schedule]
- **MetricSnapshot** | snapshot_id | [project_id → Project, metric_data (jsonb), captured_at]

#### Low Priority
- **ReportExecution** | execution_id | [report_id → ReportDefinition, status, executed_at, result_file_id]
- **ReportPermission** | permission_id | [report_id, user_id → ReportDefinition/Users, access_level]
- **SprintMetric** | metric_id | [sprint_id, metric_name, value]

---

### **MODULE 12: INTEGRATION ECOSYSTEM**

#### Critical (MVP)
- **WebhookEndpoint** ✗ MISSING | webhook_id | [workspace_id → Workspace, target_url, secret_key, is_active, created_at]

#### High Priority
- **IntegrationBinding** | binding_id | [workspace_id → Workspace, integration_type, config (jsonb), is_active]
- **WebhookEvent** | event_id | [webhook_id → WebhookEndpoint, entity_type, event_type, payload (jsonb), triggered_at]
- **WebhookDelivery** | delivery_id | [event_id → WebhookEvent, status, attempted_at, response_status]

#### Medium Priority
- **OAuthConnection** | connection_id | [user_id → Users, provider, access_token, refresh_token, expires_at]
- **OAuthApp** | app_id | [name, client_id, client_secret, redirect_uris (jsonb)]
- **ApiToken** | token_id | [user_id → Users, token_hash, scope, expires_at, created_at]
- **Plugin** | plugin_id | [name, version, source, config (jsonb)]

#### Low Priority
- **ApiScope** | scope_id | [name, description]
- **PluginInstallation** | installation_id | [plugin_id, workspace_id → Plugin/Workspace, is_enabled]
- **PluginTagMap** | (plugin_id, tag_id) composite

---

### **MODULE 13: SUBSCRIPTION & BILLING**

#### High Priority
- **Plan** | plan_id | [name, price, features (jsonb), currency]
- **Subscription** | subscription_id | [workspace_id, plan_id → Workspace/Plan, status, started_at, expires_at]
- **Invoice** | invoice_id | [subscription_id → Subscription, amount, status, issued_at, due_at]

#### Medium Priority
- **BillingTransaction** | transaction_id | [invoice_id → Invoice, amount, status, processed_at]

#### Low Priority
- **SubscriptionUsage** | usage_id | [subscription_id → Subscription, metric_name, value, period]
- **InvoiceLineItem** | line_id | [invoice_id → Invoice, description, amount, quantity]

---

### **MODULE 14: SYSTEM ADMINISTRATION**

#### Medium Priority
- **FeatureFlag** | flag_key | [description, enabled, rollout_percentage, updated_by → Users]
- **Roles** | role_id | [name, description, permissions (jsonb)]

#### Low Priority
- **SystemConfig** | config_id | [config_key, config_value, updated_by → Users, updated_at]
- **AdminUser** | admin_id | [user_id → Users, privileges (jsonb)]
- **AdminRole** | role_id | [name, permissions (jsonb)]
- **AdminPermission** | permission_id | [name, description]
- **AdminRolePermission** | (role_id, permission_id) composite
- **AdminUserRole** | (user_id, role_id) composite
- **AdminAuditLog** | log_id | [admin_id → AdminUser, action, target, created_at]
- **Permissions** | permission_id | [name, description, resource]
- **RolePermission** | (role_id, permission_id) composite

---

### **MODULE 15: HELP CENTER & KNOWLEDGE BASE**

#### High Priority
- **Category** | category_id | [parent_category_id (self-ref), name, description]

#### Medium Priority
- **Article** | article_id | [created_by → Users, slug, status, visibility, created_at]
- **ArticleTag** | (article_id, tag_id) composite

#### Low Priority
- **ArticleVersion** | version_id | [article_id → Article, content, created_at]
- **ArticleTranslation** | translation_id | [article_id → Article, language, title, content]
- **ArticleFeedback** | feedback_id | [article_id, user_id → Article/Users, rating, comment, created_at]
- **ArticleVisibility** | visibility_id | [article_id → Article, role, access_level]

---

### **MODULE 16: USER ONBOARDING & ADOPTION**

#### High Priority
- **OnboardingChecklist** | checklist_id | [persona_role, reward_id → OnboardingReward]
- **UserOnboardingStatus** | status_id | [user_id, checklist_id → Users/OnboardingChecklist, completed_at]

#### Medium Priority
- **OnboardingReward** | reward_id | [checklist_id → OnboardingChecklist, reward_type, reward_config (jsonb)]

#### Low Priority
- **ChecklistItem** | item_id | [checklist_id → OnboardingChecklist, description, completion_condition, order_no]
- **OnboardingFlow** | flow_id | [persona_role, steps (jsonb), created_at]
- **FeatureBeacon** | beacon_id | [feature_name, target_users (jsonb), displayed_at]
- **ProductTour** | tour_id | [name, steps (jsonb), created_at]
- **TourStep** | step_id | [tour_id → ProductTour, sequence, content, target_element]

---

## IMPLEMENTATION PATTERNS & CONVENTIONS

### Entity Type Template
```typescript
// Base fields all entities should have
export interface BaseEntity {
  id: string;                    // UUID PK
  created_at: string;            // ISO 8601 timestamp
  updated_at?: string;           // Optional update timestamp
}

// Template for relationship entity
export interface EntityWithFK extends BaseEntity {
  foreign_key_id: string;        // UUID FK
  // ... entity-specific fields
}

// Template for many-to-many junction
export interface JunctionEntity {
  entity1_id: string;            // FK 1
  entity2_id: string;            // FK 2
  // UNIQUE constraint: (entity1_id, entity2_id)
  // PK: composite of both FKs or separate junction_id
}

// Template for polymorphic entity
export interface PolymorphicEntity extends BaseEntity {
  target_type: 'TYPE_A' | 'TYPE_B' | 'TYPE_C';
  target_id: string;             // ID of polymorphic target
}

// Template for enum fields
export type EntityStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type EntityPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
```

### Foreign Key Naming Convention
- Use `entity_id` for FK: `user_id`, `project_id`, `task_id`
- Use `entity1_id, entity2_id` for many-to-many: `project_id, tag_id`
- Use `parent_entity_id` for self-referencing: `parent_note_id`, `parent_category_id`

### Status & Priority Enum Pattern
- **Status**: Always 3-4 consistent states per entity type
- **Priority**: LOW → MEDIUM → HIGH → URGENT (standardized across entities)
- **Visibility**: PUBLIC → PRIVATE (for shareable entities)

### Constraint Patterns
- **Primary Key**: Always `UUID` v4, named `{entity}_id`
- **Unique Constraints**: `UNIQUE(field1, field2)` for composite uniqueness
- **Foreign Keys**: Establish referential integrity, name with `_id` suffix
- **Not Null**: Explicitly define required vs. optional fields

---

## Migration Strategy

### Phase 1: Data Foundation (Days 1-5)
1. Create base entities (Users, Workspace, WorkspaceMember)
2. Update Project, ProjectMember with complete fields
3. Create Tags system for categorization

### Phase 2: Core Execution (Days 5-10)
1. Implement Task Management (Task, TaskList, TaskAssignee, Subtask, TaskDependency)
2. Add Task support entities (TaskTagMap, TaskWatcher, TaskTemplate)
3. Implement TimeEntry for tracking

### Phase 3: Collaboration (Days 10-15)
1. Implement Comment, Mention system
2. Add File/FileVersion for asset management
3. Extend Note with full fields

### Phase 4: User Experience (Days 15-20)
1. Implement UserSettings, DashboardLayouts, UIViewPreference
2. Add Notification, NotificationPreference
3. Create AuditLog for system auditing

### Phase 5: Advanced Features (Days 20-30)
1. Implement Integration/Webhook system
2. Add Reporting entities
3. Create Billing/Subscription entities
4. Implement Admin entities

### Phase 6: Knowledge & Onboarding (Days 30+)
1. Knowledge Base (Article, Category)
2. Onboarding system (ChecklistX3)
3. Analytics entities (ML, Reporting)
