**Project**: PronaFlow
**Version**: 1.1
**State**: Draft
***Last updated:** Mar 31, 2026*

---
# 1. Business Overview
Khi PronaFlow mở rộng từ nhóm nhỏ sang mô hình Enterprise đa tenant, nhu cầu quản trị hệ thống không còn dừng ở "cấu hình kỹ thuật" mà trở thành một năng lực vận hành cốt lõi. Phân hệ **System Administration** đảm nhiệm 3 mục tiêu trọng yếu:
1. **Reliability:** Duy trì tính sẵn sàng cao, giảm MTTR khi có sự cố.
2. **Security & Governance:** Quản trị quyền, chính sách và bằng chứng kiểm toán xuyên suốt vòng đời dữ liệu.
3. **Operational Scalability:** Chuẩn hóa quy trình vận hành để hệ thống tăng trưởng mà không tăng rủi ro tương ứng.

Module 14 đóng vai trò "control plane" cho các module khác: IAM (Module 1), Data Archiving (Module 8), AI Workflows (Module 10), Subscription/Billing (Module 13), và Help Center (Module 15).

# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Policy-based Administration
### User Story 14.1
Là một **Platform Admin**, tôi muốn quản trị hệ thống theo chính sách (policy) thay vì thao tác thủ công rời rạc, để giảm lỗi con người và đảm bảo nhất quán giữa các tenant.

### Acceptance Criteria (#AC)
#### AC 1 - Policy Templates
- Hệ thống hỗ trợ template chính sách cho các nhóm: Access Control, Data Retention, Session Security, API Rate Limit.
- Mỗi policy có version (`v1`, `v2`), trạng thái (`Draft`, `Approved`, `Enforced`) và lịch sử phê duyệt.

#### AC 2 - Scoped Enforcement
- Policy có thể áp dụng theo phạm vi: Global, Region, Workspace Tier (Free/Pro/Enterprise).
- Nếu policy xung đột, thứ tự ưu tiên: `Global Mandatory > Compliance Override > Workspace Custom`.

#### AC 3 - Safe Rollout
- Hỗ trợ "dry-run" để đánh giá tác động trước khi enforce.
- Có cơ chế rollback một lần bấm khi tỷ lệ lỗi tăng vượt ngưỡng cảnh báo.

## 2.2. Feature: Incident Command Console
### User Story 14.2
Là một **SRE Admin**, tôi muốn có một giao diện điều phối sự cố tập trung, để theo dõi trạng thái dịch vụ, runbook và timeline xử lý theo thời gian thực.

### Acceptance Criteria (#AC)
#### AC 1 - Severity-driven Workflow
- Incident được phân mức `SEV-1` đến `SEV-4` với SLA phản hồi tương ứng.
- Tự động gán Incident Commander khi SEV-1/SEV-2 được tạo.

#### AC 2 - Unified Timeline
- Mọi hành động (acknowledge, mitigation, rollback, postmortem) được ghi vào timeline bất biến.
- Timeline phải truy xuất được theo Incident ID và xuất được báo cáo điều tra.

#### AC 3 - Runbook Integration
- Mỗi loại sự cố (DB latency, queue backlog, auth outage) liên kết runbook chuẩn.
- Cho phép đánh dấu bước runbook đã hoàn thành để đồng bộ giữa các ca trực.

## 2.3. Feature: Administrative Audit & Delegation
### User Story 14.3
Là một **Audit Admin**, tôi muốn theo dõi toàn bộ thao tác đặc quyền và cơ chế ủy quyền tạm thời, để đảm bảo truy vết đầy đủ và ngăn lạm quyền.

### Acceptance Criteria (#AC)
#### AC 1 - Immutable Admin Log
- Mọi hành động admin phải ghi log với cấu trúc: `who`, `when`, `where`, `what`, `before`, `after`, `reason`.
- Log không cho phép chỉnh sửa/xóa ở tầng ứng dụng.

#### AC 2 - Just-in-time Privilege
- Quyền nhạy cảm (xem PII, rotate key, force account unlock) chỉ được cấp tạm thời theo thời lượng.
- Bắt buộc nhập lý do nghiệp vụ và ticket tham chiếu trước khi nhận quyền.

#### AC 3 - Four-eyes Control
- Các thao tác cấp cao (xóa tenant, đổi retention global, xuất dữ liệu hàng loạt) yêu cầu hai người phê duyệt.
- Hệ thống từ chối thực thi nếu cùng một người tạo và duyệt.

## 2.4. Feature: SLA Timer Supervision for Operations
### User Story 14.4
Là một **Support/Operations Admin**, tôi muốn bộ đếm SLA tự động tạm dừng/tiếp tục theo ca làm việc và trạng thái task, để đo thời gian xử lý thực tế chính xác.

### Acceptance Criteria (#AC)
#### AC 1 - Working-hours-aware Timer
- Khi ticket được tạo, hệ thống lấy SLA theo priority.
- Nếu ngoài giờ làm việc, timer chờ tới ca kế tiếp rồi mới chạy.

#### AC 2 - Pause/Resume Logic
- Timer tạm dừng khi ticket ở trạng thái chờ khách hàng/chờ phụ thuộc.
- Timer tiếp tục khi ticket quay lại trạng thái xử lý.

#### AC 3 - Breach & Closure
- Khi thời gian còn lại <= 0, hệ thống kích hoạt sự kiện SLA breach và cảnh báo đa kênh.
- Khi task hoàn tất, dừng timer và lưu "Actual Resolution Time" phục vụ báo cáo năng suất.

# 3. Business Rules & Technical Constraints
## 3.1. Phân loại Quản trị Hệ thống Chuyên biệt (Specialized Admin Roles)
Để đáp ứng tiêu chuẩn Enterprise, PronaFlow phân rã đội ngũ vận hành thành 18 vai trò admin chuyên trách nhằm kiểm soát rủi ro và tăng tính minh bạch.

- **Nhóm Vận hành Kỹ thuật:**
    - **Super Admin:** Quyền hạn cao nhất, chỉ sử dụng cho các tình huống khẩn cấp hoặc khôi phục hệ thống.
    - **System/SRE Admin:** Chịu trách nhiệm về hiệu năng và sức khỏe hệ thống, không truy cập dữ liệu người dùng.
    - **Release/Change Admin:** Kiểm soát quy trình phát hành và thay đổi mã nguồn.
    - **Database Admin (DBA):** Quản trị schema, migration, backup/restore và tối ưu truy vấn.
    - **Infra/Cloud Admin:** Quản lý tài nguyên hạ tầng, mạng, secrets và chính sách triển khai đa môi trường.

- **Nhóm An ninh & Tuân thủ:**
    - **Security/Trust Admin:** Xử lý gian lận, lạm dụng và rủi ro bảo mật.
    - **IAM Admin:** Quản lý danh tính, phân quyền và cấu hình MFA.
    - **Compliance/Legal Admin:** Đảm bảo hệ thống tuân thủ các quy định pháp lý.
    - **Privacy/DPO:** Bảo vệ quyền riêng tư dữ liệu theo thiết kế (Privacy-by-design).
    - **Key Management Admin:** Quản lý vòng đời khóa mã hóa, chứng thư số và chính sách rotation.

- **Nhóm Nghiệp vụ & Dịch vụ:**
    - **Finance Admin:** Quản lý doanh thu, gói dịch vụ và các giao dịch tài chính.
    - **AI/Automation Admin:** Quản lý hành vi của các mô hình AI và luồng tự động hóa.
    - **Data/Analytics Admin:** Đảm bảo chất lượng dữ liệu phục vụ phân tích mà không tiếp cận dữ liệu cá nhân thô.
    - **Support Admin:** Tiếp nhận và xử lý yêu cầu hỗ trợ (ticket) từ người dùng.
    - **Content/Knowledge Admin:** Quản lý tài liệu hướng dẫn và tri thức nội bộ liên kết Module 15.

- **Nhóm Kiểm toán & Điều phối:**
    - **Audit-only Admin:** Vai trò chỉ đọc, có quyền xem toàn bộ log hệ thống để phục vụ điều tra mà không thể thực hiện thao tác ghi.
    - **Incident Commander Admin:** Điều phối xử lý sự cố liên phòng ban, chịu trách nhiệm timeline và quyết định rollback.
    - **Risk & Continuity Admin:** Quản lý kế hoạch BCP/DR, diễn tập định kỳ và đánh giá rủi ro vận hành.

## 3.2. Quy tắc Tách biệt Nhiệm vụ (Separation of Duties)
- Không một vai trò đơn lẻ nào được phép vừa cấu hình chính sách, vừa tự phê duyệt, vừa thực thi hành động nhạy cảm.
- Quyền truy cập dữ liệu cá nhân thô bị giới hạn theo nguyên tắc "least privilege" và "need-to-know".

## 3.3. Quy tắc Truy vết Bắt buộc (Mandatory Traceability)
- 100% hành động admin phải có correlation ID để đối soát giữa application log, audit log và hạ tầng.
- Log quản trị phải được lưu tối thiểu theo chính sách retention của tier Enterprise hoặc theo yêu cầu pháp lý từng khu vực.

## 3.4. Ràng buộc Vận hành Đa môi trường
- Mọi thay đổi cấu hình production phải đi qua pipeline chuẩn, cấm "hotfix thủ công" trực tiếp trên máy chủ.
- Cấu hình quan trọng phải hỗ trợ drift detection để phát hiện sai lệch giữa thực tế và cấu hình khai báo.

# 4. Theoretical Basis (Cơ sở Lý luận)
## 4.1. Zero Trust Administration
Mọi yêu cầu quản trị được coi là chưa tin cậy mặc định và phải xác minh liên tục qua danh tính, ngữ cảnh thiết bị, thời điểm và mục đích truy cập.

## 4.2. Site Reliability Engineering (SRE)
Module áp dụng các nguyên lý SRE như SLI/SLO/Error Budget để cân bằng giữa tốc độ phát hành và độ ổn định hệ thống.

## 4.3. NIST RBAC + ABAC Hybrid
PronaFlow kết hợp RBAC (phân quyền theo vai trò) và ABAC (phân quyền theo thuộc tính ngữ cảnh) để kiểm soát truy cập linh hoạt hơn trong môi trường enterprise.

## 4.4. Operational Resilience Framework
Thiết kế quản trị dựa trên vòng lặp: Prevent -> Detect -> Respond -> Recover -> Learn, đảm bảo sau mỗi sự cố đều có cải tiến chính sách và runbook.