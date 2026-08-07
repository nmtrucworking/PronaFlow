# Development Guide

This guide is the canonical workflow for running PronaFlow directly on a developer machine.

## Prerequisites

- Node.js 18+ and npm 9+
- Python 3.9+
- PostgreSQL 12+
- Git
- Redis when working on caching, events, notifications, or background jobs

Verify the required tools:

```powershell
node --version
npm --version
python --version
psql --version
```

## 1. Install Dependencies

Install root, frontend, and desktop JavaScript dependencies:

```powershell
npm install
```

Create and activate a backend virtual environment on Windows PowerShell:

```powershell
python -m venv apps/backend/.venv
./apps/backend/.venv/Scripts/Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r apps/backend/requirements.txt
```

On macOS or Linux, activate it with:

```bash
python3 -m venv apps/backend/.venv
source apps/backend/.venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r apps/backend/requirements.txt
```

Keep the virtual environment active whenever you use a root command that starts, tests, lints, or formats the backend.

## 2. Configure Local Environment Files

Create development overrides:

```powershell
npm run setup:dev
```

Create the service-specific files if they do not exist:

```powershell
Copy-Item apps/backend/.env.example apps/backend/.env -ErrorAction SilentlyContinue
Copy-Item apps/frontend/.env.example apps/frontend/.env.local -ErrorAction SilentlyContinue
```

Review at least these values:

- `apps/backend/.env`: `DATABASE_URL`, `SECRET_KEY`, `DEBUG`, and `ALLOWED_ORIGINS`
- `apps/frontend/.env.local`: `VITE_API_MODE`, `VITE_API_URL`, and `VITE_API_BASE_URL`

Use `DEBUG=True` only for local development. Do not commit environment files or real credentials.

## 3. Prepare PostgreSQL

The default backend example expects a local role named `pronaflow_user` and databases named `pronaflow_db` and `pronaflow_test`. Create them from a PostgreSQL administrator session, adjusting the password to match `apps/backend/.env`:

```sql
CREATE ROLE pronaflow_user WITH LOGIN PASSWORD 'replace-with-a-local-password';
CREATE DATABASE pronaflow_db OWNER pronaflow_user;
CREATE DATABASE pronaflow_test OWNER pronaflow_user;
```

Apply the schema from the repository root:

```powershell
python -m alembic -c apps/backend/alembic.ini upgrade head
```

Useful migration commands:

```powershell
python -m alembic -c apps/backend/alembic.ini current
python -m alembic -c apps/backend/alembic.ini history
python -m alembic -c apps/backend/alembic.ini revision --autogenerate -m "describe change"
```

Review generated migrations before applying them. Back up important data before schema changes.

## 4. Run the Application

With the backend virtual environment active, start both core services:

```powershell
npm run dev
```

This starts:

- Frontend at <http://localhost:5173>
- Backend at <http://localhost:8000>
- Interactive API documentation at <http://localhost:8000/docs>

Run services separately when needed:

```powershell
npm run dev:backend
npm run dev:frontend
npm run dev:electron
```

Run the frontend against its mock API:

```powershell
npm --prefix apps/frontend run dev:mock
```

The AI service directory is currently a scaffold. Treat `npm run dev:ai` as reserved until that service has an application entry point and dependencies.

## 5. Test, Lint, and Build

```powershell
npm run test
npm run test:backend
npm run lint
npm run lint:backend
npm run build:frontend
npm run build:backend
```

The root `npm run test` command currently runs the frontend suite. Run `npm run test:backend` separately for the API. The backend lint command requires Ruff to be installed in the active virtual environment.

## 6. Database and API Checks

```powershell
Invoke-RestMethod http://localhost:8000/health
Invoke-WebRequest http://localhost:5173
psql -U pronaflow_user -d pronaflow_db
```

Backend logs are written to the console and, when configured, under `apps/backend/logs/`.

## Troubleshooting

### Backend module is missing

Activate `apps/backend/.venv` and reinstall `apps/backend/requirements.txt`.

### Database connection fails

Confirm the PostgreSQL service is running, the role and database exist, and `DATABASE_URL` uses the same host, port, username, password, and database name.

### Frontend cannot reach the API

Confirm the backend health endpoint works and both frontend API variables end with `/api/v1`. Check that `ALLOWED_ORIGINS` includes `http://localhost:5173`.

### Port 5173 or 8000 is already in use

Stop the existing process or update the relevant local server configuration before restarting.

### PowerShell blocks virtual environment activation

Use a process-scoped policy, then activate again:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
./apps/backend/.venv/Scripts/Activate.ps1
```

## Release Workflow

Use [DEPLOYMENT.md](DEPLOYMENT.md) for release builds, migrations, health checks, rollback, and desktop packaging.
