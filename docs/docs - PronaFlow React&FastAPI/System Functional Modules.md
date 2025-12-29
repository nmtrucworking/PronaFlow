*Last updated: Decem 26, 2025*

---

Hệ thống PronaFlow được kiến trúc dựa trên mô hình _Domain-Driven Design (DDD)_, phân tách thành 10 phân hệ nghiệp vụ cốt lõi.


| N.O | Function Modules                                 | Details                                      |
| --- | ------------------------------------------------ | -------------------------------------------- |
| 1   | Phân hệ Quản trị Định dang & Kiểm soát Truy cập  | [[1 - Identity and Access Management]]       |
| 2   | Phân hệ Quản trị Đa Tổ chức                      | [[2 - Multi-tenancy Workspace Governance]]   |
| 3   | Phân hệ Quản lý Vòng đời Dự án                   | [[3 - Project Lifecycle Management]]         |
| 4   | Phân hệ Điều phối & Thực thi Tác vụ              | [[4 - Task Execution and Orchestration]]     |
| 5   | Phân hệ Lập lịch & Quản trị Thời gian            | [[5 - Temporal Planning and Scheduling]]     |
| 6   | Phân hệ Truyền thông & Cộng tác Hợp nhất         | [[6 - Unified Collaboration Hub]]            |
| 7   | Phân hệ Thông báo Hướng Sự kiện                  | [[7 - Even-Driven Notification System]]      |
| 8   | Phân hệ Lưu trữ & Tuân thủ Dữ liệu               | [[8 - Data Archiving and Compliance]]        |
| 9   | Phân hệ Cá nhân hóa Trải nghiệm                  | [[9 - User Experience Personalization]]      |
| 10  | Phân hệ Hệ thống Hỗ trợ Ra quyết định Thông minh | [[10 - Intelligent Decision Support System]] |

# 1. Identity & Access Management - IAM
Đóng vai trò là cổng an ninh của toàn bộ hệ thống (Security Gateway)
- **Authentication Service** (Xác thực): Triển khai cơ chế xác thực đa yếu tố ( #MFA) và quản lý phiên làm việc thông qua tiêu chuẩn #JWT kết hợp Refresg Token, đảm bảo an toàn cho kiến trúc Stateless API.
- **Authorization Matrix** (Ma trận phân quyền): Thiết lập cơ chế #RBAC động. Cho phép quản trị viên định nghĩa các chính sách (policy) truy cập tài nguyên (Project, Task, Document) đến mức độ chi tiết (Grannular Permission).
Xem chi tiết tại: [[1 - Identity and Access Management]]
# 2. Multi-tenancy Workspace Governance
Giải quyết bài toán vận hành cho nhiều doanh nghiệp/ đội nhóm trên cùng một hạ tầng (SaaS Architecture).
- Logical Isolation: Đảm bảo tính toàn vẹn và riêng tư của dữ liệu giữa các Workspace khác nhau (Data Partitioning)
- Tenant Lifecycle: Quản trị vòng đợi của một tổ chức từu khi khởi tạo, thiết lập cấu hình riêng (Domain setting), quản lý hạn ngạch (Quota) tài nguyên đến khi lưu trữ hoặc hủy bỏ.
Xem chi tiết tại: [[2 - Multi-tenancy Workspace Governance]]
# 3. Project Lifecycle Management
Module trung tâm điều phốit oàn bộ hoạt động quản trị.
- Workflow Engien: Cho phép tùy biến quy trình làm việc (Custom Workflows) phù hợp với các phương pháo luận quản trị khác nhau (Scum, Kanban, Waterfall). Người dùng có thể định nghĩa các trạng thái (States) và quy tắc chuyển đổi (Transitions).
- Project Meta-data: Quản lý các thuộc tính mở rộng dự án, thiết lập các ràng buộc về thời gian, ngân sách và phạm vi (Scope).
- Interactive Kanban Interface: Giao điện tương tác trực quan (Visual Management) hỗ trợ kéo thả, cập nhật trạng thái tức thời (Real-time State Synchronization).
Xem chi tiết tại: [[3 - Project Lifecycle Management]]
# 4. Task Execution & Orchestration
Được thiết kế để tối ưu hóa hiệu suất làm việc của người dùng cuối (End-user).
- Atomic Task Unit: Quản lý công việc ở mức độ nguyên tử, hỗ trợ phân rã cấu trúc công việc ( #WBS) thành nhiều tầng: Task List -> Task -> Subtask
- Dependency Management: Xử lý các mối quan hệ phụ thuộc giữa các công việc (FS, SS, v.v.), tự động hóa phát hiện và cảnh báo xung đột lịch trình.
Xem chi tiết tại: [[4 - Task Execution and Orchestration]]
# 5. Temporal Planning & Scheduling
- Timeline Visulization: Trực quan hóa tiến độ dự án dưới dạng biểu đồ Gantt và Lịch biểu (Calendar View), giúp người quản lý xác định đường găng (Critical Path) của dự án.
- SLA Tracking: Giám sát cam kết mức độ dịch vụ ( #SLA) và thời hạn (Deadline), tự động tính toán độ trễ và kích hoạt quy trình leo thang (Escalation) khi cần thiết.
Xem chi tiết tại: [[5 - Temporal Planning and Scheduling]]
# 6. Unified Collaboration Hub
- Contextual Communication: Tích hợp luồng thảo luận (Threaded Comments) gắn liền với ngữ cảnh công việc cụ thể, hỗ trợ định dạng Rich Text và các tương tác xã hội (@mention, reaction).
- Digital Asset Management ( #DAM): Kho lưu trữ tài sản số tập trung, hỗ trợ versioning (quản lý phiên bản) cho tài liệu đính kèm và tích hợp xem trước đa dạng.
Xem chi tiết tại: [[6 - Unified Collaboration Hub]]
# 7.  Event-Driven Notification System
- Pub/Sub Machanism: Sử dụng kiến trúc Publish/Subscribe để xử lý hàng triệu sự kiện hệ thống theo thời gian thực.
- Smart Routing: Phân loại và định tuyến thông báo thông minh đến đúng đối tượng, qua đúng kênh (In-app, Email, Push) để giảm thiểu nhiễu thông tin.
Xem chi tiết tại: [[7 - Even-Driven Notification System]]
# 8. Data Archiving & Compliance
- Data Retention Policy: Thiết lập các quy tắc tự động về lưu trữ và xóa dữ liệu (Soft Delete/ Hard Delete) tuân thủ các quy định bảo mật.
- Cold Storage Strategy: Cơ chế di chuyển dữ liệu ít truy cập (dự án đã đóng) sang vùng lưu trữ lạnh để tối ưu hiệu năng truy cập cho hệ thống chính (Hot Data).
Xem chi tiết tại: [[8 - Data Archiving and Compliance]]
# 9. User Experience Personalization
- L18n & L10n: Hỗ trợ Quốc tế hóa (Internationalization) và Bản địa hóa (Localization) toàn diện cho giao diện và dữ liệu/
- Adaptive UI: Cho phép người dùng tuy biến Theme, Layout và Dashboard cá nhân hóa để phù hợp với thói quan làm việc (Ergonomics).
Xem chi tiết tại: [[9 - User Experience Personalization]]
# 10. Intelligent Decision Support System - IDSS
Đây là phân hệ nâng cao, tận dụng nền tảng Data Science để chuyển đổi dữ liệu thô thành tri thức quản trị.
- Predictive Analytics: Sử dụng các mô hình hồi quy (Regression Models) để dự báo ngày hoàn thành dự án dựa trên vận tốc làm việc lịch sử.
- Prescriptive Analytics: Ứng dụng thuật toán gợi ý để đề xuất phân công nhân sự tối ưu dựa trên kỹ năng (Skill-set) và tải công việc.
- Anomaly Detection: Tự động phát hiện các hành vi bất thường trong hệ thống hoặc các dự án có nguy cơ rủi ro cao.
Xem chi tiết tại: [[10 - Intelligent Decision Support System]]