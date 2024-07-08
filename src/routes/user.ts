import { Request, Response, Router } from 'express'
import { userService } from '../infrastructure/services'

const router = Router()

router.post('/create', async (req: Request, res: Response) => {
  try {
    await userService.createUser(req.body)
    res.status(200).send("Success user created")
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
