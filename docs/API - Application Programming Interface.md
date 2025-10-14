>#API - Application Programming Interface là giao diện lập trình ứng dụng, tức là một tập hợp các quy tắc/chuẩn cho phép các ứng dụng hoặc thành phần khác nhau **giao tiếp** và **trao đổi dữ liệu** với nhau.

## Ví dụ về API:
- Frontend (React, Angular, Vue, HTML/CSS/JS thuần) muốn lấy danh sách người dùng thì sẽ gọi API từ Backend (NestJS, Django, Node.js, Spring Boot, ...)
- Backend cung cấp các #Endpoint (đường dẫn như `api/users`, `api/products/:id`) và frontend gửi request đến để lấy hoặc gửi dữ liệu.
# API trong Backend và FrontEnd
## API trong Backemd
Backend có trách nhiệm xây dựng và quản lý API. Một khía cạnh chính:
1. **Định nghĩa API**: Xác định các endpoint, phương thức HTTP ( #GET, #POST, #PUT, #DELETE).
2. **Xử lý logic**: Kiểm tra dữ liệu, thao tác với database, xử lý nghiệp vụ.
3. **Bảo mật**:
	- Xác thực (Authentication): Ai được phép gọi API.
	- Phân quyền (Authorization): Người dùng có quyền gì (admin, user thường)/
	- Chống tấn công: SQL Injection, XSS, CSRF, Rating limiting, ...
4. **Hiệu suất:** 
	- Tối ưu query db
	- Caching (Redis, memory cache)
	- Giới hạn request (throttle/ratelimit).
5. **Tài liệu hóa**: Swagger, Postman collection để frontend dễ tích hợp. [[using Insomnia for Test Register-tool]]
## API trong Frontend
Frontend thường tiêu tụ (consume) API:
1. Gọi API: Sử dụng `fetch`, `axios` hoặc `GraphQL client` để gửi request đến backend.
2. Quản lý trạng thái dữ liệu:
	- Loading (đang chờ dữ liệu).
	- Success (nhận dữ liệu).
	- Error (API lỗi hoặc không phản hồi).
3. Xử lý hiển thị: Duẽ liệu từ API được render ra UI.
4. Quản lý token/bảo mật:
	- Lưu token (JWT, OAuth).
	- Gửi kèm Authorization Header khi gọi API.
# Các vấn đề lên quan API giữa Backend và Frontend
Những vấn đề phổ biến
1. Không đồng bộ: Backend thay đổi API nhưng Frontend chưa cập nhật -> error
2. Validation dữ liệu: Backend không kiểm soát dữ liệu -> dữ liệu bẩn, hỏng database.
3. #CORS (Cross-Origin Resource Sharing). [[Match pronaflow-web and pronaflow-api]]
	- Nếu frontend và backend chạy trên domain khác nhau (VD: `frontend.com` gọi `api.com`), cần cấu hình #CORS .
4. Phiên bản API (API Versioning):
	- Khi backend thay đổi logic, cần quản lý version (`/api/v1/...`, `/api/v2/...`) để tránh ảnh hưởng frontend cũ.
5. Bảo mật:
	- Truyền dữ liệu nhạy cảm (mật khẩu, token) qua HTTP không mã hóa -> rò rỉ thông tin.
	- Token hết hạn -> frontend cần xử lý refresh token.
6. Hiệu suất:
	- Backend trả dữ liệu qua nặng -> frontend load chậm.
	- API không phân trang (pagination) -> dữ liệu quá nhiều.
# Các loại API thường dùng.
- #REST-API: Giao tiếp qua HTTP, JSON là phổ biến nhất.
- #GraphQL : Cho phép frontend lấy dữ liệu cần, không thừa/thiếu.
- #WebSocket API: Hỗ trợ giao tiếp 2 chiều theo thời gian thực (chat, thông báo).
- #gRPC: Hiệu quả cao, dùng nhiều trong microservices.