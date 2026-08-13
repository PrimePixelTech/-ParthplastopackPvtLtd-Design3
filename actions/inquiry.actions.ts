'use server';

import connectDB from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { revalidatePath } from 'next/cache';

// Public action: anyone can submit an inquiry
export async function createInquiry(data: any) {
  try {
    await connectDB();
    const inquiry = await Inquiry.create(data);
    
    // We can potentially trigger email notifications here later
    
    revalidatePath('/admin/inquiries');
    return { success: true, data: JSON.parse(JSON.stringify(inquiry)) };
  } catch (error: any) {
    console.error('Failed to create inquiry:', error);
    return { success: false, error: error.message };
  }
}

// Protected actions: Admin only
export async function getInquiries() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(inquiries)) };
  } catch (error: any) {
    console.error('Failed to fetch inquiries:', error);
    return { success: false, error: error.message };
  }
}

export async function updateInquiry(id: string, updateData: any) {
  try {
    await connectDB();
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    revalidatePath('/admin/inquiries');
    return { success: true, data: JSON.parse(JSON.stringify(inquiry)) };
  } catch (error: any) {
    console.error('Failed to update inquiry:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteInquiry(id: string) {
  try {
    await connectDB();
    await Inquiry.findByIdAndDelete(id);
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete inquiry:', error);
    return { success: false, error: error.message };
  }
}
