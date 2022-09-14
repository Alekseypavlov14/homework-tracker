import { Course as CourseType } from './../../../types/Course.interface'

export namespace ZoomLink {
  export type Update = Pick<CourseType, 'id' | 'zoomLink'>
}