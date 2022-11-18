import { useSelector } from 'react-redux'
import { coursesSelector } from '../slice/courses.slice'

export function useCoursesWithActiveTasks() {
  const courses = useSelector(coursesSelector)

  const coursesWithActiveTasks = courses.filter(course => {
    return course.tasks.filter(task => !task.done).length
  })

  return coursesWithActiveTasks.map(course => ({
    ...course,
    tasks: course.tasks.filter(task => !task.done)
  }))
}