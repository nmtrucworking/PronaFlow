**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
***Last updated:** Dec 31, 2025*

---
# 1. Business Overview
Trong quáº£n trá»‹ dá»± Ă¡n hiá»‡n Ä‘áº¡i, dá»¯ liá»‡u khĂ´ng chá»‰ lĂ  nhá»¯ng con sá»‘ vĂ´ tri mĂ  lĂ  tĂ i sáº£n cá»‘t lá»—i Ä‘á»ƒ tá»‘i Æ°u hĂ³a váº­n hĂ nh. CĂ¡c nhĂ  quáº£n lĂ½ thÆ°á»ng gáº·p khĂ³ khÄƒn khi pháº£i tá»•ng há»£p thá»§ cĂ´ng dá»¯ liá»‡u tá»« nhiá»u nguá»“n (Exel, Chat, Email) Ä‘á»ƒ lĂ m bĂ¡o cĂ¡o tiáº¿n Ä‘á»™, dáº«n Ä‘áº¿n Ä‘á»™ trá»… thĂ´ng tin vĂ  sai lá»‡ch sá»‘ liá»‡u.
Module `Advanced Analytics & Reporting` cá»§a PronaFlow táº­p trung vĂ o **Descriptive Analytics*** vĂ  **Diagnostic Analytics***. Má»¥c tiĂªu lĂ  cung cáº¥p má»™t bá»©c tranh toĂ n cáº£nh, minh báº¡ch vá» Project-Health thĂ´ng qua cĂ¡c chá»‰ sá»‘ Ä‘á»‹nh lÆ°á»£ng chĂ­nh xĂ¡c, giĂºp tráº£ lá»i cĂ¢u há»i: "*Äiá»u gĂ¬ Ä‘Ă£ xáº£y ra vĂ  Táº¡i sao?*".
Module nĂ y cÅ©ng Ä‘Ă³ng vai trĂ² lĂ  nguá»“n dá»¯ liá»‡u Ä‘áº§u vĂ o cho Module 13 thĂ´ng qua tĂ­nh nÄƒng Time Tracking.
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Agile Performance Metrics (Chá»‰ sá»‘ Hiá»‡u suáº¥t Agile)
### User Story 11.1
LĂ  má»™t Scrum Master, TĂ´i muá»‘n xem biá»ƒu Ä‘á»“ Burn-down vĂ  Burn-up tá»± Ä‘á»™ng cáº­p nháº­t theo thÆ°á»i gian thá»±c, Äá»ƒ Ä‘Ă¡nh giĂ¡ xem team cĂ³ kháº£ nÄƒng hoĂ n thĂ nh Sprint Ä‘Ăºng háº¡n hay khĂ´ng mĂ  khĂ´ng cáº§n váº½ tay.
### Acceptance Criteria ( #AC)
#### AC 1 - Real-time Calculation:
- Input: Dá»¯ liá»‡u tá»« cĂ¡c thay Ä‘á»•i tráº¡ng thĂ¡i Task vĂ  cáº­p nháº­t Remaining Work.
- **Visualization:**
    - **Ideal Line:** ÄÆ°á»ng lĂ½ tÆ°á»Ÿng (tuyáº¿n tĂ­nh tá»« tá»•ng Ä‘iá»ƒm Story Points vá» 0).
    - **Actual Line:** ÄÆ°á»ng thá»±c táº¿.
- **Scope Creep Detection:** Náº¿u cĂ³ Task má»›i Ä‘Æ°á»£c thĂªm vĂ o giá»¯a Sprint, biá»ƒu Ä‘á»“ Burn-up pháº£i hiá»ƒn thá»‹ sá»± gia tÄƒng cá»§a Ä‘Æ°á»ng Scope, lĂ m ná»•i báº­t sá»± thay Ä‘á»•i pháº¡m vi.
#### AC 2 - Velocity Chart
- Hiá»ƒn thá»‹ biá»ƒu Ä‘á»“ cá»™t so sĂ¡nh `Commitment` (Cam káº¿t ban Ä‘áº§u) vĂ  `Completed` (HoĂ n thĂ nh thá»±c táº¿) qua cĂ¡c Sprint lá»‹ch sá»­.
- Tá»± Ä‘á»™ng tĂ­nh toĂ¡n **Average Velocity** (Váº­n tá»‘c trung bĂ¬nh) cá»§a 3 Sprint gáº§n nháº¥t Ä‘á»ƒ há»— trá»£ láº­p káº¿ hoáº¡ch.
## 2.2. Feature: Resource Utilization Heatmap (Báº£n Ä‘á»“ Nhiá»‡t Nguá»“n lá»±c)
### User Story 11.2
LĂ  má»™t Resource Manager, TĂ´i muá»‘n nhĂ¬n tháº¥y má»©c Ä‘á»™ táº£i viá»‡c cá»§a tá»«ng thĂ nh viĂªn qua biá»ƒu Ä‘á»“ nhiá»‡t (Heatmap), Äá»ƒ phĂ¡t hiá»‡n ai Ä‘ang bá»‹ quĂ¡ táº£i (Overload) hoáº·c ráº£nh rá»—i (Underutilized) nháº±m Ä‘iá»u phá»‘i láº¡i nguá»“n lá»±c.
### Acceptance Criteria ( #AC)
#### AC 1 - Capacity Visualization
- **Logic:** So sĂ¡nh `Assigned Hours` vá»›i `Working Capacity` (vĂ­ dá»¥: 8h/ngĂ y).
- **Color Coding:**
    - **Green:** 70-90% Capacity (Tá»‘i Æ°u).
    - **Red:** > 100% Capacity (QuĂ¡ táº£i).
    - **Grey:** < 50% Capacity (Ráº£nh rá»—i).
#### AC 2 - Drill-down Capability
- Cho phĂ©p click vĂ o má»™t Ă´ mĂ u trĂªn Heatmap Ä‘á»ƒ xem danh sĂ¡ch chi tiáº¿t cĂ¡c Task Ä‘ang chiáº¿m dá»¥ng thá»i gian cá»§a nhĂ¢n sá»± Ä‘Ă³ trong ngĂ y.
## 2.3. Feature: Time Tracking & Timesheets (Theo dĂµi Thá»i gian & Báº£ng cháº¥m cĂ´ng)
### User Story 11.3
LĂ  má»™t Freelancer/NhĂ¢n viĂªn, TĂ´i muá»‘n ghi láº¡i thá»i gian thá»±c táº¿ tĂ´i dĂ nh cho má»—i Ä‘áº§u viá»‡c vĂ  phĂ¢n loáº¡i chĂºng, Äá»ƒ lĂ m cÆ¡ sá»Ÿ tĂ­nh lÆ°Æ¡ng hoáº·c xuáº¥t hĂ³a Ä‘Æ¡n cho khĂ¡ch hĂ ng.
### Acceptance Criteria ( #AC)

#### AC 1 - Timer & Manual Entry
- **Timer:** Widget báº¥m giá» (Start/Stop) cháº¡y ná»•i trĂªn giao diá»‡n, tá»± Ä‘á»™ng tĂ­nh toĂ¡n thá»i gian `hh:mm:ss`.
- **Manual:** Cho phĂ©p nháº­p tay hoáº·c Ä‘iá»u chá»‰nh thá»i gian náº¿u quĂªn báº¥m giá» (cáº§n ghi log chá»‰nh sá»­a).
#### AC 2 - Billable vs. Non-billable
- Má»—i báº£n ghi thá»i gian (Time Entry) pháº£i cĂ³ cá» (Flag) `is_billable`.
- **Default:** Káº¿ thá»«a tá»« cĂ i Ä‘áº·t cá»§a Dá»± Ă¡n. Náº¿u Dá»± Ă¡n lĂ  "Internal", máº·c Ä‘á»‹nh lĂ  Non-billable.
#### AC 3 - Timesheet Approval Workflow
- Cuá»‘i tuáº§n/thĂ¡ng, nhĂ¢n viĂªn gá»­i Timesheet. PM nháº­n thĂ´ng bĂ¡o Ä‘á»ƒ "Approve" hoáº·c "Reject" (kĂ¨m lĂ½ do). Chá»‰ Timesheet Ä‘Ă£ duyá»‡t má»›i Ä‘Æ°á»£c Ä‘áº©y sang Module 13 Ä‘á»ƒ tĂ­nh tiá»n.
## 2.4. Feature: Custom Report Builder (TrĂ¬nh táº¡o bĂ¡o cĂ¡o tĂ¹y chá»‰nh)
### User Story 11.4
LĂ  má»™t Data Analyst, TĂ´i muá»‘n tá»± thiáº¿t káº¿ cĂ¡c bĂ¡o cĂ¡o riĂªng dá»±a trĂªn cĂ¡c trÆ°á»ng dá»¯ liá»‡u tĂ¹y chá»‰nh (Custom Fields) mĂ  khĂ´ng phá»¥ thuá»™c vĂ o cĂ¡c máº«u cĂ³ sáºµn, Äá»ƒ phá»¥c vá»¥ nhu cáº§u bĂ¡o cĂ¡o Ä‘áº·c thĂ¹ cá»§a ban giĂ¡m Ä‘á»‘c.
### Acceptance Criteria ( #AC)
#### AC 1 - Drag & Drop Interface
- Cung cáº¥p giao diá»‡n kĂ©o tháº£ Ä‘á»ƒ chá»n:
    - **Dimensions (Trá»¥c phĂ¢n tĂ­ch):** Project, Assignee, Tag, Priority, Month.
    - **Metrics (Chá»‰ sá»‘ Ä‘o lÆ°á»ng):** Count of Tasks, Sum of Hours, Avg Cycle Time.
#### AC 2 - Filtering & Export
- Há»— trá»£ bá»™ lá»c nĂ¢ng cao (SQL-like logic: AND, OR).
- Cho phĂ©p xuáº¥t bĂ¡o cĂ¡o ra Ä‘á»‹nh dáº¡ng `.pdf` (Ä‘á»ƒ in áº¥n) vĂ  `.csv/.xlsx` (Ä‘á»ƒ xá»­ lĂ½ thĂªm).
# 3. Business Rules & Technical Constraints
## 3.1. Quy táº¯c Báº£o máº­t Dá»¯ liá»‡u BĂ¡o cĂ¡o (Data Visibility)
- **Salary/Cost Privacy:** CĂ¡c trÆ°á»ng dá»¯ liá»‡u nháº¡y cáº£m nhÆ° `Hourly Rate` (Má»©c lÆ°Æ¡ng giá») hoáº·c `Total Cost` chá»‰ hiá»ƒn thá»‹ vá»›i vai trĂ² **Owner** vĂ  **Admin**.
- Member bĂ¬nh thÆ°á»ng chá»‰ xem Ä‘Æ°á»£c sá»‘ giá» (`Total Hours`) cá»§a báº£n thĂ¢n vĂ  biá»ƒu Ä‘á»“ tiáº¿n Ä‘á»™ chung cá»§a dá»± Ă¡n, khĂ´ng xem Ä‘Æ°á»£c Timesheet chi tiáº¿t cá»§a Ä‘á»“ng nghiá»‡p (trá»« khi Ä‘Æ°á»£c á»§y quyá»n).
## 3.2. Quy táº¯c LĂ m tÆ°Æ¡i Dá»¯ liá»‡u (Data Freshness)
- CĂ¡c bĂ¡o cĂ¡o váº­n hĂ nh (Operational Reports) nhÆ° Burn-down chart cáº§n dá»¯ liá»‡u **Real-time** hoáº·c Ä‘á»™ trá»… tháº¥p (< 1 phĂºt).
- CĂ¡c bĂ¡o cĂ¡o phĂ¢n tĂ­ch xu hÆ°á»›ng dĂ i háº¡n (Trend Analysis) cĂ³ thá»ƒ sá»­ dá»¥ng dá»¯ liá»‡u tá»« **Read Replica** hoáº·c **Data Warehouse** vá»›i Ä‘á»™ trá»… cháº¥p nháº­n Ä‘Æ°á»£c (vĂ­ dá»¥: cáº­p nháº­t sau má»—i 1 giá») Ä‘á»ƒ giáº£m táº£i cho Database chĂ­nh.
## 3.3. Quy táº¯c Ghi nháº­n Thá»i gian (Time Logging Rules)
- KhĂ´ng cho phĂ©p ghi nháº­n thá»i gian cho tÆ°Æ¡ng lai (Future Logging) vÆ°á»£t quĂ¡ ngĂ y hiá»‡n táº¡i (trá»« trÆ°á»ng há»£p Ä‘Äƒng kĂ½ nghá»‰ phĂ©p - Leave Request).
- Tá»•ng thá»i gian log trong má»™t ngĂ y khĂ´ng Ä‘Æ°á»£c vÆ°á»£t quĂ¡ 24h (Hard Validation). Cáº£nh bĂ¡o má»m (Soft Warning) náº¿u vÆ°á»£t quĂ¡ 12h/ngĂ y.
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. Quáº£n lĂ½ GiĂ¡ trá»‹ Thu Ä‘Æ°á»£c (Earned Value Management - #EVM)
Module Ă¡p dá»¥ng chuáº©n EVM Ä‘á»ƒ Ä‘o lÆ°á»ng hiá»‡u quáº£ dá»± Ă¡n khĂ¡ch quan:
- **Planned Value (PV):** Khá»‘i lÆ°á»£ng cĂ´ng viá»‡c dá»± kiáº¿n hoĂ n thĂ nh.
- **Earned Value (EV):** Khá»‘i lÆ°á»£ng cĂ´ng viá»‡c thá»±c táº¿ Ä‘Ă£ hoĂ n thĂ nh.
- Actual Cost (AC): Chi phĂ­ thá»±c táº¿ bá» ra (dá»±a trĂªn Time logs).
    -> Há»‡ thá»‘ng tá»± Ä‘á»™ng tĂ­nh toĂ¡n chá»‰ sá»‘ CPI (Cost Performance Index) vĂ  SPI (Schedule Performance Index). Náº¿u $SPI < 1$, dá»± Ă¡n Ä‘ang cháº­m tiáº¿n Ä‘á»™.
## 4.2. Äá»‹nh luáº­t Little & Flow Metrics (Kanban Analytics)
Ăp dá»¥ng cho cĂ¡c bĂ¡o cĂ¡o luá»“ng cĂ´ng viá»‡c:
- **Cycle Time:** Thá»i gian tá»« khi báº¯t Ä‘áº§u (In-Progress) Ä‘áº¿n khi hoĂ n thĂ nh (Done).
- **Lead Time:** Thá»i gian tá»« khi yĂªu cáº§u (New) Ä‘áº¿n khi hoĂ n thĂ nh (Done).
- Throughput: Sá»‘ lÆ°á»£ng task hoĂ n thĂ nh trĂªn má»™t Ä‘Æ¡n vá»‹ thá»i gian.
    Viá»‡c theo dĂµi Cycle Time giĂºp phĂ¡t hiá»‡n cĂ¡c Ä‘iá»ƒm ngháº½n (Bottlenecks) trong quy trĂ¬nh sáº£n xuáº¥t.
## 4.3. NguyĂªn lĂ½ Pareto (Quy táº¯c 80/20)
Ăp dá»¥ng trong bĂ¡o cĂ¡o lá»—i (Bug Reporting):
- Biá»ƒu Ä‘á»“ Pareto giĂºp nháº­n diá»‡n "20% nguyĂªn nhĂ¢n gĂ¢y ra 80% lá»—i".
- Há»‡ thá»‘ng tá»± Ä‘á»™ng nhĂ³m cĂ¡c lá»—i theo `Category` hoáº·c `Module` vĂ  sáº¯p xáº¿p giáº£m dáº§n, giĂºp team táº­p trung xá»­ lĂ½ cĂ¡c vĂ¹ng lá»—i trá»ng yáº¿u trÆ°á»›c.

