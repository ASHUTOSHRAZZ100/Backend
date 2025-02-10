import mongoose from "mongoose";

export default async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "backendapi" });
        console.log("✅ Connected to the database");
    } catch (err) {
        console.log("❌ Error connecting to the database", err);
    }
}
