'use client';

import { motion } from 'framer-motion';
import { 
  DollarSign, ShoppingCart, Users, TrendingUp,
  Package, Tags, UserCheck, UserPlus, FileText,
  Activity, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useMemo, useEffect, useState } from 'react';

const sparklineData = [
  { value: 40 }, { value: 30 }, { value: 45 }, { value: 50 }, 
  { value: 40 }, { value: 65 }, { value: 75 }
];

interface StatCardsProps {
  overview: {
    totalInquiries: number;
    totalProducts: number;
    totalUsers: number;
    conversionRate: string;
  } | null;
}

export default function StatCards({ overview }: StatCardsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mockStats = [
    { 
      id: 1, title: 'Total Inquiries', value: overview?.totalInquiries ?? '...', change: '+12.5%', 
      trend: 'up', icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-500/10'
    },
    { 
      id: 2, title: 'Total Products', value: overview?.totalProducts ?? '...', change: '+5.2%', 
      trend: 'up', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10'
    },
    { 
      id: 3, title: 'Registered Users', value: overview?.totalUsers ?? '...', change: '+18.1%', 
      trend: 'up', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10'
    },
    { 
      id: 4, title: 'Conversion Rate', value: overview?.conversionRate ?? '...', change: '-1.1%', 
      trend: 'down', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-[140px] rounded-3xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockStats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
        const trendColor = stat.trend === 'up' ? 'text-emerald-600 bg-emerald-500/10' : 'text-rose-600 bg-rose-500/10';

        return (
          <motion.div
            key={stat.id}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative overflow-hidden p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm hover:shadow-glass-lg transition-all group cursor-pointer"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${trendColor}`}>
                <TrendIcon size={14} />
                {stat.change}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">{stat.title}</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={stat.trend === 'up' ? '#10b981' : '#f43f5e'} 
                    strokeWidth={2} 
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
