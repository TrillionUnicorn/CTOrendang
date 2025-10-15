// Email Service - Resend
// Production-ready transactional emails

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_FROM || 'noreply@ctorendang.com';

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(to: string, name: string) {
	try {
		await resend.emails.send({
			from: fromEmail,
			to,
			subject: 'Welcome to CTOrendang!',
			html: `
				<h1>Welcome to CTOrendang, ${name}!</h1>
				<p>We're excited to have you on board.</p>
				<p>CTOrendang connects startups with experienced CTOs who can provide strategic technical guidance.</p>
				<h2>Get Started:</h2>
				<ul>
					<li>Complete your profile</li>
					<li>Browse our marketplace of CTOs</li>
					<li>Submit your project for AI analysis</li>
					<li>Get matched with the perfect CTO</li>
				</ul>
				<p><a href="${process.env.PUBLIC_URL}/dashboard">Go to Dashboard</a></p>
				<p>Best regards,<br>The CTOrendang Team</p>
			`
		});
	} catch (error) {
		console.error('Send welcome email error:', error);
	}
}

/**
 * Send email verification
 */
export async function sendVerificationEmail(to: string, verificationUrl: string) {
	try {
		await resend.emails.send({
			from: fromEmail,
			to,
			subject: 'Verify your email address',
			html: `
				<h1>Verify Your Email</h1>
				<p>Please click the link below to verify your email address:</p>
				<p><a href="${verificationUrl}">Verify Email</a></p>
				<p>This link will expire in 24 hours.</p>
				<p>If you didn't create an account, you can safely ignore this email.</p>
			`
		});
	} catch (error) {
		console.error('Send verification email error:', error);
	}
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(to: string, resetUrl: string) {
	try {
		await resend.emails.send({
			from: fromEmail,
			to,
			subject: 'Reset your password',
			html: `
				<h1>Reset Your Password</h1>
				<p>You requested to reset your password. Click the link below:</p>
				<p><a href="${resetUrl}">Reset Password</a></p>
				<p>This link will expire in 1 hour.</p>
				<p>If you didn't request this, you can safely ignore this email.</p>
			`
		});
	} catch (error) {
		console.error('Send password reset email error:', error);
	}
}

/**
 * Send booking confirmation to client
 */
export async function sendBookingConfirmationEmail(
	to: string,
	booking: {
		title: string;
		ctoName: string;
		startDate: Date;
		endDate: Date;
		hours: number;
		totalAmount: number;
	}
) {
	try {
		await resend.emails.send({
			from: fromEmail,
			to,
			subject: 'Booking Confirmed!',
			html: `
				<h1>Your Booking is Confirmed</h1>
				<p>Your booking with ${booking.ctoName} has been confirmed.</p>
				<h2>Booking Details:</h2>
				<ul>
					<li><strong>Title:</strong> ${booking.title}</li>
					<li><strong>CTO:</strong> ${booking.ctoName}</li>
					<li><strong>Start Date:</strong> ${booking.startDate.toLocaleDateString()}</li>
					<li><strong>End Date:</strong> ${booking.endDate.toLocaleDateString()}</li>
					<li><strong>Hours:</strong> ${booking.hours}</li>
					<li><strong>Total Amount:</strong> $${booking.totalAmount}</li>
				</ul>
				<p><a href="${process.env.PUBLIC_URL}/bookings">View Booking</a></p>
			`
		});
	} catch (error) {
		console.error('Send booking confirmation error:', error);
	}
}

/**
 * Send new booking notification to CTO
 */
export async function sendNewBookingNotificationEmail(
	to: string,
	booking: {
		title: string;
		clientName: string;
		startDate: Date;
		endDate: Date;
		hours: number;
		totalAmount: number;
	}
) {
	try {
		await resend.emails.send({
			from: fromEmail,
			to,
			subject: 'New Booking Request',
			html: `
				<h1>You Have a New Booking!</h1>
				<p>${booking.clientName} has booked you for a consultation.</p>
				<h2>Booking Details:</h2>
				<ul>
					<li><strong>Title:</strong> ${booking.title}</li>
					<li><strong>Client:</strong> ${booking.clientName}</li>
					<li><strong>Start Date:</strong> ${booking.startDate.toLocaleDateString()}</li>
					<li><strong>End Date:</strong> ${booking.endDate.toLocaleDateString()}</li>
					<li><strong>Hours:</strong> ${booking.hours}</li>
					<li><strong>Amount:</strong> $${booking.totalAmount}</li>
				</ul>
				<p><a href="${process.env.PUBLIC_URL}/bookings">View Booking</a></p>
			`
		});
	} catch (error) {
		console.error('Send new booking notification error:', error);
	}
}

/**
 * Send project analysis complete email
 */
export async function sendProjectAnalysisEmail(
	to: string,
	project: {
		title: string;
		healthScore: number;
		matchCount: number;
	}
) {
	try {
		await resend.emails.send({
			from: fromEmail,
			to,
			subject: 'Your Project Analysis is Ready!',
			html: `
				<h1>Project Analysis Complete</h1>
				<p>We've analyzed your project "${project.title}" and found ${project.matchCount} matching CTOs!</p>
				<h2>Results:</h2>
				<ul>
					<li><strong>Health Score:</strong> ${project.healthScore}/100</li>
					<li><strong>Matched CTOs:</strong> ${project.matchCount}</li>
				</ul>
				<p><a href="${process.env.PUBLIC_URL}/projects">View Analysis</a></p>
			`
		});
	} catch (error) {
		console.error('Send project analysis email error:', error);
	}
}

/**
 * Send new message notification
 */
export async function sendMessageNotificationEmail(
	to: string,
	message: {
		senderName: string;
		preview: string;
	}
) {
	try {
		await resend.emails.send({
			from: fromEmail,
			to,
			subject: `New message from ${message.senderName}`,
			html: `
				<h1>You Have a New Message</h1>
				<p><strong>From:</strong> ${message.senderName}</p>
				<p><strong>Message:</strong> ${message.preview}...</p>
				<p><a href="${process.env.PUBLIC_URL}/messages">View Message</a></p>
			`
		});
	} catch (error) {
		console.error('Send message notification error:', error);
	}
}

/**
 * Send subscription confirmation
 */
export async function sendSubscriptionConfirmationEmail(
	to: string,
	subscription: {
		tier: string;
		amount: number;
		nextBillingDate: Date;
	}
) {
	try {
		await resend.emails.send({
			from: fromEmail,
			to,
			subject: 'Subscription Confirmed',
			html: `
				<h1>Welcome to ${subscription.tier}!</h1>
				<p>Your subscription has been activated.</p>
				<h2>Subscription Details:</h2>
				<ul>
					<li><strong>Plan:</strong> ${subscription.tier}</li>
					<li><strong>Amount:</strong> $${subscription.amount}/month</li>
					<li><strong>Next Billing Date:</strong> ${subscription.nextBillingDate.toLocaleDateString()}</li>
				</ul>
				<p><a href="${process.env.PUBLIC_URL}/dashboard">Go to Dashboard</a></p>
			`
		});
	} catch (error) {
		console.error('Send subscription confirmation error:', error);
	}
}

export { resend };

