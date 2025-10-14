import { test, expect } from '@playwright/test';

test.describe('Pitch Deck Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/pitch');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Pitch Deck/);
	});

	test('should display first slide', async ({ page }) => {
		await expect(page.locator('text=The Problem')).toBeVisible();
	});

	test('should have navigation buttons', async ({ page }) => {
		await expect(page.locator('button:has-text("Previous")' )).toBeVisible();
		await expect(page.locator('button:has-text("Next")' )).toBeVisible();
	});

	test('should navigate to next slide', async ({ page }) => {
		await page.click('button:has-text("Next")');
		await expect(page.locator('text=Market Opportunity')).toBeVisible();
	});

	test('should navigate to previous slide', async ({ page }) => {
		// Go to second slide
		await page.click('button:has-text("Next")');
		await expect(page.locator('text=Market Opportunity')).toBeVisible();
		
		// Go back to first slide
		await page.click('button:has-text("Previous")');
		await expect(page.locator('text=The Problem')).toBeVisible();
	});

	test('should disable previous button on first slide', async ({ page }) => {
		const prevButton = page.locator('button:has-text("Previous")');
		await expect(prevButton).toBeDisabled();
	});

	test('should navigate through all slides', async ({ page }) => {
		const nextButton = page.locator('button:has-text("Next")');
		
		// Click through slides
		for (let i = 0; i < 3; i++) {
			await nextButton.click();
			await page.waitForTimeout(300);
		}
		
		// Should be on business model slide
		await expect(page.locator('text=Business Model')).toBeVisible();
	});

	test('should display slide indicators', async ({ page }) => {
		const indicators = page.locator('button[aria-label^="Go to slide"]');
		await expect(indicators.first()).toBeVisible();
	});

	test('should navigate using slide indicators', async ({ page }) => {
		// Click on third indicator (index 2)
		await page.click('button[aria-label="Go to slide 3"]');
		await expect(page.locator('text=Our Solution')).toBeVisible();
	});

	test('should display market data with sources', async ({ page }) => {
		// Navigate to market slide
		await page.click('button:has-text("Next")');
		
		await expect(page.locator('text=$638B')).toBeVisible();
		await expect(page.locator('text=120K')).toBeVisible();
		await expect(page.locator('text=Precedence Research')).toBeVisible();
	});

	test('should display problem statistics', async ({ page }) => {
		await expect(page.locator('text=90%')).toBeVisible();
		await expect(page.locator('text=$2.1T')).toBeVisible();
		await expect(page.locator('text=CB Insights')).toBeVisible();
	});
});

test.describe('Pitch Deck Page - Responsive', () => {
	test('should be responsive on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/pitch');
		await expect(page.locator('text=The Problem')).toBeVisible();
	});

	test('should be responsive on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/pitch');
		await expect(page.locator('text=The Problem')).toBeVisible();
	});

	test('should be responsive on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto('/pitch');
		await expect(page.locator('text=The Problem')).toBeVisible();
	});
});

