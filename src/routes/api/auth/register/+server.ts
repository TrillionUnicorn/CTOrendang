// User Registration API
// POST /api/auth/register

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { lucia } from '$lib/server/auth';
import { hashPassword, validatePassword } from '$lib/server/password';
import { z } from 'zod';

const registerSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	name: z.string().min(2, 'Name must be at least 2 characters')
});

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		// Parse and validate request body
		const body = await request.json();
		const result = registerSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { email, password, name } = result.data;

		// Validate password strength
		const passwordValidation = validatePassword(password);
		if (!passwordValidation.valid) {
			return json(
				{
					error: 'Password does not meet requirements',
					details: passwordValidation.errors
				},
				{ status: 400 }
			);
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: email.toLowerCase() }
		});

		if (existingUser) {
			return json(
				{
					error: 'User with this email already exists'
				},
				{ status: 409 }
			);
		}

		// Hash password
		const passwordHash = await hashPassword(password);

		// Create user
		const user = await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				password: passwordHash,
				name,
				emailVerified: false,
				role: 'USER'
			}
		});

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
		console.error('Registration error:', error);
		return json(
			{
				error: 'An error occurred during registration'
			},
			{ status: 500 }
		);
	}
};

