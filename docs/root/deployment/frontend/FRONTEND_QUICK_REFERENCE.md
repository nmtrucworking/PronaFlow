# Frontend API Deployment - Quick Reference

## d�?� Deploy in 3 Steps

### Step 1: Configure
```bash
# Interactive setup
npm run setup:frontend:prod

# Or manually edit
vi apps/frontend/.env.production
```

### Step 2: Build
```bash
# Build frontend
npm run build:frontend

# Verify build
ls -la apps/frontend/dist
```

### Step 3: Deploy
```bash
# Option A: Node.js script
npm run deploy:frontend

# Option B: Docker Compose
docker-compose -f docker-compose.prod.yml up -d frontend

# Option C: Kubernetes
kubectl apply -f deployment/k8s/frontend-deployment.yaml
```

---

## d��� Common Commands

```bash
# Development
npm run dev:frontend     # Start dev server
npm run lint            # Run linter
npm run test:frontend   # Run tests

# Production Build
npm run build:frontend  # Build for production
npm run deploy:frontend # Full deployment workflow

# Docker
docker build -t pronaflow-frontend:latest apps/frontend
docker run -p 5173:5173 pronaflow-frontend:latest

# Verify
curl http://localhost:5173
curl http://localhost:8000/api/v1/health
```

---

## �?�️ Configuration Checklist

```env
# REQUIRED
VITE_API_URL=https://api.pronaflow.com/api/v1

# RECOMMENDED
VITE_API_TIMEOUT=30000
VITE_APP_NAME=PronaFlow
VITE_APP_VERSION=1.0.0

# OPTIONAL
VITE_AI_SERVICE_URL=https://ai-service.pronaflow.com/api/v1
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_REAL_TIME=true
```

---

## d��� API Services Available

| Service | Endpoint | Purpose |
|---------|----------|---------|
| Auth | POST /auth/login | User authentication |
| Workspace | GET /workspaces | List workspaces |
| Project | GET /projects | List projects |
| Task | GET /tasks | List tasks |
| Notification | GET /notifications | Get notifications |
| Analytics | GET /analytics/projects | Project metrics |
| Integration | GET /integrations | List integrations |

---

## d��� Key Files Created

```
✅ apps/frontend/Dockerfile                  Production Docker image
✅ apps/frontend/.env.production             Configuration
✅ apps/frontend/DEPLOYMENT.md               Detailed guide
✅ apps/frontend/API_INTEGRATION.md          API documentation
✅ scripts/deploy/deploy-frontend-api.js     Deployment script
✅ scripts/setup/setup-frontend-prod.js      Setup wizard
✅ scripts/deploy/deploy-frontend.sh         Bash script
✅ FRONTEND_DEPLOYMENT_SETUP.md              Complete summary
✅ package.json (updated)                    npm commands
```

---

## d��� Troubleshooting

| Issue | Solution |
|-------|----------|
| API not responding | Check `VITE_API_URL` and backend is running |
| Login fails | Verify CORS configuration on backend |
| Build fails | Run `npm ci` and check Node version |
| Docker error | Ensure Docker daemon is running |
| Port already in use | Change port or kill existing process |

---

## d��? Deployment Status

**Frontend API Deployment: ✅ READY**

- ✅ Docker support configured
- ✅ Production environment setup
- ✅ API integration complete
- ✅ Deployment scripts created
- ✅ Documentation provided
- ✅ Security configured
- ✅ Monitoring ready

---

## d��� Resources

| Resource | Location |
|----------|----------|
| Full Guide | [FRONTEND_DEPLOYMENT_SETUP.md](./FRONTEND_DEPLOYMENT_SETUP.md) |
| Deployment | [DEPLOYMENT.md](../../../../apps/frontend/DEPLOYMENT.md) |
| API Docs | [API_INTEGRATION.md](../../../../apps/frontend/API_INTEGRATION.md) |
| Scripts | [scripts/deploy/](../../../../scripts/deploy/) |

---

## d��� Pro Tips

1. **Test Locally First**
   ```bash
   npm run build:frontend && npm run preview
   ```

2. **Validate API Before Deploy**
   ```bash
   curl -H "Authorization: Bearer $TOKEN" $VITE_API_URL/health
   ```

3. **Check Container Health**
   ```bash
   docker ps --format "table {{.Names}}\t{{.Status}}"
   ```

4. **Monitor Logs**
   ```bash
   docker-compose logs -f frontend
   ```

5. **Quick Rollback**
   ```bash
   docker-compose up -d  # Uses previous image
   ```

---

**Last Updated**: February 7, 2026  
**Status**: Production Ready ✅  
**Support**: See documentation files for detailed information
