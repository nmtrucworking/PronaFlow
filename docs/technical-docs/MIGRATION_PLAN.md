# Shared Technical Docs Migration Plan

## Goal

Unify duplicated technical docs into one canonical location while preserving existing links during transition.

## Phase 1 - Canonical Setup (current)

- Create shared hub at `docs/technical-docs/`
- Update app-level entry points to reference canonical docs
- Keep legacy copies in place to avoid broken links

## Phase 2 - Mapping And Ownership

1. Build a mapping table:
- Source file in `apps/frontend/docs/technical-docs/`
- Source file in `apps/backend/docs/`
- Canonical target in `docs/technical-docs/`
- Owner team and reviewer

2. Classify each document:
- Shared (move to canonical)
- Frontend-only
- Backend-only
- Deprecated

### Current Phase 2 Artifacts

- Baseline report: [PHASE2_MAPPING_BASELINE.md](PHASE2_MAPPING_BASELINE.md)
- Top 30 triage list: [PHASE2_TRIAGE_TOP30.md](PHASE2_TRIAGE_TOP30.md)
- Shared paths list: [PHASE2_SHARED_PATHS.txt](PHASE2_SHARED_PATHS.txt)
- Frontend-only paths list: [PHASE2_FRONTEND_ONLY_PATHS.txt](PHASE2_FRONTEND_ONLY_PATHS.txt)
- Backend-only paths list: [PHASE2_BACKEND_ONLY_PATHS.txt](PHASE2_BACKEND_ONLY_PATHS.txt)


### Current Status (2026-03-31)

- Shared exact-path matches identified: 78
- Frontend-only paths identified: 343
- Backend-only paths identified: 455
- Normalization risks detected:
  - `02-Architeture/` vs `02-Architecture/`
  - accidental `.md.md` files in backend docs
  - `.obsidian/` operational files mixed in backend docs

## Phase 3 - Content Merge

1. Merge duplicate files into canonical targets.
2. Resolve conflicting sections by decision records.
3. Keep revision notes in each merged file.

### Current Phase 3 Status (2026-03-31)

- Batch 1 completed: 10 P1 documents moved to canonical folder and replaced by redirect stubs in frontend/backend copies.
- Batch 1 manifest: [PHASE3_BATCH1_PATHS.txt](PHASE3_BATCH1_PATHS.txt)
- Batch 2 completed: 15 Shared requirement-module documents moved and stubbed.
- Batch 2 manifest: [PHASE3_BATCH2_PATHS.txt](PHASE3_BATCH2_PATHS.txt)
- Batch 3 completed: 15 shared architecture, deployment, QA, and references documents moved and stubbed.
- Batch 3 manifest: [PHASE3_BATCH3_PATHS.txt](PHASE3_BATCH3_PATHS.txt)
- Batch 4 completed: 38 remaining shared exact-path documents moved and stubbed.
- Batch 4 manifest: [PHASE3_BATCH4_PATHS.txt](PHASE3_BATCH4_PATHS.txt)
- Exact-path shared migration status: 78/78 completed.

### Current Phase 4 Normalization Status (2026-03-31)

- Normalization manifest created: [PHASE4_NORMALIZATION_MANIFEST.md](PHASE4_NORMALIZATION_MANIFEST.md)
- `.md.md` cleanup completed in backend docs (2 files normalized, 0 remaining).
- Frontend technical-docs entrypoint normalized: `apps/frontend/docs/technical-docs/INDEX.md`.
- Backend technical-docs entrypoint normalized: `apps/backend/docs/technical-docs/INDEX.md`.
- Root indexes updated to include canonical hub and frontend/backend compatibility paths.
- Backend root technical files moved to `apps/backend/docs/technical-docs/` with redirect stubs preserved at old paths.
- Deferred for path-safe rollout:
  - backend namespace normalization: `02-Architeture` -> `02-Architecture`
  - `.obsidian` relocation/deprecation policy

## Phase 4 - Redirect Stubs

For each migrated file in app docs:
- Replace with a short stub containing:
  - Status: moved
  - Link to canonical file
  - Last migration date

## Phase 5 - Enforcement

- Add PR checklist item: no new duplicate shared docs in app folders
- Add CI check (optional): detect duplicate filenames or checksums across shared/doc app areas

### Current Enforcement Assets

- Migration validation script: [../../scripts/docs/check-shared-docs-migration.ps1](../../scripts/docs/check-shared-docs-migration.ps1)
- Suggested CI command:
  - `powershell -ExecutionPolicy Bypass -File scripts/docs/check-shared-docs-migration.ps1 -RepoRoot .`

## Success Criteria

- Shared docs edited in one place only
- App docs contain only app-specific implementation content
- No broken links from existing bookmarks and references
