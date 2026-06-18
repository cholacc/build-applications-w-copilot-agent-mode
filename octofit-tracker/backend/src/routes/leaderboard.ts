import { Router, Request, Response } from 'express'
import Leaderboard from '../models/Leaderboard'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const entries = await Leaderboard.find().populate('user').lean()
  res.json({ message: 'Leaderboard', data: entries })
})

export default router
