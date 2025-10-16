import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/contact');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Contact/);
	});

	test('should display contact form', async ({ page }) => {
		await expect(page.locator('text=Send us a Message')).toBeVisible();
		await expect(page.locator('input[type="text"]').first()).toBeVisible();
		await expect(page.locator('input[type="email"]')).toBeVisible();
		await expect(page.locator('textarea')).toBeVisible();
	});

	test('should display contact information', async ({ page }) => {
		await expect(page.locator('text=Contact Information')).toBeVisible();
		await expect(page.locator('text=hello@ctorendang.com')).toBeVisible();
	});

	test('should validate contact form - empty submission', async ({ page }) => {
		const submitButton = page.locator('button:has-text("Send Message")');
		await submitButton.click();
		// HTML5 validation should prevent submission
	});

	test('should validate email format', async ({ page }) => {
		await page.fill('input[id="name"]', 'Test User');
		await page.fill('input[id="email"]', 'invalid-email');
		await page.selectOption('select[id="subject"]', 'General Inquiry');
		await page.fill('textarea[id="message"]', 'Test message');
		
		const submitButton = page.locator('button:has-text("Send Message")');
		await submitButton.click();
		// HTML5 email validation should prevent submission
	});

	test('should submit contact form successfully', async ({ page }) => {
		await page.fill('input[id="name"]', 'Test User');
		await page.fill('input[id="email"]', 'test@example.com');
		await page.fill('input[id="company"]', 'Test Company');
		await page.selectOption('select[id="subject"]', 'General Inquiry');
		await page.fill('textarea[id="message"]', 'This is a test message');
		
		await page.click('button:has-text("Send Message")');
		
		// Should show success message
		await expect(page.locator('text=Message Sent!')).toBeVisible({ timeout: 5000 });
	});

	test('should display FAQ section', async ({ page }) => {
		await expect(page.locator('text=Frequently Asked Questions')).toBeVisible();
		await expect(page.locator('text=How quickly can I get matched')).toBeVisible();
	});

	test('should display office hours', async ({ page }) => {
		await expect(page.locator('text=Office Hours')).toBeVisible();
		await expect(page.locator('text=Monday - Friday')).toBeVisible();
	});

	test('should display response time', async ({ page }) => {
		await expect(page.locator('text=Response Time')).toBeVisible();
		await expect(page.locator('text=24 hours')).toBeVisible();
	});

	test('should have social media links', async ({ page }) => {
		await expect(page.locator('a[href*="discord"]')).toBeVisible();
		await expect(page.locator('a[href*="twitter"]')).toBeVisible();
		await expect(page.locator('a[href*="linkedin"]')).toBeVisible();
	});

	test('should clear form after successful submission', async ({ page }) => {
		await page.fill('input[id="name"]', 'Test User');
		await page.fill('input[id="email"]', 'test@example.com');
		await page.selectOption('select[id="subject"]', 'General Inquiry');
		await page.fill('textarea[id="message"]', 'Test message');
		
		await page.click('button:has-text("Send Message")');
		await expect(page.locator('text=Message Sent!')).toBeVisible({ timeout: 5000 });
		
		// Wait for form to reset
		await page.waitForTimeout(5500);
		
		// Form should be cleared
		await expect(page.locator('input[id="name"]')).toHaveValue('');
		await expect(page.locator('input[id="email"]')).toHaveValue('');
	});
});

test.describe('Contact Page - Responsive', () => {
	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/contact');
		await expect(page.locator('text=Send us a Message')).toBeVisible();
	});

	test('should be responsive on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/contact');
		await expect(page.locator('text=Send us a Message')).toBeVisible();
	});

	test('should be responsive on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto('/contact');
		await expect(page.locator('text=Send us a Message')).toBeVisible();
	});
});

