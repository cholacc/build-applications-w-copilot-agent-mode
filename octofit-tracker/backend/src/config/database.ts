import mongoose from 'mongoose'

const DB_NAME = process.env.DB_NAME || 'octofit_db'
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/${DB_NAME}`

export async function connectDatabase(): Promise<typeof mongoose> {
  return mongoose.connect(MONGO_URI).then(() => {
    console.log(`Connected to MongoDB database ${DB_NAME} at ${MONGO_URI}`)
    return mongoose
  })
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}

export { mongoose, MONGO_URI, DB_NAME }
