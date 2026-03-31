**Project**: PronaFlow
**Version**: 1.2 (Revised based on "Optimal Free Tier" philosophy)
**State**: Draft
***Last updated:** Jan 5, 2026*

---
## 1. Business Overview (Tá»•ng quan Nghiá»‡p vá»¥)
Trong ná»n kinh táº¿ SaaS hiá»‡n Ä‘áº¡i, Ä‘áº·c biá»‡t vá»›i triáº¿t lĂ½ **Product-Led Growth (PLG)**, má»¥c tiĂªu cá»§a há»‡ thá»‘ng tĂ­nh phĂ­ khĂ´ng pháº£i lĂ  táº¡o ra rĂ o cáº£n (Paywalls) ngay tá»« Ä‘áº§u, mĂ  lĂ  Ä‘á»“ng hĂ nh cĂ¹ng sá»± phĂ¡t triá»ƒn cá»§a khĂ¡ch hĂ ng.
PhĂ¢n há»‡ **Subscription & Billing Management** cá»§a PronaFlow Ä‘Æ°á»£c thiáº¿t káº¿ vá»›i tÆ° duy: **"Free to Start, Pay to Scale"**.
1. **GĂ³i Free (Starter):** Cung cáº¥p tráº£i nghiá»‡m quáº£n lĂ½ dá»± Ă¡n **trá»n váº¹n** (Full Features) cho cĂ¡c nhu cáº§u cÆ¡ báº£n. NgÆ°á»i dĂ¹ng khĂ´ng bá»‹ cáº¯t giáº£m cĂ¡c tĂ­nh nÄƒng cá»‘t lĂµi nhÆ° Kanban, Gantt, hay Collaboration. Giá»›i háº¡n chá»‰ náº±m á»Ÿ **tĂ i nguyĂªn tiĂªu thá»¥** (Storage, AI Tokens) vĂ  **pháº¡m vi quáº£n trá»‹** (SSO, Audit Log dĂ i háº¡n).
2. **CÆ¡ cháº¿ Dual-Layer Billing:**
    - **Inbound:** Quáº£n lĂ½ Ä‘Äƒng kĂ½ gĂ³i cÆ°á»›c linh hoáº¡t, há»— trá»£ tá»± Ä‘á»™ng nĂ¢ng cáº¥p khi quy mĂ´ team má»Ÿ rá»™ng.
    - **Outbound (Work-to-Cash):** Biáº¿n PronaFlow thĂ nh cĂ´ng cá»¥ kiáº¿m tiá»n cho Freelancer/Agency báº±ng cĂ¡ch xuáº¥t hĂ³a Ä‘Æ¡n tá»« Timesheet.
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Seamless Scaling (NĂ¢ng cáº¥p má»Ÿ rá»™ng liá»n máº¡ch)
### User Story 13.1
LĂ  má»™t **Workspace Owner (GĂ³i Free)**, tĂ´i muá»‘n há»‡ thá»‘ng cáº£nh bĂ¡o nháº¹ nhĂ ng khi tĂ´i sáº¯p Ä‘áº¡t giá»›i háº¡n tĂ i nguyĂªn (Dung lÆ°á»£ng/Sá»‘ lÆ°á»£ng dá»± Ă¡n) thay vĂ¬ khĂ³a cá»©ng tĂ­nh nÄƒng ngay láº­p tá»©c, vĂ  cho phĂ©p tĂ´i nĂ¢ng cáº¥p nhanh chĂ³ng Ä‘á»ƒ tiáº¿p tá»¥c máº¡ch lĂ m viá»‡c.
### Acceptance Criteria (#AC)
#### **AC 1 - Soft Limit Warning (Cáº£nh bĂ¡o má»m):**
- **Trigger:** Khi tĂ i nguyĂªn Ä‘áº¡t 80% vĂ  90% (VĂ­ dá»¥: ÄĂ£ dĂ¹ng 2.7/3 Dá»± Ă¡n hoáº·c 900MB/1GB Storage).
- **Display:** Hiá»ƒn thá»‹ thanh tráº¡ng thĂ¡i sá»­ dá»¥ng (Usage Bar) mĂ u vĂ ng/cam trĂªn Dashboard hoáº·c Settings. Gá»­i email nháº¯c nhá»Ÿ "Workspace cá»§a báº¡n Ä‘ang phĂ¡t triá»ƒn ráº¥t nhanh!".
#### **AC 2 - Graceful Enforcement (CÆ°á»¡ng cháº¿ Ă¢n háº¡n):**
- **Scenario:** NgÆ°á»i dĂ¹ng Ä‘áº¡t 100% giá»›i háº¡n Projects.
- **Action:** Há»‡ thá»‘ng **KHĂ”NG** khĂ³a quyá»n truy cáº­p cĂ¡c dá»± Ă¡n cÅ©. Há»‡ thá»‘ng chá»‰ táº¡m thá»i vĂ´ hiá»‡u hĂ³a nĂºt "Create New Project" cho Ä‘áº¿n khi nĂ¢ng cáº¥p hoáº·c lÆ°u trá»¯ (Archive) bá»›t dá»± Ă¡n cÅ©.
- **Philosophy:** Äáº£m báº£o ngÆ°á»i dĂ¹ng luĂ´n xá»­ lĂ½ Ä‘Æ°á»£c cĂ´ng viá»‡c hiá»‡n táº¡i, khĂ´ng bao giá» bá»‹ "báº¯t lĂ m con tin" vá» dá»¯ liá»‡u.
#### **AC 3 - Instant Upgrade (NĂ¢ng cáº¥p tá»©c thĂ¬):**
- Há»— trá»£ nĂ¢ng cáº¥p gĂ³i Pro ngay trong luá»“ng cĂ´ng viá»‡c (Contextual Upgrade) mĂ  khĂ´ng cáº§n táº£i láº¡i trang hay Ä‘Äƒng nháº­p láº¡i. CĂ¡c giá»›i háº¡n (Quota) Ä‘Æ°á»£c má»Ÿ rá»™ng ngay láº­p tá»©c sau khi thanh toĂ¡n thĂ nh cĂ´ng (Webhook trigger).
## 2.2. Feature: Feature Gating for Power Users (PhĂ¢n cáº¥p tĂ­nh nÄƒng nĂ¢ng cao)
### User Story 13.2
LĂ  má»™t **Doanh nghiá»‡p (GĂ³i Pro)**, tĂ´i muá»‘n sá»­ dá»¥ng cĂ¡c tĂ­nh nÄƒng quáº£n trá»‹ chuyĂªn sĂ¢u nhÆ° **SSO, Unlimited Audit Logs, vĂ  AI Advanced Insights**, Ä‘á»ƒ Ä‘áº£m báº£o an ninh vĂ  tá»‘i Æ°u hĂ³a váº­n hĂ nh cho Ä‘á»™i ngÅ© lá»›n.
### Acceptance Criteria (#AC)
#### **AC 1 - Core vs. Power Features:**
- **Core (Free & Pro):** Task Management, Basic Gantt, Comments, File Sharing, Basic Reports.
- **Power (Pro Only):**
	- Custom Field nĂ¢ng cao (Formula, Relation).
	- Advanced AI (Module 10 - Auto Schedule, Risk Prediction).
	- Data Retention vÄ©nh viá»…n (Free chá»‰ lÆ°u Audit Log 90 ngĂ y - theo Module 8).
#### **AC 2 - Teaser Experience (Tráº£i nghiá»‡m thá»­):**
- Cho phĂ©p ngÆ°á»i dĂ¹ng Free dĂ¹ng thá»­ tĂ­nh nÄƒng Pro (vĂ­ dá»¥: AI Prediction) vá»›i sá»‘ lÆ°á»£ng giá»›i háº¡n (5 láº§n/thĂ¡ng) Ä‘á»ƒ há» tháº¥y giĂ¡ trá»‹ trÆ°á»›c khi mua.
## 2.3. Feature: Freelancer Invoicing (HĂ³a Ä‘Æ¡n Ä‘áº§u ra)
### User Story 13.3
LĂ  má»™t **Freelancer (Sá»­ dá»¥ng cáº£ Free/Pro)**, tĂ´i muá»‘n chuyá»ƒn Ä‘á»•i dá»¯ liá»‡u cháº¥m cĂ´ng (Timesheet) thĂ nh hĂ³a Ä‘Æ¡n PDF chuyĂªn nghiá»‡p Ä‘á»ƒ gá»­i cho khĂ¡ch hĂ ng, vá»›i kháº£ nÄƒng tĂ¹y chá»‰nh thÆ°Æ¡ng hiá»‡u.
### Acceptance Criteria (#AC)
#### **AC 1 - Basic Invoicing (DĂ nh cho má»i ngÆ°á»i):**
- Cho phĂ©p chá»n cĂ¡c Time Entries Ä‘Ă£ duyá»‡t -> Táº¡o PDF hĂ³a Ä‘Æ¡n cÆ¡ báº£n.
- Máº«u hĂ³a Ä‘Æ¡n tiĂªu chuáº©n cá»§a PronaFlow.
#### **AC 2 - Branded Invoicing (DĂ nh cho Pro):**
- Cho phĂ©p táº£i lĂªn Logo riĂªng, chá»‰nh sá»­a mĂ u sáº¯c Brand, bá» dĂ²ng chá»¯ "Powered by PronaFlow".
- Há»— trá»£ gá»­i Email hĂ³a Ä‘Æ¡n trá»±c tiáº¿p tá»« há»‡ thá»‘ng vá»›i SMTP riĂªng.
#### **AC 3 - Payment Tracking:**
- Cho phĂ©p Ä‘Ă¡nh dáº¥u hĂ³a Ä‘Æ¡n lĂ  `Sent`, `Paid`, `Overdue` thá»§ cĂ´ng.
## 2.4. Feature: Transparent Usage Dashboard (Báº£ng theo dĂµi minh báº¡ch)
### User Story 13.4
LĂ  má»™t **Admin**, tĂ´i muá»‘n xem chi tiáº¿t má»©c Ä‘á»™ tiĂªu thá»¥ tĂ i nguyĂªn (Storage, AI Tokens, API Calls) theo thá»i gian thá»±c, Ä‘á»ƒ hiá»ƒu rĂµ tĂ´i Ä‘ang tráº£ tiá»n cho cĂ¡i gĂ¬ hoáº·c khi nĂ o cáº§n dá»n dáº¹p dá»¯ liá»‡u.
### Acceptance Criteria (#AC)
#### **AC 1 - Resource Breakdown:**
- Biá»ƒu Ä‘á»“ Donut chart hiá»ƒn thá»‹ dung lÆ°á»£ng Storage: Files (80%), Database (10%), Backups (10%).
- Danh sĂ¡ch cĂ¡c "Heavy Projects" chiáº¿m nhiá»u tĂ i nguyĂªn nháº¥t.
#### **AC 2 - AI Token Usage:**
- Hiá»ƒn thá»‹ sá»‘ lÆ°á»£ng Token Ä‘Ă£ dĂ¹ng cho cĂ¡c tĂ­nh nÄƒng AI (Gá»£i Ă½, TĂ³m táº¯t).
- Náº¿u lĂ  gĂ³i Free: Hiá»ƒn thá»‹ sá»‘ Token cĂ²n láº¡i trong thĂ¡ng (Quota reset Ä‘á»‹nh ká»³).
# 3. Business Rules & Technical Constraints
## 3.1. Quy táº¯c Dunning (Quáº£n lĂ½ thu ná»£ tá»± Ä‘á»™ng)
- **Retry Logic:** Náº¿u thanh toĂ¡n gia háº¡n tháº¥t báº¡i (do háº¿t háº¡n tháº», khĂ´ng Ä‘á»§ sá»‘ dÆ°), há»‡ thá»‘ng tá»± Ä‘á»™ng thá»­ láº¡i (Retry) theo lá»‹ch trĂ¬nh: NgĂ y 1, NgĂ y 3, NgĂ y 7.
- **Grace Period:** Cho phĂ©p ngÆ°á»i dĂ¹ng tiáº¿p tá»¥c sá»­ dá»¥ng dá»‹ch vá»¥ trong 7 ngĂ y Ă¢n háº¡n (Grace Period) trÆ°á»›c khi khĂ³a quyá»n truy cáº­p (Downgrade to Read-only).
## 3.2. Quy táº¯c Báº¥t biáº¿n TĂ i chĂ­nh (Financial Immutability)
- **Immutable Invoices:** Má»™t khi hĂ³a Ä‘Æ¡n Ä‘Ă£ Ä‘Æ°á»£c gá»­i Ä‘i (Sent) hoáº·c Ä‘Ă£ thanh toĂ¡n (Paid), ná»™i dung cá»§a nĂ³ **KHĂ”NG** Ä‘Æ°á»£c phĂ©p chá»‰nh sá»­a.
- Náº¿u cĂ³ sai sĂ³t, ngÆ°á»i dĂ¹ng pháº£i thá»±c hiá»‡n quy trĂ¬nh: Há»§y hĂ³a Ä‘Æ¡n cÅ© (Void) -> Táº¡o hĂ³a Ä‘Æ¡n má»›i (New Invoice) hoáº·c táº¡o Credit Note (Giáº¥y bĂ¡o cĂ³).
## 3.3. Quy táº¯c Thuáº¿ (Tax Compliance)
- Há»‡ thá»‘ng pháº£i há»— trá»£ tĂ­nh thuáº¿ tá»± Ä‘á»™ng dá»±a trĂªn Ä‘á»‹a chá»‰ cá»§a ngÆ°á»i mua (Buyer's Location) Ä‘á»ƒ tuĂ¢n thá»§ luáº­t VAT (ChĂ¢u Ă‚u) hoáº·c Sales Tax (Má»¹).
- TĂ­ch há»£p cĂ¡c service tĂ­nh thuáº¿ (nhÆ° Stripe Tax hoáº·c Avalara) náº¿u cáº§n thiáº¿t.
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)

## 4.1. NguyĂªn lĂ½ Káº¿ toĂ¡n KĂ©p (Double-Entry Bookkeeping)
Máº·c dĂ¹ PronaFlow khĂ´ng pháº£i lĂ  pháº§n má»m káº¿ toĂ¡n chuyĂªn sĂ¢u (nhÆ° QuickBooks), module nĂ y váº«n Ă¡p dá»¥ng tÆ° duy káº¿ toĂ¡n kĂ©p á»Ÿ táº§ng dá»¯ liá»‡u (Ledger) Ä‘á»ƒ Ä‘áº£m báº£o tĂ­nh toĂ n váº¹n:
- Má»—i giao dá»‹ch ghi nháº­n doanh thu pháº£i cĂ³ má»™t bĂºt toĂ¡n Ä‘á»‘i á»©ng vĂ o tĂ i khoáº£n pháº£i thu (Accounts Receivable) hoáº·c tiá»n máº·t (Cash).
- CĂ´ng thá»©c: $Assets = Liabilities + Equity$.
## 4.2. MĂ´ hĂ¬nh Äá»‹nh giĂ¡ SaaS (SaaS Pricing Models)
PronaFlow há»— trá»£ mĂ´ hĂ¬nh **Per-User Pricing** (TĂ­nh tiá»n theo Ä‘áº§u ngÆ°á»i) káº¿t há»£p **Tiered Pricing** (PhĂ¢n táº§ng).
- ÄĂ¢y lĂ  mĂ´ hĂ¬nh phá»• biáº¿n nháº¥t trong B2B SaaS vĂ¬ tĂ­nh dá»… hiá»ƒu vĂ  kháº£ nÄƒng má»Ÿ rá»™ng doanh thu tuyáº¿n tĂ­nh theo sá»± phĂ¡t triá»ƒn cá»§a khĂ¡ch hĂ ng (Scale with usage).
## 4.3. Báº£o máº­t Giao dá»‹ch (Transaction Security & Idempotency)
Äá»ƒ ngÄƒn cháº·n lá»—i "Double Charge" (Trá»« tiá»n 2 láº§n) trong mĂ´i trÆ°á»ng máº¡ng khĂ´ng á»•n Ä‘á»‹nh, Module Ă¡p dá»¥ng **Idempotency Keys**:
- Má»—i request thanh toĂ¡n gá»­i Ä‘i Ä‘á»u kĂ¨m theo má»™t Key duy nháº¥t (UUID).
- Náº¿u Client gá»­i láº¡i request (do timeout), Server kiá»ƒm tra Key nĂ y. Náº¿u Ä‘Ă£ xá»­ lĂ½, Server tráº£ vá» káº¿t quáº£ cÅ© mĂ  khĂ´ng thá»±c hiá»‡n trá»« tiá»n láº§n 2.

```mermaid
stateDiagram-v2
    [*] --> FreeTier: Register
    
    state FreeTier {
        [*] --> ActiveFree
        ActiveFree --> SoftLimit: Usage > 80%
        SoftLimit --> ActiveFree: Clean up data
        SoftLimit --> HardLimit: Usage >= 100%
        HardLimit --> ActiveFree: Archive Projects
    }

    FreeTier --> ProTier: Upgrade Payment Success

    state ProTier {
        [*] --> ActivePro
        ActivePro --> PaymentFailed: Renewal Error
        
        state PaymentFailed {
            [*] --> Retry1: Day 1
            Retry1 --> Retry2: Day 3
            Retry2 --> Retry3: Day 7
        }

        PaymentFailed --> GracePeriod: After 3 retries
        GracePeriod --> ActivePro: Update Payment Method
        GracePeriod --> Downgraded: Expired (15 days)
    }

    Downgraded --> FreeTier: Revert to Free Limits
    
    note right of HardLimit
        NgÆ°á»i dĂ¹ng váº«n xem/sá»­a dá»¯ liá»‡u cÅ©.
        Chá»‰ cháº·n táº¡o má»›i (Create Block).
    end note

    note right of GracePeriod
        Váº«n giá»¯ full tĂ­nh nÄƒng Pro.
        Hiá»ƒn thá»‹ cáº£nh bĂ¡o thanh toĂ¡n Ä‘á».
    end note
```
