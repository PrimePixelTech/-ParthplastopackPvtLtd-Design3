import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with the credentials we verified earlier
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ydw84prm',
  api_key: process.env.CLOUDINARY_API_KEY || '464721597952559',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'ER94OSe51XxEXKfVImvSjgfv2IU',
});

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' });
    }
    
    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'admin_uploads',
    });
    
    // Return the Cloudinary secure URL. 
    // This perfectly matches the format expected by your frontend forms.
    return NextResponse.json({ success: true, url: uploadResult.secure_url });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
