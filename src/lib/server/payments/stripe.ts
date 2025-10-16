// Stripe Payment Service
// Production-ready payment processing

import Stripe from 'stripe';
import { prisma } from '../db';
import type { SubscriptionTier } from '@prisma/client';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2024-12-18.acacia',
	typescript: true
});

// Subscription tier pricing
export const SUBSCRIPTION_PRICES = {
	FREE: null,
	STARTER: process.env.STRIPE_PRICE_STARTER!,
	PROFESSIONAL: process.env.STRIPE_PRICE_PROFESSIONAL!,
	BUSINESS: process.env.STRIPE_PRICE_BUSINESS!,
	ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE!
} as const;

/**
 * Create or get Stripe customer for user
 */
export async function getOrCreateCustomer(userId: string): Promise<string> {
	// Check if user already has Stripe customer ID
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { email: true, name: true }
	});

	if (!user) {
		throw new Error('User not found');
	}

	// Check for existing subscription with customer ID
	const existingSubscription = await prisma.subscription.findFirst({
		where: { userId },
		select: { stripeCustomerId: true }
	});

	if (existingSubscription?.stripeCustomerId) {
		return existingSubscription.stripeCustomerId;
	}

	// Create new Stripe customer
	const customer = await stripe.customers.create({
		email: user.email,
		name: user.name || undefined,
		metadata: {
			userId
		}
	});

	return customer.id;
}

/**
 * Create subscription checkout session
 */
export async function createSubscriptionCheckout(
	userId: string,
	tier: Exclude<SubscriptionTier, 'FREE'>,
	successUrl: string,
	cancelUrl: string
): Promise<string> {
	const customerId = await getOrCreateCustomer(userId);
	const priceId = SUBSCRIPTION_PRICES[tier];

	if (!priceId) {
		throw new Error(`Invalid subscription tier: ${tier}`);
	}

	const session = await stripe.checkout.sessions.create({
		customer: customerId,
		mode: 'subscription',
		payment_method_types: ['card'],
		line_items: [
			{
				price: priceId,
				quantity: 1
			}
		],
		success_url: successUrl,
		cancel_url: cancelUrl,
		metadata: {
			userId,
			tier
		}
	});

	return session.url!;
}

/**
 * Create one-time payment for CTO booking
 */
export async function createBookingCheckout(
	userId: string,
	bookingId: string,
	amount: number, // in cents
	successUrl: string,
	cancelUrl: string
): Promise<string> {
	const customerId = await getOrCreateCustomer(userId);

	const session = await stripe.checkout.sessions.create({
		customer: customerId,
		mode: 'payment',
		payment_method_types: ['card'],
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: 'CTO Consultation Booking',
						description: `Booking ID: ${bookingId}`
					},
					unit_amount: amount
				},
				quantity: 1
			}
		],
		success_url: successUrl,
		cancel_url: cancelUrl,
		metadata: {
			userId,
			bookingId,
			type: 'booking'
		}
	});

	return session.url!;
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(userId: string): Promise<void> {
	const subscription = await prisma.subscription.findFirst({
		where: {
			userId,
			status: 'ACTIVE'
		}
	});

	if (!subscription?.stripeSubscriptionId) {
		throw new Error('No active subscription found');
	}

	// Cancel at period end (don't cancel immediately)
	await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
		cancel_at_period_end: true
	});

	// Update database
	await prisma.subscription.update({
		where: { id: subscription.id },
		data: {
			cancelAtPeriodEnd: true
		}
	});
}

/**
 * Reactivate cancelled subscription
 */
export async function reactivateSubscription(userId: string): Promise<void> {
	const subscription = await prisma.subscription.findFirst({
		where: {
			userId,
			status: 'ACTIVE',
			cancelAtPeriodEnd: true
		}
	});

	if (!subscription?.stripeSubscriptionId) {
		throw new Error('No subscription to reactivate');
	}

	// Remove cancellation
	await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
		cancel_at_period_end: false
	});

	// Update database
	await prisma.subscription.update({
		where: { id: subscription.id },
		data: {
			cancelAtPeriodEnd: false
		}
	});
}

/**
 * Create customer portal session
 */
export async function createPortalSession(userId: string, returnUrl: string): Promise<string> {
	const customerId = await getOrCreateCustomer(userId);

	const session = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: returnUrl
	});

	return session.url;
}

/**
 * Get subscription details
 */
export async function getSubscriptionDetails(userId: string) {
	const subscription = await prisma.subscription.findFirst({
		where: { userId },
		orderBy: { createdAt: 'desc' }
	});

	if (!subscription?.stripeSubscriptionId) {
		return null;
	}

	const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);

	return {
		...subscription,
		stripeData: stripeSubscription
	};
}

/**
 * Process refund for booking
 */
export async function refundBooking(bookingId: string, reason?: string): Promise<void> {
	const booking = await prisma.booking.findUnique({
		where: { id: bookingId }
	});

	if (!booking?.stripePaymentId) {
		throw new Error('No payment found for this booking');
	}

	// Create refund
	await stripe.refunds.create({
		payment_intent: booking.stripePaymentId,
		reason: reason as Stripe.RefundCreateParams.Reason | undefined
	});

	// Update booking status
	await prisma.booking.update({
		where: { id: bookingId },
		data: {
			status: 'REFUNDED'
		}
	});
}

/**
 * Get payment history
 */
export async function getPaymentHistory(userId: string, limit = 10) {
	const customerId = await getOrCreateCustomer(userId);

	const charges = await stripe.charges.list({
		customer: customerId,
		limit
	});

	return charges.data;
}

export { stripe };

