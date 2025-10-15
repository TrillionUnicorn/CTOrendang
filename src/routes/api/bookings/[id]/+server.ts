// Get/Update Single Booking API
// GET /api/bookings/[id] - Get booking details
// PATCH /api/bookings/[id] - Update booking status

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { z } from 'zod';

// GET - Get booking details
export const GET: RequestHandler = async ({ params, locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		const booking = await prisma.booking.findUnique({
			where: { id: params.id },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						profile: {
							select: {
								avatarUrl: true,
								company: true
							}
						}
					}
				},
				cto: {
					select: {
						id: true,
						name: true,
						email: true,
						profile: {
							select: {
								avatarUrl: true,
								linkedin: true,
								github: true
							}
						}
					}
				},
				ctoProfile: {
					select: {
						title: true,
						hourlyRate: true,
						skills: true,
						industries: true
					}
				}
			}
		});

		if (!booking) {
			return json({ error: 'Booking not found' }, { status: 404 });
		}

		// Check authorization
		if (booking.userId !== locals.user.id && booking.ctoId !== locals.user.id) {
			return json({ error: 'Unauthorized' }, { status: 403 });
		}

		return json({
			success: true,
			booking
		});
	} catch (error) {
		console.error('Get booking error:', error);
		return json({ error: 'Failed to retrieve booking' }, { status: 500 });
	}
};

// PATCH - Update booking status
const updateSchema = z.object({
	status: z.enum(['CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
});

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		// Parse and validate
		const body = await request.json();
		const result = updateSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { status } = result.data;

		// Get booking
		const booking = await prisma.booking.findUnique({
			where: { id: params.id }
		});

		if (!booking) {
			return json({ error: 'Booking not found' }, { status: 404 });
		}

		// Check authorization (only CTO can update status)
		if (booking.ctoId !== locals.user.id) {
			return json({ error: 'Only the CTO can update booking status' }, { status: 403 });
		}

		// Update booking
		const updatedBooking = await prisma.booking.update({
			where: { id: params.id },
			data: { status }
		});

		return json({
			success: true,
			booking: updatedBooking
		});
	} catch (error) {
		console.error('Update booking error:', error);
		return json({ error: 'Failed to update booking' }, { status: 500 });
	}
};

