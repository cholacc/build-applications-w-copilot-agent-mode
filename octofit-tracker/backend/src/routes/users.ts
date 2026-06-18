import { Router, Request, Response } from 'express'
import User from '../models/User'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().lean()
  res.json({ message: 'List users', data: users })
})

router.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body)
  await user.save()
  res.status(201).json({ message: 'Create user', body: user })
})

export default router
