// File Storage Service - Cloudflare R2
// Production-ready file upload and management

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { nanoid } from 'nanoid';

// Initialize R2 client (S3-compatible)
const r2Client = new S3Client({
	region: 'auto',
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
	}
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'ctorendang-uploads';
const PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://uploads.ctorendang.com';

/**
 * Upload file to R2
 */
export async function uploadFile(
	file: File,
	options?: {
		folder?: string;
		userId?: string;
		makePublic?: boolean;
	}
): Promise<{ url: string; key: string }> {
	try {
		// Generate unique filename
		const extension = file.name.split('.').pop();
		const filename = `${nanoid()}.${extension}`;

		// Build key with folder structure
		const folder = options?.folder || 'uploads';
		const userFolder = options?.userId ? `${options.userId}/` : '';
		const key = `${folder}/${userFolder}${filename}`;

		// Convert File to Buffer
		const buffer = Buffer.from(await file.arrayBuffer());

		// Upload to R2
		await r2Client.send(
			new PutObjectCommand({
				Bucket: BUCKET_NAME,
				Key: key,
				Body: buffer,
				ContentType: file.type,
				Metadata: {
					originalName: file.name,
					uploadedAt: new Date().toISOString()
				}
			})
		);

		// Return public URL
		const url = `${PUBLIC_URL}/${key}`;

		return { url, key };
	} catch (error) {
		console.error('File upload error:', error);
		throw new Error('Failed to upload file');
	}
}

/**
 * Delete file from R2
 */
export async function deleteFile(key: string): Promise<void> {
	try {
		await r2Client.send(
			new DeleteObjectCommand({
				Bucket: BUCKET_NAME,
				Key: key
			})
		);
	} catch (error) {
		console.error('File delete error:', error);
		throw new Error('Failed to delete file');
	}
}

/**
 * Generate presigned URL for temporary access
 */
export async function getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
	try {
		const command = new GetObjectCommand({
			Bucket: BUCKET_NAME,
			Key: key
		});

		const url = await getSignedUrl(r2Client, command, { expiresIn });
		return url;
	} catch (error) {
		console.error('Presigned URL error:', error);
		throw new Error('Failed to generate presigned URL');
	}
}

/**
 * Validate file type
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
	return allowedTypes.some((type) => {
		if (type.endsWith('/*')) {
			const category = type.split('/')[0];
			return file.type.startsWith(category + '/');
		}
		return file.type === type;
	});
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, maxSizeMB: number): boolean {
	const maxSizeBytes = maxSizeMB * 1024 * 1024;
	return file.size <= maxSizeBytes;
}

/**
 * Upload avatar image
 */
export async function uploadAvatar(file: File, userId: string): Promise<string> {
	// Validate file type
	const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
	if (!validateFileType(file, allowedTypes)) {
		throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
	}

	// Validate file size (5MB max)
	if (!validateFileSize(file, 5)) {
		throw new Error('File size must be less than 5MB');
	}

	const { url } = await uploadFile(file, {
		folder: 'avatars',
		userId,
		makePublic: true
	});

	return url;
}

/**
 * Upload document (resume, portfolio, etc.)
 */
export async function uploadDocument(file: File, userId: string): Promise<{ url: string; key: string }> {
	// Validate file type
	const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
	if (!validateFileType(file, allowedTypes)) {
		throw new Error('Invalid file type. Only PDF and Word documents are allowed.');
	}

	// Validate file size (10MB max)
	if (!validateFileSize(file, 10)) {
		throw new Error('File size must be less than 10MB');
	}

	return uploadFile(file, {
		folder: 'documents',
		userId,
		makePublic: false
	});
}

/**
 * Upload message attachment
 */
export async function uploadMessageAttachment(file: File, userId: string): Promise<{ url: string; key: string }> {
	// Validate file type (images and documents)
	const allowedTypes = [
		'image/*',
		'application/pdf',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'text/plain'
	];
	if (!validateFileType(file, allowedTypes)) {
		throw new Error('Invalid file type');
	}

	// Validate file size (20MB max)
	if (!validateFileSize(file, 20)) {
		throw new Error('File size must be less than 20MB');
	}

	return uploadFile(file, {
		folder: 'messages',
		userId,
		makePublic: false
	});
}

