// CTO Profile API Tests
// Tests for CTO profile creation, update, search

import { test, expect } from '@playwright/test';

const API_BASE = 'http://localhost:5173/api';

test.describe('CTO Profile API', () => {
	let authCookie: string;
	let userId: string;

	test.beforeAll(async ({ request }) => {
		// Register and login
		const registerResponse = await request.post(`${API_BASE}/auth/register`, {
			data: {
				email: `cto-${Date.now()}@example.com`,
				password: 'Test123!@#',
				name: 'Test CTO'
			}
		});

		const userData = await registerResponse.json();
		userId = userData.user.id;
		authCookie = registerResponse.headers()['set-cookie'] || '';
	});

	test('should create CTO profile', async ({ request }) => {
		const response = await request.post(`${API_BASE}/cto/profile`, {
			headers: { Cookie: authCookie },
			data: {
				title: 'Senior CTO with 15 years experience',
				bio: 'Experienced CTO with expertise in scaling startups from 0 to 100M+ users. Led engineering teams at multiple successful companies.',
				yearsExperience: 15,
				hourlyRate: 250,
				skills: ['Technical Strategy', 'Team Building', 'System Architecture'],
				industries: ['SaaS', 'Fintech', 'Marketplace'],
				techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
				companiesLed: 3,
				teamSize: 100,
				availability: 'AVAILABLE'
			}
		});

		expect(response.status()).toBe(200);

		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.profile.title).toContain('Senior CTO');
		expect(data.profile.yearsExperience).toBe(15);
	});

	test('should get CTO profile', async ({ request }) => {
		const response = await request.get(`${API_BASE}/cto/profile`, {
			headers: { Cookie: authCookie }
		});

		expect(response.status()).toBe(200);

		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.profile).toBeDefined();
	});

	test('should search CTOs', async ({ request }) => {
		const response = await request.get(
			`${API_BASE}/cto/search?skills=Technical Strategy&minExperience=10`
		);

		expect(response.status()).toBe(200);

		const data = await response.json();
		expect(data.success).toBe(true);
		expect(Array.isArray(data.data)).toBe(true);
	});

	test('should validate required fields', async ({ request }) => {
		const response = await request.post(`${API_BASE}/cto/profile`, {
			headers: { Cookie: authCookie },
			data: {
				title: 'CTO',
				bio: 'Short bio' // Too short
			}
		});

		expect(response.status()).toBe(400);

		const data = await response.json();
		expect(data.error).toContain('Validation');
	});
});

