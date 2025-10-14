<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { isValidEmail } from '$lib/utils';

	// Form state
	let name = $state('');
	let email = $state('');
	let company = $state('');
	let subject = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');

	// Subject options
	const subjects = [
		'General Inquiry',
		'Become a CTO Partner',
		'Enterprise Solutions',
		'Technical Support',
		'Partnership Opportunities',
		'Press & Media',
		'Other'
	];

	// Handle form submission
	async function handleSubmit(e: Event) {
		e.preventDefault();
		submitError = '';

		// Validation
		if (!name || !email || !subject || !message) {
			submitError = 'Please fill in all required fields';
			return;
		}

		if (!isValidEmail(email)) {
			submitError = 'Please enter a valid email address';
			return;
		}

		isSubmitting = true;

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		submitSuccess = true;
		isSubmitting = false;

		// Reset form
		setTimeout(() => {
			name = '';
			email = '';
			company = '';
			subject = '';
			message = '';
			submitSuccess = false;
		}, 5000);
	}
</script>

<svelte:head>
	<title>Contact Us - CTOrendang</title>
	<meta
		name="description"
		content="Get in touch with CTOrendang. We're here to help you find the perfect CTO for your startup."
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<!-- Header -->
	<header class="bg-slate-950/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
				<a href="/" class="text-2xl font-bold text-white">CTOrendang</a>
				<nav class="flex items-center space-x-6">
					<a href="/" class="text-gray-300 hover:text-white transition-colors">Home</a>
					<a href="/product" class="text-gray-300 hover:text-white transition-colors">Product</a>
					<a href="/pitch" class="text-gray-300 hover:text-white transition-colors">Pitch Deck</a>
					<a
						href="/#waitlist"
						class="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
					>
						Join Waitlist
					</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<!-- Header -->
		<Motion
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div class="text-center mb-16">
				<h1 class="text-5xl md:text-6xl font-bold text-white mb-6">Get in Touch</h1>
				<p class="text-xl text-gray-400 max-w-2xl mx-auto">
					Have questions? We'd love to hear from you. Send us a message and we'll respond as soon
					as possible.
				</p>
			</div>
		</Motion>

		<div class="grid lg:grid-cols-3 gap-12">
			<!-- Contact Form -->
			<div class="lg:col-span-2">
				<Motion
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
						<h2 class="text-3xl font-bold text-white mb-6">Send us a Message</h2>

						{#if submitSuccess}
							<div class="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6 animate-scale-in">
								<div class="flex items-start gap-4">
									<div class="text-4xl">✅</div>
									<div>
										<h3 class="text-xl font-bold text-white mb-2">Message Sent!</h3>
										<p class="text-gray-300">
											Thank you for contacting us. We'll get back to you within 24 hours.
										</p>
									</div>
								</div>
							</div>
						{/if}

						{#if submitError}
							<div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
								<p class="text-red-400">{submitError}</p>
							</div>
						{/if}

						<form onsubmit={handleSubmit} class="space-y-6">
							<div class="grid md:grid-cols-2 gap-6">
								<div>
									<label for="name" class="block text-white font-semibold mb-2">
										Name *
									</label>
									<input
										id="name"
										type="text"
										bind:value={name}
										required
										placeholder="Your full name"
										class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
									/>
								</div>

								<div>
									<label for="email" class="block text-white font-semibold mb-2">
										Email *
									</label>
									<input
										id="email"
										type="email"
										bind:value={email}
										required
										placeholder="your@email.com"
										class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
									/>
								</div>
							</div>

							<div>
								<label for="company" class="block text-white font-semibold mb-2">
									Company (Optional)
								</label>
								<input
									id="company"
									type="text"
									bind:value={company}
									placeholder="Your company name"
									class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
								/>
							</div>

							<div>
								<label for="subject" class="block text-white font-semibold mb-2">
									Subject *
								</label>
								<select
									id="subject"
									bind:value={subject}
									required
									class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
								>
									<option value="">Select a subject...</option>
									{#each subjects as subj}
										<option value={subj}>{subj}</option>
									{/each}
								</select>
							</div>

							<div>
								<label for="message" class="block text-white font-semibold mb-2">
									Message *
								</label>
								<textarea
									id="message"
									bind:value={message}
									required
									rows="6"
									placeholder="Tell us how we can help you..."
									class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
								></textarea>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								class="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
							>
								{isSubmitting ? 'Sending...' : 'Send Message'}
							</button>
						</form>
					</div>
				</Motion>
			</div>

			<!-- Contact Information -->
			<div class="space-y-6">
				<Motion
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
						<h3 class="text-2xl font-bold text-white mb-6">Contact Information</h3>

						<div class="space-y-6">
							<div class="flex items-start gap-4">
								<div class="text-3xl">📧</div>
								<div>
									<div class="text-gray-400 text-sm mb-1">Email</div>
									<a
										href="mailto:hello@ctorendang.com"
										class="text-white font-semibold hover:text-purple-400 transition-colors"
									>
										hello@ctorendang.com
									</a>
								</div>
							</div>

							<div class="flex items-start gap-4">
								<div class="text-3xl">💬</div>
								<div>
									<div class="text-gray-400 text-sm mb-1">Discord Community</div>
									<a
										href="https://discord.gg/ctorendang"
										target="_blank"
										rel="noopener noreferrer"
										class="text-white font-semibold hover:text-purple-400 transition-colors"
									>
										Join our Discord
									</a>
								</div>
							</div>

							<div class="flex items-start gap-4">
								<div class="text-3xl">🐦</div>
								<div>
									<div class="text-gray-400 text-sm mb-1">Twitter</div>
									<a
										href="https://twitter.com/ctorendang"
										target="_blank"
										rel="noopener noreferrer"
										class="text-white font-semibold hover:text-purple-400 transition-colors"
									>
										@CTOrendang
									</a>
								</div>
							</div>

							<div class="flex items-start gap-4">
								<div class="text-3xl">💼</div>
								<div>
									<div class="text-gray-400 text-sm mb-1">LinkedIn</div>
									<a
										href="https://linkedin.com/company/ctorendang"
										target="_blank"
										rel="noopener noreferrer"
										class="text-white font-semibold hover:text-purple-400 transition-colors"
									>
										CTOrendang
									</a>
								</div>
							</div>
						</div>
					</div>
				</Motion>

				<Motion
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
						<h3 class="text-2xl font-bold text-white mb-4">Response Time</h3>
						<p class="text-gray-300 mb-4">
							We typically respond to all inquiries within <strong class="text-white">24 hours</strong>
							during business days.
						</p>
						<p class="text-gray-400 text-sm">
							For urgent matters, please mention "URGENT" in your subject line.
						</p>
					</div>
				</Motion>

				<Motion
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
				>
					<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
						<h3 class="text-2xl font-bold text-white mb-4">Office Hours</h3>
						<div class="space-y-2 text-gray-300">
							<div class="flex justify-between">
								<span>Monday - Friday</span>
								<span class="text-white font-semibold">9:00 AM - 6:00 PM PST</span>
							</div>
							<div class="flex justify-between">
								<span>Saturday - Sunday</span>
								<span class="text-gray-500">Closed</span>
							</div>
						</div>
					</div>
				</Motion>
			</div>
		</div>

		<!-- FAQ Section -->
		<Motion
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.6 }}
		>
			<div class="mt-16">
				<h2 class="text-4xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
				<div class="grid md:grid-cols-2 gap-6">
					<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
						<h4 class="text-white font-bold text-lg mb-2">How quickly can I get matched with a CTO?</h4>
						<p class="text-gray-400 text-sm">
							Our AI analysis takes 5 minutes, and you'll receive 3-5 CTO matches immediately. You can
							schedule a consultation within 24-48 hours.
						</p>
					</div>

					<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
						<h4 class="text-white font-bold text-lg mb-2">What if I'm not satisfied with my matched CTO?</h4>
						<p class="text-gray-400 text-sm">
							We offer free re-matching if you're not satisfied. Our goal is to find the perfect fit
							for your startup's needs.
						</p>
					</div>

					<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
						<h4 class="text-white font-bold text-lg mb-2">Can I cancel my subscription anytime?</h4>
						<p class="text-gray-400 text-sm">
							Yes! All our plans are month-to-month with no long-term contracts. Cancel anytime with
							no penalties.
						</p>
					</div>

					<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
						<h4 class="text-white font-bold text-lg mb-2">Do you offer enterprise solutions?</h4>
						<p class="text-gray-400 text-sm">
							Yes! We have custom enterprise plans for VCs, accelerators, and large organizations.
							Contact us for details.
						</p>
					</div>
				</div>
			</div>
		</Motion>
	</div>
</div>

