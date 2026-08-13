import mongoose, { Schema, Document } from 'mongoose';

export interface INotificationConfig extends Document {
  email: {
    securityAlerts: boolean;
    orders: boolean;
    inquiry: boolean;
    inventory: boolean;
    marketing: boolean;
    weeklyReport: boolean;
    monthlyReport: boolean;
    serverErrors: boolean;
    databaseErrors: boolean;
  };
  push: {
    desktopNotifications: boolean;
    browserNotifications: boolean;
    maintenance: boolean;
    systemAlerts: boolean;
  };
  sms: {
    otp: boolean;
    loginAlerts: boolean;
    securityAlerts: boolean;
  };
  whatsapp: {
    orderAlerts: boolean;
    inquiryAlerts: boolean;
    criticalAlerts: boolean;
    adminAlerts: boolean;
  };

  createdAt: Date;
  updatedAt: Date;
}

const NotificationConfigSchema = new Schema(
  {
    email: {
      securityAlerts: { type: Boolean, default: true },
      orders: { type: Boolean, default: true },
      inquiry: { type: Boolean, default: true },
      inventory: { type: Boolean, default: true },
      marketing: { type: Boolean, default: false },
      weeklyReport: { type: Boolean, default: false },
      monthlyReport: { type: Boolean, default: false },
      serverErrors: { type: Boolean, default: true },
      databaseErrors: { type: Boolean, default: true },
    },
    push: {
      desktopNotifications: { type: Boolean, default: false },
      browserNotifications: { type: Boolean, default: false },
      maintenance: { type: Boolean, default: true },
      systemAlerts: { type: Boolean, default: true },
    },
    sms: {
      otp: { type: Boolean, default: true },
      loginAlerts: { type: Boolean, default: true },
      securityAlerts: { type: Boolean, default: true },
    },
    whatsapp: {
      orderAlerts: { type: Boolean, default: true },
      inquiryAlerts: { type: Boolean, default: true },
      criticalAlerts: { type: Boolean, default: true },
      adminAlerts: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

const NotificationConfig = (mongoose.models.NotificationConfig as mongoose.Model<INotificationConfig>) || mongoose.model<INotificationConfig>('NotificationConfig', NotificationConfigSchema, 'notifications');
export default NotificationConfig;
