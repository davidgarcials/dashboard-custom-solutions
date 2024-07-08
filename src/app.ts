import express from 'express'
import authMiddleware from './infrastructure/authMiddleware'
import { mongoConnection } from './infrastructure/mongo'
import solutionRouter from './routes/solution'
import userRouter from './routes/user'

const app = express()

// Middleware
app.use(express.json())

mongoConnection.initClient().then(() => {
  console.log('Connected to Mongodb')
}).catch(e => {
  console.log('Error connecting to Mongo ', e)
})

app.use('/users', userRouter)
app.use('/solutions', authMiddleware, solutionRouter)

export default app
