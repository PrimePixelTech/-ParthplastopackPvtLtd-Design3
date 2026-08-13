import { useFormContext } from 'react-hook-form';
import { SettingsFormValues } from '@/lib/validations/settings.schema';
import { Bell, Mail, MonitorSmartphone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationToggle = ({ label, description, name }: { label: string, description: string, name: any }) => {
  const { register, watch } = useFormContext<SettingsFormValues>();
  const checked = watch(name);

  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 bg-white/60">
      <div>
        <h4 className="text-sm font-bold text-slate-900">{label}</h4>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input type="checkbox" className="sr-only peer" {...register(name)} />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
};

export default function NotificationsSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden mb-8"
      id="section-notifications"
    >
      <div className="p-6 border-b border-white/40 flex items-center gap-3">
        <div className="p-2 bg-orange-500/10 rounded-xl text-orange-600">
          <Bell size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
          <p className="text-sm text-slate-500">Choose how and when you want to be notified.</p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-700">
            <Mail size={18} />
            <h3 className="text-sm font-bold">Email Notifications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NotificationToggle label="Security Alerts" description="Get notified on new logins." name="notifications.email.securityAlerts" />
            <NotificationToggle label="Orders" description="Receive emails for new orders." name="notifications.email.orders" />
            <NotificationToggle label="Inquiry" description="Receive emails for new inquiries." name="notifications.email.inquiry" />
            <NotificationToggle label="Inventory" description="Low stock alerts." name="notifications.email.inventory" />
            <NotificationToggle label="Marketing" description="Updates about new features." name="notifications.email.marketing" />
            <NotificationToggle label="Weekly Report" description="Summary of the week." name="notifications.email.weeklyReport" />
            <NotificationToggle label="Monthly Report" description="Summary of the month." name="notifications.email.monthlyReport" />
            <NotificationToggle label="Server Errors" description="Critical server errors." name="notifications.email.serverErrors" />
            <NotificationToggle label="Database Errors" description="Critical DB errors." name="notifications.email.databaseErrors" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-700">
            <MonitorSmartphone size={18} />
            <h3 className="text-sm font-bold">Push Notifications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NotificationToggle label="Desktop Notifications" description="Pop-ups on your desktop." name="notifications.push.desktopNotifications" />
            <NotificationToggle label="Browser Notifications" description="In-browser push alerts." name="notifications.push.browserNotifications" />
            <NotificationToggle label="Maintenance" description="Scheduled downtime alerts." name="notifications.push.maintenance" />
            <NotificationToggle label="System Alerts" description="Crucial system changes." name="notifications.push.systemAlerts" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-700">
              <MessageSquare size={18} />
              <h3 className="text-sm font-bold">SMS</h3>
            </div>
            <div className="space-y-4">
              <NotificationToggle label="OTP" description="Receive One-Time Passwords via SMS." name="notifications.sms.otp" />
              <NotificationToggle label="Login Alerts" description="Alerts for unusual logins." name="notifications.sms.loginAlerts" />
              <NotificationToggle label="Security Alerts" description="Critical security SMS." name="notifications.sms.securityAlerts" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-700">
              <MessageSquare size={18} className="text-green-500" />
              <h3 className="text-sm font-bold text-green-700">WhatsApp</h3>
            </div>
            <div className="space-y-4">
              <NotificationToggle label="Order Alerts" description="Instant WhatsApp message on new order." name="notifications.whatsapp.orderAlerts" />
              <NotificationToggle label="Inquiry Alerts" description="Instant WhatsApp message on inquiry." name="notifications.whatsapp.inquiryAlerts" />
              <NotificationToggle label="Critical Alerts" description="Downtime/Error alerts." name="notifications.whatsapp.criticalAlerts" />
              <NotificationToggle label="Admin Alerts" description="Admin-only broadcasts." name="notifications.whatsapp.adminAlerts" />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
