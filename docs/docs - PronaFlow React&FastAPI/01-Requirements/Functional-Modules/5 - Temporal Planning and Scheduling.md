*Last updated: Decem 28, 2025*

---

# 1. Business Overview
Module này đại diện cho phân hệ "Planning" (Hoạch định Dự án) chuyên sâu của dự án. Khác với việc quản lý thực thi hàng ngày (Task Execution - Module 4), module này tập truung vào tầm nhìn dài hạn và sự phụ thuộc giữa các đầu việc.
Triết lý Thiết kế: "Optional & Scalable": Hệ thống PronaFlow tôn trọng quy mô của từng dự án. Không phải dự án nào cũng cần biểu đồ Gantt phức tạp hay cơ chế tính toán lịch trình.
- Đối với dựa án nhỏ: Người dùng có thể bỏ qua module này. Họ chỉ cần tạo Task List, Task và Subtask (như Module 3&4 trình bày) để quản lý Dựa án đơn giản và gọn nhẹ.
- Đối với Dự án lớn: Project Leader có thể kích hợp nút "Planning". Khi đó, Project Leader có thể thực hiện các tác vụ hoạch định dự án, như triển khai nguồn lực, xác định thời gian, tài nguyên dự án, v.v.
# 2. User Stories & Acceptance Criteria
## 2.1 Feature: Planning Mode Toggle
### User Story 5.1
Là một Project Leader, Tôi muốn có quyền bật hoặc tắt chế độ "Planning" trong cài đặt dự án, Để giữ giao diện đơn giản nếu dự án của tôi nhỏ, hoặc mở rộng tính năng nếu dự án phức tạp.
### Acceptance Criteria ( #AC)
#### AC 1 - Default State 
- Given: Một dự án mới được tạo.
- Then: Giao diện chi tiết dự án (bình thường) được hiển thị cho người dùng. Sẽ có nút "Planning" cho người dùng tùy chọn Toggle.

#### AC 2 - Toggle Action.
- When: 2 cách 
	- User ấn nút cta "Planning"
	- User vào Project Settings và chọn chuyển đổi dự án.
- Then: Hiển thị nhóm giao diện dành riêng cho chức năng Hoạch định, để thoát, người dùng chọn 
	- Thoát và lưu các tùy chọn -> Hệ thống lưu dự án đang được hoạch định.
	- Triển khai dự án -> Xuất bản dự án và Bắt đầu vòng đời một dự án.
#### AC 3 - Data Presservation
- When: Khi tắt Planning Mode.
- Then: Các dữ liệu thuộc phân hệ Hoạch định vẫn được lưu ngầm trong Database, chỉ là ẩn giao diện hiển thị để đơn giản hóa trải nghiệm.

## 2.2. Feature: 
