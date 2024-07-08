import { Screen } from './screens'

export interface Solution {
  id?: string
  name: string
  owner: string
  screens?: Screen[]
}
