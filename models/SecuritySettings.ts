import mongoose, { Schema, Document } from 'mongoose';

export interface ISecuritySettings extends Document {
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  maxLoginAttempts: number;
  accountLockDuration: number;
  autoLogoutTime: number;
  sessionTimeout: number;

  createdAt: Date;
  updatedAt: Date;
}

const SecuritySettingsSchema = new Schema(
  {
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, default: '' },
    maxLoginAttempts: { type: Number, default: 5 },
    accountLockDuration: { type: Number, default: 30 }, // in minutes
    autoLogoutTime: { type: Number, default: 60 }, // in minutes
    sessionTimeout: { type: Number, default: 24 }, // in hours
  },
  { timestamps: true }
);

const SecuritySettings = (mongoose.models.SecuritySettings as mongoose.Model<ISecuritySettings>) || mongoose.model<ISecuritySettings>('SecuritySettings', SecuritySettingsSchema, 'security');
export default SecuritySettings;
