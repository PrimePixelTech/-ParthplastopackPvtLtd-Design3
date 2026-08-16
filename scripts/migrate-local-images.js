const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migrate() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;

    const products = await db.collection('products').find({}).toArray();
    console.log(`Found ${products.length} products to check.`);

    for (const product of products) {
      if (!product.images || !Array.isArray(product.images) || product.images.length === 0) continue;

      let hasChanges = false;
      const updatedImages = [];

      for (const imgUrl of product.images) {
        if (typeof imgUrl === 'string' && imgUrl.startsWith('/uploads/')) {
          const localPath = path.join(__dirname, '..', 'public', imgUrl);
          if (fs.existsSync(localPath)) {
            console.log(`Uploading ${imgUrl} for product "${product.name}" to Cloudinary...`);
            const uploadRes = await cloudinary.uploader.upload(localPath, {
              folder: 'admin_uploads',
            });
            console.log(`Uploaded -> ${uploadRes.secure_url}`);
            updatedImages.push(uploadRes.secure_url);
            hasChanges = true;
          } else {
            console.warn(`Local file ${localPath} does not exist. Keeping original.`);
            updatedImages.push(imgUrl);
          }
        } else {
          updatedImages.push(imgUrl);
        }
      }

      if (hasChanges) {
        await db.collection('products').updateOne(
          { _id: product._id },
          { $set: { images: updatedImages, updatedAt: new Date() } }
        );
        console.log(`Updated product "${product.name}" in database.`);
      }
    }

    const categories = await db.collection('categories').find({}).toArray();
    console.log(`Found ${categories.length} categories to check.`);

    for (const category of categories) {
      if (category.image && typeof category.image === 'string' && category.image.startsWith('/uploads/')) {
        const localPath = path.join(__dirname, '..', 'public', category.image);
        if (fs.existsSync(localPath)) {
          console.log(`Uploading category image ${category.image} for "${category.title}" to Cloudinary...`);
          const uploadRes = await cloudinary.uploader.upload(localPath, {
            folder: 'admin_uploads',
          });
          await db.collection('categories').updateOne(
            { _id: category._id },
            { $set: { image: uploadRes.secure_url, updatedAt: new Date() } }
          );
          console.log(`Updated category "${category.title}" with Cloudinary URL.`);
        }
      }
    }

    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrate();
