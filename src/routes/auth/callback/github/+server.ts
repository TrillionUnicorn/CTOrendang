// GitHub OAuth Callback
// GET /auth/callback/github

import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { github } from '$lib/server/oauth';
import { lucia } from '$lib/server/auth';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies.get('oauth_state');

	if (!code || !state || !storedState || state !== storedState) {
		throw redirect(302, '/login?error=invalid_state');
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		
		// Get user info
		const userResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const githubUser = await userResponse.json();

		// Get primary email
		const emailResponse = await fetch('https://api.github.com/user/emails', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const emails = await emailResponse.json();
		const primaryEmail = emails.find((email: any) => email.primary)?.email;

		if (!primaryEmail) {
			throw redirect(302, '/login?error=no_email');
		}

		// Check if user exists
		let user = await prisma.user.findUnique({
			where: { email: primaryEmail }
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					email: primaryEmail,
					name: githubUser.name || githubUser.login,
					emailVerified: true,
					role: 'USER',
					profile: {
						create: {
							avatarUrl: githubUser.avatar_url,
							github: githubUser.html_url
						}
					}
				}
			});
		}

		// Store OAuth account
		await prisma.oAuthAccount.upsert({
			where: {
				provider_providerUserId: {
					provider: 'github',
					providerUserId: githubUser.id.toString()
				}
			},
			create: {
				userId: user.id,
				provider: 'github',
				providerUserId: githubUser.id.toString(),
				accessToken: tokens.accessToken
			},
			update: {
				accessToken: tokens.accessToken
			}
		});

		// Create session
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		cookies.delete('oauth_state', { path: '/' });

		throw redirect(302, '/dashboard');
	} catch (error) {
		console.error('GitHub OAuth error:', error);
		throw redirect(302, '/login?error=oauth_failed');
	}
};

