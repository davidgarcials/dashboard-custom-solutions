import { Widget } from './widgets'

export interface Screen {
  name: string
  widgets: Widget[]
  createdAt: Date
}
