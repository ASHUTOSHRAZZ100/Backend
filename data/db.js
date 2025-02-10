import mongoose from "mongoose";

export default async function connectToDB() {
    try {
       const c =  await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ Connected to the database ${c.connection.host}`);
    } catch (err) {
        console.log("❌ Error connecting to the database", err);
    }
}
