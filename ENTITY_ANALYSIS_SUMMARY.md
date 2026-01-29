# PronaFlow Entity Analysis Summary
**Generated:** January 29, 2026

---

## Overview

This document provides a comprehensive analysis of all 170+ entity definitions from PronaFlow's architecture documentation, comparing them with existing frontend type definitions and identifying implementation gaps.

**Key Statistics:**
- **Total Entities Defined:** 170+
- **UI-Facing Entities (Priority):** 47
- **Existing Frontend Types:** 5 base entities (Project, Task, Note, Member, Reference)
- **Missing Implementations:** 42 core UI-facing entities
- **Internal/Admin Entities:** 65+ (for backend only, non-UI-critical)

---

## Entity Implementation Status Summary

### Module 1: Identity & Access Management
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| **Users** | EXISTS | id, email, username, password_hash, status, email_verified_at, created_at, updated_at | PK: id | HIGH |
| AuditLog | MISSING | audit_id, user_id, action, entity_type, entity_id, ip_address, created_at | FK: user_id → Users | HIGH |
| UserAuth | MISSING | auth_id, user_id, auth_method, provider, external_id, created_at | FK: user_id → Users | MEDIUM |
| UserRole | MISSING | user_id, role_id, assigned_at | FK: user_id → Users; role_id → Roles | MEDIUM |
| Session | MISSING | session_id, user_id, token_hash, expires_at, created_at | FK: user_id → Users | MEDIUM |

### Module 2: Multi-Tenancy & Workspace Management
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| **Workspace** | MISSING | workspace_id, name, description, owner_id, status, is_deleted, deleted_at, created_at, updated_at | PK: workspace_id; FK: owner_id → Users | HIGH |
| **WorkspaceMember** | MISSING | workspace_member_id, workspace_id, user_id, role, joined_at, left_at, is_active | FK: workspace_id, user_id; UNIQUE(workspace_id, user_id) | HIGH |
| WorkspaceAccessLog | MISSING | log_id, workspace_id, user_id, action, created_at | FK: workspace_id, user_id | MEDIUM |
| WorkspaceSetting | MISSING | setting_id, workspace_id, config_key, config_value | FK: workspace_id | MEDIUM |
| WorkspaceInvitation | MISSING | invitation_id, workspace_id, invited_email, role, expires_at | FK: workspace_id | MEDIUM |

### Module 3: Project Lifecycle Management
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| **Project** | EXISTS | project_id, workspace_id, name, description, status, governance_mode, visibility, owner_id, start_date, end_date, archived_at, created_at, updated_at | PK: project_id; FK: workspace_id, owner_id | HIGH |
| **ProjectMember** | EXISTS (Partial) | project_member_id, project_id, user_id, role, joined_at | PK: project_member_id; FK: project_id, user_id; UNIQUE(project_id, user_id) | HIGH |
| ProjectTemplate | MISSING | template_id, workspace_id, name, description, is_global, created_by, created_at | FK: workspace_id, created_by → Users | MEDIUM |
| ProjectLifecycleState | MISSING | state_id, project_id, phase, status, transitioned_at | FK: project_id | LOW |
| ProjectBaseline | MISSING | baseline_id, project_id, baseline_name, snapshot_data, created_at | FK: project_id | MEDIUM |
| ProjectArchive | MISSING | project_id, archived_at, archived_by, data_tier, is_read_only | FK: project_id, archived_by | MEDIUM |
| ProjectTagMap | MISSING | project_id, tag_id | FK: project_id → Project; tag_id → Tag | HIGH |
| ProjectChangeRequest | MISSING | change_id, project_id, requested_by, description, status, created_at | FK: project_id, requested_by | MEDIUM |

### Module 4: Task Execution & Orchestration
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| **Task** | EXISTS (Partial) | task_id, project_id, task_list_id, title, description, status, priority, is_milestone, planned_start, planned_end, actual_start, actual_end, estimated_hours, created_by, created_at | PK: task_id; FK: project_id, task_list_id, created_by | HIGH |
| **TaskList** | MISSING | task_list_id, project_id, name, position, is_archived, created_at | PK: task_list_id; FK: project_id | HIGH |
| **Subtask** | MISSING | subtask_id, task_id, title, is_done, assignee_id, position | PK: subtask_id; FK: task_id, assignee_id → Users | HIGH |
| **TaskAssignee** | MISSING | task_assignee_id, task_id, user_id, is_primary | PK: task_assignee_id; FK: task_id, user_id | HIGH |
| **TaskDependency** | MISSING | dependency_id, predecessor_task_id, successor_task_id, dependency_type, created_at | PK: dependency_id; FK: predecessor/successor_task_id | HIGH |
| **TaskTagMap** | MISSING | task_id, tag_id | FK: task_id, tag_id | HIGH |
| TaskWatcher | MISSING | watcher_id, task_id, user_id, created_at | FK: task_id, user_id | MEDIUM |
| TaskTemplate | MISSING | template_id, project_id, name, definition (jsonb), created_at | FK: project_id | MEDIUM |
| TaskCustomField | MISSING | field_id, project_id, name, data_type, options (jsonb) | FK: project_id | MEDIUM |
| TaskCustomFieldValue | MISSING | value_id, task_id, field_id, value | FK: task_id, field_id | MEDIUM |
| TaskRecurringRule | MISSING | recurrence_id, task_id, pattern, config (jsonb), next_run_at, is_active | FK: task_id | MEDIUM |
| ChecklistItem | MISSING | item_id, checklist_id, description, completion_condition, order_no | FK: checklist_id | LOW |

### Module 5: Temporal Planning & Scheduling
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| FlowStep | MISSING | step_id, task_id, sequence, duration_hours, dependencies (jsonb), created_at | FK: task_id | MEDIUM |
| TimeEntry | MISSING | time_entry_id, user_id, task_id, start_time, end_time, duration_minutes, is_billable, source, created_at | FK: user_id, task_id | HIGH |
| Timesheet | MISSING | timesheet_id, user_id, period_start, period_end, total_hours, status, submitted_at | FK: user_id | MEDIUM |
| TimesheetEntry | MISSING | entry_id, timesheet_id, task_id, date, hours, description | FK: timesheet_id, task_id | MEDIUM |
| TimesheetApproval | MISSING | approval_id, timesheet_id, approver_id, status, approved_at | FK: timesheet_id, approver_id | MEDIUM |

### Module 6: Unified Collaboration Hub
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| **Note** | EXISTS (Minimal) | note_id, project_id, parent_note_id, author_id, title, content, status, created_at, is_public | PK: note_id; FK: project_id, parent_note_id, author_id | HIGH |
| **Comment** | MISSING | comment_id, task_id, parent_comment_id, author_id, content, is_edited, created_at, edited_at | PK: comment_id; FK: task_id, parent_comment_id, author_id | HIGH |
| **Mention** | MISSING | mention_id, comment_id, user_id, actor_id, created_at, is_notified | FK: comment_id, user_id, actor_id | HIGH |
| **Backlink** | MISSING | backlink_id, source_type, source_id, target_note_id, created_at | FK: target_note_id | MEDIUM |
| **File** | MISSING | file_id, task_id, uploaded_by, filename, mime_type, size, current_version, storage_tier, created_at | FK: task_id, uploaded_by → Users | HIGH |
| **FileVersion** | MISSING | version_id, file_id, version_number, checksum, storage_path, created_by, created_at | FK: file_id, created_by | MEDIUM |
| NoteVersion | MISSING | version_id, note_id, content_snapshot, created_by, created_at | FK: note_id, created_by | MEDIUM |
| NoteTemplate | MISSING | template_id, scope, owner_id, name, content, created_at | FK: owner_id | MEDIUM |
| NoteTagMap | MISSING | note_id, tag_id | FK: note_id, tag_id | MEDIUM |
| PublicNoteLink | MISSING | public_id, note_id, slug, password_hash, expired_at | FK: note_id | LOW |
| ApprovalRequest | MISSING | approval_id, target_type, target_id, status, requested_by, requested_at | FK: requested_by → Users | MEDIUM |

### Module 7: Event-Driven Notification System
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| **Notification** | MISSING | notification_id, user_id, event_id, title, content, priority, is_read, expires_at, created_at | PK: notification_id; FK: user_id, event_id | HIGH |
| **NotificationPreference** | MISSING | preference_id, user_id, channel, event_type, enabled | FK: user_id | HIGH |
| NotificationTemplate | MISSING | template_id, event_type, subject, body, variables (jsonb) | - | MEDIUM |
| NotificationItem | MISSING | item_id, notification_id, recipient_id, status, sent_at | FK: notification_id | MEDIUM |
| NotificationDigest | MISSING | digest_id, user_id, period, items (jsonb), sent_at | FK: user_id | LOW |
| NotificationInteraction | MISSING | interaction_id, notification_id, action, created_at | FK: notification_id | LOW |
| DomainEvent | MISSING | event_id, aggregate_type, aggregate_id, event_type, payload (jsonb), created_at | - | MEDIUM |

### Module 8: Data Archiving & Compliance
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| ArchivedProject | MISSING | project_id, archived_at, archived_by, data_tier, is_read_only | FK: project_id, archived_by | MEDIUM |
| ArchiveJob | MISSING | job_id, project_id, status, started_at, completed_at | FK: project_id | LOW |
| ArchivePolicy | MISSING | policy_id, workspace_id, retention_days, auto_delete | FK: workspace_id | LOW |
| DataExportRequest | MISSING | export_id, user_id, entity_type, status, requested_at | FK: user_id | MEDIUM |
| DataExportFile | MISSING | file_id, export_id, filename, size, created_at | FK: export_id | MEDIUM |
| RetentionPolicy | MISSING | policy_id, workspace_id, entity_type, retention_days | FK: workspace_id | LOW |
| TrashItem | MISSING | trash_id, original_type, original_id, deleted_by, deleted_at, can_restore | FK: deleted_by | MEDIUM |

### Module 9: User Experience & Personalization
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| **UserSettings** | MISSING | id, user_id, language, theme_mode, base_font_size, font_family, density_mode, color_blind_mode, created_at, updated_at | FK: user_id | HIGH |
| **DashboardLayouts** | MISSING | id, user_id, workspace_id, layout_schema (jsonb), is_active, created_at | FK: user_id, workspace_id | HIGH |
| **UIViewPreference** | MISSING | id, user_id, entity_type, view_mode, sort_by, filter_schema (jsonb) | FK: user_id | HIGH |
| **UserWidget** | MISSING | id, user_id, widget_id, position, size, is_visible, collapsed | FK: user_id | MEDIUM |
| PersonaProfile | MISSING | persona_id, user_id, role_type, preferences (jsonb), created_at | FK: user_id | LOW |
| UserChecklistProgress | MISSING | progress_id, user_id, checklist_id, completed_items | FK: user_id, checklist_id | LOW |

### Module 10: Intelligent Decision Support (AI/ML)
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| MLModel | MISSING | model_id, name, version, status, accuracy_score, created_at | - | LOW |
| ModelVersion | MISSING | version_id, model_id, version_number, metrics (jsonb), deployed_at | FK: model_id | LOW |
| ModelMetric | MISSING | metric_id, model_id, metric_name, value, measured_at | FK: model_id | LOW |
| InferenceRequest | MISSING | request_id, model_id, input_data (jsonb), status, created_at | FK: model_id | MEDIUM |
| InferenceResult | MISSING | result_id, request_id, output_data (jsonb), confidence_score, created_at | FK: request_id | MEDIUM |
| RiskSignal | MISSING | signal_id, project_id, risk_type, severity, description, created_at | FK: project_id | MEDIUM |

### Module 11: Advanced Analytics & Reporting
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| ReportDefinition | MISSING | report_id, workspace_id, name, query (jsonb), schedule, created_by | FK: workspace_id, created_by | MEDIUM |
| ReportExecution | MISSING | execution_id, report_id, status, executed_at, result_file_id | FK: report_id | LOW |
| ReportPermission | MISSING | permission_id, report_id, user_id, access_level | FK: report_id, user_id | LOW |
| MetricSnapshot | MISSING | snapshot_id, project_id, metric_data (jsonb), captured_at | FK: project_id | LOW |
| SprintMetric | MISSING | metric_id, sprint_id, metric_name, value | FK: sprint_id | LOW |
| ResourceUtilization | MISSING | utilization_id, user_id, period_start, period_end, utilization_percentage | FK: user_id | MEDIUM |
| KPI | MISSING | kpi_id, project_id, name, target_value, current_value, updated_at | FK: project_id | MEDIUM |

### Module 12: Integration Ecosystem
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| IntegrationBinding | MISSING | binding_id, workspace_id, integration_type, config (jsonb), is_active | FK: workspace_id | MEDIUM |
| WebhookEndpoint | MISSING | webhook_id, workspace_id, target_url, secret_key, is_active, created_at | FK: workspace_id | HIGH |
| WebhookEvent | MISSING | event_id, webhook_id, entity_type, event_type, payload (jsonb), triggered_at | FK: webhook_id | MEDIUM |
| WebhookDelivery | MISSING | delivery_id, event_id, status, attempted_at, response_status | FK: event_id | MEDIUM |
| OAuthConnection | MISSING | connection_id, user_id, provider, access_token, refresh_token, expires_at | FK: user_id | MEDIUM |
| OAuthApp | MISSING | app_id, name, client_id, client_secret, redirect_uris (jsonb) | - | MEDIUM |
| ApiToken | MISSING | token_id, user_id, token_hash, scope, expires_at, created_at | FK: user_id | MEDIUM |
| ApiScope | MISSING | scope_id, name, description | - | LOW |
| Plugin | MISSING | plugin_id, name, version, source, config (jsonb) | - | LOW |
| PluginInstallation | MISSING | installation_id, plugin_id, workspace_id, is_enabled | FK: plugin_id, workspace_id | LOW |

### Module 13: Subscription & Billing
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| Plan | MISSING | plan_id, name, price, features (jsonb), currency | - | MEDIUM |
| Subscription | MISSING | subscription_id, workspace_id, plan_id, status, started_at, expires_at | FK: workspace_id, plan_id | MEDIUM |
| SubscriptionUsage | MISSING | usage_id, subscription_id, metric_name, value, period | FK: subscription_id | LOW |
| Invoice | MISSING | invoice_id, subscription_id, amount, status, issued_at, due_at | FK: subscription_id | MEDIUM |
| InvoiceLineItem | MISSING | line_id, invoice_id, description, amount, quantity | FK: invoice_id | LOW |
| BillingTransaction | MISSING | transaction_id, invoice_id, amount, status, processed_at | FK: invoice_id | LOW |

### Module 14: System Administration
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| SystemConfig | MISSING | config_id, config_key, config_value, updated_by, updated_at | FK: updated_by | LOW |
| AdminUser | MISSING | admin_id, user_id, privileges (jsonb), created_at | FK: user_id | LOW |
| AdminRole | MISSING | role_id, name, permissions (jsonb) | - | LOW |
| AdminPermission | MISSING | permission_id, name, description | - | LOW |
| AdminRolePermission | MISSING | role_id, permission_id | FK: role_id, permission_id | LOW |
| AdminUserRole | MISSING | user_id, role_id, assigned_at | FK: user_id, role_id | LOW |
| AdminAuditLog | MISSING | log_id, admin_id, action, target, created_at | FK: admin_id | LOW |
| FeatureFlag | MISSING | flag_key, description, enabled, rollout_percentage, updated_by | FK: updated_by | MEDIUM |
| Roles | MISSING | role_id, name, description, permissions (jsonb) | - | MEDIUM |
| Permissions | MISSING | permission_id, name, description, resource | - | LOW |
| RolePermission | MISSING | role_id, permission_id | FK: role_id, permission_id | LOW |

### Module 15: Help Center & Knowledge Base
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| Article | MISSING | article_id, slug, status, visibility, created_by, created_at | FK: created_by → Users | MEDIUM |
| ArticleTag | MISSING | article_id, tag_id | FK: article_id, tag_id | MEDIUM |
| ArticleVersion | MISSING | version_id, article_id, content, created_at | FK: article_id | LOW |
| ArticleTranslation | MISSING | translation_id, article_id, language, title, content | FK: article_id | LOW |
| ArticleFeedback | MISSING | feedback_id, article_id, user_id, rating, comment, created_at | FK: article_id, user_id | LOW |
| ArticleVisibility | MISSING | visibility_id, article_id, role, access_level | FK: article_id | LOW |
| Category | MISSING | category_id, name, description, parent_category_id | Self-referencing | MEDIUM |

### Module 16: User Onboarding & Adoption
| Entity Name | Status | Fields | Key Relationships | Priority |
|---|---|---|---|---|
| OnboardingChecklist | MISSING | checklist_id, persona_role, reward_id | FK: reward_id | MEDIUM |
| ChecklistItem | MISSING | item_id, checklist_id, description, completion_condition, order_no | FK: checklist_id | LOW |
| OnboardingFlow | MISSING | flow_id, persona_role, steps (jsonb), created_at | - | LOW |
| OnboardingReward | MISSING | reward_id, checklist_id, reward_type, reward_config (jsonb) | FK: checklist_id | LOW |
| UserOnboardingStatus | MISSING | status_id, user_id, checklist_id, completed_at | FK: user_id, checklist_id | MEDIUM |
| FeatureBeacon | MISSING | beacon_id, feature_name, target_users (jsonb), displayed_at | - | LOW |
| ProductTour | MISSING | tour_id, name, steps (jsonb), created_at | - | LOW |
| TourStep | MISSING | step_id, tour_id, sequence, content, target_element | FK: tour_id | LOW |

---

## Core Business Entities (UI-Facing) - Priority Implementation Order

### Tier 1: CRITICAL (Required for MVP)
These entities are fundamental to the application's core functionality and MUST be implemented:

1. **Workspace** - Multi-tenancy container
2. **WorkspaceMember** - User-Workspace association
3. **Project** - Project container (already exists, needs completion)
4. **ProjectMember** - Project team association (already exists, needs completion)
5. **Task** - Work unit (already exists, needs completion)
6. **TaskList** - Task grouping within project
7. **Tag** - Cross-entity categorization
8. **Users** - User base entity (exists)
9. **Note** - Collaborative documentation (exists, minimal)
10. **Comment** - Task discussion threads
11. **File** - Asset management
12. **TimeEntry** - Time tracking
13. **Notification** - User notifications
14. **NotificationPreference** - Notification settings
15. **WebhookEndpoint** - External integrations

### Tier 2: HIGH PRIORITY (Required for Beta)
Important for user workflow but not blocking MVP:

1. **Subtask** - Task decomposition
2. **TaskAssignee** - Multiple assignees per task
3. **TaskDependency** - Task relationships
4. **TaskWatcher** - Follow-up mechanism
5. **Mention** - User mentions in comments
6. **FileVersion** - Version control
7. **UserSettings** - User preferences
8. **DashboardLayouts** - Widget customization
9. **UIViewPreference** - View preferences
10. **AuditLog** - Action tracking
11. **ProjectTemplate** - Project reusability
12. **TaskTemplate** - Task reusability
13. **Timesheet** - Timesheet management
14. **ApprovalRequest** - Approval workflow
15. **Backlink** - Note references

### Tier 3: MEDIUM PRIORITY (Post-Beta Features)
Nice-to-have features that enhance UX:

1. **TaskCustomField** - Custom attributes
2. **TaskRecurringRule** - Recurring tasks
3. **FlowStep** - Detailed scheduling
4. **Article** - Knowledge base
5. **PersonaProfile** - User personas
6. **FeatureFlag** - Feature control
7. **RiskSignal** - AI risk detection
8. **IntegrationBinding** - Third-party integrations

---

## Field Type Mappings (Database to TypeScript)

### Common Field Types Used:
| Database Type | TypeScript Type | Notes |
|---|---|---|
| UUID | `string` | UUID v4 primary/foreign keys |
| varchar(n) | `string` | Variable-length text |
| text | `string` | Long-form text (notes, content) |
| boolean | `boolean` | True/False flags |
| timestamp | `string` (ISO 8601) | Dates with time |
| date | `string` (YYYY-MM-DD) | Date only |
| int | `number` | Integer values |
| float | `number` | Decimal values |
| bigint | `number \| string` | Large integers (file sizes) |
| enum | `string` (literal union) | Fixed set of values |
| jsonb | `Record<string, any> \| object` | Complex structured data |

---

## Relationship Patterns

### Foreign Key Types:
1. **One-to-Many**: User → Projects (user creates many projects)
2. **Many-to-One**: Task → Project (many tasks belong to one project)
3. **Many-to-Many**: Task ↔ Tag (via TaskTagMap)
4. **Self-Referencing**: Note → Note (parent_note_id for hierarchy)
5. **Polymorphic**: ApprovalRequest (target_type + target_id)

### Key Constraints:
- **PK (Primary Key)**: Unique identifier for entity
- **FK (Foreign Key)**: Reference to another entity
- **UNIQUE**: Ensures uniqueness (e.g., (workspace_id, user_id))
- **NOT NULL**: Field is required
- **Nullable**: Field can be NULL (e.g., dates, optional descriptions)

---

## Implementation Recommendations

### Phase 1: Workspace Foundation (Week 1-2)
- [ ] Workspace entity
- [ ] WorkspaceMember entity
- [ ] Update Project to link with workspace
- [ ] Update ProjectMember permissions

### Phase 2: Task Management Core (Week 2-3)
- [ ] TaskList entity
- [ ] TaskAssignee entity
- [ ] TaskDependency entity
- [ ] Subtask entity

### Phase 3: Collaboration Features (Week 3-4)
- [ ] Comment entity
- [ ] Mention entity
- [ ] File & FileVersion entities
- [ ] ApprovalRequest entity

### Phase 4: User Experience (Week 4-5)
- [ ] UserSettings entity
- [ ] DashboardLayouts entity
- [ ] UIViewPreference entity
- [ ] NotificationPreference entity

### Phase 5: Analytics & Admin (Week 5-6)
- [ ] AuditLog entity
- [ ] WebhookEndpoint entity
- [ ] TimeEntry & Timesheet entities
- [ ] Feature flags & Admin entities

---

## Comparison: Planned vs. Implemented

### What Exists in Frontend Types:

#### Project.ts
```typescript
✓ ProjectStatus type
✓ ProjectPriority type
✓ ProjectType (WATERFALL / AGILE)
✓ Project interface (basic)
✓ ProjectMember interface (basic)
✓ ProjectFile interface
```

#### Task.ts
```typescript
✓ TaskPriority type
✓ TaskStatus type
✓ TaskType (STORY / TASK / BUG)
✓ Task interface (basic, missing many fields)
```

#### Member.ts
```typescript
✓ Member interface (basic)
```

#### Note.ts
```typescript
✓ Note interface (minimal - title, excerpt, author, tags)
```

#### Reference.ts
```typescript
✓ ProjectPriority interface (reference data)
✓ ProjectStatus interface (reference data)
✓ ReferenceResponse<T> generic
```

---

### What's Missing (Core Entities)

#### Module 2: Workspace Management
- ❌ Workspace interface (critical)
- ❌ WorkspaceMember interface (critical)
- ❌ WorkspaceSetting interface
- ❌ WorkspaceInvitation interface

#### Module 3: Project Extensions
- ❌ ProjectTemplate interface
- ❌ ProjectTagMap interface (join table)
- ❌ ProjectChangeRequest interface
- ❌ ProjectArchive interface

#### Module 4: Task Management
- ❌ TaskList interface (critical)
- ❌ TaskAssignee interface (critical - supports multiple)
- ❌ TaskDependency interface (critical)
- ❌ Subtask interface (critical)
- ❌ TaskTagMap interface (join table)
- ❌ TaskWatcher interface
- ❌ TaskTemplate interface
- ❌ TaskCustomField & TaskCustomFieldValue interfaces
- ❌ TaskRecurringRule interface

#### Module 6: Collaboration
- ❌ Comment interface (critical)
- ❌ File interface (critical)
- ❌ FileVersion interface
- ❌ Mention interface
- ❌ Backlink interface
- ❌ NoteVersion interface
- ❌ PublicNoteLink interface
- ❌ ApprovalRequest interface

#### Module 7: Notifications
- ❌ Notification interface (critical)
- ❌ NotificationPreference interface (critical)
- ❌ NotificationTemplate interface

#### Module 9: Personalization
- ❌ UserSettings interface (critical)
- ❌ DashboardLayouts interface (critical)
- ❌ UIViewPreference interface (critical)
- ❌ UserWidget interface

#### Module 11 & 12: Analytics & Integration
- ❌ TimeEntry interface (critical)
- ❌ Timesheet interface
- ❌ WebhookEndpoint interface
- ❌ AuditLog interface

---

## Entity Creation Checklist

### For Each Missing Entity, Create:

```typescript
// 1. Type/Interface Definition
export interface EntityName {
  id: string;
  [field1]: type1;
  [field2]: type2;
  // ... FK relationships
  created_at?: string;
  updated_at?: string;
}

// 2. Enum Types (if needed)
export type EntityStatus = 'STATUS_1' | 'STATUS_2' | 'STATUS_3';

// 3. API Request/Response Types
export interface CreateEntityRequest {
  // Required fields only
}

export interface EntityResponse extends EntityName {
  // Response-specific fields
}

// 4. Relationship Types
export interface EntityWithRelations extends EntityName {
  relatedEntity?: RelatedEntityInterface;
  relatedEntities?: RelatedEntityInterface[];
}
```

---

## Summary Table: All Entities by Module

| Module | Tier 1 | Tier 2 | Tier 3 | Tier 4+ | Status |
|--------|--------|--------|--------|---------|--------|
| **M1: Identity** | Users, AuditLog | UserAuth, UserRole, Session | - | AdminX5 | Partial |
| **M2: Workspace** | Workspace, WorkspaceMember | WorkspaceSetting, Invitation | - | AccessLog | MISSING |
| **M3: Project** | Project✓, ProjectMember✓ | ProjectTemplate, ProjectTagMap | ProjectBaseline, Archive | Lifecycle | Partial |
| **M4: Task** | Task✓, TaskList, TaskAssignee, Subtask | TaskDependency, TaskWatcher, Template | CustomField, RecurringRule | Checklist | Partial |
| **M5: Time** | TimeEntry | Timesheet, FlowStep | TimesheetApproval | - | MISSING |
| **M6: Collaboration** | Comment, File, Note✓ | Mention, FileVersion, ApprovalRequest | ArticleX7, NoteVersion | Category, Backlink, PublicLink | Partial |
| **M7: Notifications** | Notification, NotificationPref | NotificationTemplate, DomainEvent | Digest, Interaction | - | MISSING |
| **M8: Archiving** | - | TrashItem, DataExport | ArchiveJob, ArchivePolicy | Retention | MISSING |
| **M9: UX** | UserSettings, DashboardLayouts | UIViewPreference, UserWidget | PersonaProfile, UserChecklist | - | MISSING |
| **M10: AI** | - | InferenceX2, RiskSignal | MLModel, ModelX2 | - | MISSING |
| **M11: Analytics** | - | KPI, ResourceUtilization | ReportX3, MetricSnapshot | SprintMetric | MISSING |
| **M12: Integration** | WebhookEndpoint | IntegrationBinding, OAuth, ApiToken | WebhookEvent, Plugin | ApiScope, PluginInstall | MISSING |
| **M13: Billing** | - | Plan, Subscription, Invoice | SubscriptionUsage, Transaction | - | MISSING |
| **M14: Admin** | FeatureFlag, Roles | - | SystemConfig, AdminX7 | Permissions | MISSING |
| **M15: Help** | Article | Category, ArticleTag | ArticleX4 | - | MISSING |
| **M16: Onboarding** | OnboardingChecklist | UserOnboardingStatus | Flow, Reward, Beacon | TourX2 | MISSING |

---

## Next Steps

1. **Create Tier 1 Missing Entities** in `/frontend/src/types/`:
   - workspace.ts
   - notification.ts
   - taskList.ts
   - comment.ts
   - file.ts
   - timeEntry.ts

2. **Create Tier 2 Missing Entities** in `/frontend/src/types/`:
   - subtask.ts
   - taskAssignee.ts
   - taskDependency.ts
   - userSettings.ts
   - dashboard.ts

3. **Update Existing Type Files** with complete field definitions:
   - Complete `task.ts` with all fields from Task.md
   - Complete `project.ts` with all fields from Project.md
   - Expand `note.ts` with content, status, visibility fields

4. **Establish Type Conventions**:
   - Consistent naming (camelCase for TS, snake_case for API)
   - Consistent FK naming patterns
   - Consistent status enum types

5. **Generate Backend Models** from these types using `pydantic` models in `/backend/app/db/models/`

