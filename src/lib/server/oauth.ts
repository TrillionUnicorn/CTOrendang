// OAuth Providers - Google, GitHub, LinkedIn
// Production-ready OAuth 2.0 implementation

import { Google, GitHub } from 'arctic';
import { dev } from '$app/environment';

const redirectURI = dev
	? 'http://localhost:5173/auth/callback'
	: 'https://ctorendang.com/auth/callback';

// Google OAuth
export const google = new Google(
	process.env.GOOGLE_CLIENT_ID!,
	process.env.GOOGLE_CLIENT_SECRET!,
	`${redirectURI}/google`
);

// GitHub OAuth
export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID!,
	process.env.GITHUB_CLIENT_SECRET!,
	`${redirectURI}/github`
);

// OAuth state generation
export function generateState(): string {
	const array = new Uint8Array(32);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// OAuth code verifier for PKCE
export function generateCodeVerifier(): string {
	const array = new Uint8Array(32);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

