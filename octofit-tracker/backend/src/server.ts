import express from 'express'
import { connectDatabase, disconnectDatabase } from './config/database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'
import loadDotEnv from './loadEnv'

loadDotEnv()
const app = express()
app.use(express.json())

// Simple CORS middleware for development frontend at localhost:5173
app.use((req, res, next) => {
  const origin = req.get('origin')
  const allowedLocal = 'http://localhost:5173'
  if (origin && (origin === allowedLocal || origin.startsWith('http://localhost:'))) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')
    if (req.method === 'OPTIONS') return res.sendStatus(204)
  }
  next()
})

// Backend port (can be overridden by PORT in .env)
export const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

// Mount API routers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker API')
})

// Codespaces-aware API URL support using CODESPACE_NAME.
// When available, use the Codespaces hostname pattern with the app.github.dev domain
// falling back to localhost for local development.
export const API_BASE = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

export async function start() {
  try {
    await connectDatabase()
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
      console.log(`API base URL: ${API_BASE}`)
    })

    const shutdown = async () => {
      console.log('Shutting down server...')
      server.close(async () => {
        await disconnectDatabase()
        process.exit(0)
      })
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

export default app
