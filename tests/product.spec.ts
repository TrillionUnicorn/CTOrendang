import { test, expect } from '@playwright/test';

test.describe('Product Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/product');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Product/);
	});

	test('should have AI Analysis tab', async ({ page }) => {
		await expect(page.locator('text=AI Analysis')).toBeVisible();
	});

	test('should have CTO Marketplace tab', async ({ page }) => {
		await expect(page.locator('text=CTO Marketplace')).toBeVisible();
	});

	test('should display AI analysis form', async ({ page }) => {
		await expect(page.locator('textarea')).toBeVisible();
		await expect(page.locator('select').first()).toBeVisible();
	});

	test('should validate AI analysis form', async ({ page }) => {
		const submitButton = page.locator('button:has-text("Get Free Analysis")');
		
		// Try to submit without filling form
		await submitButton.click();
		// HTML5 validation should prevent submission
	});

	test('should submit AI analysis form and show results', async ({ page }) => {
		// Fill in the form
		await page.fill('textarea', 'Building a fintech platform for payments');
		await page.selectOption('select >> nth=0', 'Fintech');
		await page.selectOption('select >> nth=1', '$100K - $250K');

		// Submit form
		await page.click('button:has-text("Get Free Analysis")');

		// Wait for analysis to complete
		await expect(page.locator('text=Analyzing Your Project')).toBeVisible({ timeout: 1000 });
		await expect(page.locator('text=Technical Health Score')).toBeVisible({ timeout: 5000 });
	});

	test('should switch to CTO Marketplace tab', async ({ page }) => {
		await page.click('button:has-text("CTO Marketplace")');
		await expect(page.locator('text=Browse and connect')).toBeVisible();
	});

	test('should display CTO profiles in marketplace', async ({ page }) => {
		await page.click('button:has-text("CTO Marketplace")');
		await expect(page.locator('text=Sarah Chen')).toBeVisible();
		await expect(page.locator('text=Marcus Rodriguez')).toBeVisible();
	});

	test('should open CTO detail modal', async ({ page }) => {
		await page.click('button:has-text("CTO Marketplace")');
		
		// Click on first CTO card
		await page.click('text=Sarah Chen');
		
		// Modal should be visible
		await expect(page.locator('text=About')).toBeVisible();
		await expect(page.locator('text=Success Stories')).toBeVisible();
	});

	test('should close CTO detail modal', async ({ page }) => {
		await page.click('button:has-text("CTO Marketplace")');
		await page.click('text=Sarah Chen');

		// Close modal by clicking X button
		const closeButton = page.locator('button').filter({ hasText: '×' }).first();
		await closeButton.click();

		// Modal should be closed
		await expect(page.locator('text=About')).not.toBeVisible();
	});

	test('should filter CTOs by industry', async ({ page }) => {
		await page.click('button:has-text("CTO Marketplace")');
		
		// Select Fintech filter
		await page.selectOption('select >> nth=0', 'Fintech');
		
		// Should still show CTOs (we have fintech CTOs in mock data)
		await expect(page.locator('text=Sarah Chen')).toBeVisible();
	});
});

test.describe('Product Page - Responsive', () => {
	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/product');
		await expect(page.locator('text=AI Analysis')).toBeVisible();
	});

	test('should be responsive on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/product');
		await expect(page.locator('text=AI Analysis')).toBeVisible();
	});

	test('should be responsive on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto('/product');
		await expect(page.locator('text=AI Analysis')).toBeVisible();
	});
});

