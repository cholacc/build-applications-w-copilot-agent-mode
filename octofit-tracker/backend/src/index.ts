import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker API')
})

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB at', MONGO_URI))
  .catch((err) => console.error('MongoDB connection error:', err))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
