import { Course as CourseType } from '../entities/course.interface'

export namespace Course {
  export type Create = Pick<CourseType, 'name' | 'zoomLink' | 'colorId'>

  export type Delete = Pick<CourseType, 'id'> 
}