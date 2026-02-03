# Deployment Guide

Comprehensive guide for deploying PronaFlow to various environments.

## Table of Contents

1. [Deployment Environments](#deployment-environments)
2. [Prerequisites](#prerequisites)
3. [Development Deployment](#development-deployment)
4. [Production Deployment](#production-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Kubernetes Deployment](#kubernetes-deployment)
7. [Database Migration](#database-migration)
8. [Monitoring & Logging](#monitoring--logging)
9. [Rollback Procedures](#rollback-procedures)
10. [Troubleshooting](#troubleshooting)

## Deployment Environments

| Environment | Usage | URL | Database |
|------------|-------|-----|----------|
| **Local** | Development | http://localhost:5173 | SQLite/PostgreSQL |
| **Development** | Team testing | https://dev.pronaflow.com | PostgreSQL |
| **Staging** | Pre-production | https://staging.pronaflow.com | PostgreSQL |
| **Production** | Live | https://pronaflow.com | PostgreSQL (Replicated) |

## Prerequisites

### Required Tools

- Docker & Docker Compose 20.10+
- Kubernetes cluster (for K8s deployment)
- Terraform 1.0+ (for Infrastructure-as-Code)
- kubectl 1.21+ (for K8s management)
- Helm 3.0+ (for K8s package management)

### Required Credentials

- Docker Registry credentials
- Cloud provider credentials (AWS/Azure/GCP)
- Database credentials
- SSL/TLS certificates
- API tokens for third-party services

### Configuration Files

```bash
# Copy production environment files
cp configs/environment.template .env.production
cp configs/environment.template apps/backend/.env.production
cp configs/environment.template apps/frontend/.env.production

# Copy secrets
cp configs/secrets.example.json configs/secrets.production.json
# Edit with actual values
```

## Development Deployment

### Quick Start

```bash
# Install dependencies
npm run setup

# Start services
npm run dev

# Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Docker Compose Development

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset database
docker-compose down -v
docker-compose up -d
```

## Production Deployment

### Pre-Deployment Checklist

- [ ] All tests passing locally
- [ ] Code reviewed and approved
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] SSL certificates valid
- [ ] Monitoring configured
- [ ] Rollback plan prepared

### 1. Build and Push Docker Images

```bash
# Configure Docker registry
docker login

# Build images
docker-compose -f docker-compose.prod.yml build

# Tag images
docker tag pronaflow-backend:latest myregistry/pronaflow-backend:v2.0.0
docker tag pronaflow-frontend:latest myregistry/pronaflow-frontend:v2.0.0

# Push to registry
docker push myregistry/pronaflow-backend:v2.0.0
docker push myregistry/pronaflow-frontend:v2.0.0
```

### 2. Deploy with Docker Compose

```bash
# SSH into production server
ssh user@production-server

# Pull latest code
git pull origin main

# Copy environment files
cp .env.production .env
cp apps/backend/.env.production apps/backend/.env
cp apps/frontend/.env.production apps/frontend/.env

# Deploy services
docker-compose -f docker-compose.prod.yml up -d

# Verify deployment
docker-compose -f docker-compose.prod.yml ps
```

### 3. Database Migration

```bash
# Connect to backend container
docker-compose -f docker-compose.prod.yml exec backend bash

# Run migrations
cd apps/backend
alembic upgrade head

# Exit container
exit
```

### 4. Verify Deployment

```bash
# Check service health
curl https://pronaflow.com/api/health

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Test API endpoints
curl https://pronaflow.com/api/v1/workspaces

# Test frontend
curl https://pronaflow.com/
```

## Docker Deployment

### Multi-Stage Build

The Dockerfiles use multi-stage builds for optimized images:

```dockerfile
# Stage 1: Build
FROM node:18 AS builder

# Stage 2: Runtime
FROM node:18-alpine
COPY --from=builder /app/dist /app/dist
```

### Docker Compose Files

- **docker-compose.yml** - Development configuration
- **docker-compose.prod.yml** - Production configuration

### Building Images

```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build backend

# Build without cache
docker-compose build --no-cache

# View build logs
docker-compose build --verbose
```

### Managing Containers

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose stop

# Remove containers
docker-compose rm

# View container logs
docker-compose logs backend -f

# Execute command in container
docker-compose exec backend python init_db.py

# Access container shell
docker-compose exec backend bash
```

## Kubernetes Deployment

### Prerequisites

```bash
# Install kubectl
kubectl version --client

# Configure kubeconfig
export KUBECONFIG=~/.kube/config

# Verify cluster access
kubectl cluster-info
```

### Deploy to Kubernetes

```bash
# Navigate to k8s directory
cd deployment/k8s

# Create namespace
kubectl create namespace pronaflow

# Create secrets
kubectl create secret generic pronaflow-secrets \
  --from-file=.env.production \
  -n pronaflow

# Deploy applications
kubectl apply -f deployment/

# Verify deployment
kubectl get pods -n pronaflow
kubectl get services -n pronaflow
```

### Kubernetes Commands

```bash
# View deployment status
kubectl get deployments -n pronaflow

# View pods
kubectl get pods -n pronaflow

# View logs
kubectl logs -f deployment/backend -n pronaflow

# Scale deployment
kubectl scale deployment backend --replicas=3 -n pronaflow

# Update image
kubectl set image deployment/backend \
  backend=myregistry/pronaflow-backend:v2.0.1 \
  -n pronaflow

# Port forward
kubectl port-forward svc/backend 8000:8000 -n pronaflow

# Get shell access
kubectl exec -it pod/backend-xyz -n pronaflow -- bash
```

## Database Migration

### Alembic Setup

```bash
# Generate migration
alembic revision --autogenerate -m "Add users table"

# Review migration file
cat alembic/versions/001_add_users_table.py

# Apply migration
alembic upgrade head

# Rollback migration
alembic downgrade -1

# View migration status
alembic current
alembic history
```

### Backup Before Migration

```bash
# Backup database
pg_dump -U postgres -d pronaflow > backup_$(date +%Y%m%d_%H%M%S).sql

# Verify backup
ls -lh backup_*.sql

# Restore from backup
psql -U postgres -d pronaflow < backup_20240203_120000.sql
```

## Monitoring & Logging

### Health Checks

```bash
# Backend health
curl http://localhost:8000/health

# Frontend health
curl http://localhost:5173/

# Database health
docker-compose exec database pg_isready -U postgres
```

### Logging

```bash
# View application logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Filter logs
docker-compose logs backend | grep ERROR

# Save logs to file
docker-compose logs > logs.txt

# View logs with timestamps
docker-compose logs -f --timestamps
```

### Monitoring Setup

Configure monitoring with:
- Prometheus for metrics
- Grafana for dashboards
- ELK stack for logging
- Datadog or New Relic for APM

See [monitoring documentation](docs/deployment/monitoring.md) for details.

## Rollback Procedures

### Docker Compose Rollback

```bash
# Stop current version
docker-compose -f docker-compose.prod.yml down

# Checkout previous version
git checkout HEAD~1

# Deploy previous version
docker-compose -f docker-compose.prod.yml up -d

# Verify
docker-compose -f docker-compose.prod.yml ps
```

### Kubernetes Rollback

```bash
# View rollout history
kubectl rollout history deployment/backend -n pronaflow

# Rollback to previous version
kubectl rollout undo deployment/backend -n pronaflow

# Rollback to specific revision
kubectl rollout undo deployment/backend --to-revision=2 -n pronaflow

# Monitor rollback
kubectl rollout status deployment/backend -n pronaflow
```

### Database Rollback

```bash
# List available backups
ls -la backups/

# Restore from backup
psql -U postgres -d pronaflow < backups/backup_20240203_120000.sql

# Verify restoration
psql -U postgres -d pronaflow -c "SELECT COUNT(*) FROM users;"
```

## Troubleshooting

### Common Issues

**Issue: Container fails to start**
```bash
# Check logs
docker-compose logs backend

# Check container status
docker-compose ps

# Rebuild image
docker-compose build --no-cache backend
```

**Issue: Database connection error**
```bash
# Verify database is running
docker-compose ps database

# Check database logs
docker-compose logs database

# Test connection
docker-compose exec backend psql -U postgres -d pronaflow -c "SELECT 1"
```

**Issue: Out of disk space**
```bash
# Check disk usage
docker system df

# Clean up unused images
docker image prune -a

# Clean up volumes
docker volume prune
```

**Issue: Performance degradation**
```bash
# Check resource usage
docker stats

# View slow queries (if using PostgreSQL)
docker-compose exec database psql -U postgres -d pronaflow \
  -c "SELECT query FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;"
```

### Getting Help

1. Check logs: `docker-compose logs <service>`
2. Review status: `docker-compose ps`
3. Check documentation: [docs/](docs/)
4. Create issue with details: logs, configuration, error messages

---

**Last Updated**: February 3, 2026  
**Version**: 2.0+
