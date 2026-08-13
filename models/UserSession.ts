import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSession extends Document {
  userId: mongoose.Types.ObjectId;
  sessionId: string;
  userAgent: string;
  ipAddress: string;
  device: string;
  browser: string;
  location: string;
  lastActive: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sessionId: { type: String, required: true, unique: true },
    userAgent: { type: String, default: 'Unknown' },
    ipAddress: { type: String, default: 'Unknown' },
    device: { type: String, default: 'Unknown' },
    browser: { type: String, default: 'Unknown' },
    location: { type: String, default: 'Unknown' },
    lastActive: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UserSession = (mongoose.models.UserSession as mongoose.Model<IUserSession>) || mongoose.model<IUserSession>('UserSession', UserSessionSchema);
export default UserSession;
