'use server';

import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category'; // Ensure Category is loaded
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

export async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find().populate({ path: 'category', model: Category, select: 'title' }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getProduct(id: string) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    return JSON.parse(JSON.stringify(product));
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getProductBySlug(slug: string) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug }).populate({ path: 'category', model: Category, select: 'title' }).lean();
    return JSON.parse(JSON.stringify(product));
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createProduct(data: any) {
  try {
    await checkAdmin();
    await connectDB();
    
    // Auto-generate slug if not provided
    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const product = await Product.create(data);
    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath('/');
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    await checkAdmin();
    await connectDB();
    
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}`);
    revalidatePath('/products');
    revalidatePath(`/products/${product.slug}`);
    revalidatePath('/');
    
    return { success: true, data: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await checkAdmin();
    await connectDB();
    
    await Product.findByIdAndDelete(id);
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function bulkImportProducts(products: any[]) {
  try {
    await checkAdmin();
    await connectDB();
    
    const processed = products.map((p) => {
      const data = { ...p };
      delete data._id; 
      delete data.createdAt;
      delete data.updatedAt;
      delete data.__v;
      
      if (typeof data.category === 'object' && data.category !== null) {
        data.category = data.category._id || data.category;
      }
      
      if (!data.slug && data.name) {
        const randomString = Math.floor(Math.random() * 10000).toString();
        data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + randomString;
      }
      return data;
    });

    await Product.insertMany(processed);
    revalidatePath('/admin/products');
    return { success: true, count: processed.length };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
