import { Suspense } from 'react';
import AdminLoader from '@/components/admin/AdminLoader';
import { getAnalyticsOverview, getInquiryTrends, getRecentInquiriesTableData } from '@/actions/analytics.actions';

// We import these dynamically if we want client-side lazy loading, 
// but since this is a server component, we can import them directly 
// (or dynamically if they contain 'use client').
import dynamic from 'next/dynamic';

const WelcomeSection = dynamic(() => import('@/components/admin/dashboard/WelcomeSection'), { ssr: false, loading: () => <AdminLoader text="Loading Welcome..." /> });
const StatCards = dynamic(() => import('@/components/admin/dashboard/StatCards'), { ssr: false });
const AnalyticsCharts = dynamic(() => import('@/components/admin/dashboard/AnalyticsCharts'), { ssr: false });
const RecentInquiriesTable = dynamic(() => import('@/components/admin/dashboard/RecentInquiriesTable'), { ssr: false });

export const metadata = {
  title: 'Analytics | Admin Dashboard',
};

export default async function AnalyticsPage() {
  // Fetch real data on the server
  const [overviewRes, trendsRes, recentRes] = await Promise.all([
    getAnalyticsOverview(),
    getInquiryTrends(),
    getRecentInquiriesTableData()
  ]);

  const overviewData = overviewRes.success ? overviewRes.data : null;
  const trendData = trendsRes.success ? trendsRes.data : null;
  const recentInquiries = recentRes.success ? recentRes.data : null;

  return (
    <div className="space-y-8 pb-12 max-w-[1920px] mx-auto">
      <Suspense fallback={<AdminLoader text="Loading Analytics..." />}>
        <WelcomeSection />
        
        <StatCards overview={overviewData as any} />
        
        <AnalyticsCharts trendData={trendData as any} />
        
        <div>
          <RecentInquiriesTable inquiries={recentInquiries as any} />
        </div>
      </Suspense>
    </div>
  );
}
