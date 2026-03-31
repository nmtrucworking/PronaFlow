**Project**: PronaFlow
**Version**: 1.1
**State**: Draft
***Last updated:** Mar 31, 2026*

---
# 1. Business Overview
Khi PronaFlow má»Ÿ rá»™ng tá»« nhĂ³m nhá» sang mĂ´ hĂ¬nh Enterprise Ä‘a tenant, nhu cáº§u quáº£n trá»‹ há»‡ thá»‘ng khĂ´ng cĂ²n dá»«ng á»Ÿ "cáº¥u hĂ¬nh ká»¹ thuáº­t" mĂ  trá»Ÿ thĂ nh má»™t nÄƒng lá»±c váº­n hĂ nh cá»‘t lĂµi. PhĂ¢n há»‡ **System Administration** Ä‘áº£m nhiá»‡m 3 má»¥c tiĂªu trá»ng yáº¿u:
1. **Reliability:** Duy trĂ¬ tĂ­nh sáºµn sĂ ng cao, giáº£m MTTR khi cĂ³ sá»± cá»‘.
2. **Security & Governance:** Quáº£n trá»‹ quyá»n, chĂ­nh sĂ¡ch vĂ  báº±ng chá»©ng kiá»ƒm toĂ¡n xuyĂªn suá»‘t vĂ²ng Ä‘á»i dá»¯ liá»‡u.
3. **Operational Scalability:** Chuáº©n hĂ³a quy trĂ¬nh váº­n hĂ nh Ä‘á»ƒ há»‡ thá»‘ng tÄƒng trÆ°á»Ÿng mĂ  khĂ´ng tÄƒng rá»§i ro tÆ°Æ¡ng á»©ng.

Module 14 Ä‘Ă³ng vai trĂ² "control plane" cho cĂ¡c module khĂ¡c: IAM (Module 1), Data Archiving (Module 8), AI Workflows (Module 10), Subscription/Billing (Module 13), vĂ  Help Center (Module 15).

# 2. User Stories & Acceptance Criteria
## 2.1. Feature: Policy-based Administration
### User Story 14.1
LĂ  má»™t **Platform Admin**, tĂ´i muá»‘n quáº£n trá»‹ há»‡ thá»‘ng theo chĂ­nh sĂ¡ch (policy) thay vĂ¬ thao tĂ¡c thá»§ cĂ´ng rá»i ráº¡c, Ä‘á»ƒ giáº£m lá»—i con ngÆ°á»i vĂ  Ä‘áº£m báº£o nháº¥t quĂ¡n giá»¯a cĂ¡c tenant.

### Acceptance Criteria (#AC)
#### AC 1 - Policy Templates
- Há»‡ thá»‘ng há»— trá»£ template chĂ­nh sĂ¡ch cho cĂ¡c nhĂ³m: Access Control, Data Retention, Session Security, API Rate Limit.
- Má»—i policy cĂ³ version (`v1`, `v2`), tráº¡ng thĂ¡i (`Draft`, `Approved`, `Enforced`) vĂ  lá»‹ch sá»­ phĂª duyá»‡t.

#### AC 2 - Scoped Enforcement
- Policy cĂ³ thá»ƒ Ă¡p dá»¥ng theo pháº¡m vi: Global, Region, Workspace Tier (Free/Pro/Enterprise).
- Náº¿u policy xung Ä‘á»™t, thá»© tá»± Æ°u tiĂªn: `Global Mandatory > Compliance Override > Workspace Custom`.

#### AC 3 - Safe Rollout
- Há»— trá»£ "dry-run" Ä‘á»ƒ Ä‘Ă¡nh giĂ¡ tĂ¡c Ä‘á»™ng trÆ°á»›c khi enforce.
- CĂ³ cÆ¡ cháº¿ rollback má»™t láº§n báº¥m khi tá»· lá»‡ lá»—i tÄƒng vÆ°á»£t ngÆ°á»¡ng cáº£nh bĂ¡o.

## 2.2. Feature: Incident Command Console
### User Story 14.2
LĂ  má»™t **SRE Admin**, tĂ´i muá»‘n cĂ³ má»™t giao diá»‡n Ä‘iá»u phá»‘i sá»± cá»‘ táº­p trung, Ä‘á»ƒ theo dĂµi tráº¡ng thĂ¡i dá»‹ch vá»¥, runbook vĂ  timeline xá»­ lĂ½ theo thá»i gian thá»±c.

### Acceptance Criteria (#AC)
#### AC 1 - Severity-driven Workflow
- Incident Ä‘Æ°á»£c phĂ¢n má»©c `SEV-1` Ä‘áº¿n `SEV-4` vá»›i SLA pháº£n há»“i tÆ°Æ¡ng á»©ng.
- Tá»± Ä‘á»™ng gĂ¡n Incident Commander khi SEV-1/SEV-2 Ä‘Æ°á»£c táº¡o.

#### AC 2 - Unified Timeline
- Má»i hĂ nh Ä‘á»™ng (acknowledge, mitigation, rollback, postmortem) Ä‘Æ°á»£c ghi vĂ o timeline báº¥t biáº¿n.
- Timeline pháº£i truy xuáº¥t Ä‘Æ°á»£c theo Incident ID vĂ  xuáº¥t Ä‘Æ°á»£c bĂ¡o cĂ¡o Ä‘iá»u tra.

#### AC 3 - Runbook Integration
- Má»—i loáº¡i sá»± cá»‘ (DB latency, queue backlog, auth outage) liĂªn káº¿t runbook chuáº©n.
- Cho phĂ©p Ä‘Ă¡nh dáº¥u bÆ°á»›c runbook Ä‘Ă£ hoĂ n thĂ nh Ä‘á»ƒ Ä‘á»“ng bá»™ giá»¯a cĂ¡c ca trá»±c.

## 2.3. Feature: Administrative Audit & Delegation
### User Story 14.3
LĂ  má»™t **Audit Admin**, tĂ´i muá»‘n theo dĂµi toĂ n bá»™ thao tĂ¡c Ä‘áº·c quyá»n vĂ  cÆ¡ cháº¿ á»§y quyá»n táº¡m thá»i, Ä‘á»ƒ Ä‘áº£m báº£o truy váº¿t Ä‘áº§y Ä‘á»§ vĂ  ngÄƒn láº¡m quyá»n.

### Acceptance Criteria (#AC)
#### AC 1 - Immutable Admin Log
- Má»i hĂ nh Ä‘á»™ng admin pháº£i ghi log vá»›i cáº¥u trĂºc: `who`, `when`, `where`, `what`, `before`, `after`, `reason`.
- Log khĂ´ng cho phĂ©p chá»‰nh sá»­a/xĂ³a á»Ÿ táº§ng á»©ng dá»¥ng.

#### AC 2 - Just-in-time Privilege
- Quyá»n nháº¡y cáº£m (xem PII, rotate key, force account unlock) chá»‰ Ä‘Æ°á»£c cáº¥p táº¡m thá»i theo thá»i lÆ°á»£ng.
- Báº¯t buá»™c nháº­p lĂ½ do nghiá»‡p vá»¥ vĂ  ticket tham chiáº¿u trÆ°á»›c khi nháº­n quyá»n.

#### AC 3 - Four-eyes Control
- CĂ¡c thao tĂ¡c cáº¥p cao (xĂ³a tenant, Ä‘á»•i retention global, xuáº¥t dá»¯ liá»‡u hĂ ng loáº¡t) yĂªu cáº§u hai ngÆ°á»i phĂª duyá»‡t.
- Há»‡ thá»‘ng tá»« chá»‘i thá»±c thi náº¿u cĂ¹ng má»™t ngÆ°á»i táº¡o vĂ  duyá»‡t.

## 2.4. Feature: SLA Timer Supervision for Operations
### User Story 14.4
LĂ  má»™t **Support/Operations Admin**, tĂ´i muá»‘n bá»™ Ä‘áº¿m SLA tá»± Ä‘á»™ng táº¡m dá»«ng/tiáº¿p tá»¥c theo ca lĂ m viá»‡c vĂ  tráº¡ng thĂ¡i task, Ä‘á»ƒ Ä‘o thá»i gian xá»­ lĂ½ thá»±c táº¿ chĂ­nh xĂ¡c.

### Acceptance Criteria (#AC)
#### AC 1 - Working-hours-aware Timer
- Khi ticket Ä‘Æ°á»£c táº¡o, há»‡ thá»‘ng láº¥y SLA theo priority.
- Náº¿u ngoĂ i giá» lĂ m viá»‡c, timer chá» tá»›i ca káº¿ tiáº¿p rá»“i má»›i cháº¡y.

#### AC 2 - Pause/Resume Logic
- Timer táº¡m dá»«ng khi ticket á»Ÿ tráº¡ng thĂ¡i chá» khĂ¡ch hĂ ng/chá» phá»¥ thuá»™c.
- Timer tiáº¿p tá»¥c khi ticket quay láº¡i tráº¡ng thĂ¡i xá»­ lĂ½.

#### AC 3 - Breach & Closure
- Khi thá»i gian cĂ²n láº¡i <= 0, há»‡ thá»‘ng kĂ­ch hoáº¡t sá»± kiá»‡n SLA breach vĂ  cáº£nh bĂ¡o Ä‘a kĂªnh.
- Khi task hoĂ n táº¥t, dá»«ng timer vĂ  lÆ°u "Actual Resolution Time" phá»¥c vá»¥ bĂ¡o cĂ¡o nÄƒng suáº¥t.

# 3. Business Rules & Technical Constraints
## 3.1. PhĂ¢n loáº¡i Quáº£n trá»‹ Há»‡ thá»‘ng ChuyĂªn biá»‡t (Specialized Admin Roles)
Äá»ƒ Ä‘Ă¡p á»©ng tiĂªu chuáº©n Enterprise, PronaFlow phĂ¢n rĂ£ Ä‘á»™i ngÅ© váº­n hĂ nh thĂ nh 18 vai trĂ² admin chuyĂªn trĂ¡ch nháº±m kiá»ƒm soĂ¡t rá»§i ro vĂ  tÄƒng tĂ­nh minh báº¡ch.

- **NhĂ³m Váº­n hĂ nh Ká»¹ thuáº­t:**
    - **Super Admin:** Quyá»n háº¡n cao nháº¥t, chá»‰ sá»­ dá»¥ng cho cĂ¡c tĂ¬nh huá»‘ng kháº©n cáº¥p hoáº·c khĂ´i phá»¥c há»‡ thá»‘ng.
    - **System/SRE Admin:** Chá»‹u trĂ¡ch nhiá»‡m vá» hiá»‡u nÄƒng vĂ  sá»©c khá»e há»‡ thá»‘ng, khĂ´ng truy cáº­p dá»¯ liá»‡u ngÆ°á»i dĂ¹ng.
    - **Release/Change Admin:** Kiá»ƒm soĂ¡t quy trĂ¬nh phĂ¡t hĂ nh vĂ  thay Ä‘á»•i mĂ£ nguá»“n.
    - **Database Admin (DBA):** Quáº£n trá»‹ schema, migration, backup/restore vĂ  tá»‘i Æ°u truy váº¥n.
    - **Infra/Cloud Admin:** Quáº£n lĂ½ tĂ i nguyĂªn háº¡ táº§ng, máº¡ng, secrets vĂ  chĂ­nh sĂ¡ch triá»ƒn khai Ä‘a mĂ´i trÆ°á»ng.

- **NhĂ³m An ninh & TuĂ¢n thá»§:**
    - **Security/Trust Admin:** Xá»­ lĂ½ gian láº­n, láº¡m dá»¥ng vĂ  rá»§i ro báº£o máº­t.
    - **IAM Admin:** Quáº£n lĂ½ danh tĂ­nh, phĂ¢n quyá»n vĂ  cáº¥u hĂ¬nh MFA.
    - **Compliance/Legal Admin:** Äáº£m báº£o há»‡ thá»‘ng tuĂ¢n thá»§ cĂ¡c quy Ä‘á»‹nh phĂ¡p lĂ½.
    - **Privacy/DPO:** Báº£o vá»‡ quyá»n riĂªng tÆ° dá»¯ liá»‡u theo thiáº¿t káº¿ (Privacy-by-design).
    - **Key Management Admin:** Quáº£n lĂ½ vĂ²ng Ä‘á»i khĂ³a mĂ£ hĂ³a, chá»©ng thÆ° sá»‘ vĂ  chĂ­nh sĂ¡ch rotation.

- **NhĂ³m Nghiá»‡p vá»¥ & Dá»‹ch vá»¥:**
    - **Finance Admin:** Quáº£n lĂ½ doanh thu, gĂ³i dá»‹ch vá»¥ vĂ  cĂ¡c giao dá»‹ch tĂ i chĂ­nh.
    - **AI/Automation Admin:** Quáº£n lĂ½ hĂ nh vi cá»§a cĂ¡c mĂ´ hĂ¬nh AI vĂ  luá»“ng tá»± Ä‘á»™ng hĂ³a.
    - **Data/Analytics Admin:** Äáº£m báº£o cháº¥t lÆ°á»£ng dá»¯ liá»‡u phá»¥c vá»¥ phĂ¢n tĂ­ch mĂ  khĂ´ng tiáº¿p cáº­n dá»¯ liá»‡u cĂ¡ nhĂ¢n thĂ´.
    - **Support Admin:** Tiáº¿p nháº­n vĂ  xá»­ lĂ½ yĂªu cáº§u há»— trá»£ (ticket) tá»« ngÆ°á»i dĂ¹ng.
    - **Content/Knowledge Admin:** Quáº£n lĂ½ tĂ i liá»‡u hÆ°á»›ng dáº«n vĂ  tri thá»©c ná»™i bá»™ liĂªn káº¿t Module 15.

- **NhĂ³m Kiá»ƒm toĂ¡n & Äiá»u phá»‘i:**
    - **Audit-only Admin:** Vai trĂ² chá»‰ Ä‘á»c, cĂ³ quyá»n xem toĂ n bá»™ log há»‡ thá»‘ng Ä‘á»ƒ phá»¥c vá»¥ Ä‘iá»u tra mĂ  khĂ´ng thá»ƒ thá»±c hiá»‡n thao tĂ¡c ghi.
    - **Incident Commander Admin:** Äiá»u phá»‘i xá»­ lĂ½ sá»± cá»‘ liĂªn phĂ²ng ban, chá»‹u trĂ¡ch nhiá»‡m timeline vĂ  quyáº¿t Ä‘á»‹nh rollback.
    - **Risk & Continuity Admin:** Quáº£n lĂ½ káº¿ hoáº¡ch BCP/DR, diá»…n táº­p Ä‘á»‹nh ká»³ vĂ  Ä‘Ă¡nh giĂ¡ rá»§i ro váº­n hĂ nh.

## 3.2. Quy táº¯c TĂ¡ch biá»‡t Nhiá»‡m vá»¥ (Separation of Duties)
- KhĂ´ng má»™t vai trĂ² Ä‘Æ¡n láº» nĂ o Ä‘Æ°á»£c phĂ©p vá»«a cáº¥u hĂ¬nh chĂ­nh sĂ¡ch, vá»«a tá»± phĂª duyá»‡t, vá»«a thá»±c thi hĂ nh Ä‘á»™ng nháº¡y cáº£m.
- Quyá»n truy cáº­p dá»¯ liá»‡u cĂ¡ nhĂ¢n thĂ´ bá»‹ giá»›i háº¡n theo nguyĂªn táº¯c "least privilege" vĂ  "need-to-know".

## 3.3. Quy táº¯c Truy váº¿t Báº¯t buá»™c (Mandatory Traceability)
- 100% hĂ nh Ä‘á»™ng admin pháº£i cĂ³ correlation ID Ä‘á»ƒ Ä‘á»‘i soĂ¡t giá»¯a application log, audit log vĂ  háº¡ táº§ng.
- Log quáº£n trá»‹ pháº£i Ä‘Æ°á»£c lÆ°u tá»‘i thiá»ƒu theo chĂ­nh sĂ¡ch retention cá»§a tier Enterprise hoáº·c theo yĂªu cáº§u phĂ¡p lĂ½ tá»«ng khu vá»±c.

## 3.4. RĂ ng buá»™c Váº­n hĂ nh Äa mĂ´i trÆ°á»ng
- Má»i thay Ä‘á»•i cáº¥u hĂ¬nh production pháº£i Ä‘i qua pipeline chuáº©n, cáº¥m "hotfix thá»§ cĂ´ng" trá»±c tiáº¿p trĂªn mĂ¡y chá»§.
- Cáº¥u hĂ¬nh quan trá»ng pháº£i há»— trá»£ drift detection Ä‘á»ƒ phĂ¡t hiá»‡n sai lá»‡ch giá»¯a thá»±c táº¿ vĂ  cáº¥u hĂ¬nh khai bĂ¡o.

# 4. Theoretical Basis (CÆ¡ sá»Ÿ LĂ½ luáº­n)
## 4.1. Zero Trust Administration
Má»i yĂªu cáº§u quáº£n trá»‹ Ä‘Æ°á»£c coi lĂ  chÆ°a tin cáº­y máº·c Ä‘á»‹nh vĂ  pháº£i xĂ¡c minh liĂªn tá»¥c qua danh tĂ­nh, ngá»¯ cáº£nh thiáº¿t bá»‹, thá»i Ä‘iá»ƒm vĂ  má»¥c Ä‘Ă­ch truy cáº­p.

## 4.2. Site Reliability Engineering (SRE)
Module Ă¡p dá»¥ng cĂ¡c nguyĂªn lĂ½ SRE nhÆ° SLI/SLO/Error Budget Ä‘á»ƒ cĂ¢n báº±ng giá»¯a tá»‘c Ä‘á»™ phĂ¡t hĂ nh vĂ  Ä‘á»™ á»•n Ä‘á»‹nh há»‡ thá»‘ng.

## 4.3. NIST RBAC + ABAC Hybrid
PronaFlow káº¿t há»£p RBAC (phĂ¢n quyá»n theo vai trĂ²) vĂ  ABAC (phĂ¢n quyá»n theo thuá»™c tĂ­nh ngá»¯ cáº£nh) Ä‘á»ƒ kiá»ƒm soĂ¡t truy cáº­p linh hoáº¡t hÆ¡n trong mĂ´i trÆ°á»ng enterprise.

## 4.4. Operational Resilience Framework
Thiáº¿t káº¿ quáº£n trá»‹ dá»±a trĂªn vĂ²ng láº·p: Prevent -> Detect -> Respond -> Recover -> Learn, Ä‘áº£m báº£o sau má»—i sá»± cá»‘ Ä‘á»u cĂ³ cáº£i tiáº¿n chĂ­nh sĂ¡ch vĂ  runbook.
