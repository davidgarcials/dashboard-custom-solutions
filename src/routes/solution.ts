import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('Fetching solution')
})

router.post('/', (_req, res) => {
  res.send('Saving a solution')
})

export default router
