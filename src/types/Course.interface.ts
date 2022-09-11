import { Task } from './Task.interface'

export interface Course {
  colorId: number
  tasks: Task[]
  zoomLink: string
}