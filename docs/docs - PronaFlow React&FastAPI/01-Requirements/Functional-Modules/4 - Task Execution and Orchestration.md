**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
*Last updated: Jan 4, 2026*

---
# 1. Business Overview
Trong hệ thống PronaFlow, Task (Công việc) là đơn vị nguyên tử (Atomic Unit) của giá trị. Mọi hoạt động quản trị, cộng tác và đo lường đều xoay quanh thực thể này. Module này chịu trách nhiệm về:
1. Work Breakdown Structure ( #WBS): Phân rã dự án thành các phân quản lý được: `Task Lists` -> `Tasks` -> `Subtasks`
	1.  Task Lists (Danh sách công việc): Đóng vai trò là các "Container" dùng để gom nhóm các công việc. Tùy theo phương pháp quản lý (Waterfall hay Agile), Task List có thể đại diện cho các Giai đoạn (Phrase), Print, hoặc các Nhóm chức năng tùy theo cấu hình mà người dùng triển khai trong dự án của họ.
	2. Tasks (Công việc): Đơn vị thực thi chính, chứa đầy đủ thông tin về tiến độ, thời gian, và người thực hiện. Task bắt buộc nằm trong một Task List.
	3. Subtasks (Công việc con): Các đầu mục kiểm tra (Checklist) nhỏ nằm trong Task, giúp chia nhỏ khối lượng công việc phức tạp.
2. Execution: Cung cấp đầy đủ công cụ để thực thi công việc (Gán người, đặt hạn, dán nhãn).
3. Orchestrain (Điều phối): Quản lý dự phụ thuộc và lặp lại để đảm bảo dòng chảy công việc không bị gián đoạn.
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Task List Management
### User Story 4.1.
Là một Quản lý dự án, Tôi muốn tạo, sắp xếp và quản lý các Task List trong dự án. Để phân chia dự án thành các giai đoạn rõ ràng hoặc các nhóm việc logic.
### Acceptance Criteria ( #AC)
#### AC 1 - Container Management
- **Action:** CRUD Task List.
- **Constraint:** Không thể xóa một List nếu nó đang chứa Task (Phải di chuyển Task đi nơi khác hoặc Archive cả List).
#### AC 2 - Drag & Drop Ordering
- **Action:** Kéo thả List A sang vị trí của List B.
- **System:** Cập nhật trường `position` trong DB. Đảm bảo trải nghiệm mượt mà, không bị giật (Optimistic UI update).
## 2.2. Feature: Task Execution
### User Story 4.2.
Là một Thành viên dự án, Tôi muốn tạo một Task mới nằm trong một Task List cụ thể, Để xác định rõ công việc cần làm, thời hạn và mức độ ưu tiên.
### Acceptance Critera ( #AC)
#### AC 1 - Parent Constraint:
- Rule: Một Task không thể tồn tại độc lập. Khi tạo Task, hệ thống buộc phải gán `task_list_id`
#### AC 2 - Metadata Management:
- Hỗ trợ cập nhật các trường thông tin quan trọng:
	- `Title` (Bắt buộc).
	- `Assigness` (Cho phép gán nhiều người, nhưng phải chỉ định 1 người chịu trách nhiệm chính - Primary Owner).
	- `Priority`: Mức độ ưu tiên (Chọn từ Danh mục: `Low`, `Medium`, `High`, `Urgent`)
	- `Status`: Trạng thái xử lý của Task (`Not-Started`, `In-Progress`, `Done`).
	- `Date Range`: `Start Date` và `End Date` ($End Date >= Start Date$), có thể có giờ cụ thể (e.g. 17:00 31/12).
	- `Estimated Hours`: Ước lượng thời gian làm việc (số giờ) (Input cho [[10 - Intelligent Decision Support System|Module 10]] và [[11 - Advanced Analytics and Reporting|Module 11]])
	- `Is Milestone`: Đánh dấu đây là cột mốc quan trọng của dự án.
- Trigger: Khi tạo xong, hệ thống gửi thông báo cho người được gán ([[7 - Even-Driven Notification System|Module 7]])
#### AC 3 - Tags & Labels System
- Action: User có thể tạo mới hoặc chọn tag có sẵn.
- Visual: Mỗi tag có một màu sắc riêng biệt để nhận diện trên Board.
- Scope: Tag được quản lý ở cấp độ Workspace để tái sử dụng giữa các dự án.
- Xem chi tiết tại: [[]]
#### AC 44 - Time Tracking Integration
- **UI:** Hiển thị nút "Start Timer" ngay trên Task Detail.
- **Logic:** Khi bấm Start -> Gọi API sang **Module 11** để bắt đầu tính giờ. Khi bấm Stop -> Lưu Log.
## 2.3. Feature: Subtasks.
### User Story 4.3.
- Là một Người thực hiện (Assignee), 
- Tôi muốn chia nhỏ Task thành danh sách kiểm tra (Checklist),
- Để kiểm soát các bước thực hiện chi tiết mà không cần tạo thêm Task lớn.
### Acceptance Criteria ( #AC)
#### AC 1 - Checklist Behavior
- **Input:** Nhập text và Enter để thêm dòng mới nhanh.
- **State:** Mỗi subtask có checkbox (Done/Not Done).
- **Progress Bar:** Task cha hiển thị thanh tiến độ dựa trên % Subtask hoàn thành (Ví dụ: 3/4 Subtasks = 75%).
#### AC 2 - Assignable Subtasks
- Cho phép gán người thực hiện riêng cho từng Subtask (nếu cần thiết). Nếu không gán, mặc định thuộc về người làm Task cha.
- Scope: Đối với gán Subtask chỉ cho phép gán cho những người được gán trong Task cha.
#### AC 3 - Ordering:
- Các Subtask có thể được sắp xếp lại thứ tự (`position`) để thể hiện quy trình thực hiện các bước.
## 2.4. Feature: Task Dependencies.
### User Story 4.4.
- Là một Quản lý dự án, 
- Tôi muốn thiết lập các mối quan hệ giữa Task A và  Task B, 
- Để đảm bảo quy trình thực hiện đúng trình tự.
### Acceptance Criteria ( #AC)
#### AC 1 - Dependency Types:
- Hỗ trợ định nghĩa quan hệ giữa `Predecessor` (Việc trước) và `Success` (Việc sau)
- Lưu trữ loại quan hệ, mặc định FS (**F**insish-to-**S**tart)
#### AC 2 - Cycle Detection Validation
- **Logic:** Khi User cố gắng nối A -> B, hệ thống kiểm tra đồ thị. Nếu phát hiện B đang gián tiếp chặn A (A -> ... -> B), ngăn chặn hành động và báo lỗi `TASK_001: Circular dependency detected`.
## 2.5. Feature: Recurring Tasks (Công việc lặp lại)
### User Story 4.5
Là một Team Lead, Tôi muốn thiết lập Task "Gửi báo cáo tuần" tự động lặp lại vào thứ 6 hàng tuần, Để không phải tạo thủ công.
### Acceptance Criteria (#AC)
#### AC 1 - Recurrence Pattern
- Hỗ trợ các mẫu: 
	- Daily, 
	- Weekly (chọn ngày trong tuần), 
	- Monthly, 
	- Custom.
#### AC 2 - Generation Strategy (Chiến lược sinh Task)
- **Lazy Generation:** Hệ thống không sinh ra hàng nghìn task tương lai ngay lập tức.
- **Logic:** Chỉ sinh ra Task tiếp theo (Next Instance) khi Task hiện tại được đánh dấu là **Done** hoặc đến ngày kích hoạt.
- **Prefix:** Tự động thêm suffix vào tên task (e.g., "Report [2025-01-01]", "Report [2025-01-08]").
# 3. Business Rules
1. **Quy tắc Vòng đời (Parent-Child Lifecycle):**
    - Việc hoàn thành tất cả Subtask **KHÔNG** tự động chuyển trạng thái Task cha sang "Done" (Vì có thể còn việc khác chưa liệt kê). User phải xác nhận thủ công.
    - Tuy nhiên, nếu Re-open một Subtask, Task cha (nếu đang Done) nên tự động chuyển về In-Progress.
2. **Quy tắc Xóa (Deletion Rules):**
    - **Archive:** Ẩn Task khỏi giao diện nhưng vẫn giữ trong DB và Search. (Khuyên dùng).
    - **Delete:** Chuyển vào thùng rác (Module 8).
    - Nếu xóa Task List -> Yêu cầu xác nhận xóa toàn bộ Task bên trong hoặc di chuyển chúng sang List khác ("Move to...").
3. **Quy tắc cập nhật Task lặp lại:**
    - Khi sửa một Task lặp lại, hệ thống phải hỏi:
        - "Chỉ sửa task này?" (This instance only).
        - "Sửa task này và các task tương lai?" (This and future instances).
# 4. Theoretical Basis (Cơ sở Lý luận)
## 4.1. Work Breakdown Structure (WBS)
Module này tuân thủ nguyên tắc phân rã công việc WBS:
- **Level 1:** Project.
- **Level 2:** Task Lists (Phases/Epics).
- **Level 3:** Tasks (Work Packages).
- **Level 4:** Subtasks (Activities). Giúp quản lý sự phức tạp bằng cách chia nhỏ vấn đề ("Divide and Conquer").
## 4.2. Định luật Brooks (Brooks's Law)

> "Thêm nhân lực vào một dự án phần mềm đang chậm tiến độ sẽ chỉ làm nó chậm thêm."

Áp dụng vào tính năng **Activity Log & Dependencies**: Việc giao tiếp không rõ ràng (Implicit Communication) là nguyên nhân gây chậm trễ. Hệ thống làm rõ các phụ thuộc và lịch sử thay đổi để giảm chi phí giao tiếp (Communication Overhead), giúp việc thêm người mới (nếu cần) dễ dàng hơn nhờ lịch sử minh bạch.
## 4.3. Getting Things Done (GTD Methodology)
Hỗ trợ tư duy GTD thông qua các trạng thái Task:
- **In-Basket:** Task mới tạo (chưa phân loại).
- **Next Action:** Task có ngày và người làm cụ thể.
- **Waiting For:** Task bị chặn (Blocked by dependency).
- **Someday/Maybe:** Task ở trạng thái "Hold".