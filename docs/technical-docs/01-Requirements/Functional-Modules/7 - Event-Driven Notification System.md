**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
_Last updated: Dec 31, 2025_

---
# 1. Business Overview
Trong má»™t há»‡ thá»‘ng cá»™ng tĂ¡c thá»i gian thá»±c nhÆ° PronaFlow, viá»‡c thĂ´ng bĂ¡o ká»‹p thá»i lĂ  yáº¿u tá»‘ sá»‘ng cĂ²n. Tuy nhiĂªn, ranh giá»›i giá»¯a "ThĂ´ng tin há»¯u Ă­ch" vĂ  "Spam" ráº¥t mong manh. Má»™t há»‡ thá»‘ng tá»“i sáº½ gá»­i email cho má»—i láº§n sá»­a lá»—i chĂ­nh táº£, dáº«n Ä‘áº¿n hiá»‡n tÆ°á»£ng **Má»‡t má»i vĂ¬ thĂ´ng bĂ¡o (Notification Fatigue)**.
PhĂ¢n há»‡ sá»‘ 7 Ä‘Æ°á»£c xĂ¢y dá»±ng dá»±a trĂªn kiáº¿n trĂºc **Event-Driven Architecture (EDA)**. Thay vĂ¬ cĂ¡c Module gá»i nhau trá»±c tiáº¿p (Synchronous), chĂºng sáº½ phĂ¡t ra cĂ¡c sá»± kiá»‡n (Events) vĂ o má»™t Message Broker trung gian (Redis/RabbitMQ). Notification Service Ä‘Ă³ng vai trĂ² lĂ  "Consumer", láº¯ng nghe, lá»c, gá»™p vĂ  phĂ¢n phá»‘i thĂ´ng bĂ¡o Ä‘áº¿n ngÆ°á»i dĂ¹ng qua kĂªnh phĂ¹ há»£p nháº¥t.
**Má»¥c tiĂªu thiáº¿t káº¿:** "ÄĂºng ngÆ°á»i - ÄĂºng lĂºc - ÄĂºng kĂªnh" (Right Person, Right Time, Right Channel).
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Intelligent Aggregation (Gá»™p thĂ´ng bĂ¡o thĂ´ng minh)
### User Story 7.1
LĂ  má»™t NgÆ°á»i dĂ¹ng báº­n rá»™n, TĂ´i muá»‘n nháº­n Ä‘Æ°á»£c má»™t thĂ´ng bĂ¡o tĂ³m táº¯t thay vĂ¬ hĂ ng loáº¡t thĂ´ng bĂ¡o rá»i ráº¡c khi ai Ä‘Ă³ thá»±c hiá»‡n nhiá»u thao tĂ¡c nhá» liĂªn tiáº¿p, Äá»ƒ há»™p thÆ° cá»§a tĂ´i khĂ´ng bá»‹ quĂ¡ táº£i (Inbox Zero).
### Acceptance Criteria (#AC)
#### AC 1 - Debounce Logic (Thuáº­t toĂ¡n chá»‘ng rung)
- **Scenario:** User A sá»­a Title, sau Ä‘Ă³ sá»­a Description, rá»“i Ä‘á»•i Due Date cá»§a cĂ¹ng má»™t Task trong vĂ²ng 1 phĂºt.
- **System Behavior:** Há»‡ thá»‘ng khĂ´ng gá»­i 3 thĂ´ng bĂ¡o. NĂ³ chá» má»™t khoáº£ng thá»i gian Ä‘á»‡m (Buffer Time, vĂ­ dá»¥: 2 phĂºt). Sau khi khĂ´ng cĂ³ hĂ nh Ä‘á»™ng má»›i, nĂ³ gá»­i 1 thĂ´ng bĂ¡o duy nháº¥t: _"User A Ä‘Ă£ cáº­p nháº­t 3 thuá»™c tĂ­nh cá»§a Task X"_.
#### AC 2 - Batching (Gom nhĂ³m)
- **Display:** Trong menu thĂ´ng bĂ¡o In-app, cĂ¡c thĂ´ng bĂ¡o cĂ¹ng loáº¡i pháº£i Ä‘Æ°á»£c nhĂ³m láº¡i.
    - _Bad:_ `[DĂ²ng 1: A like comment]`, `[DĂ²ng 2: B like comment]`, `[DĂ²ng 3: C like comment]`.
    - _Good:_ "A, B vĂ  C Ä‘Ă£ thĂ­ch bĂ¬nh luáº­n cá»§a báº¡n."
## 2.2. Feature: Real-time Delivery & Fallback (Chuyá»ƒn phĂ¡t thá»i gian thá»±c & Dá»± phĂ²ng)
### User Story 7.2
LĂ  má»™t NgÆ°á»i quáº£n lĂ½, TĂ´i muá»‘n biáº¿t ngay láº­p tá»©c khi má»™t dá»± Ă¡n chuyá»ƒn sang tráº¡ng thĂ¡i "Rá»§i ro", nhÆ°ng náº¿u tĂ´i khĂ´ng online, hĂ£y gá»­i email cho tĂ´i.
### Acceptance Criteria ( #AC)
#### AC 1 - Presence Awareness Routing (Äá»‹nh tuyáº¿n theo hiá»‡n diá»‡n)
- **Logic:**
    - IF `User.is_online == true`: Gá»­i qua **WebSocket** (Toast Notification gĂ³c mĂ n hĂ¬nh). KhĂ´ng gá»­i Email.
    - IF `User.is_online == false`: Gá»­i qua **Email** hoáº·c **Mobile Push**.
- **Benefit:** TrĂ¡nh lĂ m phiá»n ngÆ°á»i dĂ¹ng báº±ng email khi há» Ä‘ang ngá»“i ngay trÆ°á»›c mĂ n hĂ¬nh á»©ng dá»¥ng.
#### AC 2 - Ephemeral vs. Persistent (Táº¡m thá»i vs. VÄ©nh viá»…n)
- CĂ¡c thĂ´ng bĂ¡o dáº¡ng "Toast" (User A Ä‘ang nháº­p liá»‡u...) lĂ  táº¡m thá»i (Ephemeral), khĂ´ng lÆ°u vĂ o Database.
- CĂ¡c thĂ´ng bĂ¡o nghiá»‡p vá»¥ (User A gĂ¡n task cho báº¡n) lĂ  vÄ©nh viá»…n (Persistent), pháº£i lÆ°u vĂ o Database Ä‘á»ƒ xem láº¡i trong History.
## 2.3. Feature: Unsubscribe Strategy (Chiáº¿n lÆ°á»£c Há»§y Ä‘Äƒng kĂ½)
### User Story 7.3
LĂ  má»™t NgÆ°á»i dĂ¹ng, TĂ´i muá»‘n dá»… dĂ ng táº¯t thĂ´ng bĂ¡o tá»« má»™t Task cá»¥ thá»ƒ mĂ  tĂ´i khĂ´ng cĂ²n quan tĂ¢m, ngay cáº£ khi tĂ´i váº«n lĂ  thĂ nh viĂªn dá»± Ă¡n.
### Acceptance Criteria (#AC)
#### AC 1 - Granular Subscription
- Má»—i Task/Project cĂ³ má»™t nĂºt "Watch/Unwatch" (hĂ¬nh con máº¯t).
- Há»‡ thá»‘ng tĂ´n trá»ng quyá»n nĂ y cao hÆ¡n quyá»n thĂ nh viĂªn. Náº¿u User chá»n "Unwatch", há» sáº½ khĂ´ng nháº­n thĂ´ng bĂ¡o trá»« khi Ä‘Æ°á»£c @mention trá»±c tiáº¿p.

## 2.4. Feature: Notification Templating Engine (CĂ´ng cá»¥ Quáº£n lĂ½ Máº«u)

### User Story 7.4

LĂ  má»™t System Admin, TĂ´i muá»‘n Ä‘á»‹nh nghÄ©a ná»™i dung thĂ´ng bĂ¡o thĂ´ng qua cĂ¡c máº«u (Templates) há»— trá»£ Ä‘a ngĂ´n ngá»¯ vĂ  biáº¿n Ä‘á»™ng, Äá»ƒ dá»… dĂ ng thay Ä‘á»•i ná»™i dung marketing hoáº·c cáº£nh bĂ¡o há»‡ thá»‘ng mĂ  khĂ´ng cáº§n sá»­a code (Hard-code) vĂ  deploy láº¡i server.

### Acceptance Criteria (#AC)

#### AC 1 - Variable Injection (TiĂªm biáº¿n)

- **Mechanism:** Sá»­ dá»¥ng cĂº phĂ¡p Mustache hoáº·c Jinja2.
    
    - _Template:_ `Hello {{user_name}}, task {{task_title}} is due in {{hours}} hours.`
        
    - _Data:_ `{user_name: "Truc", task_title: "Fix Bug UI", hours: 2}`
        
    - _Output:_ "Hello Truc, task Fix Bug UI is due in 2 hours."
        

#### AC 2 - Localization Support (Há»— trá»£ Äa ngá»¯)

- Há»‡ thá»‘ng tá»± Ä‘á»™ng chá»n Template phĂ¹ há»£p dá»±a trĂªn cĂ i Ä‘áº·t ngĂ´n ngá»¯ (`user_lang`) cá»§a ngÆ°á»i nháº­n (Receiver).
    
- Náº¿u khĂ´ng tĂ¬m tháº¥y máº«u tiáº¿ng Viá»‡t, tá»± Ä‘á»™ng fallback vá» tiáº¿ng Anh.
    

## 2.5. Feature: Interaction Tracking (Theo dĂµi TÆ°Æ¡ng tĂ¡c)

### User Story 7.5

LĂ  má»™t Product Manager, TĂ´i muá»‘n biáº¿t tá»· lá»‡ má»Ÿ (Open Rate) vĂ  tá»· lá»‡ click (CTR) cá»§a cĂ¡c thĂ´ng bĂ¡o, Äá»ƒ Ä‘Ă¡nh giĂ¡ hiá»‡u quáº£ cá»§a há»‡ thá»‘ng vĂ  tinh chá»‰nh chiáº¿n lÆ°á»£c gá»­i tin.

### Acceptance Criteria (#AC)

#### AC 1 - Read Receipts (BĂ¡o Ä‘Ă£ xem)

- **Logic:** Khi ngÆ°á»i dĂ¹ng má»Ÿ danh sĂ¡ch thĂ´ng bĂ¡o hoáº·c click vĂ o thĂ´ng bĂ¡o Toast.
    
- **Action:** Gá»­i sá»± kiá»‡n `mark_as_read` lĂªn server. Biá»ƒu tÆ°á»£ng "cháº¥m Ä‘á»" (Unread Badge) pháº£i biáº¿n máº¥t tá»©c thĂ¬ trĂªn táº¥t cáº£ cĂ¡c thiáº¿t bá»‹ khĂ¡c cá»§a ngÆ°á»i dĂ¹ng Ä‘Ă³ (Cross-device Sync).
    

#### AC 2 - Actionable Notifications

- Cho phĂ©p Ä‘Ă­nh kĂ¨m hĂ nh Ä‘á»™ng nhanh (Quick Actions) ngay trong thĂ´ng bĂ¡o Push/Email (vĂ­ dá»¥: nĂºt "Approve", "Reply").
    
- Ghi nháº­n log khi ngÆ°á»i dĂ¹ng tÆ°Æ¡ng tĂ¡c qua cĂ¡c nĂºt nĂ y.
# 3. Business Rules & Technical Constraints
## 3.1. CÆ¡ cháº¿ Thá»­ láº¡i (Retry Mechanism & Exponential Backoff)
Do phá»¥ thuá»™c vĂ o cĂ¡c dá»‹ch vá»¥ bĂªn thá»© 3 (SMTP Server cho Email, Firebase cho Push), viá»‡c gá»­i tháº¥t báº¡i lĂ  Ä‘iá»u khĂ´ng trĂ¡nh khá»i.
- **Rule:** Náº¿u gá»­i Email tháº¥t báº¡i, há»‡ thá»‘ng pháº£i tá»± Ä‘á»™ng thá»­ láº¡i tá»‘i Ä‘a 3 láº§n.
- **Backoff:** Thá»i gian chá» giá»¯a cĂ¡c láº§n thá»­ tÄƒng theo cáº¥p sá»‘ nhĂ¢n: 1s -> 5s -> 25s. Náº¿u sau 3 láº§n váº«n lá»—i -> Ghi log lá»—i vĂ  Ä‘Ă¡nh dáº¥u thĂ´ng bĂ¡o lĂ  "Failed".
## 3.2. TĂ­nh cháº¥t Idempotency (Báº¥t biáº¿n)
- **Váº¥n Ä‘á»:** Trong kiáº¿n trĂºc phĂ¢n tĂ¡n, má»™t sá»± kiá»‡n cĂ³ thá»ƒ bá»‹ gá»­i trĂ¹ng láº·p (Duplicate Events).
- **Giáº£i phĂ¡p:** Notification Service pháº£i kiá»ƒm tra `Event_ID`. Náº¿u `Event_ID` nĂ y Ä‘Ă£ Ä‘Æ°á»£c xá»­ lĂ½, há»‡ thá»‘ng pháº£i bá» qua Ä‘á»ƒ Ä‘áº£m báº£o ngÆ°á»i dĂ¹ng khĂ´ng bao giá» nháº­n 2 email giá»‘ng há»‡t nhau.
## 3.3. Báº£o máº­t ná»™i dung (Security)

- **Email Body:** KhĂ´ng bao giá» chá»©a thĂ´ng tin nháº¡y cáº£m (Máº­t kháº©u, Dá»¯ liá»‡u tĂ i chĂ­nh) trong ná»™i dung Email. Chá»‰ gá»­i Ä‘Æ°á»ng dáº«n an toĂ n (Secure Link) trá» vá» á»©ng dá»¥ng PronaFlow.
## 3.4. Quy táº¯c HĂ ng Ä‘á»£i Æ¯u tiĂªn (Priority Queues & QoS)

KhĂ´ng pháº£i táº¥t cáº£ thĂ´ng bĂ¡o Ä‘á»u bĂ¬nh Ä‘áº³ng. Há»‡ thá»‘ng phĂ¢n chia 3 lĂ n Ä‘Æ°á»ng xá»­ lĂ½ (Processing Lanes):
1. **High Priority (Critical):** Cáº£nh bĂ¡o báº£o máº­t, Lá»—i há»‡ thá»‘ng, SLA Breach.
    - _QoS:_ Gá»­i ngay láº­p tá»©c (< 1s). Bá» qua logic Debounce.
2. **Medium Priority (Transactional):** Mention, Task Assignment.
    - _QoS:_ Gá»­i trong vĂ²ng 5-10s. Ăp dá»¥ng Debounce.
3. **Low Priority (Promotional/Bulk):** Báº£n tin tuáº§n (Weekly Digest), Lá»i nháº¯c chung.
    - _QoS:_ Xá»­ lĂ½ khi tĂ i nguyĂªn ráº£nh rá»—i (Background Jobs).
## 3.5. Quy táº¯c TTL (Time-To-Live)
- Äá»‘i vá»›i cĂ¡c thĂ´ng bĂ¡o cĂ³ tĂ­nh thá»i Ä‘iá»ƒm (vĂ­ dá»¥: "Cuá»™c há»p báº¯t Ä‘áº§u trong 5 phĂºt"), náº¿u vĂ¬ lĂ½ do ká»¹ thuáº­t mĂ  sau 30 phĂºt má»›i gá»­i Ä‘Æ°á»£c, há»‡ thá»‘ng pháº£i **Há»§y bá» (Discard)** thĂ´ng bĂ¡o Ä‘Ă³.
- _LĂ½ do:_ Viá»‡c nháº­n thĂ´ng bĂ¡o há»p khi cuá»™c há»p Ä‘Ă£ káº¿t thĂºc gĂ¢y tráº£i nghiá»‡m tiĂªu cá»±c (Negative UX).
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. MĂ´ hĂ¬nh Observer (Observer Pattern - GoF)
ÄĂ¢y lĂ  Design Pattern ná»n táº£ng cho module nĂ y.
- **Subject:** LĂ  cĂ¡c thá»±c thá»ƒ nghiá»‡p vá»¥ (Task, Project).
- **Observer:** LĂ  cĂ¡c User Ä‘ang theo dĂµi (Watchers).
- **Lá»£i Ă­ch:** Giáº£m sá»± phá»¥ thuá»™c cháº·t cháº½ (Decoupling). Module "Quáº£n lĂ½ Task" khĂ´ng cáº§n biáº¿t ai Ä‘ang theo dĂµi nĂ³, nĂ³ chá»‰ cáº§n báº¯n sá»± kiá»‡n "Task Updated". Module Notification sáº½ lo pháº§n cĂ²n láº¡i.
## 4.2. LĂ½ thuyáº¿t TĂ­n hiá»‡u (Signal Detection Theory)
LĂ½ thuyáº¿t nĂ y phĂ¢n biá»‡t giá»¯a "TĂ­n hiá»‡u" (ThĂ´ng tin quan trá»ng) vĂ  "Nhiá»…u" (ThĂ´ng tin vĂ´ giĂ¡ trá»‹).
- **Ăp dá»¥ng:** CĂ¡c tĂ­nh nÄƒng _Debounce_ vĂ  _Aggregation_ (AC 7.1) Ä‘Æ°á»£c thiáº¿t káº¿ Ä‘á»ƒ tÄƒng **Tá»· lá»‡ TĂ­n hiá»‡u trĂªn Nhiá»…u (Signal-to-Noise Ratio)**. Má»™t há»‡ thá»‘ng cĂ³ tá»· lá»‡ nĂ y cao sáº½ gia tÄƒng lĂ²ng tin cá»§a ngÆ°á»i dĂ¹ng; ngÆ°á»£c láº¡i, há» sáº½ phá»›t lá» hoáº·c táº¯t toĂ n bá»™ thĂ´ng bĂ¡o (Desensitization).
## 4.3. MĂ´ hĂ¬nh HĂ nh vi Fogg (Fogg Behavior Model)
$$B = MAP$$
(Behavior = Motivation + Ability + Prompt).
- **Prompt (Lá»i nháº¯c):** ThĂ´ng bĂ¡o chĂ­nh lĂ  Prompt.
- **Ăp dá»¥ng:** Äá»ƒ thĂ´ng bĂ¡o dáº«n Ä‘áº¿n hĂ nh Ä‘á»™ng (vĂ­ dá»¥: VĂ o review code), nĂ³ pháº£i xuáº¥t hiá»‡n khi ngÆ°á»i dĂ¹ng cĂ³ Ä‘á»§ Äá»™ng lá»±c vĂ  Kháº£ nÄƒng. Viá»‡c _Routing theo hiá»‡n diá»‡n_ (AC 7.2) Ä‘áº£m báº£o Prompt xuáº¥t hiá»‡n á»Ÿ nÆ¡i ngÆ°á»i dĂ¹ng dá»… tiáº¿p cáº­n nháº¥t (Ability cao nháº¥t), lĂ m tÄƒng xĂ¡c suáº¥t chuyá»ƒn Ä‘á»•i hĂ nh vi.
## 4.4. Äá»‹nh luáº­t Hick vá» Pháº£n há»“i (Hick's Law in Feedback)
Máº·c dĂ¹ Äá»‹nh luáº­t Hick thÆ°á»ng nĂ³i vá» viá»‡c ra quyáº¿t Ä‘á»‹nh, trong ngá»¯ cáº£nh thĂ´ng bĂ¡o, nĂ³ liĂªn quan Ä‘áº¿n **Äá»™ phá»©c táº¡p cá»§a hĂ nh Ä‘á»™ng**.
- **Ăp dá»¥ng:** TĂ­nh nÄƒng _Actionable Notifications_ (AC 7.5) giĂºp giáº£m thiá»ƒu sá»‘ bÆ°á»›c thao tĂ¡c. Thay vĂ¬ pháº£i [Click thĂ´ng bĂ¡o -> Chá» má»Ÿ App -> TĂ¬m nĂºt Approve], ngÆ°á»i dĂ¹ng cĂ³ thá»ƒ Approve ngay tá»« mĂ n hĂ¬nh khĂ³a. Äiá»u nĂ y giáº£m "ma sĂ¡t" (Friction), tÄƒng tá»‘c Ä‘á»™ pháº£n há»“i chung cá»§a quy trĂ¬nh cá»™ng tĂ¡c.
## 4.5. MĂ´ hĂ¬nh CAP (CAP Theorem) trong Thiáº¿t káº¿ PhĂ¢n tĂ¡n
Äá»‘i vá»›i Notification System, chĂºng ta Æ°u tiĂªn **Availability (TĂ­nh sáºµn sĂ ng)** vĂ  **Partition Tolerance (Kháº£ nÄƒng chá»‹u lá»—i phĂ¢n vĂ¹ng)** hÆ¡n lĂ  Consistency (TĂ­nh nháº¥t quĂ¡n tá»©c thĂ¬).
- **Giáº£i thĂ­ch:** Cháº¥p nháº­n viá»‡c tráº¡ng thĂ¡i "ÄĂ£ Ä‘á»c" cĂ³ thá»ƒ khĂ´ng Ä‘á»“ng bá»™ tá»©c thĂ¬ giá»¯a Mobile vĂ  Desktop trong vĂ i giĂ¢y (Eventual Consistency), miá»…n lĂ  thĂ´ng bĂ¡o luĂ´n Ä‘Æ°á»£c gá»­i Ä‘i thĂ nh cĂ´ng.
