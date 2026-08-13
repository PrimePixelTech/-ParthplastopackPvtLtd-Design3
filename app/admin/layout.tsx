import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';
import PremiumAdminHeader from '@/components/admin/PremiumAdminHeader';
import { getAllSettings } from '@/actions/settings.actions';
import AdminAppearanceProvider from '@/components/admin/providers/AdminAppearanceProvider';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Parth Plasto Pack',
  description: 'Enterprise Admin Dashboard for Parth Plasto Pack Pvt. Ltd.',
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const settingsRes = await getAllSettings();
  const appearance = settingsRes?.data?.appearance || {
    theme: 'system',
    accentColor: 'purple',
    layoutDensity: 'comfortable',
    sidebar: 'expanded',
    navbar: 'sticky',
    animationsEnabled: true,
    borderRadius: 8,
    fontSize: 14,
    glassEffect: true,
    blurEffect: true,
  } as any;

  return (
    <AdminAppearanceProvider settings={appearance as any}>
      <div className={`flex min-h-screen bg-slate-50 text-slate-900 transition-colors w-full max-w-[100vw] overflow-x-hidden relative ${appearance.theme === 'dark' ? 'dark' : ''}`}>
        <Toaster position="top-right" />
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen w-full max-w-[100vw] lg:max-w-full overflow-x-hidden transition-all duration-300" style={{ paddingLeft: 'var(--sidebar-width, 280px)' }}>
          <PremiumAdminHeader />
          <main className="flex-1 overflow-x-hidden w-full box-border transition-all duration-300" style={{ padding: 'var(--layout-padding, 2rem)' }}>
            <div className="max-w-7xl mx-auto w-full box-border">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminAppearanceProvider>
  );
}
