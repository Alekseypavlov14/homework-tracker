import { Task as TaskType } from './../../../types/Task.interface'

export namespace Task {
  export type Create = Pick<TaskType, 'name' | 'deadline' | 'isRequired' | 'courseId'>

  export type Toggle = Pick<TaskType, 'courseId' | 'id'>

  export type Delete = Pick<TaskType, 'courseId' | 'id'>
}