# Contributing Guidelines

Thank you for your interest in contributing to PronaFlow! This document provides guidelines for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Documentation](#documentation)
7. [Commit Messages](#commit-messages)
8. [Pull Requests](#pull-requests)
9. [Review Process](#review-process)
10. [Release Process](#release-process)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. All members of our community are expected to:

- Be respectful and inclusive
- Welcome diverse perspectives
- Provide constructive feedback
- Focus on the code, not the person
- Help each other learn and grow

Any violations of this code of conduct should be reported to the project maintainers.

## Getting Started

### 1. Fork the Repository

```bash
# Visit the repository on GitHub
# Click "Fork" in the top-right corner
# Clone your fork
git clone https://github.com/YOUR_USERNAME/pronaflow.git
cd pronaflow
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm run setup

# Create development branch
git checkout -b feature/your-feature-name
```

### 3. Make Changes

Create a feature branch and implement your changes:

```bash
git checkout -b feature/my-awesome-feature
```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch with descriptive name
git checkout -b feature/add-user-authentication
# or
git checkout -b bugfix/fix-task-filtering
# or
git checkout -b docs/update-api-docs
```

### Branch Naming Convention

- `feature/` - New features
- `bugfix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding/updating tests
- `perf/` - Performance improvements

### 2. Implement Changes

Follow the coding standards for your language:

**Backend (Python)**:
```bash
# Follow PEP 8
black apps/backend
flake8 apps/backend
mypy apps/backend
```

**Frontend (TypeScript/React)**:
```bash
# Follow Airbnb style guide
npm run format --workspace=frontend
npm run lint --workspace=frontend
```

### 3. Test Your Changes

```bash
# Backend tests
cd apps/backend
pytest

# Frontend tests
cd apps/frontend
npm test

# Run all tests
npm run test
```

### 4. Commit Changes

Use conventional commit messages:

```bash
git add .
git commit -m "feat(auth): implement JWT token refresh"
```

### 5. Push to Your Fork

```bash
git push origin feature/my-awesome-feature
```

### 6. Create a Pull Request

Visit GitHub and create a PR from your fork to the main repository.

## Coding Standards

### Backend (Python/FastAPI)

**Style Guide**: PEP 8 + Black formatter

```python
# Use type hints
def get_user(user_id: int) -> User:
    """Get a user by ID.
    
    Args:
        user_id: The user ID
        
    Returns:
        The User object
    """
    return db.query(User).filter(User.id == user_id).first()

# Use docstrings
class UserService:
    """Service for user operations."""
    
    def create_user(self, data: UserCreate) -> User:
        """Create a new user."""
        ...
```

**Format code**:
```bash
# Black (code formatting)
black app/

# isort (import sorting)
isort app/

# flake8 (linting)
flake8 app/

# mypy (type checking)
mypy app/
```

### Frontend (TypeScript/React)

**Style Guide**: Airbnb + Prettier formatter

```typescript
// Use TypeScript strictly
interface User {
  id: number;
  name: string;
  email: string;
}

// Use functional components with hooks
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  return <div>{user?.name}</div>;
}

// Use proper typing
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // ...
};
```

**Format code**:
```bash
# Prettier (code formatting)
npm run format --workspace=frontend

# ESLint (linting)
npm run lint --workspace=frontend
```

### General Standards

- **Naming**: Use clear, descriptive names
- **Comments**: Comment complex logic, not obvious code
- **DRY**: Don't Repeat Yourself
- **SOLID**: Follow SOLID principles
- **Performance**: Write performant code
- **Security**: Follow security best practices

## Testing

### Backend Testing

```python
# Use pytest with fixtures
import pytest
from app.models import User

@pytest.fixture
def user_data():
    return {"name": "John Doe", "email": "john@example.com"}

def test_create_user(user_data):
    user = User(**user_data)
    assert user.name == "John Doe"
    
def test_user_validation():
    with pytest.raises(ValueError):
        User(name="", email="invalid")
```

**Test Guidelines**:
- Write tests before implementation (TDD)
- Aim for 80%+ code coverage
- Test edge cases and error conditions
- Use descriptive test names
- Keep tests isolated and independent

### Frontend Testing

```typescript
// Use React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  test('displays user name', async () => {
    render(<UserProfile userId={1} />);
    const name = await screen.findByText('John Doe');
    expect(name).toBeInTheDocument();
  });
  
  test('handles click event', () => {
    const handleClick = jest.fn();
    render(<button onClick={handleClick}>Click</button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

**Test Guidelines**:
- Test user interactions, not implementation
- Write meaningful assertions
- Use clear test descriptions
- Mock API calls appropriately

### Running Tests

```bash
# All tests
npm run test

# Specific test file
npm run test:backend -- tests/test_auth.py

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Documentation

### Code Documentation

- Add docstrings to all functions and classes
- Explain complex logic with comments
- Keep documentation up-to-date with code

### Markdown Documentation

- Write clear, concise descriptions
- Use proper formatting (headers, lists, code blocks)
- Include examples where helpful
- Update docs when changing functionality

### Example Documentation

```markdown
## User Authentication

### Description
Handles user registration, login, and token management.

### Key Functions

#### `register_user(email: str, password: str) -> User`
Creates a new user account.

**Parameters:**
- `email`: User's email address
- `password`: User's password (minimum 8 characters)

**Returns:**
- `User` object with generated ID

**Raises:**
- `ValueError`: If email already exists
- `ValidationError`: If password doesn't meet requirements

**Example:**
```python
user = register_user("john@example.com", "SecurePass123")
```

### API Endpoints

#### POST /api/v1/auth/register
Register a new user.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "john@example.com",
  "created_at": "2024-02-03T12:00:00Z"
}
```
```

## Commit Messages

Follow Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test-related changes
- `chore`: Build, CI, dependencies

### Scope

Component or module affected: `auth`, `tasks`, `api`, etc.

### Subject

- Imperative mood ("add" not "adds" or "added")
- No period at end
- Less than 50 characters

### Body

- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

### Footer

Reference issues with `Fixes #123` or `Closes #456`

### Examples

```
feat(auth): implement JWT token refresh

Add automatic token refresh mechanism to maintain user sessions
across long-running operations. Tokens are refreshed 5 minutes
before expiration.

Fixes #42

---

fix(task): resolve filtering by status

The task status filter was incorrectly using exact match instead
of case-insensitive comparison, causing some tasks to be hidden.

Closes #89

---

docs(api): update endpoint documentation

Add missing request/response examples and clarify authentication
requirements for protected endpoints.
```

## Pull Requests

### PR Title Format

Use the same format as commit messages:
```
feat(module): brief description
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Refactoring

## Related Issues
Fixes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe how this was tested:
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Manual testing completed

## Screenshots (if applicable)
Include screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Before Submitting

- [ ] All tests passing
- [ ] Code formatted correctly
- [ ] No lint errors
- [ ] Documentation updated
- [ ] Commits are clean and descriptive
- [ ] Branch is up-to-date with main

## Review Process

### Code Review

All PRs require:
- Minimum 2 approvals
- All CI checks passing
- No merge conflicts
- Positive review comments addressed

### Review Checklist

Reviewers should verify:
- [ ] Code follows project standards
- [ ] Tests are adequate
- [ ] Documentation is clear
- [ ] Performance is acceptable
- [ ] Security is maintained
- [ ] No unnecessary complexity

### Review Comments

Be constructive and respectful:
```
// Good - Provides explanation
Consider using a dictionary here instead of multiple if statements
for better maintainability. See [style guide link].

// Bad - Just says "no"
This is wrong. Change it.
```

## Release Process

### Version Numbering

Follow Semantic Versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

Example: `2.0.0`, `2.1.0`, `2.1.1`

### Release Steps

1. Create release branch: `git checkout -b release/v2.1.0`
2. Update version numbers in files
3. Update CHANGELOG.md
4. Create PR and get approval
5. Merge to main
6. Tag release: `git tag -a v2.1.0 -m "Release v2.1.0"`
7. Push tags: `git push origin --tags`
8. Build and deploy

---

**Last Updated**: February 3, 2026

We appreciate your contributions and look forward to working with you!
