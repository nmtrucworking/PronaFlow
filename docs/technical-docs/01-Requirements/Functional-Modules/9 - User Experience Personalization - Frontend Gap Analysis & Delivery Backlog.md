Project: PronaFlow
Module: Functional Module 9 - User Experience Personalization
Scope: Frontend implementation gap analysis against requirements doc
Date: 2026-03-31
Status: Draft for execution

---

# 1) Executive Summary

This document converts the FM9 assessment into an execution-ready backlog.

Two tracks are covered:
- Missing implementation: concrete delivery plan and Jira-ready stories.
- Over-implementation: surplus report with triage recommendations.

Current assessment:
- Implemented foundation exists (theme context, settings UI, personalization types/services, command palette shell).
- Many acceptance criteria are only partially implemented, mocked, or not wired end-to-end.
- Some scope exceeds FM9 baseline and should be labeled as optional/future to avoid release confusion.

---

# 2) Traceability Matrix (FM9 vs Frontend)

## FM9.1 Internationalization (i18n) & Localization
- Status: Partial
- Observed:
  - Language settings UI exists.
  - No centralized i18next bootstrap usage in app runtime.
  - Date/number formatting is still hard-coded in many feature screens.
- Gap:
  - Missing full hot-swap translation flow and fallback behavior enforcement.
  - Missing single formatter layer applied app-wide.

## FM9.2 Theme & Appearance
- Status: Partial
- Observed:
  - light/dark/system supported in theme provider.
  - Settings can update theme preference.
- Gap:
  - WCAG contrast verification is not implemented as real logic.
  - No contrast test gate in CI/frontend QA.

## FM9.3 Customizable Dashboard
- Status: Partial
- Observed:
  - Dashboard customization UI exists (widget add/remove/toggle).
  - Personalization hooks/services exist.
- Gap:
  - No actual drag-and-drop and grid resize behavior implemented.
  - API contract mismatch between frontend service routes and backend personalization routes.
  - Persistence not yet validated as cross-device roaming behavior.

## FM9.4 Workspace Layout Optimization
- Status: Partial
- Observed:
  - Sidebar collapse button exists.
  - Density preference state exists and dispatches update event.
- Gap:
  - Missing global Ctrl/Cmd + B binding.
  - Density is not consistently propagated across task/table/list surfaces.

## FM9.5 Typographic Accessibility
- Status: Partial
- Observed:
  - Font scaling controls exist.
  - Font family options include system/dyslexic/monospace in UI/types.
- Gap:
  - No verified dyslexic font integration (font asset loading and global application).
  - Not all UI typography is rem-tokenized consistently.

## FM9.6 Notification Granularity
- Status: Partial
- Observed:
  - Notification settings tab exists.
  - Notification service has preferences/channels methods.
- Gap:
  - Settings tab still mostly local/mock state, not fully wired to preferences API.
  - DND schedule and exception flow not fully persisted and enforced.

## FM9.7 Keyboard Shortcuts & Power Usage
- Status: Partial
- Observed:
  - Cmd/Ctrl+K and ? are implemented globally.
  - Command palette and shortcut modal are present.
- Gap:
  - Missing required shortcut C for create task flow.
  - J/K/Space contextual behavior not consistently wired in Kanban/List runtime.
  - Shortcut cheatsheet contains entries beyond actual active bindings.

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
- Align FE-BE API contracts for personalization endpoints.
- Add centralized i18n bootstrap and fallback policy (en-US fallback).
- Build shared locale formatter utilities for date/time/number/currency.
- Exit criteria:
  - Zero hard-coded locale formatting in core shell pages.
  - API calls in personalization module return successful E2E for current user.

## Phase 2 - Core FM9 Behavior (1 sprint)
- Implement notification matrix persistence (in-app/email/push) with DND schedule and exceptions.
- Add global Ctrl/Cmd + B and required C shortcut behavior.
- Implement density token application to high-traffic list/table/task views.
- Exit criteria:
  - FM9.4, FM9.6, FM9.7 AC baseline behaviors testable in UI without mocks.

## Phase 3 - Advanced Personalization (1 sprint)
- Implement dashboard drag-drop and resize using dnd-kit/grid behavior.
- Persist and restore layout_config across sessions/devices.
- Integrate typographic accessibility improvements (rem consistency, dyslexic font asset, scaling integrity).
- Exit criteria:
  - Dashboard layout reorder and resize persist after reload/login.
  - Typography options visibly affect global UI consistently.

## Phase 4 - Accessibility Hardening & Compliance (0.5-1 sprint)
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
- Dependencies: FM9-FE-101
- Description:
  - Implement widget reorder and resize behavior.
- Acceptance:
  - User can drag, drop, resize widgets with deterministic layout.

### Story FM9-FE-302 - Layout roaming persistence
- Type: Story
- Priority: P1
- Estimate: 5 points
- Dependencies: FM9-FE-301
- Description:
  - Persist layout_config to DB and restore on different sessions/devices.
- Acceptance:
  - Layout matches previous saved state after relogin.

### Story FM9-FE-303 - Typography accessibility completion
- Type: Story
- Priority: P1
- Estimate: 8 points
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
- Dependencies: None
- Description:
  - Replace placeholder contrast checker with real algorithm and add compliance checks.
- Acceptance:
  - Contrast checks report AA pass/fail on major screens.

### Story FM9-FE-402 - CVD chart pattern adaptation
- Type: Story
- Priority: P1
- Estimate: 5 points
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

- Sprint A (P0): FM9-FE-101, 102, 103, 201
- Sprint B (P1 core): FM9-FE-202, 203, 301
- Sprint C (P1 finish): FM9-FE-302, 303, 401, 402

This packaging provides early user-visible value while reducing architecture rework risk.
