import mongoose from 'mongoose';

const { MONGODB_URI = '' } = process?.env ?? {};
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};

const connectMongo = async () => {
  if (!MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.connection = await cached.promise;
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    cached.promise = undefined;
    console.log('Failed to connect to MongoDB', (error as Error).message);
  }
};

export default connectMongo;
