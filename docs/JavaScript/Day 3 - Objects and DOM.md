Tất nhiên rồi! Ngày 2 đã trang bị cho bạn logic và cấu trúc. Hôm nay, **Ngày 3**, là ngày cực kỳ thú vị vì chúng ta sẽ bắt đầu làm cho trang web của bạn "sống" dậy. Chúng ta sẽ học cách JavaScript có thể "nhìn thấy" và "thay đổi" các thành phần HTML trên trang của bạn.

### **Đối Tượng ( #Object) và Tương Tác Với Trang Web ( #DOM)**

Mục tiêu hôm nay: Học cách cấu trúc dữ liệu phức tạp bằng Đối tượng và sử dụng JavaScript để tìm, thay đổi nội dung, kiểu dáng và thuộc tính của các phần tử HTML.

---

#### **1. Đối Tượng (Objects) - Cấu Trúc Dữ Liệu Nâng Cao**

Nếu Mảng (Array) là một danh sách được sắp xếp, thì Đối tượng (Object) là một bộ sưu tập các thuộc tính không có thứ tự, trong đó mỗi thuộc tính có một cặp **tên (key)** và **giá trị (value)**. Hãy nghĩ về nó như mô tả một vật thể trong đời thực.

**Ví dụ:** Một đối tượng `car` (xe hơi) có các thuộc tính như màu sắc, thương hiệu, năm sản xuất.

**a. Cú pháp tạo Đối tượng (Object Literal)**

Chúng ta sử dụng dấu ngoặc nhọn `{}`.

```javascript
let myCat = {
    name: "Meo Meo",
    age: 2,
    color: "Vàng",
    isLazy: true,
    // Một thuộc tính có thể là một mảng
    favoriteFoods: ["Cá", "Pate", "Thịt gà"],
    // Một thuộc tính có thể là một hàm (gọi là phương thức - method)
    speak: function() {
        console.log("Meow meow!");
    }
};
```

**b. Truy cập thuộc tính**

Có hai cách chính:

*   **Dot Notation (Dấu chấm):** Dễ đọc và phổ biến nhất.
    ```javascript
    console.log(myCat.name);     // Kết quả: "Meo Meo"
    console.log(myCat.favoriteFoods[0]); // Kết quả: "Cá"
    myCat.speak();               // Chạy phương thức -> Kết quả: "Meow meow!"
    ```
*   **Bracket Notation (Dấu ngoặc vuông):** Hữu ích khi tên thuộc tính có chứa ký tự đặc biệt, dấu cách, hoặc là giá trị của một biến khác.
    ```javascript
    console.log(myCat["color"]); // Kết quả: "Vàng"
    ```

**c. Thay đổi và Thêm mới thuộc tính**

```javascript
// Thay đổi giá trị
myCat.age = 3;
console.log(myCat.age); // Kết quả: 3

// Thêm một thuộc tính mới
myCat.owner = "An";
console.log(myCat.owner); // Kết quả: "An"
```

---

#### **2. Giới Thiệu về DOM (Document Object Model)**

Khi trình duyệt tải một trang web, nó sẽ tạo ra một mô hình cấu trúc của trang đó gọi là DOM. DOM biểu diễn tài liệu HTML dưới dạng một cấu trúc cây gồm các đối tượng (gọi là các *nodes*).

**JavaScript có thể tương tác với cây DOM này để:**
*   Tìm kiếm bất kỳ phần tử HTML nào.
*   Thay đổi nội dung và kiểu dáng (CSS) của chúng.
*   Phản ứng lại các hành động của người dùng (sự kiện).
```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <!-- Đây là comment trong head -->
    <meta charset="UTF-8">
    <title>Ví dụ DOM đầy đủ</title>
  </head>
  <body>
    <!-- Đây là comment trong body -->
    <h1 id="main-title" class="title">Xin chào DOM!</h1>
    <p>Đoạn văn có <strong>in đậm</strong> và <em>in nghiêng</em>.</p>
    <img src="hinh.jpg" alt="Ảnh minh họa">
  </body>
</html>
```

```bash
Document
│
├── DocumentType: <!DOCTYPE html>
│
└── html (Element)
    ├── Attribute: lang="vi"
    │
    ├── head (Element)
    │   ├── #comment: " Đây là comment trong head "
    │   ├── meta (Element)
    │   │   └── Attribute: charset="UTF-8"
    │   └── title (Element)
    │       └── #text: "Ví dụ DOM đầy đủ"
    │
    └── body (Element)
        ├── #comment: " Đây là comment trong body "
        ├── h1 (Element)
        │   ├── Attribute: id="main-title"
        │   ├── Attribute: class="title"
        │   └── #text: "Xin chào DOM!"
        │
        ├── p (Element)
        │   ├── #text: "Đoạn văn có "
        │   ├── strong (Element)
        │   │   └── #text: "in đậm"
        │   ├── #text: " và "
        │   ├── em (Element)
        │   │   └── #text: "in nghiêng"
        │   └── #text: "."
        │
        └── img (Element)
            ├── Attribute: src="hinh.jpg"
            └── Attribute: alt="Ảnh minh họa"
```

#### **3. Tìm Kiếm và Chọn Lọc Các Phần Tử DOM (Selecting Elements)**

Đây là bước đầu tiên và quan trọng nhất. Để thay đổi một phần tử, trước hết bạn phải "nắm" được nó.

*   **`document.getElementById('id-cua-ban')`**: Chọn một phần tử duy nhất dựa trên thuộc tính `id` của nó. Đây là cách nhanh và đáng tin cậy nhất.

    *   **HTML:** `<h1 id="main-title">Chào mừng</h1>`
    *   **JS:** `let title = document.getElementById('main-title');`

*   **`document.querySelector('css-selector')`**: Chọn phần tử **đầu tiên** khớp với một CSS selector. Cực kỳ mạnh mẽ và linh hoạt.

    *   **HTML:** `<p class="intro">Đây là đoạn giới thiệu.</p>`
    *   **JS:** `let introParagraph = document.querySelector('.intro');`
    *   **JS:** `let anyH1 = document.querySelector('h1'); // Chọn thẻ h1 đầu tiên`

*   **`document.querySelectorAll('css-selector')`**: Chọn **tất cả** các phần tử khớp với CSS selector và trả về một danh sách (NodeList) giống như mảng.

    *   **HTML:** `<ul><li class="item">Mục 1</li><li class="item">Mục 2</li></ul>`
    *   **JS:** `let allItems = document.querySelectorAll('.item');`
    *   Bạn có thể dùng vòng lặp `for` để duyệt qua danh sách này:
        ```javascript
        for (let i = 0; i < allItems.length; i++) {
            console.log(allItems[i]);
        }
        ```

---

#### **4. Thao Tác Với Các Phần Tử DOM (Manipulating Elements)**

Sau khi đã chọn được phần tử, bạn có thể thay đổi chúng.

**a. Thay đổi nội dung**

*   **`.textContent`**: Thay đổi nội dung văn bản bên trong phần tử. An toàn và hiệu quả.
    ```javascript
    let title = document.getElementById('main-title');
    title.textContent = "Chào mừng bạn đến với JavaScript DOM!";
    ```
*   **`.innerHTML`**: Thay đổi toàn bộ nội dung HTML bên trong phần tử. Có thể dùng để chèn thêm các thẻ HTML khác.
    ```javascript
    let contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = "<h2>Đây là một tiêu đề phụ</h2><p>Và đây là một đoạn văn mới.</p>";
    ```

**b. Thay đổi kiểu dáng (CSS)**

Sử dụng thuộc tính `.style`. Lưu ý: các thuộc tính CSS có dấu gạch ngang (ví dụ: `background-color`) sẽ được viết theo kiểu lạc đà (camelCase) trong JavaScript (ví dụ: `backgroundColor`).

```javascript
let title = document.getElementById('main-title');
title.style.color = "blue";
title.style.backgroundColor = "yellow";
title.style.fontSize = "32px";
```

**c. Thay đổi thuộc tính (Attributes)**

Bạn có thể thay đổi các thuộc tính như `src` của thẻ `<img>` hay `href` của thẻ `<a>`.

```html
<img id="my-image" src="image1.jpg" alt="Ảnh mô tả">
<a id="my-link" href="https://google.com">Đi đến Google</a>
``````javascript
let image = document.getElementById('my-image');
image.src = "image2.png"; // Thay đổi nguồn ảnh

let link = document.getElementById('my-link');
link.href = "https://bing.com";
link.textContent = "Đi đến Bing";
```

---

#### **5. Sự Kiện (Events) - Làm Cho Trang Web Tương Tác**

Sự kiện là những hành động xảy ra trên trang web (người dùng nhấp chuột, di chuột qua một phần tử, nhấn một phím,...). JavaScript có thể "lắng nghe" những sự kiện này và thực thi một hàm khi chúng xảy ra.

**Phương thức `.addEventListener()`**

Đây là cách hiện đại và được khuyến khích để xử lý sự kiện.

**Cú pháp:** `element.addEventListener('ten-su-kien', ham-thuc-thi);`

**Ví dụ:**
```html
<button id="my-button">Click vào tôi!</button>
<p id="message"></p>
```
```javascript
// 1. Chọn các phần tử
let button = document.getElementById('my-button');
let messageParagraph = document.getElementById('message');

// 2. Định nghĩa hàm sẽ chạy khi sự kiện xảy ra
function showMessage() {
    messageParagraph.textContent = "Cảm ơn bạn đã click!";
}

// 3. Gắn hàm vào sự kiện 'click' của button
button.addEventListener('click', showMessage);
```
Bây giờ, mỗi khi người dùng nhấp vào nút, hàm `showMessage` sẽ được gọi, và nội dung của đoạn văn sẽ thay đổi.

---

#### **6. Bài Tập Thực Hành cho Ngày 3**

1.  **Tạo đối tượng:**
    *   Tạo một đối tượng tên là `student` mô tả một sinh viên, bao gồm các thuộc tính: `id` (mã số), `name` (tên), `major` (chuyên ngành), và một mảng `courses` (các môn học đã đăng ký).
    *   In tên và môn học thứ hai của sinh viên đó ra console.

2.  **Thay đổi nội dung trang:**
    *   Tạo một file HTML có một thẻ `<h1 id="heading">Tiêu đề ban đầu</h1>` và một thẻ `<p id="description">Nội dung ban đầu.</p>`.
    *   Viết mã JavaScript để chọn cả hai phần tử này bằng `id`.
    *   Thay đổi `.textContent` của thẻ `h1` thành "Chào mừng đến với DOM!".
    *   Thay đổi `.textContent` của thẻ `p` thành "Đây là đoạn văn đã được JavaScript thay đổi.".

3.  **Tương tác với nút bấm:**
    *   Tạo một file HTML có một nút `<button id="change-color-btn">Đổi màu</button>` và một thẻ `div` có `id` là `box` (hãy thêm một chút CSS để `div` này có chiều rộng, chiều cao và màu nền ban đầu).
    *   Viết JavaScript để khi click vào nút, màu nền (`backgroundColor`) của `div` `#box` thay đổi thành một màu khác (ví dụ: "lightblue").

4.  **Bật/Tắt đèn:**
    *   Tạo file HTML có một ảnh `<img id="light-bulb" src="pic_bulboff.gif">` và một nút `<button id="toggle-btn">Bật đèn</button>`. (Bạn có thể tìm ảnh bóng đèn tắt/bật trên mạng, ví dụ từ W3Schools).
    *   Viết JavaScript để mỗi lần click vào nút, nó sẽ kiểm tra ảnh hiện tại là bóng đèn tắt hay bật, sau đó thay đổi thuộc tính `src` của ảnh và `.textContent` của nút cho phù hợp.
        *   Nếu đèn đang tắt -> đổi `src` sang ảnh đèn bật, đổi text nút thành "Tắt đèn".
        *   Nếu đèn đang bật -> đổi `src` sang ảnh đèn tắt, đổi text nút thành "Bật đèn".

Bạn đã hoàn thành một khối lượng kiến thức khổng lồ hôm nay! Hiểu về DOM và Events là chìa khóa để tạo ra mọi trang web động. Hãy làm bài tập thật kỹ nhé