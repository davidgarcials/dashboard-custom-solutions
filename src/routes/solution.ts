import express from 'express'
import { solutionsService } from '../infrastructure/services'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('Fetching solution')
})

router.post('/create', async (req, res) => {
  try {
    const { owner } = req.body
    await solutionsService.create(owner)
    res.send('Saving a solution')
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
