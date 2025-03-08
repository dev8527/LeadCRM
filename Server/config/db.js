import mongoose from 'mongoose';
import dotenv from 'dotenv';
const DB_URL = 'mongodb://localhost:27017/leadCRM';
//console.log("DB_URL:", DB_URL);

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            //useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};


export default connectDB;
