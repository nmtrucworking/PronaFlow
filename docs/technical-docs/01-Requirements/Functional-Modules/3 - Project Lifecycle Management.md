**Project**: PronaFlow 
**Version**: 1.1 
**State**: Ready for Review 
_**Last updated:** Jan 04, 2026_

---
# 1. Business Overview
**Project (Dá»± Ă¡n)** lĂ  thá»±c thá»ƒ trung tĂ¢m nÆ¡i diá»…n ra sá»± cá»™ng tĂ¡c. Trong PronaFlow, má»™t dá»± Ă¡n khĂ´ng chá»‰ lĂ  táº­p há»£p cĂ¡c cĂ´ng viá»‡c (Tasks) mĂ  lĂ  má»™t quy trĂ¬nh khĂ©p kĂ­n cĂ³ VĂ²ng Ä‘á»i (Lifecycle) rĂµ rĂ ng, tá»« lĂºc khá»Ÿi táº¡o, thá»±c thi Ä‘áº¿n khi Ä‘Ă³ng láº¡i.
Module nĂ y chá»‹u trĂ¡ch nhiá»‡m:
1. **Quáº£n trá»‹ Meta-data:** TĂªn, mĂ´ táº£, thá»i gian, ngĂ¢n sĂ¡ch (náº¿u cĂ³).
2. **Quáº£n trá»‹ ThĂ nh viĂªn Dá»± Ă¡n:** Ai Ä‘Æ°á»£c quyá»n truy cáº­p vĂ  vai trĂ² cá»§a há» lĂ  gĂ¬.
3. **Kiá»ƒm soĂ¡t VĂ²ng Ä‘á»i:** Äiá»u phá»‘i tráº¡ng thĂ¡i dá»± Ă¡n thĂ´ng qua MĂ¡y tráº¡ng thĂ¡i (State Machine).
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Quáº£n lĂ½ ThĂ´ng tin Dá»± Ă¡n (CRUD Project)
### User Story 2.1
LĂ  má»™t ThĂ nh viĂªn Workspace, TĂ´i muá»‘n táº¡o má»™t dá»± Ă¡n má»›i, Äá»ƒ báº¯t Ä‘áº§u tá»• chá»©c cĂ´ng viá»‡c cho má»™t má»¥c tiĂªu cá»¥ thá»ƒ.
### Acceptance Criteria (#AC)
#### AC 1 - Create Project Validation
- **Input:** `Title` (Required, Max 150 chars), `Description` (Optional), `Key` (Tá»± Ä‘á»™ng sinh: PROJ-1, PROJ-2), `Start Date`, `End Date`.
- **Logic:**
	 - `Title` khĂ´ng Ä‘Æ°á»£c chá»‰ chá»©a khoáº£ng tráº¯ng.
	 - Náº¿u nháº­p `End Date`, há»‡ thá»‘ng báº¯t buá»™c `End Date >= Start Date`.
- **Default State:** Dá»± Ă¡n táº¡o xong cĂ³ tráº¡ng thĂ¡i máº·c Ä‘á»‹nh lĂ  **Not-Started**.
- **Owner Assignment:** NgÆ°á»i táº¡o dá»± Ă¡n tá»± Ä‘á»™ng trá»Ÿ thĂ nh **Project Manager** (Quyá»n cao nháº¥t trong dá»± Ă¡n).
#### AC 2 - Update Metadata
- Chá»‰ **Project Manager** hoáº·c **Workspace Admin** má»›i cĂ³ quyá»n chá»‰nh sá»­a tĂªn, mĂ´ táº£.
- Há»‡ thá»‘ng ghi log láº¡i ngÆ°á»i sá»­a vĂ  thá»i gian sá»­a (`updated_at`, `updated_by`).
#### AC 3 - Project Cloning (NhĂ¢n báº£n dá»± Ă¡n) - _New_
- **Action:** Cho phĂ©p chá»n "Duplicate Project".
- **Option:** NgÆ°á»i dĂ¹ng cĂ³ thá»ƒ chá»n:
	 - [x] Copy cáº¥u trĂºc (Task Lists, Settings).
	 - [ ] Copy Tasks (ThÆ°á»ng lĂ  khĂ´ng chá»n Ä‘á»ƒ trĂ¡nh rĂ¡c).
	 - [ ] Copy Members.
- **Result:** Táº¡o ra dá»± Ă¡n má»›i cĂ³ tĂªn "Copy of [Old Name]".
## 2.2. Feature: Quáº£n lĂ½ Tráº¡ng thĂ¡i Dá»± Ă¡n (Lifecycle Management)
### User Story 2.2
LĂ  má»™t Project Manager, TĂ´i muá»‘n thay Ä‘á»•i tráº¡ng thĂ¡i cá»§a dá»± Ă¡n theo quy trĂ¬nh chuáº©n, Äá»ƒ bĂ¡o cĂ¡o chĂ­nh xĂ¡c giai Ä‘oáº¡n thá»±c hiá»‡n trĂªn Dashboard.
### Acceptance Criteria (#AC)
#### AC 1 - 5 Global Statuses
Há»‡ thá»‘ng quy Ä‘á»‹nh cá»©ng (Hard-coded) 5 tráº¡ng thĂ¡i:

| **ID** | **Status Code** | **Display Name (VN)** | **Color Hex** | **Ă nghÄ©a Nghiá»‡p vá»¥**                            |
| ------ | --------------- | --------------------- | ------------- | ------------------------------------------------ |
| 0      | `HOLD`          | Táº¡m dá»«ng              | `#64748B`     | Dá»± Ă¡n bá»‹ Ä‘Ă³ng bÄƒng, khĂ´ng cho phĂ©p táº¡o Task má»›i. |
| 1      | `NOT_STARTED`   | ChÆ°a báº¯t Ä‘áº§u          | `#94A3B8`     | Giai Ä‘oáº¡n láº­p káº¿ hoáº¡ch (Default).                |
| 2      | `IN_PROGRESS`   | Äang thá»±c hiá»‡n        | `#3B82F6`     | Giai Ä‘oáº¡n thá»±c thi chĂ­nh. Active.                |
| 3      | `IN_REVIEW`     | Äang Ä‘Ă¡nh giĂ¡         | `#F59E0B`     | Giai Ä‘oáº¡n nghiá»‡m thu, UAT.                       |
| 4      | `DONE`          | HoĂ n thĂ nh            | `#10B981`     | Dá»± Ă¡n káº¿t thĂºc thĂ nh cĂ´ng. Read-only.            |
| **5**  | **`CANCELLED`** | **ÄĂ£ há»§y**            | **`#EF4444`** | **Dá»± Ă¡n bá»‹ cháº¥m dá»©t trÆ°á»›c háº¡n. Read-only.**      |
#### AC 2 - State Transition Logic
- **Trigger:** Thay Ä‘á»•i dropdown tráº¡ng thĂ¡i hoáº·c KĂ©o tháº£ tháº» dá»± Ă¡n á»Ÿ mĂ n hĂ¬nh "All Projects".
- **Impact:**
	 - Khi chuyá»ƒn sang **Done** hoáº·c **Hold**: Há»‡ thá»‘ng hiá»ƒn thá»‹ Confirm Modal: "Viá»‡c nĂ y cĂ³ thá»ƒ háº¡n cháº¿ quyá»n chá»‰nh sá»­a cá»§a thĂ nh viĂªn. Tiáº¿p tá»¥c?".
#### AC 3 - Cancellation Logic (Logic Há»§y dá»± Ă¡n)
- **Action:** Khi ngÆ°á»i dĂ¹ng chá»n tráº¡ng thĂ¡i **CANCELLED**.
- **Mandatory Input:** Há»‡ thá»‘ng hiá»ƒn thá»‹ Modal yĂªu cáº§u nháº­p **"Cancellation Reason"** (LĂ½ do há»§y).
    - _Dropdown:_ Thay Ä‘á»•i chiáº¿n lÆ°á»£c, Háº¿t ngĂ¢n sĂ¡ch, Rá»§i ro ká»¹ thuáº­t, KhĂ¡c.
    - _Text:_ Ghi chĂº chi tiáº¿t.
- **DoD Bypass:** KhĂ¡c vá»›i tráº¡ng thĂ¡i `DONE` (pháº£i Ä‘i qua cá»•ng kiá»ƒm tra "Definition of Done" - Feature 2.8), tráº¡ng thĂ¡i `CANCELLED` **bá» qua** má»i kiá»ƒm tra vá» Task chÆ°a hoĂ n thĂ nh. Há»‡ thá»‘ng sáº½ tá»± Ä‘á»™ng Ä‘Ă³ng bÄƒng táº¥t cáº£ cĂ¡c Task cĂ²n dang dá»Ÿ.
- **Audit:** LÆ°u lĂ½ do há»§y vĂ o lá»‹ch sá»­ dá»± Ă¡n Ä‘á»ƒ phá»¥c vá»¥ phĂ¢n tĂ­ch "Tá»· lá»‡ tháº¥t báº¡i" (Failure Rate) sau nĂ y.
## 2.3. Feature: Quáº£n lĂ½ ThĂ nh viĂªn Dá»± Ă¡n (Project Members) - _New_
### User Story 2.4
LĂ  má»™t Project Manager, TĂ´i muá»‘n thĂªm thĂ nh viĂªn vĂ o dá»± Ă¡n vĂ  phĂ¢n vai trĂ² cá»¥ thá»ƒ, Äá»ƒ kiá»ƒm soĂ¡t ai cĂ³ thá»ƒ xem hoáº·c chá»‰nh sá»­a dá»¯ liá»‡u.
### Acceptance Criteria (#AC)
#### AC 1 - Add Member
- **Condition:** Chá»‰ thĂªm Ä‘Æ°á»£c nhá»¯ng ngÆ°á»i ÄĂƒ lĂ  thĂ nh viĂªn cá»§a Workspace (káº¿t quáº£ tá»« Module 2).
- **Notification:** Gá»­i thĂ´ng bĂ¡o cho ngÆ°á»i Ä‘Æ°á»£c thĂªm: "Báº¡n Ä‘Ă£ Ä‘Æ°á»£c thĂªm vĂ o dá»± Ă¡n X".
#### AC 2 - Project Roles (Vai trĂ² cá»¥c bá»™)
KhĂ¡c vá»›i vai trĂ² trong Workspace, vai trĂ² trong dá»± Ă¡n quy Ä‘á»‹nh quyá»n háº¡n cá»¥ thá»ƒ hÆ¡n. Há»‡ thá»‘ng Ä‘á»‹nh nghÄ©a 4 vai trĂ² cá»‘t lĂµi Ä‘á»ƒ Ä‘Ă¡p á»©ng cáº£ nhu cáº§u quáº£n lĂ½ linh hoáº¡t láº«n kiá»ƒm soĂ¡t cháº·t cháº½:
1. **Project Manager** ( #PM - Quáº£n trá»‹ dá»± Ă¡n)
	- **Äá»‹nh nghÄ©a**: NgÆ°á»i chá»‹u trĂ¡ch nhiá»‡m cao nháº¥t vá» sá»± thĂ nh báº¡i cá»§a dá»± Ă¡n. LĂ  ngÆ°á»i táº¡o ra dá»± Ă¡n.
	- **Äáº·c quyá»n**: ToĂ n quyá»n cáº¥u hĂ¬nh dá»± Ă¡n, phĂª duyá»‡t káº¿ hoáº¡ch (Baseline), quáº£n lĂ½ thĂ nh viĂªn vĂ  quyáº¿t Ä‘á»‹nh cĂ¡c thay Ä‘á»•i pháº¡m vi (Scope).
2. **Planner** (NgÆ°á»i hoáº¡ch Ä‘á»‹nh): (Vai trĂ² Ä‘áº·c thĂ¹ cho Module 5) [[5 - Temporal Planning and Scheduling]]
	- **Äá»‹nh nghÄ©a**: NgÆ°á»i há»— trá»£ #PM trong viá»‡c xĂ¢y dá»±ng lá»‹ch trĂ¬nh. ThÆ°á»ng lĂ  Team Leader hoáº·c Scheduler chuyĂªn nghiá»‡p.
	- **Äáº·c quyá»n**: CĂ³ quyá»n chá»‰nh sá»­a biá»ƒu Ä‘á»“ Gantt, thiáº¿t láº­p cĂ¡c má»‘i quan há»‡ phá»¥ thuá»™c (Dependencies), Ä‘á» xuáº¥t Baseline má»›i. Tuy nhiĂªn, há» _**khĂ´ng**_ cĂ³ quyá»n xĂ³a dá»± Ă¡n hoáº·c thay Ä‘á»•i cĂ¡c thiáº¿t láº­p quáº£nn trá»‹ (Billing, Governannce Mode).
3. **Member** (ThĂ nh viĂªn thá»±c thi):
	- **Äá»‹nh nghÄ©a**: CĂ¡c nhĂ¢n sá»± trá»±c tiáº¿p lĂ m viá»‡c (Dev, Designer, Tester, ...)
	- **Äáº·c quyá»n**: Táº­p trung vĂ o thá»±c thi (Execution). CĂ³ quyá»n cáº­p nháº­t tráº¡ng thĂ¡i Task, log thá»i gian (Timesheet), comment, upload file. **Háº¡n cháº¿:** KhĂ´ng Ä‘Æ°á»£c tá»± Ă½ thay Ä‘á»•i ngĂ y báº¯t Ä‘áº§u/káº¿t thĂºc cá»§a Task náº¿u dá»± Ă¡n Ä‘ang bá»‹ khĂ³a káº¿ hoáº¡ch (Locked Plan).
4. **Viewer** (NgÆ°á»i quan sĂ¡t / Stakeholder):
	- **Äá»‹nh nghÄ©a**: KhĂ¡ch hĂ ng hoáº·c quáº£n lĂ½ cáº¥p cao muá»‘n theo dĂµi tiáº¿n Ä‘á»™.
	- **Äáº·c quyá»n**: Chá»‰ xem (Read-only) bĂ¡o cĂ¡o, tiáº¿n Ä‘á»™ vĂ  tĂ i liá»‡u. KhĂ´ng Ä‘Æ°á»£c tÆ°Æ¡ng tĂ¡c ghi (Writer).
> Ma tráº­n phĂ¢n quyá»n chi tiáº¿t: [[#3. Business Rules#3.21. Ma tráº­n PhĂ¢n quyá»n Chi tiáº¿t (Permission Matrix) |Permission Matrix: Project Permission Rules]]
## 2.4. Feature: Thiáº¿t láº­p Quyá»n RiĂªng tÆ° (Privacy Settings)
### User Story 2.3
LĂ  má»™t Chá»§ dá»± Ă¡n, TĂ´i muá»‘n thiáº¿t láº­p dá»± Ă¡n lĂ  RiĂªng tÆ° (Private), Äá»ƒ báº£o máº­t thĂ´ng tin nháº¡y cáº£m khá»i cĂ¡c thĂ nh viĂªn khĂ¡c trong cĂ¹ng Workspace.
### Acceptance Criteria (#AC)
#### AC 1 - Visibility Logic
- **Public:** Táº¥t cáº£ thĂ nh viĂªn Workspace Ä‘á»u tháº¥y dá»± Ă¡n nĂ y trĂªn báº£ng chung vĂ  cĂ³ thá»ƒ tá»± tham gia (Join).
- **Private:**
	 - Dá»± Ă¡n bá»‹ áº©n hoĂ n toĂ n vá»›i ngÆ°á»i khĂ´ng pháº£i thĂ nh viĂªn.
	 - Chá»‰ nhá»¯ng ngÆ°á»i Ä‘Æ°á»£c má»i (Invited) má»›i truy cáº­p Ä‘Æ°á»£c.
## 2.5. Feature: Soft Delete & Restore
### Acceptance Criteria (#AC)
#### AC 1 - Soft Delete
- **Action:** PM chá»n "Move to Trash".
- **System:** Update `is_deleted = 1`. Dá»± Ă¡n biáº¿n máº¥t khá»i cĂ¡c danh sĂ¡ch Active.
- **Reference:** CĂ¡c Task thuá»™c dá»± Ă¡n nĂ y cÅ©ng bá»‹ áº©n theo (Query Filter), nhÆ°ng khĂ´ng bá»‹ update trong DB ngay láº­p tá»©c (Lazy Update).
#### AC 2 - Hard Delete Constraint
- Dá»± Ă¡n trong thĂ¹ng rĂ¡c quĂ¡ 30 ngĂ y sáº½ bá»‹ xĂ³a vÄ©nh viá»…n bá»Ÿi Cronjob (Theo quy Ä‘á»‹nh táº¡i Module 8).
## 2.6. Feature: Project Templates (Máº«u Dá»± Ă¡n)
### User Story 3.6
LĂ  má»™t PMO (Project Management Officer), TĂ´i muá»‘n táº¡o cĂ¡c máº«u dá»± Ă¡n chuáº©n (vĂ­ dá»¥: "Quy trĂ¬nh Pháº§n má»m", "Chiáº¿n dá»‹ch Marketing") bao gá»“m sáºµn danh sĂ¡ch cĂ´ng viá»‡c máº«u vĂ  cáº¥u hĂ¬nh, Äá»ƒ cĂ¡c PM khĂ´ng pháº£i thiáº¿t láº­p láº¡i tá»« Ä‘áº§u vĂ  Ä‘áº£m báº£o tuĂ¢n thá»§ quy trĂ¬nh cĂ´ng ty.
### Acceptance Criteria ( #AC)
#### AC 1 - Template Scope
- Khi lÆ°u má»™t Dá»± Ă¡n thĂ nh Template, há»‡ thá»‘ng lÆ°u láº¡i:
    - Cáº¥u trĂºc **Task Lists** (Phases).
    - CĂ¡c **Tasks/Subtasks** máº«u (bao gá»“m MĂ´ táº£, Checklist, Tags).
    - Cáº¥u hĂ¬nh **Project Settings** (Workflow, Custom Fields).
    - _KhĂ´ng lÆ°u:_ ThĂ nh viĂªn cá»¥ thá»ƒ vĂ  NgĂ y thĂ¡ng cá»¥ thá»ƒ (Dates).
#### AC 2 - Project Initialization from Template
- **Action:** Khi táº¡o dá»± Ă¡n má»›i, User chá»n "Use a Template".
- **Logic:** Há»‡ thá»‘ng clone toĂ n bá»™ cáº¥u trĂºc tá»« Template sang Dá»± Ă¡n má»›i.
- **Date Remapping:** Há»‡ thá»‘ng há»i "NgĂ y báº¯t Ä‘áº§u dá»± Ă¡n má»›i?", sau Ä‘Ă³ tá»± Ä‘á»™ng tá»‹nh tiáº¿n (Shift) ngĂ y cá»§a cĂ¡c Task máº«u dá»±a trĂªn khoáº£ng cĂ¡ch tÆ°Æ¡ng Ä‘á»‘i (Relative Duration) so vá»›i ngĂ y báº¯t Ä‘áº§u.
## 2.7. Feature: Project Categories & Portfolios (PhĂ¢n loáº¡i & Danh má»¥c)

### User Story 3.7
LĂ  má»™t GiĂ¡m Ä‘á»‘c Khá»‘i, TĂ´i muá»‘n gom nhĂ³m cĂ¡c dá»± Ă¡n liĂªn quan thĂ nh má»™t "ChÆ°Æ¡ng trĂ¬nh" (Program) hoáº·c "Danh má»¥c" (Portfolio), Äá»ƒ theo dĂµi sá»©c khá»e tá»•ng thá»ƒ cá»§a cáº£ nhĂ³m dá»± Ă¡n thay vĂ¬ xem láº» táº».
### Acceptance Criteria ( #AC)
#### AC 1 - Categorization
- Cho phĂ©p gáº¯n **Category** (VĂ­ dá»¥: "Internal", "Client A", "R&D") cho dá»± Ă¡n.
- Cho phĂ©p gáº¯n **Portfolio Tag** (VĂ­ dá»¥: "Chiáº¿n lÆ°á»£c 2025").
- CĂ¡c nhĂ£n nĂ y dĂ¹ng Ä‘á»ƒ lá»c (Filter) vĂ  gom nhĂ³m (Group By) trĂªn Dashboard tá»•ng há»£p (Module 11).
#### AC 2 - Hierarchy Support (Há»— trá»£ Module 5)
- Viá»‡c phĂ¢n loáº¡i nĂ y lĂ  cÆ¡ sá»Ÿ dá»¯ liá»‡u Ä‘á»ƒ PhĂ¢n há»‡ 5 thá»±c hiá»‡n tĂ­nh nÄƒng **"Cross-Project Dependencies"** (Chá»‰ cho phĂ©p ná»‘i dependency giá»¯a cĂ¡c dá»± Ă¡n trong cĂ¹ng Portfolio náº¿u cáº¥u hĂ¬nh háº¡n cháº¿).
## 2.8. Feature: Status Transition Gates (Cá»•ng kiá»ƒm soĂ¡t tráº¡ng thĂ¡i)
### User Story 3.8
LĂ  má»™t Quáº£n trá»‹ viĂªn, TĂ´i muá»‘n thiáº¿t láº­p cĂ¡c Ä‘iá»u kiá»‡n báº¯t buá»™c trÆ°á»›c khi dá»± Ă¡n Ä‘Æ°á»£c phĂ©p chuyá»ƒn tráº¡ng thĂ¡i, Äá»ƒ ngÄƒn cháº·n sai sĂ³t quy trĂ¬nh (vĂ­ dá»¥: ÄĂ³ng dá»± Ă¡n khi váº«n cĂ²n viá»‡c Ä‘ang lĂ m).
### Acceptance Criteria ( #AC)
#### AC 1 - "Definition of Done" Gate
- **Condition:** Khi User chuyá»ƒn tráº¡ng thĂ¡i Project sang **DONE**.
- **Check:** Há»‡ thá»‘ng kiá»ƒm tra xem cĂ²n Task nĂ o cĂ³ tráº¡ng thĂ¡i `!= DONE` khĂ´ng.
- **Action:**
    - Náº¿u cĂ²n: Hiá»ƒn thá»‹ Modal liá»‡t kĂª cĂ¡c Task chÆ°a xong vĂ  yĂªu cáº§u xĂ¡c nháº­n: _"Há»§y bá» (Cancel) cĂ¡c task nĂ y"_ hay _"Di chuyá»ƒn (Move) sang dá»± Ă¡n khĂ¡c"_.
#### AC 2 - "Planning Approval" Gate (Integration with Module 5)
- **Condition:** Khi chuyá»ƒn sang **IN_PROGRESS**.
- **Check:** Kiá»ƒm tra xem Dá»± Ă¡n Ä‘Ă£ cĂ³ **Baseline** nĂ o Ä‘Æ°á»£c phĂª duyá»‡t chÆ°a (náº¿u báº­t cháº¿ Ä‘á»™ Strict Governance).
## 2.9. Feature: Project Objectives & Success Criteria (Má»¥c tiĂªu & TiĂªu chĂ­ ThĂ nh cĂ´ng)
### User Story 3.9
LĂ  má»™t Stakeholder, TĂ´i muá»‘n Ä‘á»‹nh nghÄ©a rĂµ rĂ ng má»¥c tiĂªu vĂ  cĂ¡c tiĂªu chĂ­ Ä‘Ă¡nh giĂ¡ thĂ nh cĂ´ng ngay tá»« Ä‘áº§u, Äá»ƒ Ä‘áº£m báº£o dá»± Ă¡n khĂ´ng chá»‰ hoĂ n thĂ nh vá» máº·t ká»¹ thuáº­t ("Done") mĂ  cĂ²n Ä‘áº¡t Ä‘Æ°á»£c giĂ¡ trá»‹ kinh doanh mong Ä‘á»£i ("Success").
### Acceptance Criteria (#AC)
#### AC 1 - Definition Input
- Trong tab "Overview", cho phĂ©p PM khai bĂ¡o:
 - **Objectives:** Má»¥c tiĂªu Ä‘á»‹nh tĂ­nh (Text/Rich Text). VĂ­ dá»¥: "NĂ¢ng cao tráº£i nghiá»‡m ngÆ°á»i dĂ¹ng".
 - **Success Criteria (KPIs):** Danh sĂ¡ch cĂ¡c tiĂªu chĂ­ Ä‘á»‹nh lÆ°á»£ng (Checklist). VĂ­ dá»¥: "TÄƒng conversion rate lĂªn 5%", "Giáº£m thá»i gian load trang < 2s".
#### AC 2 - Evaluation at Closure
- **Trigger:** Khi chuyá»ƒn tráº¡ng thĂ¡i dá»± Ă¡n sang **DONE**.
- **Action:** Há»‡ thá»‘ng hiá»ƒn thá»‹ báº£ng Ä‘Ă¡nh giĂ¡ (Scorecard) yĂªu cáº§u PM tá»± cháº¥m Ä‘iá»ƒm tá»«ng tiĂªu chĂ­:
 - _Met (Äáº¡t)_ / _Partially Met (Äáº¡t má»™t pháº§n)_ / _Missed (KhĂ´ng Ä‘áº¡t)_.
- **Audit:** Káº¿t quáº£ Ä‘Ă¡nh giĂ¡ nĂ y Ä‘Æ°á»£c lÆ°u vÄ©nh viá»…n vĂ o há»“ sÆ¡ dá»± Ă¡n Ä‘á»ƒ phá»¥c vá»¥ bĂ¡o cĂ¡o tá»•ng káº¿t.
## 2.10. Feature: Project Health Indicators (Chá»‰ bĂ¡o Sá»©c khá»e Dá»± Ă¡n)
### User Story 3.10
LĂ  má»™t Portfolio Manager, TĂ´i muá»‘n nhĂ¬n tháº¥y tráº¡ng thĂ¡i sá»©c khá»e cá»§a dá»± Ă¡n qua há»‡ thá»‘ng Ä‘Ă¨n giao thĂ´ng (Xanh/VĂ ng/Äá»), Äá»ƒ ká»‹p thá»i can thiá»‡p vĂ o cĂ¡c dá»± Ă¡n Ä‘ang gáº·p rá»§i ro mĂ  khĂ´ng cáº§n Ä‘á»c bĂ¡o cĂ¡o chi tiáº¿t.
### Acceptance Criteria ( #AC)
#### AC 1 - Auto-Calculated Health
- Há»‡ thá»‘ng tá»± Ä‘á»™ng tĂ­nh toĂ¡n 3 chá»‰ sá»‘ thĂ nh pháº§n:
 1. **Schedule Health:** Dá»±a trĂªn sá»‘ lÆ°á»£ng Task quĂ¡ háº¡n hoáº·c chá»‰ sá»‘ SPI (tá»« Module 11).
 2. **Resource Health:** Dá»±a trĂªn sá»‘ giá» lĂ m viá»‡c quĂ¡ táº£i (Overload) cá»§a thĂ nh viĂªn.
 3. **Budget Health:** Dá»±a trĂªn chi phĂ­ thá»±c táº¿ so vá»›i ngĂ¢n sĂ¡ch (náº¿u cĂ³).
#### AC 2 - Overall Traffic Light
- Tá»•ng há»£p thĂ nh tráº¡ng thĂ¡i chung:
 - đŸŸ¢ **Green (On Track):** Má»i chá»‰ sá»‘ Ä‘á»u á»•n.
 - đŸŸ¡ **Amber (At Risk):** CĂ³ 1 chá»‰ sá»‘ cáº£nh bĂ¡o (vĂ­ dá»¥: Trá»… < 10%).
 - đŸ”´ **Red (Off Track):** CĂ³ chá»‰ sá»‘ nguy hiá»ƒm (vĂ­ dá»¥: Trá»… > 10% hoáº·c Over budget).
#### AC 3 - Manual Override with Context
- PM cĂ³ quyá»n ghi Ä‘Ă¨ tráº¡ng thĂ¡i (vĂ­ dá»¥: Há»‡ thá»‘ng bĂ¡o Äá» nhÆ°ng PM biáº¿t lĂ  kiá»ƒm soĂ¡t Ä‘Æ°á»£c -> Chá»‰nh vá» VĂ ng).
- **Constraint:** Báº¯t buá»™c nháº­p "LĂ½ do/Giáº£i trĂ¬nh" khi ghi Ä‘Ă¨ thá»§ cĂ´ng.
## 2.11. Feature: Project Change Request - PCR (YĂªu cáº§u Thay Ä‘á»•i Dá»± Ă¡n)
### User Story 3.11
LĂ  má»™t PM, TĂ´i muá»‘n táº¡o yĂªu cáº§u thay Ä‘á»•i khi cĂ³ phĂ¡t sinh vá» pháº¡m vi hoáº·c thá»i gian, Äá»ƒ há»£p thá»©c hĂ³a cĂ¡c thay Ä‘á»•i so vá»›i káº¿ hoáº¡ch ban Ä‘áº§u (Baseline) thay vĂ¬ sá»­a Ä‘á»•i tĂ¹y tiá»‡n.
### Acceptance Criteria ( #AC)
#### AC 1 - PCR Creation
- **Action:** Táº¡o má»›i Change Request (CR).
- **Type:** Chá»n loáº¡i thay Ä‘á»•i: _Scope_ (Pháº¡m vi), _Schedule_ (Lá»‹ch trĂ¬nh), _Cost_ (Chi phĂ­), hoáº·c _Resource_.
- **Impact Link:** TĂ­ch há»£p vá»›i **Module 5 (CIA Panel)** Ä‘á»ƒ Ä‘Ă­nh kĂ¨m káº¿t quáº£ phĂ¢n tĂ­ch tĂ¡c Ä‘á»™ng (VĂ­ dá»¥: "Dá»i deadline 5 ngĂ y sáº½ lĂ m tÄƒng chi phĂ­ 10%").
#### AC 2 - Approval Workflow
- **Flow:** `Draft` -> `Submitted` -> `Approved` / `Rejected`.
- **Approver:** Chá»‰ nhá»¯ng ngÆ°á»i cĂ³ vai trĂ² **Steering Committee** hoáº·c **Workspace Admin** má»›i cĂ³ quyá»n duyá»‡t CR.
#### AC 3 - Post-Approval Action
- Khi CR Ä‘Æ°á»£c **Approved**:
 - Há»‡ thá»‘ng tá»± Ä‘á»™ng má»Ÿ khĂ³a (Unlock) cĂ¡c rĂ ng buá»™c trong Module 5 Ä‘á»ƒ PM cáº­p nháº­t láº¡i káº¿ hoáº¡ch.
 - Há»‡ thá»‘ng yĂªu cáº§u lÆ°u má»™t **Baseline má»›i** ngay sau khi cáº­p nháº­t xong.
## 2.12. Feature: Project Closure & Lessons Learned (ÄĂ³ng Dá»± Ă¡n & BĂ i há»c kinh nghiá»‡m)
### User Story 3.12
LĂ  má»™t PMO, TĂ´i muá»‘n thu tháº­p cĂ¡c bĂ i há»c kinh nghiá»‡m vĂ  rá»§i ro chĂ­nh khi Ä‘Ă³ng dá»± Ă¡n, Äá»ƒ lĂ m giĂ u kho tri thá»©c (Knowledge Base) vĂ  trĂ¡nh láº·p láº¡i sai láº§m trong cĂ¡c dá»± Ă¡n sau.
### Acceptance Criteria ( #AC)
#### AC 1 - Closure Wizard
- Khi chuyá»ƒn tráº¡ng thĂ¡i sang **DONE**, hiá»ƒn thá»‹ Wizard "Project Closure":
 1. BÆ°á»›c 1: ÄĂ¡nh giĂ¡ Má»¥c tiĂªu (Feature 2.9).
 2. BÆ°á»›c 2: Giáº£i phĂ³ng nguá»“n lá»±c (Release Resources).
 3. BÆ°á»›c 3: Nháº­p **Lessons Learned** (CĂ¡i gĂ¬ lĂ m tá»‘t? CĂ¡i gĂ¬ cáº§n cáº£i thiá»‡n?).
 4. BÆ°á»›c 4: XĂ¡c nháº­n LÆ°u trá»¯ (Archive).
#### AC 2 - Knowledge Recycling
- Dá»¯ liá»‡u "Lessons Learned" vĂ  "Key Risks" sáº½ Ä‘Æ°á»£c gá»£i Ă½ hiá»ƒn thá»‹ khi má»™t PM khĂ¡c táº¡o dá»± Ă¡n má»›i cĂ³ cĂ¹ng **Category** (TĂ­nh nÄƒng tĂ­ch há»£p vá»›i Module 15 - Knowledge Base).
## 2.13. Feature: Project Baseline Governance (Quáº£n trá»‹ ÄÆ°á»ng cÆ¡ sá»Ÿ Dá»± Ă¡n)
### User Story 3.13
LĂ  má»™t PMO hoáº·c Quáº£n lĂ½ Cháº¥t lÆ°á»£ng (QA), TĂ´i muá»‘n kiá»ƒm soĂ¡t cháº·t cháº½ viá»‡c táº¡o vĂ  thay Ä‘á»•i cĂ¡c phiĂªn báº£n Baseline (ÄÆ°á»ng cÆ¡ sá»Ÿ), Äá»ƒ Ä‘áº£m báº£o sá»± thay Ä‘á»•i káº¿ hoáº¡ch luĂ´n Ä‘Æ°á»£c ghi nháº­n minh báº¡ch vĂ  cĂ³ lĂ½ do chĂ­nh Ä‘Ă¡ng (TrĂ¡nh viá»‡c PM sá»­a káº¿ hoáº¡ch Ă¢m tháº§m Ä‘á»ƒ che giáº¥u sá»± cháº­m trá»…).
### Acceptance Criteria ( #AC)
#### AC 1 - Versioning Strategy (Chiáº¿n lÆ°á»£c PhiĂªn báº£n)
- **Logic:** Há»‡ thá»‘ng tá»± Ä‘á»™ng quáº£n lĂ½ phiĂªn báº£n Baseline theo quy táº¯c tÄƒng tiáº¿n:
    - **v1.0 (Initial):** ÄÆ°á»£c táº¡o tá»± Ä‘á»™ng khi Dá»± Ă¡n chuyá»ƒn tráº¡ng thĂ¡i tá»« _Not-Started_ sang _In-Progress_ (hoáº·c khi Ä‘Æ°á»£c PhĂª duyá»‡t láº§n Ä‘áº§u).
    - **v1.x (Minor):** CĂ¡c thay Ä‘á»•i nhá», Ä‘iá»u chá»‰nh ná»™i bá»™ (náº¿u cáº¥u hĂ¬nh cho phĂ©p).
    - **v2.0 (Major):** ÄÆ°á»£c táº¡o khi cĂ³ má»™t **Change Request (PCR)** lá»›n Ä‘Æ°á»£c duyá»‡t (liĂªn káº¿t vá»›i Feature 2.11).
- **Display:** Hiá»ƒn thá»‹ rĂµ danh sĂ¡ch cĂ¡c phiĂªn báº£n: _Version - Date - Created By - Context_.
#### AC 2 - Creation Conditions (Äiá»u kiá»‡n khá»Ÿi táº¡o)
- **Constraint:** NĂºt "Save Baseline" bá»‹ khĂ³a (Disabled) náº¿u:
    - Dá»± Ă¡n Ä‘ang á»Ÿ tráº¡ng thĂ¡i _Hold_ hoáº·c _Done_.
    - CĂ³ cĂ¡c Task chÆ°a Ä‘Æ°á»£c láº­p lá»‹ch (Missing Start/End Date).
    - (TĂ¹y chá»n) ChÆ°a Ä‘Æ°á»£c phĂª duyá»‡t bá»Ÿi cáº¥p trĂªn (Integration vá»›i Module 5 Approval).
#### AC 3 - Modification Constraints (RĂ ng buá»™c chá»‰nh sá»­a)
- **Rule:** Má»™t khi Ä‘Ă£ cĂ³ Baseline Active (v1.0 trá»Ÿ lĂªn):
    - Má»i hĂ nh Ä‘á»™ng thay Ä‘á»•i ngĂ y thĂ¡ng (Reschedule) trĂªn Gantt Chart Ä‘á»u kĂ­ch hoáº¡t má»™t popup **"Change Context"**.
    - **Input báº¯t buá»™c:** NgÆ°á»i dĂ¹ng pháº£i chá»n _Reason Code_ (vĂ­ dá»¥: "Scope Creep", "Resource unavailable", "Estimation Error") vĂ  nháº­p chĂº thĂ­ch trÆ°á»›c khi há»‡ thá»‘ng cho phĂ©p LÆ°u.
## 2.14. Feature: What-if Simulation & Scenario Planning (MĂ´ phá»ng & Láº­p káº¿ hoáº¡ch Ká»‹ch báº£n)
### User Story 3.14
LĂ  má»™t Project Manager, TĂ´i muá»‘n táº¡o cĂ¡c ká»‹ch báº£n mĂ´ phá»ng (vĂ­ dá»¥: "Náº¿u team Backend nghá»‰ 3 ngĂ y", "Náº¿u thĂªm 2 nhĂ¢n sá»±") vĂ  xem trÆ°á»›c tĂ¡c Ä‘á»™ng cá»§a chĂºng mĂ  khĂ´ng lĂ m áº£nh hÆ°á»Ÿng Ä‘áº¿n dá»¯ liá»‡u dá»± Ă¡n thá»±c táº¿, Äá»ƒ tĂ´i cĂ³ thá»ƒ ra quyáº¿t Ä‘á»‹nh chĂ­nh xĂ¡c nháº¥t.
### Acceptance Criteria ( #AC)
#### AC 1 - Simulation Sandbox (Há»™p cĂ¡t mĂ´ phá»ng)
- **Action:** Táº¡i mĂ n hĂ¬nh dá»± Ă¡n, user chá»n "Enter Simulation Mode".
- **System Behavior:**
    - Há»‡ thá»‘ng táº¡o má»™t báº£n sao táº¡m thá»i (Temporary Snapshot) cá»§a dá»± Ă¡n hiá»‡n táº¡i trong bá»™ nhá»› (hoáº·c báº£ng táº¡m).
    - Giao diá»‡n chuyá»ƒn sang tĂ´ng mĂ u khĂ¡c (vĂ­ dá»¥: Viá»n vĂ ng/Watermark "SIMULATION") Ä‘á»ƒ phĂ¢n biá»‡t vá»›i dá»¯ liá»‡u tháº­t.
    - Táº¡i Ä‘Ă¢y, PM Ä‘Æ°á»£c phĂ©p thoáº£i mĂ¡i thay Ä‘á»•i Date, Dependency, Resource.
#### AC 2 - Scenario Management (Quáº£n lĂ½ Ká»‹ch báº£n)
- Cho phĂ©p lÆ°u cĂ¡c phiĂªn báº£n mĂ´ phá»ng thĂ nh cĂ¡c Ká»‹ch báº£n cĂ³ tĂªn (Named Scenarios).
    - _VĂ­ dá»¥:_ Scenario A: "Optimistic Plan" (Káº¿ hoáº¡ch láº¡c quan).
    - _VĂ­ dá»¥:_ Scenario B: "Worst Case" (TrÆ°á»ng há»£p xáº¥u nháº¥t).
- CĂ¡c ká»‹ch báº£n nĂ y chá»‰ hiá»ƒn thá»‹ vá»›i PM vĂ  khĂ´ng áº£nh hÆ°á»Ÿng Ä‘áº¿n Task list cá»§a thĂ nh viĂªn (Integration with Module 4).
#### AC 3 - Impact Preview (Xem trÆ°á»›c tĂ¡c Ä‘á»™ng - Integration with Module 5)
- TrÆ°á»›c khi quyáº¿t Ä‘á»‹nh Ă¡p dá»¥ng, há»‡ thá»‘ng hiá»ƒn thá»‹ báº£ng so sĂ¡nh **Diff** giá»¯a _Simulation_ vĂ  _Live Project_:
    - **Delta Date:** Dá»± Ă¡n sáº½ xong sá»›m/trá»… bao nhiĂªu ngĂ y?
    - **Delta Cost:** Chi phĂ­ thay Ä‘á»•i tháº¿ nĂ o?
    - **Risk:** CĂ³ bao nhiĂªu Task má»›i bá»‹ rÆ¡i vĂ o Ä‘Æ°á»ng gÄƒng (Critical Path)?
#### AC 4 - Promote to Execution (Ăp dá»¥ng vĂ o thá»±c táº¿)
- **Action:** User chá»n "Apply Scenario to Live Project".
- **Validation:**
    - Náº¿u dá»± Ă¡n Ä‘ang á»Ÿ cháº¿ Ä‘á»™ Strict Governance: Há»‡ thá»‘ng tá»± Ä‘á»™ng chuyá»ƒn Ká»‹ch báº£n nĂ y thĂ nh má»™t **Change Request (PCR)** (liĂªn káº¿t Feature 2.11) Ä‘á»ƒ chá» duyá»‡t.
    - Náº¿u dá»± Ă¡n bĂ¬nh thÆ°á»ng: Cáº­p nháº­t dá»¯ liá»‡u tháº­t vĂ  táº¡o **Baseline** má»›i (náº¿u cáº¥u hĂ¬nh yĂªu cáº§u).
## 2.15. Feature: Planning Scope Governance (Quáº£n trá»‹ Pháº¡m vi Hoáº¡ch Ä‘á»‹nh)
### User Story 3.15
LĂ  má»™t Project Manager, TĂ´i muá»‘n Ä‘á»‹nh nghÄ©a rĂµ rĂ ng nhá»¯ng Ä‘áº§u viá»‡c nĂ o tham gia vĂ o tĂ­nh toĂ¡n káº¿ hoáº¡ch (Planning) vĂ  nhá»¯ng Ä‘áº§u viá»‡c nĂ o chá»‰ mang tĂ­nh cháº¥t theo dĂµi thá»±c thi (Tracking), Äá»ƒ biá»ƒu Ä‘á»“ Gantt vĂ  Ä‘Æ°á»ng gÄƒng (Critical Path) khĂ´ng bá»‹ nhiá»…u bá»Ÿi cĂ¡c cĂ´ng viá»‡c vá»¥n váº·t.
### Acceptance Criteria ( #AC)
#### AC 1 - Planning Depth Configuration (Cáº¥u hĂ¬nh Äá»™ sĂ¢u Hoáº¡ch Ä‘á»‹nh)
- **Input:** Trong Project Settings, PM cĂ³ thá»ƒ thiáº¿t láº­p "Planning Cut-off Level":
    - **Level 1 (Phase):** Chá»‰ tĂ­nh toĂ¡n lá»‹ch trĂ¬nh cho cĂ¡c Phase lá»›n.
    - **Level 2 (Task List):** TĂ­nh toĂ¡n Ä‘áº¿n cáº¥p Task List.
    - **All Levels (Default):** TĂ­nh toĂ¡n chi tiáº¿t Ä‘áº¿n tá»«ng Task.
- **Impact:** CĂ¡c Task náº±m sĂ¢u hÆ¡n má»©c Cut-off sáº½ tá»± Ä‘á»™ng cĂ³ cá» `Is_Planning_Item = False`.
#### AC 2 - Explicit Inclusion/Exclusion (Chá»‰ Ä‘á»‹nh Pháº¡m vi)
- Cho phĂ©p PM Ä‘Ă¡nh dáº¥u thá»§ cĂ´ng má»™t Task List hoáº·c Task cá»¥ thá»ƒ lĂ  **"Execution Only"** (Chá»‰ thá»±c thi).
- **Behavior:**
    - CĂ¡c Task nĂ y váº«n hiá»‡n trĂªn Board/List Ä‘á»ƒ lĂ m viá»‡c.
    - NhÆ°ng trĂªn Gantt Chart (Module 5), chĂºng bá»‹ má» Ä‘i hoáº·c áº©n (tĂ¹y view) vĂ  **khĂ´ng tham gia vĂ o thuáº­t toĂ¡n CPM** (Critical Path Method).
    - Sá»± cháº­m trá»… cá»§a cĂ¡c Task nĂ y **khĂ´ng** tá»± Ä‘á»™ng Ä‘áº©y lĂ¹i ngĂ y káº¿t thĂºc cá»§a Dá»± Ă¡n (trá»« khi PM Ä‘á»•i láº¡i cáº¥u hĂ¬nh).
#### AC 3 - Default Policy by Template
- Khi táº¡o dá»± Ă¡n tá»« Template (Feature 2.6), cáº¥u hĂ¬nh Planning Scope cÅ©ng Ä‘Æ°á»£c káº¿ thá»«a. VĂ­ dá»¥: Template "Agile" máº·c Ä‘á»‹nh chá»‰ plan á»Ÿ má»©c Epic (Level 1), Ä‘á»ƒ Dev tá»± do quáº£n lĂ½ Task con.
## 2.16. Feature: Advanced Dependency Configuration (Cáº¥u hĂ¬nh Phá»¥ thuá»™c NĂ¢ng cao)
### User Story 3.16
LĂ  má»™t Planner/Scheduler chuyĂªn nghiá»‡p, TĂ´i muá»‘n thiáº¿t láº­p dá»± Ă¡n sá»­ dá»¥ng mĂ´ hĂ¬nh phá»¥ thuá»™c nĂ¢ng cao (PDM) bao gá»“m cĂ¡c quan há»‡ song song vĂ  gá»‘i Ä‘áº§u, Äá»ƒ mĂ´ phá»ng chĂ­nh xĂ¡c thá»±c táº¿ thi cĂ´ng (vĂ­ dá»¥: "Vá»«a xĂ¢y vá»«a trĂ¡t") thay vĂ¬ chá»‰ xáº¿p hĂ ng tuáº§n tá»± cá»©ng nháº¯c.
### Acceptance Criteria ( #AC)
#### AC 1 - Supported Dependency Types (CĂ¡c loáº¡i phá»¥ thuá»™c)
- Trong cáº¥u hĂ¬nh dá»± Ă¡n, cho phĂ©p kĂ­ch hoáº¡t bá»™ 4 loáº¡i quan há»‡ chuáº©n PDM:
    1. **FS (Finish-to-Start):** Máº·c Ä‘á»‹nh. Task A xong thĂ¬ Task B má»›i báº¯t Ä‘áº§u.
    2. **SS (Start-to-Start):** Task B báº¯t Ä‘áº§u cĂ¹ng lĂºc (hoáº·c sau má»™t khoáº£ng) vá»›i khi Task A báº¯t Ä‘áº§u. _(DĂ¹ng cho cĂ´ng viá»‡c song song)_.
    3. **FF (Finish-to-Finish):** Task B chá»‰ Ä‘Æ°á»£c káº¿t thĂºc khi Task A Ä‘Ă£ káº¿t thĂºc. _(DĂ¹ng cho cĂ´ng viá»‡c nghiá»‡m thu/kiá»ƒm thá»­)_.
    4. **SF (Start-to-Finish):** Task A báº¯t Ä‘áº§u lĂ  Ä‘iá»u kiá»‡n Ä‘á»ƒ Task B káº¿t thĂºc. _(Ăt dĂ¹ng, dĂ nh cho quáº£n lĂ½ ca kĂ­p/kho bĂ£i)_.
#### AC 2 - Lead & Lag Time (Äá»™ trá»… & Äá»™ sá»›m)
- Cho phĂ©p Ä‘á»‹nh nghÄ©a tham sá»‘ **Offset** trĂªn má»—i má»‘i ná»‘i:
    - **Lag (+):** Thá»i gian chá». _VĂ­ dá»¥: FS + 2d (A xong, chá» 2 ngĂ y cho khĂ´ bĂª tĂ´ng rá»“i má»›i lĂ m B)._
    - **Lead (-):** Thá»i gian lĂ m sá»›m (Gá»‘i Ä‘áº§u). _VĂ­ dá»¥: FS - 1d (B báº¯t Ä‘áº§u trÆ°á»›c khi A xong 1 ngĂ y)._
#### AC 3 - Validation Mode (Cháº¿ Ä‘á»™ Kiá»ƒm tra)
- Thiáº¿t láº­p cháº¿ Ä‘á»™ kiá»ƒm tra logic khi táº¡o Dependency:
    - **Strict:** Cháº·n cĂ¡c má»‘i ná»‘i táº¡o ra vĂ²ng láº·p (Circular Loop) hoáº·c mĂ¢u thuáº«n logic (vá»«a SS vá»«a FF cháº·t cháº½ gĂ¢y bĂ³ cá»©ng lá»‹ch).
    - **Lenient:** Cho phĂ©p táº¡o nhÆ°ng hiá»‡n cáº£nh bĂ¡o (Warning).
## 2.14. Feature: What-if Simulation & Scenario Planning (MĂ´ phá»ng & Láº­p káº¿ hoáº¡ch Ká»‹ch báº£n)
### User Story 3.14
LĂ  má»™t Project Manager, TĂ´i muá»‘n táº¡o cĂ¡c ká»‹ch báº£n mĂ´ phá»ng (vĂ­ dá»¥: "Náº¿u team Backend nghá»‰ 3 ngĂ y", "Náº¿u thĂªm 2 nhĂ¢n sá»±") vĂ  xem trÆ°á»›c tĂ¡c Ä‘á»™ng cá»§a chĂºng mĂ  khĂ´ng lĂ m áº£nh hÆ°á»Ÿng Ä‘áº¿n dá»¯ liá»‡u dá»± Ă¡n thá»±c táº¿, Äá»ƒ tĂ´i cĂ³ thá»ƒ ra quyáº¿t Ä‘á»‹nh chĂ­nh xĂ¡c nháº¥t.
### Acceptance Criteria ( #AC)
#### AC 1 - Simulation Sandbox (Há»™p cĂ¡t mĂ´ phá»ng)
- **Action:** Táº¡i mĂ n hĂ¬nh dá»± Ă¡n, user chá»n "Enter Simulation Mode".
- **System Behavior:**
    - Há»‡ thá»‘ng táº¡o má»™t báº£n sao táº¡m thá»i (Temporary Snapshot) cá»§a dá»± Ă¡n hiá»‡n táº¡i trong bá»™ nhá»› (hoáº·c báº£ng táº¡m).
    - Giao diá»‡n chuyá»ƒn sang tĂ´ng mĂ u khĂ¡c (vĂ­ dá»¥: Viá»n vĂ ng/Watermark "SIMULATION") Ä‘á»ƒ phĂ¢n biá»‡t vá»›i dá»¯ liá»‡u tháº­t.
    - Táº¡i Ä‘Ă¢y, PM Ä‘Æ°á»£c phĂ©p thoáº£i mĂ¡i thay Ä‘á»•i Date, Dependency, Resource.
#### AC 2 - Scenario Management (Quáº£n lĂ½ Ká»‹ch báº£n)
- Cho phĂ©p lÆ°u cĂ¡c phiĂªn báº£n mĂ´ phá»ng thĂ nh cĂ¡c Ká»‹ch báº£n cĂ³ tĂªn (Named Scenarios).
    - _VĂ­ dá»¥:_ Scenario A: "Optimistic Plan" (Káº¿ hoáº¡ch láº¡c quan).
    - _VĂ­ dá»¥:_ Scenario B: "Worst Case" (TrÆ°á»ng há»£p xáº¥u nháº¥t).
- CĂ¡c ká»‹ch báº£n nĂ y chá»‰ hiá»ƒn thá»‹ vá»›i PM vĂ  khĂ´ng áº£nh hÆ°á»Ÿng Ä‘áº¿n Task list cá»§a thĂ nh viĂªn (Integration with Module 4).
#### AC 3 - Impact Preview (Xem trÆ°á»›c tĂ¡c Ä‘á»™ng - Integration with Module 5)
- TrÆ°á»›c khi quyáº¿t Ä‘á»‹nh Ă¡p dá»¥ng, há»‡ thá»‘ng hiá»ƒn thá»‹ báº£ng so sĂ¡nh **Diff** giá»¯a _Simulation_ vĂ  _Live Project_:
    - **Delta Date:** Dá»± Ă¡n sáº½ xong sá»›m/trá»… bao nhiĂªu ngĂ y?
    - **Delta Cost:** Chi phĂ­ thay Ä‘á»•i tháº¿ nĂ o?
    - **Risk:** CĂ³ bao nhiĂªu Task má»›i bá»‹ rÆ¡i vĂ o Ä‘Æ°á»ng gÄƒng (Critical Path)?
#### AC 4 - Promote to Execution (Ăp dá»¥ng vĂ o thá»±c táº¿)
- **Action:** User chá»n "Apply Scenario to Live Project".
- **Validation:**
    - Náº¿u dá»± Ă¡n Ä‘ang á»Ÿ cháº¿ Ä‘á»™ Strict Governance: Há»‡ thá»‘ng tá»± Ä‘á»™ng chuyá»ƒn Ká»‹ch báº£n nĂ y thĂ nh má»™t **Change Request (PCR)** (liĂªn káº¿t Feature 2.11) Ä‘á»ƒ chá» duyá»‡t.
    - Náº¿u dá»± Ă¡n bĂ¬nh thÆ°á»ng: Cáº­p nháº­t dá»¯ liá»‡u tháº­t vĂ  táº¡o **Baseline** má»›i (náº¿u cáº¥u hĂ¬nh yĂªu cáº§u).
## 2.17. Feature: Planning Freeze & Rolling Wave Lock (KhĂ³a Káº¿ hoáº¡ch & VĂ¹ng Ä‘Ă³ng bÄƒng)
### User Story 3.17

LĂ  má»™t Team Lead, TĂ´i muá»‘n thiáº¿t láº­p má»™t "VĂ¹ng Ä‘Ă³ng bÄƒng" (Freeze Window) cho khoáº£ng thá»i gian sáº¯p tá»›i (vĂ­ dá»¥: 1 tuáº§n tá»›i), Äá»ƒ Ä‘áº£m báº£o cĂ¡c cĂ´ng viá»‡c sáº¯p triá»ƒn khai khĂ´ng bá»‹ thay Ä‘á»•i lá»‹ch trĂ¬nh tĂ¹y tiá»‡n, giĂºp team yĂªn tĂ¢m thá»±c thi.
### Acceptance Criteria ( #AC)
#### AC 1 - Freeze Window Configuration (Cáº¥u hĂ¬nh VĂ¹ng Ä‘Ă³ng bÄƒng)
- **Input:** Trong Project Settings, cho phĂ©p thiáº¿t láº­p tham sá»‘ `Freeze Duration` (vĂ­ dá»¥: 5 Working Days).
- **Logic:** Há»‡ thá»‘ng tá»± Ä‘á»™ng tĂ­nh toĂ¡n vĂ¹ng Ä‘Ă³ng bÄƒng lĂ  khoáº£ng thá»i gian tá»« `Current Date` Ä‘áº¿n `Current Date + Freeze Duration`.
- **Visual:** TrĂªn Gantt Chart (Module 5), vĂ¹ng thá»i gian nĂ y Ä‘Æ°á»£c tĂ´ ná»n xĂ¡m hoáº·c cĂ³ gáº¡ch chĂ©o (Hatched pattern) Ä‘á»ƒ bĂ¡o hiá»‡u trá»±c quan.
#### AC 2 - Enforcement Mechanism (CÆ¡ cháº¿ CÆ°á»¡ng cháº¿)
- **Constraint:** Má»i hĂ nh Ä‘á»™ng cá»‘ gáº¯ng thay Ä‘á»•i `Start Date`, `End Date` hoáº·c `Dependency` cá»§a cĂ¡c Task náº±m trong vĂ¹ng Ä‘Ă³ng bÄƒng sáº½ bá»‹ cháº·n (Block).
- **Message:** Hiá»ƒn thá»‹ thĂ´ng bĂ¡o lá»—i: _"Task nĂ y náº±m trong vĂ¹ng Ä‘Ă³ng bÄƒng (Freeze Zone). Lá»‹ch trĂ¬nh Ä‘Ă£ Ä‘Æ°á»£c cam káº¿t vĂ  khĂ´ng thá»ƒ thay Ä‘á»•i."_
#### AC 3 - Exception Handling via PCR (Xá»­ lĂ½ Ngoáº¡i lá»‡)
- **Override:** Náº¿u thá»±c sá»± cáº§n thay Ä‘á»•i (vĂ­ dá»¥: Kháº©n cáº¥p), PM pháº£i thá»±c hiá»‡n quy trĂ¬nh:
    1. Táº¡o **Change Request (PCR)** (Feature 2.11) vá»›i loáº¡i lĂ  "Emergency Schedule Change".
    2. Sau khi PCR Ä‘Æ°á»£c duyá»‡t, há»‡ thá»‘ng má»Ÿ khĂ³a táº¡m thá»i (Temporary Unlock) cho Task Ä‘Ă³ Ä‘á»ƒ sá»­a Ä‘á»•i.
## 2.19. Feature: Project Ownership Transfer (Chuyá»ƒn giao Quyá»n sá»Ÿ há»¯u Dá»± Ă¡n)
### User Story 3.19
LĂ  má»™t Workspace Admin, TĂ´i muá»‘n chuyá»ƒn quyá»n sá»Ÿ há»¯u dá»± Ă¡n (Project Owner) tá»« nhĂ¢n viĂªn nĂ y sang nhĂ¢n viĂªn khĂ¡c, Äá»ƒ Ä‘áº£m báº£o hoáº¡t Ä‘á»™ng quáº£n trá»‹ dá»± Ă¡n Ä‘Æ°á»£c liĂªn tá»¥c khi ngÆ°á»i quáº£n lĂ½ cÅ© nghá»‰ viá»‡c hoáº·c luĂ¢n chuyá»ƒn cĂ´ng tĂ¡c.
### Acceptance Criteria (#AC)
#### AC 1 - Admin-Only Privilege (Äáº·c quyá»n Admin)
- **Constraint:** TĂ­nh nÄƒng "Transfer Ownership" chá»‰ hiá»ƒn thá»‹ vĂ  thá»±c thi Ä‘Æ°á»£c bá»Ÿi **Workspace Owner** hoáº·c **Workspace Admin**.
- **Restriction:** Project Manager hiá»‡n táº¡i (Current Owner) **KHĂ”NG** Ä‘Æ°á»£c tá»± Ă½ chuyá»ƒn quyá»n cho ngÆ°á»i khĂ¡c (Ä‘á»ƒ trĂ¡nh viá»‡c chá»‘i bá» trĂ¡ch nhiá»‡m khi dá»± Ă¡n gáº·p sá»± cá»‘).
#### AC 2 - Audit Trail Requirement (YĂªu cáº§u Ghi váº¿t)
- **Input:** Khi thá»±c hiá»‡n chuyá»ƒn Ä‘á»•i, há»‡ thá»‘ng báº¯t buá»™c Admin nháº­p **"Reason for Transfer"** (LĂ½ do chuyá»ƒn giao).
- **Logging:** Há»‡ thá»‘ng ghi láº¡i báº£n ghi lá»‹ch sá»­ khĂ´ng thá»ƒ sá»­a xĂ³a:
    - `old_owner`: [TĂªn ngÆ°á»i cÅ©]
    - `new_owner`: [TĂªn ngÆ°á»i má»›i]
    - `reason`: [LĂ½ do nháº­p vĂ o]
    - `timestamp`: [Thá»i gian thá»±c hiá»‡n]
    - `executor`: [Admin thá»±c hiá»‡n]
#### AC 3 - Role Swapping Logic (Logic HoĂ¡n Ä‘á»•i Vai trĂ²)
- **Action:** Sau khi xĂ¡c nháº­n chuyá»ƒn:
    1. **New Owner:** ÄÆ°á»£c nĂ¢ng quyá»n lĂªn **Project Manager**.
    2. **Old Owner:** Há»‡ thá»‘ng hiá»ƒn thá»‹ há»™p thoáº¡i há»i Admin: _"Giá»¯ ngÆ°á»i cÅ© lĂ m Member hay XĂ³a khá»i dá»± Ă¡n?"_.
- **Notification:** Gá»­i email thĂ´ng bĂ¡o cho cáº£ NgÆ°á»i cÅ© vĂ  NgÆ°á»i má»›i vá» sá»± thay Ä‘á»•i nĂ y.
## 2.20. Feature: Project Priority & Strategic Alignment (Äá»™ Æ°u tiĂªn & Äá»‹nh hÆ°á»›ng Chiáº¿n lÆ°á»£c)
### User Story 3.20
LĂ  má»™t GiĂ¡m Ä‘á»‘c Danh má»¥c (Portfolio Manager), TĂ´i muá»‘n gĂ¡n má»©c Ä‘á»™ Æ°u tiĂªn vĂ  Ä‘Ă¡nh trá»ng sá»‘ chiáº¿n lÆ°á»£c cho tá»«ng dá»± Ă¡n, Äá»ƒ há»‡ thá»‘ng cĂ³ cÆ¡ sá»Ÿ tá»± Ä‘á»™ng há»— trá»£ ra quyáº¿t Ä‘á»‹nh phĂ¢n bá»• nguá»“n lá»±c khi xáº£y ra xung Ä‘á»™t (Resource Contention).
### Acceptance Criteria (#AC)
#### AC 1 - Priority Metadata
- **Input:** Trong pháº§n cĂ i Ä‘áº·t chung (General Settings), bá»• sung trÆ°á»ng `Priority` (Dropdown):
    - **Critical (Nguy cáº¥p):** Dá»± Ă¡n sá»‘ng cĂ²n, Ä‘Æ°á»£c Æ°u tiĂªn nguá»“n lá»±c tuyá»‡t Ä‘á»‘i.
    - **High (Cao):** Dá»± Ă¡n trá»ng Ä‘iá»ƒm.
    - **Medium (Trung bĂ¬nh):** Dá»± Ă¡n tiĂªu chuáº©n (Default).
    - **Low (Tháº¥p):** Dá»± Ă¡n ná»™i bá»™ hoáº·c lĂ m khi ráº£nh (Fillers).
- **Visualization:** Hiá»ƒn thá»‹ Badge mĂ u tÆ°Æ¡ng á»©ng (Äá»/Cam/Xanh/XĂ¡m) cáº¡nh tĂªn dá»± Ă¡n trong má»i danh sĂ¡ch.
#### AC 2 - Strategic Alignment (Äá»‹nh hÆ°á»›ng chiáº¿n lÆ°á»£c)
- **Input:** TrÆ°á»ng `Strategic Value` (Thang Ä‘iá»ƒm 1-10 hoáº·c Tags).
    - _VĂ­ dá»¥:_ "Digital Transformation", "Revenue Growth", "Compliance".
- **Usage:** DĂ¹ng Ä‘á»ƒ lá»c vĂ  gom nhĂ³m trong bĂ¡o cĂ¡o Portfolio (Module 11).
#### AC 3 - Impact on Resource Leveling (Integration with Module 5)
- **Logic:** Thuá»™c tĂ­nh nĂ y lĂ  Ä‘áº§u vĂ o quan trá»ng cho thuáº­t toĂ¡n **Auto-Leveling** cá»§a PhĂ¢n há»‡ 5.
    - _Rule:_ Khi User A bá»‹ trĂ¹ng lá»‹ch giá»¯a Dá»± Ă¡n X (Critical) vĂ  Dá»± Ă¡n Y (Low), há»‡ thá»‘ng sáº½ tá»± Ä‘á»™ng dá»i lá»‹ch cá»§a Dá»± Ă¡n Y vĂ  giá»¯ nguyĂªn Dá»± Ă¡n X.
## 2.21. Feature: Progressive Governance Configuration (Cáº¥u hĂ¬nh Quáº£n trá»‹ LÅ©y tiáº¿n)
### User Story 3.21
LĂ  má»™t Project Manager, TĂ´i muá»‘n lá»±a chá»n má»©c Ä‘á»™ nghiĂªm ngáº·t cá»§a quy trĂ¬nh quáº£n trá»‹ (Simple hoáº·c Strict) Ä‘á»ƒ phĂ¹ há»£p vá»›i quy mĂ´ vĂ  vÄƒn hĂ³a lĂ m viá»‡c cá»§a team, trĂ¡nh viá»‡c quy trĂ¬nh phá»©c táº¡p lĂ m cháº­m tiáº¿n Ä‘á»™ cá»§a cĂ¡c dá»± Ă¡n nhá».
### Acceptance Criteria (#AC)
#### AC 1 - Governance Mode Selection (Lá»±a chá»n Cháº¿ Ä‘á»™)
- **Input:** Trong Project Settings, cung cáº¥p tĂ¹y chá»n `Governance Mode`:
    1. **Simple Mode (Máº·c Ä‘á»‹nh):** DĂ nh cho team nhá», Agile, Fast-paced.
    2. **Strict Mode (Enterprise):** DĂ nh cho dá»± Ă¡n lá»›n, cĂ³ há»£p Ä‘á»“ng fix-price, yĂªu cáº§u tuĂ¢n thá»§ cao.
#### AC 2 - Simple Mode Behavior (CÆ¡ cháº¿ ÄÆ¡n giáº£n)
- Khi chá»n Simple Mode, há»‡ thá»‘ng tá»± Ä‘á»™ng **áº©n/táº¯t** cĂ¡c tĂ­nh nÄƒng rÆ°á»m rĂ :
    - **Baseline:** Cho phĂ©p sá»­a ngĂ y trá»±c tiáº¿p trĂªn Gantt mĂ  _khĂ´ng cáº§n_ Change Context.
    - **PCR:** Táº¯t quy trĂ¬nh duyá»‡t thay Ä‘á»•i. PM sá»­a lĂ  xong.
    - **Freeze Window:** Táº¯t cáº£nh bĂ¡o vĂ¹ng Ä‘Ă³ng bÄƒng.
    - **Approval Gate:** Táº¯t cá»•ng phĂª duyá»‡t khi chuyá»ƒn tráº¡ng thĂ¡i dá»± Ă¡n.
- **UI:** Giao diá»‡n trá»Ÿ nĂªn gá»n nháº¹, áº©n cĂ¡c nĂºt "Request Approval", "Baseline Version".
#### AC 3 - Strict Mode Behavior (CÆ¡ cháº¿ NghiĂªm ngáº·t)
- Khi chá»n Strict Mode, há»‡ thá»‘ng **kĂ­ch hoáº¡t toĂ n bá»™** hĂ ng rĂ o báº£o vá»‡:
    - Báº¯t buá»™c dĂ¹ng PCR Ä‘á»ƒ Ä‘á»•i Scope/Time.
    - Báº¯t buá»™c nháº­p lĂ½ do khi sá»­a Baseline.
    - Cháº·n sá»­a Task trong Freeze Window.
    - Báº¯t buá»™c kiá»ƒm tra Ä‘á»§ Ä‘iá»u kiá»‡n (DoD) má»›i cho Close dá»± Ă¡n.
# 3. Business Rules
## 3.1. Project Key Generation:
 - Má»—i dá»± Ă¡n cĂ³ má»™t `Prefix Key` (vĂ­ dá»¥: "Marketing Campaign" -> Key: `MAR`).
 - CĂ¡c Task trong dá»± Ă¡n sáº½ cĂ³ ID dá»±a trĂªn Key nĂ y: `MAR-1`, `MAR-2`.
 - Quy táº¯c: Tá»± Ä‘á»™ng láº¥y 3-4 chá»¯ cĂ¡i Ä‘áº§u, in hoa. Cho phĂ©p User sá»­a láº¡i lĂºc táº¡o dá»± Ă¡n, nhÆ°ng pháº£i duy nháº¥t trong Workspace.
## 3.2. Date Constraint Logic:
 - `start_date` vĂ  `end_date` lĂ  Optional.
 - Tuy nhiĂªn, náº¿u Task con cĂ³ thá»i háº¡n náº±m ngoĂ i khoáº£ng thá»i gian cá»§a Dá»± Ă¡n -> Há»‡ thá»‘ng hiá»ƒn thá»‹ Cáº£nh bĂ¡o (Warning) nhÆ°ng khĂ´ng cháº·n (Soft Constraint).
## 3.3. Kanban View Logic:
 - MĂ n hĂ¬nh "All Projects" nhĂ³m dá»± Ă¡n theo `Status`.
 - Sáº¯p xáº¿p máº·c Ä‘á»‹nh: `Priority` (High -> Low) sau Ä‘Ă³ Ä‘áº¿n `Last Updated`.
## 3.4. Quy táº¯c Äá»‹nh danh (Project Key Immutability)
- **Project Key** (vĂ­ dá»¥: `PROJ-1`) lĂ  Ä‘á»‹nh danh duy nháº¥t dĂ¹ng trong URL vĂ  commit message (Git Integration).
- Sau khi dá»± Ă¡n Ä‘Ă£ táº¡o Task Ä‘áº§u tiĂªn, **KHĂ”NG** cho phĂ©p Ä‘á»•i Project Key ná»¯a Ä‘á»ƒ Ä‘áº£m báº£o tĂ­nh toĂ n váº¹n cá»§a cĂ¡c Ä‘Æ°á»ng dáº«n (Deep Links) vĂ  lá»‹ch sá»­ hoáº¡t Ä‘á»™ng.
## 3.5. Quy táº¯c LÆ°u trá»¯ (Archiving Strategy - Integration with Module 8)
- Khi Dá»± Ă¡n chuyá»ƒn sang tráº¡ng thĂ¡i **DONE** hoáº·c **CANCELLED**:
    - Sau 30 ngĂ y (cáº¥u hĂ¬nh máº·c Ä‘á»‹nh): Há»‡ thá»‘ng gá»£i Ă½ **Archive** (LÆ°u trá»¯) Ä‘á»ƒ áº©n khá»i danh sĂ¡ch chá»n nhanh, giĂºp giao diá»‡n gá»n gĂ ng.
    - Dá»± Ă¡n Archived chuyá»ƒn sang cháº¿ Ä‘á»™ **Read-only** hoĂ n toĂ n (bao gá»“m cáº£ Task vĂ  Comment). Muá»‘n sá»­a pháº£i **Unarchive**.
## 3.6. Quy táº¯c TĂ­nh toĂ¡n Sá»©c khá»e (Health Computation Logic)
- **Real-time vs. Periodic:** Chá»‰ sá»‘ sá»©c khá»e Ä‘Æ°á»£c tĂ­nh toĂ¡n láº¡i sau má»—i 4 giá» hoáº·c khi cĂ³ sá»± kiá»‡n lá»›n (HoĂ n thĂ nh Phase, Thay Ä‘á»•i ngĂ y thĂ¡ng). KhĂ´ng tĂ­nh toĂ¡n real-time liĂªn tá»¥c Ä‘á»ƒ trĂ¡nh lock database.
- **Inheritance:** Náº¿u Dá»± Ă¡n con (Sub-project) bá»‹ **Red**, Dá»± Ă¡n cha (Program) cÅ©ng sáº½ bá»‹ áº£nh hÆ°á»Ÿng (hiá»ƒn thá»‹ cáº£nh bĂ¡o).
## 3.7. Quy táº¯c Thay Ä‘á»•i Pháº¡m vi (Scope Change Governance)
- Náº¿u Dá»± Ă¡n Ä‘ang á»Ÿ tráº¡ng thĂ¡i **Strict Mode** (Cháº¿ Ä‘á»™ nghiĂªm ngáº·t):
    - KhĂ´ng cho phĂ©p thay Ä‘á»•i `End Date` cá»§a Dá»± Ă¡n hoáº·c thĂªm `Task List` má»›i náº¿u khĂ´ng cĂ³ **PCR** (Change Request) Ä‘Æ°á»£c duyá»‡t.
    - Má»i ná»— lá»±c thay Ä‘á»•i trá»±c tiáº¿p sáº½ bá»‹ cháº·n vĂ  hiá»ƒn thá»‹ thĂ´ng bĂ¡o: _"Vui lĂ²ng táº¡o Change Request Ä‘á»ƒ thá»±c hiá»‡n thay Ä‘á»•i nĂ y."_
## 3.8. Quy táº¯c Báº¥t biáº¿n Baseline (Baseline Immutability)
- CĂ¡c phiĂªn báº£n Baseline cÅ© (Historical Baselines) lĂ  tĂ i sáº£n kiá»ƒm toĂ¡n (Audit Assets).
- **Tuyá»‡t Ä‘á»‘i khĂ´ng** cho phĂ©p sá»­a Ä‘á»•i hoáº·c xĂ³a bá» cĂ¡c Baseline cÅ©. Chá»‰ cho phĂ©p táº¡o phiĂªn báº£n má»›i Ä‘Ă¨ lĂªn lĂ m "Current Baseline" Ä‘á»ƒ so sĂ¡nh.
## 3.9. Quy táº¯c Äá»“ng bá»™ Tráº¡ng thĂ¡i (Baseline-Status Sync)
- Khi Dá»± Ă¡n quay láº¡i tráº¡ng thĂ¡i **Not-Started** (Reset dá»± Ă¡n), há»‡ thá»‘ng cĂ³ quyá»n (tĂ¹y chá»n) lÆ°u trá»¯ Baseline hiá»‡n táº¡i vĂ o Archive vĂ  reset vá» tráº¡ng thĂ¡i chÆ°a cĂ³ Baseline Ä‘á»ƒ láº­p káº¿ hoáº¡ch láº¡i tá»« Ä‘áº§u.
## 3.10. Quy táº¯c CĂ´ láº­p Dá»¯ liá»‡u MĂ´ phá»ng (Simulation Isolation Rule)
- **Notifications:** Tuyá»‡t Ä‘á»‘i **KHĂ”NG** gá»­i email hay thĂ´ng bĂ¡o (Notification) cho thĂ nh viĂªn khi PM Ä‘ang thao tĂ¡c trong cháº¿ Ä‘á»™ Simulation.
- **Audit Logs:** CĂ¡c thao tĂ¡c trong Simulation khĂ´ng ghi vĂ o Audit Log chĂ­nh cá»§a dá»± Ă¡n, chá»‰ ghi log vĂ o lá»‹ch sá»­ phiĂªn lĂ m viá»‡c cá»§a PM.
## 3.11. Quy táº¯c Tá»± há»§y (Ephemeral Data Rule)
- CĂ¡c Ká»‹ch báº£n mĂ´ phá»ng (Scenarios) chÆ°a Ä‘Æ°á»£c lÆ°u (Unsaved) sáº½ tá»± Ä‘á»™ng bá»‹ há»§y khi phiĂªn lĂ m viá»‡c káº¿t thĂºc hoáº·c sau 24 giá» Ä‘á»ƒ giáº£i phĂ³ng tĂ i nguyĂªn há»‡ thá»‘ng.
## 3.12. Quy táº¯c TĂ¡ch biá»‡t Hoáº¡ch Ä‘á»‹nh & Thá»±c thi (Planning-Execution Decoupling Rule)
- **Planning Items (Má»¥c hoáº¡ch Ä‘á»‹nh):** LĂ  xÆ°Æ¡ng sá»‘ng cá»§a dá»± Ă¡n. Thay Ä‘á»•i ngĂ y thĂ¡ng cá»§a cĂ¡c má»¥c nĂ y sáº½ kĂ­ch hoáº¡t tĂ­nh toĂ¡n láº¡i toĂ n bá»™ lá»‹ch trĂ¬nh (Cascade Update) vĂ  áº£nh hÆ°á»Ÿng Ä‘áº¿n Baseline.
- **Tracking Items (Má»¥c theo dĂµi):** LĂ  "thá»‹t" Ä‘áº¯p vĂ o xÆ°Æ¡ng sá»‘ng. ChĂºng cĂ³ thá»ƒ trá»… háº¡n, kĂ©o dĂ i thá»i gian thá»±c táº¿ (Actual Duration) nhÆ°ng khĂ´ng Ä‘Æ°á»£c phĂ©p lĂ m thay Ä‘á»•i ngĂ y káº¿ hoáº¡ch (Planned Date) cá»§a cĂ¡c Planning Items cha, trá»« khi cĂ³ can thiá»‡p thá»§ cĂ´ng.
## 3.13. Quy táº¯c TĂ­nh toĂ¡n PDM (PDM Calculation Rules)
Quy Ä‘á»‹nh cĂ¡ch Module 5 xá»­ lĂ½ cĂ¡c loáº¡i Dependency Ä‘Æ°á»£c Ä‘á»‹nh nghÄ©a trong Module 3:
- **NguyĂªn táº¯c "Thá»a mĂ£n táº¥t cáº£":** Náº¿u má»™t Task cĂ³ nhiá»u Predecessors, ngĂ y báº¯t Ä‘áº§u/káº¿t thĂºc cá»§a nĂ³ pháº£i thá»a mĂ£n **táº¥t cáº£** cĂ¡c rĂ ng buá»™c.
    - $Start(B) \geq \max( Constraint_1, Constraint_2, ... )$
- **Quy Ä‘á»•i Offset:** Má»i Ä‘Æ¡n vá»‹ Lag/Lead pháº£i Ä‘Æ°á»£c quy Ä‘á»•i ra "Working Days" (NgĂ y lĂ m viá»‡c) dá»±a trĂªn Calendar cá»§a dá»± Ă¡n (trá»« khi cĂ³ Ä‘Ă¡nh dáº¥u lĂ  _Elapsed Days_ - ngĂ y lá»‹ch).
## 3.10. Quy táº¯c CĂ´ láº­p Dá»¯ liá»‡u MĂ´ phá»ng (Simulation Isolation Rule)
- **Notifications:** Tuyá»‡t Ä‘á»‘i **KHĂ”NG** gá»­i email hay thĂ´ng bĂ¡o (Notification) cho thĂ nh viĂªn khi PM Ä‘ang thao tĂ¡c trong cháº¿ Ä‘á»™ Simulation.
- **Audit Logs:** CĂ¡c thao tĂ¡c trong Simulation khĂ´ng ghi vĂ o Audit Log chĂ­nh cá»§a dá»± Ă¡n, chá»‰ ghi log vĂ o lá»‹ch sá»­ phiĂªn lĂ m viá»‡c cá»§a PM.
## 3.11. Quy táº¯c Tá»± há»§y (Ephemeral Data Rule)
- CĂ¡c Ká»‹ch báº£n mĂ´ phá»ng (Scenarios) chÆ°a Ä‘Æ°á»£c lÆ°u (Unsaved) sáº½ tá»± Ä‘á»™ng bá»‹ há»§y khi phiĂªn lĂ m viá»‡c káº¿t thĂºc hoáº·c sau 24 giá» Ä‘á»ƒ giáº£i phĂ³ng tĂ i nguyĂªn há»‡ thá»‘ng.
## 3.14. Quy táº¯c Cam káº¿t Ngáº¯n háº¡n (Short-term Commitment Rule)

- CĂ¡c Task náº±m trong **Freeze Window** Ä‘Æ°á»£c há»‡ thá»‘ng coi lĂ  "Hard Commitment" (Cam káº¿t cá»©ng).
- **Impact:**
    - TĂ­nh nÄƒng **Auto-Scheduling** (Module 5) sáº½ tá»± Ä‘á»™ng bá» qua (Skip) cĂ¡c Task nĂ y khi tĂ­nh toĂ¡n dá»“n toa. ChĂºng Ä‘Ă³ng vai trĂ² nhÆ° cĂ¡c "cá»c neo" giá»¯ cá»‘ Ä‘á»‹nh lá»‹ch trĂ¬nh.
    - Náº¿u má»™t Task trÆ°á»›c Ä‘Ă³ (Predecessor) bá»‹ trá»… vĂ  Ä‘áº©y lĂ¹i Task trong Freeze Zone, há»‡ thá»‘ng sáº½ bĂ¡o **Conflict** (Xung Ä‘á»™t) thay vĂ¬ tá»± Ä‘á»™ng dá»i lá»‹ch.
## 3.16. Quy táº¯c PhĂ¢n biá»‡t "HOLD" vĂ  "FREEZE" (Disambiguation Rule)
Äá»ƒ trĂ¡nh nháº§m láº«n vá» máº·t nghiá»‡p vá»¥, há»‡ thá»‘ng quy Ä‘á»‹nh rĂµ sá»± khĂ¡c biá»‡t giá»¯a hai tráº¡ng thĂ¡i nĂ y nhÆ° sau:

|**TiĂªu chĂ­**|**HOLD (Táº¡m dá»«ng)**|**FREEZE (ÄĂ³ng bÄƒng)**|
|---|---|---|
|**Báº£n cháº¥t**|**Strategic Pause (Táº¡m dá»«ng Chiáº¿n lÆ°á»£c)**|**Operational Lock (KhĂ³a Váº­n hĂ nh)**|
|**Pháº¡m vi**|ToĂ n bá»™ Dá»± Ă¡n (Project Level).|Má»™t khoáº£ng thá»i gian cá»¥ thá»ƒ (Time Range) trĂªn lá»‹ch trĂ¬nh.|
|**TĂ¡c Ä‘á»™ng**|**Ngá»«ng táº¥t cáº£ hoáº¡t Ä‘á»™ng:** KhĂ´ng Ä‘Æ°á»£c táº¡o Task má»›i, khĂ´ng Ä‘Æ°á»£c Log time, khĂ´ng Ä‘Æ°á»£c Comment. Dá»± Ă¡n "ngá»§ Ä‘Ă´ng".|**Dá»± Ă¡n váº«n cháº¡y bĂ¬nh thÆ°á»ng:** Má»i ngÆ°á»i váº«n lĂ m viá»‡c, log time, update status. Chá»‰ **KHĂ”NG** Ä‘Æ°á»£c thay Ä‘á»•i ngĂ y thĂ¡ng (Reschedule).|
|**Má»¥c Ä‘Ă­ch**|DĂ¹ng khi chá» ngĂ¢n sĂ¡ch, chá» quyáº¿t Ä‘á»‹nh BLÄ, hoáº·c gáº·p sá»± cá»‘ phĂ¡p lĂ½.|DĂ¹ng Ä‘á»ƒ á»•n Ä‘á»‹nh káº¿ hoáº¡ch ngáº¯n háº¡n (Sprint/Week), giĂºp team táº­p trung lĂ m viá»‡c mĂ  khĂ´ng bá»‹ thay Ä‘á»•i lá»‹ch liĂªn tá»¥c.|
|**Module**|Quáº£n lĂ½ bá»Ÿi Module 3 (Lifecycle).|Cáº¥u hĂ¬nh bá»Ÿi Module 3, Thá»±c thi bá»Ÿi Module 5.|

## 3.17. Quy táº¯c NgÄƒn cháº·n Dá»± Ă¡n "Má»“ cĂ´i" (Orphan Project Prevention)
- **Validation:** Há»‡ thá»‘ng khĂ´ng cho phĂ©p **Deactivate** (VĂ´ hiá»‡u hĂ³a) hoáº·c **Delete** (XĂ³a) tĂ i khoáº£n cá»§a má»™t ngÆ°á»i dĂ¹ng náº¿u há» Ä‘ang lĂ  **Owner** cá»§a báº¥t ká»³ dá»± Ă¡n nĂ o Ä‘ang hoáº¡t Ä‘á»™ng (`Status != DONE/CANCELLED`).
- **Solution:** Admin báº¯t buá»™c pháº£i thá»±c hiá»‡n **Transfer Ownership** cĂ¡c dá»± Ă¡n Ä‘Ă³ cho ngÆ°á»i khĂ¡c trÆ°á»›c, sau Ä‘Ă³ má»›i Ä‘Æ°á»£c phĂ©p xĂ³a tĂ i khoáº£n ngÆ°á»i dĂ¹ng cÅ©.
## 3.18. Quy táº¯c Tranh cháº¥p Nguá»“n lá»±c (Resource Contention Rule)
- Trong trÆ°á»ng há»£p xáº£y ra xung Ä‘á»™t tĂ i nguyĂªn giá»¯a cĂ¡c dá»± Ă¡n (Cross-Project Resource Conflict):
    - Há»‡ thá»‘ng luĂ´n Æ°u tiĂªn báº£o vá»‡ tiáº¿n Ä‘á»™ cá»§a Dá»± Ă¡n cĂ³ **Priority cao hÆ¡n**.
    - Náº¿u hai dá»± Ă¡n cĂ¹ng Priority, há»‡ thá»‘ng sáº½ xĂ©t Ä‘áº¿n **Start Date** (Dá»± Ă¡n nĂ o cháº¡y trÆ°á»›c Æ°u tiĂªn trÆ°á»›c) hoáº·c cáº§n sá»± can thiá»‡p thá»§ cĂ´ng cá»§a Resource Manager.
## 3.19. Quy táº¯c Há»£p Ä‘á»“ng Chá»‰ Ä‘á»c TÆ°á»ng minh (Explicit Read-only Contract)
Há»‡ thá»‘ng quy Ä‘á»‹nh chi tiáº¿t pháº¡m vi cho phĂ©p thao tĂ¡c Ä‘á»‘i vá»›i cĂ¡c tráº¡ng thĂ¡i "ÄĂ³ng" (Terminal States) Ä‘á»ƒ Ä‘áº£m báº£o tĂ­nh nháº¥t quĂ¡n giá»¯a cĂ¡c Ä‘á»™i ngÅ© phĂ¡t triá»ƒn:

|**HĂ nh Ä‘á»™ng (Action)**|**Tráº¡ng thĂ¡i DONE / CANCELLED (Active Terminal)**|**Tráº¡ng thĂ¡i ARCHIVED (Cold Storage)**|
|---|---|---|
|**Sá»­a thĂ´ng tin Dá»± Ă¡n** (Name, Settings)|âŒ **Cháº·n**|âŒ **Cháº·n**|
|**Sá»­a Task** (Status, Date, Assignee)|âŒ **Cháº·n**|âŒ **Cháº·n**|
|**ThĂªm Comment / Upload File**|â ï¸ **TĂ¹y chá»n** (Cáº¥u hĂ¬nh: _Allow comments after Done_)|âŒ **Cháº·n tuyá»‡t Ä‘á»‘i**|
|**Xem BĂ¡o cĂ¡o / Dashboard**|âœ… **Cho phĂ©p**|âœ… **Cho phĂ©p**|
|**Clone / Táº¡o Template tá»« Dá»± Ă¡n**|âœ… **Cho phĂ©p**|âœ… **Cho phĂ©p** (Cáº§n restore táº¡m vá» Hot Storage Ä‘á»ƒ clone náº¿u file quĂ¡ lá»›n)|
|**Xuáº¥t dá»¯ liá»‡u (Export)**|âœ… **Cho phĂ©p**|âœ… **Cho phĂ©p**|
|**KhĂ´i phá»¥c (Re-open)**|âœ… **Cho phĂ©p** (Cáº§n quyá»n Admin/PM)|âœ… **Cho phĂ©p** (Pháº£i Unarchive trÆ°á»›c)|

**Giáº£i thĂ­ch:**
- **Active Terminal (`DONE/CANCELLED`):** Dá»¯ liá»‡u váº«n náº±m trong "Hot Storage", truy cáº­p nhanh. NgÆ°á»i dĂ¹ng váº«n cĂ³ thá»ƒ tháº£o luáº­n (Post-mortem discussion) náº¿u cáº¥u hĂ¬nh cho phĂ©p.
- **Cold Storage (`ARCHIVED`):** Dá»¯ liá»‡u Ä‘Ă£ Ä‘Æ°á»£c nĂ©n hoáº·c chuyá»ƒn sang kho lÆ°u trá»¯ ráº» tiá»n (S3 Glacier). Má»¥c tiĂªu lĂ  lÆ°u trá»¯ lĂ¢u dĂ i, báº¥t biáº¿n (Immutable), khĂ´ng cho phĂ©p báº¥t ká»³ tÆ°Æ¡ng tĂ¡c ghi (Write) nĂ o.
## 3.20. Quy táº¯c Chuyá»ƒn Ä‘á»•i Cháº¿ Ä‘á»™ (Mode Switching Rule)
- **Upgrading (Simple $\rightarrow$ Strict):**
    - Cho phĂ©p chuyá»ƒn Ä‘á»•i báº¥t cá»© lĂºc nĂ o.
    - Há»‡ thá»‘ng sáº½ yĂªu cáº§u táº¡o Baseline v1.0 ngay láº­p tá»©c Ä‘á»ƒ lĂ m má»‘c báº¯t Ä‘áº§u kiá»ƒm soĂ¡t.
- **Downgrading (Strict $\rightarrow$ Simple):**
    - Cho phĂ©p chuyá»ƒn Ä‘á»•i, NHÆ¯NG há»‡ thá»‘ng hiá»ƒn thá»‹ cáº£nh bĂ¡o: _"Viá»‡c chuyá»ƒn vá» Simple Mode sáº½ bá» qua cĂ¡c quy trĂ¬nh kiá»ƒm soĂ¡t. Lá»‹ch sá»­ duyá»‡t PCR cĂ³ thá»ƒ khĂ´ng cĂ²n hiá»‡u lá»±c tham chiáº¿u."_
    - CĂ¡c Change Request Ä‘ang chá» duyá»‡t (Pending) sáº½ tá»± Ä‘á»™ng bá»‹ Há»§y (Cancelled).
## 3.21. Ma tráº­n PhĂ¢n quyá»n Chi tiáº¿t (Permission Matrix)
Báº£ng Ä‘áº·c táº£ chi tiáº¿t cĂ¡c quyá»n háº¡n dá»±a trĂªn cĂ¡c PhĂ¢n há»‡ chá»©c nÄƒng:
> Chi tiáº¿t trong file: ["E://Workspace//# project//pronaflow//docs//docs - PronaFlow React&FastAPI//01-Requirements//Functional-Modules//PronaFlow_Project_Roles.xlsx"](Project-Permission-Matrix)

**Ghi chĂº RĂ ng buá»™c:**
- **â ï¸ (1) Thay Ä‘á»•i Deadline:**
    - Náº¿u Dá»± Ă¡n á»Ÿ cháº¿ Ä‘á»™ **Simple Mode**: Member Ä‘Æ°á»£c phĂ©p Ä‘á»•i ngĂ y thoáº£i mĂ¡i.
    - Náº¿u Dá»± Ă¡n á»Ÿ cháº¿ Ä‘á»™ **Strict Mode (hoáº·c Locked)**: Member bá»‹ cháº·n Ä‘á»•i ngĂ y. Há» pháº£i comment yĂªu cáº§u PM/Planner Ä‘á»•i, hoáº·c táº¡o Change Request.
- **â ï¸ (2) XĂ³a Task:** Member chá»‰ Ä‘Æ°á»£c xĂ³a Task do chĂ­nh mĂ¬nh táº¡o ra (Creator), khĂ´ng Ä‘Æ°á»£c xĂ³a Task cá»§a ngÆ°á»i khĂ¡c.
## 3.22. Quy táº¯c nghiá»‡p vá»¥ phĂ¢n quyá»n:
1. **Quy táº¯c "Chá»§ quyá»n riĂªng tÆ°" (Privacy Sovereignty):**
    - Náº¿u má»™t dá»± Ă¡n Ä‘Æ°á»£c set lĂ  **Private (RiĂªng tÆ°)**: Chá»‰ nhá»¯ng ngÆ°á»i cĂ³ tĂªn trong danh sĂ¡ch thĂ nh viĂªn má»›i truy cáº­p Ä‘Æ°á»£c.
    - **Ngoáº¡i lá»‡:** Workspace Owner (ngÆ°á»i tráº£ tiá»n) cĂ³ quyá»n truy cáº­p "cá»­a sau" (Backdoor access) Ä‘á»ƒ kiá»ƒm tra, nhÆ°ng hĂ nh Ä‘á»™ng nĂ y pháº£i Ä‘Æ°á»£c ghi log Audit rĂµ rĂ ng ("Owner accessed private project X") vĂ  pháº£i thĂ´ng qua cÆ¡ cháº¿ gá»­i Request Ä‘áº¿n chá»§ Project-private Ä‘á»ƒ xin phĂ©p kiá»ƒm tra.
2. **Quy táº¯c Báº£o vá»‡ Káº¿ hoáº¡ch (Plan Protection):**
    - Khi dá»± Ă¡n Ä‘ang á»Ÿ tráº¡ng thĂ¡i **Freeze (ÄĂ³ng bÄƒng)** hoáº·c **Locked (ÄĂ£ duyá»‡t)**: Quyá»n `Sá»­a Gantt` cá»§a Planner cÅ©ng bá»‹ táº¡m khĂ³a. Muá»‘n sá»­a, há» pháº£i má»Ÿ khĂ³a (Unlock) hoáº·c Ä‘i qua quy trĂ¬nh duyá»‡t thay Ä‘á»•i.
3. **Quy táº¯c Káº¿ thá»«a tá»« Workspace (Inheritance):**
    - Náº¿u tĂ i khoáº£n cá»§a má»™t User bá»‹ `Deactive` á»Ÿ cáº¥p Workspace (Module 2), há» ngay láº­p tá»©c máº¥t quyá»n truy cáº­p vĂ o Táº¤T Cáº¢ cĂ¡c dá»± Ă¡n, báº¥t ká»ƒ vai trĂ² trong dá»± Ă¡n lĂ  gĂ¬.
4. **Quy táº¯c PhĂ¢n quyá»n Dá»¯ liá»‡u Nháº¡y cáº£m (Sensitive Data):**
    - Chá»‰ **PM** (vĂ  Workspace Owner) má»›i nhĂ¬n tháº¥y cĂ¡c trÆ°á»ng dá»¯ liá»‡u liĂªn quan Ä‘áº¿n tiá»n báº¡c nhÆ°: `Hourly Rate` (LÆ°Æ¡ng giá»), `Total Cost` (Tá»•ng chi phĂ­ dá»± Ă¡n), `Budget`.
    - Planner vĂ  Member chá»‰ nhĂ¬n tháº¥y `Hours` (Sá»‘ giá» lĂ m viá»‡c).
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. Tam giĂ¡c sáº¯t trong Quáº£n trá»‹ Thay Ä‘á»•i (Iron Triangle in Change Management)
TĂ­nh nÄƒng PCR (Feature 2.11) dá»±a trĂªn lĂ½ thuyáº¿t Tam giĂ¡c dá»± Ă¡n (Scope, Time, Cost).
- PronaFlow buá»™c ngÆ°á»i dĂ¹ng pháº£i Ä‘Ă¡nh Ä‘á»•i: Náº¿u muá»‘n thay Ä‘á»•i **Scope** (thĂªm tĂ­nh nÄƒng), buá»™c pháº£i Ä‘iá»u chá»‰nh **Time** (dá»i lá»‹ch) hoáº·c **Cost** (thĂªm ngÆ°á»i).
- PCR lĂ  vÄƒn báº£n hĂ³a sá»± Ä‘Ă¡nh Ä‘á»•i nĂ y, Ä‘áº£m báº£o tĂ­nh minh báº¡ch (Transparency) vĂ  trĂ¡ch nhiá»‡m giáº£i trĂ¬nh (Accountability).
## 4.2. VĂ²ng láº·p Há»c táº­p (Double-Loop Learning)
TĂ­nh nÄƒng **Closure & Lessons Learned** (Feature 2.12) há»— trá»£ mĂ´ hĂ¬nh há»c táº­p vĂ²ng láº·p kĂ©p cá»§a _Argyris & SchĂ¶n_.
- Thay vĂ¬ chá»‰ sá»­a lá»—i (Single-loop), há»‡ thá»‘ng khuyáº¿n khĂ­ch Ä‘á»™i ngÅ© Ä‘áº·t cĂ¢u há»i vá» cĂ¡c giáº£ Ä‘á»‹nh vĂ  quy trĂ¬nh cá»‘t lĂµi (Double-loop) Ä‘á»ƒ cáº£i tiáº¿n Template dá»± Ă¡n cho cĂ¡c láº§n sau.
# Diagram
## 1. Project State Machine Diagram
**Má»¥c Ä‘Ă­ch:** MĂ´ táº£ cĂ¡c tráº¡ng thĂ¡i cá»©ng cá»§a dá»± Ă¡n vĂ  cĂ¡c hĂ nh Ä‘á»™ng (Transition) Ä‘Æ°á»£c phĂ©p Ä‘á»ƒ chuyá»ƒn Ä‘á»•i giá»¯a chĂºng. ÄĂ¢y lĂ  "xÆ°Æ¡ng sá»‘ng" cá»§a Module 3.
```mermaid
stateDiagram-v2
    direction LR
    
    state "NOT_STARTED" as NS
    state "IN_PROGRESS" as IP
    state "IN_REVIEW" as IR
    state "DONE" as D
    state "HOLD" as H
    state "CANCELLED" as C

    [*] --> NS: Create Project

    NS --> IP: Start Project
    NS --> C: Terminate
    
    IP --> H: Pause (Blockers)
    IP --> IR: Submit for Review
    IP --> C: Terminate (Mid-way)

    H --> IP: Resume
    H --> C: Terminate

    IR --> D: Approve (Success)
    IR --> IP: Reject (Fix required)
    IR --> C: Terminate (Fail)

    D --> [*]: Archive (After 30 days)
    C --> [*]: Archive
```
## 2. PCR & Baseline Workflow
**Má»¥c Ä‘Ă­ch:** Minh há»a quy trĂ¬nh "Strict Governance". LĂ m rĂµ má»‘i quan há»‡ giá»¯a **Change Request (PCR)**, **Impact Analysis** (tá»« Module 5) vĂ  **Baseline**.
```mermaid
flowchart TD
    Start([User wants to Change Plan]) --> CheckMode{Is Strict Mode?}
    
    CheckMode -- No (Simple) --> DirectEdit[Direct Edit on Gantt]
    DirectEdit --> UpdateDB[(Update Live Data)]
    
    CheckMode -- Yes (Strict) --> CreatePCR[Create Change Request - PCR]
    CreatePCR --> ImpactAnalysis[[Module 5: Impact Analysis]]
    ImpactAnalysis --> Review{Admin Review}
    
    Review -- Reject --> End([Change Discarded])
    
    Review -- Approve --> Unlock[Unlock Freeze Window]
    Unlock --> ApplyChange[Apply Changes to Plan]
    ApplyChange --> Snapshot[Create Baseline v2.x]
    Snapshot --> UpdateDB
    UpdateDB --> Notify[Notify Stakeholders]
    Notify --> End
```

## 3. ERD - Conceptual Level
**Má»¥c Ä‘Ă­ch:** GiĂºp DB Designer thiáº¿t káº¿ báº£ng. Biá»ƒu Ä‘á»“ nĂ y lĂ m rĂµ cĂ¡c quan há»‡ má»›i thĂªm vĂ o nhÆ° `Portfolio`, `Baseline`, `Scenarios` (Simulation).
```mermaid
erDiagram
    WORKSPACE ||--|{ PROJECT : owns
    PORTFOLIO ||--|{ PROJECT : categorizes
    
    PROJECT ||--|{ PROJECT_MEMBER : has
    PROJECT ||--o{ TASK_LIST : contains
    
    %% Governance Entities
    PROJECT ||--o{ PROJECT_BASELINE : versions
    PROJECT ||--o{ CHANGE_REQUEST : manages
    PROJECT ||--o{ SIMULATION_SCENARIO : sandboxes
    
    %% Details
    PROJECT {
        string key PK
        string title
        enum status "NotStarted, InProgress..."
        enum priority "High, Med, Low"
        enum governance_mode "Simple, Strict"
        json objectives
        json health_score
    }

    PROJECT_BASELINE {
        int id PK
        string version "v1.0, v1.1"
        datetime created_at
        json snapshot_data
    }

    CHANGE_REQUEST {
        int id PK
        enum type "Scope, Schedule, Cost"
        string justification
        enum status "Pending, Approved"
    }
```

## 4. Luá»“ng MĂ´ phá»ng & PhĂ¢n tĂ­ch TĂ¡c Ä‘á»™ng

```mermaid
sequenceDiagram
    autonumber
    actor PM as Project Manager
    participant FE as Frontend (React)
    participant M3 as Mod 3 (Lifecycle Service)
    participant DB as Redis/Temp Storage
    participant M5 as Mod 5 (Calculation Engine)
    participant LiveDB as PostgreSQL (Live Data)

    Note over PM, LiveDB: Giai Ä‘oáº¡n 1: Khá»Ÿi táº¡o Sandbox
    PM->>FE: Click "Enter Simulation Mode"
    FE->>M3: POST /projects/{id}/simulation/init
    M3->>LiveDB: Fetch Current Project State
    M3->>DB: Clone State to Sandbox (SessionID)
    M3-->>FE: Return SessionID (Simulation Ready)

    Note over PM, LiveDB: Giai Ä‘oáº¡n 2: Thao tĂ¡c & TĂ­nh toĂ¡n
    PM->>FE: Drag Task A (Delay +5 days)
    FE->>M5: POST /calculate/impact (SessionID, Delta)
    M5->>DB: Read Sandbox State
    M5->>M5: Run CPM & Resource Leveling
    M5-->>FE: Return Impact Metrics (Diff: +5d End Date)
    FE->>PM: Show "Impact Alert Panel"

    Note over PM, LiveDB: Giai Ä‘oáº¡n 3: Quyáº¿t Ä‘á»‹nh
    alt Apply Changes
        PM->>FE: Click "Apply to Live"
        FE->>M3: POST /projects/{id}/simulation/promote
        M3->>LiveDB: Overwrite Live Data
        M3->>LiveDB: Create New Baseline Audit
        M3-->>FE: Success
    else Discard
        PM->>FE: Click "Discard"
        FE->>M3: DELETE /simulation/{id}
        M3->>DB: Flush Sandbox Data
    end
```

## 5. Luá»“ng Khá»Ÿi táº¡o Dá»± Ă¡n tá»« Template

```mermaid
flowchart TD
    %% Node Khá»Ÿi Ä‘áº§u - DĂ¹ng ngoáº·c kĂ©p bao quanh text Ä‘á»ƒ an toĂ n
    Start(["User clicks Create Project"]) --> ChooseSource{"Source Type?"}
    
    %% NhĂ¡nh Template
    ChooseSource -- From Template --> SelectTemp["Select Template from Library"]
    SelectTemp --> LoadConfig["Load Settings: Simple/Strict Mode"]
    LoadConfig --> LoadTasks["Load Task Structure & Tags"]
    LoadTasks --> RemapDates["User inputs Start Date<br/>(System shifts Task dates)"]
    
    %% NhĂ¡nh Má»›i
    ChooseSource -- Blank Project --> InputMeta["Input Title, Key, Priority"]
    InputMeta --> SelectMode{"Select Governance Mode?"}
    SelectMode -- Simple --> ConfigSimple["Disable PCR, Baseline, Gates"]
    SelectMode -- Strict --> ConfigStrict["Enable PCR, Baseline, Gates"]
    
    %% Gá»™p cĂ¡c nhĂ¡nh vá» Review (Thay tháº¿ cĂº phĂ¡p & báº±ng dĂ²ng riĂªng Ä‘á»ƒ trĂ¡nh lá»—i)
    RemapDates --> Review["Review Project Summary"]
    ConfigStrict --> Review
    ConfigSimple --> Review
    
    Review --> CreateDB[("Save to Database")]
    
    CreateDB --> CheckStrict{"Is Strict Mode?"}
    CheckStrict -- Yes --> CreateBaseline["Auto-create Baseline v1.0"]
    CheckStrict -- No --> EndNode(["Done - Navigate to Board"])
    CreateBaseline --> EndNode
```
