import mongoose, { Model } from 'mongoose';

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  banner: { type: String },
  sortOrder: { type: Number, default: 0 },
  seoTitle: { type: String },
  seoDescription: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Category = (mongoose.models.Category || mongoose.model('Category', CategorySchema)) as Model<any>;
export default Category;
