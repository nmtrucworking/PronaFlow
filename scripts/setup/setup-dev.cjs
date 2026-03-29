#!/usr/bin/env node

/**
 * Development Setup Script
 * Configures the project for development with hot-reload and debugging
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

log('\n📚 Development Environment Setup', 'blue');

// Create .env.local files for development overrides
const devEnvContent = `# Development Environment Overrides
NODE_ENV=development
PYTHON_ENV=development
DEBUG=true
LOG_LEVEL=debug
`;

const envFiles = [
  '.env.local',
  'apps/backend/.env.local',
  'apps/frontend/.env.local',
];

envFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, devEnvContent);
    log(`✓ Created ${file}`, 'green');
  }
});

log('\n✓ Development environment configured', 'green');
log('Run "npm run dev" to start all services in development mode', 'blue');