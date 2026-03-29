# d�?� Quick Command Reference

Danh sA�ch cA�c lệnh thường dA�ng nhất.

## d��� Setup & Initialization

```bash
# CA�i đặt hoA�n chỉnh lần đầu
npm run setup

# Setup development environment
npm run setup:dev

# Verify production setup
npm run setup:prod

# Install all dependencies
npm install
```

## d��� Development

```bash
# Start all services
npm run dev

# Start individual services
npm run dev:backend
npm run dev:frontend
npm run dev:electron
npm run dev:ai

# Watch files for development
npm run watch:backend
npm run watch:frontend
```

## d��� Testing & Quality

```bash
# Run all tests
npm run test

# Test specific workspace
npm run test:backend
npm run test:frontend

# Run with coverage
npm run test:coverage

# Linting
npm run lint
npm run lint:backend
npm run lint:frontend

# Code formatting
npm run format
```

## d��� Building

```bash
# Build all
npm run build

# Build specific
npm run build:backend
npm run build:frontend
npm run build:electron
```

## d��� Docker Commands

```bash
# Build images
npm run docker:build

# Start containers
npm run docker:up

# Stop containers
npm run docker:down

# View logs
npm run docker:logs

# Detailed logs
docker-compose logs -f [service]
```

## d�?� Deployment

```bash
# Deploy to development
npm run deploy:dev

# Deploy to production
npm run deploy:prod

# Alternative: Direct docker-compose
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml logs -f
```

## d��� Workspace Management

```bash
# Install in workspace
npm install --workspace=backend
npm install --workspace=frontend

# Run script in workspace
npm run -w backend dev
npm run -w frontend build

# Add package to workspace
npm install package-name --workspace=backend
```

## d���️ Database Commands

```bash
# Reset database
npm run dev:db-reset

# Run migrations
cd apps/backend
alembic upgrade head

# Generate migration
alembic revision --autogenerate -m "description"
```

## d��� Common Development Tasks

```bash
# Format and lint all code
npm run format && npm run lint

# Run tests before commit
npm run test && npm run lint

# Quick restart
npm run docker:down && npm run docker:up

# View all running containers
docker ps
docker-compose ps

# Connect to service
docker-compose exec backend bash
docker-compose exec database psql -U postgres -d pronaflow

# Check service health
curl http://localhost:8000/health
curl http://localhost:8001/health
```

## d��� Debugging

```bash
# View backend logs
docker-compose logs -f backend

# View frontend logs
docker-compose logs -f frontend

# View database logs
docker-compose logs -f database

# Check environment
docker-compose exec backend env | grep DATABASE

# Run Python shell
docker-compose exec backend python
```

## d��� Cleanup

```bash
# Clean build artifacts
npm run clean

# Remove containers
docker-compose down

# Remove volumes (WARNING: deletes data!)
docker-compose down -v

# Clean Docker system
docker system prune -a
```

## d��� Environment Management

```bash
# Copy environment template
cp configs/environment.template .env

# Edit environment
# On Windows:
notepad .env
# On macOS/Linux:
nano .env

# Check current environment
docker-compose exec backend env | grep "^[A-Z]"
```

## d��� View Services

```bash
# List running services
docker-compose ps

# View service status
docker-compose ps -a

# Get service IP
docker inspect [container-name] | grep IPAddress

# View service ports
docker-compose port backend 8000
```

## d��� Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Stage changes
git add .

# Commit with message
git commit -m "feat(module): description"

# Push branch
git push origin feature/my-feature

# Create pull request
# Then wait for review and merge
```

## d��� Access Points

Once running, access at:

```
Frontend:       http://localhost:5173
Backend:        http://localhost:8000
API Docs:       http://localhost:8000/docs
AI Service:     http://localhost:8001
Database:       localhost:5432
Redis:          localhost:6379
```

## d��� Tips & Tricks

```bash
# Run multiple commands
npm run lint && npm run test && npm run build

# Skip Docker and use local Python
cd apps/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# View real-time updates
docker-compose logs -f --tail=50

# Kill all containers
docker kill $(docker ps -q)

# Free up space
docker system prune -a --volumes
```

## d��� Troubleshooting Commands

```bash
# Port in use?
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # macOS/Linux

# Container won't start?
docker-compose logs backend

# Database connection issue?
docker-compose exec database pg_isready -U postgres

# Network issue?
docker network ls
docker network inspect pronaflow_pronaflow-network

# Clear cache
rm -rf apps/frontend/node_modules/.vite
npm install

# Rebuild everything
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## d��? Documentation Access

```bash
# Read README
cat README.md

# Read Development Guide
cat DEVELOPMENT.md

# Read Deployment Guide
cat DEPLOYMENT.md

# View all commands
npm run

# Check package.json scripts
cat package.json | grep -A 30 '"scripts"'
```

---

**Save this file as a bookmark for quick reference!**

For detailed information, see:
- [DEVELOPMENT.md](../../../DEVELOPMENT.md) - Full development guide
- [DEPLOYMENT.md](../../../DEPLOYMENT.md) - Full deployment guide
- [README.md](../../../README.md) - Project overview
