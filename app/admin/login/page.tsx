'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-gray-100"
      >
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-3xl tracking-tight text-primary mb-2">
              AdminPanel<span className="text-accent">.</span>
            </h1>
            <p className="text-slate-500 text-sm">
              Sign in to manage your website.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20:ring-primary/20 outline-none transition-all text-slate-900"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20:ring-primary/20 outline-none transition-all text-slate-900"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300 text-primary focus:ring-primary" />
              <label htmlFor="remember" className="text-sm text-slate-600">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
