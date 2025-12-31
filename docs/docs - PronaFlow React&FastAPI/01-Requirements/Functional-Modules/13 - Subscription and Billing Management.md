**Project**: PronaFlow
**Version**: 1.0
**State**: 
***Last updated:** Dec 31, 2025*

---
# 1. Business Overview.
Trong nền kinh tế đăngkys (Subscription Economy), khả năng quản lý tài chính là yếu tố sống còn của một nền tảng #SaaS. Module **Subscription & Billing Management** được thiết kế để trở thành **Financial Gateway*** của hệ thống PronaFlow.
Phân hệ này hoạt động dựa trên cơ chế Dual-Layer Billing.
1. Inbound Billing: Quản lý vòng đời thuê bao của người dùng (Trial -> Active -> Churn), tích hợp cổng thanh toán để thu phí dịch vụ hàng tháng/năm.
2. Outbound Billing: Tận dụng dữ liệu từ Module 11 (Time Tracking), hệ thống cho phép người dùng chuyển đổi các bảng chấm công (Timesheets) thành hóa đơn chuyên nghiệp (Invoices) gửi cho khách hàng của họ, khép kín quy trình "Work-to-Cash".
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: SaaS Subscription Lifecycle
### User Story 13.1
Là một Owner của Workspace, Tôi muốn nâng cấp từ gòi Free lên gói Pro để mở khóa tính năng "Unlimited Projects" và thanh toán tự động qua thẻ tín dụng, Để không bị gián đoạn quy trình làm việc.
### Acceptance Criteria ( #AC)
#### AC 1 - Plan Tiering Enforcement
- **Logic:** Hệ thống định nghĩa 3 tầng dịch vụ (Tiers):
    - **Free:** Tối đa 3 dự án, 5 thành viên.
    - **Pro:** Không giới hạn dự án, 50GB lưu trữ.
    - **Enterprise:** SSO, Audit Logs, Dedicated Support.
- **Validation:** Khi người dùng gói Free cố gắng tạo dự án thứ 4, hệ thống chặn lại và hiển thị "Upgrade Prompt" (Lời nhắc nâng cấp).
>[!NOTE] Ghi chú: Cần bổ sung và hoàn thiện Enforcement 

#### AC 2 - Proration Logic (Tính toán tỷ lệ)
- **Scenario:** Người dùng nâng cấp từ gói tháng ($10) lên gói năm ($100) vào giữa chu kỳ.
- **Calculation:** Hệ thống tự động tính toán số tiền còn dư của gói cũ (Unused time) và trừ vào khoản thanh toán mới.
- **Result:** Invoice hiển thị rõ dòng "Credit Applied".
## 2.2. Feature: Invoice Generation from Timesheets (Tạo hóa đơn từ Timesheet)
### User Story 13.2
Là một Freelancer, Tôi muốn chọn các đầu việc đã hoàn thành (Billable Tasks) trong tháng và tạo một hóa đơn PDF gửi cho khách hàng, Để đảm bảo tính minh bạch và được thanh toán đúng hạn.
### Acceptance Criteria ( #AC)
#### AC 1 - Data Aggregation (Tổng hợp dữ liệu)
- **Input:** Dữ liệu từ **Module 11** (Time Entries đã được duyệt - Approved Status).
- **Process:** Gom nhóm các mục theo Project hoặc theo Task Category.
- **Rate Application:** Áp dụng `Hourly Rate` (được cấu hình trong Project Settings) vào tổng số giờ để tính `Amount`.
#### AC 2 - Invoice Customization
- Cho phép người dùng tùy chỉnh mẫu hóa đơn: Logo doanh nghiệp, Mã số thuế, Điều khoản thanh toán (Net 30, Due on Receipt).
- Hỗ trợ đa tiền tệ (Multi-currency): Tự động chuyển đổi tỷ giá nếu Project được set currency khác với Base currency của hệ thống.
## 2.3. Feature: Payment Gateway Integration (Tích hợp Cổng thanh toán)
### User Story 13.3
Là một Admin hệ thống, Tôi muốn tích hợp Stripe và PayPal để xử lý thanh toán quốc tế an toàn, đồng thời hỗ trợ Webhook để cập nhật trạng thái hóa đơn tự động.
### Acceptance Criteria ( #AC)
#### AC 1 - PCI Compliance (Tuân thủ PCI DSS)
- **Constraint:** Hệ thống PronaFlow **KHÔNG** lưu trữ thông tin thẻ tín dụng (PAN, CVV) trong Database nội bộ.
- **Solution:** Sử dụng Stripe Elements/Tokenization để gửi trực tiếp thông tin thẻ sang Payment Provider và chỉ lưu lại `Customer_ID` và `Last4` digits.
#### AC 2 - Webhook Handling (Xử lý sự kiện bất đồng bộ)
- Khi thanh toán thành công (`payment_intent.succeeded`), Webhook từ Stripe gọi về API của PronaFlow.
- Hệ thống cập nhật trạng thái Invoice từ `Pending` -> `Paid` và gửi email xác nhận cho người dùng.
- **Idempotency:** Đảm bảo xử lý Webhook an toàn, không cộng tiền 2 lần nếu Stripe gửi trùng sự kiện.
## 2.4. Feature: Financial Dashboard & Revenue Recognition
### User Story 13.4
Là một Chủ doanh nghiệp, Tôi muốn xem báo cáo doanh thu định kỳ (MRR) và các hóa đơn quá hạn, Để quản lý dòng tiền hiệu quả.
### Acceptance Criteria ( #AC)
#### AC 1 - Metrics Visualization
- Hiển thị các chỉ số SaaS chuẩn:
    - **MRR (Monthly Recurring Revenue):** Doanh thu định kỳ hàng tháng.
    - **Churn Rate:** Tỷ lệ rời bỏ.
    - **ARPU (Average Revenue Per User):** Doanh thu trung bình trên mỗi user.
#### AC 2 - Aging Report (Báo cáo nợ tuổi)
- Liệt kê các hóa đơn chưa thanh toán (Unpaid Invoices) theo nhóm tuổi nợ: 0-30 ngày, 30-60 ngày, >90 ngày.
# 3. Business Rules & Technical Constraints
## 3.1. Quy tắc Dunning (Quản lý thu nợ tự động)
- **Retry Logic:** Nếu thanh toán gia hạn thất bại (do hết hạn thẻ, không đủ số dư), hệ thống tự động thử lại (Retry) theo lịch trình: Ngày 1, Ngày 3, Ngày 7.
- **Grace Period:** Cho phép người dùng tiếp tục sử dụng dịch vụ trong 7 ngày ân hạn (Grace Period) trước khi khóa quyền truy cập (Downgrade to Read-only).
## 3.2. Quy tắc Bất biến Tài chính (Financial Immutability)
- **Immutable Invoices:** Một khi hóa đơn đã được gửi đi (Sent) hoặc đã thanh toán (Paid), nội dung của nó **KHÔNG** được phép chỉnh sửa.
- Nếu có sai sót, người dùng phải thực hiện quy trình: Hủy hóa đơn cũ (Void) -> Tạo hóa đơn mới (New Invoice) hoặc tạo Credit Note (Giấy báo có).
## 3.3. Quy tắc Thuế (Tax Compliance)
- Hệ thống phải hỗ trợ tính thuế tự động dựa trên địa chỉ của người mua (Buyer's Location) để tuân thủ luật VAT (Châu Âu) hoặc Sales Tax (Mỹ).
- Tích hợp các service tính thuế (như Stripe Tax hoặc Avalara) nếu cần thiết.
# 4. Theoretical Basis (Cơ sở Lý luận)

## 4.1. Nguyên lý Kế toán Kép (Double-Entry Bookkeeping)
Mặc dù PronaFlow không phải là phần mềm kế toán chuyên sâu (như QuickBooks), module này vẫn áp dụng tư duy kế toán kép ở tầng dữ liệu (Ledger) để đảm bảo tính toàn vẹn:
- Mỗi giao dịch ghi nhận doanh thu phải có một bút toán đối ứng vào tài khoản phải thu (Accounts Receivable) hoặc tiền mặt (Cash).
- Công thức: $Assets = Liabilities + Equity$.
## 4.2. Mô hình Định giá SaaS (SaaS Pricing Models)
PronaFlow hỗ trợ mô hình **Per-User Pricing** (Tính tiền theo đầu người) kết hợp **Tiered Pricing** (Phân tầng).
- Đây là mô hình phổ biến nhất trong B2B SaaS vì tính dễ hiểu và khả năng mở rộng doanh thu tuyến tính theo sự phát triển của khách hàng (Scale with usage).
## 4.3. Bảo mật Giao dịch (Transaction Security & Idempotency)
Để ngăn chặn lỗi "Double Charge" (Trừ tiền 2 lần) trong môi trường mạng không ổn định, Module áp dụng **Idempotency Keys**:
- Mỗi request thanh toán gửi đi đều kèm theo một Key duy nhất (UUID).
- Nếu Client gửi lại request (do timeout), Server kiểm tra Key này. Nếu đã xử lý, Server trả về kết quả cũ mà không thực hiện trừ tiền lần 2.