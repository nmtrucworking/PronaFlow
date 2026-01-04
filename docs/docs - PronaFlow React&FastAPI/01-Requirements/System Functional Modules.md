**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
***Last updated:** Jan 4, 2025*

---
Hệ thống PronaFlow được kiến trúc dựa trên mô hình _Domain-Driven Design (DDD)_, phân tách thành 16 phân hệ nghiệp vụ cốt lõi.

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
| 11  | Phân hệ Báo cáo & Phân tích Nâng cao             | [[11 - Advanced Analytics and Reporting]]    |
| 12  | Phân hệ Hệ sinh thái tích hợp & Mở rộng          | [[12 - Integration Ecosystem]]               |
| 13  | Phân hệ Gói cước & Thanh toán                    | [[13 - Subscription and Billing Management]] |
| 14  | Phân hệ Quản trị Hệ thống & Vận hành             | [[14 - System Administration]]               |
| 15  | Phân hệ Trung tâm Trợ giúp & Cơ sở Tri thức      | [[15 - Help Center and Knowledge Base]]      |
| 16  | Phân hệ Dẫn nhập & Đào tạo Người dùng            | [[16 - User Onboarding and Adoption]]        |

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
- **Standardization:** Chuẩn hóa quy trình khởi tạo thông qua **Project Templates** và thiết lập quyền hạn (Roles).
- **Portfolio Organization:** Tổ chức dự án theo Danh mục (Portfolios/Programs) để phục vụ quản lý vĩ mô.
- **Lifecycle Governance:** Kiểm soát chuyển đổi trạng thái dự án thông qua các cổng kiểm tra (Transition Gates) và tích hợp quy trình lưu trữ (Archiving Strategy).
Xem chi tiết tại: [[3 - Project Lifecycle Management]]
# 4. Task Execution & Orchestration
Được thiết kế để tối ưu hóa hiệu suất thực thi và đảm bảo kỷ luật vận hành.
- **WBS & Atomic Units:** Quản lý cấu trúc phân rã công việc đa tầng (Task List -> Task -> Subtask) và các thuộc tính mở rộng (Custom Fields).
- **Productivity Tools:** Cung cấp bộ công cụ tăng tốc độ làm việc: Time Tracking, Task Templates, và Thao tác hàng loạt (Bulk Actions).
- **Orchestration & Compliance:** Quản lý sự phụ thuộc (Dependencies) và thực thi các ràng buộc từ kế hoạch tổng thể (Planning Constraints), đảm bảo tiến độ thực tế (Actual) luôn được đối chiếu chặt chẽ với kế hoạch (Baseline).
Xem chi tiết tại: [[4 - Task Execution and Orchestration]]
# 5. Temporal Planning & Scheduling
Phân hệ hoạch định chiến lược và quản trị thời gian dự án nâng cao.
- **Advanced Gantt & CPM:** Trực quan hóa tiến độ, xác định đường găng (Critical Path) và xử lý phụ thuộc đa dự án (Cross-Project Dependencies).
- **Planning Governance:** Thiết lập kỷ luật vận hành thông qua quy trình phê duyệt kế hoạch (Approval Workflow), quản lý phiên bản Baseline và phân tích tác động thay đổi (Change Impact Analysis).
- **Optimization & Simulation:** Hỗ trợ ra quyết định chiến lược với các công cụ mô phỏng rủi ro (What-If Simulation), dự báo xác suất (P50/P90) và tự động cân bằng nguồn lực (Resource Leveling).
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
# 11. Advanced Analytics & Reporting
Cung cấp góc nhìn sâu sắc về hiệu suất vận hành doanh nghiệp thông qua dữ liệu lịch sử.
- **Descriptive Analytics**: Báo cáo tổng hợp đa chiều về tiến độ, phân bổ nguồn lực và chi phí (Burn-down, Velocity, Resource Heatmap).
- **Time Tracking & Timesheets**: Ghi nhận thời gian thực tế (Billable/Non-billable Hours) phục vụ công tác kế toán và tính lương.
- **Custom Report Builder**: Cho phép người dùng tự định nghĩa báo cáo (Ad-hoc Reporting) bằng thao tác kéo thả. 
Xem chi tiết tại: [[11 - Advanced Analytics and Reporting]]
# 12. Integration Ecosystem
Mở rộng khả năng của PronaFlow thông qua việc kết nối với các hệ thống bên ngoài.
- **API Gateway & Webhooks**: Cung cấp cơ chế giao tiếp chuẩn (RESTful/GraphQL) để các bên thứ 3 (GitLab, Figma, Slack) tích hợp quy trình.
- **Marketplace**: Kho ứng dụng tập trung (Plugin Architecture) cho phép cài đặt và quản lý các tiện ích mở rộng.
- **Connector Hub**: Các đầu nối (Connectors) dựng sẵn giúp đồng bộ dữ liệu hai chiều (Bi-directional Sync) mà không cần viết code (No-code Integration). Xem chi tiết tại: [[12 - Integration Ecosystem]]
# 13. Subscription & Billing Management
Hệ thống quản trị tài chính và cấp phép sử dụng tài nguyên (Resource Provisioning).
- **Plan Management**: Định nghĩa các gói dịch vụ (Tiered Pricing) và hạn ngạch tài nguyên (Quotas) cho từng gói (User limit, Storage limit).
- **Automated Billing Cycle**: Tự động hóa quy trình tính cước (Recurring Billing), xuất hóa đơn (Invoicing) và xử lý gia hạn.
- **Usage Metering**: Đo đếm mức độ sử dụng tài nguyên thực tế (API calls, AI tokens) để phục vụ mô hình tính phí theo nhu cầu (Pay-as-you-go). 
Xem chi tiết tại: [[13 - Subscription and Billing Management]]
# 14. System Administration
Phân hệ dành riêng cho Super Admin để giám sát và vận hành toàn bộ hệ thống (Back-office).
- **Global Tenant Management**: Quản lý vòng đời của tất cả các Tenant (Onboard, Suspend, Offboard).
- **Operational Observability**: Dashboard giám sát sức khỏe hệ thống (Health Check), xem log lỗi tập trung và theo dõi hiệu năng (APM).
- **Feature Flags**: Quản lý bật/tắt tính năng mới theo từng nhóm người dùng (A/B Testing) mà không cần redeploy. 
Xem chi tiết tại: [[14 - System Administration]]
# 15. Help Center & Knowledge Base
Hệ thống tự phục vụ (Self-service) giúp giảm tải cho bộ phận hỗ trợ kỹ thuật.
- **Contextual Help**: Nhúng tài liệu hướng dẫn (Embedded Docs) ngay tại nơi người dùng gặp khó khăn (Context-aware Widgets).
- **CMS for Documentation**: Hệ thống quản lý nội dung bài viết, FAQ, Release Notes với khả năng tìm kiếm ngữ nghĩa (Semantic Search).
- **Feedback Loop**: Thu thập đánh giá của người dùng về độ hữu ích của bài viết để liên tục cải thiện chất lượng tài liệu. 
Xem chi tiết tại: [[15 - Help Center and Knowledge Base]]
# 16. User Onboarding & Adoption
Tối ưu hóa trải nghiệm người dùng mới và thúc đẩy hành vi sử dụng sản phẩm.
- **Interactive Walkthroughs**: Các tour hướng dẫn từng bước (Step-by-step Guides) phủ lên giao diện ứng dụng để đào tạo người dùng (In-app Training).
- **Progress Tracking**: Theo dõi tiến độ hoàn thành các bước thiết lập hồ sơ (Onboarding Checklist).
- **Feature Discovery**: Giới thiệu tính năng mới thông qua các thông báo định hướng (Tooltips/Hotspots) dựa trên hành vi người dùng. 
Xem chi tiết tại: [[16 - User Onboarding and Adoption]]