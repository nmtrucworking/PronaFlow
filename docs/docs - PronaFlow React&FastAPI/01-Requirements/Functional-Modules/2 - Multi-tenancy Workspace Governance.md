Project**: PronaFlow
**Version**: 1.0
**State**: Draft
*Last updated: Dec 28, 2025*

---

# 1. Business Overview
Workspace (Không gian làm việc) là đơn vị tổ chức cấp cao nhất trong kiến trúc Multi-tenancy của PronaFlow. Mỗi Workspace hoạt động như một "container" độc lập, đảm bảo tính cô lập dữ liệu tuyệt đối. Mọi tài nguyên như Project (Dự án), Tasks (Công việc), Tags (Nhãn) và Members (Thành viên) đều thuộc phạm vi của một Workspace cụ thể.
Module này chịu trách nhiệm quản lý vòng đời của Workspace (Worksace Lifecycle), cơ chế chuyển đổi ngữ cảnh làm việc và các quy tắc quản trị cấp cao dành cho Owner (Chủ sở hữu) và System Admin (Quản trị viên hệ thống).
# 2. User Story & Acceptance Criteria
## 2.1. Feature: Workspace Creation
### User Story 2.1:
Là một người dùng hoặc hiện tại, Tôi muốn tạo một Workspace mới và đặt tên cho nó, Để phân tách các ngữ cảnh công việc khác nhau (ví dụ: Cá nhân, Công ty, Dự án Freelance) mà không bị lẫn lộn dữ liệu.

### Acceptance Criteria ( #AC)
#### AC 1 - Khởi tạo thành công:
- Given: Người dùng đang ở màn hình tạo Workspace.
- When: Người dùng nhập tên Workspace hợp lệ (Không chứa ký tự cấm hệ thống) và Mô tả Workspace (optional) và nhấn "Create / Tạo mới"
- Then: Hệ thống tạo Workspace mới, gán Người dùng hiện tại là Owner (Chủ sở hữu), và tự động chuyển ngữ cảnh (Switch Context) sang Workspace vừa tạo.

#### AC 2 - Default Workspace (Logic tự động)
- _Given:_ Người dùng vừa hoàn tất đăng ký tài khoản mới (Register).
- _When:_ Người dùng đăng nhập lần đầu tiên.
- _Then:_ Hệ thống phải đảm bảo user đã có sẵn một "`{Username}`'s Default Workspace" để bắt đầu làm việc ngay lập tức.

#### AC 3 - Validate dữ liệu:
- When: Người dùng nhập tên Workspace chỉ chứa khoảng trắng hoặc các ký tự đặc biệt.
- Then: Hệ thống hiển thị thông báo lỗi "`<vn>` Tên Không gian làm việc không hợp lệ" và chặn hành động tạo.

## 2.2. Feature: Chuyển đổi ngữ Cảnh (Context Switching)
### User Story 2.2:
Là một Người dùng tham chiếu nhiều Workspace, Tôi muốn chuyển đổi nhanh giữa các Workspace trên thanh điều hướng, Để truy cập vào dữ liệu dự án tương ứng với không gian đó.

### Acceptance Criteria ( #AC)
#### AC 1 - Data Isolation (Cô lập dữ liệu)
- Given: Người dùng chuyển từ `Wokrpsace A` sang `Workspace B`
- Then: Danh sách Projects, Tags, Notifications và các dữ liệu liên quan hiển thị trên màn hình phải được làm mới hoàn toàn, chỉ hiển thị dữ liệu thuộc về Workspace B. Dữ liệu Workspace A phải bị ẩn đi

#### AC 2 - State Persistence (Lưu trạng thái)
- When: Người dùng đăng xuất và đăng nhập lại
- Then: Hệ thống phải ghi nhớ `Last_Accessed_Workspace` và tự động đưa người dùng vào Workspace họ làm việc gần nhất.

## 2.3. Feature: Lifecycle & Soft Delete
### User Story 2.3:
Là một Workspace Owner (Chủ sỡ hữu), Tôi muốn xóa một Workspace không còn sử dụng, Để dọn dẹp giao diện và quản lý tài nguyên hiệu quả.

## Acceptance Criteria ( #AC)
#### AC 1 - Cảnh báo tác động
- Given: Workspace đang chứa các Projects đang hoạt động (Active)
- When: Owner nhấn nút "Delete Workspace"
- Then: Hệ thống hiển thị Modal cảnh báo liệt kê số lượng Projects sẽ bị ảnh hưởng và yêu cầu xác nhận 2 bước.
#### AC 2 - Soft Delete Logic
- Given: Owner xác nhận xóa.
- When: Hệ thống đánh dấu cờ `is_deleted = true` cho Workspace, ghi nhận thời gian `deleted_at`. Workpsace này sẽ biến mất khỏi danh sách chọn Owner và Members.
- Note: Không thực hiện update `is_deleted` cho toàn bộ Projects con ngay lập tức (để tối ưu hiệu năng), mà xử lý logic ẩn tại tầng Query (Filter parent status).

#### AC 3 - Permissions
- When: Một Member (Thành viên) không phải Onwer cố gắng truy cập trạng thái cài đặt để xóa Workspapce
- Then: Hệ thống chặn truy cập và hiển thị thông báo lỗi 403 (Forbidden).

## 2.4. Feature: System Admin Governance
### User Story 2.4.
Là một System Admin (Quản trị viên hệ thống), Tôi muốn xem danh sách Workspace đã bị xóa mềm và thực hiện khôi phục hoặc xóa vĩnh viên, Để hỗ trợ người dùng khi họ lỡ tay xóa nhầm hoặc giải phóng dung lượng Database.

## Acceptance Criteria ( #AC)
#### AC 1 - Thời gian lưu trữ 
- Given: Một Workspace đã bị xóa mềm quá 30 ngày (cấu hình hệ thống)
- Then: Hệ thống tự động thực hiện Job để xóa cứng (Hard Delete) toàn bộ dữ liệu liên quan
#### AC 2 - Restore
- When: Admin chọn "Restore" một Workspace
- Then: Trạng thái `is_deleted` trở về `false`, Workspace xuất hiện lại trong danh sách Owner và dữ liệu bên trong được bảo toàn nguyên vẹn.

# 3. Business Rules & Contraints
## 3.1. Security & Permissions
Dựa trên hệ thống phân quyền động (Dysnmic Permission System), các quy tắc au được áp dụng cho module Workspace:

| Permission Code    | Vai trò mặc định | Mô tả Hành động                                                       |
| ------------------ | ---------------- | --------------------------------------------------------------------- |
| WS.SETTINGS.UPDATE | Owner            | Chỉnh sửa tên, mô tả và cài đặt chung của Workspace                   |
| WS.DELETE          | Onwer            | Thực hiện hành động xóa mềm Workspace                                 |
| WS.MEMBER.VIEW     | Onwer, Member    | Xem danh sách thành viên trong Workspace                              |
| SYS.TRASH.MANAGE   | System Admin     | Quyền truy cập khu vực quản trị Trash để khôi phục hoặc xóa vĩnh viễn |

## 3.2. Data Integrity Rules
1. Isolation Query Rule: Mọi câu truy vấn dữ liệu (Projects, Tasks, Tags) đều **BẮT BUỘC** phải có điều kiện lọc theo `workspace_id`. Không cho phép truy vấn dữ liệu "mồ côi".
2. Cascade Logic: Khi Workspae bị xóa (Soft Delete), các Project bên trong không cần cập nhật trạng thái ngay lập tức. Tuy nhiên, API lấy danh sách Project (hoặc các dữ liệu trực thuộc) phải kiểm tra trạng thái của Workspace cha.
	Logic:
	```sql
	SELECT * 
	FROM projects p
	JOIN workspaces w ON p.workspace_id = w.id
	WHERE w.is_deleted = 0 AND p.is_deleted = 0 
	```
3. Owner Immutable: Mỗi Workspace phải luôn có ít nhất 1 Owner. Owner không thể rời khỏi Workspace nếu chưa chuyển giao quyền sở hữu cho thành viên khác.
4. 