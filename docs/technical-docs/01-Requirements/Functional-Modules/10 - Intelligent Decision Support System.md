**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
_Last updated: Dec 31, 2025_

---
# 1. Business Overview

Trong cĂ¡c há»‡ thá»‘ng quáº£n trá»‹ dá»± Ă¡n truyá»n thá»‘ng, viá»‡c ra quyáº¿t Ä‘á»‹nh (vĂ­ dá»¥: gĂ¡n viá»‡c cho ai, Æ°á»›c lÆ°á»£ng thá»i gian bao lĂ¢u) thÆ°á»ng dá»±a hoĂ n toĂ n vĂ o trá»±c giĂ¡c (Intuition-based) hoáº·c kinh nghiá»‡m chá»§ quan cá»§a ngÆ°á»i quáº£n lĂ½. Äiá»u nĂ y dá»… dáº«n Ä‘áº¿n cĂ¡c sai sá»‘ nhÆ° "Láº¡c quan quĂ¡ má»©c" (Optimism Bias) hoáº·c phĂ¢n bá»• nguá»“n lá»±c khĂ´ng Ä‘á»“ng Ä‘á»u.

PhĂ¢n há»‡ **Intelligent Decision Support System (IDSS)** cá»§a PronaFlow chuyá»ƒn Ä‘á»•i mĂ´ hĂ¬nh quáº£n trá»‹ sang **Data-Driven** (Dá»±a trĂªn dá»¯ liá»‡u). Báº±ng cĂ¡ch khai thĂ¡c kho dá»¯ liá»‡u lá»‹ch sá»­ khá»•ng lá»“ cá»§a dá»± Ă¡n thĂ´ng qua cĂ¡c thuáº­t toĂ¡n Há»c mĂ¡y (Machine Learning), phĂ¢n há»‡ nĂ y Ä‘Ă³ng vai trĂ² nhÆ° má»™t "Cá»‘ váº¥n áº£o", cung cáº¥p cĂ¡c tham sá»‘ khĂ¡ch quan Ä‘á»ƒ tá»‘i Æ°u hĂ³a quy trĂ¬nh ra quyáº¿t Ä‘á»‹nh.

# 2. User Stories & Acceptance Criteria

## 2.1. Feature: Predictive Task Estimation (Dá»± bĂ¡o Thá»i lÆ°á»£ng CĂ´ng viá»‡c)

### User Story 10.1

LĂ  má»™t Quáº£n lĂ½ dá»± Ă¡n, khi tĂ´i táº¡o má»™t Task má»›i, TĂ´i muá»‘n há»‡ thá»‘ng gá»£i Ă½ thá»i gian thá»±c hiá»‡n (Estimated Hours) dá»±a trĂªn Ä‘á»™ phá»©c táº¡p vĂ  lá»‹ch sá»­ cĂ¡c task tÆ°Æ¡ng tá»±, Äá»ƒ giáº£m thiá»ƒu viá»‡c Æ°á»›c lÆ°á»£ng sai lá»‡ch (Underestimation).

### Acceptance Criteria (#AC)

#### AC 1 - Inference Trigger

- **Event:** Ngay khi ngÆ°á»i dĂ¹ng nháº­p xong `Title`, `Description` vĂ  chá»n `Tags`.
    
- **Action:** Há»‡ thá»‘ng gá»­i request báº¥t Ä‘á»“ng bá»™ (Async Request) sang _Inference Service_.
    
- **Display:** Hiá»ƒn thá»‹ má»™t con sá»‘ gá»£i Ă½ (vĂ­ dá»¥: "Gá»£i Ă½: 4.5h") bĂªn cáº¡nh trÆ°á»ng nháº­p liá»‡u thá»i gian.
    

#### AC 2 - Confidence Interval (Khoáº£ng tin cáº­y)

- Há»‡ thá»‘ng khĂ´ng chá»‰ tráº£ vá» má»™t con sá»‘ Ä‘Æ¡n láº» (Point Estimate) mĂ  cung cáº¥p má»™t khoáº£ng tin cáº­y 95% (vĂ­ dá»¥: "3h - 6h") Ä‘á»ƒ ngÆ°á»i quáº£n lĂ½ biáº¿t má»©c Ä‘á»™ cháº¯c cháº¯n cá»§a mĂ´ hĂ¬nh.
    

## 2.2. Feature: Smart Assignee Recommendation (Gá»£i Ă½ PhĂ¢n cĂ´ng NhĂ¢n sá»±)

### User Story 10.2

LĂ  má»™t Quáº£n lĂ½ dá»± Ă¡n, TĂ´i muá»‘n há»‡ thá»‘ng Ä‘á» xuáº¥t danh sĂ¡ch nhĂ¢n sá»± phĂ¹ há»£p nháº¥t cho má»™t Ä‘áº§u viá»‡c cá»¥ thá»ƒ, dá»±a trĂªn ká»¹ nÄƒng vĂ  táº£i cĂ´ng viá»‡c hiá»‡n táº¡i cá»§a há», Äá»ƒ Ä‘áº£m báº£o "Ä‘Ăºng ngÆ°á»i Ä‘Ăºng viá»‡c".

### Acceptance Criteria (#AC)

#### AC 1 - Ranking Logic (Logic Xáº¿p háº¡ng)

- Há»‡ thá»‘ng tráº£ vá» danh sĂ¡ch Top 3 á»©ng viĂªn, Ä‘Æ°á»£c sáº¯p xáº¿p dá»±a trĂªn Ä‘iá»ƒm sá»‘ phĂ¹ há»£p (Matching Score).
    
- **Matching Score** Ä‘Æ°á»£c tĂ­nh toĂ¡n tá»•ng há»£p tá»«:
    
    1. **Skill Match:** Má»©c Ä‘á»™ khá»›p giá»¯a `Task Tags` (yĂªu cáº§u) vĂ  `User Skills`.
        
    2. **History Match:** User Ä‘Ă£ tá»«ng lĂ m cĂ¡c Task tÆ°Æ¡ng tá»± trong quĂ¡ khá»© chÆ°a?
        
    3. **Availability:** User cĂ³ Ä‘ang bá»‹ quĂ¡ táº£i (Overloaded) trong khoáº£ng thá»i gian dá»± kiáº¿n khĂ´ng?
        

#### AC 2 - Explanation (Kháº£ nÄƒng giáº£i thĂ­ch)

- Äi kĂ¨m vá»›i má»—i gá»£i Ă½ pháº£i cĂ³ lĂ½ do ngáº¯n gá»n (Explainable AI).
    
    - _VĂ­ dá»¥:_ "Nguyá»…n VÄƒn A (Score: 92% - ÄĂ£ lĂ m 5 task tÆ°Æ¡ng tá»±, Äang ráº£nh)".
        

## 2.3. Feature: Project Risk Anomaly Detection (PhĂ¡t hiá»‡n Báº¥t thÆ°á»ng Rá»§i ro)

### User Story 10.3

LĂ  má»™t Stakeholder, TĂ´i muá»‘n nháº­n Ä‘Æ°á»£c cáº£nh bĂ¡o sá»›m náº¿u má»™t dá»± Ă¡n Ä‘ang cĂ³ dáº¥u hiá»‡u Ä‘i chá»‡ch hÆ°á»›ng, ngay cáº£ khi tráº¡ng thĂ¡i trĂªn bĂ¡o cĂ¡o váº«n lĂ  "MĂ u xanh", Äá»ƒ ká»‹p thá»i can thiá»‡p.

### Acceptance Criteria (#AC)

#### AC 1 - Velocity Analysis (PhĂ¢n tĂ­ch Váº­n tá»‘c)

- Há»‡ thá»‘ng theo dĂµi tá»‘c Ä‘á»™ hoĂ n thĂ nh cĂ´ng viá»‡c (Burn-down rate) thá»±c táº¿ so vá»›i káº¿ hoáº¡ch.
    
- Náº¿u phĂ¡t hiá»‡n sá»± suy giáº£m Ä‘á»™t ngá»™t (Sudden Drop) hoáº·c sá»± Ä‘Ă¬nh trá»‡ kĂ©o dĂ i (Stagnation) vÆ°á»£t quĂ¡ ngÆ°á»¡ng cho phĂ©p (Threshold), há»‡ thá»‘ng kĂ­ch hoáº¡t cá» cáº£nh bĂ¡o rá»§i ro.
    

# 3. Business Rules & Technical Constraints

## 3.1. Quy táº¯c Báº£o máº­t Dá»¯ liá»‡u (Privacy-Preserving Rules)

- **Anonymization:** Khi huáº¥n luyá»‡n láº¡i mĂ´ hĂ¬nh (Re-training), dá»¯ liá»‡u Ä‘á»‹nh danh cĂ¡ nhĂ¢n (PII) nhÆ° TĂªn, Email pháº£i Ä‘Æ°á»£c mĂ£ hĂ³a hoáº·c loáº¡i bá». Chá»‰ giá»¯ láº¡i cĂ¡c Ä‘áº·c trÆ°ng hĂ nh vi (Behavioral Features).
    
- **Scope Isolation:** MĂ´ hĂ¬nh gá»£i Ă½ cho Workspace A chá»‰ Ä‘Æ°á»£c há»c tá»« dá»¯ liá»‡u cá»§a Workspace A (hoáº·c dá»¯ liá»‡u áº©n danh toĂ n cá»¥c), tuyá»‡t Ä‘á»‘i khĂ´ng Ä‘á»ƒ lá»™ dá»¯ liá»‡u nháº¡y cáº£m (Data Leakage) giá»¯a cĂ¡c Ä‘á»‘i thá»§ cáº¡nh tranh dĂ¹ng chung há»‡ thá»‘ng.
    

## 3.2. Quy táº¯c NgÆ°á»¡ng tin cáº­y (Confidence Threshold)

- Äá»ƒ trĂ¡nh gĂ¢y nhiá»…u, há»‡ thá»‘ng chá»‰ hiá»ƒn thá»‹ gá»£i Ă½ khi MĂ´ hĂ¬nh AI Ä‘áº¡t Ä‘á»™ tin cáº­y > **70%**.
    
- Náº¿u Ä‘á»™ tin cáº­y tháº¥p hÆ¡n, UI sáº½ áº©n pháº§n gá»£i Ă½ vĂ  Ä‘á»ƒ ngÆ°á»i dĂ¹ng tá»± quyáº¿t Ä‘á»‹nh (Fallback to Manual).
    

# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)

## 4.1. Há»“i quy Tuyáº¿n tĂ­nh & Phi tuyáº¿n (Regression Analysis)

Ăp dá»¥ng cho bĂ i toĂ¡n **Dá»± bĂ¡o Thá»i lÆ°á»£ng (Feature 10.1)**.

- **MĂ´ hĂ¬nh:** Sá»­ dá»¥ng thuáº­t toĂ¡n _Gradient Boosting Regressor_ (nhÆ° XGBoost hoáº·c LightGBM) vĂ¬ kháº£ nÄƒng xá»­ lĂ½ tá»‘t cáº£ dá»¯ liá»‡u sá»‘ (sá»‘ lÆ°á»£ng subtask) vĂ  dá»¯ liá»‡u phĂ¢n loáº¡i (Tags, Priority).
    
- **Input Features:** Äá»™ dĂ i mĂ´ táº£ (Word count), Sá»‘ lÆ°á»£ng Subtask, Tags, Äá»™ Æ°u tiĂªn.
    
- **Target Variable:** Thá»i gian thá»±c táº¿ hoĂ n thĂ nh (Actual Duration).
    

## 4.2. Há»‡ gá»£i Ă½ dá»±a trĂªn Ná»™i dung (Content-based Filtering)

Ăp dá»¥ng cho bĂ i toĂ¡n **Gá»£i Ă½ NhĂ¢n sá»± (Feature 10.2)**.

- **NguyĂªn lĂ½:** XĂ¢y dá»±ng Vector Ä‘áº·c trÆ°ng (Feature Vector) cho Task vĂ  cho User trong cĂ¹ng má»™t khĂ´ng gian n chiá»u.
    
- **Thuáº­t toĂ¡n:** Sá»­ dá»¥ng Ä‘á»™ tÆ°Æ¡ng Ä‘á»“ng Cosine (Cosine Similarity) Ä‘á»ƒ Ä‘o khoáº£ng cĂ¡ch giá»¯a Vector Task vĂ  Vector User.
    
    $$Similarity(A, B) = \frac{A \cdot B}{||A|| \times ||B||}$$
- NgÆ°á»i cĂ³ Vector ká»¹ nÄƒng gáº§n nháº¥t vá»›i Vector yĂªu cáº§u cá»§a Task sáº½ Ä‘Æ°á»£c gá»£i Ă½ cao nháº¥t.
    

## 4.3. Kiá»ƒm soĂ¡t QuĂ¡ trĂ¬nh Thá»‘ng kĂª (Statistical Process Control - SPC)

Ăp dá»¥ng cho bĂ i toĂ¡n **PhĂ¡t hiá»‡n Báº¥t thÆ°á»ng (Feature 10.3)**.

- Sá»­ dá»¥ng biá»ƒu Ä‘á»“ kiá»ƒm soĂ¡t (Control Charts) Ä‘á»ƒ theo dĂµi tiáº¿n Ä‘á»™ dá»± Ă¡n.
    
- Má»i Ä‘iá»ƒm dá»¯ liá»‡u (Tiáº¿n Ä‘á»™ ngĂ y) náº±m ngoĂ i giá»›i háº¡n kiá»ƒm soĂ¡t trĂªn/dÆ°á»›i (Upper/Lower Control Limits - $3\sigma$) Ä‘á»u Ä‘Æ°á»£c coi lĂ  "Báº¥t thÆ°á»ng" (Anomaly) cáº§n cáº£nh bĂ¡o, thay vĂ¬ chá»‰ dá»±a vĂ o cáº£m tĂ­nh.
