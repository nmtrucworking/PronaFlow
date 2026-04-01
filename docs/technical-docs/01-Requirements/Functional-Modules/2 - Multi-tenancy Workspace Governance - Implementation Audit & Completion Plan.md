# 2 - Multi-tenancy Workspace Governance - Implementation Audit & Completion Plan

**Project:** PronaFlow  
**Module:** 2 - Multi-tenancy Workspace Governance  
**Date:** 2026-04-02  
**Last Updated:** 2026-04-02 (P1 Completed)  
**Scope:** So sánh đặc tả trong [2 - Multi-tenancy Workspace Governance.md](2%20-%20Multi-tenancy%20Workspace%20Governance.md) với backend/frontend hiện tại.

## Status Overview

| Phase | Status | Completion |
| --- | --- | --- |
| **P0: Core Fixes** | ✅ Completed | 100% |
| **P1: Branding & Admin** | ✅ Completed | 100% |
| **P2: Refinements** | 📋 Planning | 0% |

## P0 Summary (Completed)

✅ **Ownership Guard**: Backend transfer ownership + prevent sole owner leaving  
✅ **Default Timezone**: Changed from UTC to Asia/Ho_Chi_Minh  
✅ **Delete Confirmation**: Modal requires workspace name input  
✅ **Bulk Invite**: Support multiple emails in invite form  
✅ **Login Redirect**: Navigates to last accessed workspace instead of dashboard  

### P0 Files Modified:
- [apps/backend/app/services/workspace.py](../../../../apps/backend/app/services/workspace.py) - timezone, transfer ownership, bulk invite logic
- [apps/backend/app/api/v1/endpoints/workspaces.py](../../../../apps/backend/app/api/v1/endpoints/workspaces.py) - transfer ownership endpoint, bulk invite endpoint
- [apps/frontend/src/features/auth/pages/Login.tsx](../../../../apps/frontend/src/features/auth/pages/Login.tsx) - redirect to last workspace
- [apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx](../../../../apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx) - bulk email input
- [apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx](../../../../apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx) - delete confirmation with name

## P1 Summary (Completed)

✅ **Logo Upload**: File upload component with validation  
✅ **Admin Back-office**: Manage deleted workspaces UI  
✅ **Service Methods**: removeLogo() and uploadLogo() integration  

### P1 Files Created/Modified:
- [apps/frontend/src/features/workspace/components/LogoUploadComponent.tsx](../../../../apps/frontend/src/features/workspace/components/LogoUploadComponent.tsx) - new upload component
- [apps/frontend/src/features/workspace/components/Setting_workspace.tsx](../../../../apps/frontend/src/features/workspace/components/Setting_workspace.tsx) - integrated LogoUploadComponent
- [apps/frontend/src/services/workspaceService.ts](../../../../apps/frontend/src/services/workspaceService.ts) - added removeLogo()
- [apps/frontend/src/features/admin/pages/AdminWorkspacesPage.tsx](../../../../apps/frontend/src/features/admin/pages/AdminWorkspacesPage.tsx) - admin back-office page

## 1. Kết luận nhanh

Module 2 hiện ở trạng thái **mostly complete**. Các flow cốt lõi đã có ở cả backend và frontend: tạo workspace, mời thành viên, đổi context, cấu hình workspace, soft delete, restore/hard delete phía admin, và ghi log truy cập. Hơn nữa, các P0 gaps đã được bổ sung đầy đủ.

Các điểm còn lại cần cải thiện:
- Role `guest` vẫn còn dư so với docs (đã tách khỏi module 2 flow).
- Các tính năng phụ như guest access toggles chưa rõ scope.
- Rate limiting và audit logging chi tiết cho admin actions.

## 2. Đối chiếu theo từng nhóm yêu cầu

| Hạng mục | Trạng thái | Nhận xét |
| --- | --- | --- |
| Workspace creation | ✅ Đã có | Backend tạo workspace, gán owner, tạo settings mặc định; frontend có form và danh sách workspace. |
| Default workspace khi register | ✅ Đã có | Backend tự tạo workspace mặc định khi đăng ký. |
| Context switching | ✅ Đã có | Backend có access log; frontend redirect login → last workspace. |
| Invite & member management | ✅ Bulk invite | Backend + frontend hỗ trợ mời nhiều email cùng lúc. |
| Role assignment | ✅ Đã có | Owner/Admin/Member/Viewer đầy đủ, `guest` bị isolated. |
| Workspace settings | ✅ Đã có | Timezone/work days/work hours + logo upload file. |
| Soft delete & purge | ✅ Đã có | Backend soft delete, restore, hard delete + scheduled purge. |
| System admin governance | ✅ Đã có backend/frontend | Admin back-office UI để list/restore/delete workspace. |
| Ownership transfer | ✅ Đã có | Backend chặn sole owner leave, hỗ trợ chuyển giao. |
| Delete confirmation | ✅ Đã có | Modal bắt xác nhận bằng tên workspace. |

## 3. Phần đã triển khai tốt

### 3.1. Tạo workspace và default workspace
- Backend tạo workspace mới và gán owner tại [apps/backend/app/services/auth.py](../../../../apps/backend/app/services/auth.py#L103) và [apps/backend/app/services/workspace.py](../../../../apps/backend/app/services/workspace.py#L36).
- Endpoint tạo workspace và log context switch đã có tại [apps/backend/app/api/v1/endpoints/workspaces.py](../../../../apps/backend/app/api/v1/endpoints/workspaces.py#L44).
- Frontend có form tạo workspace ở [apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx](../../../../apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx#L1) và action tạo workspace ở [apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx](../../../../apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx#L160).

### 3.2. Context switching và state persistence
- Backend có access log và endpoint last accessed workspace ở [apps/backend/app/api/v1/endpoints/workspaces.py](../../../../apps/backend/app/api/v1/endpoints/workspaces.py#L568).
- Backend lấy workspace cuối cùng từ access log ở [apps/backend/app/services/workspace.py](../../../../apps/backend/app/services/workspace.py#L744).
- **P0 Fix**: Frontend login giờ redirect vào last accessed workspace thay vì dashboard.

### 3.3. Member invitation và management (Bulk support)
- Backend có API mời thành viên, accept invite bằng magic link, list/cancel invitation, update/remove member.
- Frontend có form mời thành viên, page chi tiết workspace, member cards và invitation cards.
- **P0 Fix**: Hỗ trợ nhập nhiều email trong một lần.

### 3.4. Soft delete, restore, và admin governance
- Backend có soft delete và scheduled hard delete trong [apps/backend/app/services/workspace.py](../../../../apps/backend/app/services/workspace.py#L226).
- Admin API cho list/restore/hard-delete workspace đã soft delete có ở [apps/backend/app/api/v1/endpoints/admin.py](../../../../apps/backend/app/api/v1/endpoints/admin.py#L45).
- **P1 New**: Admin back-office UI cho deleted workspaces management.

### 3.5. Branding Logo Upload (P1)
- Backend endpoint upload logo + file validation.
- **P1 New**: Frontend LogoUploadComponent với drag-drop, validation, preview.
- **P1 New**: Remove logo endpoint + integration vào workspace settings.

### 3.6. Ownership Transfer (P0)
- Backend endpoint transfer ownership + successor validation.
- Backend guard: sole owner không thể tự rời workspace.
- Frontend ẩn leave button cho owner (backend enforce).

## 4. Phần dư so với docs (Minor)

### 4.1. Role `guest` (Isolated)
Docs module 2 chỉ mô tả Owner, Admin, Member, Viewer. Code còn có `guest` nhưng:
- **Isolated**: Không invite được guest từ module 2 flow.
- **Kept in enum**: Để tránh phá các module khác dùng nó.

Recommendation: Cân nhắc xóa hoàn toàn hoặc move vào module riêng trong P2.

### 4.2. Guest Access / Billing sections
Các section này vẫn ở settings UI nhưng chưa rõ scope của module 2.

## 5. Phần còn lại để cải thiện (P2+)

### 5.1. Rate limiting & Audit logging
- Invite actions nên có rate limiting.
- Admin hard-delete nên log chi tiết (who, when, workspace details).

### 5.2. Scheduled purge improvements
- Current: 30-day soft delete → hard delete.
- Enhancement: Configurable purge window, pre-purge notification.

### 5.3. Guest role consolidation
- Xác định rõ: keep hay remove `guest` role.
- Nếu keep: document rõ hoạt động của nó với module 2.

### 5.4. Workspace invite link
- Backend đã có, frontend UI chưa complete.
- P2 task: Public invite link UI.

## 6. Test Coverage Checklist

- [ ] P0: Ownership transfer → sole owner cannot leave
- [ ] P0: Bulk invite → multiple emails parse & send correctly
- [ ] P0: Delete confirm → modal validates workspace name
- [ ] P0: Login redirect → redirect to actual last workspace
- [ ] P0: Timezone → new workspace default = Asia/Ho_Chi_Minh
- [ ] P1: Logo upload → file validation (size, type, mime)
- [ ] P1: Admin back-office → list/restore/delete permissions check
- [ ] Integration: Invite + login → user joins workspace auto-redirect

## 7. Deployment Notes

**Backend dependencies**: None new (all P0/P1 use existing patterns).  
**Frontend dependencies**: None new (all use radix-ui, lucide-react already present).  
**Database**: Existing schema sufficient; no migration needed.  
**Environment variables**: No new vars required.  

**Rollout**:
1. Deploy backend P0 (timezone fix + endpoints).
2. Deploy frontend P0 (login redirect + bulk invite + delete confirm).
3. Deploy backend P1 (logo upload endpoint).
4. Deploy frontend P1 (logo component + admin page).

---

**Next Steps**: 
- [ ] Code review P0 & P1 changes
- [ ] Run test checklist
- [ ] Deploy to staging
- [ ] Smoke test key flows
- [ ] Plan P2: rate limiting, audit, guest role cleanup

## 1. Kết luận nhanh

Module 2 hiện ở trạng thái **partially complete**. Các flow cốt lõi đã có ở cả backend và frontend: tạo workspace, mời thành viên, đổi context, cấu hình workspace, soft delete, restore/hard delete phía admin, và ghi log truy cập. Tuy nhiên, vẫn còn một số điểm chưa khớp với docs hoặc chưa được hiện thực đầy đủ:

- Thiếu guard cho quyền lực Owner trong các tình huống chuyển giao / rời workspace.
- Invite flow trên UI mới hỗ trợ một email/lần, chưa đúng yêu cầu nhập nhiều email.
- Branding mới là `logo_url`, chưa có upload logo thật.
- Trạng thái "workspace cuối cùng" dựa trên access log đã có, nhưng luồng đăng nhập vẫn đẩy về dashboard thay vì vào workspace cuối cùng.
- Giao diện xóa workspace chưa bắt nhập lại tên workspace để xác nhận.
- Back-office admin có API, nhưng chưa thấy UI quản trị deleted workspaces.
- Có một số phần triển khai dư so với docs, nổi bật là role `guest` và guest access toggles.

## 2. Đối chiếu theo từng nhóm yêu cầu

| Hạng mục | Trạng thái | Nhận xét |
| --- | --- | --- |
| Workspace creation | Đã có | Backend tạo workspace, gán owner, tạo settings mặc định; frontend có form và danh sách workspace. |
| Default workspace khi register | Đã có | Backend tự tạo workspace mặc định khi đăng ký. |
| Context switching | Đã có / partial | Backend có access log và endpoint last accessed; frontend có hook/redirect hỗ trợ, nhưng login vẫn điều hướng về dashboard. |
| Invite & member management | Partial | Backend có invite/member APIs; frontend có form mời và quản lý thành viên, nhưng chưa hỗ trợ nhập nhiều email trong một lần. |
| Role assignment | Partial | Có Owner/Admin/Member/Viewer, nhưng code còn mở rộng thêm `guest`. |
| Workspace settings | Partial | Có timezone/work days/work hours/logo URL, nhưng logo là URL chứ chưa phải upload file. |
| Soft delete & purge | Đã có backend / partial frontend | Backend có soft delete, restore, hard delete và scheduled purge; frontend có modal xóa nhưng chưa xác nhận bằng tên workspace. |
| System admin governance | Đã có backend / thiếu frontend | API admin cho deleted workspaces đã có, nhưng chưa thấy màn hình quản trị tương ứng. |
| Data integrity rules | Partial | Ràng buộc member unique đã có; owner succession và guard "sole owner cannot leave" chưa thấy được enforce. |

## 3. Phần đã triển khai tốt

### 3.1. Tạo workspace và default workspace
- Backend tạo workspace mới và gán owner tại [apps/backend/app/services/auth.py](../../../../apps/backend/app/services/auth.py#L103) và [apps/backend/app/services/workspace.py](../../../../apps/backend/app/services/workspace.py#L36).
- Endpoint tạo workspace và log context switch đã có tại [apps/backend/app/api/v1/endpoints/workspaces.py](../../../../apps/backend/app/api/v1/endpoints/workspaces.py#L44).
- Frontend có form tạo workspace ở [apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx](../../../../apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx#L1) và action tạo workspace ở [apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx](../../../../apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx#L160).

### 3.2. Context switching và state persistence
- Backend có access log và endpoint last accessed workspace ở [apps/backend/app/api/v1/endpoints/workspaces.py](../../../../apps/backend/app/api/v1/endpoints/workspaces.py#L568).
- Backend lấy workspace cuối cùng từ access log ở [apps/backend/app/services/workspace.py](../../../../apps/backend/app/services/workspace.py#L744).
- Frontend gọi API last accessed workspace ở [apps/frontend/src/hooks/useWorkspace.ts](../../../../apps/frontend/src/hooks/useWorkspace.ts#L271) và dùng nó trong bootstrap ở [apps/frontend/src/App.tsx](../../../../apps/frontend/src/App.tsx#L62).

### 3.3. Member invitation và management
- Backend có API mời thành viên, accept invite bằng magic link, list/cancel invitation, update/remove member.
- Frontend có form mời thành viên, page chi tiết workspace, member cards và invitation cards.
- Luồng mời trên UI tương đối đầy đủ cho case một email/lần.

### 3.4. Soft delete và admin recovery
- Backend có soft delete và scheduled hard delete trong [apps/backend/app/services/workspace.py](../../../../apps/backend/app/services/workspace.py#L226).
- Admin API cho list/restore/hard-delete workspace đã soft delete có ở [apps/backend/app/api/v1/endpoints/admin.py](../../../../apps/backend/app/api/v1/endpoints/admin.py#L45).

## 4. Phần dư so với docs

### 4.1. Role `guest`
Docs module 2 chỉ mô tả Owner, Admin, Member, Viewer. Trong code lại có thêm `guest` ở:
- Backend enum: [apps/backend/app/db/enums.py](../../../../apps/backend/app/db/enums.py#L17)
- Backend schema: [apps/backend/app/schemas/workspace.py](../../../../apps/backend/app/schemas/workspace.py#L13)
- Frontend types: [apps/frontend/src/types/workspace.ts](../../../../apps/frontend/src/types/workspace.ts#L14)
- Frontend RBAC: [apps/frontend/src/hooks/useRBAC.tsx](../../../../apps/frontend/src/hooks/useRBAC.tsx#L15)
- Frontend forms: [apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx](../../../../apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx#L32)

Đây là phần triển khai dư hoặc cần chuẩn hóa lại, vì nó mở rộng ma trận phân quyền ngoài đặc tả module 2.

### 4.2. Guest access / billing sections trong UI workspace
Trong UI workspace settings có thêm các section liên quan đến guest access và billing, ví dụ:
- [apps/frontend/src/features/workspace/components/Setting_workspace.tsx](../../../../apps/frontend/src/features/workspace/components/Setting_workspace.tsx#L756)
- [apps/frontend/src/features/workspace/components/Setting_workspace.tsx](../../../../apps/frontend/src/features/workspace/components/Setting_workspace.tsx#L1026)

Những phần này không phải trọng tâm của module 2, nên cần xác định rõ là feature của module khác hay chỉ là UI mock.

### 4.3. Access-log-based persistence
Docs có nhắc `last_accessed_workspace_id`, nhưng code đang dùng access log để suy ra workspace cuối cùng thay vì một cột riêng. Về mặt chức năng là chấp nhận được, nhưng về mặt mô hình dữ liệu thì đây là cách triển khai khác với đặc tả.

## 5. Phần thiếu hoặc chưa khớp với docs

### 5.1. Invite flow chưa hỗ trợ nhập nhiều email
Docs yêu cầu mời nhiều email trong một lần. Hiện frontend mới có form một email/lần:
- [apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx](../../../../apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx#L149)
- [apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx](../../../../apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx#L245)

Backend có helper bulk invitation, nhưng chưa thấy UI gắn vào flow này.

### 5.2. Logo branding chưa phải upload thật
Docs nói upload logo công ty. Code hiện chỉ lưu `logo_url`:
- Backend schema: [apps/backend/app/schemas/workspace.py](../../../../apps/backend/app/schemas/workspace.py#L123)
- Frontend form: [apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx](../../../../apps/frontend/src/features/workspace/forms/WorkspaceForms.tsx#L262)

Chưa thấy component upload file, storage, hay xử lý image asset cho workspace logo.

### 5.3. Default timezone lệch so với docs
Docs yêu cầu timezone mặc định là `Asia/Ho_Chi_Minh`, nhưng backend tạo workspace mới đang set `UTC`:
- [apps/backend/app/services/workspace.py](../../../../apps/backend/app/services/workspace.py#L94)

Frontend settings page lại default là `Asia/Ho_Chi_Minh`, nên đang có lệch giữa backend và UI.

### 5.4. Login chưa tự vào workspace cuối cùng
Frontend login page vẫn navigate về dashboard sau đăng nhập:
- [apps/frontend/src/features/auth/pages/Login.tsx](../../../../apps/frontend/src/features/auth/pages/Login.tsx#L93)
- [apps/frontend/src/features/auth/pages/Login.tsx](../../../../apps/frontend/src/features/auth/pages/Login.tsx#L111)

Điều này chưa đúng với tinh thần "đăng nhập lại vào workspace cuối cùng" nếu hiểu theo luồng điều hướng mặc định sau login.

### 5.5. Xóa workspace chưa có xác nhận bằng tên workspace
Docs yêu cầu nhập đúng tên workspace để xác nhận xóa. Modal hiện tại chỉ có cảnh báo và nút xác nhận:
- [apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx](../../../../apps/frontend/src/features/workspace/pages/WorkspaceListPage.tsx#L566)

### 5.6. Owner succession chưa được enforce đầy đủ
Chưa thấy endpoint hoặc guard rõ ràng cho:
- Chuyển giao ownership trước khi owner rời workspace.
- Chặn owner duy nhất tự rời workspace.

Frontend có thể ẩn nút leave cho owner, nhưng backend hiện không có guard tương ứng để bảo vệ nghiệp vụ này nếu gọi API trực tiếp.

### 5.7. Admin search by ID/name chưa có UI hoàn chỉnh
Backend admin API có restore/list/delete, nhưng chưa thấy frontend screen cho luồng:
- Tìm workspace deleted theo ID/tên.
- Restore từ màn hình back-office.
- Hard delete từ màn hình back-office.

## 6. Kế hoạch hoàn thiện đề xuất

### P0 - Bắt buộc hoàn thiện trước khi chốt module
1. Bổ sung guard ownership:
   - Thêm endpoint transfer ownership.
   - Chặn owner duy nhất leave workspace.
   - Chặn kick/demote owner theo đúng ma trận RBAC.
2. Đồng bộ settings mặc định:
   - Đổi default timezone backend sang `Asia/Ho_Chi_Minh`.
   - Giữ work days và work hours theo docs.
3. Hoàn thiện delete flow:
   - Thêm ô nhập lại tên workspace để confirm xóa.
4. Đồng bộ invite flow:
   - Hỗ trợ nhập nhiều email một lần.
   - Giữ magic link 48h và gắn rõ role mặc định cho từng invite.
5. Chuẩn hóa role model:
   - Quyết định giữ hay bỏ `guest`.
   - Nếu giữ, cập nhật docs và ma trận permission tương ứng.

### P1 - Nên làm ngay sau P0
1. Hoàn thiện branding:
   - Thay `logo_url` bằng upload thật hoặc bổ sung flow upload + storage.
2. Hoàn thiện state persistence:
   - Điều hướng sau login về workspace cuối cùng thay vì dashboard trung gian.
   - Làm rõ nguồn dữ liệu persistence: access log hay cột riêng.
3. Hoàn thiện admin back-office:
   - Màn hình danh sách deleted workspaces.
   - Search theo ID/tên.
   - Restore/hard delete từ UI.

### P2 - Hardening và kiểm thử
1. Thêm test cho:
   - Invite multiple emails.
   - Sole-owner leave guard.
   - Delete confirmation.
   - Default timezone.
   - Restore/purge flow.
2. Bổ sung kiểm thử isolation:
   - Đảm bảo mọi query workspace-scoped đều filter theo workspace hiện tại.
3. Rà lại RBAC frontend/backend:
   - Đảm bảo billing/admin/member/viewer/guest không lệch nhau giữa các layer.

## 7. Kết luận cuối

Nếu chấm theo góc nhìn sản phẩm, module 2 đã có nền tảng khá tốt và có thể dùng được cho core workspace operations. Nếu chấm theo mức độ khớp tuyệt đối với docs, module vẫn còn các gap nghiệp vụ đáng kể ở ownership, invite bulk, branding upload, delete confirmation, admin back-office, và role model. Nên coi đây là **gần hoàn thiện nhưng chưa đủ để đóng module**.
