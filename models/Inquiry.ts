import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  type: 'Product Quote' | 'General Contact';
  product?: string;
  quantity?: string;
  subject?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Sample Sent' | 'Quote Sent' | 'Deal Closed';
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    type: { type: String, enum: ['Product Quote', 'General Contact'], required: true },
    product: { type: String },
    quantity: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['New', 'Contacted', 'Sample Sent', 'Quote Sent', 'Deal Closed'],
      default: 'New'
    },
    internalNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

const InquiryModel = (mongoose.models.Inquiry as mongoose.Model<IInquiry>) || mongoose.model<IInquiry>('Inquiry', InquirySchema);
export default InquiryModel;
