**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
_Last updated: Dec 31, 2025_

---
# 1. Business Overview

Trong ká»· nguyĂªn pháº§n má»m hiá»‡n Ä‘áº¡i, "One size fits all" (Má»™t giao diá»‡n cho táº¥t cáº£) khĂ´ng cĂ²n lĂ  cĂ¡ch tiáº¿p cáº­n phĂ¹ há»£p. Má»—i ngÆ°á»i dĂ¹ng cĂ³ thĂ³i quen lĂ m viá»‡c (Mental Model), Ä‘iá»u kiá»‡n mĂ´i trÆ°á»ng (Context) vĂ  giá»›i háº¡n thá»ƒ cháº¥t khĂ¡c nhau.
Module **User Experience Personalization** cá»§a PronaFlow khĂ´ng Ä‘Æ¡n thuáº§n lĂ  viá»‡c thay Ä‘á»•i mĂ u sáº¯c trang trĂ­. Má»¥c tiĂªu cá»‘t lĂµi cá»§a nĂ³ lĂ  **Tá»‘i Æ°u hĂ³a Hiá»‡u suáº¥t CĂ¡ nhĂ¢n** thĂ´ng qua viá»‡c:
1. **Giáº£m táº£i Nháº­n thá»©c (Cognitive Load Reduction):** Cho phĂ©p ngÆ°á»i dĂ¹ng áº©n bá»›t cĂ¡c tĂ­nh nÄƒng/thĂ´ng tin khĂ´ng cáº§n thiáº¿t, giĂºp há» táº­p trung vĂ o tĂ¡c vá»¥ chĂ­nh.
2. **TÄƒng kháº£ nÄƒng Tiáº¿p cáº­n (Accessibility):** Há»— trá»£ ngÆ°á»i dĂ¹ng cĂ³ thá»‹ lá»±c kĂ©m hoáº·c lĂ m viá»‡c trong mĂ´i trÆ°á»ng thiáº¿u sĂ¡ng.
3. **Báº£n Ä‘á»‹a hĂ³a (Localization):** XĂ³a bá» rĂ o cáº£n ngĂ´n ngá»¯ vĂ  vÄƒn hĂ³a (Äá»‹nh dáº¡ng ngĂ y thĂ¡ng, tiá»n tá»‡).
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Internationalization (i18n) & Localization (l10n)
### User Story 9.1
LĂ  má»™t NgÆ°á»i dĂ¹ng Ä‘a quá»‘c gia, TĂ´i muá»‘n há»‡ thá»‘ng hiá»ƒn thá»‹ ngĂ´n ngá»¯ vĂ  Ä‘á»‹nh dáº¡ng ngĂ y thĂ¡ng quen thuá»™c vá»›i vÄƒn hĂ³a cá»§a tĂ´i, Äá»ƒ tĂ´i cĂ³ thá»ƒ hiá»ƒu vĂ  xá»­ lĂ½ thĂ´ng tin chĂ­nh xĂ¡c mĂ  khĂ´ng cáº§n "dá»‹ch" trong Ä‘áº§u.
### Acceptance Criteria ( #AC)
#### AC 1 - Language Switching (Chuyá»ƒn Ä‘á»•i ngĂ´n ngá»¯)
- **Support:** Há»— trá»£ tá»‘i thiá»ƒu 2 ngĂ´n ngá»¯: Tiáº¿ng Anh (en-US) vĂ  Tiáº¿ng Viá»‡t (vi-VN).
- **Mechanism:** Viá»‡c chuyá»ƒn Ä‘á»•i ngĂ´n ngá»¯ diá»…n ra tá»©c thĂ¬ (Hot-swap) mĂ  khĂ´ng yĂªu cáº§u táº£i láº¡i trang (F5), nhá» vĂ o thÆ° viá»‡n `i18next`.
- **Fallback:** Náº¿u má»™t tá»« khĂ³a chÆ°a Ä‘Æ°á»£c dá»‹ch sang Tiáº¿ng Viá»‡t, há»‡ thá»‘ng tá»± Ä‘á»™ng hiá»ƒn thá»‹ Tiáº¿ng Anh thay vĂ¬ mĂ£ lá»—i.
#### AC 2 - Format Localization (Äá»‹nh dáº¡ng cá»¥c bá»™)
- **Date/Time:**
    - VN: `DD/MM/YYYY` (28/12/2025).
    - US: `MM/DD/YYYY` (12/28/2025).
- **Number/Currency:**
    - VN: `1.000.000 â‚«` (Dáº¥u cháº¥m phĂ¢n cĂ¡ch hĂ ng nghĂ¬n).
    - US: `1,000,000 $` (Dáº¥u pháº©y phĂ¢n cĂ¡ch hĂ ng nghĂ¬n).
## 2.2. Feature: Theme & Appearance (Giao diá»‡n & Hiá»ƒn thá»‹)
### User Story 9.2
LĂ  má»™t Láº­p trĂ¬nh viĂªn thÆ°á»ng lĂ m viá»‡c vĂ o ban Ä‘Ăªm, TĂ´i muá»‘n chuyá»ƒn giao diá»‡n sang cháº¿ Ä‘á»™ tá»‘i (Dark Mode), Äá»ƒ giáº£m má»i máº¯t (Eye Strain) vĂ  tiáº¿t kiá»‡m pin thiáº¿t bá»‹.
### Acceptance Criteria (#AC)
#### AC 1 - Theme Modes
- Há»— trá»£ 3 cháº¿ Ä‘á»™:
    1. **Light:** Giao diá»‡n sĂ¡ng máº·c Ä‘á»‹nh.
    2. **Dark:** Giao diá»‡n tá»‘i (MĂ u ná»n `#121212`, Text tráº¯ng).
    3. **System Sync:** Tá»± Ä‘á»™ng chuyá»ƒn Ä‘á»•i dá»±a trĂªn cĂ i Ä‘áº·t cá»§a Há»‡ Ä‘iá»u hĂ nh (OS Settings).
#### AC 2 - Contrast Ratio (Tá»· lá»‡ tÆ°Æ¡ng pháº£n)
- TuĂ¢n thá»§ tiĂªu chuáº©n **WCAG 2.1 Level AA**: Äáº£m báº£o tá»· lá»‡ tÆ°Æ¡ng pháº£n giá»¯a vÄƒn báº£n vĂ  ná»n tá»‘i thiá»ƒu lĂ  **4.5:1** cho vÄƒn báº£n thÆ°á»ng, giĂºp ná»™i dung luĂ´n dá»… Ä‘á»c á»Ÿ má»i cháº¿ Ä‘á»™.
## 2.3. Feature: Customizable Dashboard (Báº£ng Ä‘iá»u khiá»ƒn TĂ¹y biáº¿n)
### User Story 9.3
LĂ  má»™t Project Manager, TĂ´i muá»‘n sáº¯p xáº¿p cĂ¡c Widget trĂªn mĂ n hĂ¬nh chĂ­nh theo thá»© tá»± Æ°u tiĂªn cá»§a riĂªng mĂ¬nh, Äá»ƒ tĂ´i cĂ³ thá»ƒ nhĂ¬n tháº¥y cĂ¡c chá»‰ sá»‘ quan trá»ng (KPIs) ngay khi Ä‘Äƒng nháº­p.
### Acceptance Criteria ( #AC)
#### AC 1 - Widget Library
- Cung cáº¥p kho Widget (My Tasks, Project Progress, Calendar, Recent Activities).
- NgÆ°á»i dĂ¹ng cĂ³ thá»ƒ: ThĂªm má»›i, XĂ³a bá» (Hide), hoáº·c Thay Ä‘á»•i kĂ­ch thÆ°á»›c (Resize) cĂ¡c Widget.
#### AC 2 - Drag & Drop Layout
- Cho phĂ©p kĂ©o tháº£ Ä‘á»ƒ sáº¯p xáº¿p láº¡i vá»‹ trĂ­ cĂ¡c Widget (sá»­ dá»¥ng lÆ°á»›i Grid Layout).
- **Persistence:** Cáº¥u hĂ¬nh bá»‘ cá»¥c (`layout_config`) pháº£i Ä‘Æ°á»£c lÆ°u vĂ o Database. Khi ngÆ°á»i dĂ¹ng Ä‘Äƒng nháº­p trĂªn thiáº¿t bá»‹ khĂ¡c, bá»‘ cá»¥c nĂ y Ä‘Æ°á»£c Ä‘á»“ng bá»™ vá».
## 2.4. Feature: Workspace Layout Optimization (Tá»‘i Æ°u hĂ³a Bá»‘ cá»¥c)

### User Story 9.4

LĂ  má»™t Power User cáº§n khĂ´ng gian rá»™ng Ä‘á»ƒ xem biá»ƒu Ä‘á»“ Gantt hoáº·c báº£ng Kanban lá»›n, TĂ´i muá»‘n thu gá»n thanh Ä‘iá»u hÆ°á»›ng (Sidebar) hoáº·c cĂ¡c panel phá»¥, Äá»ƒ tá»‘i Ä‘a hĂ³a diá»‡n tĂ­ch lĂ m viá»‡c (Screen Real Estate).
### Acceptance Criteria ( #AC)
#### AC 1 - Collapsible Sidebar (Sidebar thu gá»n)
- **Interaction:** Cung cáº¥p nĂºt Toggle (`<<`) vĂ  phĂ­m táº¯t (VD: `Ctrl/Cmd + B`) Ä‘á»ƒ Ä‘Ă³ng/má»Ÿ Sidebar.
- **Mini-mode:** Khi thu gá»n, Sidebar hiá»ƒn thá»‹ dÆ°á»›i dáº¡ng icon-only (chá»‰ biá»ƒu tÆ°á»£ng), hiá»ƒn thá»‹ Tooltip khi hover Ä‘á»ƒ ngÆ°á»i dĂ¹ng váº«n Ä‘á»‹nh vá»‹ Ä‘Æ°á»£c chá»©c nÄƒng.
- **Response:** Ná»™i dung chĂ­nh (Main Content) pháº£i tá»± Ä‘á»™ng tĂ­nh toĂ¡n láº¡i chiá»u rá»™ng (Reflow) ngay láº­p tá»©c, khĂ´ng Ä‘á»ƒ láº¡i khoáº£ng tráº¯ng thá»«a.
#### AC 2 - Information Density (Máº­t Ä‘á»™ thĂ´ng tin)
- Cho phĂ©p ngÆ°á»i dĂ¹ng chá»n giá»¯a 2 cháº¿ Ä‘á»™ hiá»ƒn thá»‹ dá»¯ liá»‡u (Ă¡p dá»¥ng cho Task List vĂ  Table View).
    1. **Comfortable (Máº·c Ä‘á»‹nh):** Padding rá»™ng (12px-16px), phĂ¹ há»£p cho viá»‡c Ä‘á»c lÆ°á»›t vĂ  thao tĂ¡c cáº£m á»©ng.
    2. **Compact (Cháº­t chá»™i):** Padding háº¹p (4px-8px), giáº£m kĂ­ch thÆ°á»›c font chá»¯ tiĂªu Ä‘á».
    - _LĂ½ do:_ PhĂ¹ há»£p cho Data Analyst hoáº·c Manager cáº§n nhĂ¬n tháº¥y nhiá»u dĂ²ng dá»¯ liá»‡u nháº¥t cĂ³ thá»ƒ trĂªn má»™t mĂ n hĂ¬nh mĂ  khĂ´ng cáº§n cuá»™n trang.
## 2.5. Feature: Typographic Accessibility (TĂ¹y biáº¿n Typography)

### User Story 9.5

LĂ  má»™t ngÆ°á»i dĂ¹ng máº¯c chá»©ng khĂ³ Ä‘á»c (Dyslexia) hoáº·c suy giáº£m thá»‹ lá»±c tuá»•i giĂ  (Presbyopia), TĂ´i muá»‘n Ä‘iá»u chá»‰nh loáº¡i font vĂ  kĂ­ch cá»¡ chá»¯, Äá»ƒ tÄƒng kháº£ nÄƒng Ä‘á»c hiá»ƒu vÄƒn báº£n (Legibility).
### Acceptance Criteria ( #AC)
#### AC 1 - Global Font Size Scaling (Tá»· lá»‡ Font chá»¯)
- **Mechanism:** KhĂ´ng set cá»©ng `px` cho tá»«ng pháº§n tá»­. Sá»­ dá»¥ng Ä‘Æ¡n vá»‹ tÆ°Æ¡ng Ä‘á»‘i `rem` cho toĂ n bá»™ há»‡ thá»‘ng UI.
- **Setting:** NgÆ°á»i dĂ¹ng Ä‘iá»u chá»‰nh thanh trÆ°á»£t "Base Font Size":
    - Small (12px)
    - Medium (14px - Default standard)
    - Large (16px)
    - Extra Large (18px)
- **Impact:** ToĂ n bá»™ Button, Input, Text pháº£i scale tá»· lá»‡ thuáº­n theo Base Font Size nĂ y.
#### AC 2 - Font Family Customization
- Cung cáº¥p tĂ¹y chá»n thay Ä‘á»•i Font chá»¯ há»‡ thá»‘ng:
    1. **System Default:** San Francisco (Mac) / Segoe UI (Win) - Tá»‘i Æ°u tá»‘c Ä‘á»™ táº£i.
    2. **Dyslexic Friendly:** TĂ­ch há»£p font `OpenDyslexic` hoáº·c cĂ¡c font sans-serif cĂ³ Ä‘á»™ má»Ÿ (aperture) lá»›n, khoáº£ng cĂ¡ch kĂ½ tá»± rá»™ng Ä‘á»ƒ há»— trá»£ ngÆ°á»i máº¯c chá»©ng khĂ³ Ä‘á»c.
    3. **Monospace:** DĂ nh cho Developer muá»‘n giao diá»‡n giá»‘ng IDE code
## 2.6. Feature: Notification Granularity (Kiá»ƒm soĂ¡t Sá»± giĂ¡n Ä‘oáº¡n)
### User Story 9.6
LĂ  má»™t Láº­p trĂ¬nh viĂªn cáº§n sá»± táº­p trung cao Ä‘á»™ (Deep Work), TĂ´i muá»‘n tĂ¹y chá»‰nh chi tiáº¿t cĂ¡c loáº¡i thĂ´ng bĂ¡o vĂ  kĂªnh nháº­n tin, Äá»ƒ trĂ¡nh bá»‹ xao nhĂ£ng bá»Ÿi cĂ¡c luá»“ng thĂ´ng tin khĂ´ng kháº©n cáº¥p (Notification Fatigue).
### Acceptance Criteria ( #AC)
#### AC 1 - Multi-Channel Routing (Äá»‹nh tuyáº¿n Äa kĂªnh)
- **Matrix Configuration:** NgÆ°á»i dĂ¹ng cĂ³ thá»ƒ báº­t/táº¯t thĂ´ng bĂ¡o cho tá»«ng sá»± kiá»‡n cá»¥ thá»ƒ trĂªn 3 kĂªnh: **In-app**, **Email**, vĂ  **Browser Push**.
    - _VĂ­ dá»¥:_ "Khi tĂ´i Ä‘Æ°á»£c tag (@mention)" -> Báº­t cáº£ 3 kĂªnh.
    - _VĂ­ dá»¥:_ "Khi task chuyá»ƒn tráº¡ng thĂ¡i" -> Chá»‰ báº­t In-app, táº¯t Email.
#### AC 2 - Do Not Disturb Schedule (Lá»‹ch KhĂ´ng lĂ m phiá»n)
- **Automation:** Cho phĂ©p thiáº¿t láº­p khung giá» "Focus Time" (vĂ­ dá»¥: 08:00 - 10:00).
- **Behavior:** Trong khung giá» nĂ y, há»‡ thá»‘ng cháº·n (suppress) toĂ n bá»™ thĂ´ng bĂ¡o Push vĂ  Ă¢m thanh, chá»‰ lÆ°u vĂ o "Notification Center" Ä‘á»ƒ xem láº¡i sau.
- **Exception:** Cho phĂ©p thiáº¿t láº­p ngoáº¡i lá»‡ cho cĂ¡c thĂ´ng bĂ¡o "Urgent" hoáº·c tá»« "Project Manager".
## 2.7. Feature: Keyboard Shortcuts & Power Usage (PhĂ­m táº¯t & Thao tĂ¡c Nhanh)
### User Story 9.7
LĂ  má»™t Power User, TĂ´i muá»‘n thá»±c hiá»‡n cĂ¡c thao tĂ¡c thÆ°á»ng gáº·p (Táº¡o task, GĂ¡n ngÆ°á»i, TĂ¬m kiáº¿m) hoĂ n toĂ n báº±ng bĂ n phĂ­m, Äá»ƒ duy trĂ¬ dĂ²ng cháº£y cĂ´ng viá»‡c (Flow State) mĂ  khĂ´ng cáº§n nháº¥c tay khá»i bĂ n phĂ­m Ä‘á»ƒ dĂ¹ng chuá»™t.
### Acceptance Criteria ( #AC)
#### AC 1 - Global Shortcuts Map
- Há»— trá»£ phĂ­m táº¯t toĂ n cá»¥c:
    - `Cmd/Ctrl + K`: Má»Ÿ thanh Command Palette (TĂ¬m kiáº¿m nhanh chá»©c nÄƒng).
    - `C`: Má»Ÿ modal táº¡o Task má»›i (Create).
    - `?`: Hiá»ƒn thá»‹ báº£ng tra cá»©u phĂ­m táº¯t (Cheatsheet).
#### AC 2 - Contextual Navigation (Äiá»u hÆ°á»›ng Ngá»¯ cáº£nh)
- Trong giao diá»‡n Kanban/List:
    - Sá»­ dá»¥ng phĂ­m mÅ©i tĂªn hoáº·c `J/K` (Vim-style) Ä‘á»ƒ di chuyá»ƒn vĂ¹ng chá»n giá»¯a cĂ¡c Project/Task.
    - `Space`: Má»Ÿ xem chi tiáº¿t Project/Task Ä‘ang chá»n (Preview).
## 2.8. Feature: Color Vision Deficiency Support (Há»— trá»£ Khiáº¿m khuyáº¿t MĂ u sáº¯c)
### User Story 9.8
LĂ  má»™t ngÆ°á»i dĂ¹ng bá»‹ mĂ¹ mĂ u Ä‘á»-xanh (Deuteranopia), TĂ´i muá»‘n há»‡ thá»‘ng tá»± Ä‘á»™ng Ä‘iá»u chá»‰nh báº£ng mĂ u cá»§a cĂ¡c biá»ƒu Ä‘á»“ vĂ  tráº¡ng thĂ¡i, Äá»ƒ tĂ´i cĂ³ thá»ƒ phĂ¢n biá»‡t rĂµ rĂ ng giá»¯a "HoĂ n thĂ nh" (thÆ°á»ng lĂ  Xanh) vĂ  "Lá»—i/Trá»… háº¡n" (thÆ°á»ng lĂ  Äá»).
### Acceptance Criteria (#AC)
#### AC 1 - Daltonization Filters (Bá»™ lá»c Dalton)
- Cung cáº¥p tĂ¹y chá»n "Color Blindness Mode" trong cĂ i Ä‘áº·t Accessibility:
    1. **Deuteranopia/Protanopia (Red-Green):** Chuyá»ƒn mĂ£ mĂ u tráº¡ng thĂ¡i tá»« Xanh/Äá» sang Xanh lam/Cam nghá»‡.
    2. **Tritanopia (Blue-Yellow):** Äiá»u chá»‰nh sang tĂ´ng mĂ u Há»“ng/Xanh lÆ¡ (Cyan).
- **Chart Adaptation:** Tá»± Ä‘á»™ng thay tháº¿ viá»‡c chá»‰ dĂ¹ng mĂ u sáº¯c báº±ng viá»‡c káº¿t há»£p **MĂ u sáº¯c + Há»a tiáº¿t (Pattern)** (vĂ­ dá»¥: gáº¡ch chĂ©o, cháº¥m bi) trĂªn cĂ¡c biá»ƒu Ä‘á»“ trĂ²n/cá»™t.
# 3. Business Rules & Technical Constraints
## 3.1. Quy táº¯c LÆ°u trá»¯ Cáº¥u hĂ¬nh (Configuration Persistence)
Há»‡ thá»‘ng Ă¡p dá»¥ng cÆ¡ cháº¿ lÆ°u trá»¯ 2 lá»›p (Dual-Layer Persistence) Ä‘á»ƒ Ä‘áº£m báº£o tráº£i nghiá»‡m liá»n máº¡ch:
1. **Local Storage (Client-side):** LÆ°u cĂ i Ä‘áº·t `Theme` vĂ  `Language` Ä‘á»ƒ Ă¡p dá»¥ng ngay láº­p tá»©c khi á»©ng dá»¥ng vá»«a khá»Ÿi Ä‘á»™ng (trÆ°á»›c khi gá»i API). TrĂ¡nh hiá»‡n tÆ°á»£ng "Flash of Wrong Theme".
2. **Database (Server-side):** Äá»“ng bá»™ cĂ¡c cĂ i Ä‘áº·t nĂ y vĂ o `user_settings` table. GiĂºp duy trĂ¬ tráº£i nghiá»‡m Ä‘á»“ng nháº¥t khi ngÆ°á»i dĂ¹ng chuyá»ƒn Ä‘á»•i thiáº¿t bá»‹ (Roaming Profile).
## 3.2. Quy táº¯c Máº·c Ä‘á»‹nh (Default Behavior)
- Khi ngÆ°á»i dĂ¹ng truy cáº­p láº§n Ä‘áº§u (Guest/New User):
    - **NgĂ´n ngá»¯:** Tá»± Ä‘á»™ng phĂ¡t hiá»‡n dá»±a trĂªn `navigator.language` cá»§a trĂ¬nh duyá»‡t.
    - **Giao diá»‡n:** Tá»± Ä‘á»™ng phĂ¡t hiá»‡n dá»±a trĂªn `prefers-color-scheme` media query.
## 3.3. Quy táº¯c RĂ ng buá»™c UI (UI Constraints)
- **Minimum Viable Width:** DĂ¹ ngÆ°á»i dĂ¹ng phĂ³ng to cá»¡ chá»¯ Ä‘áº¿n Ä‘Ă¢u, há»‡ thá»‘ng pháº£i Ä‘áº£m báº£o cĂ¡c nĂºt báº¥m chá»©c nÄƒng quan trá»ng (Save, Cancel, Close) khĂ´ng bá»‹ Ä‘áº©y ra khá»i mĂ n hĂ¬nh (Overflow). Cáº§n sá»­ dá»¥ng `text-overflow: ellipsis` káº¿t há»£p Tooltip cho cĂ¡c Ä‘oáº¡n vÄƒn báº£n bá»‹ cáº¯t ngáº¯n.

## 3.4. Quy táº¯c Æ¯u tiĂªn Thiáº¿t láº­p (Configuration Precedence)
Khi cĂ³ xung Ä‘á»™t vá» cĂ i Ä‘áº·t hiá»ƒn thá»‹, há»‡ thá»‘ng Ă¡p dá»¥ng thá»© tá»± Æ°u tiĂªn sau (tá»« cao xuá»‘ng tháº¥p):
1. **User Preference:** CĂ i Ä‘áº·t cĂ¡ nhĂ¢n cá»§a ngÆ°á»i dĂ¹ng (trong module nĂ y).
2. **Workspace Policy:** CĂ i Ä‘áº·t báº¯t buá»™c do Admin quy Ä‘á»‹nh (vĂ­ dá»¥: báº¯t buá»™c báº­t 2FA, báº¯t buá»™c nháº­n email thĂ´ng bĂ¡o Deadline).
3. **System Default:** CĂ i Ä‘áº·t máº·c Ä‘á»‹nh cá»§a há»‡ thá»‘ng PronaFlow. _LĂ½ do:_ Äáº£m báº£o tĂ­nh cĂ¡ nhĂ¢n hĂ³a nhÆ°ng khĂ´ng vi pháº¡m cĂ¡c quy táº¯c quáº£n trá»‹/báº£o máº­t chung cá»§a tá»• chá»©c.
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. Äá»‹nh luáº­t Hick (Hick's Law)

> _"Thá»i gian cáº§n thiáº¿t Ä‘á»ƒ Ä‘Æ°a ra quyáº¿t Ä‘á»‹nh tÄƒng theo sá»‘ lÆ°á»£ng vĂ  Ä‘á»™ phá»©c táº¡p cá»§a cĂ¡c lá»±a chá»n."_

Ăp dá»¥ng vĂ o **Customizable Dashboard**: Báº±ng cĂ¡ch cho phĂ©p ngÆ°á»i dĂ¹ng áº©n Ä‘i cĂ¡c Widget khĂ´ng cáº§n thiáº¿t, chĂºng ta giáº£m sá»‘ lÆ°á»£ng tĂ¡c nhĂ¢n kĂ­ch thĂ­ch (Stimuli), giĂºp ngÆ°á»i dĂ¹ng ra quyáº¿t Ä‘á»‹nh nhanh hÆ¡n vĂ  táº­p trung hÆ¡n vĂ o cĂ´ng viá»‡c chĂ­nh.
## 4.2. Thuyáº¿t Táº£i Nháº­n thá»©c (Cognitive Load Theory - John Sweller)
- **Extraneous Load (Táº£i ngoáº¡i lai):** LĂ  nhá»¯ng thĂ´ng tin thá»«a thĂ£i, gĂ¢y nhiá»…u.
- **Giáº£i phĂ¡p:** TĂ­nh nÄƒng Personalization giĂºp loáº¡i bá» _Extraneous Load_ (vĂ­ dá»¥: má»™t Dev khĂ´ng cáº§n xem biá»ƒu Ä‘á»“ chi phĂ­ dá»± Ă¡n). Äiá»u nĂ y giáº£i phĂ³ng tĂ i nguyĂªn nĂ£o bá»™ Ä‘á»ƒ táº­p trung vĂ o **Germane Load** (Táº£i trá»ng thiáº¿t yáº¿u - viá»‡c xá»­ lĂ½ logic cĂ´ng viá»‡c).
## 4.3. TiĂªu chuáº©n Tiáº¿p cáº­n Web (Web Content Accessibility Guidelines - WCAG)
Module nĂ y Ä‘Æ°á»£c xĂ¢y dá»±ng Ä‘á»ƒ Ä‘Ă¡p á»©ng cĂ¡c tiĂªu chuáº©n Ä‘áº¡o Ä‘á»©c vĂ  phĂ¡p lĂ½ trong thiáº¿t káº¿ pháº§n má»m:
- **Perceivable (CĂ³ thá»ƒ nháº­n biáº¿t):** Dark Mode vĂ  High Contrast giĂºp ngÆ°á»i khiáº¿m thá»‹ mĂ u hoáº·c nháº¡y cáº£m Ă¡nh sĂ¡ng váº«n sá»­ dá»¥ng Ä‘Æ°á»£c pháº§n má»m.
- **Operable (CĂ³ thá»ƒ Ä‘iá»u hÆ°á»›ng):** Há»— trá»£ Ä‘iá»u hÆ°á»›ng báº±ng bĂ n phĂ­m (Keyboard Navigation) cho toĂ n bá»™ cĂ¡c menu tĂ¹y chá»‰nh.
## 4.4. Äá»‹nh luáº­t Fitts (Fitts's Law)

> _"Thá»i gian cáº§n thiáº¿t Ä‘á»ƒ di chuyá»ƒn nhanh tá»›i má»¥c tiĂªu lĂ  hĂ m sá»‘ cá»§a khoáº£ng cĂ¡ch tá»›i má»¥c tiĂªu vĂ  kĂ­ch thÆ°á»›c cá»§a má»¥c tiĂªu Ä‘Ă³."_

- **Ăp dá»¥ng:** TĂ­nh nÄƒng **Collapsible Sidebar** giĂºp má»Ÿ rá»™ng khĂ´ng gian lĂ m viá»‡c, lĂ m cho cĂ¡c tháº» Kanban (má»¥c tiĂªu thao tĂ¡c) trá»Ÿ nĂªn to hÆ¡n hoáº·c hiá»ƒn thá»‹ Ä‘Æ°á»£c nhiá»u hÆ¡n, giáº£m quĂ£ng Ä‘Æ°á»ng chuá»™t ngÆ°á»i dĂ¹ng pháº£i di chuyá»ƒn khi thao tĂ¡c kĂ©o tháº£.
## 4.5. Data-Ink Ratio (Tá»· lá»‡ Dá»¯ liá»‡u/Má»±c in - Edward Tufte)
- **NguyĂªn lĂ½:** Má»™t giao diá»‡n tá»‘t lĂ  giao diá»‡n loáº¡i bá» tá»‘i Ä‘a cĂ¡c yáº¿u tá»‘ trang trĂ­ khĂ´ng mang láº¡i thĂ´ng tin (non-data-ink).
- **Ăp dá»¥ng:** Cháº¿ Ä‘á»™ **Compact Mode** (AC 2 cá»§a Feature 9.4) loáº¡i bá» cĂ¡c khoáº£ng tráº¯ng (whitespace) thá»«a thĂ£i, tá»‘i Æ°u hĂ³a tá»· lá»‡ hiá»ƒn thá»‹ thĂ´ng tin nghiá»‡p vá»¥ trĂªn má»—i pixel mĂ n hĂ¬nh, phá»¥c vá»¥ nhĂ³m ngÆ°á»i dĂ¹ng chuyĂªn gia (Expert Users).
## 4.6. Khoa há»c vá» Sá»± giĂ¡n Ä‘oáº¡n (Interruption Science)
CĂ¡c nghiĂªn cá»©u (vĂ­ dá»¥: _Ogan, 2018_) chá»‰ ra ráº±ng nhĂ¢n viĂªn vÄƒn phĂ²ng máº¥t trung bĂ¬nh **23 phĂºt 15 giĂ¢y** Ä‘á»ƒ quay láº¡i guá»“ng cĂ´ng viá»‡c sau khi bá»‹ giĂ¡n Ä‘oáº¡n bá»Ÿi má»™t thĂ´ng bĂ¡o khĂ´ng liĂªn quan.
- **Ăp dá»¥ng:** TĂ­nh nÄƒng **Notification Granularity** (AC 9.6) vĂ  **Do Not Disturb** lĂ  biá»‡n phĂ¡p ká»¹ thuáº­t trá»±c tiáº¿p Ä‘á»ƒ báº£o vá»‡ sá»± táº­p trung cá»§a ngÆ°á»i dĂ¹ng, giáº£m thiá»ƒu _Context Switching Cost_ (Chi phĂ­ chuyá»ƒn Ä‘á»•i ngá»¯ cáº£nh).
## 4.7. Äá»‹nh luáº­t Luyá»‡n táº­p (The Power Law of Practice)

> _"Logarithm cá»§a thá»i gian thá»±c hiá»‡n má»™t tĂ¡c vá»¥ giáº£m tuyáº¿n tĂ­nh vá»›i logarithm cá»§a sá»‘ láº§n luyá»‡n táº­p."_

- **Ăp dá»¥ng:** Äá»‘i vá»›i ngÆ°á»i dĂ¹ng lĂ¢u nÄƒm (Expert), thá»i gian thao tĂ¡c báº±ng chuá»™t sáº½ cháº¡m ngÆ°á»¡ng giá»›i háº¡n váº­t lĂ½. TĂ­nh nÄƒng **Keyboard Shortcuts** (AC 9.7) giĂºp phĂ¡ vá»¡ giá»›i háº¡n nĂ y, cho phĂ©p tá»‘c Ä‘á»™ thao tĂ¡c tiá»‡m cáº­n vá»›i tá»‘c Ä‘á»™ tÆ° duy, tá»‘i Æ°u hĂ³a hiá»‡u suáº¥t lĂ m viá»‡c á»Ÿ giai Ä‘oáº¡n "ThĂ nh tháº¡o" (Mastery Stage).
## 4.8. Thiáº¿t káº¿ Bao trĂ¹m (Inclusive Design)
KhĂ¡c vá»›i thiáº¿t káº¿ phá»• quĂ¡t (Universal Design), Thiáº¿t káº¿ bao trĂ¹m thá»«a nháº­n sá»± Ä‘a dáº¡ng cá»§a con ngÆ°á»i.
- **Ăp dá»¥ng:** Viá»‡c há»— trá»£ cháº¿ Ä‘á»™ mĂ¹ mĂ u (AC 9.8) khĂ´ng chá»‰ lĂ  tĂ­nh nÄƒng y táº¿, mĂ  lĂ  yĂªu cáº§u báº¯t buá»™c Ä‘á»ƒ Ä‘áº£m báº£o sá»± cĂ´ng báº±ng trong viá»‡c tiáº¿p cáº­n thĂ´ng tin (Information Equity). Khoáº£ng 8% nam giá»›i bá»‹ mĂ¹ mĂ u, Ä‘Ă¢y lĂ  má»™t táº­p ngÆ°á»i dĂ¹ng Ä‘Ă¡ng ká»ƒ trong mĂ´i trÆ°á»ng doanh nghiá»‡p khĂ´ng thá»ƒ bá»‹ bá» rÆ¡i.
