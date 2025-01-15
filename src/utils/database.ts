import mongoose from 'mongoose';
import SETTINGS from './constants/settings';

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(SETTINGS.MONGO_URI as string);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectToDatabase;
