### **I. Triết lý Thiết kế và Vai trò của Admin**

Trước khi đi vào chi tiết từng trang, cần xác định rõ mục đích và vai trò của trang Admin trong hệ sinh thái PronaFlow.

1. **Vai trò (Persona):** Admin là một **Super User** (Quản trị viên hệ thống), có quyền truy cập và giám sát toàn bộ dữ liệu của ứng dụng. Vai trò này tương ứng với `users.role = 'admin'` trong bảng `users` của bạn.
    
2. **Mục đích chính:**
    - **Giám sát (Oversight):** Cung cấp một cái nhìn toàn cảnh về "sức khỏe" của hệ thống, từ số lượng người dùng, dự án đang hoạt động đến các hoạt động gần đây.
    - **Quản lý Dữ liệu (Data Management):** Cho phép thực hiện các hành động can thiệp ở cấp độ cao như quản lý tài khoản người dùng, xem xét các dự án, và xử lý các vấn đề dữ liệu.
    - **Bảo trì & An ninh (Maintenance & Security):** Cung cấp công cụ để quản lý các thiết lập hệ thống, theo dõi lỗi và đảm bảo an toàn cho dữ liệu người dùng.

### **II. Kiến trúc Giao diện Admin Panel**

Admin Panel sẽ là một khu vực riêng biệt, có thể truy cập qua một đường dẫn như `/admin`. Giao diện sẽ sử dụng lại component `sidebar.html` nhưng với một bộ các mục điều hướng khác, dành riêng cho quản trị viên.

**Cấu trúc Điều hướng (Sidebar Admin):**
- **Dashboard (Trang Tổng Quan):** Giao diện chính sau khi đăng nhập.
- **User Management (Quản lý Người dùng):** Danh sách và chi tiết tất cả người dùng.
- **Workspace & Project Management (Quản lý Không gian & Dự án):** Giám sát tất cả các workspace và project.
- **System Activity Log (Nhật ký Hoạt động):** Một bản ghi chi tiết của tất cả các hành động trong hệ thống.
- **System Settings (Cài đặt Hệ thống):** Cấu hình các tham số toàn cục (tùy chọn nâng cao).
### **III. Thiết kế Chi tiết cho Từng Trang**

#### **1. Trang Tổng Quan (Admin Dashboard)**

Trang này là trung tâm chỉ huy, cung cấp các số liệu thống kê quan trọng và truy cập nhanh đến các khu vực khác.

- **Lý do tồn tại:** Giúp Admin nhanh chóng nắm bắt tình hình hoạt động của toàn bộ nền tảng PronaFlow.
    
- **Các thành phần chính:**
    
    1. **Các thẻ Thống kê Nhanh (Stat Cards):**
        - **Tổng số Người dùng:** `SELECT COUNT(id) FROM users;`
        - **Dự án Đang hoạt động:** `SELECT COUNT(id) FROM projects WHERE is_deleted = FALSE AND is_archived = FALSE;`
        - **Tổng số Workspaces:** `SELECT COUNT(id) FROM workspaces;`
        - **Tổng số Tasks đã tạo:** `SELECT COUNT(id) FROM tasks;`
            
    2. **Biểu đồ "Người dùng mới theo thời gian":**
        - **Mục đích:** Trực quan hóa tốc độ tăng trưởng của nền tảng.
        - **Dữ liệu:** Dựa trên cột `created_at` trong bảng `users`, nhóm theo ngày/tuần/tháng.
            
    3. **Bảng "Hoạt động Gần đây" (Recent Activities):**
        - **Mục đích:** Hiển thị một feed trực tiếp các hành động quan trọng vừa diễn ra.
        - **Dữ liệu:** Truy vấn 10-15 bản ghi mới nhất từ bảng `activities`, kết hợp với bảng `users` để hiển thị tên người thực hiện.
        - **Ví dụ:** "Minh Trúc (`@minhtruc`) đã tạo dự án mới: _'Website Redesign 2025'_".
            
    4. **Bảng "Dự án mới tạo":**
        - **Mục đích:** Giúp admin theo dõi các dự án mới.
        - **Dữ liệu:** 5 dự án mới nhất từ bảng `projects`.
#### **2. Trang Quản lý Người dùng (User Management)**

Đây là trang CRUD (Tạo, Đọc, Cập nhật, Xóa) cho tất cả người dùng trong hệ thống.

- **Lý do tồn tại:** Cung cấp cho Admin toàn quyền quản lý tài khoản người dùng, hỗ trợ xử lý các vấn đề liên quan đến tài khoản.
    
- **Các thành phần chính:**
    
    1. **Thanh Tìm kiếm và Bộ lọc:**
        - Tìm kiếm theo `full_name` hoặc `email`.
        - Lọc theo `role` ('user', 'admin') và trạng thái (`is_deleted`).
        
    2. **Bảng Dữ liệu Người dùng (Data Table):**
        - **Các cột:** ID, Họ tên (`full_name`), Email, Vai trò (`role`), Ngày tham gia (`created_at`), Trạng thái (Hoạt động / Đã xóa mềm).
        - **Dữ liệu:** Lấy từ bảng `users`.
            
    3. **Các Hành động Quản trị (Actions):**
        - **Xem chi tiết:** Mở một modal/trang riêng hiển thị toàn bộ thông tin người dùng, danh sách các workspace họ sở hữu và các dự án họ tham gia (dữ liệu từ `workspaces.owner_id` và `project_members`).
        - **Chỉnh sửa vai trò:** Cho phép thay đổi `users.role` từ `user` thành `admin` và ngược lại.
        - **Xóa mềm (Soft Delete):** Cập nhật `is_deleted = TRUE` và `deleted_at`. Giao diện sẽ có nút "Khôi phục" cho các tài khoản đã bị xóa mềm.
        - **Xóa vĩnh viễn (Permanent Delete):** Xóa hoàn toàn người dùng (yêu cầu xác nhận).
#### **3. Trang Quản lý Workspaces & Projects**

Admin có thể xem và quản lý tất cả các không gian làm việc và dự án, bất kể ai là người sở hữu.

- **Lý do tồn tại:** Giám sát việc sử dụng tài nguyên, hỗ trợ người dùng khi có vấn đề với dự án (ví dụ: chuyển quyền sở hữu) và đảm bảo nội dung phù hợp.
    
- **Các thành phần chính:**
    
    1. **Giao diện dạng Bảng (Data Table):**
        
        - **Các cột:** Tên Dự án (`projects.name`), Tên Workspace (`workspaces.name`), Chủ sở hữu Workspace (`users.full_name` từ `workspaces.owner_id`), Số lượng thành viên (đếm từ `project_members`), Trạng thái (`projects.status`), Ngày tạo.
            
    2. **Hành động Quản trị:**
        
        - **Xem chi tiết Dự án (Read-only):** Mở một giao diện tương tự modal chi tiết dự án của người dùng, nhưng admin không thể sửa nội dung (task, description) mà chỉ có thể thực hiện các hành động quản trị.
        - **Thay đổi Chủ sở hữu Workspace:** Cập nhật `workspaces.owner_id`.
        - **Lưu trữ / Hủy lưu trữ:** Thay đổi cờ `projects.is_archived`.
        - **Di chuyển vào Thùng rác / Xóa vĩnh viễn:** Quản lý vòng đời của dự án.
#### **4. Trang Nhật ký Hoạt động Hệ thống (System Activity Log)**

Đây là phiên bản mở rộng của trang Notifications, cung cấp một cái nhìn sâu và chi tiết hơn về mọi hành động.

- **Lý do tồn tại:** Phục vụ cho mục đích kiểm toán (auditing), gỡ lỗi (debugging) và theo dõi các hành vi bất thường.
    
- **Các thành phần chính:**
    1. **Bộ lọc Nâng cao:**
        - Lọc theo `user_id` (Người thực hiện).
        - Lọc theo `action_type` (Loại hành động).
        - Lọc theo `target_type` và `target_id` (Đối tượng bị tác động).
        - Lọc theo khoảng thời gian.
            
    2. **Dòng thời gian Hoạt động (Activity Timeline):**
        - Hiển thị chi tiết từng bản ghi trong bảng `activities`.
        - **Ví dụ:** `[2025-10-12 14:30:00] User 'admin' (ID: 1) thực hiện 'change_status' trên Task (ID: 15) thành 'done'`.
        - Cung cấp các liên kết để xem nhanh người dùng, công việc, hoặc dự án liên quan.
### **IV. Cân nhắc về Kỹ thuật và UI/UX**

- **Tái sử dụng Design System:** Tất cả các thành phần như nút bấm (`.btn`), thẻ (`.card-style-box`), form (`.form-input`), modal (`.simple-modal`) sẽ kế thừa từ `style.css` và `base.css` để đảm bảo sự đồng nhất.
    
- **Phân trang (Pagination):** Các trang quản lý dạng bảng (User, Project) phải có cơ chế phân trang để xử lý lượng dữ liệu lớn một cách hiệu quả.
    
- **Bảo mật:** Luồng truy cập vào Admin Panel phải được bảo vệ nghiêm ngặt, chỉ cho phép những người dùng có `role = 'admin'`. Mọi hành động của Admin cũng nên được ghi lại trong `activities` với một `action_type` đặc biệt (ví dụ: `admin_action`).
    
- **Trực quan hóa Dữ liệu:** Trang Dashboard nên sử dụng các thư viện biểu đồ (như Chart.js, D3.js) để trình bày dữ liệu một cách sinh động và dễ hiểu.
    

Bản thiết kế này cung cấp một nền tảng vững chắc và có khả năng mở rộng cho khu vực quản trị của PronaFlow. Chúc bạn sẽ xây dựng thành công tính năng quan trọng này!