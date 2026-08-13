'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SettingsFormValues, settingsFormSchema } from '@/lib/validations/settings.schema';
import { useSettingsStore } from '@/store/useSettingsStore';
import { saveAllSettings } from '@/actions/settings.actions';
import { Save, RotateCcw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

// Sections
import GeneralSection from '@/components/admin/settings/sections/GeneralSection';
import SecuritySection from '@/components/admin/settings/sections/SecuritySection';
import SystemInfoSection from '@/components/admin/settings/sections/SystemInfoSection';
import ActivityLogsSection from '@/components/admin/settings/sections/ActivityLogsSection';

interface SettingsPageClientProps {
  initialData: SettingsFormValues;
  activeSessions?: any[];
  activityLogs?: any[];
}

export default function SettingsPageClient({ initialData, activeSessions, activityLogs }: SettingsPageClientProps) {
  const { setData, isSaving, setIsSaving } = useSettingsStore();
  const [isPending, startTransition] = useTransition();

  const methods = useForm<any>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: initialData,
    mode: 'onChange'
  });

  const { handleSubmit, formState: { errors }, reset } = methods;

  const currentValues = methods.watch();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const isDifferent = JSON.stringify(currentValues) !== JSON.stringify(initialData);
    setIsDirty(isDifferent);
  }, [currentValues, initialData]);

  // Set initial data to Zustand
  useEffect(() => {
    setData(initialData);
  }, [initialData, setData]);

  const onSubmit = async (data: SettingsFormValues) => {
    setIsSaving(true);
    startTransition(async () => {
      try {
        const res = await saveAllSettings(data);
        if (res.success) {
          toast.success('Settings saved successfully');
          reset(data); // reset form with new data to clear dirty state
          setData(data);
        } else {
          toast.error(res.error || 'Failed to save settings');
        }
      } catch (error) {
        toast.error('An unexpected error occurred');
      } finally {
        setIsSaving(false);
      }
    });
  };

  const handleDiscard = () => {
    reset(initialData);
    setData(initialData);
    toast('Changes discarded');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="relative max-w-5xl mx-auto pb-32">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-slate-500 mt-2">Manage your entire enterprise platform from one unified dashboard.</p>
        </div>

        {/* Sections Container */}
        <div className="space-y-8 relative">
          <GeneralSection />
          <SecuritySection activeSessions={activeSessions} />
          
          <div className="py-8 my-8 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-6">System Health & Logs</h2>
            <SystemInfoSection />
            <ActivityLogsSection logs={activityLogs} />
          </div>
        </div>

        {/* Sticky Save Bar */}
        <AnimatePresence>
          {(isDirty || Object.keys(errors).length > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4 text-white">
                {Object.keys(errors).length > 0 ? (
                  <div className="flex items-center gap-2 text-rose-400">
                    <AlertCircle size={20} />
                    <span className="font-semibold text-sm">Please fix the validation errors</span>
                  </div>
                ) : (
                  <span className="font-semibold text-sm">Unsaved changes</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={handleDiscard}
                  disabled={isSaving || isPending}
                  className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors disabled:opacity-50"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving || isPending || Object.keys(errors).length > 0}
                  className="px-6 py-2 bg-blue-500 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(isSaving || isPending) ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <Save size={18} />
                  )}
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </form>
    </FormProvider>
  );
}
