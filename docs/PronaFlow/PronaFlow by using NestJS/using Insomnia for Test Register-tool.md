Chắc chắn rồi! Hãy cùng tìm hiểu về các công cụ này. Đây là một phần cực kỳ quan trọng trong quá trình phát triển backend.

### **1. Tại sao chúng ta cần công cụ Test API?**

Backend của bạn, về cơ bản, là một tập hợp các **API Endpoints** (các địa chỉ URL như `/auth/register`). Nó không có giao diện đồ họa (GUI) như một trang web thông thường.

*   **Câu hỏi:** Làm thế nào để bạn "nói chuyện" với backend, gửi dữ liệu cho nó, và xem nó trả về cái gì, khi mà chưa có giao diện frontend (trang đăng ký, đăng nhập)?
*   **Trả lời:** Chúng ta sử dụng một công cụ chuyên dụng để "giả lập" vai trò của frontend. Công cụ này cho phép bạn tạo và gửi các yêu cầu HTTP (giống như trình duyệt vẫn làm) một cách thủ công và xem chi tiết kết quả trả về.

**Postman** và **Insomnia** là hai công cụ phổ biến và mạnh mẽ nhất cho việc này. Hãy coi chúng là "cái điều khiển từ xa" vạn năng cho backend của bạn.

### **2. Postman vs. Insomnia: Nên chọn cái nào?**

Cả hai đều rất tốt.

*   **Postman:**
    *   **Điểm mạnh:** Cực kỳ phổ biến, gần như là tiêu chuẩn trong ngành. Tính năng rất phong phú, hỗ trợ mọi thứ từ test đơn giản đến tự động hóa phức tạp, tạo tài liệu, collaboration...
    *   **Điểm yếu:** Giao diện có thể hơi "ngợp" cho người mới bắt đầu vì có quá nhiều tính năng.

*   **Insomnia:**
    *   **Điểm mạnh:** Giao diện **sạch sẽ, tối giản và hiện đại hơn**. Rất dễ để bắt đầu và tập trung vào việc gửi request. Tốc độ cũng được đánh giá là nhanh hơn một chút.
    *   **Điểm yếu:** Ít tính năng nâng cao hơn Postman (nhưng vẫn quá đủ cho hầu hết các dự án).

**Lời khuyên cho bạn:**
> **Hãy bắt đầu với Insomnia.** Giao diện thân thiện của nó sẽ giúp bạn làm quen nhanh hơn mà không bị rối.

### **3. Hướng dẫn sử dụng Insomnia để Test chức năng Đăng ký**

Hãy thực hành ngay với chức năng `register` mà bạn vừa tạo.

#### **Bước 1: Cài đặt Insomnia**

1.  Truy cập trang chủ của Insomnia: [https://insomnia.rest/](https://insomnia.rest/)
2.  Tải về và cài đặt phiên bản phù hợp với hệ điều hành của bạn (Windows, macOS, Linux).

#### **Bước 2: Tạo Request đầu tiên**

1.  Mở Insomnia lên. Bạn sẽ thấy một giao diện trực quan.
2.  Ở cột bên trái, nhấn vào nút `+` và chọn **"New Request"**.
3.  Một cửa sổ nhỏ sẽ hiện ra:
    *   **Name:** Đặt tên cho request này, ví dụ: `User Register`.
    *   **Method:** Chọn `POST` từ danh sách dropdown.
    *   **Create:** Nhấn nút Create.

#### **Bước 3: Cấu hình và Gửi Request**

Bây giờ bạn sẽ thấy giao diện chính để cấu hình request:

1.  **Nhập URL:** Ngay bên cạnh chữ `POST`, có một ô để nhập URL. Hãy gõ vào đó:
    ```
    http://localhost:3000/auth/register
    ```

2.  **Thêm Body (Dữ liệu gửi đi):**
    *   Phía dưới thanh URL, bạn sẽ thấy các tab như `Body`, `Auth`, `Query`, `Headers`. Hãy click vào tab **`Body`**.
    *   Một danh sách các loại Body sẽ hiện ra. Hãy click vào nút dropdown và chọn **`JSON`**.
    *   Một ô nhập liệu lớn sẽ xuất hiện. Dán đoạn JSON sau vào đó:
        ```json
        {
          "email": "student@pronaflow.com",
          "password": "strongpassword123",
          "fullName": "Sinh Vien PronaFlow"
        }
        ```

3.  **Gửi Request:**
    *   Đảm bảo rằng server NestJS của bạn đang chạy trong terminal (`npm run start:dev`).
    *   Nhấn nút **`Send`** màu tím ở góc trên bên phải của Insomnia.

#### **Bước 4: Xem Kết quả (Response)**

Sau khi nhấn `Send`, cột bên phải của Insomnia sẽ hiển thị kết quả mà server của bạn trả về.

*   **Trường hợp thành công:**
    *   Bạn sẽ thấy **`201 Created`** ở góc trên bên phải. Con số này (Status Code) cho biết request đã được xử lý thành công và một tài nguyên mới đã được tạo.
    *   Trong phần `Preview` hoặc `Raw`, bạn sẽ thấy dữ liệu JSON của người dùng vừa được tạo (nhưng không có trường `password`).
        ```json
        {
          "id": "clx...",
          "email": "student@pronaflow.com",
          "fullName": "Sinh Vien PronaFlow",
          "createdAt": "...",
          "updatedAt": "..."
        }
        ```

*   **Trường hợp thất bại (thử gửi lại lần nữa):**
    *   Nhấn `Send` một lần nữa với cùng một email.
    *   Bây giờ bạn sẽ thấy **`409 Conflict`**.
    *   Trong phần `Preview`, bạn sẽ thấy thông báo lỗi:
        ```json
        {
          "statusCode": 409,
          "message": "Email đã được sử dụng",
          "error": "Conflict"
        }
        ```

Bằng cách này, bạn có thể kiểm tra mọi khía cạnh của API mà không cần viết một dòng code frontend nào. Bạn có thể thử gửi thiếu dữ liệu, sai định dạng email... để xem `ValidationPipe` hoạt động như thế nào.

Đây là một kỹ năng cực kỳ quan trọng đối với bất kỳ lập trình viên backend nào.

### **Checklist Kiểm tra API bằng Insomnia**

#### **1. Kiểm tra "Luồng Hạnh phúc" (The Happy Path)**

Đây là kịch bản cơ bản nhất: người dùng cung cấp dữ liệu đúng và mọi thứ hoạt động như mong đợi.

*   **[✔] Status Code:** Request có trả về đúng status code thành công không?
    *   `201 Created` cho việc tạo mới (ví dụ: `POST /auth/register`).
    *   `200 OK` cho việc lấy dữ liệu thành công (`GET /users/profile`) hoặc cập nhật thành công (`PATCH /...`).
    *   `204 No Content` cho việc xóa thành công (`DELETE /...`).
*   **[✔] Cấu trúc Dữ liệu Trả về:** Dữ liệu JSON trả về có đúng "hình dạng" (schema) mà bạn mong đợi không?
    *   Các trường có đúng tên không (`id`, `email`, `fullName`)?
    *   Kiểu dữ liệu có đúng không (string, number, boolean)?
    *   **Quan trọng:** Có trả về thông tin nhạy cảm (như `password`) không? (Tuyệt đối không được!).
*   **[✔] Dữ liệu trong Database:** Sau khi gửi request thành công, hãy dùng một công cụ xem DB (như `DB Browser for SQLite`) để mở file `dev.db` và kiểm tra:
    *   Dữ liệu có thực sự được lưu vào đúng bảng không?
    *   Mật khẩu có được **mã hóa** không? (Bạn sẽ thấy một chuỗi ký tự rất dài, không phải là "password123").

#### **2. Kiểm tra "Luồng Bất hạnh" (The Unhappy Paths) - Kịch bản Lỗi**

Đây là phần quan trọng nhất để đảm bảo API của bạn đủ "cứng cáp". Hãy cố tình "phá" API của bạn.

*   **[✔] Dữ liệu đầu vào không hợp lệ (Validation):**
    *   **Thiếu trường bắt buộc:** Gửi request đăng ký mà không có `email` hoặc `password`. API phải trả về lỗi `400 Bad Request` với thông báo rõ ràng (`"email không được để trống"`).
    *   **Sai định dạng:** Gửi `email` không có ký tự `@`. Gửi `password` ít hơn 6 ký tự. API phải trả về lỗi `400 Bad Request`.
    *   **Dữ liệu không mong muốn:** Gửi thêm một trường lạ, ví dụ `"isAdmin": true`. Nhờ có `whitelist: true` trong `ValidationPipe`, trường này phải bị bỏ qua và không được lưu vào DB.
*   **[✔] Dữ liệu xung đột (Logic Lỗi):**
    *   Gửi request đăng ký với một email đã tồn tại. API phải trả về lỗi `409 Conflict`.
*   **[✔] Dữ liệu không tồn tại:**
    *   Thử đăng nhập với một email không có trong DB. API phải trả về lỗi `401 Unauthorized`.
    *   Sau này, khi bạn có API `GET /projects/:id`, hãy thử với một ID không tồn tại. API nên trả về `404 Not Found`.

#### **3. Kiểm tra Bảo mật (Security)**

Đây là phần kiểm tra "ổ khóa" và "người bảo vệ" (JWT & Guards).

*   **[✔] Truy cập không được phép (Unauthorized):**
    *   Gọi đến một endpoint được bảo vệ (như `GET /users/profile`) mà **không gửi kèm** token. API phải trả về lỗi `401 Unauthorized`.
*   **[✔] Token không hợp lệ:**
    *   Gửi một chuỗi token bịa đặt, không phải do server tạo ra. API phải trả về lỗi `401 Unauthorized`.
    *   Copy một token hợp lệ, sau đó **xóa hoặc thay đổi một vài ký tự** ở giữa rồi gửi đi. API phải trả về lỗi `401 Unauthorized`.
*   **[✔] Token đã hết hạn:**
    *   (Nâng cao) Cấu hình token hết hạn sau một thời gian ngắn (ví dụ: `expiresIn: '5s'`), đợi 5 giây rồi dùng token đó để gọi API. API phải trả về lỗi `401 Unauthorized` với thông báo token đã hết hạn.

---

### **Cách Tổ chức trong Insomnia để Test hiệu quả**

Đừng chỉ tạo các request rời rạc. Hãy tổ chức chúng một cách khoa học.

1.  **Tạo Collection:** Tạo một Collection lớn tên là "PronaFlow API".
2.  **Tạo Thư mục cho mỗi Module:** Bên trong Collection, tạo các thư mục con như `Auth`, `Users`, `Projects`...
3.  **Đặt tên Request rõ ràng:**
    *   Tên tốt: `[POST] Register - Success`, `[POST] Register - Email Exists`, `[GET] Get Profile - Unauthorized`.
    *   Tên không tốt: `request 1`, `test`.
4.  **Sử dụng Môi trường (Environments):**
    *   Tạo một môi trường (ví dụ: `Development`) và lưu các biến như `baseUrl = http://localhost:3000`.
    *   Trong URL của request, thay vì gõ đầy đủ, hãy dùng `{{baseUrl}}/auth/register`. Điều này giúp bạn dễ dàng thay đổi địa chỉ server khi deploy.
    *   Lưu `access_token` nhận được từ API login vào một biến môi trường. Sau đó, trong các request cần xác thực, bạn chỉ cần dùng biến này thay vì phải copy/paste lại token mỗi lần.

Bằng cách tuân thủ checklist này, bạn không chỉ đảm bảo rằng code của mình chạy được, mà còn đảm bảo nó **chạy đúng, ổn định và an toàn**. Đây là sự khác biệt giữa việc "code cho xong" và "code một cách chuyên nghiệp".