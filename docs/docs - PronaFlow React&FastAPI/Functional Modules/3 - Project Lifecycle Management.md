# 1. Business Overview
Project (Dự án) là thực thể trung tâm nơi diễn ra sự cộng tác và làm việc của người dùng. Trong PronaFlow, một dự án không chỉ là một tập hợp Tasks (các Công việc) mà là một quy trình khép kín có Vòng đời (Lifecycle) rõ ràng.
Module này chịu trách nhiệm quản lý toàn bộ các trạng thái của Project:
1. Initialization: Khởi tạo và thiết lập cấu trúc bảng (Kanban/List)
2. Execution (Active): Giai đoạn hoạt động chính, cập nhật tiến độ.
3. Preservation (Archived): Lưu trữ dự án đã hoàn thành (Read-only).
4. Termination (Deleted): Xóa bỏ và dọn dẹp dữ liệu.
# 2. User Stories & Acceptance Criteria
## 2.1 Feature: Quản lý Thông tin Dự án (CRUD Project)
### User Story 2.1
Là một Thành viên Workspace (User), Tôi muốn tạo một dự án với các thiết lập cơ bản, Để bắt đầu tổ chức công việc cho một mục tiêu cụ thể.
### Acceptance Criteria ( #AC)
#### AC 1 - Create Project
- Input: Người dùng nhập `project name` (Bắt buộc), Description (Tùy chọn), Start Date, End Date (Tùy chọn).
- Validation: Project name không được để trống và không quá 150 ký tự.
- Default State: Dự án sau khi tạo thành công sẽ tự động có trạng thái là "Not-Started".
#### AC 2 - Update Metadata (Cập nhật)
- Action: Project Owner/Admin có quyền chỉnh sửa tên, mô tả và thời gian.
- Logic: Nếu thay đổi End Date, hệ thống kiểm tra logic End Date >= Start Date.
#### AC 3 - Soft Delete Project.
- Action: Cho phép xóa mềm dự án.
- System Behavior: Update cờ `is_deleted = 1`. Dự án biến mất khỏi Project Board nhưng vẫn tồn tại trong Database để phục vụ khôi phục.

## 2.2. Feature: Quản lý Trạng thái Dự án (Lifecyle Management)
### User Story 2.2:
Là một Quản lý Dự án (PM), Tôi muốn thay đổi trạng thái của dự án theo quy trình chuẩn 5 trạng thái, Để báo cáo chính xác giai đoạn thực hiện của dự án trên bảng tổng quan.
### Acceptance Critera ( #AC)
#### AC 1 - 5 Global Statuses:
Hệ thống quy định cứng (hard-coded) 5 trạng thái duy nhất cho Entity Project, tương ứng với 5 cột trên giao diện Kanban Board:
1. **Hold (0):** Dự án bị tạm dừng hoặc đóng băng.
2. Not-Started (1): Dự án mới tạo, chưa triển khai (Default).
3. **In-Progress (2):** Dự án đang trong quá trình thực hiện.
4. **In-Review (3):** Dự án đang chờ nghiệm thu hoặc đánh giá.
5. **Done (4):** Dự án đã hoàn tất.
#### AC 2 - State Transition (Chuyển trạng thái):
- Trigger: Người dùng thay đổi dropdown trạng thái trong trang chi tiết HOẶC kéo tả Card dự án (project-card) trên Kanban Board.
- Result: Giá trị `status` trong database được cập nhật tức thì.
#### AC 3 - Visual Indicator:
- Mỗi trạng thái phải có mã màu (Colro Code) quy định riêng để nhận diện nhanh.

| N.O | Status      | Color Name | Color Hex |
| --- | ----------- | ---------- | --------- |
| 1   | Hold        |            |           |
| 2   | Not-Started |            |           |
| 3   | In-Progress |            |           |
| 4   | In-Review   |            |           |
| 5   | Done        |            |           |
# 2.3. Feature: Thiết lập Quyền Riêng tư (Privacy Settings)
### User Story 3.3:
Là một Chủ dự án, Tôi muốn thiết lập chế độ hiển thị của dự án (Public/Private), để kiểm soát ai trong Workspace có thể nhìn thấy và truy xuất dự án này.
### Acceptance Criteria ( #AC)
#### AC 1 - Private Mode
- Setting: `privacy_level = Private`
- Behavior: Dự án bị ẩn hoàn toàn với các thành viên Workspace không được mời. Chỉ Owner và Invited Members mới thấy.
#### AC 2 - Public Mode
- Setting: `privacy_level = Public`
- Behavior: Tất cả các thành viên trong cùng Workspace đều nhìn thấy dự án trên Kanban Board và có quyền truy cập (Read-only hoặc Join tùy cấu hình)

# 3. Business Rules:
1. Uniqueness: Trong một Workspace, không bắt buộc tên dự án (`Title`) phải là duy nhất. Tuy nhiên, hệ thống khuyến cáo không nên đặt trùng tên để tránh nhầm lẫn.
2. Date Logic:
	- `start_date` và `end_date` là không bắt buộc (Optional)
	- Nếu cả 2 đều tồn tại, bắt buộc `end_date >= start_date`
3. Quy tắc hiển thị Kanban (Kanban View Logic):
	- Màn hình "Kanban Board" phải load toàn bộ các bản ghi từ bảng `projects` có `is_deleted = 0 and is_archived = 0` và thỏa mãn điều kiện `workspace_id` hiện tại.
	- Dữ liệu được nhóm theo cột `status`.
4. Deletion:
	- Khi `[project].[is_deleted]` được set thành 1, Entity Project coi như không còn tồn tại trong luồng làm việc chính.
	- Hành đồng này không xóa vật lý các dữ liệu con ngay lập tức, mà chỉ cần ẩn đi theo tính nhất Cascade logic ở tầng ứng dụng.p