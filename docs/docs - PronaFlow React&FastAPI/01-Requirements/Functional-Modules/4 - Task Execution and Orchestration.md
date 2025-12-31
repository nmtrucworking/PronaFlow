Project**: PronaFlow
**Version**: 1.0
**State**: Draft
*Last updated: Decem 28, 2025*

---
# 1. Business Overview
Trong hệ thống PronaFlow, việc thực thi dự án được chia nhỏ theo cấu trúc cây để dễ dàng quản lý.
1.  Task Lists (Danh sách công việc): Đóng vai trò là các "Container" dùng để gom nhóm các công việc. Tùy theo phương pháp quản lý (Waterfall hay Agile), Task List có thể đại diện cho các Giai đoạn (Phrase), Print, hoặc các Nhóm chức năng tùy theo cấu hình mà người dùng triển khai trong dự án của họ.
2. Tasks (Công việc): Đơn vị thực thi chính, chứa đầy đủ thông tin về tiến độ, thời gian, và người thực hiện. Task bắt buộc nằm trong một Task List.
3. Subtasks (Công việc con): Các đầu mục kiểm tra (Checklist) nhỏ nằm trong Task, giúp chia nhỏ khối lượng công việc phức tạp.
Module này cũng chịu trách nhiệm về Orchestration (Điều phối) thông qua việc liên kết các công việc phụ thuộc lẫn nhau.
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Task List Management
### User Story 4.1.
Là một Quản lý dự án, Tôi muốn tạo, sắp xếp và quản lý các Task List trong dự án. Để phân chia dự án thành các giai đoạn rõ ràng hoặc các nhóm việc logic.
### Acceptance Criteria ( #AC)
#### AC 1 - Container Creation:
- Input: User nhập `List Name` và nhấn "Tạo / Create"
- Logic: Hệ thống tạo một bản ghi trong bảng `task_lists` liên kết với `project_id` hiện tại.
#### AC 2 - Ordering:
- Action: User kéo thả các Task List trên giao diện.
- System: Cập nhật trường `position` trong database để ghi nhớ thứ tự hiển thị (từ trên xuống dưới).
#### AC 3 - Archive List:
- When: User chọn "Archive List".
- Then: Task List và toàn bộ các Task bên trong nó sẽ bị ẩn khỏi giao diện chính (Update `is_archived = true`)
## 2.2. Feature: Task Execution
### User Story 4.2.
Là một Thành viên dự án, Tôi muốn tạo một Task mới nằm trong một Task List cụ thể, Để xác định rõ công việc cần làm, thời hạn và mức độ ưu tiên.
### Acceptance Critera ( #AC)
#### AC 1 - Parent Constraint:
- Rule: Một Task không thể tồn tại độc lập. Khi tạo Task, hệ thống buộc phải gán `task_list_id`
#### AC 2 - Metadata Management:
- Hỗ trợ cập nhật các trường thông tin quan trọng:
	- `Priorityy`: Mức độ ưu tiên (Low, Medium, High, Urgent)
	- `Status`: Trạng thái xử lý của Task (Not-Started, In-Progress, Done).
	- `Date Range`: `Start Date` và `End Date` ($End Date >= Start Date$)
	- `Estimated Hours`: Ước lượng thời gian làm việc (số giờ).
	- `Is Milestone`: Đánh dấu đây là cột mốc quan trọng của dự án.
#### AC 3 - Recurring Tasks (Công việc lặp lại)
- Feature: Cho phép thiết lập task lặp lại (Hàng ngày, Hàng tuần, hoặc tùy chọn người dùng).
- Logic: Lưu cấu hình vào các trường liên quan.
## 2.3. Feature: Subtasks.
### User Story 4.3.
Là một Người thực hiện (Assignee), Tôi muốn thêm các Subtask dạng checklist vào trong Task chính, Để kiểm soát các bước thực hiện chi tiết mà không cần tạo thêm Task lớn.
### Acceptance Criteria ( #AC)
#### AC 1 - Quick Add:
- Cho phép thêm nhanh Subtask chỉ với tên.
#### AC 2 - Completion State:
- User có thể tick chọn hoàn thành Subtask. Hệ thống cập nhận subtask trên đã hoàn thành.
#### AC 3 - Ordering:
- Các Subtask có thể được sắp xếp lại thứ tự (`position`) để thể hiện quy trình thực hiện các bước.

## 2.4. Feature: Task Dependencies.
### User Story 4.4.
Là một Quản lý dự án, Tôi muốn thiết lập các mối quan hệ giữa Task A và  Task B, Để đảm bảo quy trình thực hiện đúng trình tự.
### Acceptance Criteria ( #AC)
#### AC 1 - Dependency Types:
- Hỗ trợ định nghĩa quan hệ giữa `Predecessor` (Việc trước) và `Success` (Việc sau)
- Lưu trữ loại quan hệ, mặc định FS (**F**insish-to-**S**tart)
#### AC 2 - Validation:
- Ngăn chặn việc tạo quan hệ vòng tròn (Cycle Dependency) gây lỗi logic (A -> B -> A).

# 3. Business Rules.
1. Quy tắc Vòng đời Task List.
- Khi một `task_lists` bị xóa (soft delete), hệ thống không xóa cứng các `tasks` bên trong ngay lập tức, mà đánh dấu xóa mềm đồng loạt hoặc ẩn đi trên UI.
- Khi di chuyển (Drag & Drop) một Task từ List A sang List B, chỉ cần cập nhật trường `task_list_id` của Task đó.
2. Quy tắc Subtask.
- Việc hoàn thành tất cả Subtask không tự động chuyển trạng thái của Task cha sang "Done". Hành động này cần sự xác nhận của người dùng.
- Subtask không có người được giao (Assignee) riêng biệt, nó thuộc về trách nhiệm của người được giao Task cha.
3. Quy tắc Recurring.
- Đảm bảo quá trình recurring của một task được triển khai đúng với dự kiến mà người dùng thiết lập.