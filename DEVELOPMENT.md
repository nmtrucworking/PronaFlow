# Development Guide

A comprehensive guide for setting up and working with PronaFlow in a development environment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Running the Application](#running-the-application)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Debugging](#debugging)
7. [Git Workflow](#git-workflow)
8. [Common Issues](#common-issues)

## Prerequisites

Before starting development, ensure you have:

- **Node.js 18+** - JavaScript runtime
  ```bash
  node --version  # Should be v18.0.0 or higher
  ```

- **npm 9+** - Node package manager
  ```bash
  npm --version   # Should be 9.0.0 or higher
  ```

- **Python 3.9+** - Python runtime
  ```bash
  python --version  # Should be 3.9.0 or higher
  ```

- **Docker & Docker Compose** - Container platform
  ```bash
  docker --version
  docker-compose --version
  ```

- **PostgreSQL 12+** - Database (can run in Docker)
  ```bash
  psql --version  # Optional if using Docker
  ```

- **Git** - Version control
  ```bash
  git --version
  ```

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pronaflow
```

### 2. Run the Setup Script

```bash
npm run setup
```

This script will:
- Check all prerequisites
- Create environment files (.env)
- Install all dependencies
- Initialize the database

### 3. Configure Environment Variables

Edit the generated `.env` files in each directory:

- `.env` - Root configuration
- `apps/backend/.env` - Backend API configuration
- `apps/frontend/.env` - Frontend configuration
- `services/ai-serving/.env` - AI service configuration

**Important**: Never commit `.env` files to Git.

### 4. Initialize the Database

```bash
cd apps/backend
python init_db.py
```

## Running the Application

### Development Mode (All Services)

```bash
npm run dev
```

This starts:
- Backend API on `http://localhost:8000`
- Frontend on `http://localhost:5173`
- Vite dev server with hot reload

### Individual Services

**Backend Only**
```bash
npm run dev:backend
# Or
cd apps/backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend Only**
```bash
npm run dev:frontend
# Or
cd apps/frontend
npm run dev
```

**Electron Desktop**
```bash
npm run dev:electron
```

**AI Service**
```bash
npm run dev:ai
# Or
cd services/ai-serving
python -m uvicorn app.main:app --reload
```

### Docker Compose

```bash
# Start all services
docker-compose up

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose up --build
```

## Coding Standards

### Backend (Python/FastAPI)

**Style Guide**: PEP 8

```bash
# Format code with Black
black apps/backend

# Check linting with flake8
flake8 apps/backend

# Type checking with mypy
mypy apps/backend
```

**Directory Structure**:
```
app/
├── api/           # API endpoints
├── core/          # Core functionality
├── models/        # Database models
├── schemas/       # Pydantic schemas
├── services/      # Business logic
├── repositories/  # Data access
└── utils/         # Utilities
```

**File Naming**:
- Models: `snake_case.py`
- Routes: `{module}_routes.py`
- Services: `{module}_service.py`

### Frontend (React/TypeScript)

**Style Guide**: Airbnb JavaScript Style Guide

```bash
# Format code with Prettier
npm run format --workspace=frontend

# Lint with ESLint
npm run lint --workspace=frontend
```

**Directory Structure**:
```
src/
├── components/    # React components
├── pages/         # Page components
├── hooks/         # Custom hooks
├── services/      # API services
├── store/         # State management
├── utils/         # Utilities
└── types/         # TypeScript types
```

**File Naming**:
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Hooks: `useHookName.ts`

### Commit Messages

Follow the Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only
- `style`: Changes that don't affect functionality
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build, dependencies, etc.

**Examples**:
```
feat(auth): implement JWT token refresh
fix(task): resolve task creation validation error
docs(api): update endpoint documentation
```

## Testing

### Backend Tests

```bash
cd apps/backend

# Run all tests
pytest

# Run specific test file
pytest tests/test_auth.py

# Run with coverage
pytest --cov=app

# Run with verbose output
pytest -v

# Run in watch mode
pytest-watch
```

**Test Structure**:
```
tests/
├── test_api/
│   ├── test_auth.py
│   ├── test_tasks.py
│   └── ...
├── test_services/
└── test_repositories/
```

### Frontend Tests

```bash
cd apps/frontend

# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

**Test Files**: Should be colocated with components using `.test.tsx` or `.spec.tsx`

## Debugging

### Backend Debugging

**Using VSCode**:
1. Install the Python extension
2. Set breakpoints in the editor
3. Run: `npm run debug:backend`
4. Debug using VSCode's debugger

**Using pdb**:
```python
# In your code
import pdb; pdb.set_trace()
```

### Frontend Debugging

**Using VSCode**:
1. Install the Debugger for Chrome extension
2. Use the browser's DevTools (F12)
3. Set breakpoints in the code

**Using console.log**:
```typescript
console.log('Debug info:', variable);
console.error('Error:', error);
```

### Database Debugging

```bash
# Connect to PostgreSQL
psql -U postgres -d pronaflow

# View tables
\dt

# View table structure
\d table_name

# Execute SQL
SELECT * FROM users LIMIT 10;
```

## Git Workflow

### Creating a Feature Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/my-feature
```

### Committing Changes

```bash
# Stage changes
git add .

# Commit with message
git commit -m "feat(module): description of changes"

# Push to remote
git push origin feature/my-feature
```

### Creating a Pull Request

1. Push your branch to GitHub
2. Create a Pull Request
3. Fill in the PR template
4. Request reviewers
5. Address review comments
6. Merge when approved

### Keeping Your Branch Updated

```bash
# From your feature branch
git fetch origin
git rebase origin/main

# Or use merge (if you prefer)
git merge origin/main
```

## Common Issues

### Issue: `ModuleNotFoundError` in Backend

**Solution**:
```bash
cd apps/backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Issue: `Cannot find module` in Frontend

**Solution**:
```bash
cd apps/frontend
npm install
npm install --save missing-module
```

### Issue: Port Already in Use

**Solution**:
```bash
# Find process using port 8000
lsof -i :8000  # On macOS/Linux

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=8001 npm run dev:backend
```

### Issue: Database Connection Refused

**Solution**:
```bash
# Check if PostgreSQL is running
docker-compose ps

# Start PostgreSQL
docker-compose up -d postgres

# Check logs
docker-compose logs postgres
```

### Issue: Hot Reload Not Working

**Solution**:
```bash
# Clear Vite cache
rm -rf apps/frontend/node_modules/.vite

# Restart dev server
npm run dev:frontend
```

## Additional Resources

- [Backend API Documentation](apps/backend/API_DOCUMENTATION.md)
- [Frontend Architecture](apps/frontend/STRUCTURE.md)
- [Docker Setup Guide](docs/architecture/)
- [Testing Guide](docs/backend/testing.md)

## Support

For questions or issues:
1. Check the documentation in `docs/`
2. Review existing GitHub Issues
3. Ask in team channels
4. Create a new issue with detailed information

---

**Last Updated**: February 3, 2026
