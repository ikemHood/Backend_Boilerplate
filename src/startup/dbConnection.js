import mongoose from "mongoose";
import config from 'config';

const connectDB = async () => {
  const MONGODB_URI = config.get('mongo_db.uri')
  
  const conn = await mongoose.connect(MONGODB_URI);

  mongoose.set("strictQuery", false);

  console.log(`MongoDB Connected: ${conn.connection.host}`.green.bold);
};

export default connectDB
