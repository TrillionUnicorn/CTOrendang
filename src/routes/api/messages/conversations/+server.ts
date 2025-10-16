// Get Conversations API
// GET /api/messages/conversations
// Returns list of conversations with latest message

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		// Get all messages where user is sender or receiver
		const messages = await prisma.message.findMany({
			where: {
				OR: [{ senderId: locals.user.id }, { receiverId: locals.user.id }]
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
				},
				receiver: {
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
			}
		});

		// Group by conversation partner
		const conversationsMap = new Map();

		for (const message of messages) {
			const partnerId =
				message.senderId === locals.user.id ? message.receiverId : message.senderId;

			if (!conversationsMap.has(partnerId)) {
				const partner = message.senderId === locals.user.id ? message.receiver : message.sender;

				// Count unread messages
				const unreadCount = await prisma.message.count({
					where: {
						senderId: partnerId,
						receiverId: locals.user.id,
						read: false
					}
				});

				conversationsMap.set(partnerId, {
					partnerId,
					partner,
					lastMessage: message,
					unreadCount
				});
			}
		}

		const conversations = Array.from(conversationsMap.values());

		return json({
			success: true,
			conversations
		});
	} catch (error) {
		console.error('Get conversations error:', error);
		return json({ error: 'Failed to retrieve conversations' }, { status: 500 });
	}
};

