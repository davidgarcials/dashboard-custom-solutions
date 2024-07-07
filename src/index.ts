import app from './app'
import { getEnvVar } from './infrastructure/config'

const PORT = getEnvVar('PORT')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
