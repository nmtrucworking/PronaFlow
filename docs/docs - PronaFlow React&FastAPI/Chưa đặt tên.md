#### AC 1 – Enter Simulation Mode
- Toggle “Simulation Mode”
- UI chuyển:
 - Màu nền vàng nhạt
 - Watermark: _Simulation_
---
#### AC 2 – Simulation Behavior
Trong Simulation:
- Cho phép:
 - Kéo Gantt
 - Đổi Dependency
 - Thay Duration
- ❌ Không ghi DB chính
- Tất cả thay đổi lưu trong **temporary simulation graph**
---
#### AC 3 – Impact Analysis Panel (Realtime)
Hiển thị:
- Δ Project End Date (+/- days)
- Tasks newly on Critical Path
- SLA at risk count
- Resource overload increase
---
#### AC 4 – Exit Options
Khi thoát Simulation:
- **Apply Changes**
 - Ghi vào DB
 - Recalculate baseline variance
- **Discard**
 - Rollback toàn bộ
- **Save as New Baseline**
 - Baseline v2 (optional)
---
### 3.5. Business Rules
- Simulation **không trigger notification**
- SLA Timer **không chạy trong Simulation**
- Baseline cũ **không bị ghi đè**
