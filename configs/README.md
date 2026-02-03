# Shared Configuration

This directory contains shared configuration files for the PronaFlow project.

## Files

- **environment.template** - Template for environment variables
- **shared.config.json** - Shared configuration across services
- **secrets.example.json** - Example secrets file (DO NOT COMMIT actual secrets)

## Usage

### Environment Variables

Copy `environment.template` to `.env` files in respective directories:

```bash
cp configs/environment.template .env
cp configs/environment.template apps/backend/.env
cp configs/environment.template apps/frontend/.env
cp configs/environment.template services/ai-serving/.env
```

Then edit each file with appropriate values for that environment.

### Configuration Files

1. **Shared Config**: Used across multiple services
2. **Secrets**: Sensitive data - always use environment variables instead
3. **Environment**: Application configuration and API endpoints
