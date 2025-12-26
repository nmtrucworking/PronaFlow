# 1. Core Technology Stack 
## 1.1. Nền tảng phát triển: React.js (v18+)
- ***Vai trò***: Thư viện JavaScript cốt lỗi để xây dựng giao diện người dùng
- Lý do lựa chọn:
	- Virtual DOM: Tối ưu hóa hiệu năng render, đặc biệt quan trọng đối với các giao diện phức tạp, nhiều tương tác như Kanban Board.
	- Ecosystem: Hệ sinh thái phong phú, hỗ trợ mạnh mẽ tích hợp các thư viện kéo thả và biểu đồ dữ liệu.
	- React Hooks: Sử dụng mô hình Functional Programming giúp mã nguồn gọn gạng, dễ kiểm thử và tái sử dụng Logic.

## 1.2. Ngôn ngữ lập trình: TypeScript
- ***Vai trò***: siêu tập hợp (Superset) của JavaScript, bổ sung tính năng định kiểu tĩnh (Static Typing).
- Lý do lựa chọn:
	- Type Safety: Giúp phát hiện lỗi ngay trong quá trình biên dịch (Compile-time), giảm thiểu các lỗi Runtime thường gặp trong JavaScrip thuần.
	- Self-documenting Code: Các Interface và Type Definition đóng vai trò như tài liệu sống, giúp các thành viên trong nhóm (hoặc chính tác giả khi xem lại) hiểu rõ cấu trúc dữ liệu trả về từu API AI/Backend.
## 1.3. Công cụ Build & Đóng gói: Vite
- ***Vai trò***: Môi trường phát triển và trình biên dịch (Bundler).
- Lý do lựa chọn: Thay thế Webpack nhờ tốc độ khởi động server cực nhanh (Sử dụng Native ES Modules) và khả năng Build tối ưu, giúp tăng năng suất phát triển.

# 2. Các Thư viện Quản trị & Tương tác.
Để giải quyết các bài toán nghiệp vụ đặc thù của PronaFlow, các thư viện sau được tích hợp:
## 2.1. Quản lý Trạng thái Toàn cục (Global State Management): Redux Toolkit ( #RTK)
- **Vấn đề giải quyết**: Trong ứng dụng quản lý dự án, các loại dữ liệu đặc thù như User, ProjectList, Active Task cần được truy cập từ nhiều Component khác nhau. Việc truyền props (Prop drilling) qua quá nhiều tầng sẽ gây khó bảo trì.
- Giải pháp: #RTK cung cấp một "kho chứa sự thật duy nhất" (Single Source of Truth):
	- RTK Query: Một module mạng mẽ đi kèm để quản lý việc gọi API, Caching dữ liệu phía Client, và tự động đồng bộ hóa lại (Re-fetching) khi dữ liệu thay đổi, giảm tải gánh nặng xử lý thủ công.
## 2.2. Hệ thống Giao diện (UI Framework): Material UI (MUI v5)
***Lý do lựa chọn***:
	- Tuân thủ nguyên lý Meterial Design của Google, mang lại trải nghiệm người dùng chuẩn mực và chuyên nghiệp.
	- Cung cấp hệ thống Grid System mạnh mẽ để thiết kế Responseive (thích ứng đa thiết bị).
	- Hỗ trợ Theming (Dark/Light mode) tích hợp sẵn.
## 2.3. Tương tác Kéo thả (Drag & Drop): @dnd-kit
- ***Áp dụng cho***: Phân hệ `4.4. (Kanban Project Management)` 
- Lý do lựa chọn:
	- Hiện đại và nhẹ.
	- Hỗ trợ tốt các sự kiện cảm ứng trên thiết bị di động (Touch Support).
	- Kiến trúc Modular, cho phép tùy biến thuật toán phát hiện va chạm (Collision Detection Algorithms) để xử lý logic kéo thả phức tạp giữa các cột.
## 2.4. Xử lý Biểu mẫu & Kiểm định (Form & Validation): React Hook Form + Zod:
- ***Áp dụng cho***: Các form đăng ký, tạo dự án, chỉnh sử task.
- Lý do lựa chọn:
	- React Hook Form: Tối ưu hiệu năng bằng các giảm số lần re-render không cần thiết người dùng gõ phím.
	- Zod: Thư viện định nghĩa Schema Validation. Giúp kiểm tra dữ liệu đầu vào (Input Validation) chặt chẽ trước khi gửi xuống Backend, đảm bảo tính toàn vẹn dữ liệu.
## 2.5. Trực quan hóa Dữ liệu (Data Visulization): RRecharts
- ***Áp dụng cho***: Phân hệ `4.10 (Analytics)` 
- Lý do lựa chọn:
	- Được xây dựng chuẩn cho React (Native React components).
	- Dễ tích hợp (Composable) để vẽ các biểu đồ quan trọng trong Data Science như Burn-down chart, Velocity histogram, Pie Chart phân bổ nguồn lực.
## 2.6. Giao tiếp Thời gian thực (Real-time): Socket.io - client.
- Áp dụng cho: Phân hệ `4.6. (collaboration)` và `4.7. (Notifications)`
- Cơ chế: Thiết lập kết nối 2 chiều (Duplex connection) với Backend, cho phép server chủ động đẩy dữ liệu (Push) xuống client ngay khi có sự kiện mà không cần Client phải reload lại trang.