import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_API_MONGODB_URL as string;

let cached = (global as any).mongoose as {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    // No options needed here
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        return mongoose;
    });

    cached.conn = await cached.promise;
    return cached.conn;
};
