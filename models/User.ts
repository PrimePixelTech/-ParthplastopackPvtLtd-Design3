import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username?: string;
  phone?: string;
  department?: string;
  bio?: string;
  profileImage?: string;
  password?: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'SALES' | 'MARKETING' | 'EMPLOYEE';
  lastLogin?: Date;
  isActive: boolean;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    username: { type: String },
    phone: { type: String },
    department: { type: String },
    bio: { type: String },
    profileImage: { type: String },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'ADMIN', 'SALES', 'MARKETING', 'EMPLOYEE'],
      default: 'EMPLOYEE',
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
