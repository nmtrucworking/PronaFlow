# PronaFlow - Intelligent Project Management Platform

PronaFlow is an AI-powered project management platform built with React, FastAPI, PostgreSQL, and Electron.

## Repository Layout

```text
pronaflow/
|-- apps/
|   |-- backend/        # FastAPI API
|   |-- frontend/       # React web application
|   `-- electron/       # Desktop application
|-- services/
|   `-- ai-serving/     # AI service scaffold
|-- configs/            # Shared configuration references
|-- docs/               # Product and technical documentation
|-- scripts/            # Local setup and maintenance scripts
|-- storage/            # Local temporary files and uploads
`-- package.json        # Root commands and workspace configuration
```

## Prerequisites

- Node.js 18+
- npm 9+
- Python 3.9+
- PostgreSQL 12+
- Git

Redis is optional for features that use caching, event delivery, or background work.

## Local Quick Start

Install the JavaScript dependencies:

```powershell
npm install
```

Create the backend environment and install its dependencies:

```powershell
python -m venv apps/backend/.venv
./apps/backend/.venv/Scripts/Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r apps/backend/requirements.txt
```

Create local environment files without overwriting existing values:

```powershell
npm run setup:dev
Copy-Item apps/backend/.env.example apps/backend/.env -ErrorAction SilentlyContinue
Copy-Item apps/frontend/.env.example apps/frontend/.env.local -ErrorAction SilentlyContinue
```

Set `DATABASE_URL` in `apps/backend/.env`, create the matching PostgreSQL role and database, then apply migrations:

```powershell
python -m alembic -c apps/backend/alembic.ini upgrade head
```

Start the frontend and backend from the repository root while the backend virtual environment is active:

```powershell
npm run dev
```

- Frontend: <http://localhost:5173>
- Backend: <http://localhost:8000>
- API documentation: <http://localhost:8000/docs>
- Health check: <http://localhost:8000/health>

For database creation, operating-system-specific activation commands, tests, and troubleshooting, see [DEVELOPMENT.md](DEVELOPMENT.md).

## Common Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the frontend and backend |
| `npm run dev:frontend` | Start only the frontend |
| `npm run dev:backend` | Start only the backend |
| `npm run dev:electron` | Build and start the desktop app |
| `npm run test` | Run frontend tests |
| `npm run test:backend` | Run backend tests |
| `npm run lint` | Lint the frontend |
| `npm run lint:backend` | Lint the backend |
| `npm run build` | Build the frontend and desktop app |

## Documentation

- [DEVELOPMENT.md](DEVELOPMENT.md) - Local setup and development workflow
- [DEPLOYMENT.md](DEPLOYMENT.md) - Native process and static artifact release workflow
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [INDEX.md](INDEX.md) - Repository documentation index
- [docs/](docs/) - Product and technical documentation

## License

All rights reserved. PronaFlow is a proprietary project.
