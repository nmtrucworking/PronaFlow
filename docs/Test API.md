Tuyệt vời! Đây là một bước rất quan trọng để đảm bảo mọi thứ bạn đã xây dựng đều hoạt động chính xác trước khi chúng ta đi tiếp.

Dưới đây là một kịch bản kiểm thử (test plan) chi tiết bằng Insomnia cho tất cả các API bạn đã tạo ra cho đến thời điểm hiện tại (`Auth` và `Workspaces`).

---

### **Chuẩn bị trước khi Test**

1.  **Khởi động Server:** Chắc chắn rằng server NestJS của bạn đang chạy với lệnh `npm run start:dev`.
2.  **Mở Insomnia:** Chuẩn bị sẵn sàng công cụ.
3.  **(Khuyến khích)** **Tổ chức Insomnia:**
    *   Tạo một Collection mới tên là "PronaFlow".
    *   Bên trong, tạo 2 thư mục: `Authentication` và `Workspaces`.
4.  **(Khuyến khích)** **Xóa Database cũ:** Để đảm bảo bạn đang test trên dữ liệu sạch, hãy xóa file `prisma/dev.db`. Sau đó chạy lại migration để tạo file mới:
    ```bash
    npx prisma migrate dev
    ```

---

### **Kịch bản 1: Test Module Authentication**

Mục tiêu: Kiểm tra chức năng đăng ký, đăng nhập và xử lý lỗi.

#### **Test Case 1.1: Đăng ký thành công**

*   **Request:**
    *   **Thư mục:** `Authentication`
    *   **Tên:** `[POST] Register - Success`
    *   **Method:** `POST`
    *   **URL:** `http://localhost:3000/auth/register`
    *   **Body (JSON):**
        ```json
        {
          "email": "testuser1@pronaflow.com",
          "password": "password123",
          "fullName": "Test User One"
        }
        ```
*   **Kết quả mong đợi:**
    *   **Status:** `201 Created`
    *   **Response Body:** Một object JSON chứa thông tin `id`, `email`, `fullName` của người dùng mới (không có `password`).
    *   **Kiểm tra DB (nâng cao):** Bảng `User` có một dòng mới. Bảng `Workspace` cũng có một dòng mới tên là `"Test User One's Workspace"`.

#### **Test Case 1.2: Đăng ký với email đã tồn tại**

*   **Request:**
    *   Gửi lại chính xác request ở **Test Case 1.1**.
*   **Kết quả mong đợi:**
    *   **Status:** `409 Conflict`
    *   **Response Body:** Một object JSON chứa thông báo lỗi, ví dụ: `{"message": "Email đã được sử dụng", ...}`.

#### **Test Case 1.3: Đăng ký với dữ liệu không hợp lệ**

*   **Request:**
    *   **Thư mục:** `Authentication`
    *   **Tên:** `[POST] Register - Invalid Data`
    *   **Method:** `POST`
    *   **URL:** `http://localhost:3000/auth/register`
    *   **Body (JSON):** (Gửi mật khẩu quá ngắn)
        ```json
        {
          "email": "testuser2@pronaflow.com",
          "password": "123",
          "fullName": "Test User Two"
        }
        ```
*   **Kết quả mong đợi:**
    *   **Status:** `400 Bad Request`
    *   **Response Body:** Một object JSON chứa thông báo lỗi validation, ví dụ: `{"message": ["Mật khẩu phải có ít nhất 6 ký tự"], ...}`.

#### **Test Case 1.4: Đăng nhập thành công**

*   **Request:**
    *   **Thư mục:** `Authentication`
    *   **Tên:** `[POST] Login - Success`
    *   **Method:** `POST`
    *   **URL:** `http://localhost:3000/auth/login`
    *   **Body (JSON):** (Sử dụng tài khoản đã tạo thành công ở **Test Case 1.1**)
        ```json
        {
          "email": "testuser1@pronaflow.com",
          "password": "password123"
        }
        ```
*   **Kết quả mong đợi:**
    *   **Status:** `200 OK`
    *   **Response Body:** Một object JSON chứa `access_token`. Ví dụ: `{"access_token": "eyJhbGciOiJI..."}`.
    *   **Hành động:** **Copy chuỗi `access_token` này.** Bạn sẽ cần nó cho các bước tiếp theo.

#### **Test Case 1.5: Đăng nhập sai mật khẩu**

*   **Request:**
    *   Gửi lại request ở **Test Case 1.4** nhưng với `password` sai, ví dụ: `"wrongpassword"`.
*   **Kết quả mong đợi:**
    *   **Status:** `401 Unauthorized`
    *   **Response Body:** Chứa thông báo lỗi, ví dụ: `{"message": "Email hoặc mật khẩu không hợp lệ", ...}`.

---

### **Kịch bản 2: Test Module Workspaces**

Mục tiêu: Kiểm tra các API liên quan đến Workspace và đảm bảo chúng được bảo vệ.

#### **Test Case 2.1: Lấy danh sách Workspaces không có Token**

*   **Request:**
    *   **Thư mục:** `Workspaces`
    *   **Tên:** `[GET] Workspaces - Unauthorized`
    *   **Method:** `GET`
    *   **URL:** `http://localhost:3000/workspaces`
    *   **Tab `Auth`:** Chọn `No Auth`.
*   **Kết quả mong đợi:**
    *   **Status:** `401 Unauthorized`. Điều này chứng tỏ `JwtAuthGuard` đang hoạt động!

#### **Test Case 2.2: Lấy danh sách Workspaces thành công**
*   **Request:**
    *   **Thư mục:** `Workspaces`
    *   **Tên:** `[GET] Workspaces - Success`
    *   **Method:** `GET`
    *   **URL:** `http://localhost:3000/workspaces`
    *   **Tab `Auth`:**
        *   Chọn `Bearer Token`.
        *   Dán chuỗi `access_token` bạn đã copy ở **Test Case 1.4** vào ô `TOKEN`.
*   **Kết quả mong đợi:**
    *   **Status:** `200 OK`
    *   **Response Body:** Một mảng (array) JSON. Ban đầu, nó sẽ chứa **1 object** là workspace mặc định được tạo khi đăng ký.
        ```json
        [
          {
            "id": "...",
            "name": "Test User One's Workspace",
            "description": null,
            "createdAt": "...",
            "updatedAt": "...",
            "ownerId": "..."
          }
        ]
        ```

#### **Test Case 2.3: Tạo Workspace mới thành công**

*   **Request:**
    *   **Thư mục:** `Workspaces`
    *   **Tên:** `[POST] Create Workspace - Success`
    *   **Method:** `POST`
    *   **URL:** `http://localhost:3000/workspaces`
    *   **Tab `Auth`:** Sử dụng Bearer Token như trên.
    *   **Body (JSON):**
        ```json
        {
          "name": "Dự án Freelance"
        }
        ```
*   **Kết quả mong đợi:**
    *   **Status:** `201 Created`
    *   **Response Body:** Một object JSON chứa thông tin của workspace vừa tạo.

#### **Test Case 2.4: Kiểm tra lại danh sách Workspaces**

*   **Request:**
    *   Gửi lại request ở **Test Case 2.2**.
*   **Kết quả mong đợi:**
    *   **Status:** `200 OK`
    *   **Response Body:** Bây giờ, mảng JSON trả về phải chứa **2 objects**: workspace mặc định và "Dự án Freelance".

Bằng cách thực hiện tuần tự các bài test trên, bạn có thể tự tin rằng các chức năng nền tảng của ứng dụng đang hoạt động một cách chính xác, ổn định và an toàn.