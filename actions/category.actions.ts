'use server';

import connectDB from '@/lib/db';
import Category from '@/models/Category';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

// Helper to check admin access
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
}

export async function getCategories() {
  noStore();
  try {
    await connectDB();
    const categories = await Category.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getCategory(id: string) {
  try {
    await connectDB();
    const category = await Category.findById(id).lean();
    return JSON.parse(JSON.stringify(category));
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createCategory(data: any) {
  try {
    await checkAdmin();
    await connectDB();
    
    // Auto-generate slug if not provided
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const category = await Category.create(data);
    revalidatePath('/admin/categories');
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, data: any) {
  try {
    await checkAdmin();
    await connectDB();
    
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/categories');
    revalidatePath(`/admin/categories/${id}`);
    
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await checkAdmin();
    await connectDB();
    
    await Category.findByIdAndDelete(id);
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
