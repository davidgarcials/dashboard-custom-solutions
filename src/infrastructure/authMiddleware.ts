import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getEnvVar } from './config'

interface AuthRequest extends Request {
  user?: string
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, getEnvVar('JWT_SECRET')) as { id: string }
    req.user = decoded.id
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' })
  }
}

export default authMiddleware
