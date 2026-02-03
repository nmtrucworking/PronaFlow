#!/usr/bin/env node

/**
 * Development Database Setup
 * Creates test data and initializes development database
 */

const path = require('path');
const { execSync } = require('child_process');

console.log('🗄️  Development Database Setup\n');

const backendPath = path.join(__dirname, '../../apps/backend');

try {
  console.log('Creating database tables...');
  execSync('python init_db.py', { cwd: backendPath, stdio: 'inherit' });
  
  console.log('\n✓ Database initialized successfully');
  console.log('You can now start the backend with: npm run dev:backend');
} catch (error) {
  console.error('✗ Database initialization failed');
  process.exit(1);
}
