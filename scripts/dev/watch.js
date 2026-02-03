#!/usr/bin/env node

/**
 * Development Server Monitor
 * Monitors and restarts services on file changes
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🔍 Development Monitor');
console.log('Watching for changes in backend and frontend...\n');

// Simple file watcher
function watchDirectory(dir, callback) {
  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.includes('node_modules') && !filename.includes('.git')) {
      callback(filename);
    }
  });
}

// Watch directories
watchDirectory(path.join(__dirname, '../../apps/backend'), (file) => {
  console.log(`Backend changed: ${file}`);
});

watchDirectory(path.join(__dirname, '../../apps/frontend'), (file) => {
  console.log(`Frontend changed: ${file}`);
});
