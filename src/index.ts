import express from 'express'
import solutionRouter from './routes/solution'
import { getEnvVar } from './infrastructure/config'
import { SolutionsService } from './services/solutionsService'
import { SolutionsRepository } from './repositories/solutionsRepository'

const app = express()
app.use(express.json())

const PORT = getEnvVar('PORT')

app.use('/api/solutions', solutionRouter)

// TODO - pasarle la bd
const solutionsRepository = SolutionsRepository()
export const solutionsService = SolutionsService(solutionsRepository)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
