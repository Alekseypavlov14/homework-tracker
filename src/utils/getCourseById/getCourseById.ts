import { Course } from "../../types/Course.interface";

export function getCourseById(courses: Course[], courseId: number) {
  return courses.find(course => course.id === courseId)
}