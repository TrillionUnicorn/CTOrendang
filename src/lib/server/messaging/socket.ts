// WebSocket Server for Real-Time Messaging
// Production-ready Socket.io implementation

import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import { prisma } from '../db';
import { lucia } from '../auth';

interface SocketUser {
	userId: string;
	socketId: string;
}

const connectedUsers = new Map<string, SocketUser>();

export function setupWebSocket(httpServer: HTTPServer) {
	const io = new Server(httpServer, {
		cors: {
			origin: process.env.PUBLIC_URL || 'http://localhost:5173',
			credentials: true
		},
		transports: ['websocket', 'polling']
	});

	// Authentication middleware
	io.use(async (socket, next) => {
		try {
			const sessionId = socket.handshake.auth.sessionId;

			if (!sessionId) {
				return next(new Error('Authentication required'));
			}

			// Validate session
			const { session, user } = await lucia.validateSession(sessionId);

			if (!session || !user) {
				return next(new Error('Invalid session'));
			}

			// Attach user to socket
			socket.data.user = user;
			next();
		} catch (error) {
			next(new Error('Authentication failed'));
		}
	});

	io.on('connection', (socket) => {
		const user = socket.data.user;
		console.log(`User connected: ${user.id}`);

		// Store connected user
		connectedUsers.set(user.id, {
			userId: user.id,
			socketId: socket.id
		});

		// Broadcast online status
		io.emit('user-online', { userId: user.id });

		// Join user's personal room
		socket.join(`user:${user.id}`);

		// Handle joining conversation rooms
		socket.on('join-conversation', async (data: { otherUserId: string }) => {
			const roomId = getRoomId(user.id, data.otherUserId);
			socket.join(roomId);
			console.log(`User ${user.id} joined conversation ${roomId}`);
		});

		// Handle sending messages
		socket.on('send-message', async (data: { receiverId: string; content: string }) => {
			try {
				// Save message to database
				const message = await prisma.message.create({
					data: {
						senderId: user.id,
						receiverId: data.receiverId,
						content: data.content,
						read: false
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
					}
				});

				// Get room ID
				const roomId = getRoomId(user.id, data.receiverId);

				// Emit to room
				io.to(roomId).emit('new-message', message);

				// Emit to receiver's personal room (for notifications)
				io.to(`user:${data.receiverId}`).emit('message-notification', {
					messageId: message.id,
					senderId: user.id,
					senderName: user.name,
					preview: data.content.substring(0, 50)
				});

				// Send acknowledgment
				socket.emit('message-sent', { messageId: message.id });
			} catch (error) {
				console.error('Send message error:', error);
				socket.emit('message-error', { error: 'Failed to send message' });
			}
		});

		// Handle typing indicators
		socket.on('typing-start', (data: { receiverId: string }) => {
			const roomId = getRoomId(user.id, data.receiverId);
			socket.to(roomId).emit('user-typing', { userId: user.id });
		});

		socket.on('typing-stop', (data: { receiverId: string }) => {
			const roomId = getRoomId(user.id, data.receiverId);
			socket.to(roomId).emit('user-stopped-typing', { userId: user.id });
		});

		// Handle marking messages as read
		socket.on('mark-read', async (data: { messageIds: string[] }) => {
			try {
				await prisma.message.updateMany({
					where: {
						id: { in: data.messageIds },
						receiverId: user.id
					},
					data: {
						read: true
					}
				});

				socket.emit('messages-marked-read', { messageIds: data.messageIds });
			} catch (error) {
				console.error('Mark read error:', error);
			}
		});

		// Handle disconnect
		socket.on('disconnect', () => {
			console.log(`User disconnected: ${user.id}`);
			connectedUsers.delete(user.id);
			io.emit('user-offline', { userId: user.id });
		});
	});

	return io;
}

/**
 * Generate consistent room ID for two users
 */
function getRoomId(userId1: string, userId2: string): string {
	return [userId1, userId2].sort().join(':');
}

/**
 * Check if user is online
 */
export function isUserOnline(userId: string): boolean {
	return connectedUsers.has(userId);
}

/**
 * Get all online users
 */
export function getOnlineUsers(): string[] {
	return Array.from(connectedUsers.keys());
}

