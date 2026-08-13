import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  user: string;
  action: string;
  ipAddress: string;
  device: string;
  browser: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivityLogSchema = new Schema(
  {
    user: { type: String, required: true },
    action: { type: String, required: true },
    ipAddress: { type: String, default: 'Unknown' },
    device: { type: String, default: 'Unknown' },
    browser: { type: String, default: 'Unknown' },
  },
  { timestamps: true }
);

const ActivityLog = (mongoose.models.ActivityLog as mongoose.Model<IActivityLog>) || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema, 'activityLogs');
export default ActivityLog;
