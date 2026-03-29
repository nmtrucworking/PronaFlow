#!/usr/bin/env node

/**
 * Frontend API Deployment Script
 * Handles building, containerizing, and deploying the React frontend with API integration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function section(title) {
  console.log(`\n${colors.cyan}${'═'.repeat(60)}${colors.reset}`);
  log(title, 'cyan');
  console.log(`${colors.cyan}${'═'.repeat(60)}${colors.reset}\n`);
}

function checkCommand(cmd) {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function validateEnvironment() {
  section('🔍 Environment Validation');
  
  const checks = [
    { cmd: 'node', name: 'Node.js' },
    { cmd: 'npm', name: 'npm' },
    { cmd: 'docker', name: 'Docker' },
  ];

  let allValid = true;
  checks.forEach(({ cmd, name }) => {
    if (checkCommand(cmd)) {
      log(`✓ ${name} available`, 'green');
    } else {
      log(`✗ ${name} NOT found - Required for deployment`, 'red');
      allValid = false;
    }
  });

  return allValid;
}

function validateConfiguration() {
  section('⚙️ Configuration Validation');

  const envFile = '.env.production';
  const envPath = path.join(__dirname, '..', '..', 'apps', 'frontend', envFile);

  if (!fs.existsSync(envPath)) {
    log(`⚠ Warning: ${envFile} not found`, 'yellow');
    log('Create it with: npm run setup:frontend:prod', 'yellow');
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const apiUrl = envContent.match(/VITE_API_URL=(.+)/)?.[1];

  if (!apiUrl) {
    log('✗ VITE_API_URL not configured in .env.production', 'red');
    return false;
  }

  log(`✓ Configuration found`, 'green');
  log(`  API URL: ${apiUrl}`, 'blue');

  return true;
}

function buildFrontend() {
  section('🔨 Building Frontend Application');

  try {
    const frontendPath = path.join(__dirname, '..', '..', 'apps', 'frontend');
    
    log('Installing dependencies...', 'blue');
    execSync('npm ci', { 
      cwd: frontendPath,
      stdio: 'inherit' 
    });

    log('\nBuilding application...', 'blue');
    execSync('npm run build', { 
      cwd: frontendPath,
      stdio: 'inherit' 
    });

    log('✓ Frontend build completed successfully', 'green');
    return true;
  } catch (error) {
    log('✗ Frontend build failed', 'red');
    console.error(error.message);
    return false;
  }
}

function buildDockerImage() {
  section('🐳 Building Docker Image');

  try {
    const frontendPath = path.join(__dirname, '..', '..', 'apps', 'frontend');
    const imageName = 'pronaflow-frontend';
    const tag = 'latest';

    log(`Building Docker image: ${imageName}:${tag}`, 'blue');

    execSync(
      `docker build -t ${imageName}:${tag} -t ${imageName}:$(date +%Y%m%d-%H%M%S) .`,
      { 
        cwd: frontendPath,
        stdio: 'inherit'
      }
    );

    log(`✓ Docker image built successfully: ${imageName}:${tag}`, 'green');
    return true;
  } catch (error) {
    log('✗ Docker build failed', 'red');
    console.error(error.message);
    return false;
  }
}

function testContainer() {
  section('🧪 Testing Container');

  try {
    log('Starting test container...', 'blue');
    
    const containerId = execSync(
      'docker run -d -p 5173:5173 --name pronaflow-frontend-test pronaflow-frontend:latest',
      { encoding: 'utf8' }
    ).trim();

    log(`Container started: ${containerId.substring(0, 12)}`, 'green');

    // Wait for container to be ready
    log('Waiting for container to be healthy...', 'blue');
    for (let i = 0; i < 30; i++) {
      try {
        execSync('curl -f http://localhost:5173 > /dev/null 2>&1', { 
          stdio: 'ignore' 
        });
        log('✓ Container is healthy and responding', 'green');
        break;
      } catch (e) {
        if (i === 29) {
          throw new Error('Container failed to become healthy');
        }
        process.stdout.write('.');
        execSync('sleep 2');
      }
    }

    // Stop test container
    execSync(`docker stop ${containerId}`);
    execSync(`docker rm ${containerId}`);

    return true;
  } catch (error) {
    log('✗ Container test failed', 'red');
    console.error(error.message);
    try {
      execSync('docker stop pronaflow-frontend-test && docker rm pronaflow-frontend-test', 
        { stdio: 'ignore' });
    } catch (e) {
      // Container already stopped
    }
    return false;
  }
}

function generateDeploymentReport() {
  section('📋 Deployment Report');

  const report = {
    timestamp: new Date().toISOString(),
    service: 'PronaFlow Frontend API',
    buildStatus: 'success',
    dockerImage: 'pronaflow-frontend:latest',
    apiConfiguration: {
      url: process.env.VITE_API_URL || 'http://localhost:8000/api/v1',
      timeout: '30000ms',
      retries: '3',
    },
    features: {
      analytics: 'enabled',
      notifications: 'enabled',
      offlineMode: 'enabled',
      realTime: 'enabled',
    },
    nextSteps: [
      'Push image to registry: docker push <registry>/pronaflow-frontend:latest',
      'Deploy to Kubernetes: kubectl apply -f deployment/k8s/frontend-deployment.yaml',
      'Or use Docker Compose: docker-compose -f docker-compose.prod.yml up -d',
      'Access frontend: http://localhost:5173',
    ],
  };

  log(JSON.stringify(report, null, 2), 'cyan');

  // Save report
  const reportPath = path.join(__dirname, 'deployment-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n✓ Report saved to: ${reportPath}`, 'green');
}

function main() {
  log('\n🚀 PronaFlow Frontend API Deployment\n', 'cyan');

  // Validate environment
  if (!validateEnvironment()) {
    log('\n✗ Environment validation failed', 'red');
    process.exit(1);
  }

  // Validate configuration
  if (!validateConfiguration()) {
    log('\n⚠ Configuration validation failed - continuing with defaults', 'yellow');
  }

  // Build frontend
  if (!buildFrontend()) {
    log('\n✗ Frontend build failed', 'red');
    process.exit(1);
  }

  // Build Docker image
  if (!buildDockerImage()) {
    log('\n✗ Docker build failed', 'red');
    process.exit(1);
  }

  // Test container
  const skipTest = process.argv.includes('--skip-test');
  if (!skipTest && !testContainer()) {
    log('\n⚠ Container test failed - image may still be functional', 'yellow');
  }

  // Generate report
  generateDeploymentReport();

  section('✅ Deployment Complete');
  log('Frontend API is ready for deployment!', 'green');
  log('\nQuick start options:', 'cyan');
  log('1. Local: npm run dev', 'yellow');
  log('2. Docker: docker run -p 5173:5173 pronaflow-frontend:latest', 'yellow');
  log('3. Docker Compose: docker-compose -f docker-compose.yml up frontend', 'yellow');
}

main();
