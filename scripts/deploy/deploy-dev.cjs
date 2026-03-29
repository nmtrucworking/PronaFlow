#!/usr/bin/env node

/**
 * Deployment Script for Development Environment
 */

const { execSync } = require('child_process');

const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

log('\n🚀 Deploying to Development Environment\n', 'blue');

try {
  // Build all applications
  log('📦 Building applications...', 'blue');
  execSync('npm run build:backend', { stdio: 'inherit' });
  execSync('npm run build:frontend', { stdio: 'inherit' });

  // Start Docker services
  log('\n🐳 Starting Docker services...', 'blue');
  execSync('docker-compose up -d', { stdio: 'inherit' });

  log('\n✓ Development deployment complete!', 'green');
  log('\nServices running:', 'blue');
  log('- Backend: http://localhost:8000', 'yellow');
  log('- Frontend: http://localhost:5173', 'yellow');
  log('- Database: localhost:5432', 'yellow');

} catch (error) {
  log('\n✗ Deployment failed', 'red');
  process.exit(1);
}