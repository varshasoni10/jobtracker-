import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;
        if (!uri || uri.includes('cluster0.mongodb.net')) {
            const mongoServer = await MongoMemoryServer.create({
                binary: {
                    downloadDir: 'D:\\mongoms'
                }
            });
            uri = mongoServer.getUri();
            console.log('Using MongoDB Memory Server');
        }
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
