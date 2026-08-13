import mongoose, { Schema, Document } from 'mongoose';

export interface IGeneralSettings extends Document {
  appName: string;
  companyName: string;
  companyAddress: string;
  gstNumber: string;
  supportEmail: string;
  supportPhone: string;
  websiteUrl: string;
  timezone: string;
  currency: string;
  language: string;
  dateFormat: string;
  timeFormat: string;
  
  logoUrl?: string;
  darkLogoUrl?: string;
  faviconUrl?: string;
  companyBannerUrl?: string;
  companyDescription?: string;

  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const GeneralSettingsSchema = new Schema(
  {
    appName: { type: String, default: 'Parth Plasto Pack Admin' },
    companyName: { type: String, default: 'Parth Plasto Pack Pvt. Ltd.' },
    companyAddress: { type: String, default: '' },
    gstNumber: { type: String, default: '' },
    supportEmail: { type: String, default: 'contact@parthplastopack.com' },
    supportPhone: { type: String, default: '+91 9876543210' },
    websiteUrl: { type: String, default: 'https://parthplastopack.com' },
    timezone: { type: String, default: 'Asia/Kolkata' },
    currency: { type: String, default: 'INR' },
    language: { type: String, default: 'en' },
    dateFormat: { type: String, default: 'DD/MM/YYYY' },
    timeFormat: { type: String, default: '12h' },
    
    logoUrl: { type: String, default: '' },
    darkLogoUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },
    companyBannerUrl: { type: String, default: '' },
    companyDescription: { type: String, default: '' },

    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      youtube: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

const GeneralSettings = (mongoose.models.GeneralSettings as mongoose.Model<IGeneralSettings>) || mongoose.model<IGeneralSettings>('GeneralSettings', GeneralSettingsSchema, 'settings');
export default GeneralSettings;
