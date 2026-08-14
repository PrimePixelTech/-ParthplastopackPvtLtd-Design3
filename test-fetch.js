const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const ProductSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const CategorySchema = new mongoose.Schema({}, { strict: false });
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

async function testFetch() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const products = await Product.find().populate({ path: 'category', model: Category, select: 'title' }).sort({ createdAt: -1 }).lean();
    console.log('Products fetched:', products.length);
    
    const categories = await Category.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
    console.log('Categories fetched:', categories.length);
    
    process.exit(0);
  } catch (error) {
    console.error('Error fetching:', error);
    process.exit(1);
  }
}

testFetch();
