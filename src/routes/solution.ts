import express from 'express'
import { solutionsService } from '../infrastructure/services'

const router = express.Router()

router.post('/create', async (req, res) => {
  try {
    const { email, name } = req.body

    if (!email || !name) {
      return res.status(400).json({ message: 'You must provide email and name' });
    }

    const exists = await solutionsService.findOne(email, name)

    if (exists) {
      return res.status(400).json({ message: 'Solution already exists' });
    }

    await solutionsService.create(email, name)
    res.send('Saving a solution')
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body

    if (!id) {
      return res.status(400).json({ message: 'You must valid solution id' });
    }

    const { error } = await solutionsService.delete(id)

    if (error) {
      return res.status(400).json({ message: error });
    }

    res.send('Solution deleted')
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
