import { Router, Request, Response } from 'express'
import Team from '../models/Team'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members').lean()
  res.json({ message: 'List teams', data: teams })
})

router.post('/', async (req: Request, res: Response) => {
  const team = new Team(req.body)
  await team.save()
  res.status(201).json({ message: 'Create team', body: team })
})

export default router
