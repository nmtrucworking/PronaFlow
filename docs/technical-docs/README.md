# PronaFlow Shared Technical Docs

This folder is the single source of truth for all cross-cutting technical documentation shared by frontend, backend, and electron teams.

## Scope

Shared technical docs include:
- Product-wide architecture and requirements
- Shared data contracts, references, and standards
- AI, QA, deployment, and operational standards
- Glossary, terminology, and common templates

App-specific implementation details must stay in each app docs area:
- Frontend-specific docs: `apps/frontend/docs/`
- Backend-specific docs: `apps/backend/docs/`
- Electron-specific docs: `apps/electron/docs/`

## Canonical Policy

1. Shared content is authored and updated only in this folder.
2. App docs must link to shared docs instead of maintaining full duplicate copies.
3. Existing legacy copies in app folders are temporary compatibility layers during migration.
4. New shared docs must be created here first, then referenced from app docs.

## Migration Status

- Phase 1 completed: canonical hub established.
- Next phase: migrate duplicated content from app-level technical-docs into this folder.

See [MIGRATION_PLAN.md](MIGRATION_PLAN.md) for the step-by-step rollout.
