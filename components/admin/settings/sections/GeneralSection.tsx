import { useFormContext } from 'react-hook-form';
import { SettingsFormValues } from '@/lib/validations/settings.schema';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GeneralSection() {
  const { register, formState: { errors } } = useFormContext<any>();

  const errorObj = errors.general as any;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden mb-8"
      id="section-general"
    >
      <div className="p-6 border-b border-white/40">
        <h2 className="text-xl font-bold text-slate-900">General Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Basic configuration for your application.</p>
      </div>
      
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Application Name</label>
            <input
              {...register('general.appName')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            {errorObj?.appName && <p className="text-rose-500 text-xs mt-1">{errorObj.appName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Company Name</label>
            <input
              {...register('general.companyName')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            {errorObj?.companyName && <p className="text-rose-500 text-xs mt-1">{errorObj.companyName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Company Address</label>
            <input
              {...register('general.companyAddress')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">GST Number</label>
            <input
              {...register('general.gstNumber')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Support Email</label>
            <input
              {...register('general.supportEmail')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            {errorObj?.supportEmail && <p className="text-rose-500 text-xs mt-1">{errorObj.supportEmail.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Support Phone</label>
            <input
              {...register('general.supportPhone')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            {errorObj?.supportPhone && <p className="text-rose-500 text-xs mt-1">{errorObj.supportPhone.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Website URL</label>
            <input
              {...register('general.websiteUrl')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            {errorObj?.websiteUrl && <p className="text-rose-500 text-xs mt-1">{errorObj.websiteUrl.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Timezone</label>
            <select
              {...register('general.timezone')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
              <option value="America/New_York">EST (America/New_York)</option>
              <option value="Europe/London">GMT (Europe/London)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Currency</label>
            <select
              {...register('general.currency')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Language</label>
            <select
              {...register('general.language')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="gu">Gujarati</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Date Format</label>
            <select
              {...register('general.dateFormat')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Time Format</label>
            <select
              {...register('general.timeFormat')}
              className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="12h">12-hour (AM/PM)</option>
              <option value="24h">24-hour</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Company Description</label>
          <textarea
            {...register('general.companyDescription')}
            rows={4}
            className="w-full px-4 py-2.5 bg-white/60 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all custom-scrollbar"
          />
        </div>


      </div>
    </motion.div>
  );
}
