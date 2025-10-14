# 1. #CORS - Cross-Origin Resource Sharing
1. Bối cảnh: Backend của project đang cạy ở `http://localhost:3000`. Frontend của dự án (khi mở file `index.html`) có thể chạy ở một "origin" (nguồn) khác, ví dụ `file:///C:/...` hoặc nếu dùng một server live đơn giản, nó có thể là `http://localhost:5500`
2. Chính sách An ninh của Browser: Vì lý do bảo mật, trình duyệt web sẽ chặn các request JavaScript từ một origin (`localhost:5500`)  gửi đến một orgin khác (`localhost:3000`), trừ khi server ở `localhost:3000` nói rõ ràng rằng: "**Tôi cho phép orgin `localhost:5500` được truy cập tài nguyên có tôi**"
3. Problem: Hiện tại, backend NestJS của dự án chưa hề "cho phép"
# 2. Kết hợp #Frontend và #Backend
## Step 1: Cấu hình CORS trên Backend NestJS
Đây là việc đầu tiên và quan trọng nhất cần làm.
1. Mở file `src/main.ts` trong dự án `pronaflow-api`
2. Cập nhật hàm `boostrap` để bật #CORS.
```ts
// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // <-- ĐÂY LÀ ĐỊA CHỈ CỦA FRONTEND CỦA BẠN
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
```
Giải thích quan trọng:
- orgin: '`http://127.0.0.1:5500`': Đây là phần cốt lỗi. Bạn đang nói với backend rằng "Chỉ chấp nhanaj các request đến từ fronted đang cạy ở địa chỉ origin được thiết lập".
- Làm sao để biết địa chỉ của frontend?
	- Sử dụng một extension của VS Code là "Live Server".
	- Cài đặt và mở index.html -> Copy địa chỉ url được mở trên browser và paste vào origin trong `pronaflow-api/src/main.ts` 
## **Step 2**: Gọi API từ JavaScript phía Frontend.
Có thể sử dụng hàm `fetch` của JS để làm việc với backend từ các file JS của `pronaflow-web`.
### **Ví dụ 1**: Triển khai *form Đảng ký* (`register.html`)
Tài nguyên triển khai:
- `pronaflow-web`: `register.html` và `register.js`
- `pronaflow-api`:

```js
// Lấy các element từ form
const registerForm = document.getElementById('register-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const fullNameInput = document.getElementById('fullName');
const errorMessage = document.getElementById('error-message'); // Một thẻ <p> để hiển thị lỗi

registerForm.addEventListener('submit', async (event) => {
    // Ngăn form submit theo cách truyền thống (tải lại trang)
    event.preventDefault();

    // 1. Lấy dữ liệu từ form
    const userData = {
        email: emailInput.value,
        password: passwordInput.value,
        fullName: fullNameInput.value,
    };

    try {
        // 2. Gửi request đến backend bằng fetch
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Báo cho server biết chúng ta gửi dữ liệu dạng JSON
            },
            body: JSON.stringify(userData), // Chuyển object JavaScript thành chuỗi JSON
        });

        // 3. Xử lý kết quả trả về
        const data = await response.json(); // Đọc dữ liệu JSON từ response

        if (!response.ok) {
            // Nếu server trả về lỗi (status code không phải 2xx)
            // 'data.message' sẽ chứa thông báo lỗi từ NestJS
            // Ví dụ: "Email đã được sử dụng"
            throw new Error(data.message || 'Đã có lỗi xảy ra.');
        }

        // 4. Nếu thành công
        alert('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
        window.location.href = '/login.html'; // Chuyển hướng người dùng

    } catch (error) {
        // Hiển thị lỗi cho người dùng
        errorMessage.textContent = error.message;
        console.error('Lỗi đăng ký:', error);
    }
});
```

### Ví dụ 2: Lưu Token và Gọi API được bảo vệ
Sau khi người dùng đăng nhập thành công, cần lưu `access_token` và sử dụng nó cho các request sau:
1. File `login.js`
```ts
// ... code lấy dữ liệu từ form login ...
const response = await fetch('http://localhost:3000/auth/login', {
    // ... method, headers, body tương tự như đăng ký
});

const data = await response.json();

if (response.ok) {
    // Đăng nhập thành công!
    // 1. LƯU TOKEN VÀO LOCAL STORAGE
    localStorage.setItem('accessToken', data.access_token);

    // 2. Chuyển hướng đến trang dashboard
    window.location.href = '/dashboard.html';
} else {
    // Xử lý lỗi đăng nhập
}
```
2. File `dashboard.js` (hoặc một file JS dùng chung).
```js
async function fetchUserProfile() {
    // 1. LẤY TOKEN TỪ LOCAL STORAGE
    const token = localStorage.getItem('accessToken');

    if (!token) {
        // Nếu không có token, chuyển người dùng về trang đăng nhập
        window.location.href = '/login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users/profile', {
            method: 'GET',
            headers: {
                // 2. GỬI TOKEN LÊN SERVER TRONG HEADER AUTHORIZATION
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token không hợp lệ hoặc đã hết hạn
                alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                localStorage.removeItem('accessToken'); // Xóa token cũ
                window.location.href = '/login.html';
            }
            throw new Error('Không thể lấy thông tin người dùng.');
        }

        const profileData = await response.json();

        // 3. HIỂN THỊ DỮ LIỆU LÊN GIAO DIỆN
        document.getElementById('user-welcome-message').textContent = `Chào mừng, ${profileData.email}!`;

    } catch (error) {
        console.error(error);
    }
}

// Gọi hàm này khi trang dashboard được tải
fetchUserProfile();
```
# 3. Tóm tắt lộ trình Kết hợp:
1. **Backend (pronaflow-api):** Bật `enableCors()` trong `main.ts`, trỏ origin đến địa chỉ của frontend (lấy từ Live Server).
2. **Frontend (pronaflow-web):**
    - Sử dụng `fetch` trong các file JavaScript để gọi đến các endpoint của backend (`http://localhost:3000/...`).
    - **Đăng ký/Đăng nhập:** Gửi request POST với body là dữ liệu JSON.
    - **Lưu trữ Token:** Sau khi đăng nhập thành công, lưu `access_token` vào localStorage.
    - **Gọi API được bảo vệ:** Với mỗi request đến các trang cần đăng nhập, lấy token từ `localStorage` và đặt nó vào `headers` với định dạng `Authorization`: `Bearer YOUR_TOKEN`.
    - **Xử lý lỗi:** Luôn kiểm tra `response.ok` và xử lý các lỗi (như `401`, `400`, `409`) để hiển thị thông báo phù hợp cho người dùng.
