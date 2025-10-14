import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
	return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format date
 */
export function formatDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(d);
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number): string {
	if (text.length <= length) return text;
	return text.slice(0, length) + '...';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			timeout = null;
			func(...args);
		};

		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;

	return function executedFunction(...args: Parameters<T>) {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

/**
 * Generate random ID
 */
export function generateId(): string {
	return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Calculate match score percentage
 */
export function calculateMatchPercentage(score: number): number {
	return Math.round(score * 100);
}

/**
 * Get color for score
 */
export function getScoreColor(score: number): string {
	if (score >= 0.8) return 'text-green-500';
	if (score >= 0.6) return 'text-yellow-500';
	if (score >= 0.4) return 'text-orange-500';
	return 'text-red-500';
}

/**
 * Get badge color for tier
 */
export function getTierColor(tier: string): string {
	const colors: Record<string, string> = {
		starter: 'bg-blue-500',
		connect: 'bg-purple-500',
		partnership: 'bg-pink-500',
		enterprise: 'bg-indigo-500'
	};
	return colors[tier] || 'bg-gray-500';
}

/**
 * Format tech stack as comma-separated string
 */
export function formatTechStack(technologies: string[]): string {
	if (technologies.length === 0) return 'Not specified';
	if (technologies.length <= 3) return technologies.join(', ');
	return `${technologies.slice(0, 3).join(', ')} +${technologies.length - 3} more`;
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(text: string): number {
	const wordsPerMinute = 200;
	const words = text.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}

/**
 * Scroll to element
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
	const element = document.getElementById(elementId);
	if (element) {
		const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	}
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		console.error('Failed to copy:', err);
		return false;
	}
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
	return `${Math.round(value * 100)}%`;
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

	if (diffInSeconds < 60) return 'just now';
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
	if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
	if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
	if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
	return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, t: number): number {
	return start + (end - start) * t;
}

/**
 * Map value from one range to another
 */
export function mapRange(
	value: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number
): number {
	return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

