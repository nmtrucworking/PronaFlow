**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
_Last updated: Dec 31, 2025_

---
# 1. Business Overview
Trong váº­n hĂ nh há»‡ thá»‘ng pháº§n má»m doanh nghiá»‡p, dá»¯ liá»‡u tÄƒng trÆ°á»Ÿng theo hĂ m mÅ© theo thá»i gian. Viá»‡c giá»¯ láº¡i táº¥t cáº£ dá»¯ liá»‡u lá»‹ch sá»­ trong cĂ¹ng má»™t khĂ´ng gian lÆ°u trá»¯ vá»›i dá»¯ liá»‡u hiá»‡n hĂ nh (Active Data) sáº½ dáº«n Ä‘áº¿n hai váº¥n Ä‘á» nghiĂªm trá»ng:
1. **Suy giáº£m hiá»‡u nÄƒng (Performance Degradation):** KĂ­ch thÆ°á»›c báº£ng (Table Size) quĂ¡ lá»›n lĂ m tÄƒng Ä‘á»™ sĂ¢u cá»§a cĂ¢y chá»‰ má»¥c (B-Tree Index Depth), khiáº¿n cĂ¡c truy váº¥n SELECT/UPDATE trá»Ÿ nĂªn cháº­m cháº¡p.
2. **Rá»§i ro tuĂ¢n thá»§ (Compliance Risk):** CĂ¡c quy Ä‘á»‹nh quá»‘c táº¿ nhÆ° GDPR (ChĂ¢u Ă‚u) yĂªu cáº§u doanh nghiá»‡p pháº£i cĂ³ chĂ­nh sĂ¡ch xĂ³a dá»¯ liá»‡u rĂµ rĂ ng (Right to be Forgotten) vĂ  kháº£ nÄƒng trĂ­ch xuáº¥t dá»¯ liá»‡u (Data Portability).
Module **Data Archiving & Compliance** cá»§a PronaFlow Ä‘Æ°á»£c thiáº¿t káº¿ Ä‘á»ƒ giáº£i quyáº¿t bĂ i toĂ¡n trĂªn thĂ´ng qua chiáº¿n lÆ°á»£c **LÆ°u trá»¯ PhĂ¢n táº§ng (Tiered Storage)** vĂ  cÆ¡ cháº¿ **Quáº£n trá»‹ VĂ²ng Ä‘á»i Dá»¯ liá»‡u tá»± Ä‘á»™ng**.
**Chiáº¿n lÆ°á»£c PhĂ¢n loáº¡i Dá»¯ liá»‡u:**
- **Hot Data:** Dá»¯ liá»‡u Ä‘ang truy xuáº¥t thÆ°á»ng xuyĂªn (Dá»± Ă¡n Ä‘ang cháº¡y). YĂªu cáº§u Ä‘á»™ trá»… tháº¥p (<100ms).
- **Warm Data:** Dá»¯ liá»‡u Ă­t truy cáº­p (Dá»± Ă¡n vá»«a hoĂ n thĂ nh < 6 thĂ¡ng).
- **Cold Data:** Dá»¯ liá»‡u lá»‹ch sá»­ (Dá»± Ă¡n > 6 thĂ¡ng). Chuyá»ƒn sang cháº¿ Ä‘á»™ Read-only Ä‘á»ƒ tá»‘i Æ°u chi phĂ­ vĂ  hiá»‡u nÄƒng.
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Automated Archiving Strategy
### User Story 8.1
LĂ  má»™t Quáº£n trá»‹ viĂªn há»‡ thá»‘ng, TĂ´i muá»‘n cĂ¡c dá»± Ă¡n Ä‘Ă£ Ä‘Ă³ng (Closed) quĂ¡ 6 thĂ¡ng Ä‘Æ°á»£c tá»± Ä‘á»™ng chuyá»ƒn sang tráº¡ng thĂ¡i lÆ°u trá»¯ láº¡nh, Äá»ƒ giáº£m táº£i cho cÆ¡ sá»Ÿ dá»¯ liá»‡u chĂ­nh vĂ  tÄƒng tá»‘c Ä‘á»™ truy váº¥n cho cĂ¡c dá»± Ă¡n Ä‘ang hoáº¡t Ä‘á»™ng.
### Acceptance Criteria ( #AC)
#### AC 1 - Trigger Condition
- **Given:** Má»™t dá»± Ă¡n cĂ³ tráº¡ng thĂ¡i `status = DONE` hoáº·c `CANCELLED`.
- **When:** Thá»i gian cáº­p nháº­t cuá»‘i cĂ¹ng (`last_activity_at`) vÆ°á»£t quĂ¡ ngÆ°á»¡ng cáº¥u hĂ¬nh (máº·c Ä‘á»‹nh: 180 ngĂ y).
- **Then:** Há»‡ thá»‘ng cháº¡y Background Job (Cronjob) Ä‘á»ƒ thá»±c hiá»‡n quy trĂ¬nh lÆ°u trá»¯ (Archival Process).
#### AC 2 - State Transition & Immutability
- **System Behavior:**
    1. Cáº­p nháº­t cá» `is_archived = true`.
    2. Chuyá»ƒn dá»± Ă¡n sang cháº¿ Ä‘á»™ **Read-Only** (Chá»‰ Ä‘á»c). NgÆ°á»i dĂ¹ng khĂ´ng thá»ƒ thĂªm Task, Comment hay sá»­a Ä‘á»•i tĂ i liá»‡u.
    3. Hiá»ƒn thá»‹ Badge "Archived" trĂªn giao diá»‡n ngÆ°á»i dĂ¹ng.
#### AC 3 - Query Isolation
- **Technical Requirement:** CĂ¡c API láº¥y danh sĂ¡ch dá»± Ă¡n máº·c Ä‘á»‹nh (`GET /projects`) pháº£i tá»± Ä‘á»™ng lá»c bá» cĂ¡c dá»± Ă¡n Ä‘Ă£ lÆ°u trá»¯ (trá»« khi cĂ³ tham sá»‘ `include_archived=true`). Äiá»u nĂ y Ä‘áº£m báº£o Index Scan cá»§a Database luĂ´n nhanh.
## 2.2. Feature: Trash Bin & Soft Delete
### User Story 8.2
LĂ  má»™t NgÆ°á»i dĂ¹ng, TĂ´i muá»‘n cĂ³ cÆ¡ cháº¿ "ThĂ¹ng rĂ¡c" lÆ°u trá»¯ táº¡m thá»i cĂ¡c má»¥c Ä‘Ă£ xĂ³a, Äá»ƒ tĂ´i cĂ³ thá»ƒ khĂ´i phá»¥c láº¡i trong trÆ°á»ng há»£p xĂ³a nháº§m trÆ°á»›c khi dá»¯ liá»‡u bá»‹ há»§y vÄ©nh viá»…n.
### Acceptance Criteria (#AC)
#### AC 1 - Soft Delete Mechanism
- **Action:** Khi user chá»n "Delete Task/Project".
- **System:** KhĂ´ng thá»±c lá»‡nh `DELETE` váº­t lĂ½ trong SQL. Thay vĂ o Ä‘Ă³, update `deleted_at = NOW()`. Dá»¯ liá»‡u biáº¿n máº¥t khá»i giao diá»‡n chĂ­nh nhÆ°ng váº«n tá»“n táº¡i trong báº£ng.
#### AC 2 - Auto-Purge Policy (ChĂ­nh sĂ¡ch tá»± há»§y)
- **Rule:** CĂ¡c má»¥c trong thĂ¹ng rĂ¡c cĂ³ thá»i gian lÆ°u trá»¯ tá»‘i Ä‘a lĂ  **30 ngĂ y**.
- **Automation:** Há»‡ thá»‘ng quĂ©t Ä‘á»‹nh ká»³ má»—i ngĂ y. Náº¿u `NOW() - deleted_at > 30 days` -> Thá»±c hiá»‡n **Hard Delete** (XĂ³a vÄ©nh viá»…n khá»i á»• cá»©ng).
#### AC 3 - Restore Capability
- **Action:** User truy cáº­p giao diá»‡n Trash Bin vĂ  chá»n "Restore".
- **Result:** TrÆ°á»ng `deleted_at` Ä‘Æ°á»£c set vá» `NULL`. Dá»¯ liá»‡u xuáº¥t hiá»‡n trá»Ÿ láº¡i táº¡i vá»‹ trĂ­ cÅ©.

## 2.3. Feature: Data Export & Portability (TrĂ­ch xuáº¥t dá»¯ liá»‡u)
### User Story 8.3
LĂ  má»™t Chá»§ sá»Ÿ há»¯u Workspace, TĂ´i muá»‘n táº£i xuá»‘ng toĂ n bá»™ dá»¯ liá»‡u dá»± Ă¡n cá»§a mĂ¬nh dÆ°á»›i Ä‘á»‹nh dáº¡ng chuáº©n (JSON/CSV), Äá»ƒ lÆ°u trá»¯ cá»¥c bá»™ hoáº·c di chuyá»ƒn sang há»‡ thá»‘ng khĂ¡c (TuĂ¢n thá»§ quyá»n kháº£ chuyá»ƒn dá»¯ liá»‡u).
### Acceptance Criteria (#AC)
#### AC 1 - Async Export Processing
- **Constraint:** VĂ¬ lÆ°á»£ng dá»¯ liá»‡u cĂ³ thá»ƒ ráº¥t lá»›n (hĂ ng ngĂ n task), viá»‡c xuáº¥t dá»¯ liá»‡u khĂ´ng Ä‘Æ°á»£c thá»±c hiá»‡n Ä‘á»“ng bá»™ (Synchronous).
- **Flow:**
    1. User nháº¥n "Request Export".
    2. Server tráº£ vá» thĂ´ng bĂ¡o "Äang xá»­ lĂ½".
    3. Worker Process thu tháº­p dá»¯ liá»‡u, Ä‘Ă³ng gĂ³i thĂ nh file `.zip`.
    4. Há»‡ thá»‘ng gá»­i Email chá»©a Secure Link táº£i xuá»‘ng (Link háº¿t háº¡n sau 24h).
#### AC 2 - Data Structure Standard
- **Format:** File xuáº¥t ra pháº£i cĂ³ cáº¥u trĂºc JSON rĂµ rĂ ng, bao gá»“m Ä‘áº§y Ä‘á»§ quan há»‡: Projects -> Lists -> Tasks -> Comments/Attachments.
# 3. Business Rules & Compliance Standards
## 3.1. Quy táº¯c ToĂ n váº¹n Tham chiáº¿u khi XĂ³a (Referential Integrity on Delete)
Khi thá»±c hiá»‡n xĂ³a vÄ©nh viá»…n (Hard Delete) má»™t thá»±c thá»ƒ cha, há»‡ thá»‘ng pháº£i tuĂ¢n thá»§ quy táº¯c **Cascading Delete** Ä‘á»ƒ trĂ¡nh dá»¯ liá»‡u rĂ¡c (Orphaned Data)
- XĂ³a `Project` -> XĂ³a toĂ n bá»™ `Task Lists`, `Tasks`, `Comments`, `File Metadata` liĂªn quan.
- **Ngoáº¡i lá»‡:** Äá»‘i vá»›i `User`, khi ngÆ°á»i dĂ¹ng xĂ³a tĂ i khoáº£n, cĂ¡c `Comments` vĂ  `Activity Logs` cá»§a há» **KHĂ”NG** bá»‹ xĂ³a mĂ  chá»‰ Ä‘Æ°á»£c áº©n danh (Anonymization).
    - _LĂ½ do:_ Äá»ƒ báº£o toĂ n ngá»¯ cáº£nh lá»‹ch sá»­ cá»§a dá»± Ă¡n cho cĂ¡c thĂ nh viĂªn cĂ²n láº¡i. TĂªn hiá»ƒn thá»‹ sáº½ chuyá»ƒn thĂ nh "Deleted User".
## 3.2. Data Retention Policy (ChĂ­nh sĂ¡ch lÆ°u trá»¯)
ChĂ­nh sĂ¡ch nĂ y Ä‘Æ°á»£c thiáº¿t láº­p cá»©ng trong há»‡ thá»‘ng Ä‘á»ƒ Ä‘áº£m báº£o tĂ­nh phĂ¡p lĂ½:

|Loáº¡i Dá»¯ Liá»‡u|Thá»i gian lÆ°u trá»¯|HĂ nh Ä‘á»™ng sau khi háº¿t háº¡n|Má»¥c Ä‘Ă­ch|
|---|---|---|---|
|**Deleted Items**|30 ngĂ y|Hard Delete|Há»— trá»£ khĂ´i phá»¥c lá»—i thao tĂ¡c (User Error).|
|**System Logs**|90 ngĂ y|Archive to Cold Storage|Phá»¥c vá»¥ Audit (Kiá»ƒm toĂ¡n) vĂ  Debug.|
|**User Uploads**|Theo vĂ²ng Ä‘á»i dá»± Ă¡n|XĂ³a khi Project bá»‹ xĂ³a|Tá»‘i Æ°u chi phĂ­ lÆ°u trá»¯ S3/Disk.|

# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. Tá»‘i Æ°u hĂ³a B-Tree Index (CÆ¡ sá»Ÿ Khoa há»c MĂ¡y tĂ­nh)
Háº§u háº¿t cĂ¡c RDBMS (nhÆ° PostgreSQL sá»­ dá»¥ng trong PronaFlow) dĂ¹ng cáº¥u trĂºc B-Tree cho chá»‰ má»¥c.
- **Váº¥n Ä‘á»:** Chi phĂ­ tĂ¬m kiáº¿m lĂ  $O(\log N)$. Khi $N$ (sá»‘ báº£n ghi) tÄƒng quĂ¡ lá»›n, dĂ¹ lĂ  hĂ m logarit, Ä‘á»™ sĂ¢u cá»§a cĂ¢y váº«n tÄƒng, lĂ m tÄƒng I/O Ä‘Ä©a.
- **Giáº£i phĂ¡p Archiving:** Viá»‡c di chuyá»ƒn dá»¯ liá»‡u cÅ© sang báº£ng Archive hoáº·c Partition khĂ¡c giĂºp giá»¯ $N$ cá»§a báº£ng chĂ­nh (Hot Table) á»Ÿ má»©c tháº¥p vĂ  á»•n Ä‘á»‹nh. Äiá»u nĂ y Ä‘áº£m báº£o hiá»‡u nÄƒng há»‡ thá»‘ng khĂ´ng bá»‹ suy thoĂ¡i theo thá»i gian (System aging).
## 4.2. TuĂ¢n thá»§ GDPR (General Data Protection Regulation)
Module nĂ y Ä‘Æ°á»£c thiáº¿t káº¿ Ä‘á»ƒ Ä‘Ă¡p á»©ng cĂ¡c Ä‘iá»u khoáº£n cá»¥ thá»ƒ cá»§a luáº­t báº£o vá»‡ dá»¯ liá»‡u ChĂ¢u Ă‚u (tiĂªu chuáº©n vĂ ng vá» báº£o máº­t):
- **Right to Erasure (Art. 17):** ÄĂ¡p á»©ng qua tĂ­nh nÄƒng _Hard Delete_ vĂ  _Auto-Purge_.
- **Right to Data Portability (Art. 20):** ÄĂ¡p á»©ng qua tĂ­nh nÄƒng _Data Export (JSON)_.
- **Storage Limitation (Art. 5(1)(e)):** ÄĂ¡p á»©ng qua _Data Retention Policy_ (KhĂ´ng lÆ°u trá»¯ dá»¯ liá»‡u lĂ¢u hÆ¡n má»©c cáº§n thiáº¿t).
