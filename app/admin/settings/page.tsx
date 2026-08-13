import { Suspense } from 'react';
import AdminLoader from '@/components/admin/AdminLoader';
import SettingsPageClient from '@/components/admin/settings/SettingsPageClient';
import { getAllSettings } from '@/actions/settings.actions';
import { getActiveSessions } from '@/actions/userSession.actions';
import { getActivityLogs } from '@/actions/activity.actions';
import { SettingsFormValues } from '@/lib/validations/settings.schema';

export const metadata = {
  title: 'Settings | Admin Dashboard',
};

export default async function SettingsPage() {
  const [settingsRes, sessionsRes, logsRes] = await Promise.all([
    getAllSettings(),
    getActiveSessions(),
    getActivityLogs(50)
  ]);
  
  const { success, data, error } = settingsRes;
  const activeSessions = sessionsRes.success ? sessionsRes.sessions : [];
  const activityLogs = logsRes.success ? logsRes.logs : [];

  // Basic fallback data in case of failure, though Zod schema has defaults
  const fallbackData: any = {}; // The Client Component form schema will fill defaults

  return (
    <div className="w-full">
      <Suspense fallback={<AdminLoader text="Loading Settings..." />}>
        {success && data ? (
          <SettingsPageClient initialData={data} activeSessions={activeSessions} activityLogs={activityLogs} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <h3 className="text-xl font-bold text-rose-500">Error Loading Settings</h3>
            <p className="text-slate-500 mt-2">{error || 'Please try again later.'}</p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
