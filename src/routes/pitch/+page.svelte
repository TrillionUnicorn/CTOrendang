<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { formatCurrency, formatNumber } from '$lib/utils';

	let currentSlide = $state(0);

	const slides = [
		{
			title: 'The Problem',
			subtitle: '$2.1 Trillion Startup Failure Crisis',
			type: 'problem'
		},
		{
			title: 'Market Opportunity',
			subtitle: 'Massive & Growing Market',
			type: 'market'
		},
		{
			title: 'Our Solution',
			subtitle: 'AI + Human CTO Platform',
			type: 'solution'
		},
		{
			title: 'How It Works',
			subtitle: '3-Step Process',
			type: 'how-it-works'
		},
		{
			title: 'Business Model',
			subtitle: 'Scalable Revenue Streams',
			type: 'business-model'
		},
		{
			title: 'Competitive Analysis',
			subtitle: 'Unique Positioning',
			type: 'competition'
		},
		{
			title: 'Traction & Metrics',
			subtitle: 'Early Success',
			type: 'traction'
		},
		{
			title: 'Go-to-Market Strategy',
			subtitle: 'Customer Acquisition',
			type: 'gtm'
		},
		{
			title: 'Financial Projections',
			subtitle: '5-Year Growth Plan',
			type: 'financials'
		},
		{
			title: 'The Team',
			subtitle: 'Experienced Founders',
			type: 'team'
		},
		{
			title: 'Investment Ask',
			subtitle: 'Funding & Use of Funds',
			type: 'ask'
		}
	];

	function nextSlide() {
		if (currentSlide < slides.length - 1) {
			currentSlide++;
		}
	}

	function prevSlide() {
		if (currentSlide > 0) {
			currentSlide--;
		}
	}

	function goToSlide(index: number) {
		currentSlide = index;
	}
</script>

<svelte:head>
	<title>CTOrendang Pitch Deck - Investor Presentation</title>
	<meta
		name="description"
		content="CTOrendang investor pitch deck. Democratizing access to world-class technical leadership through AI + Human CTO platform."
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
					<a href="/contact" class="text-gray-300 hover:text-white transition-colors">Contact</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Pitch Deck Container -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Slide Navigation -->
		<div class="flex items-center justify-between mb-8">
			<button
				onclick={prevSlide}
				disabled={currentSlide === 0}
				class="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
			>
				← Previous
			</button>
			<div class="text-white font-semibold">
				Slide {currentSlide + 1} of {slides.length}
			</div>
			<button
				onclick={nextSlide}
				disabled={currentSlide === slides.length - 1}
				class="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
			>
				Next →
			</button>
		</div>

		<!-- Slide Content -->
		<div class="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 min-h-[600px]">
			{#if slides[currentSlide].type === 'problem'}
				<!-- Problem Slide -->
				<div class="text-center mb-8">
					<h1 class="text-5xl font-bold text-white mb-4">{slides[currentSlide].title}</h1>
					<p class="text-2xl text-purple-400">{slides[currentSlide].subtitle}</p>
				</div>

				<div class="grid md:grid-cols-2 gap-8 mb-8">
					<div class="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
						<div class="text-6xl mb-4">💸</div>
						<h3 class="text-3xl font-bold text-white mb-4">90% Startup Failure Rate</h3>
						<p class="text-gray-300 mb-4">
							<strong class="text-red-400">70%</strong> of failures are due to poor technical decisions
						</p>
						<p class="text-gray-400 text-sm">
							Source: CB Insights Startup Failure Report 2024
						</p>
					</div>

					<div class="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-8">
						<div class="text-6xl mb-4">🔥</div>
						<h3 class="text-3xl font-bold text-white mb-4">$2.1T Lost Annually</h3>
						<p class="text-gray-300 mb-4">
							Global startup failures cost <strong class="text-orange-400">$2.1 trillion</strong> per year
						</p>
						<p class="text-gray-400 text-sm">
							Source: Startup Genome Global Report 2024
						</p>
					</div>
				</div>

				<div class="space-y-4">
					<div class="bg-white/5 rounded-xl p-6 border border-white/10">
						<div class="flex items-start gap-4">
							<div class="text-3xl">😰</div>
							<div>
								<h4 class="text-white font-bold text-lg mb-2">Unaffordable CTOs</h4>
								<p class="text-gray-400">
									Full-time CTOs cost $250K-$400K/year + equity. Most early-stage startups can't afford this.
								</p>
							</div>
						</div>
					</div>

					<div class="bg-white/5 rounded-xl p-6 border border-white/10">
						<div class="flex items-start gap-4">
							<div class="text-3xl">🎯</div>
							<div>
								<h4 class="text-white font-bold text-lg mb-2">Wrong Hires</h4>
								<p class="text-gray-400">
									67% of first technical hires are replaced within 18 months. Non-tech founders struggle to evaluate technical competence.
								</p>
							</div>
						</div>
					</div>

					<div class="bg-white/5 rounded-xl p-6 border border-white/10">
						<div class="flex items-start gap-4">
							<div class="text-3xl">⏰</div>
							<div>
								<h4 class="text-white font-bold text-lg mb-2">Time to Market</h4>
								<p class="text-gray-400">
									6+ months to find and onboard technical leadership. Critical time lost in competitive markets.
								</p>
							</div>
						</div>
					</div>
				</div>
			{:else if slides[currentSlide].type === 'market'}
				<!-- Market Opportunity Slide -->
				<div class="text-center mb-8">
					<h1 class="text-5xl font-bold text-white mb-4">{slides[currentSlide].title}</h1>
					<p class="text-2xl text-purple-400">{slides[currentSlide].subtitle}</p>
				</div>

				<div class="grid md:grid-cols-3 gap-6 mb-8">
					<div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30 text-center">
						<div class="text-5xl font-bold text-white mb-2">$638B</div>
						<div class="text-gray-300 mb-2">AI Market Size (2024)</div>
						<div class="text-sm text-gray-400">Growing to $1.77T by 2032</div>
						<div class="text-xs text-gray-500 mt-2">Source: Precedence Research</div>
					</div>

					<div class="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-blue-500/30 text-center">
						<div class="text-5xl font-bold text-white mb-2">120K</div>
						<div class="text-gray-300 mb-2">Fractional Leaders (2024)</div>
						<div class="text-sm text-gray-400">Doubled from 60K in 2022</div>
						<div class="text-xs text-gray-500 mt-2">Source: Consulting Success</div>
					</div>

					<div class="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-8 border border-green-500/30 text-center">
						<div class="text-5xl font-bold text-white mb-2">5,400%</div>
						<div class="text-gray-300 mb-2">LinkedIn Growth</div>
						<div class="text-sm text-gray-400">Fractional executive market</div>
						<div class="text-xs text-gray-500 mt-2">Source: Ignitebright</div>
					</div>
				</div>

				<div class="bg-white/5 rounded-2xl p-8 border border-white/10 mb-6">
					<h3 class="text-2xl font-bold text-white mb-6">Target Market Segments</h3>
					<div class="space-y-4">
						<div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
							<div>
								<div class="text-white font-bold">Non-Tech Founders</div>
								<div class="text-gray-400 text-sm">Need technical guidance and leadership</div>
							</div>
							<div class="text-right">
								<div class="text-2xl font-bold text-purple-400">2M</div>
								<div class="text-gray-400 text-sm">Globally</div>
							</div>
						</div>

						<div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
							<div>
								<div class="text-white font-bold">Early-Stage Startups</div>
								<div class="text-gray-400 text-sm">Can't afford full-time CTO yet</div>
							</div>
							<div class="text-right">
								<div class="text-2xl font-bold text-purple-400">500K</div>
								<div class="text-gray-400 text-sm">Active</div>
							</div>
						</div>

						<div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
							<div>
								<div class="text-white font-bold">SMBs Going Digital</div>
								<div class="text-gray-400 text-sm">Need technical transformation</div>
							</div>
							<div class="text-right">
								<div class="text-2xl font-bold text-purple-400">50M</div>
								<div class="text-gray-400 text-sm">Globally</div>
							</div>
						</div>
					</div>
				</div>

				<div class="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30 text-center">
					<div class="text-3xl font-bold text-white mb-2">Total Addressable Market</div>
					<div class="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
						$50B+
					</div>
					<div class="text-gray-300">CTO-as-a-Service market by 2030</div>
					<div class="text-sm text-gray-400 mt-2">35% CAGR in fractional executive services</div>
				</div>
			{:else if slides[currentSlide].type === 'solution'}
				<!-- Solution Slide -->
				<div class="text-center mb-8">
					<h1 class="text-5xl font-bold text-white mb-4">{slides[currentSlide].title}</h1>
					<p class="text-2xl text-purple-400">{slides[currentSlide].subtitle}</p>
				</div>

				<div class="grid md:grid-cols-2 gap-8 mb-8">
					<div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
						<div class="text-6xl mb-4">🤖</div>
						<h3 class="text-2xl font-bold text-white mb-4">AI-Powered Analysis</h3>
						<ul class="space-y-3 text-gray-300">
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>Instant technical assessment (5 minutes)</span>
							</li>
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>50+ technical factors analyzed</span>
							</li>
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>Tech stack recommendations</span>
							</li>
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>Risk identification & mitigation</span>
							</li>
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>Actionable recommendations</span>
							</li>
						</ul>
					</div>

					<div class="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-blue-500/30">
						<div class="text-6xl mb-4">👨‍💼</div>
						<h3 class="text-2xl font-bold text-white mb-4">Expert CTO Network</h3>
						<ul class="space-y-3 text-gray-300">
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>200+ vetted expert CTOs</span>
							</li>
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>10+ years average experience</span>
							</li>
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>Proven startup success</span>
							</li>
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>Industry-specific expertise</span>
							</li>
							<li class="flex items-start">
								<span class="text-green-400 mr-2">✓</span>
								<span>AI-powered matching algorithm</span>
							</li>
						</ul>
					</div>
				</div>

				<div class="bg-white/5 rounded-2xl p-8 border border-white/10">
					<h3 class="text-2xl font-bold text-white mb-6 text-center">Why We're Different</h3>
					<div class="grid md:grid-cols-3 gap-6">
						<div class="text-center">
							<div class="text-4xl mb-3">⚡</div>
							<h4 class="text-white font-bold mb-2">Instant Results</h4>
							<p class="text-gray-400 text-sm">
								AI analysis in 5 minutes vs weeks of consultant interviews
							</p>
						</div>
						<div class="text-center">
							<div class="text-4xl mb-3">💰</div>
							<h4 class="text-white font-bold mb-2">90% Cost Savings</h4>
							<p class="text-gray-400 text-sm">
								$99-$999/month vs $250K-$400K/year for full-time CTO
							</p>
						</div>
						<div class="text-center">
							<div class="text-4xl mb-3">🎯</div>
							<h4 class="text-white font-bold mb-2">Perfect Matching</h4>
							<p class="text-gray-400 text-sm">
								AI matches you with ideal CTO based on 20+ factors
							</p>
						</div>
					</div>
				</div>
			{:else if slides[currentSlide].type === 'business-model'}
				<!-- Business Model Slide -->
				<div class="text-center mb-8">
					<h1 class="text-5xl font-bold text-white mb-4">{slides[currentSlide].title}</h1>
					<p class="text-2xl text-purple-400">{slides[currentSlide].subtitle}</p>
				</div>

				<div class="grid md:grid-cols-2 gap-6 mb-8">
					<div class="bg-white/5 rounded-2xl p-6 border border-white/10">
						<h3 class="text-xl font-bold text-white mb-4">AI Starter - $99/month</h3>
						<div class="text-3xl font-bold text-purple-400 mb-4">$12M ARR</div>
						<p class="text-gray-400 text-sm mb-4">10,000 customers × $99/month</p>
						<ul class="space-y-2 text-gray-300 text-sm">
							<li>• AI Technical Analysis</li>
							<li>• Tech Stack Recommendations</li>
							<li>• Monthly Reports</li>
							<li>• Community Access</li>
						</ul>
					</div>

					<div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
						<div class="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
							POPULAR
						</div>
						<h3 class="text-xl font-bold text-white mb-4">CTO Connect - $299/month</h3>
						<div class="text-3xl font-bold text-purple-400 mb-4">$18M ARR</div>
						<p class="text-gray-400 text-sm mb-4">5,000 customers × $299/month</p>
						<ul class="space-y-2 text-gray-300 text-sm">
							<li>• Everything in Starter</li>
							<li>• 4 Hours Monthly CTO Sessions</li>
							<li>• Strategic Planning</li>
							<li>• Crisis Support</li>
						</ul>
					</div>

					<div class="bg-white/5 rounded-2xl p-6 border border-white/10">
						<h3 class="text-xl font-bold text-white mb-4">CTO Partnership - $999/month</h3>
						<div class="text-3xl font-bold text-purple-400 mb-4">$24M ARR</div>
						<p class="text-gray-400 text-sm mb-4">2,000 customers × $999/month</p>
						<ul class="space-y-2 text-gray-300 text-sm">
							<li>• Everything in Connect</li>
							<li>• 16 Hours Weekly Sessions</li>
							<li>• Hands-on Leadership</li>
							<li>• Board Preparation</li>
						</ul>
					</div>

					<div class="bg-white/5 rounded-2xl p-6 border border-white/10">
						<h3 class="text-xl font-bold text-white mb-4">Enterprise - $2,999/month</h3>
						<div class="text-3xl font-bold text-purple-400 mb-4">$18M ARR</div>
						<p class="text-gray-400 text-sm mb-4">500 customers × $2,999/month</p>
						<ul class="space-y-2 text-gray-300 text-sm">
							<li>• Everything in Partnership</li>
							<li>• Full-time Availability</li>
							<li>• On-site Visits</li>
							<li>• Custom Solutions</li>
						</ul>
					</div>
				</div>

				<div class="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30 text-center">
					<div class="text-2xl font-bold text-white mb-2">Total Revenue Potential</div>
					<div class="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
						$72M ARR
					</div>
					<div class="text-gray-300">At target customer acquisition</div>
				</div>
			{:else}
				<!-- Placeholder for other slides -->
				<div class="text-center py-20">
					<h1 class="text-5xl font-bold text-white mb-4">{slides[currentSlide].title}</h1>
					<p class="text-2xl text-purple-400 mb-8">{slides[currentSlide].subtitle}</p>
					<p class="text-gray-400">Content coming soon...</p>
				</div>
			{/if}
		</div>

		<!-- Slide Indicators -->
		<div class="flex justify-center gap-2 mt-8">
			{#each slides as slide, i}
				<button
					onclick={() => goToSlide(i)}
					class="w-3 h-3 rounded-full transition-all {i === currentSlide
						? 'bg-purple-500 w-8'
						: 'bg-white/20 hover:bg-white/40'}"
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</div>

