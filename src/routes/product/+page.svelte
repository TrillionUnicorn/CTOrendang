<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { mockCTOs } from '$lib/data/mockCTOs';
	import { formatCurrency, getInitials } from '$lib/utils';
	import type { CTOProfile } from '$lib/types';

	// State
	let projectDescription = $state('');
	let industry = $state('');
	let budget = $state('');
	let isAnalyzing = $state(false);
	let analysisResult = $state<any>(null);
	let matchedCTOs = $state<CTOProfile[]>([]);
	let selectedCTO = $state<CTOProfile | null>(null);
	let activeTab = $state<'analysis' | 'marketplace'>('analysis');

	// Industries
	const industries = [
		'Fintech',
		'HealthTech',
		'E-commerce',
		'SaaS',
		'AI/ML',
		'Blockchain',
		'EdTech',
		'PropTech',
		'Marketplace',
		'Social',
		'Gaming',
		'IoT'
	];

	// Budget ranges
	const budgetRanges = [
		'< $50K',
		'$50K - $100K',
		'$100K - $250K',
		'$250K - $500K',
		'$500K - $1M',
		'> $1M'
	];

	// Analyze project
	async function analyzeProject() {
		if (!projectDescription || !industry || !budget) return;

		isAnalyzing = true;
		analysisResult = null;
		matchedCTOs = [];

		// Simulate AI analysis
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Generate mock analysis
		analysisResult = {
			complexity: 'Medium-High',
			estimatedTime: '4-6 months',
			techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Redis', 'Docker'],
			budget: '$75,000 - $120,000',
			technicalHealthScore: 78,
			risks: [
				{
					severity: 'high',
					category: 'Scalability',
					description: 'Current architecture may not scale beyond 10K users',
					mitigation: 'Implement microservices and horizontal scaling'
				},
				{
					severity: 'medium',
					category: 'Security',
					description: 'Need to implement proper authentication and authorization',
					mitigation: 'Use OAuth 2.0 and JWT tokens with refresh mechanism'
				}
			],
			recommendations: [
				{
					priority: 'high',
					title: 'Start with MVP',
					description: 'Focus on core features first, iterate based on user feedback'
				},
				{
					priority: 'high',
					title: 'Implement CI/CD',
					description: 'Set up automated testing and deployment pipeline early'
				},
				{
					priority: 'medium',
					title: 'Choose scalable database',
					description: 'PostgreSQL with proper indexing and caching layer (Redis)'
				}
			]
		};

		// Match CTOs based on industry
		const industryMap: Record<string, string[]> = {
			Fintech: ['fintech', 'blockchain'],
			HealthTech: ['healthtech'],
			'E-commerce': ['ecommerce', 'marketplace'],
			SaaS: ['saas'],
			'AI/ML': ['ai-ml'],
			Blockchain: ['blockchain']
		};

		const relevantIndustries = industryMap[industry] || [];
		matchedCTOs = mockCTOs
			.filter((cto) => cto.industries.some((ind) => relevantIndustries.includes(ind)))
			.slice(0, 3);

		// If no matches, show top 3 CTOs
		if (matchedCTOs.length === 0) {
			matchedCTOs = mockCTOs.slice(0, 3);
		}

		isAnalyzing = false;
	}

	// Get severity color
	function getSeverityColor(severity: string): string {
		const colors: Record<string, string> = {
			low: 'text-green-400 bg-green-400/10',
			medium: 'text-yellow-400 bg-yellow-400/10',
			high: 'text-orange-400 bg-orange-400/10',
			critical: 'text-red-400 bg-red-400/10'
		};
		return colors[severity] || 'text-gray-400 bg-gray-400/10';
	}

	// Get priority color
	function getPriorityColor(priority: string): string {
		const colors: Record<string, string> = {
			low: 'bg-blue-500',
			medium: 'bg-yellow-500',
			high: 'bg-orange-500',
			critical: 'bg-red-500'
		};
		return colors[priority] || 'bg-gray-500';
	}
</script>

<svelte:head>
	<title>CTOrendang Product - AI Analysis & CTO Marketplace</title>
	<meta
		name="description"
		content="Get instant AI technical analysis and connect with expert CTOs. Try our AI-powered platform for free."
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
					<a href="/pitch" class="text-gray-300 hover:text-white transition-colors">Pitch Deck</a>
					<a href="/contact" class="text-gray-300 hover:text-white transition-colors">Contact</a>
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
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Tabs -->
		<div class="flex space-x-4 mb-8">
			<button
				onclick={() => (activeTab = 'analysis')}
				class="px-6 py-3 rounded-lg font-semibold transition-all {activeTab === 'analysis'
					? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
					: 'bg-white/5 text-gray-400 hover:bg-white/10'}"
			>
				🤖 AI Analysis
			</button>
			<button
				onclick={() => (activeTab = 'marketplace')}
				class="px-6 py-3 rounded-lg font-semibold transition-all {activeTab === 'marketplace'
					? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
					: 'bg-white/5 text-gray-400 hover:bg-white/10'}"
			>
				👨‍💼 CTO Marketplace
			</button>
		</div>

		{#if activeTab === 'analysis'}
			<!-- AI Analysis Tab -->
			<div class="grid lg:grid-cols-2 gap-8">
				<!-- Input Form -->
				<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
					<h2 class="text-3xl font-bold text-white mb-6">Get AI Technical Analysis</h2>
					<p class="text-gray-400 mb-6">
						Describe your project and get instant technical assessment, tech stack recommendations,
						and matched CTOs.
					</p>

					<form onsubmit={(e) => { e.preventDefault(); analyzeProject(); }} class="space-y-6">
						<div>
							<label for="project-description" class="block text-white font-semibold mb-2">Project Description *</label>
							<textarea
								id="project-description"
								bind:value={projectDescription}
								required
								rows="6"
								placeholder="Describe your project idea, goals, and technical requirements..."
								class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
							></textarea>
						</div>

						<div>
							<label for="industry-select" class="block text-white font-semibold mb-2">Industry *</label>
							<select
								id="industry-select"
								bind:value={industry}
								required
								class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
							>
								<option value="">Select industry...</option>
								{#each industries as ind}
									<option value={ind}>{ind}</option>
								{/each}
							</select>
						</div>

						<div>
							<label for="budget-select" class="block text-white font-semibold mb-2">Budget Range *</label>
							<select
								id="budget-select"
								bind:value={budget}
								required
								class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
							>
								<option value="">Select budget...</option>
								{#each budgetRanges as range}
									<option value={range}>{range}</option>
								{/each}
							</select>
						</div>

						<button
							type="submit"
							disabled={isAnalyzing || !projectDescription || !industry || !budget}
							class="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
						>
							{isAnalyzing ? 'Analyzing...' : 'Get Free Analysis'}
						</button>
					</form>
				</div>

				<!-- Analysis Results -->
				<div>
					{#if isAnalyzing}
						<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center min-h-[500px]">
							<div class="spinner mb-4"></div>
							<h3 class="text-2xl font-bold text-white mb-2">Analyzing Your Project...</h3>
							<p class="text-gray-400 text-center">
								Our AI is evaluating 50+ technical factors including architecture, scalability,
								security, and tech stack fit.
							</p>
						</div>
					{:else if analysisResult}
						<div class="space-y-6">
							<!-- Technical Health Score -->
							<div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
								<h3 class="text-2xl font-bold text-white mb-4">Technical Health Score</h3>
								<div class="flex items-center justify-center mb-4">
									<div class="relative w-32 h-32">
										<svg class="transform -rotate-90 w-32 h-32">
											<circle
												cx="64"
												cy="64"
												r="56"
												stroke="currentColor"
												stroke-width="8"
												fill="transparent"
												class="text-white/10"
											/>
											<circle
												cx="64"
												cy="64"
												r="56"
												stroke="currentColor"
												stroke-width="8"
												fill="transparent"
												stroke-dasharray="351.86"
												stroke-dashoffset={351.86 - (351.86 * analysisResult.technicalHealthScore) / 100}
												class="text-purple-400"
											/>
										</svg>
										<div class="absolute inset-0 flex items-center justify-center">
											<span class="text-4xl font-bold text-white">{analysisResult.technicalHealthScore}</span>
										</div>
									</div>
								</div>
								<p class="text-center text-gray-300">
									{analysisResult.technicalHealthScore >= 80
										? 'Excellent technical foundation'
										: analysisResult.technicalHealthScore >= 60
											? 'Good foundation with room for improvement'
											: 'Needs significant technical improvements'}
								</p>
							</div>

							<!-- Quick Stats -->
							<div class="grid grid-cols-2 gap-4">
								<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
									<div class="text-gray-400 text-sm mb-1">Complexity</div>
									<div class="text-white font-bold text-xl">{analysisResult.complexity}</div>
								</div>
								<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
									<div class="text-gray-400 text-sm mb-1">Timeline</div>
									<div class="text-white font-bold text-xl">{analysisResult.estimatedTime}</div>
								</div>
								<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 col-span-2">
									<div class="text-gray-400 text-sm mb-1">Estimated Budget</div>
									<div class="text-white font-bold text-xl">{analysisResult.budget}</div>
								</div>
							</div>

							<!-- Recommended Tech Stack -->
							<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
								<h4 class="text-white font-bold text-lg mb-4">Recommended Tech Stack</h4>
								<div class="flex flex-wrap gap-2">
									{#each analysisResult.techStack as tech}
										<span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
											{tech}
										</span>
									{/each}
								</div>
							</div>

							<!-- Risks -->
							<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
								<h4 class="text-white font-bold text-lg mb-4">Key Risks</h4>
								<div class="space-y-3">
									{#each analysisResult.risks as risk}
										<div class="border-l-4 border-{risk.severity === 'high' ? 'orange' : 'yellow'}-500 pl-4">
											<div class="flex items-center gap-2 mb-1">
												<span class="px-2 py-0.5 rounded text-xs font-semibold {getSeverityColor(risk.severity)}">
													{risk.severity.toUpperCase()}
												</span>
												<span class="text-white font-semibold">{risk.category}</span>
											</div>
											<p class="text-gray-400 text-sm mb-1">{risk.description}</p>
											<p class="text-green-400 text-sm">💡 {risk.mitigation}</p>
										</div>
									{/each}
								</div>
							</div>

							<!-- Recommendations -->
							<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
								<h4 class="text-white font-bold text-lg mb-4">Recommendations</h4>
								<div class="space-y-3">
									{#each analysisResult.recommendations as rec}
										<div class="flex items-start gap-3">
											<div class="w-2 h-2 rounded-full {getPriorityColor(rec.priority)} mt-2"></div>
											<div class="flex-1">
												<div class="text-white font-semibold mb-1">{rec.title}</div>
												<p class="text-gray-400 text-sm">{rec.description}</p>
											</div>
										</div>
									{/each}
								</div>
							</div>

							<!-- Matched CTOs -->
							{#if matchedCTOs.length > 0}
								<div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
									<h4 class="text-white font-bold text-2xl mb-4">Matched CTOs for Your Project</h4>
									<p class="text-gray-300 mb-6">
										Based on your industry and requirements, we recommend these expert CTOs:
									</p>
									<div class="space-y-4">
										{#each matchedCTOs as cto}
											<button
												type="button"
												class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer text-left w-full"
												onclick={() => (selectedCTO = cto)}
												onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectedCTO = cto; } }}
												aria-label={`View details for ${cto.name}`}
											>
												<div class="flex items-start gap-4">
													<div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
														{getInitials(cto.name)}
													</div>
													<div class="flex-1">
														<div class="flex items-center justify-between mb-2">
															<h5 class="text-white font-bold text-lg">{cto.name}</h5>
															<div class="flex items-center gap-1">
																<span class="text-yellow-400">⭐</span>
																<span class="text-white font-semibold">{cto.rating}</span>
																<span class="text-gray-400 text-sm">({cto.reviewCount})</span>
															</div>
														</div>
														<p class="text-gray-400 text-sm mb-3">{cto.title}</p>
														<div class="flex flex-wrap gap-2 mb-3">
															{#each cto.industries.slice(0, 3) as ind}
																<span class="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
																	{ind}
																</span>
															{/each}
														</div>
														<div class="flex items-center justify-between">
															<span class="text-gray-400 text-sm">
																{cto.yearsExperience} years • {cto.companiesLed} companies
															</span>
															<span class="text-white font-bold">${cto.hourlyRate}/hr</span>
														</div>
													</div>
												</div>
											</button>
										{/each}
									</div>
									<button
										onclick={() => (activeTab = 'marketplace')}
										class="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
									>
										View All CTOs
									</button>
								</div>
							{/if}
						</div>
					{:else}
						<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center min-h-[500px]">
							<div class="text-6xl mb-4">🤖</div>
							<h3 class="text-2xl font-bold text-white mb-2">Ready to Analyze</h3>
							<p class="text-gray-400 text-center max-w-md">
								Fill in your project details on the left to get instant AI technical analysis and CTO
								recommendations.
							</p>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<!-- CTO Marketplace Tab -->
			<div>
				<div class="mb-8">
					<h2 class="text-4xl font-bold text-white mb-4">CTO Marketplace</h2>
					<p class="text-xl text-gray-400">
						Browse and connect with 200+ expert CTOs. All vetted for technical excellence and
						startup success.
					</p>
				</div>

				<!-- Filters -->
				<div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
					<div class="grid md:grid-cols-3 gap-4">
						<div>
							<label for="filter-industry" class="block text-white font-semibold mb-2 text-sm">Industry</label>
							<select id="filter-industry" class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
								<option value="">All Industries</option>
								{#each industries as ind}
									<option value={ind}>{ind}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="filter-expertise" class="block text-white font-semibold mb-2 text-sm">Expertise</label>
							<select id="filter-expertise" class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
								<option value="">All Expertise</option>
								<option value="architecture">Architecture</option>
								<option value="scalability">Scalability</option>
								<option value="security">Security</option>
								<option value="ai-ml">AI/ML</option>
								<option value="blockchain">Blockchain</option>
							</select>
						</div>
						<div>
							<label for="filter-availability" class="block text-white font-semibold mb-2 text-sm">Availability</label>
							<select id="filter-availability" class="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
								<option value="">All</option>
								<option value="available">Available</option>
								<option value="limited">Limited</option>
							</select>
						</div>
					</div>
				</div>

				<!-- CTO Grid -->
				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each mockCTOs as cto}
						<button
							type="button"
							class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all hover-lift cursor-pointer text-left w-full"
							onclick={() => (selectedCTO = cto)}
							onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectedCTO = cto; } }}
							aria-label={`View details for ${cto.name}`}
						>
							<!-- Avatar -->
							<div class="flex items-center gap-4 mb-4">
								<div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
									{getInitials(cto.name)}
								</div>
								<div class="flex-1">
									<h3 class="text-white font-bold text-lg">{cto.name}</h3>
									<div class="flex items-center gap-1">
										<span class="text-yellow-400">⭐</span>
										<span class="text-white font-semibold text-sm">{cto.rating}</span>
										<span class="text-gray-400 text-xs">({cto.reviewCount})</span>
									</div>
								</div>
							</div>

							<!-- Title -->
							<p class="text-gray-400 text-sm mb-4">{cto.title}</p>

							<!-- Stats -->
							<div class="grid grid-cols-2 gap-3 mb-4">
								<div class="bg-white/5 rounded-lg p-3">
									<div class="text-gray-400 text-xs mb-1">Experience</div>
									<div class="text-white font-bold">{cto.yearsExperience} years</div>
								</div>
								<div class="bg-white/5 rounded-lg p-3">
									<div class="text-gray-400 text-xs mb-1">Companies</div>
									<div class="text-white font-bold">{cto.companiesLed} led</div>
								</div>
							</div>

							<!-- Industries -->
							<div class="mb-4">
								<div class="text-gray-400 text-xs mb-2">Industries</div>
								<div class="flex flex-wrap gap-1">
									{#each cto.industries.slice(0, 3) as ind}
										<span class="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
											{ind}
										</span>
									{/each}
								</div>
							</div>

							<!-- Tech Stack -->
							<div class="mb-4">
								<div class="text-gray-400 text-xs mb-2">Tech Stack</div>
								<div class="flex flex-wrap gap-1">
									{#each cto.techStack.slice(0, 4) as tech}
										<span class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
											{tech}
										</span>
									{/each}
									{#if cto.techStack.length > 4}
										<span class="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs">
											+{cto.techStack.length - 4}
										</span>
									{/if}
								</div>
							</div>

							<!-- Footer -->
							<div class="flex items-center justify-between pt-4 border-t border-white/10">
								<div>
									<div class="text-gray-400 text-xs">Hourly Rate</div>
									<div class="text-white font-bold text-lg">${cto.hourlyRate}/hr</div>
								</div>
								<span class="px-3 py-1 rounded-full text-xs font-semibold {cto.availability === 'available'
										? 'bg-green-500/20 text-green-300'
										: cto.availability === 'limited'
											? 'bg-yellow-500/20 text-yellow-300'
											: 'bg-red-500/20 text-red-300'}">
									{cto.availability}
								</span>
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- CTO Detail Modal -->
	{#if selectedCTO}
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
			onclick={() => (selectedCTO = null)}
			onkeydown={(e) => { if (e.key === 'Escape') selectedCTO = null; }}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabindex="0"
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div
				class="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
				onclick={(e) => e.stopPropagation()}
				role="document"
			>
				<div class="p-8">
					<!-- Header -->
					<div class="flex items-start justify-between mb-6">
						<div class="flex items-center gap-4">
							<div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-2xl">
								{getInitials(selectedCTO.name)}
							</div>
							<div>
								<h2 id="modal-title" class="text-3xl font-bold text-white mb-1">{selectedCTO.name}</h2>
								<p class="text-gray-400">{selectedCTO.title}</p>
								<div class="flex items-center gap-2 mt-2">
									<div class="flex items-center gap-1">
										<span class="text-yellow-400">⭐</span>
										<span class="text-white font-semibold">{selectedCTO.rating}</span>
										<span class="text-gray-400 text-sm">({selectedCTO.reviewCount} reviews)</span>
									</div>
								</div>
							</div>
						</div>
						<button
							type="button"
							onclick={() => (selectedCTO = null)}
							class="text-gray-400 hover:text-white transition-colors"
							aria-label="Close modal"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<!-- Bio -->
					<div class="mb-6">
						<h3 class="text-white font-bold text-lg mb-2">About</h3>
						<p class="text-gray-400">{selectedCTO.bio}</p>
					</div>

					<!-- Stats Grid -->
					<div class="grid grid-cols-4 gap-4 mb-6">
						<div class="bg-white/5 rounded-lg p-4 text-center">
							<div class="text-2xl font-bold text-white mb-1">{selectedCTO.yearsExperience}</div>
							<div class="text-gray-400 text-sm">Years Exp.</div>
						</div>
						<div class="bg-white/5 rounded-lg p-4 text-center">
							<div class="text-2xl font-bold text-white mb-1">{selectedCTO.companiesLed}</div>
							<div class="text-gray-400 text-sm">Companies</div>
						</div>
						<div class="bg-white/5 rounded-lg p-4 text-center">
							<div class="text-2xl font-bold text-white mb-1">${selectedCTO.hourlyRate}</div>
							<div class="text-gray-400 text-sm">Per Hour</div>
						</div>
						<div class="bg-white/5 rounded-lg p-4 text-center">
							<div class="text-2xl font-bold text-white mb-1">{selectedCTO.timezone}</div>
							<div class="text-gray-400 text-sm">Timezone</div>
						</div>
					</div>

					<!-- Industries & Expertise -->
					<div class="grid md:grid-cols-2 gap-6 mb-6">
						<div>
							<h3 class="text-white font-bold text-lg mb-3">Industries</h3>
							<div class="flex flex-wrap gap-2">
								{#each selectedCTO.industries as ind}
									<span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
										{ind}
									</span>
								{/each}
							</div>
						</div>
						<div>
							<h3 class="text-white font-bold text-lg mb-3">Expertise</h3>
							<div class="flex flex-wrap gap-2">
								{#each selectedCTO.expertise as exp}
									<span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
										{exp}
									</span>
								{/each}
							</div>
						</div>
					</div>

					<!-- Tech Stack -->
					<div class="mb-6">
						<h3 class="text-white font-bold text-lg mb-3">Tech Stack</h3>
						<div class="flex flex-wrap gap-2">
							{#each selectedCTO.techStack as tech}
								<span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
									{tech}
								</span>
							{/each}
						</div>
					</div>

					<!-- Success Stories -->
					{#if selectedCTO.successStories.length > 0}
						<div class="mb-6">
							<h3 class="text-white font-bold text-lg mb-3">Success Stories</h3>
							{#each selectedCTO.successStories as story}
								<div class="bg-white/5 rounded-xl p-6 border border-white/10 mb-4">
									<h4 class="text-white font-bold mb-2">{story.companyName}</h4>
									<div class="space-y-2 text-sm">
										<div>
											<span class="text-gray-400">Challenge:</span>
											<span class="text-gray-300">{story.challenge}</span>
										</div>
										<div>
											<span class="text-gray-400">Solution:</span>
											<span class="text-gray-300">{story.solution}</span>
										</div>
										<div>
											<span class="text-gray-400">Result:</span>
											<span class="text-green-400">{story.result}</span>
										</div>
										{#if story.testimonial}
											<div class="mt-3 pt-3 border-t border-white/10 italic text-gray-400">
												"{story.testimonial}"
											</div>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					{/if}

					<!-- CTA -->
					<div class="flex gap-4">
						<button class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all">
							Schedule Consultation
						</button>
						<button class="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
							Send Message
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>


