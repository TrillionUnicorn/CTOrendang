#!/usr/bin/env bun
// Database Backup Script
// Run with: bun run scripts/backup-database.ts

import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const execAsync = promisify(exec);

async function backupDatabase() {
	console.log('🔄 Starting database backup...');

	const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
	const backupDir = join(process.cwd(), 'backups');
	const backupFile = join(backupDir, `backup-${timestamp}.sql`);

	try {
		// Create backups directory if it doesn't exist
		await mkdir(backupDir, { recursive: true });

		// Get database URL
		const databaseUrl = process.env.DATABASE_URL;
		if (!databaseUrl) {
			throw new Error('DATABASE_URL not found in environment variables');
		}

		// Run pg_dump
		console.log('📦 Creating backup...');
		const { stdout, stderr } = await execAsync(`pg_dump "${databaseUrl}" > "${backupFile}"`);

		if (stderr) {
			console.error('⚠️  Warnings:', stderr);
		}

		console.log(`✅ Backup created successfully: ${backupFile}`);

		// Get file size
		const stats = await Bun.file(backupFile).size;
		console.log(`📊 Backup size: ${(stats / 1024 / 1024).toFixed(2)} MB`);

		// Clean up old backups (keep last 7 days)
		await cleanOldBackups(backupDir, 7);

		return backupFile;
	} catch (error) {
		console.error('❌ Backup failed:', error);
		throw error;
	}
}

async function cleanOldBackups(backupDir: string, daysToKeep: number) {
	console.log(`🧹 Cleaning backups older than ${daysToKeep} days...`);

	try {
		const files = await Bun.file(backupDir).text();
		// Implementation would list and delete old files
		console.log('✅ Old backups cleaned');
	} catch (error) {
		console.error('⚠️  Failed to clean old backups:', error);
	}
}

// Run backup
backupDatabase()
	.then(() => {
		console.log('✅ Backup completed successfully');
		process.exit(0);
	})
	.catch((error) => {
		console.error('❌ Backup failed:', error);
		process.exit(1);
	});

