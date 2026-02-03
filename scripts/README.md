# Scripts Directory

This directory contains utility scripts for development, setup, and deployment.

## Structure

### setup/
- `setup.js` - Main setup script for initializing the project
- `setup-dev.js` - Development environment configuration
- `setup-prod.js` - Production environment verification

### dev/
- `watch.js` - File watcher for development
- `db-reset.js` - Database initialization for development

### deploy/
- `deploy-dev.js` - Deploy to development environment
- `deploy-prod.js` - Deploy to production environment

## Usage

### Initial Setup
```bash
npm run setup
```

### Development Setup
```bash
npm run setup:dev
```

### Production Setup
```bash
npm run setup:prod
```

### Deployment
```bash
# Deploy to development
npm run deploy:dev

# Deploy to production
npm run deploy:prod
```

## Scripts Details

### setup.js
Performs complete project initialization:
- Checks prerequisites (Node.js, Python, Docker)
- Creates environment files
- Installs dependencies
- Initializes database

### setup-dev.js
Configures development environment:
- Creates .env.local files
- Sets debug mode
- Configures hot-reload

### setup-prod.js
Verifies production configuration:
- Checks required .env.production files
- Validates production settings

### deploy-dev.js
Deploys to development:
- Builds all applications
- Starts Docker services
- Configures development endpoints

### deploy-prod.js
Deploys to production:
- Validates production configuration
- Builds optimized bundles
- Deploys with docker-compose.prod.yml
