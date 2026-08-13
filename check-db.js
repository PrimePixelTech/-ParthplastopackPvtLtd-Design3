const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
    const products = await Product.find().sort({ updatedAt: -1 }).limit(3).lean();
    console.log(JSON.stringify(products.map(p => ({
      name: p.name,
      images: p.images
    })), null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
check();
