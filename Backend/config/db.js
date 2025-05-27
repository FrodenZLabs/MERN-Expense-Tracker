import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to Database.");
  } catch (error) {
    console.log("❌ Error connecting to Database: ", error);
    process.exit(1);
  }
};

export default connectDB;
