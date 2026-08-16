import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function extractPublicIdFromUrl(url: string): string | null {
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;
    const pathAfterUpload = parts[1];
    // Strip version prefix (e.g. v1784617124/)
    const withoutVersion = pathAfterUpload.replace(/^v\d+\//, '');
    // Strip extension (e.g. .png)
    const publicId = withoutVersion.substring(0, withoutVersion.lastIndexOf('.')) || withoutVersion;
    return publicId;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const data = await request.formData();
    
    // Check for multiple files or single file
    const allFiles = data.getAll('files') as File[];
    const singleFile = data.get('file') as File | null;

    const filesToProcess: File[] = [];
    if (allFiles && allFiles.length > 0) {
      filesToProcess.push(...allFiles.filter((f) => f && typeof f.size === 'number' && f.size > 0));
    } else if (singleFile && singleFile.size > 0) {
      filesToProcess.push(singleFile);
    }

    if (filesToProcess.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided for upload.' }, { status: 400 });
    }

    // Validate files
    for (const file of filesToProcess) {
      if (file.type && !ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
        return NextResponse.json({
          success: false,
          error: `Unsupported file type: ${file.type || file.name}. Allowed formats: JPG, JPEG, PNG, WEBP, AVIF.`,
        }, { status: 400 });
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({
          success: false,
          error: `File ${file.name} exceeds maximum size limit of 10MB.`,
        }, { status: 400 });
      }
    }

    const folder = (data.get('folder') as string) || 'admin_uploads';
    const uploadResults: { url: string; public_id: string }[] = [];

    for (const file of filesToProcess) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || 'image/jpeg';
      const base64Image = `data:${mimeType};base64,${buffer.toString('base64')}`;

      const res = await cloudinary.uploader.upload(base64Image, {
        folder: folder,
        resource_type: 'image',
      });

      uploadResults.push({
        url: res.secure_url,
        public_id: res.public_id,
      });
    }

    if (uploadResults.length === 1) {
      return NextResponse.json({
        success: true,
        url: uploadResults[0].url,
        public_id: uploadResults[0].public_id,
        urls: [uploadResults[0].url],
      });
    }

    return NextResponse.json({
      success: true,
      url: uploadResults[0].url,
      urls: uploadResults.map((r) => r.url),
      results: uploadResults,
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to upload image to cloud storage.',
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const { url, public_id } = await request.json();
    let targetPublicId = public_id;

    if (!targetPublicId && url) {
      targetPublicId = extractPublicIdFromUrl(url);
    }

    if (!targetPublicId) {
      return NextResponse.json({ success: false, error: 'public_id or url is required for deletion.' }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(targetPublicId);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Cloudinary delete error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to delete image from cloud storage.',
    }, { status: 500 });
  }
}
