import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
app.use(express.json())

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

// Mount API routers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker API')
})

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB at', MONGO_URI))
  .catch((err) => console.error('MongoDB connection error:', err))

// Codespaces-aware API URL support using CODESPACE_NAME
const API_BASE = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-${PORT}.githubpreview.dev`
  : `http://localhost:${PORT}`

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`API base URL: ${API_BASE}`)
})
