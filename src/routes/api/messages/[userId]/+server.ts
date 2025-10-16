// Get Messages with Specific User API
// GET /api/messages/[userId]
// Returns message history with a specific user

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ params, locals, url }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		const { userId } = params;
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '50');

		// Get messages between current user and specified user
		const [messages, total] = await Promise.all([
			prisma.message.findMany({
				where: {
					OR: [
						{ senderId: locals.user.id, receiverId: userId },
						{ senderId: userId, receiverId: locals.user.id }
					]
				},
				include: {
					sender: {
						select: {
							id: true,
							name: true,
							profile: {
								select: {
									avatarUrl: true
								}
							}
						}
					}
				},
				orderBy: {
					createdAt: 'desc'
				},
				skip: (page - 1) * limit,
				take: limit
			}),
			prisma.message.count({
				where: {
					OR: [
						{ senderId: locals.user.id, receiverId: userId },
						{ senderId: userId, receiverId: locals.user.id }
					]
				}
			})
		]);

		// Reverse to show oldest first
		messages.reverse();

		// Mark messages as read
		await prisma.message.updateMany({
			where: {
				senderId: userId,
				receiverId: locals.user.id,
				read: false
			},
			data: {
				read: true
			}
		});

		const totalPages = Math.ceil(total / limit);

		return json({
			success: true,
			messages,
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
		console.error('Get messages error:', error);
		return json({ error: 'Failed to retrieve messages' }, { status: 500 });
	}
};

