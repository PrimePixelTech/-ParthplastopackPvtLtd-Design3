'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Package, MessageSquare, Users, Eye } from 'lucide-react';
import { getProducts } from '@/actions/product.actions';
import { getInquiries } from '@/actions/inquiry.actions';
import AdminLoader from '@/components/admin/AdminLoader';

export default function AdminDashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [pendingQuotes, setPendingQuotes] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, inquiriesRes] = await Promise.all([
          getProducts(),
          getInquiries()
        ]);
        
        setProductCount(Array.isArray(products) ? products.length : 0);
        
        const inquiries = inquiriesRes.success && Array.isArray(inquiriesRes.data) ? inquiriesRes.data : [];
        
        const quotes = inquiries.filter((i: any) => i.type === 'Product Quote' && (i.status === 'New' || i.status === 'Contacted'));
        setPendingQuotes(quotes.length);
        
        const leads = inquiries.filter((i: any) => i.status === 'New');
        setNewLeads(leads.length);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { title: 'Total Products', value: loading ? '...' : productCount.toString(), change: '+12%', icon: Package, color: 'bg-blue-500' },
    { title: 'Pending Quotations', value: loading ? '...' : pendingQuotes.toString(), change: '+5%', icon: MessageSquare, color: 'bg-orange-500' },
    { title: 'Total Visitors', value: '1,245', change: '+22%', icon: Eye, color: 'bg-purple-500' },
    { title: 'New Leads', value: loading ? '...' : newLeads.toString(), change: '+18%', icon: Users, color: 'bg-emerald-500' },
  ];

  if (loading) {
    return <AdminLoader text="Loading Dashboard Data..." />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back, Admin! Here is what's happening today.</p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={staggerItem}
              className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                  <Icon size={24} className={stat.color.replace('bg-', 'text-')} />
                </div>
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-slate-500 text-sm mt-1">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placeholder for Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm h-96 flex items-center justify-center"
        >
          <p className="text-slate-400">Monthly Sales Graph will render here</p>
        </motion.div>

        {/* Placeholder for Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm h-96 flex items-center justify-center"
        >
          <p className="text-slate-400">Recent Activity Timeline</p>
        </motion.div>
      </div>
    </div>
  );
}
