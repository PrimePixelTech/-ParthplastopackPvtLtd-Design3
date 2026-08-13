import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { SettingsFormValues } from '@/lib/validations/settings.schema';
import { Layout, Moon, Sun, Monitor, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppearanceStore, defaultAppearance } from '@/lib/appearanceStore';
import { updateAppearanceSettings } from '@/actions/settings.actions';
import toast from 'react-hot-toast';

export default function AppearanceSection() {
  const { register, watch, setValue } = useFormContext<SettingsFormValues>();
  const { setAppearance } = useAppearanceStore();

  const theme = watch('appearance.theme');
  const density = watch('appearance.layoutDensity');
  const accentColor = watch('appearance.accentColor');
  const sidebar = watch('appearance.sidebar');
  const navbar = watch('appearance.navbar');
  const animationsEnabled = watch('appearance.animationsEnabled');
  const glassEffect = watch('appearance.glassEffect');
  const blurAmount = watch('appearance.blurAmount');
  const borderRadius = watch('appearance.borderRadius');
  const fontSize = watch('appearance.fontSize');

  const appearanceValues = watch('appearance');
  const stringifiedAppearance = JSON.stringify(appearanceValues);
  
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (appearanceValues) {
      // 1. Immediately update global Zustand state
      setAppearance(appearanceValues as any);
      
      // 2. Debounced Autosave to MongoDB
      const timer = setTimeout(async () => {
        try {
          const res = await updateAppearanceSettings(appearanceValues);
          if (!res.success) {
            toast.error('Failed to autosave appearance settings');
          }
        } catch (e) {
          console.error(e);
        }
      }, 500); // 500ms debounce
      return () => clearTimeout(timer);
    }
  }, [stringifiedAppearance, setAppearance]);

  const handleReset = () => {
    Object.keys(defaultAppearance).forEach((key) => {
      setValue(`appearance.${key}` as any, (defaultAppearance as any)[key], { shouldDirty: true, shouldValidate: true });
    });
    toast.success('Appearance reset to defaults');
  };

  const accentColorsList = [
    { name: 'blue', class: 'bg-blue-500 ring-blue-500' },
    { name: 'indigo', class: 'bg-indigo-500 ring-indigo-500' },
    { name: 'purple', class: 'bg-purple-500 ring-purple-500' },
    { name: 'emerald', class: 'bg-emerald-500 ring-emerald-500' },
    { name: 'green', class: 'bg-green-500 ring-green-500' },
    { name: 'orange', class: 'bg-orange-500 ring-orange-500' },
    { name: 'amber', class: 'bg-amber-500 ring-amber-500' },
    { name: 'rose', class: 'bg-rose-500 ring-rose-500' },
    { name: 'pink', class: 'bg-pink-500 ring-pink-500' },
    { name: 'red', class: 'bg-red-500 ring-red-500' },
    { name: 'cyan', class: 'bg-cyan-500 ring-cyan-500' },
    { name: 'slate', class: 'bg-slate-500 ring-slate-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden mb-8"
      id="section-appearance"
    >


      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Theme Preference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              type="button"
              onClick={() => setValue('appearance.theme', 'light', { shouldDirty: true })}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300 bg-white/60'}`}
            >
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full"><Sun size={24} /></div>
              <span className="text-sm font-bold text-slate-900">Light Mode</span>
            </button>
            <button 
              type="button"
              onClick={() => setValue('appearance.theme', 'dark', { shouldDirty: true })}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300 bg-white/60'}`}
            >
              <div className="p-3 bg-slate-800 text-slate-300 rounded-full"><Moon size={24} /></div>
              <span className="text-sm font-bold text-slate-900">Dark Mode</span>
            </button>
            <button 
              type="button"
              onClick={() => setValue('appearance.theme', 'system', { shouldDirty: true })}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${theme === 'system' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300 bg-white/60'}`}
            >
              <div className="p-3 bg-slate-100 text-slate-600 rounded-full"><Monitor size={24} /></div>
              <span className="text-sm font-bold text-slate-900">System Sync</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Accent Color</h3>
          <div className="flex flex-wrap gap-4">
            {accentColorsList.map(color => (
              <button 
                key={color.name}
                type="button"
                title={color.name}
                onClick={() => setValue('appearance.accentColor', color.name as any, { shouldDirty: true })}
                className={`w-12 h-12 rounded-full shadow-sm transition-transform ${accentColor === color.name ? 'ring-4 ring-offset-2 scale-110' : 'hover:scale-110'} ${color.class}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700">Layout Density</h3>
            <div className="flex flex-col gap-3">
              {['comfortable', 'compact'].map(d => (
                <label key={d} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white/60">
                  <input type="radio" value={d} {...register('appearance.layoutDensity')} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-medium capitalize">{d}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700">Sidebar</h3>
            <div className="flex flex-col gap-3">
              {['expanded', 'collapsed', 'mini'].map(s => (
                <label key={s} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white/60">
                  <input type="radio" value={s} {...register('appearance.sidebar')} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-medium capitalize">{s}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700">Navbar</h3>
            <div className="flex flex-col gap-3">
              {['sticky', 'fixed', 'transparent'].map(n => (
                <label key={n} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white/60">
                  <input type="radio" value={n} {...register('appearance.navbar')} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-medium capitalize">{n}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-slate-700">Visual Effects</h3>
            
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white/60">
              <span className="text-sm font-medium">Animations</span>
              <input type="checkbox" {...register('appearance.animationsEnabled')} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
            </label>
            
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white/60">
              <span className="text-sm font-medium">Glass Effect</span>
              <input type="checkbox" {...register('appearance.glassEffect')} className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
            </label>
            
            {glassEffect && (
              <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-semibold text-slate-600">Blur Amount</h3>
                  <span className="text-xs font-bold text-indigo-600">{blurAmount}px</span>
                </div>
                <input type="range" min="0" max="20" step="5" {...register('appearance.blurAmount', { valueAsNumber: true })} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
              </div>
            )}
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-semibold text-slate-700">Geometry & Typography</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-700">Border Radius</h3>
                <span className="text-xs font-bold text-indigo-600">{borderRadius}px</span>
              </div>
              <input type="range" min="0" max="24" step="4" {...register('appearance.borderRadius', { valueAsNumber: true })} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-700">Base Font Size</h3>
                <span className="text-xs font-bold text-indigo-600">{fontSize}px</span>
              </div>
              <input type="range" min="12" max="20" step="1" {...register('appearance.fontSize', { valueAsNumber: true })} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
