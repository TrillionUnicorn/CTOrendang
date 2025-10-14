# 🧪 CTOrendang Testing Guide

## Overview
This document outlines the testing strategy and guidelines for CTOrendang.

---

## Testing Stack (To Be Implemented)

### Unit & Integration Testing
- **Vitest**: Fast unit test runner
- **@testing-library/svelte**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation

### End-to-End Testing
- **Playwright**: Cross-browser E2E testing
- **@playwright/test**: Test runner and assertions

### Performance Testing
- **Lighthouse CI**: Performance, accessibility, SEO audits
- **Web Vitals**: Core Web Vitals monitoring

---

## Test Structure

```
tests/
├── unit/                    # Unit tests
│   ├── utils/              # Utility function tests
│   ├── components/         # Component tests
│   └── stores/             # Store tests
├── integration/            # Integration tests
│   ├── api/               # API integration tests
│   └── flows/             # User flow tests
└── e2e/                   # End-to-end tests
    ├── home.spec.ts       # Home page tests
    ├── product.spec.ts    # Product page tests
    ├── pitch.spec.ts      # Pitch deck tests
    └── contact.spec.ts    # Contact page tests
```

---

## Running Tests (To Be Implemented)

### Unit Tests
```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui

# Run E2E tests in specific browser
npm run test:e2e -- --project=chromium
```

### Performance Tests
```bash
# Run Lighthouse audit
npm run lighthouse

# Run performance tests
npm run test:performance
```

---

## Testing Guidelines

### Unit Tests
- Test individual functions and components in isolation
- Mock external dependencies
- Aim for 80%+ code coverage
- Test edge cases and error conditions

### Integration Tests
- Test component interactions
- Test API integrations
- Test state management
- Test routing and navigation

### E2E Tests
- Test critical user journeys
- Test form submissions
- Test authentication flows
- Test payment flows (when implemented)

---

## Test Examples

### Unit Test Example (Utils)
```typescript
import { describe, it, expect } from 'vitest';
import { formatCurrency, isValidEmail } from '$lib/utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1000, 'USD')).toBe('$1,000');
  });

  it('handles zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0');
  });
});

describe('isValidEmail', () => {
  it('validates correct email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
  });
});
```

### Component Test Example
```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Button from '$lib/components/ui/Button.svelte';

describe('Button', () => {
  it('renders with text', () => {
    render(Button, { props: { text: 'Click me' } });
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const { component } = render(Button, { 
      props: { text: 'Click me', onClick } 
    });
    
    await fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CTOrendang/);
  });

  test('should navigate to product page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Try AI Analysis Free');
    await expect(page).toHaveURL(/.*product/);
  });

  test('should submit waitlist form', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("Join Waitlist")');
    await expect(page.locator('text=You\'re on the list!')).toBeVisible();
  });
});
```

---

## Manual Testing Checklist

### Pre-Release Checklist

#### Functionality
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms submit successfully
- [ ] Animations play smoothly
- [ ] Images load correctly
- [ ] Links work (internal and external)

#### Responsive Design
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1920px+)

#### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

#### Performance
- [ ] Lighthouse score 90+ (Performance)
- [ ] Lighthouse score 90+ (Accessibility)
- [ ] Lighthouse score 90+ (Best Practices)
- [ ] Lighthouse score 90+ (SEO)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

#### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] ARIA labels where needed

#### SEO
- [ ] Meta tags present
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Structured data (JSON-LD)

---

## Continuous Integration

### GitHub Actions
Our CI pipeline runs:
1. Type checking
2. Linting
3. Unit tests
4. Build verification
5. Security scanning (Trivy)
6. Lighthouse audit

### Pre-commit Hooks (To Be Implemented)
```bash
# Install Husky
npm install -D husky

# Setup pre-commit hook
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run check"
```

---

## Performance Monitoring

### Metrics to Track
- **Core Web Vitals**
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)

- **Custom Metrics**
  - Time to Interactive
  - Total Blocking Time
  - Speed Index

### Tools
- Google Analytics 4
- Vercel Analytics
- Sentry Performance Monitoring
- New Relic (optional)

---

## Bug Reporting

### Bug Report Template
```markdown
**Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14]
- Device: [e.g., iPhone 15]
- Screen size: [e.g., 1920x1080]

**Additional Context**
Any other context about the problem.
```

---

## Test Coverage Goals

### Current Coverage (To Be Measured)
- Unit Tests: TBD
- Integration Tests: TBD
- E2E Tests: TBD

### Target Coverage
- Unit Tests: 80%+
- Integration Tests: 70%+
- E2E Tests: Critical paths covered

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**Last Updated**: 2024-10-14

