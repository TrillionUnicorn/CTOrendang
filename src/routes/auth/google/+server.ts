// Google OAuth Initiation
// GET /auth/google

import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { google, generateState } from '$lib/server/oauth';

export const GET: RequestHandler = async ({ cookies }) => {
	const state = generateState();
	
	// Store state in cookie for verification
	cookies.set('oauth_state', state, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 10 // 10 minutes
	});

	const url = await google.createAuthorizationURL(state, {
		scopes: ['email', 'profile']
	});

	throw redirect(302, url.toString());
};

