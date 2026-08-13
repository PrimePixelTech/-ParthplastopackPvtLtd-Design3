'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Category from '@/models/Category';

export async function getCategories() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ sortOrder: 1 });
    return { success: true, data: JSON.parse(JSON.stringify(categories)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createCategory(data: any) {
  try {
    await connectDB();
    const category = await Category.create(data);
    revalidatePath('/admin/categories');
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, data: any) {
  try {
    await connectDB();
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/categories');
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await connectDB();
    await Category.findByIdAndDelete(id);
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
