'use server';

import connectDB from '@/lib/db';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import bcrypt from 'bcryptjs';

// Helper to check for SUPER_ADMIN or ADMIN access
async function checkAdminAccess() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
  
  const userRole = (session.user as any).role;
  if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN') {
    throw new Error('Forbidden: You do not have permission to manage users.');
  }
  
  return { session, userRole };
}

export async function getUsers() {
  try {
    await checkAdminAccess();
    await connectDB();
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(users)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createUser(data: any) {
  try {
    await checkAdminAccess();
    await connectDB();
    
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      throw new Error(`A user with email "${data.email}" already exists.`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      isActive: data.isActive !== undefined ? data.isActive : true,
    });
    
    revalidatePath('/admin/users');
    
    const userObj = user.toObject();
    delete userObj.password;
    
    return { success: true, data: JSON.parse(JSON.stringify(userObj)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateUser(id: string, data: any) {
  try {
    const { userRole } = await checkAdminAccess();
    await connectDB();
    
    const existing = await User.findOne({ email: data.email, _id: { $ne: id } });
    if (existing) {
      throw new Error(`A user with email "${data.email}" already exists.`);
    }

    const updateData: any = {
      name: data.name,
      email: data.email,
      role: data.role,
      isActive: data.isActive,
    };

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(data.password, salt);
    }
    
    // Prevent ADMIN from updating a SUPER_ADMIN
    const targetUser = await User.findById(id);
    if (!targetUser) {
        throw new Error('User not found');
    }
    if (targetUser.role === 'SUPER_ADMIN' && userRole !== 'SUPER_ADMIN') {
        throw new Error('Forbidden: Only a Super Admin can modify another Super Admin.');
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    revalidatePath('/admin/users');
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedUser)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteUser(id: string) {
  try {
    const { session, userRole } = await checkAdminAccess();
    await connectDB();
    
    const targetUser = await User.findById(id);
    if (!targetUser) {
        throw new Error('User not found');
    }
    
    if (targetUser.role === 'SUPER_ADMIN' && userRole !== 'SUPER_ADMIN') {
        throw new Error('Forbidden: Only a Super Admin can delete another Super Admin.');
    }
    
    if (targetUser._id.toString() === (session.user as any).id) {
        throw new Error('Forbidden: You cannot delete your own account.');
    }

    await User.findByIdAndDelete(id);
    revalidatePath('/admin/users');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
