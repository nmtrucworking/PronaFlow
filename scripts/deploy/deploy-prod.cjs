#!/usr/bin/env node

/**
 * Deployment Script for Production Environment
 */

const fs = require('fs');
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

function checkRequired(files) {
  log('\n🔍 Verifying production configuration...', 'blue');
  let allPresent = true;
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      log(`✓ ${file}`, 'green');
    } else {
      log(`✗ ${file} missing`, 'red');
      allPresent = false;
    }
  });

  return allPresent;
}

log('\n🚀 Deploying to Production Environment\n', 'blue');

// Check required files
const requiredFiles = [
  '.env.production',
  'apps/backend/.env.production',
  'apps/frontend/.env.production',
];

if (!checkRequired(requiredFiles)) {
  log('\n⚠ Missing required production configuration files', 'yellow');
  process.exit(1);
}

try {
  // Build applications
  log('\n📦 Building applications...', 'blue');
  execSync('npm run build:backend', { stdio: 'inherit' });
  execSync('npm run build:frontend', { stdio: 'inherit' });

  // Deploy with Docker Compose
  log('\n🐳 Deploying with Docker Compose...', 'blue');
  execSync('docker-compose -f docker-compose.prod.yml up -d', { stdio: 'inherit' });

  log('\n✓ Production deployment complete!', 'green');
  log('\nVerify services:', 'blue');
  log('docker-compose -f docker-compose.prod.yml logs', 'yellow');

} catch (error) {
  log('\n✗ Production deployment failed', 'red');
  process.exit(1);
}