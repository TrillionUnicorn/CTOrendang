// Admin User Management API
// GET /api/admin/users - List all users with filters
// PATCH /api/admin/users - Update user (role, status, etc.)

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { requireAdmin } from '$lib/server/middleware/admin';
import { z } from 'zod';

// GET - List users with advanced filtering
export const GET: RequestHandler = async (event) => {
	try {
		requireAdmin(event);

		const { url } = event;
		const role = url.searchParams.get('role');
		const emailVerified = url.searchParams.get('emailVerified');
		const search = url.searchParams.get('search');
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '50');
		const sortBy = url.searchParams.get('sortBy') || 'createdAt';
		const sortOrder = url.searchParams.get('sortOrder') || 'desc';

		// Build where clause
		const where: any = {};

		if (role) {
			where.role = role;
		}

		if (emailVerified !== null) {
			where.emailVerified = emailVerified === 'true';
		}

		if (search) {
			where.OR = [
				{ email: { contains: search, mode: 'insensitive' } },
				{ name: { contains: search, mode: 'insensitive' } }
			];
		}

		// Build orderBy
		const orderBy: any = {};
		orderBy[sortBy] = sortOrder;

		// Execute query
		const [users, total] = await Promise.all([
			prisma.user.findMany({
				where,
				orderBy,
				skip: (page - 1) * limit,
				take: limit,
				select: {
					id: true,
					email: true,
					name: true,
					role: true,
					emailVerified: true,
					createdAt: true,
					updatedAt: true,
					profile: {
						select: {
							avatarUrl: true,
							company: true
						}
					},
					ctoProfile: {
						select: {
							id: true,
							verified: true,
							rating: true,
							reviewCount: true
						}
					},
					_count: {
						select: {
							projects: true,
							bookings: true,
							ctoBookings: true
						}
					}
				}
			}),
			prisma.user.count({ where })
		]);

		const totalPages = Math.ceil(total / limit);

		return json({
			success: true,
			users,
			pagination: {
				page,
				limit,
				total,
				totalPages,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1
			}
		});
	} catch (error) {
		console.error('Admin list users error:', error);

		if (error instanceof Response) {
			return error;
		}

		return json({ error: 'Failed to retrieve users' }, { status: 500 });
	}
};

// PATCH - Update user
const updateUserSchema = z.object({
	userId: z.string().cuid(),
	role: z.enum(['USER', 'CTO', 'ADMIN']).optional(),
	emailVerified: z.boolean().optional()
});

export const PATCH: RequestHandler = async (event) => {
	try {
		requireAdmin(event);

		const body = await event.request.json();
		const result = updateUserSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { userId, role, emailVerified } = result.data;

		// Update user
		const user = await prisma.user.update({
			where: { id: userId },
			data: {
				...(role && { role }),
				...(emailVerified !== undefined && { emailVerified })
			},
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				emailVerified: true
			}
		});

		// Log activity
		await prisma.activityLog.create({
			data: {
				userId: event.locals.user!.id,
				action: 'admin_update_user',
				metadata: JSON.stringify({
					targetUserId: userId,
					changes: { role, emailVerified }
				})
			}
		});

		return json({
			success: true,
			user
		});
	} catch (error) {
		console.error('Admin update user error:', error);

		if (error instanceof Response) {
			return error;
		}

		return json({ error: 'Failed to update user' }, { status: 500 });
	}
};

