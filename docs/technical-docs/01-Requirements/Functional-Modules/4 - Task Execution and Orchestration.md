**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
*Last updated: Jan 04, 2026*

---
# 1. Business Overview
Trong há»‡ thá»‘ng PronaFlow, Task (CĂ´ng viá»‡c) lĂ  Ä‘Æ¡n vá»‹ nguyĂªn tá»­ (Atomic Unit) cá»§a giĂ¡ trá»‹. Má»i hoáº¡t Ä‘á»™ng quáº£n trá»‹, cá»™ng tĂ¡c vĂ  Ä‘o lÆ°á»ng Ä‘á»u xoay quanh thá»±c thá»ƒ nĂ y. Module nĂ y chá»‹u trĂ¡ch nhiá»‡m vá»:
1. Work Breakdown Structure ( #WBS): PhĂ¢n rĂ£ dá»± Ă¡n thĂ nh cĂ¡c phĂ¢n quáº£n lĂ½ Ä‘Æ°á»£c: `Task Lists` -> `Tasks` -> `Subtasks`
	1.  Task Lists (Danh sĂ¡ch cĂ´ng viá»‡c): ÄĂ³ng vai trĂ² lĂ  cĂ¡c "Container" dĂ¹ng Ä‘á»ƒ gom nhĂ³m cĂ¡c cĂ´ng viá»‡c. TĂ¹y theo phÆ°Æ¡ng phĂ¡p quáº£n lĂ½ (Waterfall hay Agile), Task List cĂ³ thá»ƒ Ä‘áº¡i diá»‡n cho cĂ¡c Giai Ä‘oáº¡n (Phrase), Print, hoáº·c cĂ¡c NhĂ³m chá»©c nÄƒng tĂ¹y theo cáº¥u hĂ¬nh mĂ  ngÆ°á»i dĂ¹ng triá»ƒn khai trong dá»± Ă¡n cá»§a há».
	2. Tasks (CĂ´ng viá»‡c): ÄÆ¡n vá»‹ thá»±c thi chĂ­nh, chá»©a Ä‘áº§y Ä‘á»§ thĂ´ng tin vá» tiáº¿n Ä‘á»™, thá»i gian, vĂ  ngÆ°á»i thá»±c hiá»‡n. Task báº¯t buá»™c náº±m trong má»™t Task List.
	3. Subtasks (CĂ´ng viá»‡c con): CĂ¡c Ä‘áº§u má»¥c kiá»ƒm tra (Checklist) nhá» náº±m trong Task, giĂºp chia nhá» khá»‘i lÆ°á»£ng cĂ´ng viá»‡c phá»©c táº¡p.
2. Execution: Cung cáº¥p Ä‘áº§y Ä‘á»§ cĂ´ng cá»¥ Ä‘á»ƒ thá»±c thi cĂ´ng viá»‡c (GĂ¡n ngÆ°á»i, Ä‘áº·t háº¡n, dĂ¡n nhĂ£n).
3. Orchestrain (Äiá»u phá»‘i): Quáº£n lĂ½ dá»± phá»¥ thuá»™c vĂ  láº·p láº¡i Ä‘á»ƒ Ä‘áº£m báº£o dĂ²ng cháº£y cĂ´ng viá»‡c khĂ´ng bá»‹ giĂ¡n Ä‘oáº¡n.
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Task List Management
### User Story 4.1.
LĂ  má»™t Quáº£n lĂ½ dá»± Ă¡n, TĂ´i muá»‘n táº¡o, sáº¯p xáº¿p vĂ  quáº£n lĂ½ cĂ¡c Task List trong dá»± Ă¡n. Äá»ƒ phĂ¢n chia dá»± Ă¡n thĂ nh cĂ¡c giai Ä‘oáº¡n rĂµ rĂ ng hoáº·c cĂ¡c nhĂ³m viá»‡c logic.
### Acceptance Criteria ( #AC)
#### AC 1 - Container Management
- **Action:** CRUD Task List.
- **Constraint:** KhĂ´ng thá»ƒ xĂ³a má»™t List náº¿u nĂ³ Ä‘ang chá»©a Task (Pháº£i di chuyá»ƒn Task Ä‘i nÆ¡i khĂ¡c hoáº·c Archive cáº£ List).
#### AC 2 - Drag & Drop Ordering
- **Action:** KĂ©o tháº£ List A sang vá»‹ trĂ­ cá»§a List B.
- **System:** Cáº­p nháº­t trÆ°á»ng `position` trong DB. Äáº£m báº£o tráº£i nghiá»‡m mÆ°á»£t mĂ , khĂ´ng bá»‹ giáº­t (Optimistic UI update).
## 2.2. Feature: Task Execution
### User Story 4.2.
LĂ  má»™t ThĂ nh viĂªn dá»± Ă¡n, TĂ´i muá»‘n táº¡o má»™t Task má»›i náº±m trong má»™t Task List cá»¥ thá»ƒ, Äá»ƒ xĂ¡c Ä‘á»‹nh rĂµ cĂ´ng viá»‡c cáº§n lĂ m, thá»i háº¡n vĂ  má»©c Ä‘á»™ Æ°u tiĂªn.
### Acceptance Critera ( #AC)
#### AC 1 - Parent Constraint:
- Rule: Má»™t Task khĂ´ng thá»ƒ tá»“n táº¡i Ä‘á»™c láº­p. Khi táº¡o Task, há»‡ thá»‘ng buá»™c pháº£i gĂ¡n `task_list_id`
#### AC 2 - Metadata Management:
- Há»— trá»£ cáº­p nháº­t cĂ¡c trÆ°á»ng thĂ´ng tin quan trá»ng:
	- `Title` (Báº¯t buá»™c).
	- `Assigness` (Cho phĂ©p gĂ¡n nhiá»u ngÆ°á»i, nhÆ°ng pháº£i chá»‰ Ä‘á»‹nh 1 ngÆ°á»i chá»‹u trĂ¡ch nhiá»‡m chĂ­nh - Primary Owner).
	- `Priority`: Má»©c Ä‘á»™ Æ°u tiĂªn (Chá»n tá»« Danh má»¥c: `Low`, `Medium`, `High`, `Urgent`)
	- `Status`: Tráº¡ng thĂ¡i xá»­ lĂ½ cá»§a Task (`Not-Started`, `In-Progress`, `Done`).
	- `Date Range`: `Start Date` vĂ  `End Date` ($End Date >= Start Date$), cĂ³ thá»ƒ cĂ³ giá» cá»¥ thá»ƒ (e.g. 17:00 31/12).
	- `Estimated Hours`: Æ¯á»›c lÆ°á»£ng thá»i gian lĂ m viá»‡c (sá»‘ giá») (Input cho [[10 - Intelligent Decision Support System|Module 10]] vĂ  [[11 - Advanced Analytics and Reporting|Module 11]])
	- `Is Milestone`: ÄĂ¡nh dáº¥u Ä‘Ă¢y lĂ  cá»™t má»‘c quan trá»ng cá»§a dá»± Ă¡n.
- Trigger: Khi táº¡o xong, há»‡ thá»‘ng gá»­i thĂ´ng bĂ¡o cho ngÆ°á»i Ä‘Æ°á»£c gĂ¡n ([[7 - Event-Driven Notification System|Module 7]])
#### AC 3 - Tags & Labels System
- Action: User cĂ³ thá»ƒ táº¡o má»›i hoáº·c chá»n tag cĂ³ sáºµn.
- Visual: Má»—i tag cĂ³ má»™t mĂ u sáº¯c riĂªng biá»‡t Ä‘á»ƒ nháº­n diá»‡n trĂªn Board.
- Scope: Tag Ä‘Æ°á»£c quáº£n lĂ½ á»Ÿ cáº¥p Ä‘á»™ Workspace Ä‘á»ƒ tĂ¡i sá»­ dá»¥ng giá»¯a cĂ¡c dá»± Ă¡n.
- Xem chi tiáº¿t táº¡i: [[]]
#### AC 44 - Time Tracking Integration
- **UI:** Hiá»ƒn thá»‹ nĂºt "Start Timer" ngay trĂªn Task Detail.
- **Logic:** Khi báº¥m Start -> Gá»i API sang **Module 11** Ä‘á»ƒ báº¯t Ä‘áº§u tĂ­nh giá». Khi báº¥m Stop -> LÆ°u Log.
## 2.3. Feature: Subtasks.
### User Story 4.3.
- LĂ  má»™t NgÆ°á»i thá»±c hiá»‡n (Assignee), 
- TĂ´i muá»‘n chia nhá» Task thĂ nh danh sĂ¡ch kiá»ƒm tra (Checklist),
- Äá»ƒ kiá»ƒm soĂ¡t cĂ¡c bÆ°á»›c thá»±c hiá»‡n chi tiáº¿t mĂ  khĂ´ng cáº§n táº¡o thĂªm Task lá»›n.
### Acceptance Criteria ( #AC)
#### AC 1 - Checklist Behavior
- **Input:** Nháº­p text vĂ  Enter Ä‘á»ƒ thĂªm dĂ²ng má»›i nhanh.
- **State:** Má»—i subtask cĂ³ checkbox (Done/Not Done).
- **Progress Bar:** Task cha hiá»ƒn thá»‹ thanh tiáº¿n Ä‘á»™ dá»±a trĂªn % Subtask hoĂ n thĂ nh (VĂ­ dá»¥: 3/4 Subtasks = 75%).
#### AC 2 - Assignable Subtasks
- Cho phĂ©p gĂ¡n ngÆ°á»i thá»±c hiá»‡n riĂªng cho tá»«ng Subtask (náº¿u cáº§n thiáº¿t). Náº¿u khĂ´ng gĂ¡n, máº·c Ä‘á»‹nh thuá»™c vá» ngÆ°á»i lĂ m Task cha.
- Scope: Äá»‘i vá»›i gĂ¡n Subtask chá»‰ cho phĂ©p gĂ¡n cho nhá»¯ng ngÆ°á»i Ä‘Æ°á»£c gĂ¡n trong Task cha.
#### AC 3 - Ordering:
- CĂ¡c Subtask cĂ³ thá»ƒ Ä‘Æ°á»£c sáº¯p xáº¿p láº¡i thá»© tá»± (`position`) Ä‘á»ƒ thá»ƒ hiá»‡n quy trĂ¬nh thá»±c hiá»‡n cĂ¡c bÆ°á»›c.
## 2.4. Feature: Task Dependencies (Predecessor & Successor).
### User Story 4.4.
- LĂ  má»™t Quáº£n lĂ½ dá»± Ă¡n, 
- TĂ´i muá»‘n thiáº¿t láº­p cĂ¡c má»‘i quan há»‡ giá»¯a Task A vĂ   Task B, 
- Äá»ƒ Ä‘áº£m báº£o quy trĂ¬nh thá»±c hiá»‡n Ä‘Ăºng trĂ¬nh tá»±.
### Acceptance Criteria ( #AC)
#### AC 1 - Dependency Definition
- **Data Model:** Äá»‹nh nghÄ©a quan há»‡ `Predecessor` (Task A - Viá»‡c trÆ°á»›c) vĂ  `Successor` (Task B - Viá»‡c sau).
- **Default Type:** Há»— trá»£ chuáº©n **Finish-to-Start (FS)**.
    - *Logic:* Task B khĂ´ng thá»ƒ chuyá»ƒn sang `In-Progress` náº¿u Task A chÆ°a `Done`.
#### AC 2 - Cycle Detection Validation
- **Logic:** Khi User cá»‘ gáº¯ng ná»‘i A -> B, há»‡ thá»‘ng kiá»ƒm tra Ä‘á»“ thá»‹. Náº¿u phĂ¡t hiá»‡n B Ä‘ang giĂ¡n tiáº¿p cháº·n A (A -> ... -> B), ngÄƒn cháº·n hĂ nh Ä‘á»™ng vĂ  bĂ¡o lá»—i `TASK_001: Circular dependency detected`.
## 2.5. Feature: Recurring Tasks (CĂ´ng viá»‡c láº·p láº¡i)
### User Story 4.5
LĂ  má»™t Team Lead, TĂ´i muá»‘n thiáº¿t láº­p Task "Gá»­i bĂ¡o cĂ¡o tuáº§n" tá»± Ä‘á»™ng láº·p láº¡i vĂ o thá»© 6 hĂ ng tuáº§n, Äá»ƒ khĂ´ng pháº£i táº¡o thá»§ cĂ´ng.
### Acceptance Criteria (#AC)
#### AC 1 - Recurrence Pattern
- Há»— trá»£ cĂ¡c máº«u: 
	- Daily, 
	- Weekly (chá»n ngĂ y trong tuáº§n), 
	- Monthly, 
	- Custom.
#### AC 2 - Generation Strategy (Chiáº¿n lÆ°á»£c sinh Task)
- **Lazy Generation:** Há»‡ thá»‘ng khĂ´ng sinh ra hĂ ng nghĂ¬n task tÆ°Æ¡ng lai ngay láº­p tá»©c.
- **Logic:** Chá»‰ sinh ra Task tiáº¿p theo (Next Instance) khi Task hiá»‡n táº¡i Ä‘Æ°á»£c Ä‘Ă¡nh dáº¥u lĂ  **Done** hoáº·c Ä‘áº¿n ngĂ y kĂ­ch hoáº¡t.
- **Prefix:** Tá»± Ä‘á»™ng thĂªm suffix vĂ o tĂªn task (e.g., "Report [2025-01-01]", "Report [2025-01-08]").
## 2.6. Feature: Milestones (Cá»™t má»‘c Dá»± Ă¡n)
### User Story 4.6
LĂ  má»™t Project Manager, TĂ´i muá»‘n Ä‘Ă¡nh dáº¥u cĂ¡c Task quan trá»ng lĂ  "Cá»™t má»‘c", Äá»ƒ dá»… dĂ ng theo dĂµi cĂ¡c Ä‘iá»ƒm chá»‘t (Checkpoints) quan trá»ng cá»§a dá»± Ă¡n trĂªn timeline.
### Acceptance Criteria ( #AC)
#### AC 1 - Milestone Definition
- **Input:** Toggle `Is Milestone = True`.
- **Constraint:** Milestone cĂ³ `Duration = 0` (Start Date = End Date). KhĂ´ng cho phĂ©p nháº­p Estimated Hours.
#### AC 2 - Visual Distinction
- Hiá»ƒn thá»‹ dÆ°á»›i dáº¡ng hĂ¬nh thoi (Diamond shape) trĂªn biá»ƒu Ä‘á»“ Gantt vĂ  cĂ³ icon ná»•i báº­t trong danh sĂ¡ch Task Ä‘á»ƒ phĂ¢n biá»‡t vá»›i Task thÆ°á»ng.

## 2.7. Feature: Bulk Actions (Thao tĂ¡c hĂ ng loáº¡t)
### User Story 4.7
LĂ  má»™t NgÆ°á»i dĂ¹ng, TĂ´i muá»‘n chá»n vĂ  chá»‰nh sá»­a nhiá»u Task cĂ¹ng má»™t lĂºc, Äá»ƒ tiáº¿t kiá»‡m thá»i gian khi cáº§n thay Ä‘á»•i tráº¡ng thĂ¡i hoáº·c ngÆ°á»i thá»±c hiá»‡n cho cáº£ nhĂ³m viá»‡c.
### Acceptance Criteria ( #AC)
#### AC 1 - Multi-select Interaction
- **Interaction:** Giá»¯ phĂ­m `Shift` hoáº·c `Ctrl/Cmd` Ä‘á»ƒ chá»n nhiá»u Task, hoáº·c tick vĂ o checkbox Ä‘áº§u dĂ²ng.
- **Floating Toolbar:** Khi cĂ³ >1 task Ä‘Æ°á»£c chá»n, hiá»ƒn thá»‹ thanh cĂ´ng cá»¥ ná»•i phĂ­a dÆ°á»›i mĂ n hĂ¬nh: "X Tasks selected".
#### AC 2 - Batch Operations
- Há»— trá»£ cĂ¡c hĂ nh Ä‘á»™ng:
    - `Move to...`: Di chuyá»ƒn sang List khĂ¡c hoáº·c Dá»± Ă¡n khĂ¡c.
    - `Set Status/Priority/Assignee`: Cáº­p nháº­t Ä‘á»“ng loáº¡t giĂ¡ trá»‹ má»›i.
    - `Delete`: XĂ³a nhiá»u task (YĂªu cáº§u confirm).
## 2.8. Feature: Custom Fields (TrÆ°á»ng tĂ¹y chá»‰nh)
### User Story 4.8
LĂ  má»™t **Pro User**, TĂ´i muá»‘n Ä‘á»‹nh nghÄ©a thĂªm cĂ¡c trÆ°á»ng dá»¯ liá»‡u Ä‘áº·c thĂ¹ (nhÆ° "Ticket ID", "KhĂ¡ch hĂ ng"), Äá»ƒ quáº£n lĂ½ thĂ´ng tin sĂ¡t vá»›i nghiá»‡p vá»¥ thá»±c táº¿ cá»§a cĂ´ng ty.
### Acceptance Criteria ( #AC)
#### AC 1 - Field Definition (Project Level)
- PM cĂ³ thá»ƒ táº¡o Custom Field trong Project Settings.
- **Data Types:** Text, Number, Dropdown (Single/Multi select), Date, Checkbox, URL.
#### AC 2 - Tier Enforcement (RBAC)
- TĂ­nh nÄƒng nĂ y chá»‰ kháº£ dá»¥ng cho Workspace sá»­ dá»¥ng gĂ³i **Pro** hoáº·c **Enterprise** (Check quota tá»« Module 13). GĂ³i Free bá»‹ khĂ³a chá»©c nÄƒng nĂ y.
#### AC 3 - Task Input
- CĂ¡c trÆ°á»ng tĂ¹y chá»‰nh sáº½ hiá»ƒn thá»‹ á»Ÿ khu vá»±c riĂªng trong Task Detail. Dá»¯ liá»‡u nháº­p vĂ o pháº£i Ä‘Æ°á»£c Validate theo kiá»ƒu dá»¯ liá»‡u Ä‘Ă£ Ä‘á»‹nh nghÄ©a.
## 2.9. Feature: Task Templates
### User Story 4.9
LĂ  má»™t Team Lead, TĂ´i muá»‘n lÆ°u cáº¥u trĂºc cá»§a má»™t Task máº«u (gá»“m mĂ´ táº£, checklist, tag) vĂ  tĂ¡i sá»­ dá»¥ng nĂ³, Äá»ƒ chuáº©n hĂ³a quy trĂ¬nh giao viá»‡c cho nhĂ¢n viĂªn.
### Acceptance Criteria ( #AC)
#### AC 1 - Save as Template
- Tá»« má»™t Task Ä‘ang cĂ³, chá»n "Save as Template". Há»‡ thá»‘ng lÆ°u láº¡i: Description, Subtasks, Tags, Priority (khĂ´ng lÆ°u Assignee vĂ  Due Date).
#### AC 2 - Instantiate from Template
- Khi táº¡o Task má»›i, hiá»ƒn thá»‹ dropdown: "Apply Template".
- Khi chá»n, dá»¯ liá»‡u tá»« Template sáº½ Ä‘á»• vĂ o form táº¡o Task.
## 2.10. Feature: Watchers/Followers (NgÆ°á»i theo dĂµi)
### User Story 4.10
LĂ  má»™t Stakeholder, TĂ´i muá»‘n theo dĂµi má»™t Task mĂ  tĂ´i khĂ´ng trá»±c tiáº¿p thá»±c hiá»‡n, Äá»ƒ nháº­n Ä‘Æ°á»£c thĂ´ng bĂ¡o má»—i khi cĂ³ cáº­p nháº­t má»›i vá» tiáº¿n Ä‘á»™ hoáº·c tháº£o luáº­n.
### Acceptance Criteria ( #AC)
#### AC 1 - Watch Logic
- **Manual:** NĂºt toggle hĂ¬nh con máº¯t (Eye Icon). Báº¥m Ä‘á»ƒ Follow/Unfollow.
- **Auto-watch:** NgÆ°á»i táº¡o Task (Creator) vĂ  NgÆ°á»i comment (Commenter) tá»± Ä‘á»™ng Ä‘Æ°á»£c thĂªm vĂ o danh sĂ¡ch Watchers (trá»« khi há» táº¯t thá»§ cĂ´ng).
#### AC 2 - Notification Trigger
- Danh sĂ¡ch Watchers sáº½ Ä‘Æ°á»£c [[7 - Event-Driven Notification System|Module 7]] sá»­ dá»¥ng Ä‘á»ƒ gá»­i thĂ´ng bĂ¡o khi cĂ³ sá»± kiá»‡n thay Ä‘á»•i (`task.updated`, `comment.created`).

## 2.11. Feature: Execution Constraints under Locked Plan (RĂ ng buá»™c Thá»±c thi khi Káº¿ hoáº¡ch bá»‹ KhĂ³a)
### User Story 4.11
LĂ  má»™t ThĂ nh viĂªn dá»± Ă¡n, TĂ´i muá»‘n biáº¿t nhá»¯ng thĂ´ng tin nĂ o mĂ¬nh Ä‘Æ°á»£c phĂ©p chá»‰nh sá»­a khi dá»± Ă¡n Ä‘Ă£ chá»‘t káº¿ hoáº¡ch (Baseline), Äá»ƒ tĂ´i cáº­p nháº­t tiáº¿n Ä‘á»™ mĂ  khĂ´ng vĂ´ tĂ¬nh phĂ¡ vá»¡ cam káº¿t vá»›i khĂ¡ch hĂ ng.
### Acceptance Criteria (#AC)

#### AC 1 - Allowed Actions (HĂ nh Ä‘á»™ng Ä‘Æ°á»£c phĂ©p)

- DĂ¹ Plan Ä‘ang á»Ÿ tráº¡ng thĂ¡i **Locked**, User váº«n Ä‘Æ°á»£c quyá»n:
    - Thay Ä‘á»•i `Status` (VĂ­ dá»¥: In-Progress -> Done).
    - Cáº­p nháº­t `% Complete`.
    - ThĂªm `Comment`, `Attachment`.
    - Log `Time` (Time Tracking).
    - ÄĂ¡nh dáº¥u `Subtask` lĂ  hoĂ n thĂ nh.
    - **LĂ½ do:** ÄĂ¢y lĂ  cĂ¡c hĂ nh Ä‘á»™ng thuá»™c vá» **Thá»±c thi (Execution)**, khĂ´ng lĂ m thay Ä‘á»•i cáº¥u trĂºc káº¿ hoáº¡ch.
#### AC 2 - Restricted Actions (HĂ nh Ä‘á»™ng bá»‹ háº¡n cháº¿)
- Khi Plan = **Locked**, há»‡ thá»‘ng vĂ´ hiá»‡u hĂ³a (Disable/Gray-out) cĂ¡c trÆ°á»ng sau trĂªn Form chi tiáº¿t Task:
    - `Start Date` / `End Date` (NgĂ y káº¿ hoáº¡ch).
    - `Duration`.
    - `Dependency` (KhĂ´ng Ä‘Æ°á»£c ná»‘i thĂªm hoáº·c cáº¯t bá» dĂ¢y).
- **Exception:** Chá»‰ **Project Manager** má»›i cĂ³ quyá»n má»Ÿ khĂ³a táº¡m thá»i (Override) hoáº·c pháº£i Ä‘i qua quy trĂ¬nh Change Request (Module 5).
#### AC 3 - Scope Creep Prevention (NgÄƒn cháº·n phĂ¬nh to pháº¡m vi)
- **Constraint:** KhĂ´ng cho phĂ©p táº¡o má»›i **Task cha (Parent Task)** trá»±c tiáº¿p vĂ o danh sĂ¡ch khi Plan Ä‘ang Lock.
- **Allowed:** Váº«n cho phĂ©p táº¡o thĂªm **Subtask** (vĂ¬ Subtask Ä‘Æ°á»£c xem lĂ  chi tiáº¿t hĂ³a cĂ¡ch lĂ m, miá»…n lĂ  khĂ´ng lĂ m thay Ä‘á»•i ngĂ y káº¿t thĂºc cá»§a Task cha).
# 3. Business Rules
## 3.1. Quy táº¯c Káº¿ thá»«a (Inheritance):
- Task con khĂ´ng tá»± Ä‘á»™ng káº¿ thá»«a Assignee tá»« Task cha (Ä‘á»ƒ linh hoáº¡t), nhÆ°ng nĂªn káº¿ thá»«a quyá»n truy cáº­p (Permissions).
## 3.2. Quy táº¯c RĂ ng buá»™c Custom Fields:
- Tá»‘i Ä‘a 50 Custom Fields cho má»—i dá»± Ă¡n (Ä‘á»ƒ báº£o Ä‘áº£m hiá»‡u nÄƒng render UI).
- Custom Field khi xĂ³a sáº½ máº¥t vÄ©nh viá»…n dá»¯ liá»‡u Ä‘Ă£ nháº­p trong cĂ¡c Task, cáº§n cáº£nh bĂ¡o ká»¹.
## 3.3. Quy táº¯c Dependency Cháº·t cháº½ (Strict Dependency):
- Náº¿u cáº¥u hĂ¬nh Project lĂ  `Strict Mode`: Há»‡ thá»‘ng **khĂ³a** (Disable) nĂºt "Start" hoáº·c "Complete" cá»§a Task Successor náº¿u Task Predecessor chÆ°a xong.
- Náº¿u `Loose Mode` (Máº·c Ä‘á»‹nh): Chá»‰ hiá»ƒn thá»‹ cáº£nh bĂ¡o (Warning Toast) nhÆ°ng váº«n cho phĂ©p lĂ m.
## 3.4. Quy táº¯c "Actual vs Planned" (Thá»±c táº¿ vs Káº¿ hoáº¡ch)
- PhĂ¢n há»‡ 4 cáº§n phĂ¢n biá»‡t rĂµ hai bá»™ dá»¯ liá»‡u ngĂ y thĂ¡ng:
    1. **Planned Dates (Baseline):** NgĂ y cam káº¿t (Do Module 5 quáº£n lĂ½, bá»‹ Read-only khi Lock).
    2. **Actual Dates:** NgĂ y thá»±c táº¿ (Do Module 4 ghi nháº­n).
        - _Actual Start:_ Tá»± Ä‘á»™ng Ä‘iá»n `NOW()` khi Task chuyá»ƒn sang `In-Progress`.
        - _Actual End:_ Tá»± Ä‘á»™ng Ä‘iá»n `NOW()` khi Task chuyá»ƒn sang `Done`.
- **Logic:** Viá»‡c nhĂ¢n viĂªn lĂ m xong sá»›m hay muá»™n (Actual khĂ¡c Planned) lĂ  chuyá»‡n bĂ¬nh thÆ°á»ng, há»‡ thá»‘ng ghi nháº­n sá»± chĂªnh lá»‡ch nĂ y Ä‘á»ƒ tĂ­nh KPI, chá»© khĂ´ng cháº·n nháº­p liá»‡u.
## 3.5. Quy táº¯c "Auto-Push" khi trá»… háº¡n
- **Váº¥n Ä‘á»:** Task A cĂ³ Deadline hĂ´m qua (Planned End = Yesterday), nhÆ°ng hĂ´m nay váº«n chÆ°a xong (`Status != Done`).
- **Xá»­ lĂ½:**
    - Náº¿u Plan **Unlocked**: Há»‡ thá»‘ng cĂ³ thá»ƒ tá»± Ä‘á»™ng Ä‘áº©y Planned End sang hĂ´m nay (Auto-reschedule).
    - Náº¿u Plan **Locked**: Giá»¯ nguyĂªn Planned End lĂ  ngĂ y hĂ´m qua (Ä‘á»ƒ ghi nháº­n lĂ  Trá»… háº¡n - Overdue). Há»‡ thá»‘ng hiá»ƒn thá»‹ nhĂ£n **"Overdue by X days"** mĂ u Ä‘á».
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. Work Breakdown Structure (WBS)
Module nĂ y tuĂ¢n thá»§ nguyĂªn táº¯c phĂ¢n rĂ£ cĂ´ng viá»‡c WBS:
- **Level 1:** Project.
- **Level 2:** Task Lists (Phases/Epics).
- **Level 3:** Tasks (Work Packages).
- **Level 4:** Subtasks (Activities). GiĂºp quáº£n lĂ½ sá»± phá»©c táº¡p báº±ng cĂ¡ch chia nhá» váº¥n Ä‘á» ("Divide and Conquer").
## 4.2. Äá»‹nh luáº­t Brooks (Brooks's Law)

> "ThĂªm nhĂ¢n lá»±c vĂ o má»™t dá»± Ă¡n pháº§n má»m Ä‘ang cháº­m tiáº¿n Ä‘á»™ sáº½ chá»‰ lĂ m nĂ³ cháº­m thĂªm."

Ăp dá»¥ng vĂ o tĂ­nh nÄƒng **Activity Log & Dependencies**: Viá»‡c giao tiáº¿p khĂ´ng rĂµ rĂ ng (Implicit Communication) lĂ  nguyĂªn nhĂ¢n gĂ¢y cháº­m trá»…. Há»‡ thá»‘ng lĂ m rĂµ cĂ¡c phá»¥ thuá»™c vĂ  lá»‹ch sá»­ thay Ä‘á»•i Ä‘á»ƒ giáº£m chi phĂ­ giao tiáº¿p (Communication Overhead), giĂºp viá»‡c thĂªm ngÆ°á»i má»›i (náº¿u cáº§n) dá»… dĂ ng hÆ¡n nhá» lá»‹ch sá»­ minh báº¡ch.
## 4.3. Getting Things Done (GTD Methodology)
Há»— trá»£ tÆ° duy GTD thĂ´ng qua cĂ¡c tráº¡ng thĂ¡i Task:
- **In-Basket:** Task má»›i táº¡o (chÆ°a phĂ¢n loáº¡i).
- **Next Action:** Task cĂ³ ngĂ y vĂ  ngÆ°á»i lĂ m cá»¥ thá»ƒ.
- **Waiting For:** Task bá»‹ cháº·n (Blocked by dependency).
- **Someday/Maybe:** Task á»Ÿ tráº¡ng thĂ¡i "Hold".
## 4.4. SÆ¡ Ä‘á»“ Luá»“ng xá»­ lĂ½ Dependency:
```mermaid
graph TD
    Start([User Connects Task A to Task B]) --> CheckLoop{Check Cycle: A->...->B->A?}
    CheckLoop -- Yes --> Error[Return Error: Circular Dependency]
    CheckLoop -- No --> CreateLink[Create Record: A is Predecessor of B]
    CreateLink --> CheckStatus{Check Project Mode}
    CheckStatus -- Strict --> LockB[Lock Task B Action]
    CheckStatus -- Loose --> WarnB[UI Warning Only]
```

## 4.5. Dependency Types Matrix
| **MĂ£ (Code)** | **TĂªn loáº¡i (Type)**  | **KĂ½ hiá»‡u**                   | **MĂ´ táº£ Quy chuáº©n (Logic)**                                                              | **VĂ­ dá»¥ Thá»±c táº¿ (Business Case)**                                                   | **Má»©c Ä‘á»™ Há»— trá»£ trong PronaFlow**          |
| ------------- | -------------------- | ----------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------ |
| **FS**        | **Finish-to-Start**  | $A \rightarrow B$             | **Task B** khĂ´ng thá»ƒ báº¯t Ä‘áº§u cho Ä‘áº¿n khi **Task A** káº¿t thĂºc.<br>($Start_B \geq End_A$)  | Pháº£i _Ä‘á»• mĂ³ng_ (A) xong thĂ¬ má»›i Ä‘Æ°á»£c _xĂ¢y tÆ°á»ng_ (B).                               | **Máº·c Ä‘á»‹nh (Default)**<br>âœ… Há»— trá»£ Ä‘áº§y Ä‘á»§. |
| **SS**        | **Start-to-Start**   | $Start_A \rightarrow Start_B$ | **Task B** khĂ´ng thá»ƒ báº¯t Ä‘áº§u cho Ä‘áº¿n khi **Task A** báº¯t Ä‘áº§u.<br>($Start_B \geq Start_A$) | Khi báº¯t Ä‘áº§u _viáº¿t code_ (A) thĂ¬ cĂ³ thá»ƒ báº¯t Ä‘áº§u _viáº¿t test case_ (B) song song.      | â ï¸ **Optional**<br>(CĂ¢n nháº¯c cho Phase 2). |
| **FF**        | **Finish-to-Finish** | $End_A \rightarrow End_B$     | **Task B** khĂ´ng thá»ƒ káº¿t thĂºc cho Ä‘áº¿n khi **Task A** káº¿t thĂºc.<br>($End_B \geq End_A$)   | Viá»‡c _nghiá»‡m thu_ (B) chá»‰ xong khi viá»‡c _sá»­a lá»—i_ (A) Ä‘Ă£ xong hoĂ n toĂ n.            | â ï¸ **Optional**<br>(CĂ¢n nháº¯c cho Phase 2). |
| **SF**        | **Start-to-Finish**  | $Start_A \rightarrow End_B$   | **Task B** khĂ´ng thá»ƒ káº¿t thĂºc cho Ä‘áº¿n khi **Task A** báº¯t Ä‘áº§u.<br>($End_B \geq Start_A$)  | Ca trá»±c cá»§a _báº£o vá»‡ cÅ©_ (B) chá»‰ káº¿t thĂºc khi _báº£o vá»‡ má»›i_ (A) Ä‘Ă£ Ä‘áº¿n vĂ  báº¯t Ä‘áº§u ca. | âŒ **KhĂ´ng há»— trá»£**<br>(Ăt dĂ¹ng, gĂ¢y rá»‘i).  |
## 4.6. Iron Triangle Constraints (RĂ ng buá»™c Tam giĂ¡c sáº¯t)
Trong quáº£n lĂ½ dá»± Ă¡n, thay Ä‘á»•i má»™t cáº¡nh sáº½ áº£nh hÆ°á»Ÿng cĂ¡c cáº¡nh cĂ²n láº¡i. PhĂ¢n há»‡ 4 thá»±c thi cĂ¡c rĂ ng buá»™c nĂ y:
- **Scope (Pháº¡m vi):** ÄÆ°á»£c cá»‘ Ä‘á»‹nh bá»Ÿi danh sĂ¡ch Task. Khi Lock Plan -> Cá»‘ Ä‘á»‹nh Scope.
- **Time (Thá»i gian):** ÄÆ°á»£c cá»‘ Ä‘á»‹nh bá»Ÿi Start/End Date.
- **Cost (Chi phĂ­):** ÄÆ°á»£c cá»‘ Ä‘á»‹nh bá»Ÿi Resource Assignee. -> Viá»‡c ngÄƒn cháº·n thĂªm Task má»›i hoáº·c Ä‘á»•i ngÆ°á»i khi Plan Locked chĂ­nh lĂ  báº£o vá»‡ sá»± toĂ n váº¹n cá»§a Tam giĂ¡c sáº¯t dá»± Ă¡n.

