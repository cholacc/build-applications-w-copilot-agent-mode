import { Router, Request, Response } from 'express'
import Activity from '../models/Activity'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user').lean()
  res.json({ message: 'List activities', data: activities })
})

router.post('/', async (req: Request, res: Response) => {
  const activity = new Activity(req.body)
  await activity.save()
  res.status(201).json({ message: 'Create activity', body: activity })
})

export default router
