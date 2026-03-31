**Project**: PronaFlow 
**Version**: 1.1 
**State**: Draft 
_**Last updated:** Jan 04, 2026_

---
# 1. Business Overview
PhĂ¢n há»‡ **Identity and Access Management (IAM)** Ä‘Ă³ng vai trĂ² lĂ  táº§ng kiá»ƒm soĂ¡t an ninh cá»‘t lĂµi cá»§a há»‡ thá»‘ng PronaFlow. Má»¥c tiĂªu cá»§a phĂ¢n há»‡ nĂ y lĂ  thiáº¿t láº­p vĂ  duy trĂ¬ khuĂ´n khá»• báº£o máº­t dá»±a trĂªn mĂ´ hĂ¬nh **AAA** (Authentication - Authorization - Accounting/Auditing). Trong kiáº¿n trĂºc pháº§n má»m SaaS (Software-as-a-Service), IAM Ä‘áº£m nhiá»‡m chá»©c nÄƒng Ä‘á»‹nh danh ngÆ°á»i dĂ¹ng, xĂ¡c thá»±c quyá»n truy cáº­p vĂ  Ä‘áº£m báº£o tĂ­nh toĂ n váº¹n cá»§a phiĂªn lĂ m viá»‡c Ä‘á»‘i vá»›i tĂ i nguyĂªn dá»¯ liá»‡u cá»§a tá»«ng Tenant (KhĂ¡ch hĂ ng/Tá»• chá»©c).
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Identity Lifecycle Management (Quáº£n lĂ½ VĂ²ng Ä‘á»i Äá»‹nh danh)
### User Story 1.1
LĂ  má»™t NgÆ°á»i dĂ¹ng má»›i, TĂ´i muá»‘n Ä‘Äƒng kĂ½ tĂ i khoáº£n vĂ  xĂ¡c thá»±c Ä‘á»‹a chá»‰ email, Äá»ƒ Ä‘áº£m báº£o danh tĂ­nh cá»§a tĂ´i lĂ  duy nháº¥t vĂ  an toĂ n trÆ°á»›c khi tham gia vĂ o cĂ¡c Workspace.
### Acceptance Criteria ( #AC)
#### AC 1 - Input Validation (Kiá»ƒm tra dá»¯ liá»‡u Ä‘áº§u vĂ o)
- **Constraint:** Há»‡ thá»‘ng pháº£i kiá»ƒm tra Ä‘á»‹nh dáº¡ng dá»¯ liá»‡u trÆ°á»›c khi xá»­ lĂ½:
 - `Email`: Pháº£i Ä‘Ăºng Ä‘á»‹nh dáº¡ng email tiĂªu chuáº©n.
 - `Username`: Chá»‰ chá»©a chá»¯ cĂ¡i, sá»‘, gáº¡ch dÆ°á»›i; khĂ´ng chá»©a khoáº£ng tráº¯ng; Ä‘á»™ dĂ i 3-30 kĂ½ tá»±.
 - `Password`: Pháº£i Ä‘áº¡t Ä‘á»™ máº¡nh an toĂ n (Tá»‘i thiá»ƒu 12 kĂ½ tá»±, bao gá»“m chá»¯ hoa, thÆ°á»ng, sá»‘ vĂ  kĂ½ tá»± Ä‘áº·c biá»‡t).
#### AC 2 - Email Verification (XĂ¡c thá»±c Email)
- **Flow:** Sau khi ngÆ°á»i dĂ¹ng Ä‘Äƒng kĂ½, tĂ i khoáº£n Ä‘Æ°á»£c táº¡o á»Ÿ tráº¡ng thĂ¡i `PENDING` (Chá» kĂ­ch hoáº¡t).
- **System Behavior:** Há»‡ thá»‘ng gá»­i má»™t email chá»©a liĂªn káº¿t kĂ­ch hoáº¡t (cĂ³ hiá»‡u lá»±c trong 24 giá»).
- **Result:** Khi ngÆ°á»i dĂ¹ng truy cáº­p liĂªn káº¿t, tráº¡ng thĂ¡i tĂ i khoáº£n chuyá»ƒn sang `ACTIVE`. Náº¿u liĂªn káº¿t háº¿t háº¡n, ngÆ°á»i dĂ¹ng pháº£i yĂªu cáº§u gá»­i láº¡i email kĂ­ch hoáº¡t.
### User Story 1.2
- LĂ  má»™t NgÆ°á»i dĂ¹ng, 
- TĂ´i muá»‘n Ä‘Äƒng nháº­p an toĂ n vĂ o há»‡ thá»‘ng vĂ  duy trĂ¬ phiĂªn lĂ m viá»‡c trong má»™t khoáº£ng thá»i gian há»£p lĂ½, 
- Äá»ƒ khĂ´ng pháº£i nháº­p láº¡i máº­t kháº©u liĂªn tá»¥c gĂ¢y giĂ¡n Ä‘oáº¡n cĂ´ng viá»‡c.
### Acceptance Criteria ( #AC)
#### AC 1 - Authentication Mechanism (CÆ¡ cháº¿ xĂ¡c thá»±c)
- **Input:** NgÆ°á»i dĂ¹ng cung cáº¥p thĂ´ng tin Ä‘Äƒng nháº­p (Email/Username vĂ  Password).
- **Output:** Náº¿u thĂ´ng tin chĂ­nh xĂ¡c, há»‡ thá»‘ng cáº¥p quyá»n truy cáº­p phiĂªn lĂ m viá»‡c.
#### AC 2 - Brute-force Protection (Chá»‘ng táº¥n cĂ´ng dĂ² máº­t kháº©u)
- **Rule:** Há»‡ thá»‘ng giá»›i háº¡n sá»‘ láº§n Ä‘Äƒng nháº­p sai liĂªn tiáº¿p.
- **Logic:** Náº¿u nháº­p sai máº­t kháº©u 5 láº§n trong vĂ²ng 10 phĂºt, tĂ i khoáº£n sáº½ bá»‹ táº¡m khĂ³a chá»©c nÄƒng Ä‘Äƒng nháº­p trong 15 phĂºt. Má»™t thĂ´ng bĂ¡o cáº£nh bĂ¡o báº£o máº­t sáº½ Ä‘Æ°á»£c gá»­i Ä‘áº¿n email cá»§a chá»§ tĂ i khoáº£n.
## 2.2. Feature: Access Control & Authorization (Kiá»ƒm soĂ¡t Truy cáº­p & PhĂ¢n quyá»n)
### User Story 1.3
LĂ  má»™t Quáº£n trá»‹ viĂªn Workspace, TĂ´i muá»‘n phĂ¢n quyá»n cá»¥ thá»ƒ cho tá»«ng thĂ nh viĂªn theo vai trĂ², Äá»ƒ Ä‘áº£m báº£o má»—i ngÆ°á»i chá»‰ truy cáº­p Ä‘Æ°á»£c nhá»¯ng dá»¯ liá»‡u cáº§n thiáº¿t cho cĂ´ng viá»‡c (NguyĂªn táº¯c Ä‘áº·c quyá»n tá»‘i thiá»ƒu).
### Acceptance Criteria ( #AC)
#### AC 1 - Hierarchical Roles (Vai trĂ² phĂ¢n cáº¥p)
- Há»‡ thá»‘ng há»— trá»£ cĂ¡c vai trĂ² tiĂªu chuáº©n sau:
 - **Workspace Owner:** ToĂ n quyá»n quáº£n lĂ½ tá»• chá»©c, thanh toĂ¡n vĂ  dá»¯ liá»‡u.
 - **Workspace Admin:** Quáº£n lĂ½ thĂ nh viĂªn vĂ  dá»± Ă¡n, khĂ´ng cĂ³ quyá»n truy cáº­p thĂ´ng tin thanh toĂ¡n.
 - **Member:** CĂ³ quyá»n xem vĂ  chá»‰nh sá»­a trĂªn cĂ¡c dá»± Ă¡n Ä‘Æ°á»£c gĂ¡n.
 - **Guest:** Chá»‰ cĂ³ quyá»n xem (Read-only) trĂªn cĂ¡c tĂ i nguyĂªn Ä‘Æ°á»£c chia sáº» cá»¥ thá»ƒ.
#### AC 2 - Permission Enforcement (Thá»±c thi quyá»n háº¡n)
- **Logic:** Khi ngÆ°á»i dĂ¹ng thá»±c hiá»‡n má»™t hĂ nh Ä‘á»™ng (VĂ­ dá»¥: XĂ³a dá»± Ă¡n), há»‡ thá»‘ng pháº£i kiá»ƒm tra vai trĂ² cá»§a ngÆ°á»i dĂ¹ng Ä‘Ă³.
- **Result:** Náº¿u vai trĂ² khĂ´ng Ä‘á»§ tháº©m quyá»n, há»‡ thá»‘ng tá»« chá»‘i yĂªu cáº§u vĂ  hiá»ƒn thá»‹ thĂ´ng bĂ¡o "Báº¡n khĂ´ng cĂ³ quyá»n thá»±c hiá»‡n hĂ nh Ä‘á»™ng nĂ y".
## 2.3. Feature: Password Recovery (KhĂ´i phá»¥c Máº­t kháº©u)
### User Story 1.4
LĂ  má»™t NgÆ°á»i dĂ¹ng quĂªn máº­t kháº©u, TĂ´i muá»‘n thiáº¿t láº­p láº¡i máº­t kháº©u má»›i thĂ´ng qua email xĂ¡c nháº­n, Äá»ƒ láº¥y láº¡i quyá»n truy cáº­p tĂ i khoáº£n má»™t cĂ¡ch an toĂ n.
### Acceptance Criteria (#AC)
#### AC 1 - Secure Reset Process
- **Security:** Há»‡ thá»‘ng khĂ´ng gá»­i láº¡i máº­t kháº©u cÅ© qua email.
- **Mechanism:** Há»‡ thá»‘ng gá»­i má»™t liĂªn káº¿t Ä‘áº·t láº¡i máº­t kháº©u duy nháº¥t qua email. LiĂªn káº¿t nĂ y chá»‰ cĂ³ hiá»‡u lá»±c sá»­ dá»¥ng má»™t láº§n vĂ  háº¿t háº¡n sau 15 phĂºt.
#### AC 2 - Session Termination (Cháº¥m dá»©t phiĂªn)
- **Logic:** Ngay khi máº­t kháº©u Ä‘Æ°á»£c thay Ä‘á»•i thĂ nh cĂ´ng, há»‡ thá»‘ng pháº£i tá»± Ä‘á»™ng Ä‘Äƒng xuáº¥t tĂ i khoáº£n nĂ y trĂªn táº¥t cáº£ cĂ¡c thiáº¿t bá»‹ khĂ¡c Ä‘ang hoáº¡t Ä‘á»™ng Ä‘á»ƒ Ä‘áº£m báº£o an toĂ n.
## 2.4. Feature: Multi-Factor Authentication (XĂ¡c thá»±c Äa yáº¿u tá»‘ - MFA)
### User Story 1.5
LĂ  má»™t NgÆ°á»i dĂ¹ng Ä‘á» cao tĂ­nh báº£o máº­t, TĂ´i muá»‘n kĂ­ch hoáº¡t xĂ¡c thá»±c 2 lá»›p (2FA) báº±ng á»©ng dá»¥ng Ä‘iá»‡n thoáº¡i, Äá»ƒ báº£o vá»‡ tĂ i khoáº£n ngay cáº£ khi máº­t kháº©u bá»‹ lá»™.
### Acceptance Criteria (#AC)
#### AC 1 - Activation Flow (Quy trĂ¬nh kĂ­ch hoáº¡t)
- **Standard:** Há»— trá»£ cĂ¡c á»©ng dá»¥ng táº¡o mĂ£ OTP tiĂªu chuáº©n (nhÆ° Google Authenticator, Microsoft Authenticator).
- **Verification:** NgÆ°á»i dĂ¹ng pháº£i nháº­p Ä‘Ăºng mĂ£ 6 sá»‘ tá»« á»©ng dá»¥ng Ä‘á»ƒ hoĂ n táº¥t viá»‡c kĂ­ch hoáº¡t.
#### AC 2 - Login Requirement (YĂªu cáº§u Ä‘Äƒng nháº­p)
- **Logic:** Khi tĂ i khoáº£n Ä‘Ă£ báº­t 2FA, quy trĂ¬nh Ä‘Äƒng nháº­p yĂªu cáº§u 2 bÆ°á»›c:
 1. Nháº­p Máº­t kháº©u chĂ­nh xĂ¡c.
 2. Nháº­p mĂ£ OTP tá»« thiáº¿t bá»‹ tin cáº­y.
#### AC 3 - Backup Recovery (PhÆ°Æ¡ng Ă¡n dá»± phĂ²ng)
- Há»‡ thá»‘ng cung cáº¥p bá»™ 10 mĂ£ dá»± phĂ²ng (Backup Codes) khi kĂ­ch hoáº¡t 2FA. NgÆ°á»i dĂ¹ng cĂ³ thá»ƒ sá»­ dá»¥ng mĂ£ nĂ y Ä‘á»ƒ Ä‘Äƒng nháº­p khi máº¥t Ä‘iá»‡n thoáº¡i.
## 2.5. Feature: Session Management (Quáº£n lĂ½ PhiĂªn lĂ m viá»‡c)
### User Story 1.6
LĂ  má»™t NgÆ°á»i dĂ¹ng, TĂ´i muá»‘n xem danh sĂ¡ch cĂ¡c thiáº¿t bá»‹ Ä‘ang Ä‘Äƒng nháº­p tĂ i khoáº£n cá»§a mĂ¬nh vĂ  cĂ³ quyá»n Ä‘Äƒng xuáº¥t chĂºng tá»« xa, Äá»ƒ kiá»ƒm soĂ¡t rá»§i ro truy cáº­p trĂ¡i phĂ©p.
### Acceptance Criteria (#AC)
#### AC 1 - Session Information Visibility (Hiá»ƒn thá»‹ thĂ´ng tin phiĂªn)
- **Display:** Há»‡ thá»‘ng liá»‡t kĂª danh sĂ¡ch cĂ¡c phiĂªn Ä‘ang hoáº¡t Ä‘á»™ng vá»›i cĂ¡c thĂ´ng tin Ä‘á»‹nh danh dá»… hiá»ƒu cho ngÆ°á»i dĂ¹ng:
 - **TĂªn thiáº¿t bá»‹ & TrĂ¬nh duyá»‡t:** (VĂ­ dá»¥: Chrome trĂªn Windows 10, Safari trĂªn iPhone 14).
 - **Vá»‹ trĂ­ Ä‘á»‹a lĂ½ Æ°á»›c tĂ­nh:** (VĂ­ dá»¥: ThĂ nh phá»‘ Há»“ ChĂ­ Minh, Viá»‡t Nam).
 - **Thá»i gian hoáº¡t Ä‘á»™ng gáº§n nháº¥t:** (VĂ­ dá»¥: Vá»«a truy cáº­p, Hoáº¡t Ä‘á»™ng 2 giá» trÆ°á»›c).
 - **Tráº¡ng thĂ¡i:** ÄĂ¡nh dáº¥u rĂµ "PhiĂªn hiá»‡n táº¡i" (Current Session).
#### AC 2 - Concurrent Session Limit (Giá»›i háº¡n phiĂªn Ä‘á»“ng thá»i)
- **Business Rule:** Má»—i tĂ i khoáº£n ngÆ°á»i dĂ¹ng chá»‰ Ä‘Æ°á»£c phĂ©p duy trĂ¬ Ä‘Äƒng nháº­p tá»‘i Ä‘a trĂªn 5 thiáº¿t bá»‹ Ä‘á»“ng thá»i.
- **Rotation Logic:** Khi ngÆ°á»i dĂ¹ng Ä‘Äƒng nháº­p trĂªn thiáº¿t bá»‹ thá»© 6, há»‡ thá»‘ng tá»± Ä‘á»™ng Ä‘Äƒng xuáº¥t phiĂªn lĂ m viá»‡c cÅ© nháº¥t (cĂ³ thá»i gian hoáº¡t Ä‘á»™ng xa nháº¥t) Ä‘á»ƒ nhÆ°á»ng chá»— cho phiĂªn má»›i.
#### AC 3 - Remote Revocation (Thu há»“i quyá»n truy cáº­p tá»« xa)
- **Action:** NgÆ°á»i dĂ¹ng nháº¥n nĂºt "ÄÄƒng xuáº¥t" (Log out) trĂªn má»™t thiáº¿t bá»‹ cá»¥ thá»ƒ trong danh sĂ¡ch.
- **Result:**
 - PhiĂªn lĂ m viá»‡c trĂªn thiáº¿t bá»‹ Ä‘Ă³ bá»‹ cháº¥m dá»©t hiá»‡u lá»±c ngay láº­p tá»©c.
 - Táº¡i láº§n thao tĂ¡c tiáº¿p theo trĂªn thiáº¿t bá»‹ bá»‹ Ä‘Äƒng xuáº¥t, ngÆ°á»i dĂ¹ng sáº½ bá»‹ Ä‘Æ°a trá»Ÿ vá» mĂ n hĂ¬nh Ä‘Äƒng nháº­p.
#### AC 4 - Impossible Travel Alert (Cáº£nh bĂ¡o Di chuyá»ƒn Báº¥t thÆ°á»ng)
- **Detection Logic:** Há»‡ thá»‘ng phĂ¡t hiá»‡n hai láº§n Ä‘Äƒng nháº­p liĂªn tiáº¿p xáº£y ra á»Ÿ hai vá»‹ trĂ­ Ä‘á»‹a lĂ½ cĂ¡ch xa nhau trong khoáº£ng thá»i gian ngáº¯n khĂ´ng kháº£ thi vá» máº·t váº­t lĂ½ (VĂ­ dá»¥: ÄÄƒng nháº­p táº¡i HĂ  Ná»™i, 5 phĂºt sau Ä‘Äƒng nháº­p táº¡i London).
- **System Action:**
 - Gá»­i email cáº£nh bĂ¡o báº£o máº­t kháº©n cáº¥p cho ngÆ°á»i dĂ¹ng.
 - YĂªu cáº§u xĂ¡c thá»±c láº¡i (Re-authentication) Ä‘á»‘i vá»›i phiĂªn Ä‘Äƒng nháº­p Ä‘Ă¡ng ngá».
## 2.6. Feature: Social Authentication (Äá»‹nh danh Máº¡ng xĂ£ há»™i)
### User Story 1.7
LĂ  má»™t NgÆ°á»i dĂ¹ng má»›i, TĂ´i muá»‘n Ä‘Äƒng nháº­p nhanh báº±ng tĂ i khoáº£n Google hoáº·c GitHub, Äá»ƒ tiáº¿t kiá»‡m thá»i gian vĂ  giáº£m bá»›t viá»‡c pháº£i ghi nhá»› nhiá»u máº­t kháº©u.
### Acceptance Criteria (#AC)
#### AC 1 - Authorization Flow (Luá»“ng á»§y quyá»n)
- **Protocol:** Sá»­ dá»¥ng giao thá»©c á»§y quyá»n tiĂªu chuáº©n (OAuth 2.0).
- **Permission:** Há»‡ thá»‘ng chá»‰ yĂªu cáº§u quyá»n truy cáº­p thĂ´ng tin cÆ¡ báº£n (TĂªn, Email, Avatar) tá»« nhĂ  cung cáº¥p dá»‹ch vá»¥, khĂ´ng yĂªu cáº§u cĂ¡c quyá»n truy cáº­p dá»¯ liá»‡u riĂªng tÆ° khĂ¡c.
#### AC 2 - Account Linking & Provisioning (LiĂªn káº¿t & Khá»Ÿi táº¡o)
- **Case 1 (TĂ i khoáº£n Ä‘Ă£ tá»“n táº¡i):** Náº¿u email tá»« Google/GitHub trĂ¹ng vá»›i email Ä‘Ă£ cĂ³ trong há»‡ thá»‘ng, tá»± Ä‘á»™ng liĂªn káº¿t vĂ  Ä‘Äƒng nháº­p.
- **Case 2 (TĂ i khoáº£n má»›i):** Náº¿u email chÆ°a tá»“n táº¡i, há»‡ thá»‘ng tá»± Ä‘á»™ng khá»Ÿi táº¡o tĂ i khoáº£n má»›i vá»›i tráº¡ng thĂ¡i "ÄĂ£ xĂ¡c thá»±c email" vĂ  bá» qua bÆ°á»›c xĂ¡c minh email thá»§ cĂ´ng.
# 3. Business Rules & Compliance
## 3.1. Quy táº¯c Báº£o máº­t Dá»¯ liá»‡u XĂ¡c thá»±c
- **Password Storage:** Máº­t kháº©u pháº£i Ä‘Æ°á»£c mĂ£ hĂ³a má»™t chiá»u (Hashing) trÆ°á»›c khi lÆ°u trá»¯ vĂ o cÆ¡ sá»Ÿ dá»¯ liá»‡u. Tuyá»‡t Ä‘á»‘i khĂ´ng lÆ°u trá»¯ máº­t kháº©u dÆ°á»›i dáº¡ng vÄƒn báº£n cĂ³ thá»ƒ Ä‘á»c Ä‘Æ°á»£c.
- **Sensitive Data:** CĂ¡c mĂ£ xĂ¡c thá»±c (OTP, Reset Token) khĂ´ng Ä‘Æ°á»£c hiá»ƒn thá»‹ trong log há»‡ thá»‘ng hoáº·c pháº£n há»“i API.
## 3.2. Quy táº¯c Äá»‹nh danh (Identity Rules)
- **Uniqueness:** Äá»‹a chá»‰ Email vĂ  Username pháº£i lĂ  duy nháº¥t trĂªn toĂ n há»‡ thá»‘ng.
- **Email Verification Requirement:** NgÆ°á»i dĂ¹ng chÆ°a xĂ¡c thá»±c email sáº½ bá»‹ háº¡n cháº¿ quyá»n truy cáº­p (chá»‰ xem Ä‘Æ°á»£c Dashboard cĂ¡ nhĂ¢n, khĂ´ng thá»ƒ táº¡o Dá»± Ă¡n hoáº·c tham gia Workspace).
## 3.3. Quy táº¯c PhiĂªn lĂ m viá»‡c (Session Rules)
- **Session Timeout:** PhiĂªn lĂ m viá»‡c sáº½ tá»± Ä‘á»™ng háº¿t háº¡n náº¿u ngÆ°á»i dĂ¹ng khĂ´ng cĂ³ báº¥t ká»³ thao tĂ¡c nĂ o (Inactive) trong vĂ²ng 7 ngĂ y (Ä‘á»‘i vá»›i tĂ¹y chá»n "Ghi nhá»› Ä‘Äƒng nháº­p").
- **Audit Trail:** Má»i hĂ nh Ä‘á»™ng liĂªn quan Ä‘áº¿n Ä‘á»‹nh danh (ÄÄƒng nháº­p, Äá»•i máº­t kháº©u, Báº­t/Táº¯t 2FA) Ä‘á»u pháº£i Ä‘Æ°á»£c ghi láº¡i vĂ o Nháº­t kĂ½ há»‡ thá»‘ng (System Logs) phá»¥c vá»¥ má»¥c Ä‘Ă­ch kiá»ƒm toĂ¡n sau nĂ y.
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. NguyĂªn táº¯c Äáº·c quyá»n Tá»‘i thiá»ƒu (Principle of Least Privilege - PoLP)
PhĂ¢n há»‡ IAM cá»§a PronaFlow Ä‘Æ°á»£c xĂ¢y dá»±ng dá»±a trĂªn nguyĂªn táº¯c PoLP. Äiá»u nĂ y Ä‘áº£m báº£o ráº±ng má»—i thá»±c thá»ƒ (ngÆ°á»i dĂ¹ng hoáº·c dá»‹ch vá»¥) chá»‰ Ä‘Æ°á»£c cáº¥p quyá»n truy cáº­p vĂ o nhá»¯ng thĂ´ng tin vĂ  tĂ i nguyĂªn thá»±c sá»± cáº§n thiáº¿t cho má»¥c Ä‘Ă­ch há»£p phĂ¡p cá»§a há». Viá»‡c nĂ y giáº£m thiá»ƒu tá»‘i Ä‘a bá» máº·t táº¥n cĂ´ng (Attack Surface) vĂ  rá»§i ro rĂ² rá»‰ dá»¯ liá»‡u ná»™i bá»™.
## 4.2. XĂ¡c thá»±c Äa yáº¿u tá»‘ (Multi-Factor Authentication - MFA)
CÆ¡ sá»Ÿ báº£o máº­t cá»§a MFA dá»±a trĂªn viá»‡c káº¿t há»£p cĂ¡c yáº¿u tá»‘ xĂ¡c thá»±c khĂ¡c nhau:
- **Knowledge:** CĂ¡i báº¡n biáº¿t (Máº­t kháº©u).
- **Possession:** CĂ¡i báº¡n cĂ³ (Äiá»‡n thoáº¡i/MĂ£ OTP). Viá»‡c yĂªu cáº§u cáº£ hai yáº¿u tá»‘ giĂºp tÄƒng cÆ°á»ng báº£o máº­t theo cáº¥p sá»‘ nhĂ¢n, vĂ¬ káº» táº¥n cĂ´ng khĂ³ cĂ³ thá»ƒ thá»a mĂ£n cĂ¹ng lĂºc cáº£ hai Ä‘iá»u kiá»‡n nĂ y.
## 4.3. Kiá»ƒm soĂ¡t Truy cáº­p Dá»±a trĂªn Vai trĂ² (RBAC - Role-Based Access Control)
MĂ´ hĂ¬nh RBAC Ä‘Æ°á»£c lá»±a chá»n thay vĂ¬ phĂ¢n quyá»n tĂ¹y Ă½ (DAC) hoáº·c phĂ¢n quyá»n báº¯t buá»™c (MAC) vĂ¬ tĂ­nh linh hoáº¡t vĂ  kháº£ nÄƒng quáº£n trá»‹ phĂ¹ há»£p vá»›i mĂ´ hĂ¬nh doanh nghiá»‡p. RBAC giĂºp chuáº©n hĂ³a cĂ¡c quy trĂ¬nh cáº¥p quyá»n, giáº£m sai sĂ³t do con ngÆ°á»i khi quáº£n lĂ½ quyá»n háº¡n cá»§a sá»‘ lÆ°á»£ng lá»›n ngÆ°á»i dĂ¹ng.

