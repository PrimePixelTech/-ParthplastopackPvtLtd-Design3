import * as z from 'zod';

export const generalSchema = z.object({
  appName: z.string().min(2, 'Application name is required'),
  companyName: z.string().min(2, 'Company name is required'),
  companyAddress: z.string().optional(),
  gstNumber: z.string().optional(),
  supportEmail: z.string().email('Valid email is required'),
  supportPhone: z.string().min(10, 'Valid phone number is required'),
  websiteUrl: z.string().url('Valid URL is required'),
  timezone: z.string(),
  currency: z.string(),
  language: z.string(),
  dateFormat: z.string(),
  timeFormat: z.string(),
  
  logoUrl: z.string().optional(),
  darkLogoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  companyBannerUrl: z.string().optional(),
  companyDescription: z.string().optional(),

  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    twitter: z.string().optional(),
  }).optional(),
});

export const securitySchema = z.object({
  twoFactorEnabled: z.boolean().default(false),
  maxLoginAttempts: z.number().min(1).max(20).default(5),
  accountLockDuration: z.number().min(1).default(30),
  autoLogoutTime: z.number().min(5).default(60),
  sessionTimeout: z.number().min(1).default(24),
});

export const appearanceSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  accentColor: z.enum(['blue', 'indigo', 'purple', 'emerald', 'green', 'orange', 'amber', 'rose', 'pink', 'red', 'cyan', 'slate']).default('purple'),
  layoutDensity: z.enum(['comfortable', 'compact']).default('comfortable'),
  sidebar: z.enum(['expanded', 'collapsed', 'mini']).default('expanded'),
  navbar: z.enum(['sticky', 'fixed', 'transparent']).default('sticky'),
  animationsEnabled: z.boolean().default(true),
  borderRadius: z.number().min(0).max(32).default(8),
  fontSize: z.number().min(10).max(24).default(14),
  glassEffect: z.boolean().default(true),
  blurAmount: z.number().min(0).max(20).default(10),
});

export const notificationSchema = z.object({
  email: z.object({
    securityAlerts: z.boolean().default(true),
    orders: z.boolean().default(true),
    inquiry: z.boolean().default(true),
    inventory: z.boolean().default(true),
    marketing: z.boolean().default(false),
    weeklyReport: z.boolean().default(false),
    monthlyReport: z.boolean().default(false),
    serverErrors: z.boolean().default(true),
    databaseErrors: z.boolean().default(true),
  }),
  push: z.object({
    desktopNotifications: z.boolean().default(false),
    browserNotifications: z.boolean().default(false),
    maintenance: z.boolean().default(true),
    systemAlerts: z.boolean().default(true),
  }),
  sms: z.object({
    otp: z.boolean().default(true),
    loginAlerts: z.boolean().default(true),
    securityAlerts: z.boolean().default(true),
  }),
  whatsapp: z.object({
    orderAlerts: z.boolean().default(true),
    inquiryAlerts: z.boolean().default(true),
    criticalAlerts: z.boolean().default(true),
    adminAlerts: z.boolean().default(true),
  }),
});

export const settingsFormSchema = z.object({
  general: generalSchema,
  security: securitySchema,
  appearance: appearanceSchema,
  notifications: notificationSchema,
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
