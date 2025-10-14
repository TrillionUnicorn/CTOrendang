import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/CTOrendang/);
	});

	test('should display hero section', async ({ page }) => {
		await expect(page.locator('h1')).toContainText('AI + Human CTO');
	});

	test('should have working navigation', async ({ page }) => {
		await expect(page.locator('nav')).toBeVisible();
		await expect(page.locator('a[href="/product"]')).toBeVisible();
		await expect(page.locator('a[href="/pitch"]')).toBeVisible();
		await expect(page.locator('a[href="/contact"]')).toBeVisible();
	});

	test('should display stats section', async ({ page }) => {
		await expect(page.locator('text=200+')).toBeVisible();
		await expect(page.locator('text=500+')).toBeVisible();
		await expect(page.locator('text=94%')).toBeVisible();
	});

	test('should display Why Us section', async ({ page }) => {
		await expect(page.locator('text=Why Choose CTOrendang?')).toBeVisible();
	});

	test('should display How It Works section', async ({ page }) => {
		await expect(page.locator('text=How It Works')).toBeVisible();
		await expect(page.locator('text=Submit Your Project')).toBeVisible();
		await expect(page.locator('text=Get AI Analysis')).toBeVisible();
		await expect(page.locator('text=Start Building')).toBeVisible();
	});

	test('should display pricing section', async ({ page }) => {
		await expect(page.locator('text=Early Bird Pricing')).toBeVisible();
		await expect(page.locator('text=AI Starter')).toBeVisible();
		await expect(page.locator('text=CTO Connect')).toBeVisible();
		await expect(page.locator('text=CTO Partnership')).toBeVisible();
	});

	test('should display mission and vision', async ({ page }) => {
		await expect(page.locator('text=Our Mission')).toBeVisible();
		await expect(page.locator('text=Our Vision')).toBeVisible();
	});

	test('should have waitlist form', async ({ page }) => {
		const emailInput = page.locator('input[type="email"]').first();
		await expect(emailInput).toBeVisible();
	});

	test('should validate waitlist form', async ({ page }) => {
		const form = page.locator('form').first();
		const emailInput = form.locator('input[type="email"]');
		const submitButton = form.locator('button[type="submit"]');

		// Try to submit without email
		await submitButton.click();
		// HTML5 validation should prevent submission

		// Fill in email and submit
		await emailInput.fill('test@example.com');
		await submitButton.click();

		// Should show success message
		await expect(page.locator('text=You\'re on the list!')).toBeVisible({ timeout: 5000 });
	});

	test('should have footer with links', async ({ page }) => {
		await expect(page.locator('footer')).toBeVisible();
		await expect(page.locator('footer >> text=CTOrendang')).toBeVisible();
	});

	test('should navigate to product page', async ({ page }) => {
		await page.click('text=Try AI Analysis Free');
		await expect(page).toHaveURL(/.*product/);
	});

	test('should scroll smoothly', async ({ page }) => {
		await page.click('a[href="#waitlist"]');
		await page.waitForTimeout(1000);
		// Check if scrolled to waitlist section
		const waitlistSection = page.locator('#waitlist');
		await expect(waitlistSection).toBeInViewport();
	});
});

test.describe('Home Page - Responsive', () => {
	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
		await expect(page.locator('h1')).toBeVisible();
	});

	test('should be responsive on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');
		await expect(page.locator('h1')).toBeVisible();
	});

	test('should be responsive on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto('/');
		await expect(page.locator('h1')).toBeVisible();
	});
});

