import { Course } from "../entities/course.interface";

export function getCourseById(courses: Course[], courseId: number) {
  return courses.find(course => course.id === courseId)
}