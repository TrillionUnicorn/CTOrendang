// Full Integration Test
// Tests complete user journey from registration to booking

import { test, expect } from '@playwright/test';

const API_BASE = 'http://localhost:5173/api';

test.describe('Complete User Journey', () => {
	const timestamp = Date.now();
	const founder = {
		email: `founder-${timestamp}@example.com`,
		password: 'Test123!@#',
		name: 'Test Founder'
	};

	const cto = {
		email: `cto-${timestamp}@example.com`,
		password: 'Test123!@#',
		name: 'Test CTO'
	};

	let founderCookie: string;
	let ctoCookie: string;
	let ctoUserId: string;
	let projectId: string;
	let bookingId: string;

	test('1. Founder registers and logs in', async ({ request }) => {
		// Register
		const registerResponse = await request.post(`${API_BASE}/auth/register`, {
			data: founder
		});

		expect(registerResponse.status()).toBe(200);
		const registerData = await registerResponse.json();
		expect(registerData.success).toBe(true);

		founderCookie = registerResponse.headers()['set-cookie'] || '';
	});

	test('2. CTO registers and creates profile', async ({ request }) => {
		// Register
		const registerResponse = await request.post(`${API_BASE}/auth/register`, {
			data: cto
		});

		expect(registerResponse.status()).toBe(200);
		const registerData = await registerResponse.json();
		ctoUserId = registerData.user.id;

		ctoCookie = registerResponse.headers()['set-cookie'] || '';

		// Create CTO profile
		const profileResponse = await request.post(`${API_BASE}/cto/profile`, {
			headers: { Cookie: ctoCookie },
			data: {
				title: 'Senior CTO - Test Profile',
				bio: 'Experienced CTO with expertise in building scalable systems. Over 15 years of experience leading engineering teams.',
				yearsExperience: 15,
				hourlyRate: 200,
				skills: ['Technical Strategy', 'System Architecture', 'Team Building'],
				industries: ['SaaS', 'Fintech'],
				techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
				companiesLed: 3,
				teamSize: 50,
				availability: 'AVAILABLE'
			}
		});

		expect(profileResponse.status()).toBe(200);
		const profileData = await profileResponse.json();
		expect(profileData.success).toBe(true);
	});

	test('3. Founder submits project for analysis', async ({ request }) => {
		const response = await request.post(`${API_BASE}/projects/analyze`, {
			headers: { Cookie: founderCookie },
			data: {
				title: 'AI-Powered SaaS Platform',
				description:
					'Building a SaaS platform that uses AI to automate customer support. Need help with technical architecture, AI implementation, and scaling strategy. Looking for experienced CTO to guide the technical direction.',
				industry: 'SaaS',
				budget: '$100K - $500K',
				timeline: '6 months',
				teamSize: 5
			}
		});

		expect(response.status()).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.analysis.healthScore).toBeGreaterThan(0);
		expect(data.matches.length).toBeGreaterThan(0);

		projectId = data.project.id;
	});

	test('4. Founder searches for CTOs', async ({ request }) => {
		const response = await request.get(
			`${API_BASE}/cto/search?skills=System Architecture&minExperience=10`
		);

		expect(response.status()).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
		expect(Array.isArray(data.data)).toBe(true);
	});

	test('5. Founder views CTO profile', async ({ request }) => {
		const response = await request.get(`${API_BASE}/cto/${ctoUserId}`);

		expect(response.status()).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.profile.userId).toBe(ctoUserId);
	});

	test('6. Founder creates booking', async ({ request }) => {
		const startDate = new Date();
		startDate.setDate(startDate.getDate() + 7); // 1 week from now

		const endDate = new Date(startDate);
		endDate.setDate(endDate.getDate() + 14); // 2 weeks duration

		const response = await request.post(`${API_BASE}/bookings/create`, {
			headers: { Cookie: founderCookie },
			data: {
				ctoId: ctoUserId,
				title: 'Technical Architecture Review',
				description: 'Need comprehensive review of our system architecture',
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				hours: 10
			}
		});

		expect(response.status()).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.checkoutUrl).toBeDefined();

		bookingId = data.booking.id;
	});

	test('7. Founder views bookings', async ({ request }) => {
		const response = await request.get(`${API_BASE}/bookings/list?role=client`, {
			headers: { Cookie: founderCookie }
		});

		expect(response.status()).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.bookings.length).toBeGreaterThan(0);
	});

	test('8. CTO views bookings', async ({ request }) => {
		const response = await request.get(`${API_BASE}/bookings/list?role=cto`, {
			headers: { Cookie: ctoCookie }
		});

		expect(response.status()).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
	});

	test('9. Get conversations', async ({ request }) => {
		const response = await request.get(`${API_BASE}/messages/conversations`, {
			headers: { Cookie: founderCookie }
		});

		expect(response.status()).toBe(200);
		const data = await response.json();
		expect(data.success).toBe(true);
	});

	test('10. Health check', async ({ request }) => {
		const response = await request.get(`${API_BASE}/health`);

		expect(response.status()).toBe(200);
		const data = await response.json();
		expect(data.status).toBe('healthy');
		expect(data.database.status).toBe('connected');
	});
});

