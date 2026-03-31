Project: PronaFlow
Module: Functional Module 9 - User Experience Personalization
Scope: Frontend implementation gap analysis against requirements doc
Date: 2026-03-31
Status: In progress (execution underway)

---

# 1) Executive Summary

This document converts the FM9 assessment into an execution-ready backlog.

Two tracks are covered:
- Missing implementation: concrete delivery plan and Jira-ready stories.
- Over-implementation: surplus report with triage recommendations.

Current assessment:
- Foundation and core FM9 behaviors are implemented end-to-end for personalization API wiring, i18n bootstrap, locale formatters, dashboard customization, notification persistence, and required global shortcuts.
- Density propagation and typography accessibility have been implemented in primary high-traffic surfaces (tasks, projects, workspace list) with runtime persistence.
- Remaining highest-priority gaps are WCAG contrast enforcement and CVD chart pattern adaptation, plus final hardening/regression evidence.

---

# 2) Traceability Matrix (FM9 vs Frontend)

## FM9.1 Internationalization (i18n) & Localization
- Status: Implemented (core)
- Observed:
  - Centralized i18n bootstrap is wired into app runtime.
  - Fallback policy is active (en-US fallback).
  - Shared locale formatter layer is used in core shell and major feature surfaces.
- Gap:
  - Translation coverage QA is still needed for non-core/legacy screens.

## FM9.2 Theme & Appearance
- Status: Partial
- Observed:
  - light/dark/system supported in theme provider.
  - Settings can update theme preference.
- Gap:
  - WCAG contrast verification is not implemented as real logic.
  - No contrast test gate in CI/frontend QA.

## FM9.3 Customizable Dashboard
- Status: Implemented (core)
- Observed:
  - Dashboard supports widget drag-drop reorder and resize behavior.
  - FE-BE personalization contract for layout_config is aligned.
  - Layout persistence/restore works through personalization endpoints.
- Gap:
  - Cross-device roaming still needs explicit staging validation evidence.

## FM9.4 Workspace Layout Optimization
- Status: Implemented (core)
- Observed:
  - Global Ctrl/Cmd+B sidebar binding is active.
  - Density mode is propagated to key task/project/workspace list surfaces and persisted.
- Gap:
  - Remaining lower-traffic surfaces still require consistency pass.

## FM9.5 Typographic Accessibility
- Status: Implemented (core)
- Observed:
  - Global font scaling is applied at runtime and persisted.
  - Dyslexic font is integrated and can be applied globally.
  - Font family options are wired into runtime behavior.
- Gap:
  - Legacy screens still need full rem-token consistency audit.

## FM9.6 Notification Granularity
- Status: Implemented (core)
- Observed:
  - Notification matrix is API-backed with persistence and reload fidelity.
  - DND preferences and per-event channel behavior are wired through personalization API.
- Gap:
  - DND enforcement/exception behavior needs explicit integration test evidence at runtime boundaries.

## FM9.7 Keyboard Shortcuts & Power Usage
- Status: Partial
- Observed:
  - Cmd/Ctrl+K, ?, Ctrl/Cmd+B, and C create-task flow are implemented globally.
  - Shortcut cheatsheet is aligned to registered active bindings.
- Gap:
  - J/K/Space contextual behavior not consistently wired in Kanban/List runtime.

## FM9.8 Color Vision Deficiency Support
- Status: Partial
- Observed:
  - Color mode options and visual filter behavior exist.
- Gap:
  - Missing chart adaptation with pattern overlays (color + pattern requirement).
  - No validated CVD palette rules applied per chart family.

---

# 3) Delivery Plan for Missing Implementation

## Phase 1 - Foundation Alignment (1 sprint)
- Status: Completed
- Align FE-BE API contracts for personalization endpoints.
- Add centralized i18n bootstrap and fallback policy (en-US fallback).
- Build shared locale formatter utilities for date/time/number/currency.
- Exit criteria:
  - Zero hard-coded locale formatting in core shell pages.
  - API calls in personalization module return successful E2E for current user.

## Phase 2 - Core FM9 Behavior (1 sprint)
- Status: Completed
- Implement notification matrix persistence (in-app/email/push) with DND schedule and exceptions.
- Add global Ctrl/Cmd + B and required C shortcut behavior.
- Implement density token application to high-traffic list/table/task views.
- Exit criteria:
  - FM9.4, FM9.6, FM9.7 AC baseline behaviors testable in UI without mocks.

## Phase 3 - Advanced Personalization (1 sprint)
- Status: Completed (core), hardening pending
- Implement dashboard drag-drop and resize using dnd-kit/grid behavior.
- Persist and restore layout_config across sessions/devices.
- Integrate typographic accessibility improvements (rem consistency, dyslexic font asset, scaling integrity).
- Exit criteria:
  - Dashboard layout reorder and resize persist after reload/login.
  - Typography options visibly affect global UI consistently.

## Phase 4 - Accessibility Hardening & Compliance (0.5-1 sprint)
- Status: In progress (next focus)
- Implement real WCAG contrast checks and remediation rules.
- Implement CVD chart palette + pattern overlays.
- Add smoke/regression tests for FM9 AC scenarios.
- Exit criteria:
  - WCAG AA contrast report for major screens.
  - CVD mode acceptance demo with chart examples.

---

# 4) Jira-Ready Backlog (Execution)

## Epic: FM9-FE-FOUNDATION

### Story FM9-FE-101 - Normalize personalization API contracts
- Type: Story
- Priority: P0
- Estimate: 3 points
- Execution status: Done
- Dependencies: Backend personalization routes frozen
- Description:
  - Refactor frontend personalization service endpoints to match backend contracts.
- Acceptance:
  - get/update settings works for authenticated user.
  - dashboard layout and shortcut endpoints hit valid backend paths.

### Story FM9-FE-102 - Initialize i18n runtime and fallback
- Type: Story
- Priority: P0
- Estimate: 5 points
- Execution status: Done
- Dependencies: None
- Description:
  - Add i18next runtime initialization and wire into app bootstrap.
- Acceptance:
  - Language hot-swap without full page reload.
  - Missing vi translation falls back to en.

### Story FM9-FE-103 - Create locale formatter layer
- Type: Story
- Priority: P0
- Estimate: 5 points
- Execution status: Done
- Dependencies: FM9-FE-102
- Description:
  - Replace direct toLocaleDateString/toLocaleString usage with shared formatter utilities.
- Acceptance:
  - VN and US date/number/currency formats match FM9 AC in target screens.

## Epic: FM9-FE-CORE-BEHAVIORS

### Story FM9-FE-201 - Persist notification matrix and DND
- Type: Story
- Priority: P0
- Estimate: 8 points
- Execution status: Done (core)
- Dependencies: FM9-FE-101
- Description:
  - Wire notification settings tab to API for channel matrix and DND schedule.
- Acceptance:
  - In-app/email/push toggles persist and reload correctly.
  - DND schedule suppresses push/sound and allows urgent exceptions.

### Story FM9-FE-202 - Implement required global shortcuts
- Type: Story
- Priority: P1
- Estimate: 5 points
- Execution status: Done (core)
- Dependencies: None
- Description:
  - Add Ctrl/Cmd+B sidebar toggle and C create-task binding.
  - Align active bindings with displayed cheatsheet.
- Acceptance:
  - Keyboard behavior matches FM9 AC list.

### Story FM9-FE-203 - Apply density modes to key data surfaces
- Type: Story
- Priority: P1
- Estimate: 5 points
- Execution status: Done (core)
- Dependencies: None
- Description:
  - Propagate comfortable/compact density through task list/table views.
- Acceptance:
  - Compact mode visibly increases information density and persists.

## Epic: FM9-FE-ADVANCED-CUSTOMIZATION

### Story FM9-FE-301 - Dashboard drag-drop and resize
- Type: Story
- Priority: P1
- Estimate: 8 points
- Execution status: Done
- Dependencies: FM9-FE-101
- Description:
  - Implement widget reorder and resize behavior.
- Acceptance:
  - User can drag, drop, resize widgets with deterministic layout.

### Story FM9-FE-302 - Layout roaming persistence
- Type: Story
- Priority: P1
- Estimate: 5 points
- Execution status: Done (staging validation pending)
- Dependencies: FM9-FE-301
- Description:
  - Persist layout_config to DB and restore on different sessions/devices.
- Acceptance:
  - Layout matches previous saved state after relogin.

### Story FM9-FE-303 - Typography accessibility completion
- Type: Story
- Priority: P1
- Estimate: 8 points
- Execution status: Done (core)
- Dependencies: None
- Description:
  - Ensure rem-based scale consistency and integrate dyslexic font option.
- Acceptance:
  - Base font size presets apply globally.
  - Dyslexic mode is visibly and technically active.

## Epic: FM9-FE-ACCESSIBILITY-COMPLIANCE

### Story FM9-FE-401 - WCAG contrast enforcement
- Type: Story
- Priority: P1
- Estimate: 5 points
- Execution status: Todo (active next)
- Dependencies: None
- Description:
  - Replace placeholder contrast checker with real algorithm and add compliance checks.
- Acceptance:
  - Contrast checks report AA pass/fail on major screens.

### Story FM9-FE-402 - CVD chart pattern adaptation
- Type: Story
- Priority: P1
- Estimate: 5 points
- Execution status: Todo
- Dependencies: Chart components identified
- Description:
  - Add pattern overlays with CVD color palettes for chart statuses.
- Acceptance:
  - Chart state differentiation works without color-only cues.

---

# 5) Surplus Implementation Report (Source triển khai dư)

## Surplus Item S-01 - Extra language options beyond baseline AC
- Observed: Additional language options beyond en-US and vi-VN.
- Risk: Translation maintenance overhead and QA matrix growth.
- Recommendation: Keep behind feature flag until translation completeness target is met.

## Surplus Item S-02 - Extra date format options beyond FM9 minimum
- Observed: Includes YYYY-MM-DD in preference options.
- Risk: Documentation mismatch and support complexity.
- Recommendation: Keep as optional advanced setting; document as extension.

## Surplus Item S-03 - Notification channels beyond FM9 scope
- Observed: channel model includes slack/teams while FM9 AC defines in-app/email/push.
- Risk: Perceived done state for integrations not guaranteed.
- Recommendation: Label as future capability; exclude from FM9 done criteria.

## Surplus Item S-04 - Duplicated personalization control paths
- Observed: Preference tab and dedicated accessibility panel overlap in responsibility.
- Risk: State divergence (local-only vs API-driven), inconsistent UX.
- Recommendation: Consolidate to one source of truth and one persistence strategy.

## Surplus Item S-05 - Shortcut catalog exceeds active bindings
- Observed: Shortcut modal lists many actions not fully bound at runtime.
- Risk: User trust erosion due to non-functional shortcuts.
- Recommendation: Auto-generate modal from actual registered bindings.

## Surplus Item S-06 - Theme storage key fragmentation
- Observed: More than one theme key used across modules.
- Risk: Theme mismatch and hard-to-debug preference state.
- Recommendation: Standardize to a single key and migrate old values once.

---

# 6) Done Criteria for FM9 Frontend Sign-off

FM9 frontend is considered done when:
- All FM9 AC (2.1 to 2.8) pass E2E validation in a staging build.
- No critical behavior depends on mock-only state in settings tabs.
- Shortcut list equals actual active bindings.
- Personalization persistence works both local-first and server-synced.
- Accessibility checks include WCAG AA contrast and CVD chart adaptation evidence.

---

# 7) Suggested Sprint Packaging

- Sprint A (P0): FM9-FE-101, 102, 103, 201 (Completed)
- Sprint B (P1 core): FM9-FE-202, 203, 301 (Completed)
- Sprint C (P1 finish): FM9-FE-302, 303 (Completed core), 401, 402 (In progress)

This packaging provides early user-visible value while reducing architecture rework risk.
