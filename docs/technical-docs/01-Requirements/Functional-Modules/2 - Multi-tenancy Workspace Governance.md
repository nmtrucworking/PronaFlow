**Project**: PronaFlow 
**Version**: 1.1 
**State**: Ready for Review 
_**Last updated:** Jan 04, 2026_

---
# 1. Business Overview
Workspace (KhĂ´ng gian lĂ m viá»‡c) lĂ  Ä‘Æ¡n vá»‹ tá»• chá»©c cáº¥p cao nháº¥t trong kiáº¿n trĂºc Multi-tenancy cá»§a PronaFlow. Má»—i Workspace hoáº¡t Ä‘á»™ng nhÆ° má»™t "container" Ä‘á»™c láº­p, Ä‘áº£m báº£o tĂ­nh cĂ´ láº­p dá»¯ liá»‡u tuyá»‡t Ä‘á»‘i (Logical Isolation). Má»i tĂ i nguyĂªn nhÆ° Project (Dá»± Ă¡n), Tasks (CĂ´ng viá»‡c), Tags (NhĂ£n) vĂ  Members (ThĂ nh viĂªn) Ä‘á»u thuá»™c pháº¡m vi cá»§a má»™t Workspace cá»¥ thá»ƒ.
Module nĂ y chá»‹u trĂ¡ch nhiá»‡m quáº£n lĂ½:
1. **VĂ²ng Ä‘á»i Workspace:** Khá»Ÿi táº¡o -> Hoáº¡t Ä‘á»™ng -> LÆ°u trá»¯/XĂ³a.
2. **Quáº£n trá»‹ ThĂ nh viĂªn:** Má»i ngÆ°á»i dĂ¹ng, phĂ¢n quyá»n trong ná»™i bá»™ tá»• chá»©c.
3. **Cáº¥u hĂ¬nh Ngá»¯ cáº£nh:** Thiáº¿t láº­p mĂºi giá», lá»‹ch lĂ m viá»‡c Ă¡p dá»¥ng cho toĂ n bá»™ dá»± Ă¡n con.
# 2. User Story & Acceptance Criteria
## 2.1. Feature: Workspace Creation
### User Story 2.1:
LĂ  má»™t NgÆ°á»i dĂ¹ng, TĂ´i muá»‘n táº¡o má»™t Workspace má»›i vĂ  Ä‘áº·t tĂªn cho nĂ³, Äá»ƒ phĂ¢n tĂ¡ch cĂ¡c ngá»¯ cáº£nh cĂ´ng viá»‡c khĂ¡c nhau (vĂ­ dá»¥: CĂ¡ nhĂ¢n, CĂ´ng ty, Dá»± Ă¡n Freelance) mĂ  khĂ´ng bá»‹ láº«n lá»™n dá»¯ liá»‡u.
### Acceptance Criteria ( #AC)
#### AC 1 - Khá»Ÿi táº¡o thĂ nh cĂ´ng:
- **Given:** NgÆ°á»i dĂ¹ng Ä‘ang á»Ÿ mĂ n hĂ¬nh danh sĂ¡ch Workspace.
- **When:** NgÆ°á»i dĂ¹ng nháº­p `Workspace Name` (Báº¯t buá»™c, Max 50 kĂ½ tá»±), `Description` (TĂ¹y chá»n) vĂ  nháº¥n "Create".
- **Then:** 1. Há»‡ thá»‘ng táº¡o báº£n ghi Workspace má»›i. 2. GĂ¡n NgÆ°á»i dĂ¹ng hiá»‡n táº¡i lĂ  **Owner** (Chá»§ sá»Ÿ há»¯u). 3. Tá»± Ä‘á»™ng chuyá»ƒn ngá»¯ cáº£nh (Switch Context) sang Workspace vá»«a táº¡o.
#### AC 2 - Default Workspace (Logic tá»± Ä‘á»™ng)
- **Given:** NgÆ°á»i dĂ¹ng vá»«a hoĂ n táº¥t Ä‘Äƒng kĂ½ tĂ i khoáº£n má»›i (Register).
- **When:** NgÆ°á»i dĂ¹ng Ä‘Äƒng nháº­p láº§n Ä‘áº§u tiĂªn.
- **Then:** Há»‡ thá»‘ng tá»± Ä‘á»™ng táº¡o sáºµn má»™t Workspace máº·c Ä‘á»‹nh tĂªn lĂ  `"{Username}'s Workspace"` Ä‘á»ƒ ngÆ°á»i dĂ¹ng báº¯t Ä‘áº§u lĂ m viá»‡c ngay.
#### AC 3 - Validation:
- **When:** NgÆ°á»i dĂ¹ng nháº­p tĂªn chá»‰ chá»©a kĂ½ tá»± Ä‘áº·c biá»‡t hoáº·c tá»« ngá»¯ cáº¥m (Profanity Filter).
- **Then:** Há»‡ thá»‘ng hiá»ƒn thá»‹ lá»—i `WS_001: TĂªn KhĂ´ng gian lĂ m viá»‡c khĂ´ng há»£p lá»‡`.
## 2.2. Feature: Chuyá»ƒn Ä‘á»•i Ngá»¯ cáº£nh (Context Switching)
### User Story 2.2:
LĂ  má»™t NgÆ°á»i dĂ¹ng tham gia nhiá»u Workspace, TĂ´i muá»‘n chuyá»ƒn Ä‘á»•i nhanh giá»¯a cĂ¡c Workspace trĂªn thanh Ä‘iá»u hÆ°á»›ng, Äá»ƒ truy cáº­p vĂ o dá»¯ liá»‡u dá»± Ă¡n tÆ°Æ¡ng á»©ng vá»›i khĂ´ng gian Ä‘Ă³.
### Acceptance Criteria (#AC)
#### AC 1 - Data Isolation (CĂ´ láº­p dá»¯ liá»‡u)
- **Given:** NgÆ°á»i dĂ¹ng chuyá»ƒn tá»« `Workspace A` sang `Workspace B`.
- **Then:** - Giao diá»‡n reload láº¡i Dashboard.
 - Danh sĂ¡ch Projects, Notifications chá»‰ hiá»ƒn thá»‹ dá»¯ liá»‡u cá»§a `Workspace B`.
 - Tuyá»‡t Ä‘á»‘i khĂ´ng hiá»ƒn thá»‹ dá»¯ liá»‡u cá»§a `Workspace A` (trá»« pháº§n User Profile chung).
#### AC 2 - State Persistence (LÆ°u tráº¡ng thĂ¡i)
- **When:** NgÆ°á»i dĂ¹ng Ä‘Äƒng xuáº¥t vĂ  Ä‘Äƒng nháº­p láº¡i vĂ o ngĂ y hĂ´m sau.
- **Then:** Há»‡ thá»‘ng Ä‘Æ°a ngÆ°á»i dĂ¹ng tháº³ng vĂ o Workspace cuá»‘i cĂ¹ng há» truy cáº­p (`last_accessed_workspace_id`), thay vĂ¬ báº¯t chá»n láº¡i tá»« Ä‘áº§u.
## 2.3. Feature: Member Invitation & Management (Quáº£n lĂ½ ThĂ nh viĂªn)
### User Story 2.5 (New)
LĂ  má»™t Workspace Owner, TĂ´i muá»‘n má»i Ä‘á»“ng nghiá»‡p tham gia vĂ o Workspace qua email, Äá»ƒ chĂºng tĂ´i cĂ³ thá»ƒ cĂ¹ng cá»™ng tĂ¡c trĂªn cĂ¡c dá»± Ă¡n chung.
### Acceptance Criteria (#AC)
#### AC 1 - Invite Flow (Luá»“ng má»i)
- **Input:** Nháº­p danh sĂ¡ch Email (cĂ³ thá»ƒ nháº­p nhiá»u), chá»n Vai trĂ² máº·c Ä‘á»‹nh (Member/Admin).
- **Logic:**
	 - Náº¿u Email Ä‘Ă£ cĂ³ tĂ i khoáº£n PronaFlow: Gá»­i thĂ´ng bĂ¡o In-app + Email.
	 - Náº¿u Email chÆ°a cĂ³ tĂ i khoáº£n: Gá»­i Email chá»©a "Magic Link" Ä‘á»ƒ Ä‘Äƒng kĂ½ tĂ i khoáº£n má»›i vĂ  tá»± Ä‘á»™ng join Workspace sau khi Ä‘Äƒng kĂ½ xong.
- **Token:** Link má»i cĂ³ hiá»‡u lá»±c trong 48 giá».
#### AC 2 - Role Assignment (GĂ¡n vai trĂ²)
1. Workspace Owner (Chá»§ sá»Ÿ há»¯u)
	- **Äá»‹nh nghÄ©a**: NgÆ°á»i táº¡o ra Workspace hoáº·c Ä‘Æ°á»£c chuyá»ƒn giao quyá»n lá»±c. ÄĂ¢y lĂ  vai trĂ² cĂ³ quyá»n lá»±c tá»‘i cao trong Workspace.
	- **Äáº·c quyá»n**: Náº¯m giá»¯ quyá»n quyáº¿t Ä‘á»‹nh vá» tĂ i chĂ­nh (Billing), quáº£n lĂ½ vĂ²ng Ä‘á»i tá»• chá»©c vĂ  quáº£n lĂ½ cĂ¡c Admin khĂ¡c
2. Workspace Admin (Quáº£n trá»‹ viĂªn)
	- **Äá»‹nh nghÄ©a**: NgÆ°á»i há»— trá»£ Owner váº­n hĂ nh tá»• chá»©c.
	- **Äáº·c quyá»n**: Quáº£n lĂ½ thĂ nh viĂªn, thiáº¿t láº­p cáº¥u hĂ¬nh chung (ngĂ y lĂ m viá»‡c, lá»… táº¿t), táº¡o dá»± Ă¡n má»›i. Tuy nhiĂªn, Admin khĂ´ng Ä‘Æ°á»£c truy cáº­p thĂ´ng tin thanh toĂ¡n hoáº·c xĂ³a Worksapce.
3. Member (ThĂ nh viĂªn)
	- **Äá»‹nh nghÄ©a**: NhĂ¢n viĂªn hoáº·c cá»™ng tĂ¡c viĂªn chĂ­nh thá»©c.
	- **Äáº·c quyá»n**: CĂ³ quyá»n truy cáº­p vĂ  thao tĂ¡c (táº¡o task, comment) trong cĂ¡c Dá»± Ă¡n mĂ  há» Ä‘Æ°á»£c gĂ¡n. KhĂ´ng thá»ƒ thay Ä‘á»•i cáº¥u hĂ¬nh Workspace.
4. Viewer (NgÆ°á»i xem / KhĂ¡ch)
	-  **Äá»‹nh nghÄ©a**: Stakeholder hoáº·c Ä‘á»‘i tĂ¡c bĂªn ngoĂ i.
	- **Äáº·c quyá»n**: Chá»‰ cĂ³ quyá»n xem (Read-only) cĂ¡c tĂ i nguyĂªn Ä‘Æ°á»£c chia sáº» cá»¥ thá»ƒ. KhĂ´ng thá»ƒ Ä‘iá»u chá»‰nh dá»¯ liá»‡u.
Ma tráº­n phĂ¢n quyá»n: [[#3. Business Rules & Constraints#3.1. Security & Permissions ( RBAC Matrix)|Permission Matrix: Workspace Permission Roles]]
#### AC 3 - Remove Member (XĂ³a thĂ nh viĂªn)
- **Action:** Owner xĂ³a má»™t thĂ nh viĂªn khá»i Workspace.
- **Result:**
	 - ThĂ nh viĂªn Ä‘Ă³ máº¥t quyá»n truy cáº­p ngay láº­p tá»©c.
	 - CĂ¡c Task Ä‘ang Ä‘Æ°á»£c gĂ¡n cho há» chuyá»ƒn vá» tráº¡ng thĂ¡i `Unassigned` hoáº·c giá»¯ nguyĂªn (tĂ¹y cáº¥u hĂ¬nh), nhÆ°ng tĂªn hiá»ƒn thá»‹ chuyá»ƒn thĂ nh "Former Member".
## 2.4. Feature: Workspace Settings (Cáº¥u hĂ¬nh Tá»• chá»©c)
### User Story 2.6 (New)
LĂ  má»™t Workspace Admin, TĂ´i muá»‘n thiáº¿t láº­p ngĂ y lĂ m viá»‡c vĂ  ngĂ y nghá»‰ lá»… cho toĂ n bá»™ Workspace, Äá»ƒ cĂ¡c biá»ƒu Ä‘á»“ Gantt vĂ  tĂ­nh toĂ¡n SLA trong dá»± Ă¡n con Ä‘Æ°á»£c chĂ­nh xĂ¡c.
### Acceptance Criteria (#AC)
#### AC 1 - Working Schedule
- Cho phĂ©p cáº¥u hĂ¬nh:
	 - **Work Days:** Mon - Fri (Máº·c Ä‘á»‹nh).
	 - **Work Hours:** 09:00 - 18:00.
	 - **Timezone:** Asia/Ho_Chi_Minh (GMT+7).
#### AC 2 - Branding (TĂ¹y chá»n)
- Cho phĂ©p upload Logo cá»§a cĂ´ng ty Ä‘á»ƒ thay tháº¿ Logo máº·c Ä‘á»‹nh cá»§a Workspace trĂªn thanh Sidebar (TÄƒng tĂ­nh cĂ¡ nhĂ¢n hĂ³a).
## 2.5. Feature: Lifecycle & Soft Delete
### User Story 2.3:
LĂ  má»™t Workspace Owner, TĂ´i muá»‘n xĂ³a má»™t Workspace khĂ´ng cĂ²n sá»­ dá»¥ng, Äá»ƒ dá»n dáº¹p giao diá»‡n vĂ  quáº£n lĂ½ tĂ i nguyĂªn hiá»‡u quáº£.
### Acceptance Criteria (#AC)
#### AC 1 - Cáº£nh bĂ¡o tĂ¡c Ä‘á»™ng (Impact Analysis)
- **When:** Owner nháº¥n "Delete Workspace".
- **Then:** Há»‡ thá»‘ng hiá»ƒn thá»‹ Modal cáº£nh bĂ¡o: "HĂ nh Ä‘á»™ng nĂ y sáº½ lÆ°u trá»¯ **X** Dá»± Ă¡n vĂ  **Y** Task. Báº¡n cĂ³ cháº¯c cháº¯n khĂ´ng?". YĂªu cáº§u nháº­p Ä‘Ăºng tĂªn Workspace Ä‘á»ƒ xĂ¡c nháº­n.
#### AC 2 - Soft Delete Logic
- **Action:** XĂ¡c nháº­n xĂ³a.
- **System:** Update `is_deleted = true`, `deleted_at = NOW()`. Workspace biáº¿n máº¥t khá»i danh sĂ¡ch truy cáº­p cá»§a táº¥t cáº£ thĂ nh viĂªn.
#### AC 3 - Permissions Guard
- Chá»‰ **Owner** má»›i cĂ³ quyá»n xĂ³a Workspace. Admin hay Member khĂ´ng nhĂ¬n tháº¥y nĂºt nĂ y.
## 2.6. Feature: System Admin Governance (Back-office)
### User Story 2.4:
LĂ  má»™t System Admin (Quáº£n trá»‹ viĂªn há»‡ thá»‘ng), TĂ´i muá»‘n xem danh sĂ¡ch Workspace Ä‘Ă£ bá»‹ xĂ³a má»m vĂ  thá»±c hiá»‡n khĂ´i phá»¥c hoáº·c xĂ³a vÄ©nh viá»…n, Äá»ƒ há»— trá»£ ngÆ°á»i dĂ¹ng hoáº·c giáº£i phĂ³ng dung lÆ°á»£ng Database.
### Acceptance Criteria (#AC)
#### AC 1 - Auto-Purge Policy
- **Automated Job:** Má»—i ngĂ y lĂºc 00:00, há»‡ thá»‘ng quĂ©t cĂ¡c Workspace cĂ³ `is_deleted = true` VĂ€ `deleted_at > 30 days`.
- **Action:** Thá»±c hiá»‡n **Hard Delete** (XĂ³a vÄ©nh viá»…n khá»i SQL).
#### AC 2 - Restore Capability
- Admin cĂ³ thá»ƒ tĂ¬m kiáº¿m Workspace theo ID hoáº·c TĂªn, sau Ä‘Ă³ nháº¥n "Restore" Ä‘á»ƒ khĂ´i phá»¥c quyá»n truy cáº­p cho Owner cÅ©.
# 3. Business Rules & Constraints
## 3.1. Security & Permissions ( #RBAC Matrix)
| Permission Code    | Owner | Admin  | Member | Viewer | MĂ´ táº£                                        |
| ------------------ | ----- | ------ | ------ | ------ | -------------------------------------------- |
| Quáº£n trá»‹ Tá»• chá»©c   |       |        |        |        |                                              |
| `WS.UPDATE`        | âœ…     | âœ…      | âŒ      | âŒ      | Sá»­a tĂªn, Logo, Cáº¥u hĂ¬nh Timezone             |
| `WS.DELETE`        | âœ…     | âŒ      | âŒ      | âŒ      | XĂ³a má»m Workspace                            |
| `WS.BILLING`       | âœ…     | âŒ      | âŒ      | âŒ      | Quáº£n lĂ½ gĂ³i cÆ°á»›c thanh toĂ¡n (Module 13)      |
| Quáº£n trá»‹ NhĂ¢n sá»±   |       |        |        |        |                                              |
| `WS.MEMBER.INVITE` | âœ…     | âœ…      | âŒ      | âŒ      | Má»i thĂ nh viĂªn má»›i                           |
| `WS.MEMBER.UPDATE` | âœ…     | âœ…      | âŒ      | âŒ      | Thay Ä‘á»•i vai trĂ² thĂ nh viĂªn (Promote/Demote) |
| `WS.MEMBER.KICK`   | âœ…     | âœ…(*)   | âŒ      | âŒ      | XĂ³a thĂ nh viĂªn (Admin khĂ´ng xĂ³a Ä‘Æ°á»£c Owner)  |
| Quáº£n trá»‹ Dá»± Ă¡n     |       |        |        |        |                                              |
| `PROJ.CREATE`      | âœ…     | âœ…      | âŒ      | âŒ      | Táº¡o dá»± Ă¡n má»›i                                |
| `PROJ.ACCESS_ALL`  | âœ…     | âŒ (**) | âŒ      | âŒ      | Truy cáº­p táº¥t cáº£ dá»± Ă¡n (Ká»ƒ cáº£ Private)        |
**Ghi chĂº:**
- `(*)` **Admin** khĂ´ng thá»ƒ xĂ³a (Kick) hoáº·c háº¡ quyá»n (Demote) **Owner**.
- `(**)` **Admin** khĂ´ng máº·c Ä‘á»‹nh nhĂ¬n tháº¥y cĂ¡c dá»± Ă¡n Private trá»« khi há» Ä‘Æ°á»£c má»i vĂ o dá»± Ă¡n Ä‘Ă³ hoáº·c há» lĂ  ngÆ°á»i táº¡o ra nĂ³.
## 3.2. Data Integrity Rules (Quy táº¯c ToĂ n váº¹n Dá»¯ liá»‡u)
1. **Isolation Query Rule:** Má»i cĂ¢u truy váº¥n dá»¯ liá»‡u (Projects, Tasks, Tags) Ä‘á»u **Báº®T BUá»˜C** pháº£i cĂ³ Ä‘iá»u kiá»‡n `WHERE workspace_id = :current_ws_id`. Tuyá»‡t Ä‘á»‘i khĂ´ng cho phĂ©p truy váº¥n dá»¯ liá»‡u "Global" (trá»« System Admin).
2. **Cascade Logic:** Khi Workspace bá»‹ xĂ³a (Soft Delete), khĂ´ng cáº§n update tráº¡ng thĂ¡i `is_deleted` cho hĂ ng nghĂ¬n Project/Task con ngay láº­p tá»©c (gĂ¢y lock table). Logic lá»c sáº½ náº±m á»Ÿ táº§ng Application (Náº¿u Parent deleted -> Children hidden).
3. **Owner Succession (Káº¿ thá»«a quyá»n lá»±c):**
	 - Má»—i Workspace pháº£i luĂ´n cĂ³ **Ă­t nháº¥t 1 Owner**.
	 - Owner khĂ´ng thá»ƒ rá»i khá»i (Leave) Workspace náº¿u há» lĂ  Owner duy nháº¥t. Há» báº¯t buá»™c pháº£i chuyá»ƒn giao quyá»n lá»±c (Transfer Ownership) cho má»™t thĂ nh viĂªn khĂ¡c trÆ°á»›c khi rá»i Ä‘i hoáº·c xĂ³a Workspace.
4. **Unique Constraints (RĂ ng buá»™c duy nháº¥t):**
	 - Má»™t User khĂ´ng thá»ƒ tham gia 2 láº§n vĂ o cĂ¹ng 1 Workspace.
	 - ID cá»§a Workspace (UUID) lĂ  duy nháº¥t toĂ n cá»¥c há»‡ thá»‘ng
## 3.3. CĂ¡c quy táº¯c trong há»‡ thá»‘ng phĂ¢n quyá»n Workspace.
1. **Quy táº¯c Káº¿ thá»«a Quyá»n lá»±c (Owner Succession):**
    - Má»—i Workspace báº¯t buá»™c pháº£i luĂ´n cĂ³ **Ă­t nháº¥t 01 Owner**.
    - Owner hiá»‡n táº¡i khĂ´ng thá»ƒ rá»i khá»i (Leave) Workspace náº¿u há» lĂ  Owner duy nháº¥t. Há»‡ thá»‘ng buá»™c há» pháº£i chuyá»ƒn giao quyá»n lá»±c (Transfer Ownership) cho má»™t thĂ nh viĂªn khĂ¡c trÆ°á»›c khi rá»i Ä‘i.
2. **Quy táº¯c CĂ´ láº­p Dá»¯ liá»‡u (Isolation Rule):**
    - ThĂ nh viĂªn cá»§a Workspace A **tuyá»‡t Ä‘á»‘i khĂ´ng** thá»ƒ nhĂ¬n tháº¥y dá»¯ liá»‡u cá»§a Workspace B, ngay cáº£ khi há» cĂ³ tĂ i khoáº£n á»Ÿ cáº£ hai nÆ¡i. Viá»‡c chuyá»ƒn Ä‘á»•i giá»¯a cĂ¡c Workspace pháº£i táº£i láº¡i ngá»¯ cáº£nh (Context Switching).
3. **Quy táº¯c Báº£o vá»‡ Thanh toĂ¡n (Billing Protection):**
    - Chá»‰ **Owner** má»›i cĂ³ quyá»n truy cáº­p vĂ o Module 13 (Subscription & Billing). Äiá»u nĂ y ngÄƒn cháº·n rá»§i ro Admin láº¡m quyá»n nĂ¢ng cáº¥p gĂ³i cÆ°á»›c gĂ¢y phĂ¡t sinh chi phĂ­ cho doanh nghiá»‡p.
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. Kiáº¿n trĂºc Multi-tenancy: Shared Database, Shared Schema
PronaFlow sá»­ dá»¥ng chiáº¿n lÆ°á»£c **Logical Isolation** (CĂ´ láº­p logic).
- **LĂ½ do:** Tiáº¿t kiá»‡m chi phĂ­ háº¡ táº§ng vĂ  dá»… dĂ ng báº£o trĂ¬ schema (so vá»›i viá»‡c má»—i khĂ¡ch hĂ ng 1 Database riĂªng).
- **Rá»§i ro:** Lá»™ lá»t dá»¯ liá»‡u giá»¯a cĂ¡c Tenant (Data Leakage).
- **Giáº£i phĂ¡p:** Ăp dá»¥ng **Row-Level Security (RLS)** á»Ÿ táº§ng Database (PostgreSQL Policies) hoáº·c Middleware filter cháº·t cháº½ á»Ÿ táº§ng Backend Service.
## 4.2. Workspace State Machine (MĂ¡y tráº¡ng thĂ¡i)
```mermaid
stateDiagram-v2
 [*] --> Active: Created
 Active --> SoftDeleted: Owner deletes
 SoftDeleted --> Active: System Admin restores
 SoftDeleted --> [*]: Hard Delete (After 30 days)
 note right of Active
  Táº¥t cáº£ Member cĂ³ thá»ƒ truy cáº­p
  vĂ  thao tĂ¡c dá»¯ liá»‡u
 end note
 note right of SoftDeleted
  Dá»¯ liá»‡u bá»‹ áº©n.
  Chá»‰ System Admin nhĂ¬n tháº¥y.
 end note
```

