import { Task } from './task.interface'

export interface Course {
  name: string
  id: number
  colorId: number
  tasks: Task[]
  zoomLink: string
}