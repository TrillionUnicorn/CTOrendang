// Database Client - Prisma with Connection Pooling
// Production-ready singleton pattern

import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

// Prevent multiple instances in development
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: dev ? ['query', 'error', 'warn'] : ['error'],
		errorFormat: 'pretty'
	});

if (dev) globalForPrisma.prisma = prisma;

// Graceful shutdown
if (typeof window === 'undefined') {
	process.on('beforeExit', async () => {
		await prisma.$disconnect();
	});
}

