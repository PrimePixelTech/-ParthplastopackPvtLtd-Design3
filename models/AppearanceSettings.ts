import mongoose, { Schema, Document } from 'mongoose';

export interface IAppearanceSettings extends Document {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  layoutDensity: 'comfortable' | 'compact';
  sidebar: 'expanded' | 'collapsed' | 'mini';
  navbar: 'sticky' | 'fixed' | 'transparent';
  animationsEnabled: boolean;
  borderRadius: number;
  fontSize: number;
  glassEffect: boolean;
  blurAmount: number;

  createdAt: Date;
  updatedAt: Date;
}

const AppearanceSettingsSchema = new Schema(
  {
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    accentColor: { type: String, default: 'purple' },
    layoutDensity: { type: String, enum: ['comfortable', 'compact'], default: 'comfortable' },
    sidebar: { type: String, enum: ['expanded', 'collapsed', 'mini'], default: 'expanded' },
    navbar: { type: String, enum: ['sticky', 'fixed', 'transparent'], default: 'sticky' },
    animationsEnabled: { type: Boolean, default: true },
    borderRadius: { type: Number, default: 8 },
    fontSize: { type: Number, default: 14 },
    glassEffect: { type: Boolean, default: true },
    blurAmount: { type: Number, default: 10 },
  },
  { timestamps: true }
);

const AppearanceSettings = (mongoose.models.AppearanceSettings as mongoose.Model<IAppearanceSettings>) || mongoose.model<IAppearanceSettings>('AppearanceSettings', AppearanceSettingsSchema, 'appearance');
export default AppearanceSettings;
