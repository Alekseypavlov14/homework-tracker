import { useSelector } from 'react-redux'
import { coursesSelector } from '../slice/courses.slice'
import { Task } from '../entities/task.interface'

export function useActiveTasks() {
  const courses = useSelector(coursesSelector)

  const activeTasks: Task[] = []

  courses.forEach(course => {
    const tasks = course.tasks.filter(task => !task.done)
    activeTasks.push(...tasks)
  })

  return activeTasks
}