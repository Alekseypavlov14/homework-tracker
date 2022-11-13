import { Course as CourseType } from '../entities/course.interface'

export namespace ZoomLink {
  export type Update = Pick<CourseType, 'id' | 'zoomLink'>
}