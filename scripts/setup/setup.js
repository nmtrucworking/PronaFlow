#!/usr/bin/env node

/**
 * PronaFlow Project Setup Script
 * Initializes development environment for all applications
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

function execCommand(command, description) {
  log(`\n${description}...`, 'blue');
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✓ ${description} completed`, 'green');
    return true;
  } catch (error) {
    log(`✗ ${description} failed`, 'red');
    return false;
  }
}

function checkPrerequisites() {
  log('\n📋 Checking prerequisites...', 'blue');
  
  const requirements = [
    { name: 'Node.js 18+', cmd: 'node --version' },
    { name: 'npm 9+', cmd: 'npm --version' },
    { name: 'Python 3.9+', cmd: 'python --version' },
    { name: 'Docker', cmd: 'docker --version' },
  ];

  let allMet = true;
  requirements.forEach(req => {
    try {
      const output = execSync(req.cmd, { encoding: 'utf-8' }).trim();
      log(`✓ ${req.name}: ${output}`, 'green');
    } catch {
      log(`✗ ${req.name} not found`, 'red');
      allMet = false;
    }
  });

  return allMet;
}

function createEnvFiles() {
  log('\n📝 Creating environment files...', 'blue');

  const templatePath = path.join(__dirname, '../../configs/environment.template');
  const locations = [
    path.join(__dirname, '../../.env'),
    path.join(__dirname, '../../apps/backend/.env'),
    path.join(__dirname, '../../apps/frontend/.env'),
    path.join(__dirname, '../../services/ai-serving/.env'),
  ];

  if (!fs.existsSync(templatePath)) {
    log('⚠ Template file not found', 'yellow');
    return;
  }

  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  locations.forEach(envPath => {
    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, templateContent);
      log(`✓ Created ${envPath}`, 'green');
    } else {
      log(`⊘ ${envPath} already exists`, 'yellow');
    }
  });
}

function installDependencies() {
  log('\n📦 Installing dependencies...', 'blue');

  const commands = [
    { cmd: 'npm install', desc: 'Root dependencies' },
    { cmd: 'npm install --workspace=backend', desc: 'Backend dependencies' },
    { cmd: 'npm install --workspace=frontend', desc: 'Frontend dependencies' },
  ];

  let allSuccess = true;
  commands.forEach(({ cmd, desc }) => {
    if (!execCommand(cmd, desc)) {
      allSuccess = false;
    }
  });

  return allSuccess;
}

function setupDatabase() {
  log('\n🗄️  Setting up database...', 'blue');
  log('Please ensure PostgreSQL is running and configured in .env files', 'yellow');
  
  const backendPath = path.join(__dirname, '../../apps/backend');
  const initDbScript = path.join(backendPath, 'init_db.py');

  if (fs.existsSync(initDbScript)) {
    execCommand(
      `cd "${backendPath}" && python init_db.py`,
      'Initializing database'
    );
  } else {
    log('⚠ Database initialization script not found', 'yellow');
  }
}

function main() {
  log('\n╔════════════════════════════════════════╗', 'blue');
  log('║   PronaFlow Project Setup               ║', 'blue');
  log('║   Initializing Development Environment  ║', 'blue');
  log('╚════════════════════════════════════════╝\n', 'blue');

  // Check prerequisites
  if (!checkPrerequisites()) {
    log('\n⚠ Some prerequisites are missing. Please install them before continuing.', 'yellow');
    process.exit(1);
  }

  // Create environment files
  createEnvFiles();

  // Install dependencies
  if (!installDependencies()) {
    log('\n⚠ Some dependencies failed to install', 'yellow');
  }

  // Setup database
  setupDatabase();

  log('\n╔════════════════════════════════════════╗', 'blue');
  log('║   ✓ Setup Complete!                    ║', 'green');
  log('╚════════════════════════════════════════╝\n', 'blue');
  
  log('Next steps:', 'blue');
  log('1. Update environment variables in .env files', 'yellow');
  log('2. Start backend: npm run dev:backend', 'yellow');
  log('3. Start frontend: npm run dev:frontend', 'yellow');
  log('4. Visit http://localhost:5173', 'yellow');
}

main();
