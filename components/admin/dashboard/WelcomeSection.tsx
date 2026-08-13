'use client';

import { motion } from 'framer-motion';
import { Cloud, Sun, Moon, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function WelcomeSection() {
  const { data: session } = useSession();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();
  let greeting = 'Good Evening';
  let Icon = Moon;
  
  if (hour < 12) {
    greeting = 'Good Morning';
    Icon = Sun;
  } else if (hour < 18) {
    greeting = 'Good Afternoon';
    Icon = Sun;
  }

  const name = session?.user?.name || 'Admin';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          {greeting}, {name} <span className="animate-wave inline-block origin-bottom-right">👋</span>
        </h1>
        <p className="text-slate-500 mt-1">Here is what's happening with your store today.</p>
      </div>

      <div className="flex items-center gap-6 bg-white/60 p-4 rounded-2xl border border-slate-100/50 shadow-sm">
        <div className="flex items-center gap-3 pr-6 border-r border-slate-200">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Icon size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xs text-slate-500">
              {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
            <Cloud size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">24°C, Cloudy</p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin size={10} /> Ahmedabad
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
