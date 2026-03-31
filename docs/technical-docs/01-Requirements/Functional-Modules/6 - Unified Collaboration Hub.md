**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
_Last updated: Dec 31, 2025_

---
# 1. Business Overview
Trong cĂ¡c mĂ´ hĂ¬nh quáº£n lĂ½ truyá»n thá»‘ng, thĂ´ng tin thÆ°á»ng bá»‹ phĂ¢n máº£nh (Fragmented) ráº£i rĂ¡c kháº¯p nÆ¡i: Email dĂ¹ng Ä‘á»ƒ trao Ä‘á»•i chĂ­nh thá»©c, Zalo/Slack dĂ¹ng Ä‘á»ƒ chat nhanh, vĂ  Google Drive dĂ¹ng Ä‘á»ƒ lÆ°u file. Äiá»u nĂ y dáº«n Ä‘áº¿n hiá»‡n tÆ°á»£ng "Äáº£o thĂ´ng tin" (Information Silos) vĂ  gia tÄƒng chi phĂ­ chuyá»ƒn Ä‘á»•i ngá»¯ cáº£nh (Context Switching Cost).
PhĂ¢n há»‡ **Unified Collaboration Hub** cá»§a PronaFlow Ä‘Æ°á»£c thiáº¿t káº¿ Ä‘á»ƒ trá»Ÿ thĂ nh "Nguá»“n sá»± tháº­t duy nháº¥t" (Single Source of Truth) cho má»i hoáº¡t Ä‘á»™ng cá»™ng tĂ¡c. Triáº¿t lĂ½ thiáº¿t káº¿ lĂ  **Contextual Communication** (Giao tiáº¿p gáº¯n liá»n ngá»¯ cáº£nh): Má»i cuá»™c tháº£o luáº­n, tĂ i liá»‡u pháº£i Ä‘Æ°á»£c neo (anchor) trá»±c tiáº¿p vĂ o Ä‘á»‘i tÆ°á»£ng cĂ´ng viá»‡c (Task/Project) liĂªn quan, thay vĂ¬ trĂ´i ná»•i trong cĂ¡c kĂªnh chat chung chung.
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Contextual Threaded Discussions (Tháº£o luáº­n theo luá»“ng)
### User Story 6.1
LĂ  má»™t ThĂ nh viĂªn dá»± Ă¡n, TĂ´i muá»‘n trao Ä‘á»•i, pháº£n há»“i vá» má»™t Task cá»¥ thá»ƒ ngay trong giao diá»‡n cá»§a Task Ä‘Ă³, Äá»ƒ toĂ n bá»™ lá»‹ch sá»­ tranh luáº­n vĂ  ra quyáº¿t Ä‘á»‹nh Ä‘Æ°á»£c lÆ°u trá»¯ táº­p trung, dá»… dĂ ng tra cá»©u láº¡i sau nĂ y.
### Acceptance Criteria ( #AC)

#### AC 1 - Rich Text Editor (TrĂ¬nh soáº¡n tháº£o vÄƒn báº£n)
- Há»— trá»£ Ä‘á»‹nh dáº¡ng vÄƒn báº£n cÆ¡ báº£n (Bold, Italic, List, Code Block) Ä‘á»ƒ trĂ¬nh bĂ y Ă½ tÆ°á»Ÿng rĂµ rĂ ng.
- Há»— trá»£ dĂ¡n áº£nh trá»±c tiáº¿p tá»« Clipboard (Ctrl+V) Ä‘á»ƒ chia sáº» nhanh áº£nh chá»¥p mĂ n hĂ¬nh lá»—i (Bug screenshot).
#### AC 2 - Smart Mentions (@Tagging)
- **Interaction:** Khi ngÆ°á»i dĂ¹ng gĂµ kĂ½ tá»± `@`, há»‡ thá»‘ng hiá»ƒn thá»‹ danh sĂ¡ch Dropdown gá»£i Ă½ cĂ¡c thĂ nh viĂªn **trong cĂ¹ng dá»± Ă¡n**.
- **Filtering:** Thuáº­t toĂ¡n sáº¯p xáº¿p Æ°u tiĂªn hiá»ƒn thá»‹: NgÆ°á»i Ä‘ang Ä‘Æ°á»£c giao Task (Assignee) > NgÆ°á»i bĂ¡o cĂ¡o (Reporter) > CĂ¡c thĂ nh viĂªn tÆ°Æ¡ng tĂ¡c gáº§n Ä‘Ă¢y.
- **Trigger:** Viá»‡c mention sáº½ kĂ­ch hoáº¡t má»™t sá»± kiá»‡n sang Module 7 (Notification System) Ä‘á»ƒ gá»­i thĂ´ng bĂ¡o tá»©c thĂ¬ cho ngÆ°á»i Ä‘Æ°á»£c nháº¯c.
#### AC 3 - Threaded Replies (Pháº£n há»“i phĂ¢n cáº¥p)
- Cho phĂ©p tráº£ lá»i (Reply) má»™t comment cá»¥ thá»ƒ, táº¡o thĂ nh má»™t nhĂ¡nh tháº£o luáº­n con (Nested Thread). Äiá»u nĂ y giĂºp giá»¯ cho luá»“ng tháº£o luáº­n chĂ­nh khĂ´ng bá»‹ loĂ£ng bá»Ÿi cĂ¡c tranh luáº­n chi tiáº¿t bĂªn lá».
## 2.2. Feature: Digital Asset Management - DAM (Quáº£n lĂ½ TĂ i sáº£n sá»‘)
### User Story 6.2
LĂ  má»™t Designer, TĂ´i muá»‘n táº£i lĂªn cĂ¡c phiĂªn báº£n thiáº¿t káº¿ (v1, v2) Ä‘Ă­nh kĂ¨m vĂ o Task vĂ  xem trÆ°á»›c chĂºng mĂ  khĂ´ng cáº§n táº£i vá», Äá»ƒ cĂ¡c bĂªn liĂªn quan cĂ³ thá»ƒ gĂ³p Ă½ trá»±c quan.
### Acceptance Criteria (#AC)

#### AC 1 - Version Control (Kiá»ƒm soĂ¡t phiĂªn báº£n)
- **Behavior:** Khi ngÆ°á»i dĂ¹ng táº£i lĂªn má»™t file cĂ³ tĂªn trĂ¹ng vá»›i file Ä‘Ă£ tá»“n táº¡i trong Task.
- **System Logic:** Há»‡ thá»‘ng khĂ´ng ghi Ä‘Ă¨ (Overwrite). Thay vĂ o Ä‘Ă³, nĂ³ táº¡o má»™t báº£n ghi phiĂªn báº£n má»›i (Versioning). User cĂ³ thá»ƒ xem láº¡i lá»‹ch sá»­ `v1`, `v2` vĂ  khĂ´i phá»¥c náº¿u cáº§n.
#### AC 2 - Universal Viewer (TrĂ¬nh xem trÆ°á»›c Ä‘a nÄƒng)
- TĂ­ch há»£p trĂ¬nh xem trÆ°á»›c (Previewer) há»— trá»£ cĂ¡c Ä‘á»‹nh dáº¡ng vÄƒn phĂ²ng phá»• biáº¿n: PDF, DOCX, XLSX vĂ  cĂ¡c Ä‘á»‹nh dáº¡ng áº£nh/video.
- **Security:** File chá»‰ Ä‘Æ°á»£c render trong Sandbox cá»§a trĂ¬nh duyá»‡t, ngÄƒn cháº·n thá»±c thi mĂ£ Ä‘á»™c.
## 2.3. Feature: Real-time Presence (Hiá»‡n diá»‡n thá»i gian thá»±c)
### User Story 6.3
LĂ  má»™t Quáº£n lĂ½, TĂ´i muá»‘n biáº¿t ai Ä‘ang xem hoáº·c soáº¡n tháº£o ná»™i dung trĂªn cĂ¹ng má»™t Task vá»›i tĂ´i, Äá»ƒ trĂ¡nh xung Ä‘á»™t dá»¯ liá»‡u hoáº·c trĂ¹ng láº·p cĂ´ng viá»‡c.
### Acceptance Criteria ( #AC)
#### AC 1 - Visual Indicators
- Hiá»ƒn thá»‹ Avatar cá»§a nhá»¯ng ngÆ°á»i dĂ¹ng Ä‘ang má»Ÿ Task Ä‘Ă³ á»Ÿ gĂ³c trĂªn mĂ n hĂ¬nh (tÆ°Æ¡ng tá»± Google Docs).
- Hiá»ƒn thá»‹ tráº¡ng thĂ¡i "User A is typing..." dÆ°á»›i khung comment khi cĂ³ ngÆ°á»i Ä‘ang soáº¡n tháº£o.
## 2.4. Feature: Formal Approval Workflow (Quy trĂ¬nh PhĂª duyá»‡t ChĂ­nh thá»©c)

### User Story 6.4
LĂ  má»™t Stakeholder (CĂ¡c bĂªn liĂªn quan), TĂ´i muá»‘n thá»±c hiá»‡n hĂ nh Ä‘á»™ng "PhĂª duyá»‡t" (Approve) hoáº·c "Tá»« chá»‘i" (Reject) Ä‘á»‘i vá»›i má»™t tĂ i liá»‡u Ä‘Ă­nh kĂ¨m hoáº·c káº¿t quáº£ cĂ´ng viá»‡c, Äá»ƒ há»‡ thá»‘ng ghi nháº­n tĂ­nh phĂ¡p lĂ½ cá»§a quyáº¿t Ä‘á»‹nh thay vĂ¬ chá»‰ comment "OK" báº±ng lá»i.
### Acceptance Criteria ( #AC)
#### AC 1 - Decision State Machine (MĂ¡y tráº¡ng thĂ¡i Quyáº¿t Ä‘á»‹nh)
- **Object:** Ăp dá»¥ng cho File Ä‘Ă­nh kĂ¨m (Attachments) hoáº·c Task.
- **Transitions:**
    1. `Pending Review`: Tráº¡ng thĂ¡i máº·c Ä‘á»‹nh khi yĂªu cáº§u phĂª duyá»‡t.
    2. `Approved`: Khi ngÆ°á»i cĂ³ tháº©m quyá»n xĂ¡c nháº­n. Há»‡ thá»‘ng khĂ³a (Lock) file/task láº¡i, ngÄƒn chá»‰nh sá»­a thĂªm Ä‘á»ƒ Ä‘áº£m báº£o tĂ­nh toĂ n váº¹n.
    3. `Changes Requested`: YĂªu cáº§u sá»­a Ä‘á»•i. Task tá»± Ä‘á»™ng chuyá»ƒn tráº¡ng thĂ¡i vá» `In-Progress`.
#### AC 2 - Digital Signature Audit (Kiá»ƒm toĂ¡n Chá»¯ kĂ½ sá»‘)
- **Requirement:** Má»—i hĂ nh Ä‘á»™ng phĂª duyá»‡t pháº£i Ä‘Æ°á»£c ghi láº¡i vá»›i `Timestamp`, `User ID`, vĂ  `Checksum` cá»§a phiĂªn báº£n tĂ i liá»‡u táº¡i thá»i Ä‘iá»ƒm phĂª duyá»‡t.
- **Impact:** Äáº£m báº£o tĂ­nh chá»‘ng chá»‘i bá» (Non-repudiation). Náº¿u file bá»‹ thay Ä‘á»•i sau khi phĂª duyá»‡t, tráº¡ng thĂ¡i Approved pháº£i tá»± Ä‘á»™ng bá»‹ há»§y bá» (Invalidated).
## 2.5. Feature: Collaborative Search (TĂ¬m kiáº¿m Cá»™ng tĂ¡c)
### User Story 6.5
LĂ  má»™t ThĂ nh viĂªn má»›i gia nháº­p dá»± Ă¡n, TĂ´i muá»‘n tĂ¬m kiáº¿m cĂ¡c tá»« khĂ³a trong toĂ n bá»™ lá»‹ch sá»­ tháº£o luáº­n vĂ  tĂ i liá»‡u, Äá»ƒ nhanh chĂ³ng náº¯m báº¯t bá»‘i cáº£nh (Context onboarding) mĂ  khĂ´ng cáº§n lĂ m phiá»n Ä‘á»“ng nghiá»‡p cÅ©.
### Acceptance Criteria ( #AC)
#### AC 1 - Full-Text Search Scope
- **Scope:** TĂ¬m kiáº¿m quĂ©t qua cáº£ 3 táº§ng dá»¯ liá»‡u:
    1. Ná»™i dung Task (Title, Description).
    2. Ná»™i dung Tháº£o luáº­n (Comments, Replies).
    3. Ná»™i dung File vÄƒn báº£n (Parse ná»™i dung bĂªn trong PDF, DOCX - _TĂ­nh nÄƒng nĂ¢ng cao_).
#### AC 2 - Contextual Result Highlighting
- **Display:** Káº¿t quáº£ tráº£ vá» pháº£i hiá»ƒn thá»‹ Ä‘oáº¡n vÄƒn báº£n chá»©a tá»« khĂ³a (Snippet) vĂ  link trá»±c tiáº¿p Ä‘áº¿n vá»‹ trĂ­ cá»§a comment Ä‘Ă³ trong luá»“ng tháº£o luáº­n (Deep Linking).

## 2.6. Feature: Project Notes (Wiki)
### User Story 6.6.
- LĂ  má»™t **Project Manager**
- TĂ´i muá»‘n táº¡o cĂ¡c trang chi chĂº (Note) rich-text bĂªn trong dá»± Ă¡n vĂ  tá»• chá»©c chĂºng theo cáº¥u trĂºc cĂ¢y (Hierachy).
- Äá»ƒ lÆ°u trá»¯ cĂ¡c ná»™i dung cáº§n thiáº¿t nhÆ° quy Ä‘á»‹nh, biĂªn báº£n há»p vĂ  tĂ i liá»‡u Ä‘áº·c táº£ ngay táº¡i nÆ¡i lĂ m viá»‡c mĂ  khĂ´ng cáº§n dĂ¹ng GG Docs rá»i ráº¡c.
### Acceptance Criteria ( #AC)
#### AC 1 - - **Rich Text Editor:** 
- Há»— trá»£ soáº¡n tháº£o vÄƒn báº£n Ä‘á»‹nh dáº¡ng (Bold, Italic, Heading, Checkbox) vĂ  nhĂºng áº£nh (tÆ°Æ¡ng tá»± nhÆ° mĂ´ táº£ trong Module 15).
#### **AC 2 - Hierarchy:** 
- Cho phĂ©p táº¡o ghi chĂº con (Nested Notes) khĂ´ng giá»›i háº¡n cáº¥p Ä‘á»™ (Parent Note -> Child Note).
#### **AC 3 - Linkage:** 
- Cho phĂ©p `@mention` Task hoáº·c Project khĂ¡c ngay trong ná»™i dung ghi chĂº Ä‘á»ƒ táº¡o liĂªn káº¿t ngá»¯ cáº£nh.
## 2.7. Feature: Personal Notes
### User Story 6.7.
- LĂ  má»™t ThĂ nh viĂªn dá»± Ă¡n.
- TĂ´i muá»‘n cĂ³ má»™t khu vá»±c ghi chĂº cĂ¡ nhĂ¢n riĂªng tÆ° (Private Notes) truy cáº­p nhanh tá»« Sidebar,
- Äá»ƒ ghi láº¡i cĂ¡c Ă½ tÆ°á»Ÿng táº¡m thá»i hoáº·c Todo list trong ngay trÆ°á»›c khi chuyá»ƒn Ä‘á»•i chĂºng thĂ nh Task chĂ­nh thá»©c.
### Acceptance Criteria ( #AC)
#### **AC 1 - Privacy:** 
- Dá»¯ liá»‡u nĂ y chá»‰ hiá»ƒn thá»‹ vá»›i chĂ­nh ngÆ°á»i dĂ¹ng Ä‘Ă³ (Private by default).
#### **AC 2 - Convert to Task:** 
- Cung cáº¥p nĂºt "Convert to Task" Ä‘á»ƒ chuyá»ƒn Ä‘á»•i nhanh má»™t dĂ²ng ghi chĂº thĂ nh Task vĂ  chá»n Project Ä‘Ă­ch.
## 2.8. Feature: Note Templates
### User Story 6.8: 
- **LĂ  má»™t** Project Manager,
- **TĂ´i muá»‘n** táº¡o vĂ  quáº£n lĂ½ cĂ¡c máº«u ghi chĂº (Templates) nhÆ° "BiĂªn báº£n cuá»™c há»p", "BĂ¡o cĂ¡o lá»—i", "Äáº·c táº£ tĂ­nh nÄƒng",
- **Äá»ƒ** cáº£ team tuĂ¢n thá»§ má»™t chuáº©n trĂ¬nh bĂ y chung vĂ  tiáº¿t kiá»‡m thá»i gian soáº¡n tháº£o.
### **Acceptance Criteria (#AC):**
- **AC 1 - Template Library:** Há»‡ thá»‘ng cung cáº¥p sáºµn thÆ° viá»‡n máº«u (System Templates) vĂ  cho phĂ©p ngÆ°á»i dĂ¹ng lÆ°u má»™t ghi chĂº báº¥t ká»³ thĂ nh máº«u riĂªng (Custom Templates).
- **AC 2 - Quick Apply:** Khi táº¡o Note má»›i, hiá»ƒn thá»‹ popup: "Start with a template?". Khi chá»n, ná»™i dung máº«u sáº½ Ä‘Æ°á»£c Ä‘iá»n vĂ o trĂ¬nh soáº¡n tháº£o.
- **AC 3 - Variable Placeholders:** Há»— trá»£ cĂ¡c biáº¿n giá»¯ chá»— nhÆ° `{{Current_Date}}`, `{{User_Name}}` Ä‘á»ƒ tá»± Ä‘á»™ng Ä‘iá»n dá»¯ liá»‡u khi Ă¡p dá»¥ng máº«u.
## 2.9. Feature: Public Publishing
### User Story 6.8: 
- **LĂ  má»™t** Chá»§ sá»Ÿ há»¯u dá»± Ă¡n, 
- **TĂ´i muá»‘n** xuáº¥t báº£n má»™t trang ghi chĂº thĂ nh trang web cĂ´ng khai (Public Link),
- **Äá»ƒ** chia sáº» thĂ´ng tin vá»›i khĂ¡ch hĂ ng bĂªn ngoĂ i mĂ  khĂ´ng cáº§n má»i há» vĂ o Workspace (tiáº¿t kiá»‡m license user).
### **Acceptance Criteria (#AC):**
#### **AC 1 - Generate Public Link:** 
- Táº¡o má»™t URL ngáº«u nhiĂªn (hoáº·c tĂ¹y chá»‰nh slug) Ä‘á»ƒ truy cáº­p ghi chĂº á»Ÿ cháº¿ Ä‘á»™ Read-only.
#### **AC 2 - Access Control:** 
- TĂ¹y chá»n Ä‘áº·t máº­t kháº©u (Password Protection) hoáº·c thá»i háº¡n háº¿t háº¡n (Expiration Date) cho link Ä‘Ă³.
#### **AC 3 - Live Update:** 
- Khi ná»™i dung gá»‘c trong PronaFlow thay Ä‘á»•i, ná»™i dung trĂªn link public cÅ©ng tá»± Ä‘á»™ng cáº­p nháº­t theo (hoáº·c tĂ¹y chá»n pháº£i nháº¥n "Republish").
## 2.10. Feature: Document Versioning.
### User Story 6.10
- **LĂ  má»™t** Admin,
- **TĂ´i muá»‘n** xem láº¡i lá»‹ch sá»­ thay Ä‘á»•i cá»§a tĂ i liá»‡u vĂ  biáº¿t ai Ä‘Ă£ sá»­a cĂ¡i gĂ¬ vĂ o lĂºc nĂ o,
- **Äá»ƒ** khĂ´i phá»¥c láº¡i phiĂªn báº£n cÅ© náº¿u cĂ³ sai sĂ³t hoáº·c tranh cháº¥p ná»™i dung.
### **Acceptance Criteria (#AC):**
#### **AC 1 - Auto-Snapshot:** 
- Há»‡ thá»‘ng tá»± Ä‘á»™ng lÆ°u phiĂªn báº£n (Snapshot) má»—i khi ngÆ°á»i dĂ¹ng nháº¥n Save hoáº·c sau má»—i 10 phĂºt soáº¡n tháº£o liĂªn tá»¥c.
#### **AC 2 - Diff View:** 
- Cháº¿ Ä‘á»™ so sĂ¡nh (Compare) lĂ m ná»•i báº­t (Highlight) pháº§n vÄƒn báº£n Ä‘Ă£ thĂªm (xanh) hoáº·c Ä‘Ă£ xĂ³a (Ä‘á») giá»¯a 2 phiĂªn báº£n.
#### **AC 3 - Restore:** 
- NĂºt "KhĂ´i phá»¥c phiĂªn báº£n nĂ y" sáº½ Ä‘Æ°a ná»™i dung hiá»‡n táº¡i vá» tráº¡ng thĂ¡i cÅ©.
## 2.11. Feature: Smart Backlinks
### **User Story 6.11.** 
- **LĂ  má»™t** Business Analyst,
- **TĂ´i muá»‘n** nhĂ¬n tháº¥y danh sĂ¡ch cĂ¡c trang hoáº·c Task Ä‘ang nháº¯c Ä‘áº¿n trang hiá»‡n táº¡i (Linked Mentions),
- **Äá»ƒ** Ä‘Ă¡nh giĂ¡ tĂ¡c Ä‘á»™ng (Impact Analysis) trÆ°á»›c khi tĂ´i sá»­a Ä‘á»•i ná»™i dung trang nĂ y.
### **Acceptance Criteria (#AC):**
#### **AC 1 - Reference Detection:** 
- Há»‡ thá»‘ng tá»± Ä‘á»™ng quĂ©t vĂ  hiá»ƒn thá»‹ danh sĂ¡ch "References" á»Ÿ cuá»‘i trang Note.
#### **AC 2 - Unlinked Mentions:** 
- Gá»£i Ă½ cĂ¡c tá»« khĂ³a trong bĂ i khá»›p vá»›i tĂªn cĂ¡c Note khĂ¡c nhÆ°ng chÆ°a Ä‘Æ°á»£c táº¡o link, cho phĂ©p táº¡o link nhanh chá»‰ vá»›i 1 click.
# 3. Business Rules & Constraints
## 3.1. Quy táº¯c Báº£o máº­t & Quyá»n riĂªng tÆ° (Security & Privacy)
1. **Inherited Permissions (Quyá»n thá»«a káº¿):** Quyá»n truy cáº­p vĂ o Comment/File Ä‘Æ°á»£c thá»«a káº¿ trá»±c tiáº¿p tá»« quyá»n truy cáº­p Task.
    - Náº¿u User máº¥t quyá»n truy cáº­p Project, há» cÅ©ng máº¥t quyá»n xem toĂ n bá»™ lá»‹ch sá»­ tháº£o luáº­n bĂªn trong.
2. **Immutability Audit (Kiá»ƒm toĂ¡n tĂ­nh báº¥t biáº¿n):**
    - NgÆ°á»i dĂ¹ng Ä‘Æ°á»£c phĂ©p chá»‰nh sá»­a (Edit) hoáº·c xĂ³a (Delete) comment cá»§a chĂ­nh mĂ¬nh.
    - **Tuy nhiĂªn:** Há»‡ thá»‘ng pháº£i lÆ°u láº¡i lá»‹ch sá»­ chá»‰nh sá»­a (`edited_at`, `original_content`) trong Database Ä‘á»ƒ phá»¥c vá»¥ Audit Log. KhĂ´ng cho phĂ©p xĂ³a vÄ©nh viá»…n dáº¥u váº¿t Ä‘á»ƒ Ä‘áº£m báº£o tĂ­nh minh báº¡ch trong mĂ´i trÆ°á»ng doanh nghiá»‡p.
## 3.2. RĂ ng buá»™c vá» File (File Constraints)
1. **Storage Quota:** Giá»›i háº¡n dung lÆ°á»£ng táº£i lĂªn dá»±a trĂªn gĂ³i dá»‹ch vá»¥ cá»§a Workspace (vĂ­ dá»¥: 100MB/file cho Free Plan, 1GB/file cho Enterprise).
2. **Allowed Extensions:** Cháº·n tuyá»‡t Ä‘á»‘i cĂ¡c file thá»±c thi (`.exe`, `.sh`, `.bat`, `.js`) á»Ÿ táº§ng Backend Ä‘á»ƒ phĂ²ng chá»‘ng Malware.
## 3.3. RĂ ng buá»™c vá» Hiá»‡u nÄƒng Thá»i gian thá»±c (Real-time Performance Constraints)
Äá»ƒ Ä‘áº£m báº£o tráº£i nghiá»‡m "Cá»™ng tĂ¡c tá»©c thĂ¬" (Instant Collaboration), há»‡ thá»‘ng pháº£i tuĂ¢n thá»§ cĂ¡c chá»‰ sá»‘ ká»¹ thuáº­t (SLIs) sau:
1. **Message Delivery Latency:** Thá»i gian tá»« khi User A nháº¥n Enter Ä‘áº¿n khi User B nhĂ¬n tháº¥y tin nháº¯n pháº£i **< 200ms** (NgÆ°á»¡ng nháº­n thá»©c Ä‘á»™ trá»… cá»§a con ngÆ°á»i - _Human Perception Threshold_).
2. **Concurrency:** Há»‡ thá»‘ng pháº£i chá»‹u táº£i Ä‘Æ°á»£c tá»‘i thiá»ƒu 50 ngÆ°á»i cĂ¹ng thao tĂ¡c (soáº¡n tháº£o, comment) trĂªn má»™t Task táº¡i cĂ¹ng má»™t thá»i Ä‘iá»ƒm mĂ  khĂ´ng gĂ¢y ra xung Ä‘á»™t dá»¯ liá»‡u (Data Race).
## 3.4. Quy táº¯c LÆ°u trá»¯ Láº¡nh (Cold Storage Rule)
- CĂ¡c file Ä‘Ă­nh kĂ¨m cá»§a dá»± Ă¡n Ä‘Ă£ Ä‘Ă³ng (Closed Project) quĂ¡ 1 nÄƒm sáº½ Ä‘Æ°á»£c tá»± Ä‘á»™ng di chuyá»ƒn tá»« á»• cá»©ng SSD (Hot Storage) sang S3 Glacier (Cold Storage) Ä‘á»ƒ tá»‘i Æ°u chi phĂ­ háº¡ táº§ng.
- Viá»‡c truy xuáº¥t láº¡i cĂ¡c file nĂ y sáº½ cĂ³ Ä‘á»™ trá»… (khoáº£ng 3-5 giĂ¢y Ä‘á»ƒ restore) thay vĂ¬ tá»©c thĂ¬.
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. LĂ½ thuyáº¿t vá» Äá»™ giĂ u cá»§a Truyá»n thĂ´ng (Media Richness Theory)
LĂ½ thuyáº¿t nĂ y (Daft & Lengel, 1986) cho ráº±ng hiá»‡u quáº£ giao tiáº¿p phá»¥ thuá»™c vĂ o kháº£ nÄƒng cá»§a kĂªnh truyá»n táº£i trong viá»‡c xá»­ lĂ½ thĂ´ng tin phá»©c táº¡p.
- **á»¨ng dá»¥ng trong PronaFlow:**
    - Sá»­ dá»¥ng **Text Comment** cho cĂ¡c trao Ä‘á»•i thĂ´ng tin xĂ¡c thá»±c, rĂµ rĂ ng (Low ambiguity).
    - Sá»­ dá»¥ng **Rich Media (Image/Video)** Ä‘Ă­nh kĂ¨m cho cĂ¡c váº¥n Ä‘á» phá»©c táº¡p cáº§n trá»±c quan hĂ³a (High ambiguity).
    - Sá»­ dá»¥ng **Emoji/Reaction** Ä‘á»ƒ truyá»n táº£i cáº£m xĂºc vĂ  xĂ¡c nháº­n nhanh (Ack) mĂ  khĂ´ng táº¡o ra nhiá»…u thĂ´ng bĂ¡o (Noise reduction).
## 4.2. Giáº£m thiá»ƒu Chi phĂ­ Chuyá»ƒn Ä‘á»•i Ngá»¯ cáº£nh (Context Switching Cost)
NghiĂªn cá»©u cá»§a _Gerald Weinberg_ chá»‰ ra ráº±ng má»—i khi chuyá»ƒn Ä‘á»•i giá»¯a cĂ¡c tĂ¡c vá»¥ hoáº·c á»©ng dá»¥ng, hiá»‡u suáº¥t nĂ£o bá»™ giáº£m khoáº£ng 20-80%.
- **Giáº£i phĂ¡p:** Báº±ng viá»‡c tĂ­ch há»£p "Unified Collaboration Hub" ngay trong mĂ n hĂ¬nh chi tiáº¿t Task, PronaFlow loáº¡i bá» nhu cáº§u pháº£i `Alt+Tab` sang á»©ng dá»¥ng chat khĂ¡c Ä‘á»ƒ há»i "CĂ¡i nĂ y lĂ m tháº¿ nĂ o?". Má»i thá»© cáº§n thiáº¿t Ä‘á»ƒ hoĂ n thĂ nh cĂ´ng viá»‡c Ä‘á»u náº±m trong táº§m máº¯t (At hand), giĂºp duy trĂ¬ tráº¡ng thĂ¡i dĂ²ng cháº£y (Flow State) cá»§a nhĂ¢n viĂªn.
## 4.3. Há»‡ thá»‘ng Bá»™ nhá»› Giao dá»‹ch (Transactive Memory System - TMS)
LĂ½ thuyáº¿t TMS (Wegner, 1987) cho ráº±ng má»™t nhĂ³m lĂ m viá»‡c hiá»‡u quáº£ khĂ´ng pháº£i vĂ¬ táº¥t cáº£ má»i ngÆ°á»i Ä‘á»u biáº¿t má»i thá»©, mĂ  vĂ¬ há» biáº¿t "ai biáº¿t cĂ¡i gĂ¬".
- **Ăp dá»¥ng:** TĂ­nh nÄƒng **Smart Mentions** (AC 6.1) vĂ  **Collaborative Search** (AC 6.5) Ä‘Ă³ng vai trĂ² lĂ  "bá»™ nhá»› ngoĂ i" (External Storage) cá»§a nhĂ³m. NĂ³ giĂºp giáº£m táº£i nháº­n thá»©c cho tá»«ng cĂ¡ nhĂ¢n, vĂ¬ há» khĂ´ng cáº§n nhá»› chi tiáº¿t sá»± viá»‡c, chá»‰ cáº§n biáº¿t cĂ¡ch tra cá»©u nĂ³ trong PronaFlow.
## 4.4. LĂ½ thuyáº¿t Phá»‘i há»£p (Coordination Theory - Malone & Crowston)
LĂ½ thuyáº¿t nĂ y Ä‘á»‹nh nghÄ©a phá»‘i há»£p lĂ  "quáº£n lĂ½ cĂ¡c sá»± phá»¥ thuá»™c".
- **Ăp dá»¥ng:** TĂ­nh nÄƒng **Formal Approval Workflow** (AC 6.4) giáº£i quyáº¿t loáº¡i phá»¥ thuá»™c "NhĂ  sáº£n xuáº¥t/NgÆ°á»i tiĂªu dĂ¹ng" (Producer/Consumer dependency). Designer (Producer) cáº§n sá»± phĂª duyá»‡t cá»§a Client (Consumer) Ä‘á»ƒ tiáº¿n hĂ nh bÆ°á»›c tiáº¿p theo. Viá»‡c há»‡ thá»‘ng hĂ³a quy trĂ¬nh nĂ y giĂºp giáº£m thiá»ƒu Ä‘á»™ trá»… trong luá»“ng cĂ´ng viá»‡c (Workflow Latency).
