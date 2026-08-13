'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  MessageSquare,
  Users,
  Image as ImageIcon,
  FileText,
  Download,
  Briefcase,
  BarChart,
  UserCog,
  Settings,
  LogOut,
  Settings2,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/lib/adminStore';
import { useAdminAppearance } from '@/components/admin/providers/AdminAppearanceProvider';

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/admin', roles: ['SUPER_ADMIN', 'ADMIN', 'SALES', 'MARKETING', 'EMPLOYEE'] },
  { title: 'Products', icon: Package, href: '/admin/products', roles: ['SUPER_ADMIN', 'ADMIN', 'SALES', 'MARKETING', 'EMPLOYEE'] },
  { title: 'Categories', icon: Tags, href: '/admin/categories', roles: ['SUPER_ADMIN', 'ADMIN', 'SALES', 'MARKETING', 'EMPLOYEE'] },
  { title: 'Inquiries', icon: MessageSquare, href: '/admin/inquiries', roles: ['SUPER_ADMIN', 'ADMIN', 'SALES', 'MARKETING', 'EMPLOYEE'] },
  { title: 'Customers', icon: Users, href: '/admin/customers', roles: ['SUPER_ADMIN', 'ADMIN', 'SALES'] },
  { title: 'Downloads', icon: Download, href: '/admin/downloads', roles: ['SUPER_ADMIN', 'ADMIN', 'MARKETING'] },
  { title: 'Analytics', icon: BarChart, href: '/admin/analytics', roles: ['SUPER_ADMIN', 'ADMIN', 'SALES', 'MARKETING'] },
  { title: 'Settings', icon: Settings, href: '/admin/settings', roles: ['SUPER_ADMIN', 'ADMIN'] },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useAdminStore();
  const { data: session } = useSession();
  const { sidebar = 'expanded' } = useAdminAppearance();
  
  const userRole = (session?.user as any)?.role || 'EMPLOYEE';

  const isCollapsed = sidebar === 'collapsed';
  const isMini = sidebar === 'mini';

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 bg-white border-r border-gray-100 flex flex-col z-50 transform transition-all duration-300 lg:translate-x-0 overflow-hidden",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        sidebar === 'expanded' ? "w-[280px]" : sidebar === 'collapsed' ? "w-[80px]" : "w-[80px] hover:w-[280px] group"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 shrink-0">
          <Link href="/admin" className="font-display font-bold text-xl tracking-tight text-primary truncate">
            {sidebar === 'expanded' ? (
              <>AdminPanel<span className="text-accent">.</span></>
            ) : isMini ? (
              <><span className="group-hover:hidden">AP</span><span className="hidden group-hover:inline">AdminPanel<span className="text-accent">.</span></span></>
            ) : (
              'AP'
            )}
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 -mr-2 text-slate-500 hover:text-slate-900 rounded-lg">
            <X size={20} />
          </button>
        </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {menuItems
          .filter(item => item.roles.includes(userRole))
          .map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  sidebar === 'collapsed' && "justify-center px-0 py-3",
                  isMini && "justify-center px-0 py-3 group-hover:justify-start group-hover:px-3 group-hover:py-2",
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
                title={sidebar !== 'expanded' ? item.title : undefined}
              >
                <Icon size={sidebar === 'expanded' ? 18 : 22} className={cn("shrink-0 transition-all", isActive ? "text-white" : "", isMini && "group-hover:w-[18px] group-hover:h-[18px]")} />
                <span className={cn(
                  "whitespace-nowrap transition-opacity",
                  sidebar === 'collapsed' && "hidden",
                  isMini && "hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                )}>{item.title}</span>
              </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className={cn(
            "flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors",
            sidebar === 'collapsed' && "justify-center px-0 py-3",
            isMini && "justify-center px-0 py-3 group-hover:justify-start group-hover:px-3 group-hover:py-2"
          )}
          title={sidebar !== 'expanded' ? "Logout" : undefined}
        >
          <LogOut size={sidebar === 'expanded' ? 18 : 22} className={cn("shrink-0", isMini && "group-hover:w-[18px] group-hover:h-[18px]")} />
          <span className={cn(
            "whitespace-nowrap transition-opacity",
            sidebar === 'collapsed' && "hidden",
            isMini && "hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
          )}>Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
}
