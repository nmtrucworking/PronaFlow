> Module định danh và kiểm soát quyền truy cập

# 1. Module Overview
Phân hệ IAM đóng vai trò là "Cổng an ninh" của toàn bộ hệ thống PronaFlow. Mục tiêu cốt lỗic ủa phân hệ này là đảm bảo nguyên tắc #AAA 
- Authentication (Xác thực): Xác minh danh tính người dùng.
- Authorization (Phân quyền): Kiểm soát quyền truy cập tài nguyên.
- Accounting/Auditing (Kiểm toán): Ghi nhận lịch sử truy cập.
Trong kiến trúc PronaFlow, IAM không chỉ đơn thuần là trang đăng nhập, mà là một lớp Middleware bảo mật bao bọc toàn bộ các API Endpoints của `backend-core` và `ai-serving`.

# 2. Theoretical Basic and Standards
## 2.1. Giao thức Xác thực: Stateless Authentication với #JWT
- Hệ thống sử dụng JSON Web Token (JWT) làm phương thức xác thực chính.
- Lý do lựa chọn:
	- Khả năng mở rộng.
	- Tính tương thức.
## 2.2. Chiến lược Mã hóa Mật kkkhẩu
- Thuật toán: Bcrypt.
- Cơ chế: Mật khẩu người dùng không bao giờ được lưu dưới dạng văn bản thuần (Clear text hay Plain Text). Hệ thống sẽ thực hiện hasing kết hợp với Salt để chống lại các cuộc tấn công Rainbow Table.
- Tham số: `work factor` (độ khó) được cấu hình sao cho thời gian băm tối thiểu là 300ms/lần để ngăn chặn Brute-force.

## 2.3. Mô hình Phân quyền: #RBAC (Role-Based Access Control)
- Quyền hạn không được gán trực tiếp cho người dùng mà được gán cho Vai trò (Role). người dùng được gán một hoặc nhiều vai trò.
- Phân cấp: Hệ thống áp dụng #RBAC đa tầng (Hierarchical RBAC).
	- System level: Nhóm Quản trị viên hệ thống (Super Admins) và Người dùng thường (Users).
	- Workspace Level: Chủ sở hữu (Owner) > Quản trị viên (Admin) > Thành viên (Member).
	- Project Level: Quản lý dự án (PM) > Thành viên (Editor) > Người xem (Viewer)

# 3. Functional Requirements
## 3.1. Identity Lifecycle
### 3.1.1. User Reggistration
- **Input**: Email, Username, Mật khẩu.
- Logic xử lý: 
	1. Validate định dạng Email, độ mạnh mật khẩu (tối thiểu 8 ký tự, bao gồm chữ hoa, thường, số, ký tư đặc biệt) và Username (không bao gồm khoảng trắng).
	2. Kiểm tra tính duy nhất của Email và Username trong hệ thống.
	3. Gửi email Xác thực (Email Verification) chứa Link kích hoạt để đảm bảo email tồn tại và thuộc về người đăng ký (ngăn chặn spam user).
- Output: Tài khoản ở trạng thái Pending -> Active sau khi xác thực.
### 3.1.2. Secure Login
- Flow: Client gửi Credentials -> Server xác thực -> Server trả về cặp token: Access Token (thời hạn ngắn: 20p) và Refresh Token (thời hạn dài: 30 ngày).
- Security Measure:
	- Áp dụng Rate Limiiting (giới hạn số lần thử) để chống Brute-force: Tài khảon sẽ khóa tạm thười sau 5 lần login sai.
	- Ghi nhận IP và User-Agent để phát hiện đăng nhập bất thường.
### 3.1.3. Cơ chế Refresh Token
- Mục đích: Duy trì trải nghiệm liền mạch cho người dùng mà khong ảnh hưởng đến bảo mật.
- Hoạt động: Khi Access Token hết hạn, Client tự động sử dụng Refresh Token để xin cấp lại Access Token mới mà không cần người dùng đăng nhập lại.
- Thu hồi: Khi người dùng đăng xuấy hoặc đổi mật khẩu, Refresh Token tương ứng sẽ bị vô hiệu hóa trong Database/Redis.
### 3.1.4. Quên mật khẩu (Password Recovery).
- Quy trình:
	1. Người dùng gửi yêu cầu reset qua email.
	2. Hệ thống tạo một Reset Token (thời hạn 15 phút, dùng 1 lần).
	3. Gửi link chứa token qua email.
	4. Người đùng nhập mật khẩu mới. Hệ thống thực hiện đổi mật khẩu và vô hiệu hóa tất cả các phiên đăng nhập hiện tại (Force Logout)..
## 3.2. Access Control
### 3.2.1. Authorization Middleware..
- Vị trí: Đặt trước các Controller xử lý nghiệp vụ.
- Chức năng: Chặn bắt mọi request, giải mã JWT để lấy `User ID` và `Scope`.
- Logic kiểm tra:
	- Context-aware: Kiểm tra xem User có quyền thực hiện hành động X trên tài nguyên Y hay không?
### 3.2.2. Permission Matrix MManagement
- Chức năng: Cho phép Super Admin (Quản lý người dùng) hoặc Workspace Owner tùy chỉnh quyền hạn.
- Độ min: Phân quyền chi tiết đến tằng hành động (CRUD)

## 3.3. Advanced Security (Mở rộng, PronaFlow v2)
### 3.3.1. Xác thực hai yếu tố - #2FA / #MMFA
- Phương thức: #TOTP (Time-based One-Time Password) tuân thủ chuẩn RFC 6238
- Tích hợp: Tương thích với các ứng dụng GG Authenticator, Microsoft Authenticator.
- Quy trình: Yêu cầu mã số 6 số sau khi đăng nhập thành công.
### 3.3.2. Audit Loggin

- Ghi nhận: Lưu trữ mọi sự kiện liên quan đến an ninh (Trạng thái Đăng nhập, thay đổi mật khẩu, thay đổi quyền hạn, cập nhật Username/Email).
- Dữ liệu: Timestamp, Actor (Người thực hiện), Action, IP Address, Resource Affected.

# 4. Non-functional Requirements.
1. Hiệu năng: Thời gian phản hồi cho các request xác thực phải < 100ms.
2. Bảo mật đường truyền: Bắt buộc sử dụng HTTPS/TLS 1.2+ cchôtafn bộ giao tiếp. Token không bao giờ được gửi qua kết nối HTTP thường.
3. Bảo mật lưu trữ Client: 
	- Trên Web: Lưu `Refresh Token` trong HttpOnly Cookie (Chống XSS) và `Access Token` trong bộ nhớ ứng dụng (Memory).
	- Trên Desktop (Electron): Sử dụng Keystar (System Keychain) để lưu trữ token an toàn.
# 5. Thiết kế Schema CSDL (Dự kiến)
Các bảng cchisnh phục vụ Module:
- user: 
- roles
- permissions
- role_permissions: Bảng trung gian gán quyền cho vai trò.
- user_workspace_roles: Gán vai trò của User trong một Workspae cụ thể