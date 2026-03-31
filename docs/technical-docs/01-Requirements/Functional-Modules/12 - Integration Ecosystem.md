**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
***Last updated:** Dec 31, 2025*

---
# 1. Business Overview
Trong mĂ´i trÆ°á»ng phĂ¡t triá»ƒn hiá»‡n Ä‘áº¡i, khĂ´ng má»™t cĂ´ng cá»¥ nĂ o cĂ³ thá»ƒ lĂ m tá»‘t táº¥t cáº£ má»i viá»‡c. Má»™t Ä‘á»™i ngÅ© ká»¹ thuáº­t thÆ°á»ng sá»­ dá»¥ng káº¿t há»£p nhiá»u cĂ´ng cá»¥ chuyĂªn biá»‡t (Best-of-breed tools):
	**GitLab/GitHub** Ä‘á»ƒ quáº£n lĂ½ mĂ£ nguá»“n, 
	**Figma** Ä‘á»ƒ thiáº¿t káº¿, 
	**Slack/Discord** Ä‘á»ƒ giao tiáº¿p 
	**Google Calendar** Ä‘á»ƒ quáº£n lĂ½ lá»‹ch há»p.
PhĂ¢n há»‡ *Integration Ecosystem* Ä‘Æ°á»£c xĂ¢y dá»±ng Ä‘á»ƒ phĂ¡ vá»¡ cĂ¡c Data Silos nĂ y. Thay vĂ¬ báº¯t ngÆ°á»i dĂ¹ng pháº£i chuyá»ƒn Ä‘á»•i liĂªn tá»¥c giá»¯a cĂ¡c tab trĂ¬nh duyá»‡t, PronaFlow Ä‘Ă³ng vai trĂ² lĂ  Command Center, nÆ¡i dá»¯ liá»‡u tá»« pháº§n má»m xung quanh Ä‘Æ°á»£c Ä‘á»“ng bá»™ vĂ  hiá»ƒn thá»‹ táº­p trung.
Chiáº¿n lÆ°á»£c tĂ­ch há»£p cá»§a PronaFlow bao gá»“m 3 táº§ng:
1. **Core Connectors:** CĂ¡c tĂ­ch há»£p Ä‘Æ°á»£c xĂ¢y dá»±ng sáºµn (Native Built-in) bá»Ÿi Ä‘á»™i ngÅ© PronaFlow.
2. **Open API & Webhooks:** Cung cáº¥p cá»•ng giao tiáº¿p cho cĂ¡c nhĂ  phĂ¡t triá»ƒn bĂªn thá»© 3 tá»± xĂ¢y dá»±ng giáº£i phĂ¡p.
3. **Marketplace:** NÆ¡i cá»™ng Ä‘á»“ng chia sáº» cĂ¡c tiá»‡n Ă­ch má»Ÿ rá»™ng (Plugins/Add-ons).
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Public RESTful API
### User Story 12.1
LĂ  má»™t DevOps Engineer, TĂ´i muá»‘n viáº¿t má»™t script tá»± Ä‘á»™ng táº¡o Task trĂªn PronaFlow má»—i khi pipeline CI/CD bá»‹ lá»—i, Äá»ƒ Ä‘á»™i ngÅ© phĂ¡t triá»ƒn nháº­n biáº¿t vĂ  xá»­ lĂ½ ngay láº­p tá»©c mĂ  khĂ´ng cáº§n bĂ¡o cĂ¡o thá»§ cĂ´ng.
### Acceptance Criteria (#AC)
#### AC 1 - Standardized Endpoints
- Cung cáº¥p Ä‘áº§y Ä‘á»§ cĂ¡c endpoint CRUD cho cĂ¡c tĂ i nguyĂªn chĂ­nh: `/api/v1/projects`, `/api/v1/tasks`, `/api/v1/comments`.
- TuĂ¢n thá»§ chuáº©n REST: Sá»­ dá»¥ng Ä‘Ăºng HTTP Methods (GET, POST, PATCH, DELETE) vĂ  Status Codes (200, 201, 400, 401).
#### AC 2 - Interactive Documentation (Swagger UI)
- TĂ­ch há»£p **OpenAPI Specification (Swagger)**.
- Cho phĂ©p láº­p trĂ¬nh viĂªn "Try it out" (gá»i thá»­ API) ngay trĂªn trang tĂ i liá»‡u vá»›i tĂ i khoáº£n sandbox.
#### AC 3 - Authentication via Personal Access Token (PAT)
- NgÆ°á»i dĂ¹ng cĂ³ thá»ƒ táº¡o, Ä‘áº·t tĂªn vĂ  thu há»“i cĂ¡c PAT trong pháº§n cĂ i Ä‘áº·t cĂ¡ nhĂ¢n.
- PAT pháº£i cĂ³ pháº¡m vi quyá»n háº¡n (Scopes) rĂµ rĂ ng (vĂ­ dá»¥: chá»‰ cĂ³ quyá»n `read:tasks`, khĂ´ng cĂ³ quyá»n `delete:projects`).
## 2.2. Feature: Outbound Webhooks
### User Story 12.2
LĂ  má»™t Quáº£n trá»‹ viĂªn há»‡ thá»‘ng, TĂ´i muá»‘n PronaFlow gá»­i má»™t thĂ´ng bĂ¡o HTTP POST Ä‘áº¿n server ná»™i bá»™ cá»§a cĂ´ng ty má»—i khi má»™t Task chuyá»ƒn sang tráº¡ng thĂ¡i "Done", Äá»ƒ kĂ­ch hoáº¡t quy trĂ¬nh thanh toĂ¡n tá»± Ä‘á»™ng cho Freelancer.
### Acceptance Criteria (#AC)
#### AC 1 - Event Triggers
- Há»— trá»£ Ä‘Äƒng kĂ½ nháº­n sá»± kiá»‡n cho cĂ¡c hĂ nh Ä‘á»™ng: `task.created`, `task.status_changed`, `comment.created`.
- Cho phĂ©p ngÆ°á»i dĂ¹ng cáº¥u hĂ¬nh Payload URL vĂ  Secret Key (Ä‘á»ƒ kĂ½ xĂ¡c thá»±c HMAC).
#### AC 2 - Delivery Reliability (Äá»™ tin cáº­y chuyá»ƒn phĂ¡t)
- **Retry Mechanism:** Náº¿u server Ä‘Ă­ch tráº£ vá» lá»—i (5xx) hoáº·c Timeout, há»‡ thá»‘ng tá»± Ä‘á»™ng thá»­ láº¡i (Exponential Backoff) tá»‘i Ä‘a 5 láº§n trÆ°á»›c khi bĂ¡o lá»—i.
- **Log History:** LÆ°u lá»‹ch sá»­ cĂ¡c láº§n gá»­i Webhook (Request Header, Body, Response) Ä‘á»ƒ ngÆ°á»i dĂ¹ng debug.
## 2.3. Feature: Native Connectors (Äáº§u ná»‘i dá»±ng sáºµn)
### User Story 12.3
LĂ  má»™t Project Manager, TĂ´i muá»‘n Ä‘á»“ng bá»™ ngĂ y háº¡n (Due Date) cá»§a cĂ¡c Task trong PronaFlow vĂ o Google Calendar cá»§a tĂ´i, Äá»ƒ tĂ´i khĂ´ng bá»‹ lá»¡ lá»‹ch trĂ¬nh khi Ä‘ang xem lá»‹ch trĂªn Ä‘iá»‡n thoáº¡i.
### Acceptance Criteria (#AC)
#### AC 1 - OAuth2 Authorization Flow
- NgÆ°á»i dĂ¹ng chá»‰ cáº§n click "Connect Google Calendar" -> Chuyá»ƒn hÆ°á»›ng sang trang Ä‘Äƒng nháº­p Google -> Cáº¥p quyá»n -> Quay láº¡i PronaFlow. Tuyá»‡t Ä‘á»‘i khĂ´ng yĂªu cáº§u ngÆ°á»i dĂ¹ng nháº­p Password Google.
#### AC 2 - Bi-directional Sync (Äá»“ng bá»™ 2 chiá»u) - _Advanced_
- **PronaFlow -> Calendar:** Khi táº¡o Task cĂ³ Due Date, tá»± Ä‘á»™ng táº¡o Event trĂªn Calendar.
- **Calendar -> PronaFlow:** Khi dá»i lá»‹ch Event trĂªn Calendar, tá»± Ä‘á»™ng cáº­p nháº­t Due Date cá»§a Task tÆ°Æ¡ng á»©ng.
### User Story 12.4
LĂ  má»™t Developer, TĂ´i muá»‘n khi tĂ´i commit code lĂªn GitHub vá»›i message "Fix #123", Task sá»‘ #123 trĂªn PronaFlow tá»± Ä‘á»™ng chuyá»ƒn tráº¡ng thĂ¡i sang "In Review" vĂ  Ä‘Ă­nh kĂ¨m link commit vĂ o pháº§n comment.
### Acceptance Criteria (#AC)
#### AC 1 - Commit Linking
- Há»‡ thá»‘ng láº¯ng nghe Webhook tá»« GitHub.
- Regex parse commit message Ä‘á»ƒ tĂ¬m Pattern `#{TaskID}`.
#### AC 2 - Smart Transition
- Tá»± Ä‘á»™ng thá»±c hiá»‡n chuyá»ƒn tráº¡ng thĂ¡i (State Transition) dá»±a trĂªn tá»« khĂ³a (Fix, Close, Resolve -> Done/In Review).
## 2.4. Feature: Plugin Architecture (Kiáº¿n trĂºc Plugin)
### User Story 12.5
LĂ  má»™t Äá»‘i tĂ¡c phĂ¡t triá»ƒn, TĂ´i muá»‘n xĂ¢y dá»±ng má»™t Plugin hiá»ƒn thá»‹ báº£n Ä‘á»“ Ä‘á»‹a lĂ½ (GIS Map) ngay trong giao diá»‡n Task cá»§a PronaFlow, Äá»ƒ phá»¥c vá»¥ cĂ¡c khĂ¡ch hĂ ng trong lÄ©nh vá»±c Logistics.
### Acceptance Criteria (#AC)
#### AC 1 - Manifest File
- Má»—i Plugin Ä‘Æ°á»£c Ä‘á»‹nh nghÄ©a bá»Ÿi file `manifest.json` chá»©a metadata: TĂªn, PhiĂªn báº£n, Quyá»n truy cáº­p cáº§n thiáº¿t, Äiá»ƒm neo giao diá»‡n (UI Anchor Points - vĂ­ dá»¥: `task_detail_sidebar`, `project_header`).
#### AC 2 - Sandboxed Execution
- Plugin cháº¡y trong mĂ´i trÆ°á»ng cĂ´ láº­p (Iframe hoáº·c Web Worker) Ä‘á»ƒ Ä‘áº£m báº£o an toĂ n. Plugin khĂ´ng Ä‘Æ°á»£c phĂ©p truy cáº­p trá»±c tiáº¿p vĂ o LocalStorage hay Cookie cá»§a á»©ng dá»¥ng chĂ­nh.
- Giao tiáº¿p vá»›i PronaFlow Core thĂ´ng qua **SDK Bridge** (postMessage API).
# 3. Business Rules & Technical Constraints
## 3.1. Rate Limiting (Giá»›i háº¡n táº§n suáº¥t)
Äá»ƒ báº£o vá»‡ há»‡ thá»‘ng khá»i cĂ¡c cuá»™c táº¥n cĂ´ng DDoS hoáº·c lá»—i code tá»« bĂªn thá»© 3 (Infinite Loop):
- **Quy táº¯c:** Giá»›i háº¡n má»—i User/Token chá»‰ Ä‘Æ°á»£c gá»i tá»‘i Ä‘a **1000 requests/phĂºt** (Ä‘á»‘i vá»›i gĂ³i Pro) vĂ  **60 requests/phĂºt** (Ä‘á»‘i vá»›i gĂ³i Free).
- **Pháº£n há»“i:** Tráº£ vá» HTTP 429 (Too Many Requests) kĂ¨m header `Retry-After` khi vÆ°á»£t quĂ¡ giá»›i háº¡n.
## 3.2. Data Security & Consent
- **Quy táº¯c:** KhĂ´ng bao giá» chia sáº» dá»¯ liá»‡u ngÆ°á»i dĂ¹ng cho bĂªn thá»© 3 náº¿u khĂ´ng cĂ³ sá»± Ä‘á»“ng Ă½ rĂµ rĂ ng (Explicit Consent) thĂ´ng qua mĂ n hĂ¬nh cáº¥p quyá»n OAuth.
- **Revocation:** NgÆ°á»i dĂ¹ng cĂ³ quyá»n thu há»“i quyá»n truy cáº­p (Revoke Access) cá»§a báº¥t ká»³ á»©ng dá»¥ng nĂ o báº¥t ká»³ lĂºc nĂ o táº¡i trang "Connected Apps".
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. API Economy (Ná»n kinh táº¿ API)
PronaFlow khĂ´ng chá»‰ bĂ¡n pháº§n má»m, mĂ  bĂ¡n kháº£ nÄƒng káº¿t ná»‘i. Viá»‡c má»Ÿ API giĂºp PronaFlow trá»Ÿ thĂ nh má»™t Platform, táº­n dá»¥ng sá»©c sĂ¡ng táº¡o cá»§a cá»™ng Ä‘á»“ng Ä‘á»ƒ láº¥p Ä‘áº§y nhá»¯ng tĂ­nh nÄƒng ngĂ¡ch (Niche Features) mĂ  Ä‘á»™i ngÅ© core team khĂ´ng Ä‘á»§ nguá»“n lá»±c Ä‘á»ƒ lĂ m (vĂ­ dá»¥: TĂ­ch há»£p vá»›i pháº§n má»m káº¿ toĂ¡n Ä‘á»‹a phÆ°Æ¡ng).
## 4.2. Loose Coupling (LiĂªn káº¿t lá»ng)
Kiáº¿n trĂºc tĂ­ch há»£p qua Webhooks vĂ  API Ä‘áº£m báº£o nguyĂªn táº¯c **Loose Coupling**.
- Náº¿u GitHub thay Ä‘á»•i giao diá»‡n, tĂ­ch há»£p cá»§a PronaFlow khĂ´ng bá»‹ áº£nh hÆ°á»Ÿng miá»…n lĂ  GitHub API khĂ´ng Ä‘á»•i.
- Há»‡ thá»‘ng PronaFlow váº«n hoáº¡t Ä‘á»™ng bĂ¬nh thÆ°á»ng ngay cáº£ khi dá»‹ch vá»¥ bĂªn thá»© 3 (nhÆ° Slack) bá»‹ sáº­p.
## 4.3. Event-Driven Architecture (EDA)
Webhooks lĂ  hiá»‡n thĂ¢n cá»§a EDA. Thay vĂ¬ báº¯t bĂªn thá»© 3 pháº£i liĂªn tá»¥c há»i "CĂ³ gĂ¬ má»›i khĂ´ng?" (Polling) gĂ¢y lĂ£ng phĂ­ tĂ i nguyĂªn, PronaFlow chá»§ Ä‘á»™ng thĂ´ng bĂ¡o "CĂ³ cĂ¡i nĂ y má»›i!" (Push). Äiá»u nĂ y giĂºp giáº£m Ä‘á»™ trá»… thĂ´ng tin xuá»‘ng gáº§n nhÆ° báº±ng 0 (Real-time).



