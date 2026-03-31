**Project**: PronaFlow 
**Version**: 1.1 
**State**: Draft 
*Last updated: Jan 04, 2026*

---
# 1. Business Overview
Module nĂ y Ä‘áº¡i diá»‡n cho phĂ¢n há»‡ "Planning" (Hoáº¡ch Ä‘á»‹nh Dá»± Ă¡n) chuyĂªn sĂ¢u cá»§a dá»± Ă¡n. KhĂ¡c vá»›i viá»‡c quáº£n lĂ½ thá»±c thi hĂ ng ngĂ y (Task Execution - Module 4), module nĂ y táº­p truung vĂ o táº§m nhĂ¬n dĂ i háº¡n vĂ  sá»± phá»¥ thuá»™c giá»¯a cĂ¡c Ä‘áº§u viá»‡c.
**Triáº¿t lĂ½ Thiáº¿t káº¿**: "***Optional & Scalable***": Há»‡ thá»‘ng PronaFlow tĂ´n trá»ng quy mĂ´ cá»§a tá»«ng dá»± Ă¡n. KhĂ´ng pháº£i dá»± Ă¡n nĂ o cÅ©ng cáº§n biá»ƒu Ä‘á»“ Gantt phá»©c táº¡p hay cÆ¡ cháº¿ tĂ­nh toĂ¡n lá»‹ch trĂ¬nh.
- **Äá»‘i vá»›i dá»±a Ă¡n nhá»** (**Simple/Agile**): NgÆ°á»i dĂ¹ng cĂ³ thá»ƒ bá» qua module nĂ y. Há» chá»‰ cáº§n táº¡o Task List, Task vĂ  Subtask (nhÆ° Module 3&4 trĂ¬nh bĂ y) Ä‘á»ƒ quáº£n lĂ½ Dá»±a Ă¡n Ä‘Æ¡n giáº£n vĂ  gá»n nháº¹.
- **Äá»‘i vá»›i Dá»± Ă¡n lá»›n** (**Waterfall/Hybrid**): Project Leader cĂ³ thá»ƒ kĂ­ch há»£p cháº¿ Ä‘á»™ "Planning". Khi Ä‘Ă³, Project Leader cĂ³ thá»ƒ thá»±c hiá»‡n cĂ¡c tĂ¡c vá»¥ hoáº¡ch Ä‘á»‹nh dá»± Ă¡n, nhÆ° Gantt Chart, Resource Balancing vĂ  SLA Tracking.
# 2. User Stories & Acceptance Criteria

## 2.1. Feature: Interactive Gantt Chart (Biá»ƒu Ä‘á»“ Gantt tÆ°Æ¡ng tĂ¡c)
### User Story 5.1
LĂ  má»™t Project Manager, TĂ´i muá»‘n trá»±c quan hĂ³a lá»‹ch trĂ¬nh dá»± Ă¡n trĂªn biá»ƒu Ä‘á»“ Gantt vĂ  thao tĂ¡c kĂ©o tháº£, Äá»ƒ nhĂ¬n tháº¥y bá»©c tranh tá»•ng thá»ƒ vĂ  Ä‘iá»u chá»‰nh káº¿ hoáº¡ch nhanh chĂ³ng.
### Acceptance Criteria ( #AC)
#### AC 1 - Visualization Elements
- **Timeline:** Trá»¥c hoĂ nh hiá»ƒn thá»‹ thá»i gian (Zoom level: Day, Week, Month, Quarter).
- **Task Bars:**
    - Äá»™ dĂ i thanh = `Duration` (Start -> End).
    - MĂ u sáº¯c thá»ƒ hiá»‡n `Status` (Xanh: Done, Lam: In-progress).
    - Hiá»ƒn thá»‹ `% Progress` láº¥p Ä‘áº§y bĂªn trong thanh task.
- **Milestones:** Hiá»ƒn thá»‹ cĂ¡c Task cĂ³ cá» `Is Milestone = True` (tá»« Module 4) dÆ°á»›i dáº¡ng hĂ¬nh thoi (Diamond) mĂ u vĂ ng/Ä‘á».
#### AC 2 - Interaction (KĂ©o tháº£ thĂ´ng minh)
- **Move:** KĂ©o cáº£ thanh Task Ä‘á»ƒ dá»i ngĂ y (Shift Dates).
- **Resize:** KĂ©o cáº¡nh pháº£i Ä‘á»ƒ tÄƒng/giáº£m `Duration`.
- **Constraint:** Náº¿u Task cĂ³ Subtasks, thanh Task cha chá»‰ lĂ  bao hĂ¬nh (Wrapper), khĂ´ng thá»ƒ kĂ©o tháº£ trá»±c tiáº¿p (Thá»i gian Task cha tá»± Ä‘á»™ng = Min Start -> Max End cá»§a con).

## 2.2. Feature: Auto-Scheduling & Dependencies Impact
### User Story 5.2
LĂ  má»™t PM, TĂ´i muá»‘n há»‡ thá»‘ng tá»± Ä‘á»™ng tĂ­nh toĂ¡n láº¡i lá»‹ch trĂ¬nh khi cĂ³ thay Ä‘á»•i, Äá»ƒ Ä‘áº£m báº£o cĂ¡c rĂ ng buá»™c phá»¥ thuá»™c (Dependency) luĂ´n Ä‘Æ°á»£c tuĂ¢n thá»§ mĂ  khĂ´ng cáº§n chá»‰nh sá»­a thá»§ cĂ´ng hĂ ng trÄƒm task.
### Acceptance Criteria ( #AC)
#### AC 1 - Cascade Updates (Cáº­p nháº­t dĂ¢y chuyá»n)
- **Scenario:** Task A (Predecessor) bá»‹ trá»… 2 ngĂ y.
- **System Action:**
    - Tá»± Ä‘á»™ng dá»i `Start Date` cá»§a Task B (Successor - quan há»‡ FS) lĂ¹i láº¡i 2 ngĂ y.
    - Tiáº¿p tá»¥c dá»i Task C (Successor cá»§a B).
#### AC 2 - Conflict Highlighting
- Náº¿u viá»‡c dá»i lá»‹ch lĂ m vi pháº¡m `Hard Deadline` cá»§a Dá»± Ă¡n hoáº·c Task cha, há»‡ thá»‘ng hiá»ƒn thá»‹ Ä‘Æ°á»ng gáº¡ch chĂ©o Ä‘á» (Red Hash) trĂªn vĂ¹ng bá»‹ vi pháº¡m vĂ  hiá»‡n cáº£nh bĂ¡o: "Schedule Conflict".
#### AC 3 - Scheduling Mode (Cháº¿ Ä‘á»™ láº­p lá»‹ch)
- Cho phĂ©p thiáº¿t láº­p trĂªn tá»«ng Task:
    - **Auto-scheduled:** Tá»± Ä‘á»™ng trĂ´i theo Task trÆ°á»›c (Máº·c Ä‘á»‹nh).
    - **Manually-scheduled (Pinned):** Cá»‘ Ä‘á»‹nh ngĂ y, khĂ´ng bá»‹ áº£nh hÆ°á»Ÿng bá»Ÿi Auto-scheduling. Hiá»ƒn thá»‹ icon "CĂ¡i ghim" trĂªn thanh Task.
#### AC 4 - Lag & Lead Time Configuration
- **Interaction:** Khi click Ä‘Ăºp vĂ o Ä‘Æ°á»ng ná»‘i (Dependency Line) giá»¯a 2 Task, hiá»ƒn thá»‹ Modal/Popover cáº¥u hĂ¬nh.
- **Input:** Cho phĂ©p nháº­p sá»‘ ngĂ y lá»‡ch (Offset Days).
    - Sá»‘ dÆ°Æ¡ng (+2d): **Lag Time** (Chá» 2 ngĂ y).
    - Sá»‘ Ă¢m (-1d): **Lead Time** (LĂ m sá»›m 1 ngĂ y trÆ°á»›c khi viá»‡c trÆ°á»›c káº¿t thĂºc).
- **Calculation:** $Start(B) = End(A) + Offset$.
## 2.3. Feature: Critical Path Analysis (PhĂ¢n tĂ­ch ÄÆ°á»ng gÄƒng)
### User Story 5.3
LĂ  má»™t PM, TĂ´i muá»‘n biáº¿t nhá»¯ng cĂ´ng viá»‡c nĂ o lĂ  quan trá»ng nháº¥t quyáº¿t Ä‘á»‹nh thá»i gian hoĂ n thĂ nh dá»± Ă¡n, Äá»ƒ tĂ´i táº­p trung nguá»“n lá»±c vĂ o Ä‘Ă³ vĂ  khĂ´ng Ä‘á»ƒ chĂºng bá»‹ trá»….
### Acceptance Criteria ( #AC)
#### AC 1 - Highlight Critical Path
- **Toggle:** CĂ³ nĂºt báº­t/táº¯t "Show Critical Path".
- **Visual:** Khi báº­t, há»‡ thá»‘ng tĂ´ viá»n Ä‘á» Ä‘áº­m cho cĂ¡c Task náº±m trĂªn Ä‘Æ°á»ng gÄƒng (Tasks cĂ³ `Total Float = 0`).
#### AC 2 - Dynamic Recalculation
- Khi ngÆ°á»i dĂ¹ng rĂºt ngáº¯n thá»i gian má»™t Task trĂªn Ä‘Æ°á»ng gÄƒng, há»‡ thá»‘ng tĂ­nh toĂ¡n láº¡i. Náº¿u Ä‘Æ°á»ng gÄƒng thay Ä‘á»•i sang nhĂ¡nh khĂ¡c, cáº­p nháº­t highlight tá»©c thĂ¬.

## 2.4. Feature: Project Baselines (Váº¡ch cÆ¡ sá»Ÿ)
### User Story 5.4
LĂ  má»™t PM, TĂ´i muá»‘n lÆ°u láº¡i báº£n káº¿ hoáº¡ch ban Ä‘áº§u trÆ°á»›c khi dá»± Ă¡n cháº¡y, Äá»ƒ sau nĂ y so sĂ¡nh Ä‘Æ°á»£c thá»±c táº¿ Ä‘ang nhanh hay cháº­m hÆ¡n so vá»›i káº¿ hoáº¡ch gá»‘c.
### Acceptance Criteria ( #AC)
#### AC 1 - Create Snapshot
- **Action:** Chá»n "Save Baseline".
- **System:** LÆ°u báº£n sao (Snapshot) cá»§a `Start Date`, `End Date`, `Duration` cá»§a toĂ n bá»™ Task táº¡i thá»i Ä‘iá»ƒm Ä‘Ă³ vĂ o báº£ng `task_baselines`.
#### AC 2 - Visual Comparison
- TrĂªn Gantt Chart, hiá»ƒn thá»‹ 2 thanh song song cho má»—i Task:
    - **Thanh má» (Gray bar):** Káº¿ hoáº¡ch gá»‘c (Baseline).
    - **Thanh mĂ u (Colored bar):** Thá»±c táº¿ (Actual).
- GiĂºp PM nhĂ¬n tháº¥y trá»±c quan Ä‘á»™ lá»‡ch (Variance).

## 2.5. Feature: Workload & Resource Balancing (CĂ¢n báº±ng nguá»“n lá»±c)
### User Story 5.5
LĂ  má»™t PM, TĂ´i muá»‘n nhĂ¬n tháº¥y biá»ƒu Ä‘á»“ táº£i cĂ´ng viá»‡c cá»§a nhĂ¢n viĂªn ngay trong lĂºc láº­p káº¿ hoáº¡ch, Äá»ƒ trĂ¡nh viá»‡c giao quĂ¡ nhiá»u viá»‡c cho má»™t ngÆ°á»i trong cĂ¹ng má»™t ngĂ y (Overallocation).
### Acceptance Criteria ( #AC)
#### AC 1 - Resource Histogram
- DÆ°á»›i Gantt Chart cĂ³ má»™t panel hiá»ƒn thá»‹ biá»ƒu Ä‘á»“ cá»™t chá»“ng (Stacked Bar) cho tá»«ng nhĂ¢n sá»± theo ngĂ y.
- **NgÆ°á»¡ng:** Náº¿u tá»•ng giá» lĂ m viá»‡c dá»± kiáº¿n > 8h/ngĂ y -> Cá»™t chuyá»ƒn mĂ u Ä‘á» (Overload).
#### AC 2 - Soft Warning
- Khi gĂ¡n Task cho User A vĂ o khung giá» há» Ä‘Ă£ báº­n, hiá»ƒn thá»‹ Warning: "User A is overloaded on [Date]". Há»‡ thá»‘ng váº«n cho phĂ©p lÆ°u (Soft Constraint) nhÆ°ng cáº£nh bĂ¡o rá»§i ro.

## 2.6. Feature: Calendar View (Giao diá»‡n Lá»‹ch)
### User Story 5.6
LĂ  má»™t ThĂ nh viĂªn, TĂ´i muá»‘n xem cĂ¡c cĂ´ng viá»‡c cá»§a mĂ¬nh dÆ°á»›i dáº¡ng lá»‹ch thĂ¡ng/tuáº§n, Äá»ƒ dá»… hĂ¬nh dung lá»‹ch trĂ¬nh cĂ¡ nhĂ¢n.
### Acceptance Criteria ( #AC)
#### AC 1 - View Modes
- Há»— trá»£ xem theo ThĂ¡ng (Month), Tuáº§n (Week), NgĂ y (Day).
- Cho phĂ©p lá»c: "My Tasks", "Project Tasks".
#### AC 2 - External Sync (TĂ­ch há»£p Module 12)
- Cung cáº¥p link iCal/WebCal Ä‘á»ƒ Ä‘á»“ng bá»™ 1 chiá»u sang Google Calendar/Outlook.
## 2.7. Feature: SLA Tracking (Theo dĂµi Cam káº¿t Dá»‹ch vá»¥)
### User Story 5.7
LĂ  má»™t Quáº£n lĂ½, TĂ´i muá»‘n thiáº¿t láº­p vĂ  theo dĂµi SLA cho cĂ¡c Task quan trá»ng, Äá»ƒ Ä‘áº£m báº£o Ä‘á»™i ngÅ© khĂ´ng chá»‰ hoĂ n thĂ nh viá»‡c mĂ  cĂ²n Ä‘Ă¡p á»©ng Ä‘Ăºng cam káº¿t vá» thá»i gian pháº£n há»“i.
### Acceptance Criteria ( #AC)
#### AC 1 - SLA Definition
- Cho phĂ©p Ä‘á»‹nh nghÄ©a `SLA Policy` dá»±a trĂªn Ä‘á»™ Æ°u tiĂªn (Priority).
    - _Urgent:_ 4 giá» lĂ m viá»‡c.
    - _High:_ 1 ngĂ y lĂ m viá»‡c (8h).
    - _Normal:_ 3 ngĂ y lĂ m viá»‡c.
#### AC 2 - Business Hours Logic
- **Calculation:** Bá»™ Ä‘áº¿m thá»i gian (Timer) chá»‰ cháº¡y trong khung giá» lĂ m viá»‡c (vĂ­ dá»¥: 08:00 - 17:00, T2-T6).
- **Exclusion:** Tá»± Ä‘á»™ng trá»« cĂ¡c ngĂ y nghá»‰ lá»… (Holidays) vĂ  cuá»‘i tuáº§n (Weekends) Ä‘Æ°á»£c cáº¥u hĂ¬nh trong Workspace Settings.
#### AC 3 - Visual Warning
Há»‡ thá»‘ng hiá»ƒn thá»‹ tráº¡ng thĂ¡i SLA thĂ´ng qua mĂ£ mĂ u trĂªn tháº» Task:
- **On Track (Xanh):** Thá»i gian trĂ´i qua < 75% SLA.
- **At Risk (VĂ ng):** Thá»i gian trĂ´i qua $\geq$ 75% SLA.
- **Breached (Äá»):** Thá»i gian trĂ´i qua > 100% SLA.
#### AC 4 - SLA Pause Conditions
- **Logic:** Äá»“ng há»“ SLA (Timer) pháº£i **Táº¡m dá»«ng** khi Task chuyá»ƒn sang tráº¡ng thĂ¡i thuá»™c nhĂ³m `Blocking` (vĂ­ dá»¥: "Waiting for Customer", "Blocked").
- **Resume:** Äá»“ng há»“ tiáº¿p tá»¥c cháº¡y khi Task quay láº¡i tráº¡ng thĂ¡i `Active` (In-Progress).
- **Audit:** Ghi log láº¡i khoáº£ng thá»i gian bá»‹ Pause Ä‘á»ƒ giáº£i trĂ¬nh khi xuáº¥t bĂ¡o cĂ¡o.
## 2.8. Feature: Export & Reporting (Xuáº¥t dá»¯ liá»‡u)
### User Story 5.8 
- LĂ  má»™t PM, 
- TĂ´i muá»‘n xuáº¥t biá»ƒu Ä‘á»“ Gantt ra file áº£nh hoáº·c PDF, 
- Äá»ƒ bĂ¡o cĂ¡o tiáº¿n Ä‘á»™ trong cĂ¡c cuá»™c há»p vá»›i Ban lĂ£nh Ä‘áº¡o (nhá»¯ng ngÆ°á»i khĂ´ng truy cáº­p há»‡ thá»‘ng). 
### Acceptance Criteria ( #AC) 
#### AC 1 - Export Options 
- Há»— trá»£ xuáº¥t ra: PDF (A4/A3 Landscape), PNG. 
- TĂ¹y chá»n khoáº£ng thá»i gian xuáº¥t (ToĂ n bá»™ dá»± Ă¡n hoáº·c ThĂ¡ng nĂ y).
## 2.9. Feature: Planning Scope Control (Kiá»ƒm soĂ¡t pháº¡m vi hoáº¡ch Ä‘á»‹nh)
### Business Problem
Trong thá»±c táº¿:
- KhĂ´ng pháº£i **má»i Task** Ä‘á»u cáº§n:
    - Auto-scheduling
    - CPM
    - Dependency cascade
- PM thÆ°á»ng:
    - Chá»‰ hoáº¡ch Ä‘á»‹nh **Phase chĂ­nh**
    - Hoáº·c **Task Level cao**
    - CĂ²n Task chi tiáº¿t Ä‘á»ƒ team tá»± xá»­ lĂ½
Náº¿u khĂ´ng cĂ³ Scope Control:
- Gantt quĂ¡ phá»©c táº¡p
- CPM nhiá»…u
- Auto-scheduling phĂ¡ vá»¡ káº¿ hoáº¡ch vi mĂ´

> [!NOTE] Business Definition
> Planning Scope xĂ¡c Ä‘á»‹nh Task/Phase nĂ o Ä‘Æ°á»£c há»‡ thá»‘ng coi lĂ  Ä‘á»‘i tÆ°á»£ng hoáº¡ch Ä‘á»‹nh, tham gia vĂ o cĂ¡c thuáº­t toĂ¡n Scheduling, CPM vĂ  Impact Analystic.
### User Story 5.9
LĂ  má»™t Project Manager, tĂ´i muá»‘n chá»‰ Ä‘á»‹nh pháº¡m vi cĂ¡c Task/Phase Ä‘Æ°á»£c Ä‘Æ°a vĂ o hoáº¡ch Ä‘á»‹nh, Ä‘á»ƒ táº­p trung vĂ o káº¿ hoáº¡ch cáº¥p cao mĂ  khĂ´ng bá»‹ nhiá»…u bá»Ÿi cĂ¡c Task chi tiáº¿t.
### Acceptance Criteria ( #AC)
#### AC 1 â€“ Scope Flag
- Má»—i **Task / Task List / Phase** cĂ³ thuá»™c tĂ­nh:
    - `IncludeInPlanning: Boolean`
- Máº·c Ä‘á»‹nh:
    - Level cao (Phase, Task List): `true`
    - Subtask chi tiáº¿t: `false`
#### AC 2 â€“ Scope Inheritance
- Náº¿u Parent = `IncludeInPlanning = false`  
    â†’ toĂ n bá»™ Children **tá»± Ä‘á»™ng excluded**
- PM cĂ³ thá»ƒ override á»Ÿ Child (náº¿u Ä‘Æ°á»£c quyá»n)
#### AC 3 â€“ Behavior Rules
Task **khĂ´ng thuá»™c Planning Scope**:
- KhĂ´ng tham gia:
    - CPM
    - Auto-scheduling
    - Dependency cascade
-  Váº«n:
    - Hiá»ƒn thá»‹ trĂªn Gantt (mĂ u xĂ¡m nháº¡t)
    - CĂ³ thá»ƒ gĂ¡n ngÆ°á»i, cáº­p nháº­t tráº¡ng thĂ¡i
#### AC 4 â€“ Visual Distinction
- Task ngoĂ i scope:
    - Opacity giáº£m (30â€“40%)
    - KhĂ´ng váº½ dependency line
- Tooltip:
    > â€œThis task is excluded from planning scopeâ€
#### AC 5 â€“ Scope Summary
- Panel hiá»ƒn thá»‹:
    - Tá»•ng sá»‘ Task trong scope
    - % pháº¡m vi dá»± Ă¡n Ä‘Æ°á»£c hoáº¡ch Ä‘á»‹nh
## 2.10. Feature: What-If Simulation Mode
### Business Problem
PM thÆ°á»ng:
- Muá»‘n thá»­:
    - Dá»i Task
    - ThĂªm Dependency
    - RĂºt Duration
- NhÆ°ng:
    - Sá»£ phĂ¡ káº¿ hoáº¡ch tháº­t
    - KhĂ´ng tháº¥y trÆ°á»›c háº­u quáº£
KhĂ´ng cĂ³ Simulation = **Há»‡ thá»‘ng khĂ´ng an toĂ n cho quyáº¿t Ä‘á»‹nh chiáº¿n lÆ°á»£c**
### User Story 5.10.
LĂ  PM, tĂ´i muá»‘n mĂ´ phá»ng thay Ä‘á»•i lá»‹ch trĂ¬nh Ä‘á»ƒ tháº¥y tĂ¡c Ä‘á»™ng trÆ°á»›c khi quyáº¿t Ä‘á»‹nh Ă¡p dá»¥ng.
### Acceptance Criteria ( #AC)
#### AC 1 â€“ Enter Simulation Mode
- Toggle â€œSimulation Modeâ€
- UI chuyá»ƒn:
	 - MĂ u ná»n vĂ ng nháº¡t
	 - Watermark: _Simulation_
#### AC 2 â€“ Simulation Behavior
Trong Simulation:
- Cho phĂ©p:
	 - KĂ©o Gantt
	 - Äá»•i Dependency
	 - Thay Duration
- KhĂ´ng ghi DB chĂ­nh
- Táº¥t cáº£ thay Ä‘á»•i lÆ°u trong **temporary simulation graph**
#### AC 3 â€“ Impact Analysis Panel (Realtime)
Hiá»ƒn thá»‹:
- Î” Project End Date (+/- days)
- Tasks newly on Critical Path
- SLA at risk count
- Resource overload increase
#### AC 4 â€“ Exit Options
Khi thoĂ¡t Simulation:
- **Apply Changes**
	 - Ghi vĂ o DB
	 - Recalculate baseline variance
- **Discard**
	 - Rollback toĂ n bá»™
- **Save as New Baseline**
	 - Baseline v2 (optional)
### 3.5. Business Rules
- Simulation **khĂ´ng trigger notification**
- SLA Timer **khĂ´ng cháº¡y trong Simulation**
- Baseline cÅ© **khĂ´ng bá»‹ ghi Ä‘Ă¨**
## 2.11. Feature: Planning Governance & Approval Workflow
### User Story 5.11
LĂ  má»™t Program Manager, TĂ´i muá»‘n phĂª duyá»‡t vĂ  khĂ³a (Lock) káº¿ hoáº¡ch dá»± Ă¡n (Baseline) trÆ°á»›c khi Ä‘Æ°a vĂ o thá»±c thi, Äá»ƒ Ä‘áº£m báº£o tĂ­nh ká»· luáº­t vĂ  ngÄƒn cháº·n cĂ¡c thay Ä‘á»•i tĂ¹y tiá»‡n lĂ m sai lá»‡ch cam káº¿t vá»›i khĂ¡ch hĂ ng.
### Acceptance Criteria (#AC)
#### AC 1 - Plan State Machine
- Tráº¡ng thĂ¡i cá»§a Káº¿ hoáº¡ch (Plan) tuĂ¢n theo quy trĂ¬nh:
 1. **Draft:** PM Ä‘ang soáº¡n tháº£o, chá»‰nh sá»­a thoáº£i mĂ¡i.
 2. **Submitted:** Gá»­i yĂªu cáº§u phĂª duyá»‡t.
 3. **Approved:** ÄÆ°á»£c cáº¥p trĂªn phĂª duyá»‡t. Táº¡o Baseline chĂ­nh thá»©c.
 4. **Locked:** ÄĂ£ chá»‘t.
#### AC 2 - Locked State Behavior
- Khi Plan á»Ÿ tráº¡ng thĂ¡i **Locked**:
 - VĂ´ hiá»‡u hĂ³a tĂ­nh nÄƒng kĂ©o tháº£ trĂªn Gantt Chart.
 - KhĂ´ng cho phĂ©p thay Ä‘á»•i `Duration`, `Start/End Date` trá»±c tiáº¿p.
 - Má»i thay Ä‘á»•i báº¯t buá»™c pháº£i thĂ´ng qua quy trĂ¬nh **Change Request (CR)**.
#### AC 3 - Approval Audit
- Ghi nháº­n: NgÆ°á»i duyá»‡t, Thá»i gian duyá»‡t vĂ  Version cá»§a Baseline táº¡i thá»i Ä‘iá»ƒm duyá»‡t.
## 2.12. Feature: Change Impact Analysis (CIA) Panel
### User Story 5.12
LĂ  má»™t Project Manager, TĂ´i muá»‘n há»‡ thá»‘ng tá»± Ä‘á»™ng phĂ¢n tĂ­ch vĂ  cáº£nh bĂ¡o tĂ¡c Ä‘á»™ng cá»§a viá»‡c thay Ä‘á»•i má»™t Task cá»¥ thá»ƒ, Äá»ƒ tĂ´i hiá»ƒu rĂµ háº­u quáº£ (vá» tiáº¿n Ä‘á»™, chi phĂ­) trÆ°á»›c khi nháº¥n nĂºt LÆ°u.
### Acceptance Criteria (#AC)
#### AC 1 - Pre-save Analysis
- **Trigger:** Khi ngÆ°á»i dĂ¹ng thay Ä‘á»•i ngĂ y hoáº·c dependency cá»§a má»™t Task vĂ  nháº¥n Save.
- **Action:** Há»‡ thá»‘ng hiá»ƒn thá»‹ Panel "Impact Analysis" (chÆ°a ghi vĂ o DB ngay).
#### AC 2 - Impact Metrics
- Panel hiá»ƒn thá»‹ rĂµ cĂ¡c thĂ´ng sá»‘ thay Ä‘á»•i ($\Delta$):
 - **Project End Date:** Trá»… bao nhiĂªu ngĂ y? (VĂ­ dá»¥: +5 days).
 - **Critical Path:** Liá»‡t kĂª cĂ¡c Task má»›i bá»‹ rÆ¡i vĂ o Ä‘Æ°á»ng gÄƒng.
 - **SLA Risk:** Sá»‘ lÆ°á»£ng Task cĂ³ nguy cÆ¡ vi pháº¡m SLA do sá»± thay Ä‘á»•i nĂ y.
 - **Resource Overload:** Sá»‘ lÆ°á»£ng nhĂ¢n sá»± bá»‹ quĂ¡ táº£i do lá»‹ch má»›i.
#### AC 3 - Confirmation
- YĂªu cáº§u PM pháº£i tick chá»n: _"I understand the impact"_ (TĂ´i Ä‘Ă£ hiá»ƒu tĂ¡c Ä‘á»™ng) má»›i Ä‘Æ°á»£c phĂ©p LÆ°u thay Ä‘á»•i.
## 2.13. Feature: Planning Drift Analytics
### User Story 5.13
LĂ  má»™t Stakeholder, TĂ´i muá»‘n theo dĂµi Ä‘á»™ lá»‡ch tĂ­ch lÅ©y giá»¯a Káº¿ hoáº¡ch vĂ  Thá»±c thi theo thá»i gian, Äá»ƒ biáº¿t Ä‘Æ°á»£c dá»± Ă¡n Ä‘ang trá»… do khĂ¢u Láº­p káº¿ hoáº¡ch yáº¿u kĂ©m hay do khĂ¢u Thá»±c thi cháº­m cháº¡p.
### Acceptance Criteria (#AC)
#### AC 1 - Schedule Variance (SV) Tracking
- Há»‡ thá»‘ng tĂ­nh toĂ¡n chá»‰ sá»‘ SV theo tá»«ng giai Ä‘oáº¡n (Phase):
 $$SV = Earned\ Value (EV) - Planned\ Value (PV)$$
- Hiá»ƒn thá»‹ biá»ƒu Ä‘á»“ xu hÆ°á»›ng (Trendline) cá»§a SV qua cĂ¡c tuáº§n.
#### AC 2 - Phase Drift Heatmap
- Hiá»ƒn thá»‹ biá»ƒu Ä‘á»“ nhiá»‡t: Phase nĂ o bá»‹ lá»‡ch nhiá»u nháº¥t (VĂ­ dá»¥: Phase "Testing" thÆ°á»ng xuyĂªn bá»‹ trá»… 30% so vá»›i Baseline).
- **Insight:** Há»‡ thá»‘ng Ä‘Æ°a ra nháº­n Ä‘á»‹nh text: _"70% tá»•ng thá»i gian trá»… cá»§a dá»± Ă¡n Ä‘áº¿n tá»« giai Ä‘oáº¡n UAT"_.
## 2.14. Feature: Risk-aware Scheduling (Optional)
### User Story 5.14
LĂ  má»™t Risk Manager, TĂ´i muá»‘n láº­p lá»‹ch dá»± Ă¡n dá»±a trĂªn xĂ¡c suáº¥t rá»§i ro thay vĂ¬ cĂ¡c con sá»‘ cá»‘ Ä‘á»‹nh (Deterministic), Äá»ƒ cĂ³ cĂ¡i nhĂ¬n thá»±c táº¿ hÆ¡n vá» ngĂ y hoĂ n thĂ nh kháº£ dÄ© (P50/P90).
### Acceptance Criteria (#AC)
#### AC 1 - Risk Buffer Input
- Cho phĂ©p nháº­p **Risk Factor (%)** trĂªn tá»«ng Task hoáº·c cáº£ Project.
- Há»‡ thá»‘ng tá»± Ä‘á»™ng cá»™ng thĂªm **Buffer Time** vĂ o Ä‘uĂ´i Task nhÆ°ng Ä‘Ă¡nh dáº¥u rĂµ Ä‘Ă¢y lĂ  thá»i gian dá»± phĂ²ng (khĂ´ng pháº£i thá»i gian lĂ m viá»‡c chĂ­nh thá»©c).
#### AC 2 - Probabilistic Dates
- Thay vĂ¬ hiá»ƒn thá»‹ 1 ngĂ y káº¿t thĂºc duy nháº¥t, há»‡ thá»‘ng tĂ­nh toĂ¡n vĂ  hiá»ƒn thá»‹:
 - **P50 Date:** NgĂ y cĂ³ 50% kháº£ nÄƒng hoĂ n thĂ nh.
 - **P90 Date:** NgĂ y cĂ³ 90% kháº£ nÄƒng hoĂ n thĂ nh (An toĂ n Ä‘á»ƒ cam káº¿t vá»›i khĂ¡ch hĂ ng).
#### AC 3 - Confidence Band
- TrĂªn Gantt Chart, hiá»ƒn thá»‹ vĂ¹ng má» (Shaded area) phĂ­a sau thanh Task thá»ƒ hiá»‡n khoáº£ng thá»i gian rá»§i ro cĂ³ thá»ƒ xáº£y ra.
## 2.15. Feature: Planning Permissions (RBAC)
### User Story 5.15
LĂ  má»™t Admin, TĂ´i muá»‘n phĂ¢n quyá»n chi tiáº¿t cho viá»‡c láº­p káº¿ hoáº¡ch, Äá»ƒ phĂ¢n biá»‡t rĂµ ai lĂ  ngÆ°á»i thiáº¿t káº¿ lá»‹ch trĂ¬nh vĂ  ai chá»‰ lĂ  ngÆ°á»i Ä‘Ă³ng gĂ³p Ă½ kiáº¿n.
### Acceptance Criteria (#AC)
#### AC 1 - Planning Roles
- **Planner:** Quyá»n chá»‰nh sá»­a Gantt, táº¡o Dependency, lÆ°u Baseline.
- **Contributor:** Quyá»n xem Gantt, comment vĂ o Task, nhÆ°ng khĂ´ng Ä‘Æ°á»£c kĂ©o tháº£ lá»‹ch.
- **Approver:** Quyá»n duyá»‡t Baseline (Feature 2.11).
#### AC 2 - Edit Lock
- Khi má»™t Planner Ä‘ang chá»‰nh sá»­a lá»‹ch trĂ¬nh (Edit Mode), há»‡ thá»‘ng khĂ³a quyá»n sá»­a cá»§a cĂ¡c Planner khĂ¡c Ä‘á»ƒ trĂ¡nh xung Ä‘á»™t (Concurrent Editing Lock).
## 2.16. Feature: Advanced Planning Utilities
### User Story 5.16
LĂ  má»™t PM chuyĂªn nghiá»‡p, TĂ´i muá»‘n cĂ³ cĂ¡c cĂ´ng cá»¥ tiá»‡n Ă­ch nĂ¢ng cao Ä‘á»ƒ thao tĂ¡c trĂªn biá»ƒu Ä‘á»“ Gantt nhanh chĂ³ng vĂ  chĂ­nh xĂ¡c.
### Acceptance Criteria (#AC)
#### AC 1 - Gantt Undo/Redo
- Há»— trá»£ `Ctrl+Z` / `Ctrl+Y` Ä‘á»ƒ hoĂ n tĂ¡c cĂ¡c hĂ nh Ä‘á»™ng kĂ©o tháº£ nháº§m trĂªn Gantt Chart (LÆ°u state táº¡m á»Ÿ Client).
#### AC 2 - Baseline Versioning
- Quáº£n lĂ½ danh sĂ¡ch cĂ¡c Baseline: `v1.0 (Initial)`, `v1.1 (Change Request #1)`, `v2.0 (Replanned)`.
- Cho phĂ©p chuyá»ƒn Ä‘á»•i view Ä‘á»ƒ so sĂ¡nh giá»¯a cĂ¡c version Baseline khĂ¡c nhau.
#### AC 3 - Freeze Window
- Cho phĂ©p thiáº¿t láº­p "VĂ¹ng Ä‘Ă³ng bÄƒng" (VĂ­ dá»¥: 2 tuáº§n tá»›i).
- CĂ¡c Task náº±m trong vĂ¹ng nĂ y bá»‹ khĂ³a cá»©ng, khĂ´ng cho phĂ©p Auto-scheduling tá»± Ä‘á»™ng dá»i lá»‹ch, Ä‘á»ƒ Ä‘áº£m báº£o á»•n Ä‘á»‹nh cho team Ä‘ang cháº¡y Sprint.
## 2.17. Feature: Automated Resource Leveling (CĂ¢n báº±ng Nguá»“n lá»±c Tá»± Ä‘á»™ng)
### User Story 5.17
LĂ  má»™t Project Manager, TĂ´i muá»‘n há»‡ thá»‘ng tá»± Ä‘á»™ng Ä‘iá»u chá»‰nh lá»‹ch trĂ¬nh cá»§a cĂ¡c cĂ´ng viá»‡c khĂ´ng quan trá»ng Ä‘á»ƒ giáº£i quyáº¿t tĂ¬nh tráº¡ng quĂ¡ táº£i nhĂ¢n sá»±, Äá»ƒ tá»‘i Æ°u hĂ³a nguá»“n lá»±c mĂ  khĂ´ng cáº§n pháº£i dá»i tá»«ng Task thá»§ cĂ´ng.
### Acceptance Criteria (#AC)
#### AC 1 - Leveling Strategy Configuration
- **Action:** Khi nháº¥n nĂºt "Level Resources", hiá»ƒn thá»‹ Popup cho phĂ©p chá»n chiáº¿n lÆ°á»£c:
    1. **Within Slack (An toĂ n):** Chá»‰ dá»i cĂ¡c Task cĂ³ Ä‘á»™ trĂ´i (`Total Float > 0`). Äáº£m báº£o **khĂ´ng** lĂ m trá»… ngĂ y káº¿t thĂºc dá»± Ă¡n.
    2. **Extend Project (ToĂ n diá»‡n):** Dá»i báº¥t ká»³ Task nĂ o gĂ¢y quĂ¡ táº£i. Cháº¥p nháº­n viá»‡c ngĂ y káº¿t thĂºc dá»± Ă¡n bá»‹ kĂ©o dĂ i ra.
#### AC 2 - Heuristic Priority Logic
- Há»‡ thá»‘ng sá»­ dá»¥ng thuáº­t toĂ¡n Æ°u tiĂªn Ä‘á»ƒ chá»n Task nĂ o sáº½ bá»‹ dá»i (Delay) khi cĂ³ xung Ä‘á»™t tĂ i nguyĂªn:
    - **Priority 1:** Task cĂ³ Ä‘á»™ Æ°u tiĂªn tháº¥p hÆ¡n (Low Priority).
    - **Priority 2:** Task cĂ³ Ä‘á»™ trĂ´i (Float) lá»›n hÆ¡n.
    - **Priority 3:** Task cĂ³ thá»i lÆ°á»£ng (Duration) ngáº¯n hÆ¡n.
#### AC 3 - Visualization & Diff
- **Preview:** TrÆ°á»›c khi Ă¡p dá»¥ng, há»‡ thá»‘ng hiá»ƒn thá»‹ báº£n xem trÆ°á»›c (Shadow Bars) cá»§a lá»‹ch trĂ¬nh má»›i chá»“ng lĂªn lá»‹ch trĂ¬nh cÅ©.
- **Diff:** Hiá»ƒn thá»‹ tĂ³m táº¯t tĂ¡c Ä‘á»™ng: _"Sáº½ dá»i 5 Tasks, giáº£m 80% xung Ä‘á»™t, ngĂ y káº¿t thĂºc dá»± Ă¡n tÄƒng 2 ngĂ y"_.
#### AC 4 - Constraint Adherence
- Thuáº­t toĂ¡n Leveling **tuyá»‡t Ä‘á»‘i khĂ´ng** Ä‘Æ°á»£c dá»i cĂ¡c Task:
    - Äang á»Ÿ tráº¡ng thĂ¡i `Started` / `Done`.
    - CĂ³ rĂ ng buá»™c cá»©ng (`Must Start On`, `Locked`).
    - Task Ä‘Ă£ Ä‘Æ°á»£c phĂª duyá»‡t trong Freeze Window (Feature 5.16).
## 2.18. Feature: Cross-Project Dependencies (Phá»¥ thuá»™c Äa Dá»± Ă¡n)
### User Story 5.18
LĂ  má»™t Program Manager, TĂ´i muá»‘n thiáº¿t láº­p má»‘i quan há»‡ phá»¥ thuá»™c giá»¯a cĂ¡c cĂ´ng viá»‡c thuá»™c hai dá»± Ă¡n khĂ¡c nhau, Äá»ƒ nhĂ¬n tháº¥y bá»©c tranh tá»•ng thá»ƒ vĂ  Ä‘Ă¡nh giĂ¡ Ä‘Æ°á»£c tĂ¡c Ä‘á»™ng dĂ¢y chuyá»n (Domino Effect) khi má»™t dá»± Ă¡n thĂ nh pháº§n bá»‹ cháº­m trá»….
### Acceptance Criteria (#AC)
#### AC 1 - External Predecessor Selection
- **Action:** Trong há»™p thoáº¡i "Add Dependency", bá»• sung tĂ¹y chá»n: _Source = External Project_.
- **Interaction:**
    1. Chá»n Dá»± Ă¡n nguá»“n (Dropdown list - chá»‰ hiá»‡n cĂ¡c dá»± Ă¡n User cĂ³ quyá»n truy cáº­p).
    2. TĂ¬m kiáº¿m Task nguá»“n (Search by Name/ID).
    3. Chá»n loáº¡i quan há»‡ (FS/SS...).
- **Result:** Táº¡o má»™t liĂªn káº¿t logic giá»¯a Task A (Project 1) vĂ  Task B (Project 2).
#### AC 2 - Ghost Task Visualization (Hiá»ƒn thá»‹ Task "BĂ³ng ma")
- TrĂªn biá»ƒu Ä‘á»“ Gantt cá»§a Dá»± Ă¡n Ä‘Ă­ch (Project 2)
    - Hiá»ƒn thá»‹ Task nguá»“n (tá»« Project 1) dÆ°á»›i dáº¡ng **"Ghost Bar"** (Thanh má», mĂ u xĂ¡m nháº¡t, nĂ©t Ä‘á»©t).
    - **Tooltip:** Khi hover vĂ o Ghost Bar, hiá»ƒn thá»‹ rĂµ: _"External Dependency: [Project 1] - Task A - End: 15/10/2025"_.
    - KhĂ´ng cho phĂ©p sá»­a Ä‘á»•i Ghost Task nĂ y táº¡i Ä‘Ă¢y (Read-only).
#### AC 3 - Impact Propagation (Lan truyá»n tĂ¡c Ä‘á»™ng)
- **Scenario:** Khi Task A (Project 1) bá»‹ dá»i ngĂ y káº¿t thĂºc trá»… 3 ngĂ y.
- **System Action:**
    - Tá»± Ä‘á»™ng tĂ­nh toĂ¡n láº¡i ngĂ y báº¯t Ä‘áº§u cá»§a Task B (Project 2).
    - Gá»­i thĂ´ng bĂ¡o **Critical Alert** cho PM cá»§a Project 2: _"Task B is impacted by delay in Project 1"_.
    - ÄĂ¡nh dáº¥u tráº¡ng thĂ¡i **"Sync Pending"** trĂªn Gantt Chart náº¿u Project 2 Ä‘ang bá»‹ Lock/Freeze.
## 2.19. Feature: Calendar Exception Handling (Xá»­ lĂ½ Ngoáº¡i lá»‡ Lá»‹ch biá»ƒu)
### User Story 5.19
LĂ  má»™t ThĂ nh viĂªn dá»± Ă¡n, TĂ´i muá»‘n Ä‘Äƒng kĂ½ lá»‹ch nghá»‰ phĂ©p (Leave Request) vĂ  há»‡ thá»‘ng tá»± Ä‘á»™ng cáº­p nháº­t láº¡i káº¿ hoáº¡ch cĂ¡c Task Ä‘Æ°á»£c gĂ¡n cho tĂ´i, Äá»ƒ PM khĂ´ng pháº£i Ä‘iá»u chá»‰nh thá»§ cĂ´ng vĂ  Deadline Ä‘Æ°á»£c tĂ­nh toĂ¡n chĂ­nh xĂ¡c.
### Acceptance Criteria (#AC)
#### AC 1 - Personal Exception Input (ÄÄƒng kĂ½ ngoáº¡i lá»‡ cĂ¡ nhĂ¢n)
- **Action:** User cĂ³ thá»ƒ Ä‘Ă¡nh dáº¥u cĂ¡c ngĂ y cá»¥ thá»ƒ trĂªn Calendar cĂ¡ nhĂ¢n lĂ : _Vacation_, _Sick Leave_, hoáº·c _Half-day Off_.
- **Sync:** Dá»¯ liá»‡u nĂ y cĂ³ thá»ƒ Ä‘Æ°á»£c Ä‘á»“ng bá»™ tá»« module HRM (náº¿u cĂ³ tĂ­ch há»£p) hoáº·c nháº­p tay.
#### AC 2 - Availability Conflict Warning
- **Scenario:** Khi PM gĂ¡n Task cho User A vĂ o ngĂ y há» Ä‘Ă£ Ä‘Äƒng kĂ½ nghá»‰ phĂ©p.
- **System Action:**
    - Hiá»ƒn thá»‹ cáº£nh bĂ¡o: _"User A is unavailable on [Date] due to [Reason]"_.
    - Äá» xuáº¥t: _"GĂ¡n cho ngÆ°á»i khĂ¡c"_ hoáº·c _"Tá»± Ä‘á»™ng kĂ©o dĂ i Task qua ngĂ y nghá»‰"_.
#### AC 3 - Task Splitting (Chia tĂ¡ch cĂ´ng viá»‡c)
- **Logic:** Náº¿u má»™t Task dĂ i 5 ngĂ y (T2 -> T6) nhÆ°ng User nghá»‰ phĂ©p vĂ o Thá»© 4.
- **Result:** Há»‡ thá»‘ng tá»± Ä‘á»™ng chia Task thĂ nh 2 phĂ¢n Ä‘oáº¡n (Segments) trĂªn Gantt Chart:
    - Segment 1: T2, T3.
    - Segment 2: T5, T6, T7 (KĂ©o dĂ i thĂªm 1 ngĂ y lĂ m viá»‡c Ä‘á»ƒ bĂ¹ cho Thá»© 4).
    - NgĂ y Thá»© 4 Ä‘Æ°á»£c tĂ´ xĂ¡m (Non-working) trĂªn dĂ²ng Task Ä‘Ă³.
# 3. Business Rules (Quy táº¯c Nghiá»‡p vá»¥)
## 3.1. Quy táº¯c ToĂ n váº¹n Thá»i gian (Temporal Integrity)
1. **Parent-Child Constraint:** Khoáº£ng thá»i gian cá»§a Task List (Parent) lĂ  bao trĂ¹m (union) cá»§a táº¥t cáº£ cĂ¡c Task con.
    - $Start(Parent) = \min(Start(Children))$
    - $End(Parent) = \max(End(Children))$
2. **Milestone Logic:** Milestone lĂ  má»™t Ä‘iá»ƒm thá»i gian, khĂ´ng cĂ³ thá»i lÆ°á»£ng ($Duration = 0$). Milestone khĂ´ng thá»ƒ cĂ³ Subtask.
## 3.2. Quy táº¯c Láº­p lá»‹ch (Scheduling Rules)
- **Dependency:** Máº·c Ä‘á»‹nh FS (Finish-to-Start). Náº¿u vi pháº¡m (Task sau báº¯t Ä‘áº§u trÆ°á»›c khi Task trÆ°á»›c káº¿t thĂºc), há»‡ thá»‘ng tá»± Ä‘á»™ng Ä‘áº©y Task sau lĂ¹i láº¡i (trá»« khi Task sau Ä‘ang á»Ÿ cháº¿ Ä‘á»™ *Pinned*).
- **Non-working Days:** Task tá»± Ä‘á»™ng kĂ©o dĂ i qua ngĂ y nghá»‰. VĂ­ dá»¥: Task 2 ngĂ y báº¯t Ä‘áº§u thá»© 6 sáº½ káº¿t thĂºc vĂ o thá»© 2 (náº¿u T7, CN nghá»‰).
## 3.3. Quy táº¯c SLA (Service Level Agreement)
- **SLA Timer:** Chá»‰ cháº¡y trong giá» hĂ nh chĂ­nh (Working Hours: 08:00 - 17:00).
- **Breach Logic:**
    - Khi thá»i gian thá»±c hiá»‡n > SLA quy Ä‘á»‹nh (theo Priority trong Module 4).
    - HĂ nh Ä‘á»™ng: Gá»­i email cho Manager + Äá»•i mĂ u Task sang Äá».
## 3.4. Quy táº¯c RĂ ng buá»™c Task (Constraint Types)
Há»‡ thá»‘ng phĂ¢n biá»‡t 2 loáº¡i rĂ ng buá»™c ngĂ y thĂ¡ng Ä‘á»ƒ xá»­ lĂ½ xung Ä‘á»™t:
1. **Soft Constraint (Má»m):** "Start No Earlier Than".
    - Ăp dá»¥ng cho Task thÆ°á»ng.
    - _HĂ nh vi:_ Náº¿u Task trÆ°á»›c bá»‹ Ä‘áº©y lĂ¹i, Task nĂ y trĂ´i theo.
2. **Hard Constraint (Cá»©ng):** "Must Start On" / "Must Finish On".
    - Ăp dá»¥ng cho Task cĂ³ cháº¿ Ä‘á»™ **Pinned** (Ghim).
    - _HĂ nh vi:_ Há»‡ thá»‘ng **khĂ´ng bao giá»** tá»± Ä‘á»™ng thay Ä‘á»•i ngĂ y cá»§a Task nĂ y. Náº¿u Task trÆ°á»›c Ä‘áº©y lĂ¹i Ä‘Ă¨ lĂªn ngĂ y cá»§a Task nĂ y -> BĂ¡o lá»—i xung Ä‘á»™t (Conflict) Ä‘á» rá»±c trĂªn UI.
## 3.5. Quy táº¯c Äa MĂºi giá» (Multi-Timezone Strategy)
- **LÆ°u trá»¯:** Má»i thá»i gian trong Database pháº£i lÆ°u dÆ°á»›i dáº¡ng chuáº©n **UTC**.
- **Hiá»ƒn thá»‹:** Gantt Chart hiá»ƒn thá»‹ theo mĂºi giá» cá»§a **Project Settings** (khĂ´ng pháº£i mĂºi giá» cá»§a User Ä‘ang xem).
    - _LĂ½ do:_ Äáº£m báº£o táº¥t cáº£ thĂ nh viĂªn nhĂ¬n tháº¥y cĂ¹ng má»™t káº¿ hoáº¡ch thá»‘ng nháº¥t, trĂ¡nh viá»‡c User á»Ÿ Má»¹ tháº¥y Task báº¯t Ä‘áº§u thá»© 5, User á»Ÿ Viá»‡t Nam tháº¥y báº¯t Ä‘áº§u thá»© 6 gĂ¢y hiá»ƒu láº§m deadline.
## 3.6. Quy táº¯c Leo thang SLA (SLA Escalation Rule)
- **CÆ¡ cháº¿:** Náº¿u má»™t Task bá»‹ vi pháº¡m SLA (Breached) vĂ  khĂ´ng Ä‘Æ°á»£c xá»­ lĂ½ trong vĂ²ng X giá» tiáº¿p theo:
    1. **Level 1:** Gá»­i email nháº¯c nhá»Ÿ Assignee.
    2. **Level 2:** Gá»­i thĂ´ng bĂ¡o cho Line Manager.
    3. **Level 3 (Auto-Action):** Tá»± Ä‘á»™ng chuyá»ƒn Task sang tráº¡ng thĂ¡i "At Risk" hoáº·c Re-assign cho Team Lead (tĂ¹y cáº¥u hĂ¬nh).
## 3.7. Quy táº¯c Kiá»ƒm toĂ¡n Láº­p lá»‹ch (Planning Audit Trail)
- Má»i thay Ä‘á»•i tĂ¡c Ä‘á»™ng Ä‘áº¿n **Start Date**, **End Date**, **Duration**, hoáº·c **Dependency** Ä‘á»u pháº£i lÆ°u váº¿t:
    - _Who:_ Ai thay Ä‘á»•i?
    - _From:_ GiĂ¡ trá»‹ cÅ© (Old Value).
    - _To:_ GiĂ¡ trá»‹ má»›i (New Value).
    - _Reason:_ LĂ½ do thay Ä‘á»•i (báº¯t buá»™c nháº­p náº¿u Dá»± Ă¡n Ä‘ang á»Ÿ tráº¡ng thĂ¡i Locked/In-Progress).
## 3.8. Quy táº¯c Báº£o toĂ n ÄÆ°á»ng gÄƒng (Critical Path Preservation Rule)
- Trong cháº¿ Ä‘á»™ Leveling máº·c Ä‘á»‹nh (_Within Slack_), há»‡ thá»‘ng Ä‘Æ°á»£c phĂ©p tiĂªu thá»¥ **Free Float** (Ä‘á»™ trĂ´i tá»± do) cá»§a Task.
- Náº¿u viá»‡c dá»i Task lĂ m tiĂªu tá»‘n háº¿t Float vĂ  biáº¿n Task Ä‘Ă³ thĂ nh Critical Task (Float = 0), há»‡ thá»‘ng pháº£i dá»«ng láº¡i vĂ  khĂ´ng dá»i thĂªm ná»¯a, ngay cáº£ khi nhĂ¢n sá»± váº«n cĂ²n quĂ¡ táº£i (Æ°u tiĂªn Deadline hÆ¡n Resource).
## 3.9. Quy táº¯c ToĂ n váº¹n Tham chiáº¿u ChĂ©o (Cross-Reference Integrity)
- **Permission Check:** Äá»ƒ táº¡o Dependency chĂ©o, ngÆ°á»i dĂ¹ng pháº£i cĂ³ quyá»n **View** á»Ÿ Dá»± Ă¡n nguá»“n vĂ  quyá»n **Edit** á»Ÿ Dá»± Ă¡n Ä‘Ă­ch.
- **Broken Link Handling:** Náº¿u Task nguá»“n (Project 1) bá»‹ xĂ³a hoáº·c Dá»± Ă¡n 1 bá»‹ Archive:
    - Há»‡ thá»‘ng **khĂ´ng** xĂ³a Dependency mĂ  chuyá»ƒn nĂ³ sang tráº¡ng thĂ¡i **"Broken"** (GĂ£y liĂªn káº¿t).
    - Hiá»ƒn thá»‹ icon cáº£nh bĂ¡o tam giĂ¡c vĂ ng trĂªn Task Ä‘Ă­ch (Project 2) Ä‘á»ƒ PM biáº¿t vĂ  xá»­ lĂ½ thá»§ cĂ´ng (XĂ³a link hoáº·c ná»‘i láº¡i vĂ o Task khĂ¡c).
## 3.10. Quy táº¯c Thá»© báº­c Lá»‹ch biá»ƒu (Calendar Hierarchy Precedence)
Há»‡ thá»‘ng Ă¡p dá»¥ng cÆ¡ cháº¿ **"Calendar Layering"** (Lá»›p lá»‹ch) Ä‘á»ƒ xĂ¡c Ä‘á»‹nh má»™t ngĂ y cá»¥ thá»ƒ lĂ  "Working" hay "Non-working". Thá»© tá»± Æ°u tiĂªn tá»« cao xuá»‘ng tháº¥p nhÆ° sau:
1. **Individual Exception:** Lá»‹ch nghá»‰ phĂ©p/lĂ m bĂ¹ cá»§a tá»«ng cĂ¡ nhĂ¢n (Cao nháº¥t).
2. **Project Calendar:** Lá»‹ch Ä‘áº·c thĂ¹ cá»§a dá»± Ă¡n (vĂ­ dá»¥: Team onsite lĂ m viá»‡c cáº£ T7 Ä‘á»ƒ ká»‹p tiáº¿n Ä‘á»™).
3. **Workspace Calendar:** Lá»‹ch nghá»‰ lá»… chung cá»§a cĂ´ng ty (Quá»‘c khĂ¡nh, Táº¿t)
4. **System Default:** T2-T6, 09:00-18:00 (Tháº¥p nháº¥t). -> _VĂ­ dá»¥:_ Náº¿u CĂ´ng ty nghá»‰ lá»… (Layer 3), nhÆ°ng Dá»± Ă¡n quy Ä‘á»‹nh lĂ m viá»‡c (Layer 2) -> NgĂ y Ä‘Ă³ lĂ  Working Day cho team dá»± Ă¡n Ä‘Ă³.
# 4. Theoretical Basis & Algorithms (CÆ¡ sá»Ÿ LĂ½ luáº­n & Thuáº­t toĂ¡n)
## 4.1. PhÆ°Æ¡ng phĂ¡p ÄÆ°á»ng gÄƒng (Critical Path Method - CPM)
Há»‡ thá»‘ng tá»± Ä‘á»™ng xĂ¡c Ä‘á»‹nh chuá»—i cĂ¡c cĂ´ng viá»‡c quyáº¿t Ä‘á»‹nh thá»i gian hoĂ n thĂ nh dá»± Ă¡n.
- **Forward Pass (TĂ­nh toĂ¡n xuĂ´i):** XĂ¡c Ä‘á»‹nh thá»i gian sá»›m nháº¥t ($ES, EF$).
    - $ES(Task) = \max(EF(Predecessors))$
    - $EF(Task) = ES(Task) + Duration$
- **Backward Pass (TĂ­nh toĂ¡n ngÆ°á»£c):** XĂ¡c Ä‘á»‹nh thá»i gian muá»™n nháº¥t ($LS, LF$).
    - $LF(Task) = \min(LS(Successors))$
    - $LS(Task) = LF(Task) - Duration$
- **Float/Slack (Äá»™ trĂ´i):** $Float = LS - ES$.
    - Náº¿u $Float = 0$: Task náº±m trĂªn Ä‘Æ°á»ng gÄƒng (Critical Task). Báº¥t ká»³ sá»± cháº­m trá»… nĂ o cá»§a task nĂ y Ä‘á»u lĂ m trá»… cáº£ dá»± Ă¡n. Há»‡ thá»‘ng sáº½ tĂ´ Ä‘á» cĂ¡c task nĂ y trĂªn Gantt Chart.
## 4.2. Thuáº­t toĂ¡n tĂ­nh toĂ¡n SLA (SLA Calculation Algorithm)
ÄĂ¢y lĂ  thuáº­t toĂ¡n xá»­ lĂ½ sá»± chĂªnh lá»‡ch giá»¯a thá»i gian thá»±c táº¿ (Calendar Time) vĂ  thá»i gian lĂ m viá»‡c (Business Time).
CĂ´ng thá»©c xĂ¡c Ä‘á»‹nh thá»i Ä‘iá»ƒm vi pháº¡m ($T_{breach}$):
$$T_{breach} = T_{start} + D_{sla} + \sum T_{off\_shift} + \sum T_{holidays}$$
**Trong Ä‘Ă³:**
- $T_{start}$: Thá»i Ä‘iá»ƒm báº¯t Ä‘áº§u tĂ­nh giá» (Status chuyá»ƒn sang In-Progress).
- $D_{sla}$: Thá»i lÆ°á»£ng cam káº¿t (vĂ­ dá»¥: 4 giá»).
- $\sum T_{off\_shift}$: Tá»•ng thá»i gian ngoĂ i giá» hĂ nh chĂ­nh náº±m giá»¯a khoáº£ng thá»i gian xá»­ lĂ½.
- $\sum T_{holidays}$: Tá»•ng thá»i gian cĂ¡c ngĂ y lá»…/nghá»‰ phĂ©p.
_VĂ­ dá»¥ minh há»a:_
- SLA: 4 giá».
- Start: 16:00 Thá»© SĂ¡u.
- Giá» lĂ m viá»‡c: 08:00 - 17:00 (Nghá»‰ trÆ°a 12:00-13:00).
- TĂ­nh toĂ¡n:
    - 16:00 -> 17:00 Thá»© 6: TiĂªu tá»‘n 1 giá». (CĂ²n láº¡i 3h).
    - 17:00 T6 -> 08:00 Thá»© 2: Off-shift (Cuá»‘i tuáº§n).
    - 08:00 -> 11:00 Thá»© 2: TiĂªu tá»‘n 3 giá».
- **Káº¿t quáº£:** $T_{breach}$ lĂ  11:00 Thá»© Hai tuáº§n káº¿ tiáº¿p.
## 4.3. Thuáº­t toĂ¡n CĂ¢n báº±ng Nguá»“n lá»±c (Resource Leveling Heuristics)
PronaFlow giáº£i quyáº¿t bĂ i toĂ¡n "Resource Constrained Scheduling Problem" (RCSP) - má»™t bĂ i toĂ¡n NP-Hard - báº±ng phÆ°Æ¡ng phĂ¡p Heuristic (Quy táº¯c kinh nghiá»‡m) thay vĂ¬ tá»‘i Æ°u hĂ³a toĂ¡n há»c tuyá»‡t Ä‘á»‘i (vĂ¬ quĂ¡ tá»‘n tĂ i nguyĂªn tĂ­nh toĂ¡n).
- **NguyĂªn lĂ½ "Song song":**
    1. Sáº¯p xáº¿p danh sĂ¡ch táº¥t cáº£ cĂ¡c Task theo thá»i gian báº¯t Ä‘áº§u ($ES$).
    2. Duyá»‡t qua tá»«ng Ä‘Æ¡n vá»‹ thá»i gian (t) tá»« Ä‘áº§u Ä‘áº¿n cuá»‘i dá»± Ă¡n.
    3. Táº¡i má»—i thá»i Ä‘iá»ƒm $t$, tĂ­nh tá»•ng nhu cáº§u tĂ i nguyĂªn $R(t)$.
    4. Náº¿u $R(t) > Capacity_{limit}$:
        - Chá»n táº­p há»£p cĂ¡c Task Ä‘ang tranh cháº¥p tĂ i nguyĂªn.
        - Giá»¯ láº¡i Task cĂ³ _Priority_ cao nháº¥t hoáº·c _Slack_ Ă­t nháº¥t.
        - Äáº©y lĂ¹i ($Delay$) cĂ¡c Task cĂ²n láº¡i sang thá»i Ä‘iá»ƒm $t+1$.
    5. Cáº­p nháº­t láº¡i máº¡ng lÆ°á»›i Dependency vĂ  tĂ­nh láº¡i $ES, LS$.
- **Káº¿t quáº£:** Táº¡o ra má»™t lá»‹ch trĂ¬nh kháº£ thi vá» máº·t váº­t lĂ½ (khĂ´ng ai lĂ m quĂ¡ 24h/ngĂ y) vá»›i sá»± thay Ä‘á»•i tá»‘i thiá»ƒu so vá»›i káº¿ hoáº¡ch gá»‘c.
## 4.4. PhÆ°Æ¡ng phĂ¡p ÄÆ°á»ng gÄƒng Äa dá»± Ă¡n (Multi-Project Critical Path Method - MCPM)
- **Váº¥n Ä‘á»:** Trong mĂ´i trÆ°á»ng Ä‘a dá»± Ă¡n, Ä‘Æ°á»ng gÄƒng cá»§a Dá»± Ă¡n B cĂ³ thá»ƒ khĂ´ng náº±m trong ná»™i bá»™ Dá»± Ă¡n B, mĂ  bá»‹ chi phá»‘i bá»Ÿi má»™t Task náº±m á»Ÿ Dá»± Ă¡n A.
- **Giáº£i phĂ¡p:** PronaFlow xĂ¢y dá»±ng Ä‘á»“ thá»‹ phá»¥ thuá»™c áº£o (Virtual Dependency Graph) káº¿t ná»‘i cĂ¡c nĂºt giá»¯a cĂ¡c dá»± Ă¡n khĂ¡c nhau.
    - Khi tĂ­nh toĂ¡n CPM cho Project B, há»‡ thá»‘ng coi Task A (External) nhÆ° má»™t rĂ ng buá»™c cá»©ng vá» thá»i gian ($Start \geq End_{external}$).
    - Äiá»u nĂ y giĂºp Ban lĂ£nh Ä‘áº¡o nhĂ¬n tháº¥y **"Global Critical Path"** (ÄÆ°á»ng gÄƒng toĂ n cá»¥c) cá»§a cáº£ chÆ°Æ¡ng trĂ¬nh.
## 4.n. Biá»ƒu Ä‘á»“ Logic SLA
```mermaid
flowchart TD
    Start([Task Created]) --> GetSLA{Get SLA Duration based on Priority}
    GetSLA --> CheckTime{Is currently Working Hours?}
    
    CheckTime -- No --> Wait[Wait for next Shift]
    Wait --> StartTimer
    CheckTime -- Yes --> StartTimer[Start Countdown]
    
    StartTimer --> Monitor{Monitoring Loop}
    Monitor -- Weekend/Holiday --> Pause[Pause Timer]
    Pause --> Monitor
    
    Monitor -- Status = Pending/Blocked --> PauseLogic[Pause Timer - External Blocker]
    PauseLogic --> Monitor
    
    Monitor -- Working Time & In-Progress --> Count[Decrease Remaining Time]
    
    Count --> CheckZero{Remaining <= 0?}
    CheckZero -- Yes --> Breach[Trigger SLA Breach Event]
    CheckZero -- No --> CheckDone{Task Done?}
    
    CheckDone -- Yes --> Stop[Stop Timer & Log Actual Time]
    CheckDone -- No --> Monitor
```

