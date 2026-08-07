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
  log('\n📝 Creating local environment files...', 'blue');

  const envFiles = [
    {
      template: path.join(__dirname, '../../.env.example'),
      target: path.join(__dirname, '../../.env'),
    },
    {
      template: path.join(__dirname, '../../apps/backend/.env.example'),
      target: path.join(__dirname, '../../apps/backend/.env'),
    },
    {
      template: path.join(__dirname, '../../apps/frontend/.env.example'),
      target: path.join(__dirname, '../../apps/frontend/.env.local'),
    },
  ];

  envFiles.forEach(({ template, target }) => {
    if (!fs.existsSync(template)) {
      log(`⚠ Template not found: ${template}`, 'yellow');
      return;
    }

    if (!fs.existsSync(target)) {
      fs.copyFileSync(template, target);
      log(`✓ Created ${target}`, 'green');
    } else {
      log(`⊘ ${target} already exists`, 'yellow');
    }
  });
}

function installDependencies() {
  log('\n📦 Installing dependencies...', 'blue');

  const commands = [
    { cmd: 'npm install', desc: 'Root dependencies' },
    { cmd: 'npm install --prefix apps/frontend', desc: 'Frontend dependencies' },
    { cmd: 'npm install --prefix apps/electron', desc: 'Electron dependencies' },
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
  log('\n🗄️  Database setup...', 'blue');
  log('Ensure PostgreSQL is running and DATABASE_URL is set in apps/backend/.env', 'yellow');
  log('Then activate apps/backend/.venv and run:', 'yellow');
  log('python -m alembic -c apps/backend/alembic.ini upgrade head', 'yellow');
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
  log('1. Create apps/backend/.venv and install apps/backend/requirements.txt', 'yellow');
  log('2. Update environment variables and prepare PostgreSQL', 'yellow');
  log('3. Apply migrations with Alembic', 'yellow');
  log('4. Activate the backend virtual environment and run npm run dev', 'yellow');
  log('5. Visit http://localhost:5173', 'yellow');
}

main();
