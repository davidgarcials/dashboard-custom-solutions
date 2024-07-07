import { Request, Response, Router } from 'express'
import { userService } from '../infrastructure/services'

const router = Router()

router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id)
    res.json(user)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/users', async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body)
    res.status(201).json(newUser)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const token = await userService.loginUser(email, password)
    if (token) {
      res.json({ token })
    } else {
      res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
