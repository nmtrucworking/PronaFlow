*Last updated: Decem 31, 2025*
***Version***: 1.0

---

# 1. Business Overview
Module này đại diện cho phân hệ "Planning" (Hoạch định Dự án) chuyên sâu của dự án. Khác với việc quản lý thực thi hàng ngày (Task Execution - Module 4), module này tập truung vào tầm nhìn dài hạn và sự phụ thuộc giữa các đầu việc.
**Triết lý Thiết kế**: "***Optional & Scalable***": Hệ thống PronaFlow tôn trọng quy mô của từng dự án. Không phải dự án nào cũng cần biểu đồ Gantt phức tạp hay cơ chế tính toán lịch trình.
- **Đối với dựa án nhỏ** (**Simple/Agile**): Người dùng có thể bỏ qua module này. Họ chỉ cần tạo Task List, Task và Subtask (như Module 3&4 trình bày) để quản lý Dựa án đơn giản và gọn nhẹ.
- **Đối với Dự án lớn** (**Waterfall/Hybrid**): Project Leader có thể kích hợp nút "Planning". Khi đó, Project Leader có thể thực hiện các tác vụ hoạch định dự án, như triển khai nguồn lực, xác định thời gian, tài nguyên dự án, v.v.
# 2. User Stories & Acceptance Criteria
## 2.1 Feature: Planning Mode Toggle
### User Story 5.1
Là một Project Leader, Tôi muốn có quyền bật hoặc tắt chế độ "Planning" trong cài đặt dự án, Để giữ giao diện đơn giản nếu dự án của tôi nhỏ, hoặc mở rộng tính năng nếu dự án phức tạp.
### Acceptance Criteria ( #AC)
#### AC 1 - Default State 
- Given: Một dự án mới được tạo.
- Then: Giao diện chi tiết dự án (Execution) được hiển thị cho người dùng. Sẽ có nút "Planning" cho người dùng tùy chọn kích hoạt chế độ này.
#### AC 2 - Toggle Action & Context Switching
- When: 2 cách 
	- User ấn nút cta "Planning"
	- User vào Project Settings và chọn chuyển đổi dự án.
- Then: Hiển thị nhóm giao diện dành riêng cho chức năng Hoạch định, để thoát, người dùng chọn 
	- Thoát và lưu các tùy chọn -> Hệ thống lưu dự án đang được hoạch định.
	- Triển khai dự án -> Xuất bản dự án và Bắt đầu vòng đời một dự án.
#### AC 3 - Data Presservation
- When: Khi tắt Planning Mode.
- Then: Các dữ liệu thuộc phân hệ Hoạch định vẫn được lưu ngầm trong Database, chỉ là ẩn giao diện hiển thị để đơn giản hóa trải nghiệm.
## 2.2. Feature: Interactive Gantt Chart (Biểu đồ Gantt tương tác)
### User Story 5.2
Là một Project Manager, Tôi muốn trực quan hóa lịch trình dự án trên biểu đồ Gantt và thiết lập các mối quan hệ phụ thuộc, Để nhìn thấy bức tranh tổng thể và tác động dây chuyền khi thay đổi thời gian.
### Acceptance Criteria ( #AC)
#### AC 1 - Visualization
- **Display:** Hiển thị trục hoành là Thời gian (Ngày/Tuần/Tháng), trục tung là danh sách Task (Hierarchical tree: Task List -> Task).
- **Indicators:**
    - Task bar: Độ dài thanh tương ứng với `duration`.
    - Progress bar: Thanh màu đậm bên trong thể hiện `% completion`.
    - Connector lines: Đường nối thể hiện sự phụ thuộc.
#### AC 2 - Dependency Manipulation (Quản lý phụ thuộc)
- **Action:** User kéo dây nối từ đuôi Task A sang đầu Task B.
- **System Behavior:**
    - Tạo quan hệ Finish-to-Start (FS) mặc định.
    - Validate logic vòng lặp (Circular Dependency Check): Nếu A -> B -> C -> A, hệ thống báo lỗi và chặn hành động.
    - Tự động dời ngày bắt đầu của Task B sao cho: $Start(B) \geq End(A)$.
#### AC 3 - Auto-Scheduling (Lập lịch tự động)
- **Scenario:** Task A bị trễ 2 ngày.
- **System Logic:** Hệ thống tự động tính toán lại và dời lịch (Shift) toàn bộ các Task phụ thuộc (Successors) của A thêm 2 ngày, đảm bảo tính toàn vẹn của kế hoạch.
## 2.3. Feature: SLA Tracking (Theo dõi Cam kết Dịch vụ)
### User Story 5.3
Là một Quản lý, Tôi muốn thiết lập và theo dõi SLA cho các Task quan trọng, Để đảm bảo đội ngũ không chỉ hoàn thành việc mà còn đáp ứng đúng cam kết về thời gian phản hồi.
### Acceptance Criteria ( #AC)
#### AC 1 - SLA Definition
- Cho phép định nghĩa `SLA Policy` dựa trên độ ưu tiên (Priority).
    - _Urgent:_ 4 giờ làm việc.
    - _High:_ 1 ngày làm việc (8h).
    - _Normal:_ 3 ngày làm việc.
#### AC 2 - Business Hours Logic
- **Calculation:** Bộ đếm thời gian (Timer) chỉ chạy trong khung giờ làm việc (ví dụ: 08:00 - 17:00, T2-T6).
- **Exclusion:** Tự động trừ các ngày nghỉ lễ (Holidays) và cuối tuần (Weekends) được cấu hình trong Workspace Settings.
#### AC 3 - Visual Warning
Hệ thống hiển thị trạng thái SLA thông qua mã màu trên thẻ Task:
- **On Track (Xanh):** Thời gian trôi qua < 75% SLA.
- **At Risk (Vàng):** Thời gian trôi qua $\geq$ 75% SLA.
- **Breached (Đỏ):** Thời gian trôi qua > 100% SLA.
# 3. Business Rules (Quy tắc Nghiệp vụ)
## 3.1. Quy tắc Toàn vẹn Thời gian (Temporal Integrity)
1. **Parent-Child Constraint:** Khoảng thời gian của Task List (Parent) là bao trùm (union) của tất cả các Task con.
    - $Start(Parent) = \min(Start(Children))$
    - $End(Parent) = \max(End(Children))$
2. **Milestone Logic:** Milestone là một điểm thời gian, không có thời lượng ($Duration = 0$). Milestone không thể có Subtask.
## 3.2. Quy tắc Ràng buộc Phụ thuộc (Dependency Constraints)
PronaFlow hỗ trợ chuẩn **FS (Finish-to-Start)** làm mặc định vì tính phổ biến:
- Task B (Hậu tố) không thể bắt đầu trước khi Task A (Tiền tố) kết thúc.
- Nếu người dùng cố tình nhập liệu vi phạm (ví dụ: set ngày tay thủ công), hệ thống sẽ hiển thị cảnh báo "Schedule Conflict" nhưng cho phép lưu (Soft Constraint) hoặc chặn (Hard Constraint) tùy cấu hình dự án.
# 4. Theoretical Basis & Algorithms (Cơ sở Lý luận & Thuật toán)

Để đảm bảo tính "Khoa học Dữ liệu" trong quản trị, module này áp dụng các mô hình toán học sau:
## 4.1. Phương pháp Đường găng (Critical Path Method - CPM)
Hệ thống tự động xác định chuỗi các công việc quyết định thời gian hoàn thành dự án.
- **Forward Pass (Tính toán xuôi):** Xác định thời gian sớm nhất ($ES, EF$).
    - $ES(Task) = \max(EF(Predecessors))$
    - $EF(Task) = ES(Task) + Duration$
- **Backward Pass (Tính toán ngược):** Xác định thời gian muộn nhất ($LS, LF$).
    - $LF(Task) = \min(LS(Successors))$
    - $LS(Task) = LF(Task) - Duration$
- **Float/Slack (Độ trôi):** $Float = LS - ES$.
    - Nếu $Float = 0$: Task nằm trên đường găng (Critical Task). Bất kỳ sự chậm trễ nào của task này đều làm trễ cả dự án. Hệ thống sẽ tô đỏ các task này trên Gantt Chart.
## 4.2. Thuật toán tính toán SLA (SLA Calculation Algorithm)
Đây là thuật toán xử lý sự chênh lệch giữa thời gian thực tế (Calendar Time) và thời gian làm việc (Business Time).
Công thức xác định thời điểm vi phạm ($T_{breach}$):
$$T_{breach} = T_{start} + D_{sla} + \sum T_{off\_shift} + \sum T_{holidays}$$
**Trong đó:**
- $T_{start}$: Thời điểm bắt đầu tính giờ (Status chuyển sang In-Progress).
- $D_{sla}$: Thời lượng cam kết (ví dụ: 4 giờ).
- $\sum T_{off\_shift}$: Tổng thời gian ngoài giờ hành chính nằm giữa khoảng thời gian xử lý.
- $\sum T_{holidays}$: Tổng thời gian các ngày lễ/nghỉ phép.
_Ví dụ minh họa:_
- SLA: 4 giờ.
- Start: 16:00 Thứ Sáu.
- Giờ làm việc: 08:00 - 17:00 (Nghỉ trưa 12:00-13:00).
- Tính toán:
    - 16:00 -> 17:00 Thứ 6: Tiêu tốn 1 giờ. (Còn lại 3h).
    - 17:00 T6 -> 08:00 Thứ 2: Off-shift (Cuối tuần).
    - 08:00 -> 11:00 Thứ 2: Tiêu tốn 3 giờ.
- **Kết quả:** $T_{breach}$ là 11:00 Thứ Hai tuần kế tiếp.