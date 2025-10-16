// GitHub OAuth Initiation
// GET /auth/github

import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { github, generateState } from '$lib/server/oauth';

export const GET: RequestHandler = async ({ cookies }) => {
	const state = generateState();
	
	cookies.set('oauth_state', state, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 10
	});

	const url = await github.createAuthorizationURL(state, {
		scopes: ['user:email']
	});

	throw redirect(302, url.toString());
};

