**Project**: PronaFlow
**Version**: 1.0
**State**: Draft
***Last updated:** Dec 31, 2025*

---
# 1. Business Overview
Trong ká»· nguyĂªn "Product-led Growth", kháº£ nÄƒng tá»± phá»¥c vá»¥ (Self-service) cá»§a ngÆ°á»i dĂ¹ng lĂ  yáº¿u tá»‘ then chá»‘t Ä‘á»ƒ má»Ÿ rá»™ng quy mĂ´ mĂ  khĂ´ng lĂ m phĂ¬nh to bá»™ pháº­n Customer Support. Khi ngÆ°á»i dĂ¹ng gáº·p khĂ³ khÄƒn, há» muá»‘n cĂ³ cĂ¢u tráº£ lá»i ngay láº­p tá»©c (Instant Gratification) thay vĂ¬ chá» Ä‘á»£i pháº£n há»“i qua Email hay Ticket.
PhĂ¢n há»‡ **Help Center & Knowledge Base** cá»§a PronaFlow Ä‘Æ°á»£c thiáº¿t káº¿ vá»›i triáº¿t lĂ½ **"Just-in-Time Learning"** (Há»c ngay khi cáº§n). Há»‡ thá»‘ng khĂ´ng chá»‰ cung cáº¥p má»™t thÆ° viá»‡n tĂ i liá»‡u thá»¥ Ä‘á»™ng, mĂ  cĂ²n chá»§ Ä‘á»™ng phĂ¢n phá»‘i thĂ´ng tin phĂ¹ há»£p vá»›i ngá»¯ cáº£nh (Context-aware) mĂ  ngÆ°á»i dĂ¹ng Ä‘ang thao tĂ¡c.
Má»¥c tiĂªu cá»‘t lĂµi:
1. **Deflection:** Giáº£m 30-50% lÆ°á»£ng Support Ticket báº±ng cĂ¡ch giáº£i quyáº¿t váº¥n Ä‘á» ngay táº¡i nguá»“n.
2. **Enablement:** GiĂºp ngÆ°á»i dĂ¹ng khai thĂ¡c tá»‘i Ä‘a cĂ¡c tĂ­nh nÄƒng nĂ¢ng cao (nhÆ° AI Prediction, Advanced Reports) thĂ´ng qua tĂ i liá»‡u hÆ°á»›ng dáº«n chi tiáº¿t.
# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Contextual Help Widget (Widget Há»— trá»£ Ngá»¯ cáº£nh)
### User Story 15.1
LĂ  má»™t NgÆ°á»i dĂ¹ng má»›i, khi tĂ´i Ä‘ang á»Ÿ mĂ n hĂ¬nh "Cáº¥u hĂ¬nh Billing", TĂ´i muá»‘n há»‡ thá»‘ng gá»£i Ă½ ngay cĂ¡c bĂ i viáº¿t liĂªn quan Ä‘áº¿n thanh toĂ¡n mĂ  khĂ´ng cáº§n pháº£i má»Ÿ tab má»›i Ä‘á»ƒ tĂ¬m kiáº¿m.
### Acceptance Criteria (#AC)
#### AC 1 - Route-based Suggestion (Gá»£i Ă½ dá»±a trĂªn Ä‘á»‹nh tuyáº¿n)
- **Logic:** Há»‡ thá»‘ng mapping `Current URL Route` vá»›i `Article Tags`.
 - VĂ­ dá»¥: User Ä‘ang á»Ÿ `/settings/billing` -> Widget hiá»ƒn thá»‹: "CĂ¡ch thĂªm tháº» tĂ­n dá»¥ng", "ChĂ­nh sĂ¡ch hoĂ n tiá»n".
 - User Ä‘ang á»Ÿ `/projects/kanban` -> Widget hiá»ƒn thá»‹: "CĂ¡ch kĂ©o tháº£ task", "Thiáº¿t láº­p WIP Limit".
#### AC 2 - Embedded Reader
- Khi click vĂ o bĂ i viáº¿t gá»£i Ă½, ná»™i dung má»Ÿ ra trong má»™t Panel trÆ°á»£t (Slide-over) hoáº·c Modal ngay trĂªn giao diá»‡n hiá»‡n táº¡i. NgÆ°á»i dĂ¹ng vá»«a Ä‘á»c vá»«a thao tĂ¡c Ä‘Æ°á»£c.
## 2.2. Feature: Semantic Search with AI (TĂ¬m kiáº¿m Ngá»¯ nghÄ©a)
### User Story 15.2
LĂ  má»™t NgÆ°á»i dĂ¹ng khĂ´ng rĂ nh ká»¹ thuáº­t, TĂ´i muá»‘n gĂµ cĂ¢u há»i báº±ng ngĂ´n ngá»¯ tá»± nhiĂªn (vĂ­ dá»¥: "LĂ m sao Ä‘á»ƒ Ä‘á»•i mĂ u dá»± Ă¡n?"), vĂ  há»‡ thá»‘ng váº«n tráº£ vá» bĂ i viáº¿t "HÆ°á»›ng dáº«n tĂ¹y biáº¿n Project Theme" dĂ¹ khĂ´ng khá»›p tá»« khĂ³a chĂ­nh xĂ¡c.
### Acceptance Criteria (#AC)
#### AC 1 - Vector Embeddings
- **Mechanism:** Sá»­ dá»¥ng **Vector Search** (tĂ­ch há»£p qua Module 10 hoáº·c Service bĂªn thá»© 3 nhÆ° Algolia/Pinecone).
- Há»‡ thá»‘ng so sĂ¡nh vector cá»§a cĂ¢u truy váº¥n (Query) vá»›i vector cá»§a ná»™i dung bĂ i viáº¿t Ä‘á»ƒ tĂ¬m Ä‘á»™ tÆ°Æ¡ng Ä‘á»“ng vá» Ă½ nghÄ©a (Semantic Similarity), thay vĂ¬ chá»‰ so khá»›p chuá»—i kĂ½ tá»± (Lexical Search).
#### AC 2 - Snippet Highlighting
- Káº¿t quáº£ tĂ¬m kiáº¿m pháº£i trĂ­ch dáº«n (Highlight) Ä‘oáº¡n vÄƒn báº£n tráº£ lá»i trá»±c tiáº¿p cho cĂ¢u há»i, giĂºp ngÆ°á»i dĂ¹ng khĂ´ng pháº£i Ä‘á»c toĂ n bá»™ bĂ i viáº¿t dĂ i.
## 2.3. Feature: Documentation CMS (Há»‡ thá»‘ng Quáº£n trá»‹ Ná»™i dung)
### User Story 15.3
LĂ  má»™t **Content Admin** (xem Module 14), TĂ´i muá»‘n soáº¡n tháº£o, Ä‘á»‹nh dáº¡ng vĂ  xuáº¥t báº£n cĂ¡c bĂ i hÆ°á»›ng dáº«n cĂ³ chá»©a hĂ¬nh áº£nh vĂ  video minh há»a, Äá»ƒ xĂ¢y dá»±ng kho tri thá»©c cho ngÆ°á»i dĂ¹ng.
### Acceptance Criteria (#AC)
#### AC 1 - Rich Text Editor
- TĂ­ch há»£p trĂ¬nh soáº¡n tháº£o WYSIWYG (nhÆ° TipTap hoáº·c CKEditor) há»— trá»£:
 - Block code (cho developer).
 - Embed Video (YouTube/Loom).
 - Callout Blocks (Note, Warning, Info).
#### AC 2 - Versioning & Localization
- **Versioning:** Má»—i bĂ i viáº¿t cĂ³ thá»ƒ cĂ³ nhiá»u phiĂªn báº£n (v1.0, v2.0) tÆ°Æ¡ng á»©ng vá»›i phiĂªn báº£n pháº§n má»m.
- **Localization:** Má»™t bĂ i viáº¿t gá»‘c (English) cĂ³ thá»ƒ cĂ³ nhiá»u báº£n dá»‹ch (Vietnamese, Japanese). Há»‡ thá»‘ng tá»± Ä‘á»™ng hiá»ƒn thá»‹ báº£n ngá»¯ phĂ¹ há»£p vá»›i cĂ i Ä‘áº·t cá»§a ngÆ°á»i dĂ¹ng (Module 9).
## 2.4. Feature: Feedback Loop (VĂ²ng láº·p Pháº£n há»“i)
### User Story 15.4
LĂ  má»™t Product Manager, TĂ´i muá»‘n biáº¿t bĂ i viáº¿t nĂ o há»¯u Ă­ch vĂ  bĂ i viáº¿t nĂ o cáº§n cáº£i thiá»‡n, Äá»ƒ tá»‘i Æ°u hĂ³a cháº¥t lÆ°á»£ng tĂ i liá»‡u.
### Acceptance Criteria (#AC)
#### AC 1 - Sentiment Interaction
- Cuá»‘i má»—i bĂ i viáº¿t cĂ³ cĂ¢u há»i: _"BĂ i viáº¿t nĂ y cĂ³ há»¯u Ă­ch khĂ´ng?"_ (Yes/No).
- Náº¿u chá»n "No", hiá»ƒn thá»‹ textbox tĂ¹y chá»n Ä‘á»ƒ ngÆ°á»i dĂ¹ng gĂ³p Ă½ (vĂ­ dá»¥: "áº¢nh minh há»a bá»‹ lá»—i", "HÆ°á»›ng dáº«n khĂ³ hiá»ƒu").
#### AC 2 - Effectiveness Reporting
- Dashboard thá»‘ng kĂª:
 - **Top Viewed:** BĂ i viáº¿t Ä‘Æ°á»£c Ä‘á»c nhiá»u nháº¥t.
 - **Helpfulness Score:** Tá»· lá»‡ Yes/(Yes+No).
 - **Failed Searches:** CĂ¡c tá»« khĂ³a ngÆ°á»i dĂ¹ng tĂ¬m kiáº¿m nhÆ°ng khĂ´ng tráº£ vá» káº¿t quáº£ (Ä‘á»ƒ Content Team viáº¿t bá»• sung).
# 3. Business Rules & Technical Constraints
## 3.1. Quy táº¯c Quyá»n truy cáº­p (Access Visibility)
- **Public KB:** CĂ¡c bĂ i viáº¿t hÆ°á»›ng dáº«n sá»­ dá»¥ng cÆ¡ báº£n, FAQ Ä‘Æ°á»£c láº­p chá»‰ má»¥c (Index) bá»Ÿi Google Ä‘á»ƒ há»— trá»£ SEO.
- **Private/Internal KB:** CĂ¡c tĂ i liá»‡u vá» quy trĂ¬nh ná»™i bá»™, chĂ­nh sĂ¡ch báº£o máº­t nĂ¢ng cao chá»‰ hiá»ƒn thá»‹ cho ngÆ°á»i dĂ¹ng Ä‘Ă£ Ä‘Äƒng nháº­p (Logged-in Users) hoáº·c thuá»™c nhĂ³m Enterprise.
## 3.2. Quy táº¯c Äá»“ng bá»™ hĂ³a (Synchronization)
- Khi má»™t tĂ­nh nÄƒng má»›i Ä‘Æ°á»£c **Product Admin** báº­t thĂ´ng qua Feature Flag (Module 14), cĂ¡c tĂ i liá»‡u liĂªn quan Ä‘áº¿n tĂ­nh nÄƒng Ä‘Ă³ (Ä‘ang á»Ÿ tráº¡ng thĂ¡i Draft) pháº£i Ä‘Æ°á»£c tá»± Ä‘á»™ng Publish hoáº·c hiá»ƒn thá»‹ thĂ´ng bĂ¡o nháº¯c nhá»Ÿ Content Admin xuáº¥t báº£n.
## 3.3. Hiá»‡u nÄƒng TĂ¬m kiáº¿m
- Thá»i gian pháº£n há»“i cho API tĂ¬m kiáº¿m (Search Latency) pháº£i **< 200ms**.
- Indexing: Khi má»™t bĂ i viáº¿t Ä‘Æ°á»£c cáº­p nháº­t, dá»¯ liá»‡u tĂ¬m kiáº¿m pháº£i Ä‘Æ°á»£c Index láº¡i trong vĂ²ng tá»‘i Ä‘a 5 phĂºt.
# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. MĂ´ hĂ¬nh SECI (Nonaka & Takeuchi)
Module nĂ y há»— trá»£ quĂ¡ trĂ¬nh chuyá»ƒn Ä‘á»•i tri thá»©c:
- **Externalization (Ngoáº¡i hĂ³a):** Chuyá»ƒn tri thá»©c ngáº§m (Tacit knowledge) trong Ä‘áº§u Ä‘á»™i ngÅ© phĂ¡t triá»ƒn thĂ nh tri thá»©c hiá»‡n há»¯u (Explicit knowledge) dÆ°á»›i dáº¡ng bĂ i viáº¿t CMS.
- **Combination (Káº¿t há»£p):** Tá»• chá»©c, phĂ¢n loáº¡i bĂ i viáº¿t thĂ nh há»‡ thá»‘ng phĂ¢n cáº¥p (Categories/Tags) Ä‘á»ƒ ngÆ°á»i dĂ¹ng dá»… tiáº¿p cáº­n.
## 4.2. LĂ½ thuyáº¿t Táº£i nháº­n thá»©c (Cognitive Load Theory)
Ăp dá»¥ng vĂ o tĂ­nh nÄƒng **Contextual Help**:
- Thay vĂ¬ báº¯t ngÆ°á»i dĂ¹ng pháº£i nhá»› (Internalize) toĂ n bá»™ hÆ°á»›ng dáº«n sá»­ dá»¥ng, há»‡ thá»‘ng cung cáº¥p "Bá»™ nhá»› ngoĂ i" (External Memory) ngay táº¡i Ä‘iá»ƒm thao tĂ¡c.
- Viá»‡c nĂ y giáº£m **Extraneous Load** (Táº£i ngoáº¡i lai - thá»i gian tĂ¬m kiáº¿m tĂ i liá»‡u), giĂºp ngÆ°á»i dĂ¹ng táº­p trung vĂ o **Germane Load** (Táº£i thiáº¿t yáº¿u - thá»±c hiá»‡n cĂ´ng viá»‡c).
## 4.3. Information Retrieval (Truy há»“i thĂ´ng tin)
Sá»­ dá»¥ng mĂ´ hĂ¬nh **Hybrid Search** (káº¿t há»£p Keyword Search + Semantic Search):
- Keyword Search (BM25) tá»‘t cho viá»‡c tĂ¬m cĂ¡c mĂ£ lá»—i cá»¥ thá»ƒ hoáº·c tĂªn tĂ­nh nÄƒng chĂ­nh xĂ¡c.
- Semantic Search (Dense Retrieval) tá»‘t cho viá»‡c hiá»ƒu Ă½ Ä‘á»‹nh vĂ  cĂ¡c cĂ¢u há»i mÆ¡ há»“. Viá»‡c káº¿t há»£p cáº£ hai Ä‘áº£m báº£o Ä‘á»™ chĂ­nh xĂ¡c (Precision) vĂ  Ä‘á»™ phá»§ (Recall) cao nháº¥t.

