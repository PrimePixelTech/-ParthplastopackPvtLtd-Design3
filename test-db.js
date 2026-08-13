const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uri = "mongodb://ParthPlastoPack:Nirmal%4018900@ac-5lthuxp-shard-00-00.p8exhpe.mongodb.net:27017,ac-5lthuxp-shard-00-01.p8exhpe.mongodb.net:27017,ac-5lthuxp-shard-00-02.p8exhpe.mongodb.net:27017/parthPlastoPack?ssl=true&replicaSet=atlas-nuhd2f-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    console.log("Users in DB count:", users.length);

    if (users.length === 0) {
      console.log("No users found. Creating admin user...");
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.collection('users').insertOne({
        name: 'Super Admin',
        email: 'admin@parthplastopack.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log("User created!");
    } else {
      console.log("User found:", users[0].email);
      console.log("Checking password for user...");
      const isMatch = await bcrypt.compare('admin123', users[0].password);
      console.log("Does 'admin123' match their password hash?", isMatch);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
