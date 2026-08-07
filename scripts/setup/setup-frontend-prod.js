#!/usr/bin/env node

/**
 * Frontend Setup Script for Production
 * Configures environment and validates API connection
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

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

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${question}${colors.reset} `, (answer) => {
      resolve(answer);
    });
  });
}

async function setupFrontendProduction() {
  log('\n🚀 PronaFlow Frontend Production Setup\n', 'cyan');

  const rl = createInterface();

  try {
    // Get API URL
    const defaultApiUrl = process.env.VITE_API_URL || 'https://api.pronaflow.com/api/v1';
    const apiUrl = await askQuestion(rl, `API URL [${defaultApiUrl}]:`);
    const finalApiUrl = apiUrl || defaultApiUrl;

    // Get API timeout
    const defaultTimeout = '30000';
    const timeout = await askQuestion(rl, `API Timeout (ms) [${defaultTimeout}]:`);
    const finalTimeout = timeout || defaultTimeout;

    // Get AI service URL
    const defaultAiUrl = process.env.VITE_AI_SERVICE_URL || 'https://ai-service.pronaflow.com/api/v1';
    const aiUrl = await askQuestion(rl, `AI Service URL [${defaultAiUrl}]:`);
    const finalAiUrl = aiUrl || defaultAiUrl;

    // Ask about features
    const analytics = await askQuestion(rl, 'Enable analytics? [yes]');
    const notifications = await askQuestion(rl, 'Enable notifications? [yes]');
    const offline = await askQuestion(rl, 'Enable offline mode? [yes]');
    const realtime = await askQuestion(rl, 'Enable real-time features? [yes]');

    rl.close();

    // Generate .env.production
    const envContent = `# Frontend API Configuration - Generated at ${new Date().toISOString()}

# API Settings
VITE_API_URL=${finalApiUrl}
VITE_API_TIMEOUT=${finalTimeout}

# App Configuration
VITE_APP_NAME=PronaFlow
VITE_APP_VERSION=1.0.0

# AI Service
VITE_AI_SERVICE_URL=${finalAiUrl}
VITE_AI_ENABLED=${aiUrl ? 'true' : 'false'}

# Feature Flags
VITE_ENABLE_ANALYTICS=${analytics.toLowerCase() !== 'no' ? 'true' : 'false'}
VITE_ENABLE_NOTIFICATIONS=${notifications.toLowerCase() !== 'no' ? 'true' : 'false'}
VITE_ENABLE_OFFLINE_MODE=${offline.toLowerCase() !== 'no' ? 'true' : 'false'}
VITE_ENABLE_REAL_TIME=${realtime.toLowerCase() !== 'no' ? 'true' : 'false'}

# Advanced
VITE_LOG_LEVEL=info
VITE_DEBUG_MODE=false
`;

    const frontendPath = path.join(__dirname, '..', '..', 'apps', 'frontend');
    const envPath = path.join(frontendPath, '.env.production');

    fs.writeFileSync(envPath, envContent);
    log(`✓ Created .env.production`, 'green');

    // Validate API connection
    log('\n🔍 Validating API connection...', 'blue');
    try {
      execSync(`curl -f ${finalApiUrl}/health 2>/dev/null || true`, { 
        stdio: 'pipe',
        timeout: 5000 
      });
      log('✓ API endpoint is responding', 'green');
    } catch (e) {
      log('⚠ Warning: Could not reach API endpoint (may be offline during setup)', 'yellow');
    }

    // Install dependencies
    log('\n📦 Installing dependencies...', 'blue');
    execSync('npm ci', { 
      cwd: frontendPath,
      stdio: 'inherit'
    });

    log('\n✅ Frontend production setup complete!', 'green');
    log('\nNext steps:', 'cyan');
    log('1. Review configuration: cat apps/frontend/.env.production', 'yellow');
    log('2. Build application: npm run build:frontend', 'yellow');
    log('3. Publish apps/frontend/dist/ using the workflow in DEPLOYMENT.md', 'yellow');

  } catch (error) {
    log(`\n✗ Setup failed: ${error.message}`, 'red');
    rl.close();
    process.exit(1);
  }
}

setupFrontendProduction();
