const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({ email: 'admin@parthplastopack.com' });
    console.log('User from DB:', user);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkUser();
