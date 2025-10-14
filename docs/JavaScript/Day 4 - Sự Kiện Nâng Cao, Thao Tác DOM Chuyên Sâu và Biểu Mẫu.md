Xuất sắc! Bạn đã sẵn sàng cho **Ngày 4**. Hôm qua, chúng ta đã mở ra cánh cửa tương tác với DOM. Hôm nay, chúng ta sẽ đi sâu hơn nữa, học các kỹ thuật xử lý sự kiện nâng cao, thao tác với DOM một cách chuyên nghiệp hơn, và cuối cùng là làm việc với thứ mà mọi trang web động đều có: **biểu mẫu (forms)**.

### **Ngày 4: Sự Kiện Nâng Cao, Thao Tác DOM Chuyên Sâu và Biểu Mẫu**

Mục tiêu hôm nay: Nắm vững các loại sự kiện khác nhau, học cách viết hàm gọn gàng hơn, thao tác với class của CSS, tạo và xóa phần tử, và lấy dữ liệu người dùng nhập từ form.

---
#### **1. Tìm Hiểu Sâu Hơn về Sự Kiện (Events)**
Ngoài `click`, có rất nhiều sự kiện khác bạn có thể lắng nghe.
*   **Sự kiện chuột:**
    *   `mouseover`: Khi con trỏ chuột di chuyển vào một phần tử.
    *   `mouseout`: Khi con trỏ chuột di chuyển ra khỏi một phần tử.
*   **Sự kiện bàn phím:**
    *   `keydown`: Khi một phím được nhấn xuống.
    *   `keyup`: Khi một phím được nhả ra.
*   **Sự kiện form:**
    *   `submit`: Khi một biểu mẫu được gửi đi (thường bằng cách nhấn nút submit).
    *   `input` / `change`: Khi giá trị của một ô nhập liệu (`<input>`, `<textarea>`) thay đổi. 
    *  Đảm bảo sử dụng kỹ attributes khi xây dựng 1 form HTML (*Tham khảo* [[Standard HTML Form]])

**Đối tượng `event`**

Khi một sự kiện xảy ra, trình duyệt sẽ tự động tạo ra một đối tượng `event` và truyền nó vào hàm xử lý sự kiện của bạn. Đối tượng này chứa thông tin chi tiết về sự kiện đó.

*   `event.target`: Trả về chính phần tử đã kích hoạt sự kiện. Rất hữu ích khi bạn có nhiều phần tử cùng lắng nghe một sự kiện.
*   `event.preventDefault()`: Một phương thức cực kỳ quan trọng, dùng để ngăn chặn hành vi mặc định của trình duyệt. Ví dụ: ngăn form tự động tải lại trang khi được `submit`.

```html
<form id="my-form">
    <input type="text" id="username">
    <button type="submit">Gửi</button>
</form>
```

```javascript
let myForm = document.getElementById('my-form');

myForm.addEventListener('submit', function(event) {
    // Ngăn chặn hành vi mặc định là tải lại trang
    event.preventDefault();

    let input = document.getElementById('username');
    console.log("Dữ liệu đã được gửi:", input.value);
    alert("Cảm ơn bạn đã gửi form!");
});
```

---

#### **2. Cách Viết Hàm Xử Lý Sự Kiện Hiện Đại**

**a. Hàm Vô Danh (Anonymous Functions)**

Thay vì phải định nghĩa một hàm có tên riêng rồi mới truyền vào `addEventListener`, bạn có thể viết hàm trực tiếp bên trong nó. Đây là cách làm rất phổ biến.

**Cách cũ (Ngày 3):**
```javascript
function sayHello() {
    console.log("Xin chào!");
}
button.addEventListener('click', sayHello);
```

**Cách mới (Phổ biến hơn):**
```javascript
button.addEventListener('click', function() {
    console.log("Xin chào!");
});
```

**b. Hàm Mũi Tên (Arrow Functions)**

Là một cách viết hàm vô danh thậm chí còn ngắn gọn hơn, được giới thiệu trong phiên bản JavaScript ES6. Bạn sẽ thấy nó ở khắp mọi nơi trong code hiện đại.

**Cú pháp:** `() => { ... }`

```javascript
button.addEventListener('click', () => {
    console.log("Xin chào từ Arrow Function!");
});
```

---

#### **3. Thao Tác Với Class Của CSS**

Thay đổi trực tiếp `.style` của từng phần tử có thể làm code JavaScript của bạn trở nên lộn xộn. Một cách làm tốt hơn là định nghĩa sẵn các lớp (class) trong CSS, sau đó dùng JavaScript để thêm hoặc xóa các lớp này khỏi phần tử.

Sử dụng thuộc tính `element.classList`:
*   `.classList.add('ten-class')`: Thêm một lớp.
*   `.classList.remove('ten-class')`: Xóa một lớp.
*   `.classList.toggle('ten-class')`: Nếu lớp tồn tại thì xóa nó đi, nếu không thì thêm nó vào. Hoàn hảo cho các chức năng bật/tắt.

**Ví dụ: Dark Mode Toggle**
```css
/* Trong file style.css */
body {
    transition: background-color 0.3s;
}
.dark-mode {
    background-color: #333;
    color: white;
}
```

```html
<button id="toggle-dark-mode">Bật/Tắt Dark Mode</button>
```

```javascript
let toggleBtn = document.getElementById('toggle-dark-mode');
let body = document.querySelector('body');

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});
```

---

#### **4. Tạo và Xóa Phần Tử DOM**

JavaScript không chỉ có thể thay đổi các phần tử có sẵn, mà còn có thể tạo ra các phần tử hoàn toàn mới và thêm chúng vào trang.

*   `document.createElement('tagName')`: Tạo một phần tử HTML mới (ví dụ: `document.createElement('p')`). Phần tử này chỉ tồn tại trong bộ nhớ.
*   `parentElement.appendChild(newElement)`: Gắn phần tử mới tạo vào làm con của một phần tử cha đã có trên trang.
*   `element.remove()`: Xóa một phần tử khỏi trang.

**Ví dụ: Thêm một mục vào danh sách**
```html
<ul id="my-list">
    <li>Mục 1</li>
</ul>
<button id="add-item-btn">Thêm mục</button>
```

```javascript
let list = document.getElementById('my-list');
let addBtn = document.getElementById('add-item-btn');

addBtn.addEventListener('click', () => {
    // 1. Tạo ra phần tử <li> mới
    let newItem = document.createElement('li');

    // 2. Thêm nội dung cho nó
    let itemCount = list.children.length + 1;
    newItem.textContent = "Mục " + itemCount;

    // 3. Gắn nó vào cuối danh sách <ul>
    list.appendChild(newItem);
});
```

---

## **5. Xử Lý Biểu Mẫu (Forms)**
*Tham khảo* [[Standard HTML Form]]

Đây là lúc chúng ta kết hợp tất cả kiến thức lại. Lấy dữ liệu từ người dùng là một tác vụ cực kỳ phổ biến.
### **Thuộc tính `.value`**

Đối với các thẻ `<input>`, `<textarea>`, `<select>`, bạn có thể đọc hoặc thiết lập giá trị của chúng thông qua thuộc tính `.value`.

**Dự án nhỏ: To-Do List đơn giản**
```html
<h1>To-Do List</h1>
<form id="todo-form">
    <input type="text" id="todo-input" placeholder="Thêm một việc mới..." required>
    <button type="submit">Thêm</button>
</form>
<ul id="todo-list"></ul>
```
---
<h1>To-Do List</h1>
<form id="todo-form">
    <input type="text" id="todo-input" placeholder="Thêm một việc mới..." required>
    <button type="submit">Thêm</button>
</form>
<ul id="todo-list"></ul>

---
```javascript
// 1. Chọn các phần tử cần thiết
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// 2. Lắng nghe sự kiện submit của form
form.addEventListener('submit', (event) => {
    // 3. Ngăn form tải lại trang
    event.preventDefault();

    // 4. Lấy giá trị từ ô input (loại bỏ khoảng trắng thừa)
    const taskText = input.value.trim();

    // 5. Kiểm tra xem người dùng có nhập gì không
    if (taskText !== "") {
        // 6. Tạo một phần tử <li> mới
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        // 7. Thêm phần tử mới vào danh sách <ul>
        list.appendChild(newTask);

        // 8. Xóa nội dung trong ô input để chuẩn bị cho lần nhập tiếp theo
        input.value = "";
    }
});
```

---

#### **6. Bài Tập Thực Hành cho Ngày 4**

1.  **Form Đăng ký Đơn giản:**
    *   Tạo một form HTML có các trường: Tên đăng nhập (`username`), Mật khẩu (`password`), và nút submit.
    *   Viết JavaScript để khi form được submit:
        *   Ngăn chặn việc tải lại trang.
        *   Lấy giá trị của username và password.
        *   Kiểm tra xem mật khẩu có dài hơn 6 ký tự không. Nếu không, `alert` một thông báo lỗi. Nếu có, `alert` một thông báo đăng ký thành công.

2.  **Gallery Ảnh Mini:**
    *   Tạo một file HTML có một thẻ `<img>` lớn ở trên (với `id="main-image"`) và một loạt các ảnh nhỏ (thumbnail) ở dưới (tất cả đều có chung một `class="thumb"`).
    *   Viết JavaScript để khi click vào **bất kỳ** ảnh nhỏ nào, thuộc tính `src` của ảnh lớn sẽ được thay đổi thành `src` của ảnh nhỏ vừa được click. (Gợi ý: Dùng `querySelectorAll` để chọn tất cả ảnh nhỏ, sau đó lặp qua chúng và thêm `addEventListener` cho từng cái. Hoặc nâng cao hơn: thêm một `addEventListener` vào thẻ cha chứa các ảnh nhỏ và sử dụng `event.target`).

3.  **Hộp thoại Modal/Popup:**
    *   Tạo một file HTML có một nút "Mở Modal" và một `div` làm modal (ban đầu được ẩn đi bằng CSS, ví dụ: `display: none;`). Modal này nên có một nút "Đóng" bên trong.
    *   Viết JavaScript để:
        *   Khi click nút "Mở Modal", thêm một lớp (ví dụ `.is-open`) vào modal để làm nó hiện ra (`display: block;`).
        *   Khi click nút "Đóng", xóa lớp `.is-open` đi để ẩn modal.

Ngày hôm nay đánh dấu một bước tiến lớn, bạn đã học được những kỹ năng cốt lõi để xây dựng các ứng dụng web tương tác thực sự. Hãy hoàn thành các bài tập để sẵn sàng cho ngày cuối cùng, nơi chúng ta sẽ khám phá các chủ đề nâng cao hơn và cách để tiếp tục học hỏi.