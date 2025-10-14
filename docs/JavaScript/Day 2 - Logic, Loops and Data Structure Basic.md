### **Ngày 2: Logic, Vòng Lặp và Cấu Trúc Dữ Liệu Cơ Bản**

Mục tiêu của ngày hôm nay là điều khiển luồng thực thi của chương trình và bắt đầu làm việc với các tập hợp dữ liệu.

---

#### **1. Điều Khiển Luồng (Control Flow) - Ra Quyết Định**

Trong thực tế, chương trình hiếm khi chạy một mạch từ trên xuống dưới. Chúng ta thường cần nó rẽ nhánh dựa trên những điều kiện nhất định.

**a. Câu lệnh `if`, `else if`, `else`**

Đây là cấu trúc cơ bản nhất để ra quyết định.

*   `if`: Nếu một điều kiện là đúng (`true`), thực thi khối mã bên trong.
*   `else`: Nếu điều kiện của `if` là sai (`false`), thực thi khối mã này.
*   `else if`: Cho phép bạn kiểm tra thêm một điều kiện mới nếu điều kiện `if` trước đó là sai.

**Cú pháp:**
```javascript
let diem = 85;

if (diem >= 90) {
    console.log("Xếp loại: Xuất sắc");
} else if (diem >= 80) {
    console.log("Xếp loại: Giỏi"); // Điều kiện này đúng, nên dòng này sẽ được in ra
} else if (diem >= 65) {
    console.log("Xếp loại: Khá");
} else {
    console.log("Xếp loại: Trung bình");
}
```

**b. Câu lệnh `switch`**

Sử dụng `switch` khi bạn có một biến và muốn thực thi các hành động khác nhau dựa trên nhiều giá trị cụ thể của biến đó. Nó thường gọn gàng hơn một chuỗi `if...else if` dài.

**Cú pháp:**
```javascript
let day = new Date().getDay(); // Lấy ngày hiện tại (0=Chủ Nhật, 1=Thứ 2,...)
let dayName;

switch (day) {
    case 0:
        dayName = "Chủ Nhật";
        break; // Từ khóa 'break' rất quan trọng để thoát khỏi switch
    case 1:
        dayName = "Thứ Hai";
        break;
    case 2:
        dayName = "Thứ Ba";
        break;
    // ... các case khác
    default: // 'default' sẽ chạy nếu không có case nào khớp
        dayName = "Một ngày không xác định";
}

console.log("Hôm nay là " + dayName);
```

---

#### **2. Vòng Lặp (Loops) - Thực Hiện Công Việc Lặp Đi Lặp Lại**

Vòng lặp cho phép bạn thực thi một khối mã nhiều lần mà không cần phải viết lại nó.

**a. Vòng lặp `for`**

Lựa chọn tốt nhất khi bạn biết chính xác số lần bạn muốn lặp.

**Cú pháp:** `for (khởi tạo; điều kiện; bước lặp)`
```javascript
// In các số từ 1 đến 5
for (let i = 1; i <= 5; i++) {
    console.log("Giá trị của i là: " + i);
}
// Kết quả:
// Giá trị của i là: 1
// Giá trị của i là: 2
// ...
// Giá trị của i là: 5
```

**b. Vòng lặp `while`**

Lựa chọn tốt nhất khi bạn muốn lặp cho đến khi một điều kiện nào đó không còn đúng nữa, và bạn không biết trước số lần lặp.

**Cú pháp:**
```javascript
let number = 0;
while (number < 5) {
    console.log("Số hiện tại là: " + number);
    number++; // Phải có bước thay đổi biến điều kiện, nếu không sẽ bị lặp vô tận!
}
```

---

#### **3. Hàm (Functions) - Đi Sâu Hơn**

Ngày 1 chúng ta đã giới thiệu về hàm. Hôm nay chúng ta sẽ tìm hiểu một khái niệm cực kỳ quan trọng của hàm: **giá trị trả về**.

**Từ khóa `return`**

Hàm không chỉ thực hiện hành động, nó còn có thể tính toán và "trả về" một kết quả. Dữ liệu được trả về này có thể được lưu vào một biến khác để sử dụng sau này.

```javascript
// Hàm này chỉ in ra console, không trả về giá trị gì
function showSum(a, b) {
    console.log("Tổng là: " + (a + b));
}

// Hàm này TÍNH TOÁN và TRẢ VỀ kết quả
function calculateSum(a, b) {
    return a + b; // Dừng hàm và trả về giá trị (a + b)
}

showSum(5, 3); // In ra "Tổng là: 8"

let mySum = calculateSum(5, 3); // Hàm chạy, trả về 8, và giá trị 8 được gán cho mySum
console.log("Kết quả từ hàm calculateSum: " + mySum); // In ra "Kết quả từ hàm calculateSum: 8"
```
Việc sử dụng `return` làm cho các hàm của bạn trở nên linh hoạt và có khả năng tái sử dụng cao hơn rất nhiều.

---

#### **4. Mảng (Arrays) - Cấu Trúc Dữ Liệu Đầu Tiên**

Thay vì tạo nhiều biến để lưu trữ các giá trị tương tự nhau (như `student1`, `student2`,...), chúng ta có thể lưu tất cả chúng vào một "bộ sưu tập" duy nhất gọi là mảng.

**a. Khởi tạo một mảng**
```javascript
let fruits = ["Táo", "Cam", "Xoài", "Chuối"];
let numbers = [1, 2, 3, 4, 5];
let emptyArray = [];
```

**b. Truy cập phần tử**

Các phần tử trong mảng được đánh chỉ số (index) bắt đầu từ **0**.

```javascript
console.log(fruits[0]); // Kết quả: "Táo"
console.log(fruits[2]); // Kết quả: "Xoài"

// Thay đổi giá trị một phần tử
fruits[1] = "Dứa";
console.log(fruits); // Kết quả: ["Táo", "Dứa", "Xoài", "Chuối"]
```

**c. Các thuộc tính và phương thức cơ bản**

*   `.length`: Trả về số lượng phần tử trong mảng.
    ```javascript
    console.log("Số loại hoa quả: " + fruits.length); // Kết quả: 4
    ```
*   `.push()`: Thêm một phần tử vào **cuối** mảng.
    ```javascript
    fruits.push("Nho");
    console.log(fruits); // Kết quả: ["Táo", "Dứa", "Xoài", "Chuối", "Nho"]
    ```
*   `.pop()`: Xóa phần tử ở **cuối** mảng.
    ```javascript
    fruits.pop();
    console.log(fruits); // Kết quả: ["Táo", "Dứa", "Xoài", "Chuối"]
    ```

**d. Duyệt mảng bằng vòng lặp `for`**

Đây là một kỹ thuật cực kỳ phổ biến:
```javascript
let animals = ["Chó", "Mèo", "Hổ", "Sư tử"];

for (let i = 0; i < animals.length; i++) {
    console.log("Thú cưng số " + (i + 1) + " là: " + animals[i]);
}
```

---

#### **5. Bài Tập Thực Hành cho Ngày 2**

Hãy áp dụng kiến thức vừa học để giải các bài toán sau:

1.  **Phân loại điểm số:** Viết một hàm nhận vào một điểm số (từ 0-100) và sử dụng `if...else if...else` để `return` về xếp loại học lực ("Xuất sắc", "Giỏi", "Khá", "Trung bình", "Yếu").

2.  **In ra các số chẵn:** Sử dụng vòng lặp `for` để in ra tất cả các số chẵn từ 1 đến 20. (Gợi ý: Dùng toán tử chia lấy dư `%`. Một số là chẵn nếu `so_do % 2 === 0`).

3.  **Máy tính nâng cao:**
    *   Viết một hàm tên là `calculator` nhận vào 3 tham số: `num1`, `num2`, và `operator` (một chuỗi như "+", "-", "\*", "/").
    *   Bên trong hàm, sử dụng câu lệnh `switch` với biến `operator` để thực hiện phép tính tương ứng.
    *   Hàm phải `return` về kết quả của phép tính.
    *   Gọi hàm này với các phép tính khác nhau và `console.log` kết quả.

4.  **Quản lý danh sách việc cần làm (To-do List):**
    *   Tạo một mảng rỗng tên là `todoList`.
    *   Sử dụng phương thức `.push()` để thêm 3 công việc (dưới dạng chuỗi) vào mảng.
    *   Sử dụng vòng lặp `for` để in ra danh sách các công việc ra console, mỗi công việc trên một dòng.

Bạn đã làm rất tốt khi hoàn thành Ngày 2! Hôm nay chúng ta đã đi sâu vào "bộ não" của chương trình, giúp nó có thể đưa ra quyết định và xử lý các tác vụ lặp lại. Hãy chắc chắn bạn làm hết các bài tập để củng cố kiến thức trước khi chúng ta bước sang Ngày 3 nhé