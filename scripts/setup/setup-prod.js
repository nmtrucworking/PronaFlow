#!/usr/bin/env node

/**
 * Production Setup Script
 * Configures the project for production deployment
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

log('\n🚀 Production Environment Setup', 'blue');

// Check if production .env files exist
const requiredFiles = [
  '.env.production',
  'apps/backend/.env.production',
  'apps/frontend/.env.production',
];

let allPresent = true;
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    log(`✗ Missing ${file}`, 'red');
    allPresent = false;
  } else {
    log(`✓ Found ${file}`, 'green');
  }
});

if (!allPresent) {
  log('\n⚠ Please create production .env files before deploying', 'yellow');
  process.exit(1);
}

log('\n✓ Production environment verified', 'green');
log('Use "docker-compose -f docker-compose.prod.yml up" to deploy', 'blue');
