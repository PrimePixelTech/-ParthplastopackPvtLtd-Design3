'use server';

import connectDB from '@/lib/db';
import Attribute from '@/models/Attribute';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

// Helper to check admin access
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
}

export async function getAttributes() {
  try {
    await connectDB();
    const attributes = await Attribute.find().sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(attributes));
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createAttribute(data: any) {
  try {
    await checkAdmin();
    await connectDB();
    
    // Check if name already exists
    const existing = await Attribute.findOne({ name: { $regex: new RegExp(`^${data.name}$`, 'i') } });
    if (existing) {
      throw new Error(`An attribute named "${data.name}" already exists.`);
    }

    const attribute = await Attribute.create(data);
    revalidatePath('/admin/filters');
    revalidatePath('/admin/products/new');
    return { success: true, data: JSON.parse(JSON.stringify(attribute)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAttribute(id: string, data: any) {
  try {
    await checkAdmin();
    await connectDB();
    
    // Check if name exists (excluding current)
    const existing = await Attribute.findOne({ 
      name: { $regex: new RegExp(`^${data.name}$`, 'i') },
      _id: { $ne: id }
    });
    
    if (existing) {
      throw new Error(`An attribute named "${data.name}" already exists.`);
    }

    const attribute = await Attribute.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/filters');
    revalidatePath('/admin/products/new');
    return { success: true, data: JSON.parse(JSON.stringify(attribute)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteAttribute(id: string) {
  try {
    await checkAdmin();
    await connectDB();
    
    await Attribute.findByIdAndDelete(id);
    revalidatePath('/admin/filters');
    revalidatePath('/admin/products/new');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
