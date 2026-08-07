# Deployment Guide

PronaFlow is released as native application processes and static build artifacts. This guide covers local release validation and deployment to a host where Node.js, Python, PostgreSQL, and a web server are installed directly.

## Release Outputs

| Component | Build or start command | Output |
|---|---|---|
| Frontend | `npm run build:frontend` | `apps/frontend/dist/` |
| Backend | `npm run build:backend` | Validated Python bytecode; source remains under `apps/backend/` |
| Desktop | `npm --prefix apps/electron run dist:win` | Installers under `apps/electron/build/` |
| AI service | Not currently released | Service is still a scaffold |

## Pre-release Checklist

- The intended revision has been reviewed.
- Frontend and backend tests pass.
- Frontend and backend builds pass.
- Production environment files are present only on the target host.
- `SECRET_KEY` and third-party credentials are stored outside Git.
- PostgreSQL has a current, restorable backup.
- The database migration and rollback plan has been reviewed.

## 1. Validate Locally

Activate `apps/backend/.venv`, then run from the repository root:

```powershell
npm ci
python -m pip install -r apps/backend/requirements.txt
npm run test
npm run test:backend
npm run lint
npm run build:frontend
npm run build:backend
```

Start the release candidate locally and verify:

```powershell
npm run dev
Invoke-RestMethod http://localhost:8000/health
Invoke-WebRequest http://localhost:5173
```

## 2. Configure the Backend Host

Create a dedicated Python virtual environment on the target host:

```bash
cd apps/backend
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Create `apps/backend/.env` from `apps/backend/.env.example` and set production values. At minimum:

- Set `DEBUG=False`.
- Use a strong, unique `SECRET_KEY`.
- Set `DATABASE_URL` to the production PostgreSQL database.
- Restrict `ALLOWED_ORIGINS` to the deployed frontend origins.
- Configure mail, storage, OAuth, billing, and Redis values only for enabled features.

Do not copy local credentials to the target host.

## 3. Back Up and Migrate PostgreSQL

Create and verify a database backup before applying schema changes:

```bash
pg_dump --host=DB_HOST --port=5432 --username=DB_USER --format=custom --file=pronaflow-before-release.dump DB_NAME
pg_restore --list pronaflow-before-release.dump
```

Apply migrations from `apps/backend/` with its virtual environment active:

```bash
python -m alembic upgrade head
python -m alembic current
```

## 4. Run the Backend Process

Start the API from `apps/backend/`:

```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 4
```

Use the host operating system's service manager to keep the process running, restart it after failure, and capture stdout and stderr. Put a TLS-enabled reverse proxy in front of port 8000; do not expose the development server directly to the public network.

Verify the API before routing user traffic:

```bash
curl --fail http://127.0.0.1:8000/health
```

## 5. Build and Publish the Frontend

Create `apps/frontend/.env.production` with the public API base URL:

```env
VITE_API_MODE=backend
VITE_API_URL=https://api.example.com/api/v1
VITE_API_BASE_URL=https://api.example.com/api/v1
```

Build from the repository root:

```bash
npm ci
npm run build:frontend
```

Publish the contents of `apps/frontend/dist/` to the web root or static hosting service. Configure an SPA fallback so unknown application routes return `index.html`. Keep the previous artifact available until post-release checks pass.

## 6. Package the Desktop App

Install dependencies and build the platform-specific package:

```powershell
npm ci
npm --prefix apps/electron run dist:win
```

For other platforms, use `dist:mac` or `dist:linux` on the corresponding operating system. Test the generated installer and confirm its API endpoint before distribution.

## Post-release Checks

- `GET /health` returns a healthy response.
- The frontend loads and can call `/api/v1`.
- Authentication, workspace loading, and one write operation succeed.
- Database migrations report the expected revision.
- Application logs contain no repeated startup or connection errors.
- The previous backend revision and frontend artifact remain available for rollback.

## Rollback

1. Stop routing new requests to the failed backend revision.
2. Restore the previous backend source and dependency set.
3. Re-publish the previous frontend artifact.
4. If the release changed the schema, follow the reviewed downgrade plan or restore the pre-release PostgreSQL backup.
5. Start the previous backend process and repeat the health checks.

Do not run an unreviewed schema downgrade against production data.
