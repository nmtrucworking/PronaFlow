```bash
docs/
├── 00-General/                     # Thông tin chung
│   ├── Overview.md                 # [Đã có] Tổng quan, mục tiêu, lý do chọn đề tài
│   ├── Technology-Stack.md         # [Đã có] Tổng hợp các file stack frontend/backend/AI
│   └── Glossary.md                 # Thuật ngữ viết tắt (DDD, JWT, RBAC,...)
│
├── 01-Requirements/                # Yêu cầu hệ thống (SRS)
│   ├── Functional-Modules/         # Đặc tả chi tiết 10 phân hệ
│   │   ├── 01-IAM.md               # [Đã có]
│   │   ├── 02-MultiTenancy.md      # [Cần viết]
│   │   ├── 03-ProjectLifecycle.md  # [Cần viết]
│   │   ├── ...
│   │   └── 10-DecisionSupport.md   # [Cần viết]
│   └── Non-Functional.md           # Hiệu năng, bảo mật, khả năng mở rộng
│
├── 02-Architecture/                # Kiến trúc hệ thống (SAD)
│   ├── System-Architecture.canvas  # [Đã có] Biểu đồ tổng quan
│   ├── Application-Structure.md    # [Đã có] Cấu trúc thư mục code
│   ├── Database-Schema.md          # [QUAN TRỌNG - Cần viết] ERD Diagram & Data Dictionary
│   └── API-Design.md               # [Cần viết] Quy ước đặt tên, danh sách Endpoints
│
├── 03-UI-UX-Design/                # Thiết kế giao diện
│   ├── Wireframes/                 # Hình ảnh hoặc link Figma
│   └── Design-System.md            # Quy định về màu sắc, typography (dựa trên MUI)
│
├── 04-AI-Specifications/           # Đặc tả mô hình AI
│   ├── AI-Workflows.md             # Luồng xử lý dữ liệu từ Backend -> AI -> Backend
│   └── Model-Card.md               # Input/Output chi tiết cho từng model (Prediction, NLP)
│
└── 05-Deployment-Operations/       # Vận hành & Triển khai
    ├── Setup-Guide.md              # Hướng dẫn cài đặt môi trường (Local & Prod)
    ├── Docker-Strategy.md          # Kiến trúc Containerization
    └── Git-Workflow.md             # Quy trình commit code, branch strategy
```


# `/00-General`
Trình bày thông tin chung của dự án PronaFlow
-  [[Overview |Overview.md]]
- [[Glossary.md]]
- 