'use server';

import dbConnect from '@/lib/db';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import GeneralSettings from '@/models/GeneralSettings';
import AppearanceSettings from '@/models/AppearanceSettings';
import SecuritySettings from '@/models/SecuritySettings';
import NotificationConfig from '@/models/NotificationConfig';
import { encrypt, decrypt } from '@/lib/encryption';
import { SettingsFormValues } from '@/lib/validations/settings.schema';

export async function getAllSettings(): Promise<{ success: boolean; data?: SettingsFormValues; error?: string }> {
  noStore();
  try {
    await dbConnect();
    
    const [general, appearance, security, notifications] = await Promise.all([
      GeneralSettings.findOne() || GeneralSettings.create({}),
      AppearanceSettings.findOne() || AppearanceSettings.create({}),
      SecuritySettings.findOne() || SecuritySettings.create({}),
      NotificationConfig.findOne() || NotificationConfig.create({})
    ]);

    // Construct the data object exactly as Zod expects
    const data: SettingsFormValues = {
      general: {
        appName: general?.appName || '',
        companyName: general?.companyName || '',
        companyAddress: general?.companyAddress || '',
        gstNumber: general?.gstNumber || '',
        supportEmail: general?.supportEmail || '',
        supportPhone: general?.supportPhone || '',
        websiteUrl: general?.websiteUrl || '',
        timezone: general?.timezone || '',
        currency: general?.currency || '',
        language: general?.language || '',
        dateFormat: general?.dateFormat || '',
        timeFormat: general?.timeFormat || '',
        logoUrl: general?.logoUrl || '',
        darkLogoUrl: general?.darkLogoUrl || '',
        faviconUrl: general?.faviconUrl || '',
        companyBannerUrl: general?.companyBannerUrl || '',
        companyDescription: general?.companyDescription || '',
        socialLinks: {
          facebook: general?.socialLinks?.facebook || '',
          instagram: general?.socialLinks?.instagram || '',
          linkedin: general?.socialLinks?.linkedin || '',
          youtube: general?.socialLinks?.youtube || '',
          twitter: general?.socialLinks?.twitter || '',
        }
      },
      appearance: {
        theme: appearance?.theme || 'system',
        accentColor: (appearance?.accentColor || 'purple') as any,
        layoutDensity: appearance?.layoutDensity || 'comfortable',
        sidebar: appearance?.sidebar || 'expanded',
        navbar: appearance?.navbar || 'sticky',
        animationsEnabled: appearance?.animationsEnabled ?? true,
        borderRadius: appearance?.borderRadius ?? 8,
        fontSize: appearance?.fontSize ?? 14,
        glassEffect: appearance?.glassEffect ?? true,
        blurAmount: appearance?.blurAmount ?? 10,
      },
      security: {
        twoFactorEnabled: security?.twoFactorEnabled ?? false,
        maxLoginAttempts: security?.maxLoginAttempts ?? 5,
        accountLockDuration: security?.accountLockDuration ?? 30,
        autoLogoutTime: security?.autoLogoutTime ?? 60,
        sessionTimeout: security?.sessionTimeout ?? 24,
      },
      notifications: {
        email: {
          securityAlerts: notifications?.email?.securityAlerts ?? true,
          orders: notifications?.email?.orders ?? true,
          inquiry: notifications?.email?.inquiry ?? true,
          inventory: notifications?.email?.inventory ?? true,
          marketing: notifications?.email?.marketing ?? false,
          weeklyReport: notifications?.email?.weeklyReport ?? false,
          monthlyReport: notifications?.email?.monthlyReport ?? false,
          serverErrors: notifications?.email?.serverErrors ?? true,
          databaseErrors: notifications?.email?.databaseErrors ?? true,
        },
        push: {
          desktopNotifications: notifications?.push?.desktopNotifications ?? false,
          browserNotifications: notifications?.push?.browserNotifications ?? false,
          maintenance: notifications?.push?.maintenance ?? true,
          systemAlerts: notifications?.push?.systemAlerts ?? true,
        },
        sms: {
          otp: notifications?.sms?.otp ?? true,
          loginAlerts: notifications?.sms?.loginAlerts ?? true,
          securityAlerts: notifications?.sms?.securityAlerts ?? true,
        },
        whatsapp: {
          orderAlerts: notifications?.whatsapp?.orderAlerts ?? true,
          inquiryAlerts: notifications?.whatsapp?.inquiryAlerts ?? true,
          criticalAlerts: notifications?.whatsapp?.criticalAlerts ?? true,
          adminAlerts: notifications?.whatsapp?.adminAlerts ?? true,
        }
      }
    };

    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Error fetching settings:", error);
    return { success: false, error: 'Failed to fetch settings' };
  }
}

export async function saveAllSettings(data: SettingsFormValues): Promise<{ success: boolean; error?: string }> {
  try {
    await dbConnect();

    const { general, appearance, security, notifications } = data;

    await Promise.all([
      GeneralSettings.findOneAndUpdate({}, general, { upsert: true, new: true }),
      AppearanceSettings.findOneAndUpdate({}, appearance, { upsert: true, new: true }),
      SecuritySettings.findOneAndUpdate({}, security, { upsert: true, new: true }),
      NotificationConfig.findOneAndUpdate({}, notifications, { upsert: true, new: true })
    ]);

    revalidatePath('/admin/settings');
    return { success: true };
  } catch (error: any) {
    console.error('Error saving API config:', error);
    return { success: false, error: error.message };
  }
}

export async function updateAppearanceSettings(data: any): Promise<{ success: boolean; error?: string }> {
  try {
    await dbConnect();
    let appearance = await AppearanceSettings.findOne();
    if (appearance) {
      Object.assign(appearance, data);
      await appearance.save();
    } else {
      await AppearanceSettings.create(data);
    }
    revalidatePath('/admin', 'layout');
    return { success: true };
  } catch (error: any) {
    console.error('Error auto-saving appearance:', error);
    return { success: false, error: error.message };
  }
}
