```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Form Chuẩn Gửi Backend</title>
</head>
<body>
  <!-- Form bắt đầu -->
  <form 
    action="/submit"        <!-- URL hoặc endpoint của backend -->
    method="POST"           <!-- GET hoặc POST -->
    enctype="application/x-www-form-urlencoded" <!-- Kiểu dữ liệu gửi -->
    autocomplete="on"       <!-- Bật/tắt tự động điền -->
    novalidate              <!-- Tắt validate mặc định (nếu cần) -->
    target="_self"          <!-- Nơi hiển thị kết quả (_self, _blank, _parent, _top, tên iframe) -->
  >

    <!-- Thông tin cơ bản -->
    <fieldset>
      <legend>Thông tin cá nhân</legend>

      <!-- Text input -->
      <label for="fullname">Họ và tên:</label>
      <input 
        type="text" 
        id="fullname" 
        name="fullname" 
        placeholder="Nhập họ tên đầy đủ" 
        required 
        minlength="3" 
        maxlength="50"
      >
      <br><br>

      <!-- Email -->
      <label for="email">Email:</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        placeholder="example@gmail.com" 
        required
      >
      <br><br>

      <!-- Password -->
      <label for="password">Mật khẩu:</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        minlength="6" 
        required
      >
      <br><br>

      <!-- Date -->
      <label for="dob">Ngày sinh:</label>
      <input 
        type="date" 
        id="dob" 
        name="dob"
      >
      <br><br>

      <!-- Gender -->
      <label>Giới tính:</label>
      <input type="radio" id="male" name="gender" value="male">
      <label for="male">Nam</label>
      <input type="radio" id="female" name="gender" value="female">
      <label for="female">Nữ</label>
      <br><br>

      <!-- Checkbox -->
      <label>Sở thích:</label><br>
      <input type="checkbox" id="reading" name="hobbies" value="reading">
      <label for="reading">Đọc sách</label>
      <input type="checkbox" id="music" name="hobbies" value="music">
      <label for="music">Nghe nhạc</label>
      <input type="checkbox" id="sport" name="hobbies" value="sport">
      <label for="sport">Thể thao</label>
      <br><br>

      <!-- Select -->
      <label for="city">Thành phố:</label>
      <select id="city" name="city" required>
        <option value="">--Chọn--</option>
        <option value="hanoi">Hà Nội</option>
        <option value="hcm">TP.HCM</option>
        <option value="danang">Đà Nẵng</option>
      </select>
      <br><br>

      <!-- Textarea -->
      <label for="bio">Giới thiệu bản thân:</label><br>
      <textarea id="bio" name="bio" rows="4" cols="40" placeholder="Viết vài dòng..."></textarea>
    </fieldset>

    <br>

    <!-- Upload file -->
    <fieldset>
      <legend>Tải tài liệu</legend>
      <input 
        type="file" 
        id="file" 
        name="file_upload" 
        accept=".pdf,.doc,.jpg,.png"
      >
    </fieldset>

    <br>

    <!-- Hidden field (thường dùng để gửi token, id) -->
    <input type="hidden" name="csrf_token" value="123456ABCDEF">

    <!-- Các nút -->
    <br>
    <button type="submit">Gửi</button>
    <button type="reset">Xóa</button>
    <button type="button" onclick="alert('Bạn vừa bấm nút thường!')">Nút thường</button>
  </form>
</body>
</html>
```

<body>
    <!-- Thông tin cơ bản -->
    <fieldset>
      <legend>Thông tin cá nhân</legend>

      <!-- Text input -->
      <label for="fullname">Họ và tên:</label>
      <input 
        type="text" 
        id="fullname" 
        name="fullname" 
        placeholder="Nhập họ tên đầy đủ" 
        required 
        minlength="3" 
        maxlength="50"
      >
      <br><br>

      <!-- Email -->
      <label for="email">Email:</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        placeholder="example@gmail.com" 
        required
      >
      <br><br>

      <!-- Password -->
      <label for="password">Mật khẩu:</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        minlength="6" 
        required
      >
      <br><br>

      <!-- Date -->
      <label for="dob">Ngày sinh:</label>
      <input 
        type="date" 
        id="dob" 
        name="dob"
      >
      <br><br>

      <!-- Gender -->
      <label>Giới tính:</label>
      <input type="radio" id="male" name="gender" value="male">
      <label for="male">Nam</label>
      <input type="radio" id="female" name="gender" value="female">
      <label for="female">Nữ</label>
      <br><br>

      <!-- Checkbox -->
      <label>Sở thích:</label><br>
      <input type="checkbox" id="reading" name="hobbies" value="reading">
      <label for="reading">Đọc sách</label>
      <input type="checkbox" id="music" name="hobbies" value="music">
      <label for="music">Nghe nhạc</label>
      <input type="checkbox" id="sport" name="hobbies" value="sport">
      <label for="sport">Thể thao</label>
      <br><br>

      <!-- Select -->
      <label for="city">Thành phố:</label>
      <select id="city" name="city" required>
        <option value="">--Chọn--</option>
        <option value="hanoi">Hà Nội</option>
        <option value="hcm">TP.HCM</option>
        <option value="danang">Đà Nẵng</option>
      </select>
      <br><br>
      <!-- Textarea -->
      <label for="bio">Giới thiệu bản thân:</label><br>
      <textarea id="bio" name="bio" rows="4" cols="40" placeholder="Viết vài dòng..."></textarea>
    </fieldset>
    <br>
    <!-- Upload file -->
    <fieldset>
      <legend>Tải tài liệu</legend>
      <input 
        type="file" 
        id="file" 
        name="file_upload" 
        accept=".pdf,.doc,.jpg,.png"
      >
    </fieldset>
    <br>
    <!-- Hidden field (thường dùng để gửi token, id) -->
    <input type="hidden" name="csrf_token" value="123456ABCDEF">
    <!--Các nút -->
    <br>
    <button type="submit">Gửi</button>
    <button type="reset">Xóa</button>
    <button type="button" onclick="alert('Bạn vừa bấm nút thường!')">Nút thường</button>
  </form>

---
## Giải thích chi tiết

1. **`<form>` thuộc tính quan trọng**
    - `action`: URL endpoint backend nhận dữ liệu.
    - `method`: `"GET"` (query string URL) hoặc `"POST"` (body).
    - `enctype`:
        - `application/x-www-form-urlencoded` (mặc định).
        - `multipart/form-data` (khi upload file).
        - `text/plain` (ít dùng).    
    - `autocomplete`: on/off.
    - `target`: nơi hiển thị kết quả (self, blank, iframe).    
2. **Input types phổ biến**: `text`, `email`, `password`, `number`, `date`, `radio`, `checkbox`, `file`, `hidden`.
3. **`label for` + `id`**: giúp tăng accessibility và UX (click label chọn input).
4. **`name`**: rất quan trọng → key gửi về backend.
5. **Validation**: `required`, `minlength`, `maxlength`, `pattern`.
6. **`fieldset` + `legend`**: nhóm nội dung logic, dễ đọc + semantic.
7. **Button**:
    - `submit` → gửi form.
    - `reset` → xóa toàn bộ input.
    - `button` → nút thường (JS).