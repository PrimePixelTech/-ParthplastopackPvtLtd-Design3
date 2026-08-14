const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fixRole() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // We update the user we just created to have the correct SUPER_ADMIN role uppercase
    const db = mongoose.connection.db;
    const result = await db.collection('users').updateOne(
      { email: 'admin@parthplastopack.com' },
      { $set: { role: 'SUPER_ADMIN' } }
    );
    
    console.log(`Updated ${result.modifiedCount} user(s) to SUPER_ADMIN.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

fixRole();
