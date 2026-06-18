import { Router, Request, Response } from 'express'
import Workout from '../models/Workout'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean()
  res.json({ message: 'List workouts', data: workouts })
})

router.post('/', async (req: Request, res: Response) => {
  const workout = new Workout(req.body)
  await workout.save()
  res.status(201).json({ message: 'Create workout', body: workout })
})

export default router
