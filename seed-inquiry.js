const mongoose = require('mongoose');

const uri = "mongodb://ParthPlastoPack:parth12345@ac-5lthuxp-shard-00-00.p8exhpe.mongodb.net:27017,ac-5lthuxp-shard-00-01.p8exhpe.mongodb.net:27017,ac-5lthuxp-shard-00-02.p8exhpe.mongodb.net:27017/parthPlastoPack?ssl=true&replicaSet=atlas-nuhd2f-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    
    // Insert a dummy inquiry
    await db.collection('inquiries').insertOne({
      name: "John Doe (Test)",
      email: "john.test@example.com",
      phone: "+91 9876543210",
      company: "Test Company Ltd",
      type: "Product Quote",
      product: "HDPE Protein Jar 1KG",
      quantity: "5,000 pieces",
      message: "This is a test inquiry to verify the admin panel is working correctly.",
      status: "New",
      internalNotes: "",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log("Successfully added a test inquiry!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
