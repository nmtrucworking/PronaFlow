# PronaFlow - Project File Index

Complete index and guide to all project files and directories.

## 📖 Quick Navigation

- **[Getting Started](#getting-started)** - Setup and quick start
- **[Documentation](#documentation)** - All documentation files
- **[Markdown Organization](#markdown-organization-2026-03-29)** - New documentation hubs
- **[Root Files](#root-files)** - Configuration and setup files
- **[Applications](#applications)** - Main application directories
- **[Services](#services)** - Microservices and external services
- **[Infrastructure](#infrastructure)** - Deployment and infrastructure
- **[Configuration](#configuration)** - Settings and configuration

---

## Getting Started

### 1. Initial Setup
```bash
npm run setup
```
See: [DEVELOPMENT.md](DEVELOPMENT.md)

### 2. Development
```bash
npm run dev
```

### 3. Testing
```bash
npm run test
```

### 4. Deployment
```bash
npm run deploy:dev    # or deploy:prod
```
See: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📚 Documentation

## Markdown Organization (2026-03-29)

Primary markdown hubs after reorganization:

- `docs/root/guides/` - Root-level guides moved from repository root
- `docs/root/reports/` - Root-level completion and status reports
- `docs/root/deployment/frontend/` - Frontend deployment package docs
- `docs/storage/` - Storage architecture and operational documentation
- `apps/frontend/docs/root/` - Frontend app root docs and diagnostics
- `apps/frontend/docs/features/` - Frontend feature-level technical documents
- `apps/electron/docs/` - Electron integration and quick-start docs

Legacy root/app markdown files now contain short redirect stubs to avoid broken links.

### Main Guides
| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview and features |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Development setup and guidelines |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deployment procedures and guides |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contributing standards and workflow |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | This file's information |

### Configuration Documentation
| File | Purpose |
|------|---------|
| [configs/README.md](configs/README.md) | Configuration file guide |
| [configs/environment.template](configs/environment.template) | Environment variables template |
| [.env.example](.env.example) | Example environment file |
| [scripts/README.md](scripts/README.md) | Scripts documentation |

### Technical Documentation
Located in `docs/`:
- `docs/architecture/` - System design and architecture
- `docs/backend/` - Backend-specific documentation
- `docs/frontend/` - Frontend-specific documentation
- `docs/planning/` - Project planning and roadmap

---

## 🗂️ Root Files

### Configuration Files
```
.env                    # Environment variables (generated, not in git)
.env.example            # Example environment configuration
.env.production         # Production environment (not in git)
```

### Control Files
```
.gitignore              # Git ignore patterns
.dockerignore           # Docker build ignore patterns
docker-compose.yml      # Development services orchestration
docker-compose.prod.yml # Production services orchestration
```

### Package Management
```
package.json            # Root monorepo configuration
package-lock.json       # Dependency lock file
```

### Documentation
```
README.md               # Project overview
DEVELOPMENT.md          # Development guide
DEPLOYMENT.md           # Deployment guide
CONTRIBUTING.md         # Contributing guidelines
PROJECT_STRUCTURE.md    # This file
```

---

## 📦 Applications

### Backend (FastAPI)
```
apps/backend/
├── app/                 # Main application code
│   ├── api/            # API endpoints and routers
│   ├── core/           # Core functionality
│   ├── models/         # Database models
│   ├── schemas/        # Pydantic schemas
│   ├── services/       # Business logic
│   ├── repositories/   # Data access layer
│   ├── middleware/     # Custom middleware
│   └── utils/          # Utilities
├── migrations/         # Alembic migrations
├── tests/              # Test suite
├── main.py             # Application entry point
├── requirements.txt    # Python dependencies
├── Dockerfile          # Docker configuration
├── pytest.ini          # Pytest configuration
├── alembic.ini         # Alembic configuration
└── STRUCTURE.md        # Backend structure documentation
```

**Key Files**:
- `main.py` - FastAPI application
- `requirements.txt` - Python packages
- `alembic.ini` - Database migration setup
- `API_DOCUMENTATION.md` - API reference

### Frontend (React)
```
apps/frontend/
├── src/                 # Source code
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks
│   ├── services/       # API services
│   ├── store/          # State management
│   ├── types/          # TypeScript types
│   └── utils/          # Utilities
├── public/             # Static assets
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── Dockerfile          # Docker configuration
├── tailwind.config.js  # Tailwind configuration
└── STRUCTURE.md        # Frontend structure documentation
```

**Key Files**:
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Node dependencies
- `tailwind.config.js` - Tailwind CSS config

### Electron (Desktop)
```
apps/electron/
├── src/                 # Electron source
├── build/              # Build artifacts
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript configuration
└── Dockerfile          # Docker configuration
```

---

## 🤖 Services

### AI Service
```
services/ai-serving/
├── app/                 # Application code
│   ├── ml_engine/      # ML models
│   ├── inference/      # Inference logic
│   └── main.py         # Entry point
├── models/             # ML models directory
├── training/           # Training scripts
├── notebooks/          # Jupyter notebooks
├── requirements.txt    # Python dependencies
├── Dockerfile          # Docker configuration
└── README.md           # Service documentation
```

---

## 🚀 Infrastructure

### Deployment
```
deployment/
├── infrastructure/     # Infrastructure-as-Code
│   ├── docker/        # Docker configs
│   ├── k8s/           # Kubernetes manifests
│   ├── nginx/         # Nginx configuration
│   ├── terraform/     # Terraform IaC
│   └── docker-compose.yml
├── k8s/               # Kubernetes files
├── nginx/             # Nginx configs
├── terraform/         # Terraform modules
└── .github/           # GitHub Actions workflows
```

**Key Files**:
- `docker/Dockerfile.*` - Container definitions
- `k8s/deployment.yaml` - Kubernetes deployments
- `nginx/nginx.conf` - Reverse proxy config
- `terraform/*.tf` - Infrastructure code

---

## ⚙️ Configuration

### Configs Directory
```
configs/
├── README.md                    # Configuration guide
├── environment.template         # Environment template
├── shared.config.json          # Shared configuration
└── secrets.example.json        # Secrets template
```

**Usage**:
1. Copy `environment.template` to `.env` files
2. Fill in actual values (don't commit `.env`)
3. Use `.env.local` for development overrides
4. Use `.env.production` for production settings

---

## 📝 Scripts

### Setup Scripts
```
scripts/setup/
├── setup.js              # Complete project setup
├── setup-dev.js          # Development environment
└── setup-prod.js         # Production verification
```

**Run**: `npm run setup`

### Development Scripts
```
scripts/dev/
├── watch.js              # File watcher
└── db-reset.js           # Database reset
```

**Run**: `npm run dev`

### Deployment Scripts
```
scripts/deploy/
├── deploy-dev.js         # Development deployment
└── deploy-prod.js        # Production deployment
```

**Run**: `npm run deploy:dev` or `npm run deploy:prod`

---

## 💾 Storage

### Data Storage
```
storage/
├── temp/                # Temporary files
└── uploads/             # User uploads
```

---

## 🔄 Workflow Commands

### Setup & Installation
```bash
npm run setup              # Complete setup
npm run setup:dev          # Dev environment
npm run setup:prod         # Prod verification
npm install                # Install dependencies
npm install --workspace=backend   # Workspace install
```

### Development
```bash
npm run dev                # All services
npm run dev:backend        # Backend only
npm run dev:frontend       # Frontend only
npm run dev:electron       # Electron app
npm run dev:ai             # AI service
```

### Testing
```bash
npm run test               # All tests
npm run test:backend       # Backend tests
npm run test:frontend      # Frontend tests
npm run test:coverage      # Coverage report
```

### Code Quality
```bash
npm run lint               # Lint all
npm run lint:backend       # Backend lint
npm run lint:frontend      # Frontend lint
npm run format             # Format code
```

### Building
```bash
npm run build              # Build all
npm run build:backend      # Backend build
npm run build:frontend     # Frontend build
npm run build:electron     # Electron build
```

### Docker
```bash
npm run docker:build       # Build images
npm run docker:up          # Start services
npm run docker:down        # Stop services
npm run docker:logs        # View logs
```

### Deployment
```bash
npm run deploy:dev         # Deploy to development
npm run deploy:prod        # Deploy to production
```

### Cleanup
```bash
npm run clean              # Clean all artifacts
```

---

## 📋 Checklist for New Developers

- [ ] Read [README.md](README.md) for project overview
- [ ] Read [DEVELOPMENT.md](DEVELOPMENT.md) for setup
- [ ] Read [CONTRIBUTING.md](CONTRIBUTING.md) for standards
- [ ] Run `npm run setup` to initialize
- [ ] Run `npm run dev` to start development
- [ ] Explore `docs/` for detailed documentation
- [ ] Review relevant app structure (backend/frontend)
- [ ] Join team channels for support

---

## 🔗 Important Links

### Documentation
- **[README.md](README.md)** - Start here!
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution rules

### Configuration
- **[configs/README.md](configs/README.md)** - Config guide
- **[configs/environment.template](configs/environment.template)** - Env template
- **[.env.example](.env.example)** - Example env file

### Applications
- **[apps/backend/STRUCTURE.md](apps/backend/STRUCTURE.md)** - Backend structure
- **[apps/frontend/STRUCTURE.md](apps/frontend/STRUCTURE.md)** - Frontend structure
- **[apps/backend/API_DOCUMENTATION.md](apps/backend/API_DOCUMENTATION.md)** - API docs

### Additional Resources
- **[docs/](docs/)** - Technical documentation
- **[deployment/](deployment/)** - Deployment configs
- **[scripts/README.md](scripts/README.md)** - Scripts guide

---

## ❓ FAQ

**Q: How do I get started?**  
A: Read [DEVELOPMENT.md](DEVELOPMENT.md) and run `npm run setup`

**Q: How do I deploy?**  
A: Read [DEPLOYMENT.md](DEPLOYMENT.md) and use `npm run deploy:dev` or `npm run deploy:prod`

**Q: What are the coding standards?**  
A: See [CONTRIBUTING.md](CONTRIBUTING.md)

**Q: Where is the API documentation?**  
A: See [apps/backend/API_DOCUMENTATION.md](apps/backend/API_DOCUMENTATION.md)

**Q: How do I add a new feature?**  
A: Follow the workflow in [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Last Updated**: February 3, 2026  
**Version**: 2.0+  
**Status**: Complete
