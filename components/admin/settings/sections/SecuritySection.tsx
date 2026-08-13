import { useFormContext } from 'react-hook-form';
import { SettingsFormValues } from '@/lib/validations/settings.schema';
import { Shield, Key, Smartphone, Laptop, AlertTriangle, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { revokeSession, revokeAllOtherSessions } from '@/actions/userSession.actions';
import { toast } from 'react-hot-toast';

export default function SecuritySection({ activeSessions }: { activeSessions?: any[] }) {
  const { register, watch, formState: { errors } } = useFormContext<SettingsFormValues>();

  const errorObj = errors.security;
  const twoFactorEnabled = watch('security.twoFactorEnabled');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 mb-8"
      id="section-security"
    >
      <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-white/40 flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600">
            <Key size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
            <p className="text-sm text-slate-500">Ensure your account is using a long, random password to stay secure.</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
              <div className="flex gap-1 mt-2">
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-1/4" />
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                <div className="h-1.5 w-full bg-slate-200 rounded-full" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Weak password</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button type="button" className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-white/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600">
                <Shield size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Two-Factor Authentication</h2>
                <p className="text-sm text-slate-500">Add additional security to your account using 2FA.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" {...register('security.twoFactorEnabled')} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {twoFactorEnabled && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
            >
              <div className="w-32 h-32 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-2">
                <QrCode size={100} className="text-slate-800" />
              </div>
              <div className="flex-1 space-y-4 text-center sm:text-left">
                <p className="text-sm text-slate-600">Scan this QR code with Google Authenticator, Microsoft Authenticator, or Authy.</p>
                <div className="flex gap-2 max-w-xs mx-auto sm:mx-0">
                  <input type="text" placeholder="Enter 6-digit OTP" className="flex-1 px-4 py-2 bg-white/60 border border-slate-200 rounded-xl text-center tracking-widest font-mono text-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                  <button type="button" className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">Verify</button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-white/40">
          <h2 className="text-xl font-bold text-slate-900">Login Security</h2>
          <p className="text-sm text-slate-500 mt-1">Configure session and login limits.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Max Login Attempts</label>
            <input
              type="number"
              {...register('security.maxLoginAttempts', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Account Lock Duration (mins)</label>
            <input
              type="number"
              {...register('security.accountLockDuration', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Auto Logout Time (mins)</label>
            <input
              type="number"
              {...register('security.autoLogoutTime', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Session Timeout (hours)</label>
            <input
              type="number"
              {...register('security.sessionTimeout', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-white/40 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Active Sessions</h2>
            <p className="text-sm text-slate-500">Manage and logout your active sessions on other devices.</p>
          </div>
          <button 
            type="button" 
            onClick={async () => {
              const res = await revokeAllOtherSessions();
              if (res.success) toast.success('All other devices logged out');
              else toast.error(res.error || 'Failed to logout devices');
            }}
            className="px-4 py-2 text-rose-600 bg-rose-50 text-sm font-bold rounded-xl hover:bg-rose-100 transition-colors"
          >
            Logout All Devices
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {activeSessions?.length > 0 ? (
            activeSessions.map((session) => (
              <div key={session.sessionId} className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-100 rounded-xl text-slate-500">
                    {session.device.toLowerCase().includes('phone') || session.device.toLowerCase().includes('mobile') ? (
                      <Smartphone size={24} />
                    ) : (
                      <Laptop size={24} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {session.device} ({session.browser})
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {session.location} • {session.isCurrent ? 'Active now' : `Last active ${new Date(session.lastActive).toLocaleString()}`} • {session.ipAddress}
                    </p>
                  </div>
                </div>
                {session.isCurrent ? (
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Current Device</span>
                ) : (
                  <button 
                    type="button" 
                    onClick={async () => {
                      const res = await revokeSession(session.sessionId);
                      if (res.success) toast.success('Session revoked');
                      else toast.error(res.error || 'Failed to revoke session');
                    }}
                    className="text-sm font-semibold text-rose-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No active sessions found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
