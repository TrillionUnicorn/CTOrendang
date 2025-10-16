// Stripe Webhook Handler
// POST /api/webhooks/stripe
// Handles Stripe events (subscriptions, payments, etc.)

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { stripe } from '$lib/server/payments/stripe';
import { prisma } from '$lib/server/db';
import type { Stripe } from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.text();
		const signature = request.headers.get('stripe-signature');

		if (!signature) {
			return json({ error: 'No signature' }, { status: 400 });
		}

		// Verify webhook signature
		let event: Stripe.Event;
		try {
			event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
		} catch (err) {
			console.error('Webhook signature verification failed:', err);
			return json({ error: 'Invalid signature' }, { status: 400 });
		}

		// Handle event
		console.log(`Processing webhook event: ${event.type}`);

		switch (event.type) {
			case 'checkout.session.completed':
				await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
				break;

			case 'customer.subscription.created':
				await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
				break;

			case 'customer.subscription.updated':
				await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
				break;

			case 'customer.subscription.deleted':
				await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
				break;

			case 'invoice.paid':
				await handleInvoicePaid(event.data.object as Stripe.Invoice);
				break;

			case 'invoice.payment_failed':
				await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
				break;

			case 'payment_intent.succeeded':
				await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
				break;

			default:
				console.log(`Unhandled event type: ${event.type}`);
		}

		return json({ received: true });
	} catch (error) {
		console.error('Webhook error:', error);
		return json({ error: 'Webhook processing failed' }, { status: 500 });
	}
};

/**
 * Handle checkout session completed
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
	const userId = session.metadata?.userId;
	const type = session.metadata?.type;

	if (!userId) {
		console.error('No userId in session metadata');
		return;
	}

	if (type === 'booking') {
		// Handle booking payment
		const bookingId = session.metadata?.bookingId;
		if (bookingId) {
			await prisma.booking.update({
				where: { id: bookingId },
				data: {
					status: 'CONFIRMED',
					stripeSessionId: session.id,
					stripePaymentId: session.payment_intent as string
				}
			});
		}
	} else {
		// Handle subscription
		const subscriptionId = session.subscription as string;
		if (subscriptionId) {
			const subscription = await stripe.subscriptions.retrieve(subscriptionId);
			await handleSubscriptionCreated(subscription);
		}
	}
}

/**
 * Handle subscription created
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
	const userId = subscription.metadata?.userId;
	const tier = subscription.metadata?.tier as any;

	if (!userId || !tier) {
		console.error('Missing userId or tier in subscription metadata');
		return;
	}

	// Create subscription record
	await prisma.subscription.create({
		data: {
			userId,
			tier,
			status: 'ACTIVE',
			stripeCustomerId: subscription.customer as string,
			stripeSubscriptionId: subscription.id,
			currentPeriodStart: new Date(subscription.current_period_start * 1000),
			currentPeriodEnd: new Date(subscription.current_period_end * 1000),
			cancelAtPeriodEnd: subscription.cancel_at_period_end
		}
	});
}

/**
 * Handle subscription updated
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
	const existingSubscription = await prisma.subscription.findFirst({
		where: { stripeSubscriptionId: subscription.id }
	});

	if (!existingSubscription) {
		console.error('Subscription not found:', subscription.id);
		return;
	}

	// Map Stripe status to our status
	let status: any = 'ACTIVE';
	if (subscription.status === 'past_due') status = 'PAST_DUE';
	if (subscription.status === 'canceled') status = 'CANCELLED';
	if (subscription.status === 'incomplete') status = 'INCOMPLETE';
	if (subscription.status === 'trialing') status = 'TRIALING';

	// Update subscription
	await prisma.subscription.update({
		where: { id: existingSubscription.id },
		data: {
			status,
			currentPeriodStart: new Date(subscription.current_period_start * 1000),
			currentPeriodEnd: new Date(subscription.current_period_end * 1000),
			cancelAtPeriodEnd: subscription.cancel_at_period_end
		}
	});
}

/**
 * Handle subscription deleted
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
	const existingSubscription = await prisma.subscription.findFirst({
		where: { stripeSubscriptionId: subscription.id }
	});

	if (!existingSubscription) {
		console.error('Subscription not found:', subscription.id);
		return;
	}

	// Update subscription status
	await prisma.subscription.update({
		where: { id: existingSubscription.id },
		data: {
			status: 'CANCELLED'
		}
	});
}

/**
 * Handle invoice paid
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
	// Log successful payment
	console.log(`Invoice paid: ${invoice.id}`);

	// You could send a receipt email here
	// await sendReceiptEmail(invoice);
}

/**
 * Handle invoice payment failed
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
	const subscriptionId = invoice.subscription as string;

	if (!subscriptionId) return;

	const subscription = await prisma.subscription.findFirst({
		where: { stripeSubscriptionId: subscriptionId }
	});

	if (!subscription) return;

	// Update subscription status
	await prisma.subscription.update({
		where: { id: subscription.id },
		data: {
			status: 'PAST_DUE'
		}
	});

	// You could send a payment failed email here
	// await sendPaymentFailedEmail(subscription.userId);
}

/**
 * Handle payment succeeded
 */
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
	console.log(`Payment succeeded: ${paymentIntent.id}`);

	// Log activity
	await prisma.activityLog.create({
		data: {
			action: 'payment_succeeded',
			metadata: JSON.stringify({
				paymentIntentId: paymentIntent.id,
				amount: paymentIntent.amount,
				currency: paymentIntent.currency
			})
		}
	});
}

