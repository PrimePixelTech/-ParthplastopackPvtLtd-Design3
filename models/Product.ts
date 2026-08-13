import mongoose, { Model } from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  shortDescription: { type: String },
  description: { type: String }, // Rich text
  images: [{ type: String }],
  videoUrl: { type: String },
  specifications: {
    overFlowVolume: { type: String },
    heightOfContainer: { type: String },
    neckSize: { type: String },
    maximumDiaOfContainer: { type: String },
    wallThickness: { type: String },
    capFitting: { type: String },
    labelType: { type: String },
    weightOfContainer: { type: String },
    powderVolume: { type: String },
    material: { type: String },
  },
  features: [{ type: String }],
  applications: [{ type: String }],
  industries: [{ type: String }],
  moq: { type: Number, default: 1000 },
  price: { type: Number },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  status: { type: String, enum: ['ACTIVE', 'DRAFT', 'ARCHIVED'], default: 'DRAFT' },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: String },
}, { timestamps: true });

const Product = (mongoose.models.Product || mongoose.model('Product', ProductSchema)) as Model<any>;
export default Product;
