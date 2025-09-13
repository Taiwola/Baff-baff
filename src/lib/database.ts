import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI as string

if (!MONGODB_URI) {
  throw new Error('MongoDB connection error: Please define the MONGODB_URI environment variable inside .env.local')
}

// Module-level cache
const mongooseCache: MongooseCache = {
  conn: null,
  promise: null
}

async function dbConnect(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (mongooseCache.conn) {
    return mongooseCache.conn
  }

  // Create new connection promise if none exists
  if (!mongooseCache.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
      socketTimeoutMS: 45000 // 45 seconds timeout for sockets
    }

    mongooseCache.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('MongoDB connected successfully')
        return mongooseInstance
      })
      .catch((error) => {
        // Clean up the promise on error
        mongooseCache.promise = null

        if (error.name === 'MongoNetworkError') {
          throw new Error(
            'Database connection error: Unable to connect to MongoDB server. Please check your network connection and ensure MongoDB is running.'
          )
        }

        if (error.name === 'MongooseServerSelectionError') {
          throw new Error(
            'Database server error: Unable to connect to MongoDB. Please check your connection string and ensure the database server is accessible.'
          )
        }

        if (error.name === 'MongoParseError') {
          throw new Error('Database configuration error: Invalid MongoDB connection string. Please check your MONGODB_URI environment variable.')
        }

        throw new Error(`Database connection failed: ${error.message}`)
      })
  }

  try {
    // Wait for the connection promise to resolve
    mongooseCache.conn = await mongooseCache.promise
  } catch (error) {
    // Reset the promise on error to allow retries
    mongooseCache.promise = null

    if (error instanceof Error) {
      // Re-throw our custom error messages
      throw error
    }

    throw new Error('Database connection failed: An unknown error occurred')
  }

  // Set up event listeners for connection issues
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected')
    // Reset cache on disconnect to allow reconnection
    mongooseCache.conn = null
    mongooseCache.promise = null
  })

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected')
  })

  return mongooseCache.conn
}

// Optional: Add a function to check connection status
export function getDbConnectionStatus(): string {
  if (mongooseCache.conn) {
    return mongoose.connection.readyState === 1 ? 'connected' : 'connecting'
  }
  return 'disconnected'
}

// Optional: Add a function to close connection
export async function dbDisconnect(): Promise<void> {
  if (mongooseCache.conn) {
    await mongoose.disconnect()
    mongooseCache.conn = null
    mongooseCache.promise = null
    console.log('✅ MongoDB disconnected gracefully')
  }
}

export default dbConnect
