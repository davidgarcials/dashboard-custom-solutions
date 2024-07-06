import express from 'express'
import solutionRouter from './routes/solution'
import { getEnvVar } from './infrastructure/config'

const app = express()
app.use(express.json())

const PORT = getEnvVar('PORT')

app.use('/api/solutions', solutionRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
