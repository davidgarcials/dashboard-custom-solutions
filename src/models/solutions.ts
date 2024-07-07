import { Screen } from './screens'

export interface Solution {
  id: string
  name: string
  email: string
  screens?: Screen[]
}
