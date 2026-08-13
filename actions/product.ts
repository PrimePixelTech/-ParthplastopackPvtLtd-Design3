'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function getProducts(query = {}) {
  try {
    await connectDB();
    const products = await Product.find(query).populate('category', 'title slug').sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(products)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createProduct(data: any) {
  try {
    await connectDB();
    const product = await Product.create(data);
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    await connectDB();
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
