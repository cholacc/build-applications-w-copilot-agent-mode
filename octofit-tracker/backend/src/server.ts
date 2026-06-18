import express from 'express'
import { connectDatabase, disconnectDatabase } from './config/database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
app.use(express.json())

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
  ? `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`
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
