// Google OAuth Callback
// GET /auth/callback/google

import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { google } from '$lib/server/oauth';
import { lucia } from '$lib/server/auth';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies.get('oauth_state');

	// Verify state
	if (!code || !state || !storedState || state !== storedState) {
		throw redirect(302, '/login?error=invalid_state');
	}

	try {
		// Exchange code for tokens
		const tokens = await google.validateAuthorizationCode(code);
		
		// Get user info from Google
		const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const googleUser = await response.json();

		// Check if user exists
		let user = await prisma.user.findUnique({
			where: { email: googleUser.email }
		});

		if (!user) {
			// Create new user
			user = await prisma.user.create({
				data: {
					email: googleUser.email,
					name: googleUser.name,
					emailVerified: true,
					role: 'USER',
					profile: {
						create: {
							avatarUrl: googleUser.picture
						}
					}
				}
			});
		}

		// Store OAuth account
		await prisma.oAuthAccount.upsert({
			where: {
				provider_providerUserId: {
					provider: 'google',
					providerUserId: googleUser.id
				}
			},
			create: {
				userId: user.id,
				provider: 'google',
				providerUserId: googleUser.id,
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
				expiresAt: tokens.accessTokenExpiresAt
			},
			update: {
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
				expiresAt: tokens.accessTokenExpiresAt
			}
		});

		// Create session
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		// Clear OAuth state
		cookies.delete('oauth_state', { path: '/' });

		throw redirect(302, '/dashboard');
	} catch (error) {
		console.error('Google OAuth error:', error);
		throw redirect(302, '/login?error=oauth_failed');
	}
};

