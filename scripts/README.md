# Scripts Directory

This directory contains the local setup, development, and documentation maintenance helpers that remain supported by the repository.

## Available Scripts

### `setup/setup.cjs`

The `npm run setup` entry point:

- checks Node.js, npm, and Python;
- creates missing local environment files from the matching examples;
- installs root, frontend, and desktop JavaScript dependencies; and
- prints the PostgreSQL and migration steps that must be completed locally.

It never overwrites an existing environment file.

### `setup/setup-dev.cjs`

The `npm run setup:dev` entry point. It creates missing `.env.local` development overrides and enables local debug values.

### `setup/setup-frontend-prod.js`

Interactive helper for generating `apps/frontend/.env.production` and installing frontend dependencies:

```powershell
node scripts/setup/setup-frontend-prod.js
```

Review the generated file, run `npm run build:frontend`, and publish `apps/frontend/dist/` as described in [DEPLOYMENT.md](../DEPLOYMENT.md).

### `dev/watch.js`

Development file watcher. Run it directly when its watch behavior is needed:

```powershell
node scripts/dev/watch.js
```

### `dev/db-reset.js`

Development database reset helper. Read the script and verify the target database before running it; resetting data is destructive.

### `docs/check-shared-docs-migration.ps1`

Checks the shared documentation migration state:

```powershell
./scripts/docs/check-shared-docs-migration.ps1
```

## Common Usage

```powershell
npm run setup
npm run setup:dev
npm run dev
npm run test
npm run build
```

See [DEVELOPMENT.md](../DEVELOPMENT.md) for the full local workflow and [DEPLOYMENT.md](../DEPLOYMENT.md) for release procedures.
