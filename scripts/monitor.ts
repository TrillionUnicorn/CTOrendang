#!/usr/bin/env bun
// Production Monitoring Script
// Run with: bun run scripts/monitor.ts

import { prisma } from '../src/lib/server/db';

async function monitor() {
	console.log('🔍 CTOrendang - Production Monitoring');
	console.log('=====================================');
	console.log('');

	try {
		// Database health
		console.log('📊 Database Health:');
		const startTime = Date.now();
		await prisma.$queryRaw`SELECT 1`;
		const dbLatency = Date.now() - startTime;
		console.log(`  ✅ Connected (${dbLatency}ms)`);
		console.log('');

		// User metrics
		console.log('👥 User Metrics:');
		const [totalUsers, newUsersToday, activeUsers] = await Promise.all([
			prisma.user.count(),
			prisma.user.count({
				where: {
					createdAt: {
						gte: new Date(new Date().setHours(0, 0, 0, 0))
					}
				}
			}),
			prisma.session.count({
				where: {
					expiresAt: {
						gt: new Date()
					}
				}
			})
		]);

		console.log(`  Total Users: ${totalUsers}`);
		console.log(`  New Today: ${newUsersToday}`);
		console.log(`  Active Sessions: ${activeUsers}`);
		console.log('');

		// CTO metrics
		console.log('👔 CTO Metrics:');
		const [totalCTOs, verifiedCTOs, featuredCTOs] = await Promise.all([
			prisma.cTOProfile.count(),
			prisma.cTOProfile.count({ where: { verified: true } }),
			prisma.cTOProfile.count({ where: { featured: true } })
		]);

		console.log(`  Total CTOs: ${totalCTOs}`);
		console.log(`  Verified: ${verifiedCTOs}`);
		console.log(`  Featured: ${featuredCTOs}`);
		console.log('');

		// Project metrics
		console.log('📊 Project Metrics:');
		const [totalProjects, analyzedToday] = await Promise.all([
			prisma.project.count(),
			prisma.project.count({
				where: {
					createdAt: {
						gte: new Date(new Date().setHours(0, 0, 0, 0))
					}
				}
			})
		]);

		console.log(`  Total Projects: ${totalProjects}`);
		console.log(`  Analyzed Today: ${analyzedToday}`);
		console.log('');

		// Booking metrics
		console.log('📅 Booking Metrics:');
		const [totalBookings, completedBookings, revenue] = await Promise.all([
			prisma.booking.count(),
			prisma.booking.count({ where: { status: 'COMPLETED' } }),
			prisma.booking.aggregate({
				where: { status: 'COMPLETED' },
				_sum: { totalAmount: true }
			})
		]);

		console.log(`  Total Bookings: ${totalBookings}`);
		console.log(`  Completed: ${completedBookings}`);
		console.log(`  Total Revenue: $${revenue._sum.totalAmount || 0}`);
		console.log('');

		// Subscription metrics
		console.log('💳 Subscription Metrics:');
		const activeSubscriptions = await prisma.subscription.count({
			where: { status: 'ACTIVE' }
		});

		const subscriptionsByTier = await prisma.subscription.groupBy({
			by: ['tier'],
			where: { status: 'ACTIVE' },
			_count: true
		});

		console.log(`  Active Subscriptions: ${activeSubscriptions}`);
		subscriptionsByTier.forEach((sub) => {
			console.log(`    ${sub.tier}: ${sub._count}`);
		});
		console.log('');

		// Message metrics
		console.log('💬 Message Metrics:');
		const [totalMessages, messagesToday] = await Promise.all([
			prisma.message.count(),
			prisma.message.count({
				where: {
					createdAt: {
						gte: new Date(new Date().setHours(0, 0, 0, 0))
					}
				}
			})
		]);

		console.log(`  Total Messages: ${totalMessages}`);
		console.log(`  Sent Today: ${messagesToday}`);
		console.log('');

		// Recent errors (from activity log)
		console.log('⚠️  Recent Activity:');
		const recentActivity = await prisma.activityLog.findMany({
			take: 5,
			orderBy: { createdAt: 'desc' },
			select: {
				action: true,
				createdAt: true
			}
		});

		recentActivity.forEach((activity) => {
			const time = activity.createdAt.toLocaleTimeString();
			console.log(`  ${time} - ${activity.action}`);
		});
		console.log('');

		console.log('=====================================');
		console.log('✅ Monitoring Complete');
		console.log('=====================================');
	} catch (error) {
		console.error('❌ Monitoring Error:', error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

// Run monitoring
monitor();

