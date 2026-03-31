**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
***Last updated:** Jan 9, 2026*

---
Há»‡ thá»‘ng PronaFlow Ä‘Æ°á»£c kiáº¿n trĂºc dá»±a trĂªn mĂ´ hĂ¬nh _Domain-Driven Design (DDD)_, phĂ¢n tĂ¡ch thĂ nh 16 phĂ¢n há»‡ nghiá»‡p vá»¥ cá»‘t lĂµi.

| N.O | Function Modules                                 | Details                                                                                 |
| --- | ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| 1   | PhĂ¢n há»‡ Quáº£n trá»‹ Äá»‹nh dang & Kiá»ƒm soĂ¡t Truy cáº­p  | [[System Functional Modules#1. Identity & Access Management - IAM\|Module 1]]           |
| 2   | PhĂ¢n há»‡ Quáº£n trá»‹ Äa Tá»• chá»©c                      | [[System Functional Modules#2. Multi-tenancy Workspace Governance\|Module 2]]           |
| 3   | PhĂ¢n há»‡ Quáº£n lĂ½ VĂ²ng Ä‘á»i Dá»± Ă¡n                   | [[System Functional Modules#3. Project Lifecycle Management\|Module 3]]                 |
| 4   | PhĂ¢n há»‡ Äiá»u phá»‘i & Thá»±c thi TĂ¡c vá»¥              | [[System Functional Modules#4. Task Execution & Orchestration\|Module 4]]               |
| 5   | PhĂ¢n há»‡ Láº­p lá»‹ch & Quáº£n trá»‹ Thá»i gian            | [[System Functional Modules#5. Temporal Planning & Scheduling\|Module 5]]               |
| 6   | PhĂ¢n há»‡ Truyá»n thĂ´ng & Cá»™ng tĂ¡c Há»£p nháº¥t         | [[System Functional Modules#6. Unified Collaboration Hub\|Module 6]]                    |
| 7   | PhĂ¢n há»‡ ThĂ´ng bĂ¡o HÆ°á»›ng Sá»± kiá»‡n                  | [[System Functional Modules#7. Event-Driven Notification System\|Module 7]]             |
| 8   | PhĂ¢n há»‡ LÆ°u trá»¯ & TuĂ¢n thá»§ Dá»¯ liá»‡u               | [[System Functional Modules#8. Data Archiving & Compliance\|Module 8]]                  |
| 9   | PhĂ¢n há»‡ CĂ¡ nhĂ¢n hĂ³a Tráº£i nghiá»‡m                  | [[System Functional Modules#9. User Experience Personalization\|Module 9]]              |
| 10  | PhĂ¢n há»‡ Há»‡ thá»‘ng Há»— trá»£ Ra quyáº¿t Ä‘á»‹nh ThĂ´ng minh | [[System Functional Modules#10. Intelligent Decision Support System - IDSS\|Module 10]] |
| 11  | PhĂ¢n há»‡ BĂ¡o cĂ¡o & PhĂ¢n tĂ­ch NĂ¢ng cao             | [[System Functional Modules#11. Advanced Analytics & Reporting\|Module 11]]             |
| 12  | PhĂ¢n há»‡ Há»‡ sinh thĂ¡i tĂ­ch há»£p & Má»Ÿ rá»™ng          | [[System Functional Modules#12. Integration Ecosystem\|Module 12]]                      |
| 13  | PhĂ¢n há»‡ GĂ³i cÆ°á»›c & Thanh toĂ¡n                    | [[System Functional Modules#13. Subscription & Billing Management\|Module 13]]          |
| 14  | PhĂ¢n há»‡ Quáº£n trá»‹ Há»‡ thá»‘ng & Váº­n hĂ nh             | [[System Functional Modules#14. System Administration\|Module 14]]                      |
| 15  | PhĂ¢n há»‡ Trung tĂ¢m Trá»£ giĂºp & CÆ¡ sá»Ÿ Tri thá»©c      | [[System Functional Modules#15. Help Center & Knowledge Base\|Module 15]]               |
| 16  | PhĂ¢n há»‡ Dáº«n nháº­p & ÄĂ o táº¡o NgÆ°á»i dĂ¹ng            | [[System Functional Modules#16. User Onboarding & Adoption\|Module 16]]                 |

# 1. Identity & Access Management - IAM
ÄĂ³ng vai trĂ² lĂ  **Security Gateway*** váº­n hĂ nh theo mĂ´ hĂ¬nh #AAA (Authentiacation - Authorization - Accounting), Ä‘áº£m báº£o an ninh cho kiáº¿n trĂºc Multi-tenancy.
- **Identity Lifecycle & Authentication:** Quáº£n lĂ½ trá»n váº¹n quy trĂ¬nh tá»« ÄÄƒng kĂ½, XĂ¡c thá»±c Email, Ä‘áº¿n ÄÄƒng nháº­p an toĂ n. TĂ­ch há»£p cÆ¡ cháº¿ chá»‘ng **Brute-force** (khĂ³a táº¡m thá»i), há»— trá»£ **MFA (TOTP)**, vĂ  Ä‘Äƒng nháº­p qua máº¡ng xĂ£ há»™i (**OAuth2** - Google/GitHub).
- **RBAC Authorization:** Thá»±c thi kiá»ƒm soĂ¡t truy cáº­p dá»±a trĂªn vai trĂ² phĂ¢n cáº¥p (**Owner, Admin, Member, Guest**) táº¡i tá»«ng Ä‘iá»ƒm cháº¡m (Endpoint), Ä‘áº£m báº£o nguyĂªn táº¯c Ä‘áº·c quyá»n tá»‘i thiá»ƒu (PoLP).
- **Session Governance:** Quáº£n lĂ½ phiĂªn lĂ m viá»‡c chi tiáº¿t vá»›i giá»›i háº¡n thiáº¿t bá»‹ Ä‘á»“ng thá»i (**Concurrent Session Limit**), há»— trá»£ thu há»“i quyá»n truy cáº­p tá»« xa (**Remote Revocation**) vĂ  phĂ¡t hiá»‡n hĂ nh vi di chuyá»ƒn báº¥t thÆ°á»ng (**Impossible Travel Alert**).
- **Account Security:** Quy trĂ¬nh khĂ´i phá»¥c máº­t kháº©u an toĂ n (One-time link) vĂ  cÆ¡ cháº¿ tá»± Ä‘á»™ng cháº¥m dá»©t phiĂªn khi thay Ä‘á»•i thĂ´ng tin nháº¡y cáº£m.
Xem chi tiáº¿t táº¡i: [[1 - Identity and Access Management]]
# 2. Multi-tenancy Workspace Governance
Giáº£i quyáº¿t bĂ i toĂ¡n váº­n hĂ nh Ä‘a tá»• chá»©c trĂªn cĂ¹ng má»™t háº¡ táº§ng (SaaS Architecture), Ä‘áº£m báº£o má»—i Workspace hoáº¡t Ä‘á»™ng nhÆ° má»™t thá»±c thá»ƒ Ä‘á»™c láº­p.
- **Logical Isolation & Context Switching:** Thá»±c thi nghiĂªm ngáº·t quy táº¯c cĂ´ láº­p dá»¯ liá»‡u (**Data Partitioning**) táº¡i táº§ng Application/Database, Ä‘áº£m báº£o ngÆ°á»i dĂ¹ng chá»‰ truy cáº­p Ä‘Æ°á»£c tĂ i nguyĂªn thuá»™c Workspace hiá»‡n hĂ nh. Há»— trá»£ chuyá»ƒn Ä‘á»•i ngá»¯ cáº£nh lĂ m viá»‡c (Context Switching) tá»©c thĂ¬ vĂ  lÆ°u giá»¯ tráº¡ng thĂ¡i phiĂªn.
- **Tenant Lifecycle Management:** Quáº£n lĂ½ vĂ²ng Ä‘á»i toĂ n diá»‡n cá»§a tá»• chá»©c: Tá»« lĂºc Khá»Ÿi táº¡o (bao gá»“m Default Workspace), Hoáº¡t Ä‘á»™ng, Ä‘áº¿n XĂ³a má»m (**Soft Delete**) vĂ  cÆ¡ cháº¿ tá»± Ä‘á»™ng dá»n dáº¹p (**Auto-Purge**) sau 30 ngĂ y. Cung cáº¥p cĂ´ng cá»¥ Back-office cho System Admin Ä‘á»ƒ khĂ´i phá»¥c (Restore) khi cáº§n thiáº¿t.
- **Member & Role Governance:** Há»‡ thá»‘ng phĂ¢n quyá»n ná»™i bá»™ linh hoáº¡t vá»›i 4 vai trĂ² chuáº©n (**Owner, Admin, Member, Viewer**). TĂ­ch há»£p quy trĂ¬nh má»i thĂ nh viĂªn qua **Magic Link**, quáº£n lĂ½ **Owner Succession** (káº¿ thá»«a quyá»n lá»±c) vĂ  báº£o vá»‡ nghiĂªm ngáº·t quyá»n truy cáº­p module Billing.
- **Workspace Configuration:** Cho phĂ©p tĂ¹y biáº¿n ngá»¯ cáº£nh lĂ m viá»‡c cá»¥ thá»ƒ cho tá»«ng tá»• chá»©c nhÆ°: Lá»‹ch lĂ m viá»‡c (**Working Schedule**), MĂºi giá» (Timezone) vĂ  Nháº­n diá»‡n thÆ°Æ¡ng hiá»‡u (Branding).
Xem chi tiáº¿t táº¡i: [[2 - Multi-tenancy Workspace Governance]]
# 3. Project Lifecycle Management
ÄĂ³ng vai trĂ² trung tĂ¢m Ä‘iá»u phá»‘i vĂ²ng Ä‘á»i dá»± Ă¡n tá»« khá»Ÿi táº¡o, thá»±c thi Ä‘áº¿n Ä‘Ă³ng vĂ  lÆ°u trá»¯.
- **Lifecycle Control:** Quáº£n lĂ½ quy trĂ¬nh dá»± Ă¡n thĂ´ng qua MĂ¡y tráº¡ng thĂ¡i 5 bÆ°á»›c (**Not-Started, In-Progress, In-Review, Done, Cancelled/Hold**) tĂ­ch há»£p cĂ¡c cá»•ng kiá»ƒm soĂ¡t (**Transition Gates**) nhÆ° "Definition of Done". Há»— trá»£ chiáº¿n lÆ°á»£c lÆ°u trá»¯ (**Archiving**) tá»± Ä‘á»™ng vĂ  chuyá»ƒn giao quyá»n sá»Ÿ há»¯u (**Ownership Transfer**) an toĂ n.
- **Progressive Governance:** Cho phĂ©p lá»±a chá»n cháº¿ Ä‘á»™ quáº£n trá»‹ linh hoáº¡t: **Simple Mode** (Agile/Fast-paced) hoáº·c **Strict Mode** (Enterprise/Contract-based). Cháº¿ Ä‘á»™ Strict kĂ­ch hoáº¡t cĂ¡c cÆ¡ cháº¿ kiá»ƒm soĂ¡t nghiĂªm ngáº·t: Quáº£n lĂ½ phiĂªn báº£n **Baseline**, Quy trĂ¬nh yĂªu cáº§u thay Ä‘á»•i (**PCR - Project Change Request**), vĂ  KhĂ³a vĂ¹ng káº¿ hoáº¡ch (**Freeze Window**).
- **Strategic Planning & Simulation:** Cung cáº¥p mĂ´i trÆ°á»ng **What-if Simulation** (Há»™p cĂ¡t mĂ´ phá»ng) Ä‘á»ƒ PM táº¡o cĂ¡c ká»‹ch báº£n thá»­ nghiá»‡m (Scenarios) vĂ  Ä‘Ă¡nh giĂ¡ tĂ¡c Ä‘á»™ng trÆ°á»›c khi Ă¡p dá»¥ng (Promote) vĂ o dá»± Ă¡n tháº­t. Tá»± Ä‘á»™ng tĂ­nh toĂ¡n chá»‰ sá»‘ sá»©c khá»e (**Project Health**) dá»±a trĂªn Tiáº¿n Ä‘á»™, Nguá»“n lá»±c vĂ  NgĂ¢n sĂ¡ch.
- **Standardization & Security:** Tá»• chá»©c dá»± Ă¡n theo cáº¥u trĂºc phĂ¢n cáº¥p (**Portfolios/Programs**). Chuáº©n hĂ³a khá»Ÿi táº¡o qua **Project Templates** vĂ  há»‡ thá»‘ng phĂ¢n quyá»n chuyĂªn sĂ¢u cáº¥p dá»± Ă¡n (**PM, Planner, Member, Viewer**) há»— trá»£ cháº¿ Ä‘á»™ riĂªng tÆ° (Private Projects).
Xem chi tiáº¿t táº¡i: [[3 - Project Lifecycle Management]]
# 4. Task Execution & Orchestration
ÄÆ°á»£c thiáº¿t káº¿ Ä‘á»ƒ tá»‘i Æ°u hĂ³a hiá»‡u suáº¥t thá»±c thi vĂ  Ä‘áº£m báº£o ká»· luáº­t váº­n hĂ nh xoay quanh Ä‘Æ¡n vá»‹ cĂ´ng viá»‡c (Task).
- **WBS & Atomic Units:** Quáº£n lĂ½ cáº¥u trĂºc phĂ¢n rĂ£ cĂ´ng viá»‡c Ä‘a táº§ng (**Task List -> Task -> Subtask**) vĂ  cĂ¡c thuá»™c tĂ­nh má»Ÿ rá»™ng (**Custom Fields**), há»— trá»£ Ä‘á»‹nh nghÄ©a cĂ¡c cá»™t má»‘c (**Milestones**) quan trá»ng.
- **Productivity Tools:** Cung cáº¥p bá»™ cĂ´ng cá»¥ tÄƒng tá»‘c Ä‘á»™ lĂ m viá»‡c: **Time Tracking** (Theo dĂµi thá»i gian thá»±c), **Task Templates** (Máº«u cĂ´ng viá»‡c chuáº©n hĂ³a), **Recurring Tasks** (CĂ´ng viá»‡c láº·p láº¡i tá»± Ä‘á»™ng) vĂ  Thao tĂ¡c hĂ ng loáº¡t (**Bulk Actions**).
- **Orchestration & Logic:** Quáº£n lĂ½ cháº·t cháº½ sá»± phá»¥ thuá»™c (**Dependencies - FS**) vá»›i cÆ¡ cháº¿ phĂ¡t hiá»‡n vĂ²ng láº·p (**Cycle Detection**).
- **Execution Discipline:** Thá»±c thi cĂ¡c rĂ ng buá»™c tá»« káº¿ hoáº¡ch tá»•ng thá»ƒ (**Locked Plan**). Há»‡ thá»‘ng phĂ¢n biá»‡t rĂµ rĂ ng giá»¯a "NgĂ y káº¿ hoáº¡ch" (cá»‘ Ä‘á»‹nh bá»Ÿi Module 5) vĂ  "NgĂ y thá»±c táº¿" (linh hoáº¡t ghi nháº­n) Ä‘á»ƒ Ä‘o lÆ°á»ng Ä‘á»™ trá»… chĂ­nh xĂ¡c mĂ  khĂ´ng lĂ m giĂ¡n Ä‘oáº¡n dĂ²ng cháº£y cĂ´ng viá»‡c.
Xem chi tiáº¿t táº¡i: [[4 - Task Execution and Orchestration]]
# 5. Temporal Planning & Scheduling
PhĂ¢n há»‡ hoáº¡ch Ä‘á»‹nh chiáº¿n lÆ°á»£c vĂ  quáº£n trá»‹ thá»i gian chuyĂªn sĂ¢u, Ä‘Ă³ng vai trĂ² lĂ  "bá»™ nĂ£o" tĂ­nh toĂ¡n lá»‹ch trĂ¬nh cho cĂ¡c dá»± Ă¡n quy mĂ´ lá»›n (Waterfall/Hybrid).
- **Advanced Gantt & CPM:** Trá»±c quan hĂ³a tiáº¿n Ä‘á»™ trĂªn biá»ƒu Ä‘á»“ Gantt tÆ°Æ¡ng tĂ¡c (Drag & Drop), há»— trá»£ Ä‘áº§y Ä‘á»§ cĂ¡c loáº¡i phá»¥ thuá»™c chuáº©n PDM (**FS, SS, FF, SF**) cĂ¹ng tham sá»‘ **Lag/Lead Time**. Tá»± Ä‘á»™ng tĂ­nh toĂ¡n ÄÆ°á»ng gÄƒng (**Critical Path**) vĂ  lan truyá»n thay Ä‘á»•i lá»‹ch trĂ¬nh (**Auto-Scheduling**) theo thá»i gian thá»±c.
- **Planning Governance & Simulation:** Thiáº¿t láº­p ká»· luáº­t káº¿ hoáº¡ch thĂ´ng qua quy trĂ¬nh phĂª duyá»‡t vĂ  quáº£n lĂ½ phiĂªn báº£n **Baseline**. Cung cáº¥p mĂ´i trÆ°á»ng **What-If Simulation** (Há»™p cĂ¡t mĂ´ phá»ng) Ä‘á»ƒ PM thá»­ nghiá»‡m cĂ¡c ká»‹ch báº£n thay Ä‘á»•i vĂ  xem trÆ°á»›c báº£ng phĂ¢n tĂ­ch tĂ¡c Ä‘á»™ng (**Change Impact Analysis**) trÆ°á»›c khi Ă¡p dá»¥ng vĂ o dá»¯ liá»‡u tháº­t. Há»— trá»£ **Freeze Window** Ä‘á»ƒ khĂ³a cá»©ng lá»‹ch trĂ¬nh ngáº¯n háº¡n.
- **Resource Optimization:** Tá»± Ä‘á»™ng phĂ¡t hiá»‡n xung Ä‘á»™t vĂ  cĂ¢n báº±ng nguá»“n lá»±c (**Automated Resource Leveling**) dá»±a trĂªn Ä‘á»™ trĂ´i (Float) vĂ  Ä‘á»™ Æ°u tiĂªn. TĂ­ch há»£p xá»­ lĂ½ ngoáº¡i lá»‡ lá»‹ch biá»ƒu cĂ¡ nhĂ¢n (Calendar Exceptions) vĂ  chia tĂ¡ch cĂ´ng viá»‡c (**Task Splitting**).
- **SLA & Risk Management:** Theo dĂµi cam káº¿t dá»‹ch vá»¥ (**SLA Tracking**) chĂ­nh xĂ¡c theo giá» hĂ nh chĂ­nh (Business Hours). Há»— trá»£ láº­p lá»‹ch dá»±a trĂªn rá»§i ro (**Risk-aware Scheduling**) vá»›i dá»± bĂ¡o ngĂ y hoĂ n thĂ nh theo xĂ¡c suáº¥t (P50/P90) vĂ  quáº£n lĂ½ phá»¥ thuá»™c Ä‘a dá»± Ă¡n (**Cross-Project Dependencies**).
Xem chi tiáº¿t táº¡i: [[5 - Temporal Planning and Scheduling]]
# 6. Unified Collaboration Hub
Chuyá»ƒn Ä‘á»•i tá»« giao tiáº¿p phĂ¢n máº£nh sang mĂ´ hĂ¬nh **Contextual Communication** (Giao tiáº¿p gáº¯n liá»n ngá»¯ cáº£nh), Ä‘Ă³ng vai trĂ² lĂ  "Nguá»“n sá»± tháº­t duy nháº¥t" (Single Source of Truth) cho má»i trao Ä‘á»•i dá»± Ă¡n.
- **Contextual Discussion:** Há»— trá»£ tháº£o luáº­n Ä‘a cáº¥p (**Threaded Replies**) ngay trong Task, tĂ­ch há»£p soáº¡n tháº£o vÄƒn báº£n (Rich Text) vĂ  Ä‘á»‹nh danh thĂ´ng minh (**Smart Mentions**).
- **Digital Asset Management (DAM):** Quáº£n lĂ½ tĂ i sáº£n sá»‘ táº­p trung vá»›i kháº£ nÄƒng kiá»ƒm soĂ¡t phiĂªn báº£n (**Versioning**), xem trÆ°á»›c Ä‘a Ä‘á»‹nh dáº¡ng (**Universal Viewer**) vĂ  quy trĂ¬nh phĂª duyá»‡t chĂ­nh thá»©c (**Formal Approval Workflow**) cĂ³ kiá»ƒm toĂ¡n chá»¯ kĂ½ sá»‘.
- **Real-time Collaboration:** TĂ­ch há»£p chá»‰ bĂ¡o hiá»‡n diá»‡n (**Presence Indicators**) Ä‘á»ƒ biáº¿t ai Ä‘ang xem/soáº¡n tháº£o, ngÄƒn cháº·n xung Ä‘á»™t dá»¯ liá»‡u.
- **Integrated Knowledge Base (Wiki):** Há»‡ thá»‘ng ghi chĂº dá»± Ă¡n vĂ  cĂ¡ nhĂ¢n (Notes) há»— trá»£ cáº¥u trĂºc phĂ¢n cáº¥p, máº«u (**Templates**), liĂªn káº¿t thĂ´ng minh (**Smart Backlinks**) vĂ  lá»‹ch sá»­ thay Ä‘á»•i tĂ i liá»‡u (**Diff View**). Cho phĂ©p xuáº¥t báº£n tĂ i liá»‡u ra cĂ´ng chĂºng (**Public Publishing**) vá»›i kiá»ƒm soĂ¡t truy cáº­p.
Xem chi tiáº¿t táº¡i: [[6 - Unified Collaboration Hub]]
# 7.  Event-Driven Notification System
- Pub/Sub Machanism: Sá»­ dá»¥ng kiáº¿n trĂºc Publish/Subscribe Ä‘á»ƒ xá»­ lĂ½ hĂ ng triá»‡u sá»± kiá»‡n há»‡ thá»‘ng theo thá»i gian thá»±c.
- Smart Routing: PhĂ¢n loáº¡i vĂ  Ä‘á»‹nh tuyáº¿n thĂ´ng bĂ¡o thĂ´ng minh Ä‘áº¿n Ä‘Ăºng Ä‘á»‘i tÆ°á»£ng, qua Ä‘Ăºng kĂªnh (In-app, Email, Push) Ä‘á»ƒ giáº£m thiá»ƒu nhiá»…u thĂ´ng tin.
Xem chi tiáº¿t táº¡i: [[7 - Event-Driven Notification System]]
# 8. Data Archiving & Compliance
- Data Retention Policy: Thiáº¿t láº­p cĂ¡c quy táº¯c tá»± Ä‘á»™ng vá» lÆ°u trá»¯ vĂ  xĂ³a dá»¯ liá»‡u (Soft Delete/ Hard Delete) tuĂ¢n thá»§ cĂ¡c quy Ä‘á»‹nh báº£o máº­t.
- Cold Storage Strategy: CÆ¡ cháº¿ di chuyá»ƒn dá»¯ liá»‡u Ă­t truy cáº­p (dá»± Ă¡n Ä‘Ă£ Ä‘Ă³ng) sang vĂ¹ng lÆ°u trá»¯ láº¡nh Ä‘á»ƒ tá»‘i Æ°u hiá»‡u nÄƒng truy cáº­p cho há»‡ thá»‘ng chĂ­nh (Hot Data).
Xem chi tiáº¿t táº¡i: [[8 - Data Archiving and Compliance]]
# 9. User Experience Personalization
- L18n & L10n: Há»— trá»£ Quá»‘c táº¿ hĂ³a (Internationalization) vĂ  Báº£n Ä‘á»‹a hĂ³a (Localization) toĂ n diá»‡n cho giao diá»‡n vĂ  dá»¯ liá»‡u/
- Adaptive UI: Cho phĂ©p ngÆ°á»i dĂ¹ng tuy biáº¿n Theme, Layout vĂ  Dashboard cĂ¡ nhĂ¢n hĂ³a Ä‘á»ƒ phĂ¹ há»£p vá»›i thĂ³i quan lĂ m viá»‡c (Ergonomics).
Xem chi tiáº¿t táº¡i: [[9 - User Experience Personalization]]
# 10. Intelligent Decision Support System - IDSS
ÄĂ¢y lĂ  phĂ¢n há»‡ nĂ¢ng cao, táº­n dá»¥ng ná»n táº£ng Data Science Ä‘á»ƒ chuyá»ƒn Ä‘á»•i dá»¯ liá»‡u thĂ´ thĂ nh tri thá»©c quáº£n trá»‹.
- Predictive Analytics: Sá»­ dá»¥ng cĂ¡c mĂ´ hĂ¬nh há»“i quy (Regression Models) Ä‘á»ƒ dá»± bĂ¡o ngĂ y hoĂ n thĂ nh dá»± Ă¡n dá»±a trĂªn váº­n tá»‘c lĂ m viá»‡c lá»‹ch sá»­.
- Prescriptive Analytics: á»¨ng dá»¥ng thuáº­t toĂ¡n gá»£i Ă½ Ä‘á»ƒ Ä‘á» xuáº¥t phĂ¢n cĂ´ng nhĂ¢n sá»± tá»‘i Æ°u dá»±a trĂªn ká»¹ nÄƒng (Skill-set) vĂ  táº£i cĂ´ng viá»‡c.
- Anomaly Detection: Tá»± Ä‘á»™ng phĂ¡t hiá»‡n cĂ¡c hĂ nh vi báº¥t thÆ°á»ng trong há»‡ thá»‘ng hoáº·c cĂ¡c dá»± Ă¡n cĂ³ nguy cÆ¡ rá»§i ro cao.
Xem chi tiáº¿t táº¡i: [[10 - Intelligent Decision Support System]]
# 11. Advanced Analytics & Reporting
Cung cáº¥p gĂ³c nhĂ¬n sĂ¢u sáº¯c vá» hiá»‡u suáº¥t váº­n hĂ nh doanh nghiá»‡p thĂ´ng qua dá»¯ liá»‡u lá»‹ch sá»­.
- **Descriptive Analytics**: BĂ¡o cĂ¡o tá»•ng há»£p Ä‘a chiá»u vá» tiáº¿n Ä‘á»™, phĂ¢n bá»• nguá»“n lá»±c vĂ  chi phĂ­ (Burn-down, Velocity, Resource Heatmap).
- **Time Tracking & Timesheets**: Ghi nháº­n thá»i gian thá»±c táº¿ (Billable/Non-billable Hours) phá»¥c vá»¥ cĂ´ng tĂ¡c káº¿ toĂ¡n vĂ  tĂ­nh lÆ°Æ¡ng.
- **Custom Report Builder**: Cho phĂ©p ngÆ°á»i dĂ¹ng tá»± Ä‘á»‹nh nghÄ©a bĂ¡o cĂ¡o (Ad-hoc Reporting) báº±ng thao tĂ¡c kĂ©o tháº£. 
Xem chi tiáº¿t táº¡i: [[11 - Advanced Analytics and Reporting]]
# 12. Integration Ecosystem
Má»Ÿ rá»™ng kháº£ nÄƒng cá»§a PronaFlow thĂ´ng qua viá»‡c káº¿t ná»‘i vá»›i cĂ¡c há»‡ thá»‘ng bĂªn ngoĂ i.
- **API Gateway & Webhooks**: Cung cáº¥p cÆ¡ cháº¿ giao tiáº¿p chuáº©n (RESTful/GraphQL) Ä‘á»ƒ cĂ¡c bĂªn thá»© 3 (GitLab, Figma, Slack) tĂ­ch há»£p quy trĂ¬nh.
- **Marketplace**: Kho á»©ng dá»¥ng táº­p trung (Plugin Architecture) cho phĂ©p cĂ i Ä‘áº·t vĂ  quáº£n lĂ½ cĂ¡c tiá»‡n Ă­ch má»Ÿ rá»™ng.
- **Connector Hub**: CĂ¡c Ä‘áº§u ná»‘i (Connectors) dá»±ng sáºµn giĂºp Ä‘á»“ng bá»™ dá»¯ liá»‡u hai chiá»u (Bi-directional Sync) mĂ  khĂ´ng cáº§n viáº¿t code (No-code Integration). Xem chi tiáº¿t táº¡i: [[12 - Integration Ecosystem]]
# 13. Subscription & Billing Management
Há»‡ thá»‘ng quáº£n trá»‹ tĂ i chĂ­nh vĂ  cáº¥p phĂ©p sá»­ dá»¥ng tĂ i nguyĂªn (Resource Provisioning).
- **Plan Management**: Äá»‹nh nghÄ©a cĂ¡c gĂ³i dá»‹ch vá»¥ (Tiered Pricing) vĂ  háº¡n ngáº¡ch tĂ i nguyĂªn (Quotas) cho tá»«ng gĂ³i (User limit, Storage limit).
- **Automated Billing Cycle**: Tá»± Ä‘á»™ng hĂ³a quy trĂ¬nh tĂ­nh cÆ°á»›c (Recurring Billing), xuáº¥t hĂ³a Ä‘Æ¡n (Invoicing) vĂ  xá»­ lĂ½ gia háº¡n.
- **Usage Metering**: Äo Ä‘áº¿m má»©c Ä‘á»™ sá»­ dá»¥ng tĂ i nguyĂªn thá»±c táº¿ (API calls, AI tokens) Ä‘á»ƒ phá»¥c vá»¥ mĂ´ hĂ¬nh tĂ­nh phĂ­ theo nhu cáº§u (Pay-as-you-go). 
Xem chi tiáº¿t táº¡i: [[13 - Subscription and Billing Management]]
# 14. System Administration
PhĂ¢n há»‡ dĂ nh riĂªng cho Super Admin Ä‘á»ƒ giĂ¡m sĂ¡t vĂ  váº­n hĂ nh toĂ n bá»™ há»‡ thá»‘ng (Back-office).
- **Global Tenant Management**: Quáº£n lĂ½ vĂ²ng Ä‘á»i cá»§a táº¥t cáº£ cĂ¡c Tenant (Onboard, Suspend, Offboard).
- **Operational Observability**: Dashboard giĂ¡m sĂ¡t sá»©c khá»e há»‡ thá»‘ng (Health Check), xem log lá»—i táº­p trung vĂ  theo dĂµi hiá»‡u nÄƒng (APM).
- **Feature Flags**: Quáº£n lĂ½ báº­t/táº¯t tĂ­nh nÄƒng má»›i theo tá»«ng nhĂ³m ngÆ°á»i dĂ¹ng (A/B Testing) mĂ  khĂ´ng cáº§n redeploy. 
Xem chi tiáº¿t táº¡i: [[14 - System Administration]]
# 15. Help Center & Knowledge Base
Há»‡ thá»‘ng tá»± phá»¥c vá»¥ (Self-service) giĂºp giáº£m táº£i cho bá»™ pháº­n há»— trá»£ ká»¹ thuáº­t.
- **Contextual Help**: NhĂºng tĂ i liá»‡u hÆ°á»›ng dáº«n (Embedded Docs) ngay táº¡i nÆ¡i ngÆ°á»i dĂ¹ng gáº·p khĂ³ khÄƒn (Context-aware Widgets).
- **CMS for Documentation**: Há»‡ thá»‘ng quáº£n lĂ½ ná»™i dung bĂ i viáº¿t, FAQ, Release Notes vá»›i kháº£ nÄƒng tĂ¬m kiáº¿m ngá»¯ nghÄ©a (Semantic Search).
- **Feedback Loop**: Thu tháº­p Ä‘Ă¡nh giĂ¡ cá»§a ngÆ°á»i dĂ¹ng vá» Ä‘á»™ há»¯u Ă­ch cá»§a bĂ i viáº¿t Ä‘á»ƒ liĂªn tá»¥c cáº£i thiá»‡n cháº¥t lÆ°á»£ng tĂ i liá»‡u. 
Xem chi tiáº¿t táº¡i: [[15 - Help Center and Knowledge Base]]
# 16. User Onboarding & Adoption
Tá»‘i Æ°u hĂ³a tráº£i nghiá»‡m ngÆ°á»i dĂ¹ng má»›i vĂ  thĂºc Ä‘áº©y hĂ nh vi sá»­ dá»¥ng sáº£n pháº©m.
- **Interactive Walkthroughs**: CĂ¡c tour hÆ°á»›ng dáº«n tá»«ng bÆ°á»›c (Step-by-step Guides) phá»§ lĂªn giao diá»‡n á»©ng dá»¥ng Ä‘á»ƒ Ä‘Ă o táº¡o ngÆ°á»i dĂ¹ng (In-app Training).
- **Progress Tracking**: Theo dĂµi tiáº¿n Ä‘á»™ hoĂ n thĂ nh cĂ¡c bÆ°á»›c thiáº¿t láº­p há»“ sÆ¡ (Onboarding Checklist).
- **Feature Discovery**: Giá»›i thiá»‡u tĂ­nh nÄƒng má»›i thĂ´ng qua cĂ¡c thĂ´ng bĂ¡o Ä‘á»‹nh hÆ°á»›ng (Tooltips/Hotspots) dá»±a trĂªn hĂ nh vi ngÆ°á»i dĂ¹ng. 
Xem chi tiáº¿t táº¡i: [[16 - User Onboarding and Adoption]]
