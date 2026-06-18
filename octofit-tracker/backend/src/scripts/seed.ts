/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose'
import User from '../models/User'
import Team from '../models/Team'
import Workout from '../models/Workout'
import Activity from '../models/Activity'
import Leaderboard from '../models/Leaderboard'
import express from 'express'
import supertest from 'supertest'

const MONGO_URI = process.env.MONGO_URI || (() => {
  try {
    const data = require('fs').readFileSync('.mongo_uri', 'utf8')
    if (data) return data
  } catch (e) {
    // ignore
  }
  return 'mongodb://localhost:27017/octofit_db'
})()

async function main() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO_URI)
  console.log('Connected to', MONGO_URI)

  // Clear existing
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  // Create users
  const alice = await User.create({ name: 'Alice Runner', email: 'alice@example.com' })
  const bob = await User.create({ name: 'Bob Cyclist', email: 'bob@example.com' })
  const carol = await User.create({ name: 'Carol Swimmer', email: 'carol@example.com' })

  // Teams
  const redTeam = await Team.create({ name: 'Red Rockets', members: [alice._id, bob._id] })
  const blueTeam = await Team.create({ name: 'Blue Whales', members: [carol._id] })

  // Workouts
  const w1 = await Workout.create({ name: 'Morning Run', description: 'Easy 5k', durationMinutes: 30 })
  const w2 = await Workout.create({ name: 'Interval Cycling', description: 'High intensity intervals', durationMinutes: 45 })

  // Activities
  await Activity.create({ user: alice._id, type: 'run', durationMinutes: 32, distanceKm: 5.1, performedAt: new Date() })
  await Activity.create({ user: bob._id, type: 'cycle', durationMinutes: 50, distanceKm: 20.2, performedAt: new Date() })
  await Activity.create({ user: carol._id, type: 'swim', durationMinutes: 25, performedAt: new Date() })

  // Leaderboard
  await Leaderboard.create({ user: alice._id, score: 1500, rank: 1 })
  await Leaderboard.create({ user: bob._id, score: 1200, rank: 2 })
  await Leaderboard.create({ user: carol._id, score: 900, rank: 3 })

  console.log('Seed data inserted')

  // Verify data via in-memory API route responses
  const app = express()
  app.use(express.json())
  // mount routes
  const usersRouter = (await import('../routes/users')).default
  const teamsRouter = (await import('../routes/teams')).default
  const activitiesRouter = (await import('../routes/activities')).default
  const leaderboardRouter = (await import('../routes/leaderboard')).default
  const workoutsRouter = (await import('../routes/workouts')).default

  app.use('/api/users', usersRouter)
  app.use('/api/teams', teamsRouter)
  app.use('/api/activities', activitiesRouter)
  app.use('/api/leaderboard', leaderboardRouter)
  app.use('/api/workouts', workoutsRouter)

  const request = supertest(app)

  const usersRes = await request.get('/api/users')
  console.log('/api/users ->', usersRes.body.data.length, 'users')

  const teamsRes = await request.get('/api/teams')
  console.log('/api/teams ->', teamsRes.body.data.length, 'teams')

  const activitiesRes = await request.get('/api/activities')
  console.log('/api/activities ->', activitiesRes.body.data.length, 'activities')

  const leaderboardRes = await request.get('/api/leaderboard')
  console.log('/api/leaderboard ->', leaderboardRes.body.data.length, 'entries')

  const workoutsRes = await request.get('/api/workouts')
  console.log('/api/workouts ->', workoutsRes.body.data.length, 'workouts')

  await mongoose.disconnect()
  console.log('Disconnected from database')
}

main().catch((err) => {
  console.error('Seeding error:', err)
  process.exit(1)
})
