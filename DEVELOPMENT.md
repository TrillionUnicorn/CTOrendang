# 🛠️ CTOrendang Development Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **pnpm** 8+
- **Git** for version control
- **VS Code** (recommended) with Svelte extension

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/TrillionUnicorn/CTOrendang.git
cd CTOrendang

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:5177
```

---

## 🏗️ Project Architecture

### Tech Stack
- **Frontend**: SvelteKit 2 + Svelte 5 (Runes)
- **Styling**: Tailwind CSS + shadcn-svelte
- **TypeScript**: Full type safety
- **Build Tool**: Vite 6
- **Testing**: Vitest + Playwright
- **AI Integration**: OpenAI API + Custom ML models
- **Matching Algorithm**: Custom recommendation engine

### Folder Structure
```
CTOrendang/
├── src/
│   ├── lib/
│   │   ├── components/          # Reusable UI components
│   │   ├── stores/             # Svelte stores (state management)
│   │   ├── utils/              # Utility functions
│   │   ├── ai/                 # AI analysis modules
│   │   ├── matching/           # CTO matching algorithms
│   │   └── types/              # TypeScript type definitions
│   ├── routes/                 # SvelteKit routes
│   ├── app.html               # HTML template
│   └── app.css                # Global styles
├── static/                    # Static assets
├── tests/                     # Test files
└── docs/                      # Documentation
```

---

## 🤖 AI Analysis System Implementation

### Technical Analysis Engine
```typescript
// Example AI analysis implementation
interface TechnicalAnalysisRequest {
  businessModel: BusinessModel;
  teamStructure: TeamInfo;
  currentTech: TechStack;
  requirements: Requirements;
  budget: BudgetConstraints;
}

class TechnicalAnalysisEngine {
  private aiModel: OpenAIClient;
  private mlModel: CustomMLModel;

  async analyzeTechnicalNeeds(request: TechnicalAnalysisRequest): Promise<TechnicalAnalysis> {
    // Implementation details in /src/lib/ai/analysis.ts
    const analysis = await this.aiModel.analyze({
      prompt: this.buildAnalysisPrompt(request),
      model: 'gpt-4',
      temperature: 0.3
    });

    return this.processAnalysisResults(analysis);
  }

  private buildAnalysisPrompt(request: TechnicalAnalysisRequest): string {
    // Build comprehensive prompt for AI analysis
    return `Analyze the following startup for technical leadership needs...`;
  }
}
```

### CTO Matching Algorithm
```typescript
// CTO matching system
interface CTOProfile {
  id: string;
  experience: ExperienceLevel;
  industries: Industry[];
  techStack: Technology[];
  availability: AvailabilitySchedule;
  rates: PricingTier;
  successMetrics: PerformanceMetrics;
}

class CTOMatchingEngine {
  async findOptimalMatches(
    requirements: TechnicalRequirements,
    budget: BudgetRange,
    timeline: ProjectTimeline
  ): Promise<CTOMatch[]> {
    // Advanced matching algorithm considering:
    // - Technical expertise alignment
    // - Industry experience
    // - Budget compatibility
    // - Availability overlap
    // - Success history
    // - Cultural fit indicators

    return this.rankAndFilterMatches(candidates, requirements);
  }

  private calculateMatchScore(cto: CTOProfile, requirements: TechnicalRequirements): number {
    // Proprietary scoring algorithm
    const techScore = this.calculateTechAlignment(cto.techStack, requirements.technologies);
    const experienceScore = this.calculateExperienceMatch(cto.experience, requirements.complexity);
    const industryScore = this.calculateIndustryFit(cto.industries, requirements.industry);

    return (techScore * 0.4) + (experienceScore * 0.3) + (industryScore * 0.3);
  }
}
```

---

## 🎨 UI/UX Development

### Design System (CTOrendang Theme)
```css
:root {
  --primary: 79 70 229;        /* Indigo 600 - Professional & Tech */
  --secondary: 99 102 241;     /* Indigo 500 - Trust */
  --accent: 67 56 202;         /* Indigo 700 - Actions */
  --success: 34 197 94;        /* Emerald 500 - Success */
  --warning: 251 191 36;       /* Amber 500 - Caution */
}
```

### Component Guidelines
```svelte
<!-- Example: CTO Profile Card Component -->
<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import type { CTOProfile } from '$lib/types/cto';

  interface Props {
    cto: CTOProfile;
    matchScore?: number;
    onConnect?: (ctoId: string) => void;
  }

  let { cto, matchScore, onConnect }: Props = $props();
</script>

<Card class="cto-profile-card">
  <CardHeader>
    <div class="flex items-center justify-between">
      <CardTitle>{cto.name}</CardTitle>
      {#if matchScore}
        <Badge variant="secondary">{Math.round(matchScore)}% Match</Badge>
      {/if}
    </div>
    <p class="text-sm text-muted-foreground">{cto.title}</p>
  </CardHeader>
  <CardContent>
    <div class="space-y-4">
      <div>
        <h4 class="font-semibold">Experience</h4>
        <p class="text-sm">{cto.yearsExperience} years • {cto.companiesLed} companies led</p>
      </div>

      <div>
        <h4 class="font-semibold">Expertise</h4>
        <div class="flex flex-wrap gap-1 mt-1">
          {#each cto.techStack.slice(0, 5) as tech}
            <Badge variant="outline" class="text-xs">{tech}</Badge>
          {/each}
        </div>
      </div>

      <div>
        <h4 class="font-semibold">Industries</h4>
        <p class="text-sm">{cto.industries.join(', ')}</p>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <span class="text-sm font-medium">${cto.hourlyRate}/hour</span>
          <span class="text-xs text-muted-foreground">• {cto.availability}</span>
        </div>
        {#if onConnect}
          <button
            class="btn btn-primary btn-sm"
            on:click={() => onConnect?.(cto.id)}
          >
            Connect
          </button>
        {/if}
      </div>
    </div>
  </CardContent>
</Card>
```

---

## 🧪 Testing Strategy

### AI Analysis Testing
```bash
# Test AI analysis accuracy
npm run test:ai-analysis

# Test matching algorithm
npm run test:matching

# Performance testing
npm run test:performance
```

### CTO Matching Testing
```typescript
// Example matching algorithm testing
describe('CTO Matching Engine', () => {
  test('should match CTOs based on technical requirements', async () => {
    const requirements = createTestRequirements({
      technologies: ['React', 'Node.js', 'AWS'],
      industry: 'fintech',
      stage: 'series-a'
    });

    const matches = await matchingEngine.findOptimalMatches(requirements);

    expect(matches).toHaveLength(5);
    expect(matches[0].score).toBeGreaterThan(0.8);
    expect(matches[0].cto.industries).toContain('fintech');
  });

  test('should prioritize budget-compatible CTOs', async () => {
    const requirements = createTestRequirements({
      budget: { min: 100, max: 200, currency: 'USD' }
    });

    const matches = await matchingEngine.findOptimalMatches(requirements);

    matches.forEach(match => {
      expect(match.cto.hourlyRate).toBeLessThanOrEqual(200);
      expect(match.cto.hourlyRate).toBeGreaterThanOrEqual(100);
    });
  });
});
```

---

## 🔄 Development Workflow

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/ai-analysis-improvement

# Make changes and commit
git add .
git commit -m "feat: improve AI technical analysis accuracy"

# Push and create PR
git push origin feature/ai-analysis-improvement
```

### Commit Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process or auxiliary tool changes

### Code Review Checklist
- [ ] **AI Accuracy**: Verify AI analysis provides valuable insights
- [ ] **Matching Quality**: Ensure CTO matches are relevant and accurate
- [ ] **Performance**: Optimize for fast matching and analysis
- [ ] **Testing**: Unit tests for matching algorithms
- [ ] **Documentation**: Updated docs and comments
- [ ] **Type Safety**: Full TypeScript coverage
