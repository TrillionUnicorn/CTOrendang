// User Login API
// POST /api/auth/login

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { lucia } from '$lib/server/auth';
import { verifyPassword } from '$lib/server/password';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password is required')
});

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		// Parse and validate request body
		const body = await request.json();
		const result = loginSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { email, password } = result.data;

		// Find user
		const user = await prisma.user.findUnique({
			where: { email: email.toLowerCase() }
		});

		if (!user || !user.password) {
			return json(
				{
					error: 'Invalid email or password'
				},
				{ status: 401 }
			);
		}

		// Verify password
		const validPassword = await verifyPassword(password, user.password);

		if (!validPassword) {
			return json(
				{
					error: 'Invalid email or password'
				},
				{ status: 401 }
			);
		}

		// Create session
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		// Return success
		return json({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role
			}
		});
	} catch (error) {
		console.error('Login error:', error);
		return json(
			{
				error: 'An error occurred during login'
			},
			{ status: 500 }
		);
	}
};

