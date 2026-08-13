'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Bell, Search, Settings, LogOut, User, Shield, Key, MapPin,
  Briefcase, Mail, Phone, Calendar, Heart, Globe, Link as LinkIcon,
  Menu, X, Check, CheckCircle2, Trash2, Clock, AlertTriangle, Info,
  MoreVertical, Filter, Upload, Image as ImageIcon, Smartphone, Laptop,
  ChevronDown, Edit3, Lock, CreditCard, Box, UserPlus, Users, Activity
} from 'lucide-react';
import Image from 'next/image';
import { useAdminAppearance } from '@/components/admin/providers/AdminAppearanceProvider';

// ==========================================
// TYPES & MOCK DATA
// ==========================================

export type NotificationType =
  | 'New Order' | 'Order Shipped' | 'Payment Received' | 'Payment Failed'
  | 'New Customer' | 'Contact Form' | 'Product Approved' | 'Product Rejected'
  | 'Low Stock' | 'New Employee' | 'System Update' | 'Backup Completed'
  | 'Security Alert' | 'Login Alert' | 'Support Ticket';

export type Priority = 'Low' | 'Medium' | 'High';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  image?: string;
  icon?: string;
  type: NotificationType;
  priority: Priority;
  color: string;
  actionUrl: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface UserProfile {
  id: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  mobile: string;
  alternateMobile: string;
  whatsapp: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  nationality: string;
  department: string;
  designation: string;
  role: string;
  experience: string;
  joiningDate: string;
  manager: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  bio: string;
  skills: string[];
  website: string;
  linkedin: string;
  github: string;
  instagram: string;
  facebook: string;
  twitter: string;
  language: string;
  timezone: string;
  lastLogin: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  twoFactorEnabled: boolean;
  status: 'Active' | 'Inactive' | 'Suspended';
  createdAt: string;
  updatedAt: string;
}

const mockNotifications: AppNotification[] = [
  {
    id: 'n1', title: 'New Order #1024', message: 'You received a new order for HDPE Containers.',
    type: 'New Order', priority: 'High', color: 'text-blue-500 bg-blue-50', actionUrl: '/orders/1024',
    isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), updatedAt: new Date().toISOString(), userId: 'u1'
  },
  {
    id: 'n2', title: 'Security Alert', message: 'New login detected from Mumbai, India (Windows, Chrome).',
    type: 'Login Alert', priority: 'High', color: 'text-red-500 bg-red-50', actionUrl: '/security',
    isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), updatedAt: new Date().toISOString(), userId: 'u1'
  },
  {
    id: 'n3', title: 'Low Stock: PET Bottles', message: 'Only 50 units remaining in warehouse A.',
    type: 'Low Stock', priority: 'Medium', color: 'text-orange-500 bg-orange-50', actionUrl: '/inventory',
    isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), updatedAt: new Date().toISOString(), userId: 'u1'
  },
  {
    id: 'n4', title: 'System Update', message: 'Dashboard updated to version 2.4.0 successfully.',
    type: 'System Update', priority: 'Low', color: 'text-green-500 bg-green-50', actionUrl: '/changelog',
    isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), updatedAt: new Date().toISOString(), userId: 'u1'
  },
];

const mockProfile: UserProfile = {
  id: 'u1', profileImage: 'https://i.pravatar.cc/300?img=11', firstName: 'Alexander', lastName: 'Pierce',
  fullName: 'Alexander Pierce', username: 'alexpierce', email: 'alex.pierce@parthplastopack.com',
  mobile: '+91 9876543210', alternateMobile: '+91 9876543211', whatsapp: '+91 9876543210',
  gender: 'Male', dob: '1985-06-15', bloodGroup: 'O+', nationality: 'Indian',
  department: 'Technology', designation: 'Senior System Architect', role: 'Super Admin',
  experience: '12 Years', joiningDate: '2015-04-01', manager: 'CEO',
  address: '11, Swagat Ind. Park-2, Indore - Ahmedabad Highway', city: 'Ahmedabad', state: 'Gujarat',
  country: 'India', postalCode: '382433', bio: 'Passionate about building scalable enterprise solutions and modern web architectures.',
  skills: ['React', 'Next.js', 'System Design', 'Cloud Architecture'],
  website: 'https://alexpierce.dev', linkedin: 'alexpierce', github: 'alexpierce',
  instagram: '', facebook: '', twitter: '@alexpierce', language: 'English, Hindi, Gujarati',
  timezone: 'Asia/Kolkata (IST)', lastLogin: new Date().toISOString(),
  emailVerified: true, mobileVerified: true, twoFactorEnabled: true,
  status: 'Active', createdAt: '2015-04-01T00:00:00Z', updatedAt: new Date().toISOString()
};

// ==========================================
// ZOD SCHEMAS
// ==========================================

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  alternateMobile: z.string().optional(),
  whatsapp: z.string().optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
  department: z.string().min(2, "Department is required"),
  designation: z.string().min(2, "Designation is required"),
  bio: z.string().max(500).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// ==========================================
// SUB-COMPONENTS
// ==========================================

// Dummy icon since RefreshCw wasn't imported
const RefreshCw = ({ size }: { size: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>;

const getIconForType = (type: NotificationType) => {
  switch (type) {
    case 'New Order': return <Box size={18} />;
    case 'Security Alert': case 'Login Alert': return <Shield size={18} />;
    case 'Payment Received': return <CreditCard size={18} />;
    case 'Low Stock': return <AlertTriangle size={18} />;
    case 'New Employee': return <UserPlus size={18} />;
    case 'System Update': return <RefreshCw size={18} />;
    default: return <Info size={18} />;
  }
};

// --- Notification Panel ---
function NotificationPanel({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      // Simulating API Call
      return new Promise<AppNotification[]>((resolve) => setTimeout(() => resolve(mockNotifications), 400));
    }
  });

  const [filter, setFilter] = useState<'All' | 'Unread'>('All');
  const filteredNotifs = notifications.filter(n => filter === 'All' ? true : !n.isRead);

  const markAllRead = useMutation({
    mutationFn: async () => { /* Fake API */ },
    onSuccess: () => {
      queryClient.setQueryData(['notifications'], (old: AppNotification[]) => old.map(n => ({ ...n, isRead: true })));
    }
  });

  const deleteNotif = useMutation({
    mutationFn: async (id: string) => id,
    onSuccess: (id) => {
      queryClient.setQueryData(['notifications'], (old: AppNotification[]) => old.filter(n => n.id !== id));
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute top-16 right-4 md:right-16 w-[380px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-50 flex flex-col max-h-[80vh]"
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div>
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <p className="text-xs text-gray-500 mt-0.5">You have {notifications.filter(n => !n.isRead).length} unread messages</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => markAllRead.mutate()} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition" title="Mark all read">
            <CheckCircle2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex px-4 py-2 gap-4 border-b border-gray-100 text-sm font-medium">
        <button onClick={() => setFilter('All')} className={`pb-2 border-b-2 transition-colors ${filter === 'All' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>All</button>
        <button onClick={() => setFilter('Unread')} className={`pb-2 border-b-2 transition-colors ${filter === 'Unread' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Unread</button>
      </div>

      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {filteredNotifs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center">
            <Bell size={32} className="text-gray-300 mb-3" />
            <p>No notifications found</p>
          </div>
        ) : (
          filteredNotifs.map((notif) => (
            <motion.div layout key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition group flex gap-3 relative ${!notif.isRead ? 'bg-blue-50/30' : ''}`}>
              {!notif.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md" />}
              <div className={`mt-0.5 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.color}`}>
                {getIconForType(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-semibold text-gray-900 truncate pr-4">{notif.title}</h4>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{notif.message}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${notif.priority === 'High' ? 'bg-red-100 text-red-700' :
                    notif.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                    {notif.priority}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteNotif.mutate(notif.id); }}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition shrink-0 absolute right-2 top-2"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))
        )}
      </div>
      <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All Notifications</button>
      </div>
    </motion.div>
  );
}

// --- Profile Modal / Dropdown ---
function ProfileModal({ profile, onClose, onEdit }: { profile: UserProfile, onClose: () => void, onEdit: () => void }) {
  const [profileImage, setProfileImage] = useState(profile.profileImage);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
      setIsImageChanged(true);
    }
  };

  const handleSaveImage = () => {
    queryClient.setQueryData(['profile'], (old: UserProfile | undefined) => {
      if (!old) return old;
      return { ...old, profileImage };
    });
    setIsImageChanged(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative flex-shrink-0">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-md transition z-10">
              <X size={20} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="px-6 sm:px-10 pb-10">
            {/* Avatar & Basic Info */}
            <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white relative">
                  <Image src={profileImage} alt={profile.fullName} width={128} height={128} className="object-cover w-full h-full" />

                  {/* Hover Overlay */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Upload className="text-white mb-1" size={24} />
                    <span className="text-white text-[10px] font-semibold">Change</span>
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm z-10" title="Online" />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex-1 text-center sm:text-left mb-2">
                <h2 className="text-3xl font-bold text-gray-900">{profile.fullName}</h2>
                <p className="text-gray-500 font-medium">@{profile.username} • {profile.designation}</p>
              </div>
              <div className="flex gap-3 mb-2">
                {isImageChanged && (
                  <button onClick={handleSaveImage} className="px-5 py-2.5 bg-green-500 text-white hover:bg-green-600 rounded-xl font-medium flex items-center gap-2 shadow-sm transition">
                    <Check size={18} /> Save Photo
                  </button>
                )}
                <button onClick={onEdit} className="px-5 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl font-medium flex items-center gap-2 transition">
                  <Edit3 size={18} /> Edit Profile
                </button>
                <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-medium flex items-center gap-2 shadow-sm transition">
                  <Settings size={18} /> Settings
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Contact & Security */}
              <div className="space-y-6">
                <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Mail size={14} /> Contact Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email Address</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        {profile.email} {profile.emailVerified && <CheckCircle2 size={14} className="text-green-500" />}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Primary Mobile</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        {profile.mobile} {profile.mobileVerified && <CheckCircle2 size={14} className="text-green-500" />}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">WhatsApp</p>
                      <p className="text-sm font-medium text-gray-900">{profile.whatsapp}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield size={14} /> Security
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Two-Factor Auth</p>
                        <p className="text-xs text-gray-500">{profile.twoFactorEnabled ? 'Enabled via App' : 'Disabled'}</p>
                      </div>
                      <div className={`w-10 h-6 rounded-full flex items-center p-1 ${profile.twoFactorEnabled ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Login</p>
                      <p className="text-sm font-medium text-gray-900">{new Date(profile.lastLogin).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Work & Personal */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Briefcase size={14} /> Work Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                    <div><p className="text-xs text-gray-500 mb-1">Department</p><p className="text-sm font-medium">{profile.department}</p></div>
                    <div><p className="text-xs text-gray-500 mb-1">Designation</p><p className="text-sm font-medium">{profile.designation}</p></div>
                    <div><p className="text-xs text-gray-500 mb-1">Role</p><p className="text-sm font-medium"><span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs">{profile.role}</span></p></div>
                    <div><p className="text-xs text-gray-500 mb-1">Experience</p><p className="text-sm font-medium">{profile.experience}</p></div>
                    <div><p className="text-xs text-gray-500 mb-1">Joining Date</p><p className="text-sm font-medium">{profile.joiningDate}</p></div>
                    <div><p className="text-xs text-gray-500 mb-1">Reporting Manager</p><p className="text-sm font-medium">{profile.manager}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Edit Profile Form ---
function EditProfileModal({ profile, onClose }: { profile: UserProfile, onClose: () => void }) {
  const queryClient = useQueryClient();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile
  });

  const updateProfile = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      // Simulate API call
      return new Promise<ProfileFormValues>((resolve) => setTimeout(() => resolve(data), 1000));
    },
    onSuccess: (data: ProfileFormValues) => {
      queryClient.setQueryData(['profile'], (old: UserProfile | undefined) => {
        if (!old) return old;
        return { ...old, ...data };
      });
      onClose();
    }
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile.mutate(data);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <form id="edit-profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                <input {...form.register('firstName')} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm" />
                {form.formState.errors.firstName && <p className="text-red-500 text-xs mt-1">{form.formState.errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                <input {...form.register('lastName')} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Username</label>
                <input {...form.register('username')} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input {...form.register('email')} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Bio</label>
              <textarea {...form.register('bio')} rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                <input {...form.register('department')} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Designation</label>
                <input {...form.register('designation')} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm" />
              </div>
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
          <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition">
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            disabled={updateProfile.isPending}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition flex items-center gap-2 shadow-sm disabled:opacity-70"
          >
            {updateProfile.isPending ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : <Check size={16} />}
            {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================

export function PremiumAdminHeaderContent() {
  const { navbar = 'sticky' } = useAdminAppearance();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Outside clicks
  const notifRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return new Promise<UserProfile>((resolve) => setTimeout(() => resolve(mockProfile), 300));
    }
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      return new Promise<AppNotification[]>((resolve) => setTimeout(() => resolve(mockNotifications), 300));
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const isTransparent = navbar === 'transparent';
  
  // Basic transparent logic placeholder since we don't have a scroll listener active here easily
  // In a real app we'd add a scroll event listener.
  
  return (
    <>
      <header className={`h-[72px] bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-6 z-40 transition-all ${navbar === 'sticky' ? 'sticky top-0' : navbar === 'fixed' ? 'fixed top-0 right-0 w-full' : isTransparent ? 'sticky top-0 bg-transparent border-transparent' : 'relative'}`}>
        {/* Left Section - Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button className="lg:hidden p-2 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <Menu size={20} />
          </button>

          <div className="hidden md:flex items-center relative w-full">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-transparent focus:border-red-500 text-sm rounded-2xl pl-10 pr-4 py-2.5 outline-none transition-all shadow-sm focus:shadow-md"
            />
          </div>
        </div>


      </header>

      {/* Modals */}
      <AnimatePresence>
        {showProfileModal && profile && (
          <ProfileModal
            profile={profile}
            onClose={() => setShowProfileModal(false)}
            onEdit={() => { setShowProfileModal(false); setShowEditProfile(true); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditProfile && profile && (
          <EditProfileModal
            profile={profile}
            onClose={() => setShowEditProfile(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Wrap in QueryClientProvider for independent usage if not wrapped at App level
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 5 } }
});

export default function PremiumAdminHeader() {
  return (
    <QueryClientProvider client={queryClient}>
      <PremiumAdminHeaderContent />
    </QueryClientProvider>
  );
}
