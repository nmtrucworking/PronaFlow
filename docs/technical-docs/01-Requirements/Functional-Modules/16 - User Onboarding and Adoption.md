**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
***Last updated:** Dec 31, 2025*

---
# 1. Business Overview
Trong mĂ´ hĂ¬nh Product-Led Growth (PLG), sáº£n pháº©m pháº£i tá»± bĂ¡n chĂ­nh nĂ³. Tuy nhiĂªn, vá»›i má»™t há»‡ thá»‘ng phá»©c táº¡p nhÆ° PronaFlow (quáº£n lĂ½ dá»± Ă¡n káº¿t há»£p AI), ngÆ°á»i dĂ¹ng má»›i thÆ°á»ng bá»‹ choĂ¡ng ngá»£p (Overwhelmed) bá»Ÿi quĂ¡ nhiá»u tĂ­nh nÄƒng. Náº¿u khĂ´ng cĂ³ quy trĂ¬nh dáº«n nháº­p tá»‘t, tá»· lá»‡ rá»›t (Drop-off rate) sau láº§n Ä‘Äƒng nháº­p Ä‘áº§u tiĂªn sáº½ ráº¥t cao.
PhĂ¢n há»‡ **User Onboarding & Adoption** Ä‘Æ°á»£c thiáº¿t káº¿ Ä‘á»ƒ giáº£i quyáº¿t bĂ i toĂ¡n "Time-to-Value" (Thá»i gian Ä‘á»ƒ nháº­n Ä‘Æ°á»£c giĂ¡ trá»‹). Má»¥c tiĂªu lĂ  rĂºt ngáº¯n khoáº£ng cĂ¡ch tá»« khi ngÆ°á»i dĂ¹ng Ä‘Äƒng kĂ½ Ä‘áº¿n khi há» tráº£i nghiá»‡m Ä‘Æ°á»£c khoáº£nh kháº¯c "Aha!" (Aha Moment) Ä‘áº§u tiĂªn (vĂ­ dá»¥: táº¡o thĂ nh cĂ´ng má»™t dá»± Ă¡n vĂ  tháº¥y AI gá»£i Ă½ nhĂ¢n sá»±).
CĂ¡ch tiáº¿p cáº­n cá»§a PronaFlow lĂ  **"Learning by Doing"** (Há»c Ä‘i Ä‘Ă´i vá»›i hĂ nh), thay vĂ¬ báº¯t ngÆ°á»i dĂ¹ng xem háº¿t video hÆ°á»›ng dáº«n rá»“i má»›i lĂ m.
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Role-Based Onboarding Flow (Luá»“ng Dáº«n nháº­p theo Vai trĂ²)
### User Story 16.1
LĂ  má»™t NgÆ°á»i dĂ¹ng má»›i Ä‘Äƒng kĂ½, TĂ´i muá»‘n há»‡ thá»‘ng há»i vá» vai trĂ² vĂ  má»¥c tiĂªu cá»§a tĂ´i (vĂ­ dá»¥: "TĂ´i lĂ  PM muá»‘n quáº£n lĂ½ team 10 ngÆ°á»i"), Äá»ƒ giao diá»‡n vĂ  hÆ°á»›ng dáº«n Ä‘Æ°á»£c tĂ¹y chá»‰nh phĂ¹ há»£p ngay tá»« Ä‘áº§u.
### Acceptance Criteria ( #AC)
#### AC 1 - Welcome Survey
- Ngay sau khi Ä‘Äƒng kĂ½, hiá»ƒn thá»‹ mĂ n hĂ¬nh chĂ o má»«ng (Welcome Screen) vá»›i 2-3 cĂ¢u há»i tráº¯c nghiá»‡m:
 - _Role:_ Project Manager / Developer / Stakeholder.
 - _Goal:_ Quáº£n lĂ½ Task / Theo dĂµi tiáº¿n Ä‘á»™ / BĂ¡o cĂ¡o.
 - _Experience:_ ÄĂ£ dĂ¹ng Jira/Trello chÆ°a?
#### AC 2 - Persona Mapping
- Há»‡ thá»‘ng lÆ°u cĂ¢u tráº£ lá»i vĂ o `User Profile` vĂ  tá»± Ä‘á»™ng cáº¥u hĂ¬nh:
 - **Developer:** áº¨n cĂ¡c menu Billing/Settings, highlight tĂ­nh nÄƒng "My Tasks" vĂ  "Git Integration".
 - **Manager:** Highlight tĂ­nh nÄƒng "Create Project" vĂ  "Dashboard Reports".
## 2.2. Feature: Interactive Product Tour (Tour Sáº£n pháº©m TÆ°Æ¡ng tĂ¡c)
### User Story 16.2
LĂ  má»™t NgÆ°á»i dĂ¹ng láº§n Ä‘áº§u vĂ o mĂ n hĂ¬nh Kanban, TĂ´i muá»‘n cĂ³ má»™t hÆ°á»›ng dáº«n tá»«ng bÆ°á»›c chá»‰ cho tĂ´i cĂ¡ch táº¡o cá»™t vĂ  kĂ©o tháº£ tháº», Äá»ƒ tĂ´i náº¯m báº¯t cĂ¡ch sá»­ dá»¥ng cÆ¡ báº£n mĂ  khĂ´ng cáº§n mĂ² máº«m.
### Acceptance Criteria ( #AC)
#### AC 1 - Highlight & Overlay
- Sá»­ dá»¥ng thÆ° viá»‡n (nhÆ° `React Joyride` hoáº·c `Driver.js`) Ä‘á»ƒ lĂ m tá»‘i mĂ n hĂ¬nh ná»n vĂ  lĂ m ná»•i báº­t (Highlight) pháº§n tá»­ UI cáº§n thao tĂ¡c.
- Hiá»ƒn thá»‹ Tooltip hÆ°á»›ng dáº«n: "Nháº¥n vĂ o Ä‘Ă¢y Ä‘á»ƒ thĂªm Task má»›i".
#### AC 2 - Interaction Requirement
- Tour khĂ´ng chá»‰ lĂ  Slide tÄ©nh. NgÆ°á»i dĂ¹ng **pháº£i thá»±c hiá»‡n hĂ nh Ä‘á»™ng** (Click nĂºt, Nháº­p text) thĂ¬ má»›i chuyá»ƒn sang bÆ°á»›c tiáº¿p theo.
- CĂ³ nĂºt "Skip Tour" cho ngÆ°á»i dĂ¹ng Ä‘Ă£ thĂ nh tháº¡o.
## 2.3. Feature: Onboarding Checklist (Danh sĂ¡ch Kiá»ƒm tra Dáº«n nháº­p)
### User Story 16.3
LĂ  má»™t NgÆ°á»i dĂ¹ng má»›i, TĂ´i muá»‘n nhĂ¬n tháº¥y má»™t thanh tiáº¿n Ä‘á»™ hiá»ƒn thá»‹ cĂ¡c bÆ°á»›c cáº§n hoĂ n thĂ nh Ä‘á»ƒ thiáº¿t láº­p tĂ i khoáº£n (vĂ­ dá»¥: Upload Avatar, Táº¡o dá»± Ă¡n Ä‘áº§u tiĂªn), Äá»ƒ tĂ´i cĂ³ Ä‘á»™ng lá»±c hoĂ n táº¥t há»“ sÆ¡.
### Acceptance Criteria ( #AC)
#### AC 1 - Gamification Progress
- Widget "Getting Started" hiá»ƒn thá»‹ á»Ÿ gĂ³c dÆ°á»›i mĂ n hĂ¬nh hoáº·c Dashboard.
- Danh sĂ¡ch nhiá»‡m vá»¥:
 1. Táº¡o Workspace (Done).
 2. Má»i 1 thĂ nh viĂªn (Pending).
 3. Táº¡o 1 Task (Pending).
- Thanh tiáº¿n Ä‘á»™ tÄƒng dáº§n (33% -> 66% -> 100%).
#### AC 2 - Reward (Pháº§n thÆ°á»Ÿng)
- Khi hoĂ n thĂ nh 100% Checklist, há»‡ thá»‘ng hiá»ƒn thá»‹ hiá»‡u á»©ng chĂºc má»«ng (Confetti) vĂ  táº·ng má»™t pháº§n thÆ°á»Ÿng nhá» (vĂ­ dá»¥: +7 ngĂ y dĂ¹ng thá»­ báº£n Pro).
## 2.4. Feature: Contextual Feature Discovery (KhĂ¡m phĂ¡ TĂ­nh nÄƒng Ngá»¯ cáº£nh)
### User Story 16.4
LĂ  má»™t NgÆ°á»i dĂ¹ng cÅ©, khi há»‡ thá»‘ng cáº­p nháº­t tĂ­nh nÄƒng má»›i "AI Prediction", TĂ´i muá»‘n nhĂ¬n tháº¥y má»™t cháº¥m xanh (Beacon) thu hĂºt sá»± chĂº Ă½ táº¡i nĂºt Ä‘Ă³, Äá»ƒ tĂ´i biáº¿t vĂ  thá»­ nghiá»‡m tĂ­nh nÄƒng má»›i.
### Acceptance Criteria ( #AC)
#### AC 1 - Hotspots (Äiá»ƒm nĂ³ng)
- Hiá»ƒn thá»‹ má»™t cháº¥m trĂ²n nháº¥p nhĂ¡y (Pulsing Dot) cáº¡nh UI element má»›i.
- Khi Hover chuá»™t vĂ o, má»Ÿ ra Tooltip giáº£i thĂ­ch ngáº¯n gá»n: "Má»›i! Báº¥m vĂ o Ä‘Ă¢y Ä‘á»ƒ AI dá»± Ä‘oĂ¡n thá»i gian lĂ m viá»‡c".
#### AC 2 - Dismissal Logic
- Náº¿u ngÆ°á»i dĂ¹ng Ä‘Ă£ click vĂ o tĂ­nh nÄƒng Ä‘Ă³ 1 láº§n, Hotspot pháº£i tá»± Ä‘á»™ng biáº¿n máº¥t vÄ©nh viá»…n (One-time Discovery).
# 3. Business Rules & Technical Constraints
## 3.1. Quy táº¯c "KhĂ´ng lĂ m phiá»n" (Anti-Annoyance Rule)
- **Frequency Cap:** KhĂ´ng hiá»ƒn thá»‹ quĂ¡ 1 Product Tour trong má»™t phiĂªn lĂ m viá»‡c.
- **Persistence:** Tráº¡ng thĂ¡i cá»§a Onboarding (Step hiá»‡n táº¡i, Ä‘Ă£ hoĂ n thĂ nh hay chÆ°a) pháº£i Ä‘Æ°á»£c lÆ°u trong Database (báº£ng `user_onboarding_status`), khĂ´ng chá»‰ lÆ°u á»Ÿ LocalStorage. Äiá»u nĂ y Ä‘áº£m báº£o náº¿u user Ä‘á»•i mĂ¡y tĂ­nh, há» khĂ´ng bá»‹ báº¯t lĂ m láº¡i tá»« Ä‘áº§u.
## 3.2. Quy táº¯c Bá» qua (Skip Logic)
- LuĂ´n luĂ´n cung cáº¥p tĂ¹y chá»n "Skip" hoáº·c nĂºt "X" rĂµ rĂ ng trĂªn má»i mĂ n hĂ¬nh hÆ°á»›ng dáº«n. KhĂ´ng bao giá» Ă©p buá»™c ngÆ°á»i dĂ¹ng Ä‘i háº¿t flow náº¿u há» khĂ´ng muá»‘n (trá»« cĂ¡c bÆ°á»›c setup báº¯t buá»™c vá» ká»¹ thuáº­t).
## 3.3. Hiá»‡u nÄƒng UI
- CĂ¡c thÆ° viá»‡n hÆ°á»›ng dáº«n (Joyride/Driver) chá»‰ Ä‘Æ°á»£c táº£i (Lazy Load) khi cáº§n thiáº¿t, khĂ´ng Ä‘Æ°á»£c lĂ m cháº­m thá»i gian táº£i trang chĂ­nh (Main Bundle Size).
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. Hiá»‡u á»©ng Zeigarnik (The Zeigarnik Effect)
Ăp dá»¥ng vĂ o **Onboarding Checklist**:
- TĂ¢m lĂ½ há»c chá»©ng minh con ngÆ°á»i thÆ°á»ng nhá»› vĂ  day dá»©t vá» cĂ¡c nhiá»‡m vá»¥ chÆ°a hoĂ n thĂ nh hÆ¡n lĂ  cĂ¡c nhiá»‡m vá»¥ Ä‘Ă£ xong.
- Viá»‡c hiá»ƒn thá»‹ thanh tiáº¿n Ä‘á»™ "2/5 bÆ°á»›c hoĂ n thĂ nh" thĂºc Ä‘áº©y ngÆ°á»i dĂ¹ng thá»±c hiá»‡n ná»‘t 3 bÆ°á»›c cĂ²n láº¡i Ä‘á»ƒ Ä‘áº¡t tráº¡ng thĂ¡i trá»n váº¹n (Closure).
## 4.2. VĂ¹ng phĂ¡t triá»ƒn gáº§n (Zone of Proximal Development - Vygotsky)
Ăp dá»¥ng vĂ o **Interactive Tour**:
- KhĂ¡i niá»‡m "Scaffolding" (GiĂ n giĂ¡o): Há»‡ thá»‘ng cung cáº¥p sá»± há»— trá»£ vá»«a Ä‘á»§ (Highlight, Tooltip) Ä‘á»ƒ ngÆ°á»i dĂ¹ng thá»±c hiá»‡n Ä‘Æ°á»£c tĂ¡c vá»¥ khĂ³ mĂ  bĂ¬nh thÆ°á»ng há» khĂ´ng tá»± lĂ m Ä‘Æ°á»£c. Khi ngÆ°á»i dĂ¹ng Ä‘Ă£ quen, "giĂ n giĂ¡o" nĂ y sáº½ Ä‘Æ°á»£c thĂ¡o bá».
## 4.3. MĂ´ hĂ¬nh Hook (Nir Eyal)
- **Trigger:** Email nháº¯c nhá»Ÿ hoáº·c Hotspot thĂ´ng bĂ¡o tĂ­nh nÄƒng má»›i.
- **Action:** NgÆ°á»i dĂ¹ng click vĂ o dĂ¹ng thá»­.
- **Variable Reward:** NgÆ°á»i dĂ¹ng tháº¥y AI dá»± Ä‘oĂ¡n Ä‘Ăºng (Aha Moment).
- **Investment:** NgÆ°á»i dĂ¹ng nháº­p thĂªm dá»¯ liá»‡u vĂ o há»‡ thá»‘ng, lĂ m tÄƒng kháº£ nÄƒng quay láº¡i láº§n sau.

