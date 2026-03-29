#!/bin/bash

# Frontend Quick Deploy Script
# Fast deployment of PronaFlow frontend with API integration

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

function print_header() {
  echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
  echo -e "${CYAN}$1${NC}"
  echo -e "${CYAN}════════════════════════════════════════════════════════${NC}\n"
}

function print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

function print_error() {
  echo -e "${RED}✗ $1${NC}"
  exit 1
}

function print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

function print_info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

# Check requirements
print_header "📋 Checking Requirements"

if ! command -v node &> /dev/null; then
  print_error "Node.js is not installed"
fi
print_success "Node.js available"

if ! command -v npm &> /dev/null; then
  print_error "npm is not installed"
fi
print_success "npm available"

if ! command -v docker &> /dev/null; then
  print_warning "Docker is not installed - skipping Docker build"
  SKIP_DOCKER=true
else
  print_success "Docker available"
fi

# Change to frontend directory
cd "$(dirname "$0")/../../apps/frontend" || exit 1
print_success "Working directory: $(pwd)"

# Check environment
print_header "🔍 Environment Check"

if [ ! -f ".env.production" ]; then
  print_warning ".env.production not found - using defaults"
  cat > .env.production << 'EOF'
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=PronaFlow
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_REAL_TIME=true
EOF
  print_success "Created default .env.production"
else
  print_success ".env.production exists"
  grep "VITE_API_URL" .env.production || print_warning "VITE_API_URL not configured"
fi

# Install dependencies
print_header "📦 Installing Dependencies"

if [ -d "node_modules" ]; then
  print_info "Using existing node_modules"
else
  print_info "Installing packages with npm ci..."
  npm ci || print_error "Failed to install dependencies"
fi
print_success "Dependencies ready"

# Lint check
print_header "🔍 Linting"

print_info "Running ESLint..."
npm run lint || print_warning "Linting found issues (not blocking)"
print_success "Lint check complete"

# Build
print_header "🔨 Building Application"

print_info "Building with Vite..."
npm run build || print_error "Build failed"
print_success "Build successful"

# Docker build (optional)
if [ "$SKIP_DOCKER" != true ]; then
  print_header "🐳 Building Docker Image"
  
  TIMESTAMP=$(date +%Y%m%d-%H%M%S)
  IMAGE_NAME="pronaflow-frontend"
  
  print_info "Building Docker image: ${IMAGE_NAME}:latest"
  docker build -t "${IMAGE_NAME}:latest" -t "${IMAGE_NAME}:${TIMESTAMP}" . || print_error "Docker build failed"
  print_success "Docker image built: ${IMAGE_NAME}:latest"
  
  # Optional: Test container
  print_header "🧪 Testing Container"
  
  read -p "Test Docker container? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting test container on port 5173..."
    CONTAINER_ID=$(docker run -d -p 5173:5173 "${IMAGE_NAME}:latest")
    print_success "Container started: $CONTAINER_ID"
    
    # Wait and check
    sleep 3
    if curl -f http://localhost:5173 > /dev/null 2>&1; then
      print_success "Container is healthy!"
      print_info "Frontend accessible at: http://localhost:5173"
    else
      print_warning "Container may not be responding yet"
    fi
    
    print_info "Stopping test container..."
    docker stop "$CONTAINER_ID"
    docker rm "$CONTAINER_ID"
    print_success "Test complete"
  fi
fi

# Deployment options
print_header "🚀 Deployment Options"

print_info "Choose your deployment method:\n"
echo "1. Local Development (npm run preview)"
echo "2. Docker Container (docker run)"
echo "3. Docker Compose"
echo "4. Kubernetes"
echo "5. Skip - Manual deployment"

# Create deployment summary
print_header "📊 Deployment Summary"

cat > deployment-summary.json << EOF
{
  "timestamp": "$(date -I)",
  "service": "pronaflow-frontend",
  "buildStatus": "success",
  "environment": "production",
  "buildDirectory": "dist",
  "dockerImage": "pronaflow-frontend:latest",
  "apiUrl": "$(grep VITE_API_URL .env.production | cut -d'=' -f2)",
  "features": {
    "analytics": true,
    "notifications": true,
    "offlineMode": true,
    "realTime": true
  },
  "nextSteps": [
    "Push to Docker Registry: docker push <registry>/pronaflow-frontend:latest",
    "Deploy to K8s: kubectl apply -f deployment/k8s/frontend.yaml",
    "Access frontend: http://localhost:5173"
  ]
}
EOF

print_success "Deployment summary saved"
cat deployment-summary.json | jq '.' 2>/dev/null || cat deployment-summary.json

print_header "✅ Frontend Deployment Ready!"

print_info "Build artifacts location: $(pwd)/dist"
print_info "Configuration file: $(pwd)/.env.production"
print_info "Deployment summary: $(pwd)/deployment-summary.json"

echo ""
echo -e "${GREEN}Frontend is ready for deployment!${NC}"
echo -e "${BLUE}For deployment instructions, see: DEPLOYMENT.md${NC}"
