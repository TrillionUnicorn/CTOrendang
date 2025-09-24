<script lang="ts">
	let projectIdea = $state('');
	let aiAnalysis = $state<any>(null);
	let loading = $state(false);

	const ctoProfiles = [
		{ name: 'Sarah Chen', expertise: 'AI/ML', rating: 4.9, projects: 23, hourlyRate: 150 },
		{ name: 'Marcus Rodriguez', expertise: 'Blockchain', rating: 4.8, projects: 31, hourlyRate: 180 },
		{ name: 'Emily Johnson', expertise: 'Full-Stack', rating: 4.7, projects: 45, hourlyRate: 120 }
	];

	async function analyzeProject() {
		if (!projectIdea.trim()) return;

		loading = true;
		// Simulate AI analysis
		await new Promise(resolve => setTimeout(resolve, 2000));

		aiAnalysis = {
			complexity: 'Medium',
			estimatedTime: '3-4 months',
			techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
			budget: '$25,000 - $40,000',
			risks: ['Scalability challenges', 'Third-party integrations'],
			recommendations: ['Start with MVP', 'Use microservices architecture']
		};

		loading = false;
	}
</script>

<svelte:head>
	<title>CTOrendang - AI + Human CTO Platform</title>
</svelte:head>

<div class="cto-platform">
	<header class="hero">
		<h1>🚀 CTOrendang</h1>
		<p>AI + Human CTO Development Platform</p>
	</header>

	<div class="platform-grid">
		<div class="project-input">
			<h2>Describe Your Project</h2>
			<textarea
				bind:value={projectIdea}
				placeholder="Describe your project idea, goals, and requirements..."
				class="project-textarea"
				rows="6"
			></textarea>
			<button onclick={analyzeProject} disabled={loading || !projectIdea.trim()} class="analyze-btn">
				{loading ? 'Analyzing...' : 'Get AI Analysis'}
			</button>
		</div>

		{#if aiAnalysis}
			<div class="ai-analysis">
				<h2>🤖 AI Analysis</h2>
				<div class="analysis-grid">
					<div class="analysis-item">
						<strong>Complexity:</strong> {aiAnalysis.complexity}
					</div>
					<div class="analysis-item">
						<strong>Timeline:</strong> {aiAnalysis.estimatedTime}
					</div>
					<div class="analysis-item">
						<strong>Budget:</strong> {aiAnalysis.budget}
					</div>
					<div class="analysis-item">
						<strong>Tech Stack:</strong> {aiAnalysis.techStack.join(', ')}
					</div>
				</div>
			</div>
		{/if}

		<div class="cto-marketplace">
			<h2>👨‍💼 Available CTOs</h2>
			<div class="cto-list">
				{#each ctoProfiles as cto}
					<div class="cto-card">
						<div class="cto-header">
							<div class="cto-name">{cto.name}</div>
							<div class="cto-rating">⭐ {cto.rating}</div>
						</div>
						<div class="cto-expertise">{cto.expertise}</div>
						<div class="cto-stats">
							<span>{cto.projects} projects</span>
							<span>${cto.hourlyRate}/hr</span>
						</div>
						<button class="hire-btn">Contact CTO</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		min-height: 100vh;
	}

	.cto-platform {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 3rem;
	}

	.hero h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.platform-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.project-input,
	.ai-analysis,
	.cto-marketplace {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 1.5rem;
	}

	.project-input h2,
	.ai-analysis h2,
	.cto-marketplace h2 {
		margin-bottom: 1rem;
		font-size: 1.25rem;
	}

	.project-textarea {
		width: 100%;
		padding: 1rem;
		border: none;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255, 0.9);
		color: #333;
		font-size: 1rem;
		margin-bottom: 1rem;
		resize: vertical;
	}

	.analyze-btn {
		background: #10b981;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		cursor: pointer;
		font-weight: 600;
		transition: background-color 0.2s;
	}

	.analyze-btn:hover:not(:disabled) {
		background: #059669;
	}

	.analyze-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.analysis-grid {
		display: grid;
		gap: 0.75rem;
	}

	.analysis-item {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.75rem;
		border-radius: 0.5rem;
	}

	.cto-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.cto-card {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		padding: 1rem;
	}

	.cto-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.cto-name {
		font-weight: 600;
		font-size: 1.1rem;
	}

	.cto-rating {
		font-size: 0.9rem;
	}

	.cto-expertise {
		color: #60a5fa;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.cto-stats {
		display: flex;
		justify-content: space-between;
		font-size: 0.9rem;
		opacity: 0.8;
		margin-bottom: 1rem;
	}

	.hire-btn {
		background: #3b82f6;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		cursor: pointer;
		font-weight: 500;
		width: 100%;
	}

	.hire-btn:hover {
		background: #2563eb;
	}

	@media (max-width: 768px) {
		.platform-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
