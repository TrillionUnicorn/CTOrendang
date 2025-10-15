// Authentication API Tests
// Tests for registration, login, logout

import { test, expect } from '@playwright/test';

const API_BASE = 'http://localhost:5173/api';

test.describe('Authentication API', () => {
	const testUser = {
		email: `test-${Date.now()}@example.com`,
		password: 'Test123!@#',
		name: 'Test User'
	};

	test('should register a new user', async ({ request }) => {
		const response = await request.post(`${API_BASE}/auth/register`, {
			data: testUser
		});

		expect(response.status()).toBe(200);

		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.user.email).toBe(testUser.email);
		expect(data.user.name).toBe(testUser.name);
		expect(data.user.role).toBe('USER');
	});

	test('should not register duplicate email', async ({ request }) => {
		// First registration
		await request.post(`${API_BASE}/auth/register`, {
			data: testUser
		});

		// Duplicate registration
		const response = await request.post(`${API_BASE}/auth/register`, {
			data: testUser
		});

		expect(response.status()).toBe(409);

		const data = await response.json();
		expect(data.error).toContain('already exists');
	});

	test('should validate password requirements', async ({ request }) => {
		const response = await request.post(`${API_BASE}/auth/register`, {
			data: {
				email: 'test@example.com',
				password: 'weak',
				name: 'Test'
			}
		});

		expect(response.status()).toBe(400);

		const data = await response.json();
		expect(data.error).toContain('Password');
	});

	test('should login with correct credentials', async ({ request }) => {
		// Register first
		await request.post(`${API_BASE}/auth/register`, {
			data: testUser
		});

		// Login
		const response = await request.post(`${API_BASE}/auth/login`, {
			data: {
				email: testUser.email,
				password: testUser.password
			}
		});

		expect(response.status()).toBe(200);

		const data = await response.json();
		expect(data.success).toBe(true);
		expect(data.user.email).toBe(testUser.email);
	});

	test('should not login with incorrect password', async ({ request }) => {
		const response = await request.post(`${API_BASE}/auth/login`, {
			data: {
				email: testUser.email,
				password: 'WrongPassword123!'
			}
		});

		expect(response.status()).toBe(401);

		const data = await response.json();
		expect(data.error).toContain('Invalid');
	});

	test('should logout successfully', async ({ request }) => {
		// Login first
		const loginResponse = await request.post(`${API_BASE}/auth/login`, {
			data: {
				email: testUser.email,
				password: testUser.password
			}
		});

		const cookies = loginResponse.headers()['set-cookie'];

		// Logout
		const response = await request.post(`${API_BASE}/auth/logout`, {
			headers: {
				Cookie: cookies || ''
			}
		});

		expect(response.status()).toBe(200);

		const data = await response.json();
		expect(data.success).toBe(true);
	});
});

