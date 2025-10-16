// Activity Logging System
// Production-ready audit trail and activity tracking

import { prisma } from '../db';

export type ActivityAction =
	| 'user_register'
	| 'user_login'
	| 'user_logout'
	| 'project_create'
	| 'project_analyze'
	| 'cto_profile_create'
	| 'cto_profile_update'
	| 'booking_create'
	| 'booking_complete'
	| 'booking_cancel'
	| 'payment_success'
	| 'payment_failed'
	| 'subscription_create'
	| 'subscription_cancel'
	| 'message_send'
	| 'review_create'
	| 'admin_verify_cto'
	| 'admin_unverify_cto'
	| 'admin_feature_cto'
	| 'admin_unfeature_cto'
	| 'admin_update_user';

/**
 * Log user activity
 */
export async function logActivity(
	action: ActivityAction,
	options?: {
		userId?: string;
		metadata?: Record<string, any>;
		ipAddress?: string;
		userAgent?: string;
	}
) {
	try {
		await prisma.activityLog.create({
			data: {
				action,
				userId: options?.userId,
				metadata: options?.metadata ? JSON.stringify(options.metadata) : null,
				ipAddress: options?.ipAddress,
				userAgent: options?.userAgent
			}
		});
	} catch (error) {
		console.error('Activity logging error:', error);
		// Don't throw - logging should never break the app
	}
}

/**
 * Get user activity history
 */
export async function getUserActivity(
	userId: string,
	options?: {
		limit?: number;
		offset?: number;
		actions?: ActivityAction[];
	}
) {
	return prisma.activityLog.findMany({
		where: {
			userId,
			...(options?.actions && { action: { in: options.actions } })
		},
		orderBy: {
			createdAt: 'desc'
		},
		take: options?.limit || 50,
		skip: options?.offset || 0
	});
}

/**
 * Get platform-wide activity
 */
export async function getPlatformActivity(options?: {
	limit?: number;
	offset?: number;
	actions?: ActivityAction[];
	startDate?: Date;
	endDate?: Date;
}) {
	return prisma.activityLog.findMany({
		where: {
			...(options?.actions && { action: { in: options.actions } }),
			...(options?.startDate && { createdAt: { gte: options.startDate } }),
			...(options?.endDate && { createdAt: { lte: options.endDate } })
		},
		orderBy: {
			createdAt: 'desc'
		},
		take: options?.limit || 100,
		skip: options?.offset || 0
	});
}

/**
 * Get activity statistics
 */
export async function getActivityStats(startDate: Date, endDate: Date) {
	const stats = await prisma.activityLog.groupBy({
		by: ['action'],
		where: {
			createdAt: {
				gte: startDate,
				lte: endDate
			}
		},
		_count: {
			action: true
		}
	});

	return stats.reduce(
		(acc, stat) => {
			acc[stat.action] = stat._count.action;
			return acc;
		},
		{} as Record<string, number>
	);
}

/**
 * Clean old activity logs (data retention)
 */
export async function cleanOldActivityLogs(daysToKeep = 90) {
	const cutoffDate = new Date();
	cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

	const result = await prisma.activityLog.deleteMany({
		where: {
			createdAt: {
				lt: cutoffDate
			}
		}
	});

	console.log(`Cleaned ${result.count} old activity logs`);
	return result.count;
}

