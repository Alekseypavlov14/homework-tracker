import { Task } from './Task.interface'

export interface Course {
  name: string
  colorId: number
  tasks: Task[]
  zoomLink: string
}