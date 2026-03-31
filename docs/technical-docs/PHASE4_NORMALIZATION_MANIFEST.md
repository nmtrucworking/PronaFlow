# Phase 4 Normalization Manifest

Generated on: 2026-03-31

## Goal

Normalize non-exact-path divergences that were intentionally excluded from exact-path shared migration.

## Scope

1. Backend typo namespace: `apps/backend/docs/02-Architeture/`.
2. Accidental double markdown extension: `*.md.md` under backend docs.
3. Obsidian operational files: `apps/backend/docs/.obsidian/*`.

## Findings

- `apps/backend/docs/02-Architeture/` exists.
- `apps/backend/docs/02-Architecture/` does not exist.
- `*.md.md` under backend docs: cleaned to 0 remaining.
- `.obsidian` files under backend docs:
  - `apps/backend/docs/.obsidian/app.json`
  - `apps/backend/docs/.obsidian/appearance.json`
  - `apps/backend/docs/.obsidian/core-plugins.json`
  - `apps/backend/docs/.obsidian/workspace.json`

## Execution Status

- Completed:
  - Renamed `apps/backend/docs/00-General/Glossary.md.md` -> `apps/backend/docs/00-General/Glossary.md`.
  - Renamed `apps/backend/docs/01-Requirements/Non-Functional.md.md` -> `apps/backend/docs/01-Requirements/Non-Functional.md`.
- Deferred (requires path-safe rollout):
  - `02-Architeture` -> `02-Architecture` namespace normalization.
  - `.obsidian` relocation/deprecation policy.

## Safe Rollout Plan For Deferred Items

1. Build link/reference map for `02-Architeture` paths in backend docs and app code.
2. Perform folder normalization in one change set.
3. Add temporary compatibility redirects for known inbound links.
4. Re-run shared-doc migration validation and link audits.

## Notes

- Exact-path shared migration remains complete at `78/78`.
- This manifest tracks non-exact-path cleanup only.
