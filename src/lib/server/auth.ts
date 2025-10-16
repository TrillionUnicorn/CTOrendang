// Authentication System - Lucia Auth v3
// Production-ready with session management

import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from './db';
import { dev } from '$app/environment';
import type { Role } from '@prisma/client';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			emailVerified: attributes.emailVerified,
			name: attributes.name,
			role: attributes.role
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
	emailVerified: boolean;
	name: string | null;
	role: Role;
}

