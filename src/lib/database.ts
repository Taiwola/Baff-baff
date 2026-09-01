import mongoose from "mongoose";
import "@/lib/models" 

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

// Use global cache in dev to prevent hot-reload duplication
const mongooseCache = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = mongooseCache;
}

export default async function dbConnect(): Promise<typeof mongoose> {
  if (mongooseCache.conn) {
    // console.log("[dbConnect] Using cached connection. readyState:", mongooseCache.conn.connection.readyState);
    return mongooseCache.conn;
  }

  if (!mongooseCache.promise) {
    console.log("[dbConnect] No existing promise — creating new connection. URI host:", MONGODB_URI.replace(/\/\/.*@/, "//<credentials>@"));
    mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  } else {
    console.log("[dbConnect] Reusing in-flight connection promise.");
  }

  try {
    mongooseCache.conn = await mongooseCache.promise;
    // console.log("[dbConnect] Connected successfully. readyState:", mongooseCache.conn.connection.readyState, "| db name:", mongooseCache.conn.connection.name);
  } catch (err) {
    console.error("[dbConnect] Connection FAILED:", err);
    mongooseCache.promise = null;
    throw err;
  }

  return mongooseCache.conn;
}