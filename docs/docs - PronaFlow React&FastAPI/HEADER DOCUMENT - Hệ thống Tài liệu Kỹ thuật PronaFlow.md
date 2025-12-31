**Dự án**: *PronaFlow - Hệ thống Quản trị Dự án và Cộng tác Thông minh Đa nền tảng*
**Kiến trúc**: `Microservices (Backend)` & `SPA/Desktop Hybrid (Frontend)`
**Trạng thái tài liệu**: Đảng cập nhật
***Last updated:** Dec 31, 2025*

---
# 1 - `/00-General` : Tổng quan & Nền tảng
Folder này chứa các thông tin định hướng chiến lược và nền tảng công nghệ cốt lỗi của dự án.
- Tổng quan dự án (Overview):
	- Xác định mục tiêu xây dựng hệ thống quản lý dự án theo mô hình "Agile/Kanban" kết hợp với Data Science.
	- Giải quyết bài toán "đảo thông tin" (Information Silos) và tích hợp AI để hỗ trợ ra quyết định.
	- Chi tiết tại: [[Overview |Overview.md]]
- Technology Stack (Kiến trúc công nghệ)
	- Frontend:
	- Backend - Core Service:
	- Backend - AI Inference:
	- Desktop Wrapper: Ứng dụng lai sử dụng `Electron.js`, hỗ trợ hoạt động ngoại tuyến (Offline-first).
	- Chi tiết tại: [[Technology-Stack | Technology-Stack.md]]
- Glossary (Thuật ngữ viết tắt của tài liệu kỹ thuật)
	- Trình bày các thuật ngữ, ký hiệu viết tắt trong toàn bộ Tài liệu Kỹ thuật hệ thống.
	- Chi tiết tại: [[Glossary.md]]
```bash
docs/
├── 00-General/
│   ├── Overview.md
│   ├── Technology-Stack.md
│   └── Glossary.md
```

# 2 - `/01-Requirements` : Đặc tả Yêu cầu Hệ thống
Hệ thống được chia thành 16 phân hệ chức năng (Functional Modules) dựa trên tư duy thiết kế hướng tên miền ( #DDD)
- Danh sách các phân hệ chi tiết

- Xem chi tiết tại: [[System Functional Modules]]

```bash
docs/
├── 01-Requirements/
│   ├── Functional-Modules/
│   │   ├── 01-IAM.md
│   │   ├── 02-MultiTenancy.md
│   │   ├── 03-ProjectLifecycle.md
│   │   ├── ...
│   │   └── 10-DecisionSupport.md
│   └── Non-Functional.md
```

# 3 - `/02-Architecture` : Kiến trúc Hệ thống
Mô tả cấu trúc mã nguồn và sơ đồ hệ thống
- Application Structure:
	- Cấu trúc thư mục chi tiết cho:
		- Frontend
		- Backend
		- AI Enginee
		- Electron Wrapper
- System Architecture Design: 
	- Sơ đồ luồng dữ liệu giữa các thành phần Frontend, Backend, AI Service, Database
	- Chi tiết tại: [[System Architecture Design.canvas|System Architecture Design]]
```bash
docs/
├── 02-Architecture/                # Kiến trúc hệ thống (SAD)
│   ├── System-Architecture.canvas  # [Đã có] Biểu đồ tổng quan
│   ├── Application-Structure.md    # [Đã có] Cấu trúc thư mục code
│   ├── Database-Schema.md          # [QUAN TRỌNG - Cần viết] ERD Diagram & Data Dictionary
│   └── API-Design.md               # [Cần viết] Quy ước đặt tên, danh sách Endpoints

```

# 4 - `/03-UI-UX-Design`

```bash
docs/
├── 03-UI-UX-Design/                # Thiết kế giao diện
│   ├── Wireframes/                 # Hình ảnh hoặc link Figma
│   └── Design-System.md            # Quy định về màu sắc, typography (dựa trên MUI)

```

# 5 - `/04-AI-Specifications`

```bash
docs/
├── 04-AI-Specifications/           # Đặc tả mô hình AI
│   ├── AI-Workflows.md             # Luồng xử lý dữ liệu từ Backend -> AI -> Backend
│   └── Model-Card.md               # Input/Output chi tiết cho từng model (Prediction, NLP)
```
# 6 - `/05-Deployment-Operations`

```bash
docs/
└── 05-Deployment-Operations/       # Vận hành & Triển khai
    ├── Setup-Guide.md              # Hướng dẫn cài đặt môi trường (Local & Prod)
    ├── Docker-Strategy.md          # Kiến trúc Containerization
    └── Git-Workflow.md             # Quy trình commit code, branch strategy

```