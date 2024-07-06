import express from 'express'
import { solutionsService } from '..'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('Fetching solution')
})

router.post('/create', (req, res) => {
  const { owner } = req.body
  solutionsService.createByOwner(owner)
  res.send('Saving a solution')
})

export default router
