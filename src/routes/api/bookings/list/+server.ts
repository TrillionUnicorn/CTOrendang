// List Bookings API
// GET /api/bookings/list
// Get user's bookings (as client or CTO)

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ locals, url }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		const role = url.searchParams.get('role') || 'client'; // client or cto
		const status = url.searchParams.get('status'); // PENDING, CONFIRMED, etc.
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '20');

		// Build where clause
		const where: any = {};

		if (role === 'client') {
			where.userId = locals.user.id;
		} else {
			where.ctoId = locals.user.id;
		}

		if (status) {
			where.status = status;
		}

		// Get bookings
		const [bookings, total] = await Promise.all([
			prisma.booking.findMany({
				where,
				include: {
					user: {
						select: {
							name: true,
							email: true,
							profile: {
								select: {
									avatarUrl: true
								}
							}
						}
					},
					cto: {
						select: {
							name: true,
							email: true,
							profile: {
								select: {
									avatarUrl: true
								}
							}
						}
					},
					ctoProfile: {
						select: {
							title: true,
							hourlyRate: true
						}
					}
				},
				orderBy: {
					createdAt: 'desc'
				},
				skip: (page - 1) * limit,
				take: limit
			}),
			prisma.booking.count({ where })
		]);

		const totalPages = Math.ceil(total / limit);

		return json({
			success: true,
			bookings,
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
		console.error('List bookings error:', error);
		return json({ error: 'Failed to retrieve bookings' }, { status: 500 });
	}
};

