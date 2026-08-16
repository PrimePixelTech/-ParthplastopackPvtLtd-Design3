const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uri = "mongodb://localhost:27017/parth-plasto-pack";

async function run() {
  try {
    console.log("Connecting to local DB...");
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    console.log("Users in DB count:", users.length);

    if (users.length === 0) {
      console.log("No users found. Creating admin user...");
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.collection('users').insertOne({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log("User created! Email: admin@example.com, Password: admin123");
    } else {
      console.log("User found:", users[0].email);
      console.log("Checking password for user...");
      const isMatch = await bcrypt.compare('admin123', users[0].password);
      console.log("Does 'admin123' match their password hash?", isMatch);
      if (!isMatch) {
         const hashedPassword = await bcrypt.hash('admin123', 10);
         await db.collection('users').updateOne({ _id: users[0]._id }, { $set: { password: hashedPassword } });
         console.log("Updated password to admin123 for " + users[0].email);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
