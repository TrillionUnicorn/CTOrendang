# Contributing to CTOrendang

Thank you for your interest in contributing to CTOrendang! This document provides guidelines and instructions for contributing.

---

## 🎯 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

---

## 🚀 Getting Started

### 1. Fork the Repository
```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/CTOrendang.git
cd CTOrendang
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Setup Development Environment
```bash
bun install
cp .env.example .env
bun run db:generate
bun run db:push
bun run db:seed
```

---

## 💻 Development Workflow

### 1. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 2. Test Your Changes
```bash
# Run tests
bun run test

# Type check
bun run check

# Lint
bun run lint

# Format
bun run format
```

### 3. Commit Your Changes
```bash
# Use conventional commits
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update README"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

### 4. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 📝 Pull Request Guidelines

### PR Title
Use conventional commit format:
```
feat: add CTO filtering by industry
fix: resolve booking date validation
docs: update API documentation
```

### PR Description
Include:
- **What**: What changes were made
- **Why**: Why these changes were needed
- **How**: How the changes work
- **Testing**: How you tested the changes

### PR Checklist
- [ ] Code follows project style
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No ESLint warnings

---

## 🧪 Testing

### Writing Tests
```typescript
// tests/api/your-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Your Feature', () => {
  test('should work correctly', async ({ request }) => {
    const response = await request.get('/api/your-endpoint');
    expect(response.status()).toBe(200);
  });
});
```

### Running Tests
```bash
# All tests
bun run test

# Specific test file
bun run test tests/api/your-feature.spec.ts

# Watch mode
bun run test:watch

# UI mode
bun run test:ui
```

---

## 📚 Code Style

### TypeScript
- Use TypeScript strict mode
- Define types for all functions
- Avoid `any` type
- Use interfaces for objects

### Naming Conventions
- **Files**: kebab-case (`user-profile.ts`)
- **Components**: PascalCase (`UserProfile.svelte`)
- **Functions**: camelCase (`getUserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)

### Code Organization
```
src/
├── lib/
│   ├── server/        # Server-side code
│   └── components/    # Svelte components
├── routes/
│   ├── api/          # API endpoints
│   └── (pages)/      # Page routes
└── app.d.ts          # Type definitions
```

---

## 🐛 Reporting Bugs

### Before Reporting
1. Check existing issues
2. Verify it's reproducible
3. Test on latest version

### Bug Report Template
```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS 14]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Screenshots**
If applicable
```

---

## 💡 Feature Requests

### Feature Request Template
```markdown
**Problem**
What problem does this solve?

**Solution**
Proposed solution

**Alternatives**
Alternative solutions considered

**Additional Context**
Any other context
```

---

## 🔍 Code Review Process

### What We Look For
- Code quality and readability
- Test coverage
- Documentation
- Performance impact
- Security considerations

### Review Timeline
- Initial review: 1-3 days
- Follow-up reviews: 1-2 days
- Merge: After approval + CI passing

---

## 📦 Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features
- **PATCH**: Bug fixes

### Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] Tagged in git
- [ ] Deployed to production

---

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

## 📞 Questions?

- **Discord**: [Join our server](https://discord.gg/ctorendang)
- **Email**: dev@ctorendang.com
- **Discussions**: [GitHub Discussions](https://github.com/TrillionUnicorn/CTOrendang/discussions)

---

**Thank you for contributing! 🎉**

