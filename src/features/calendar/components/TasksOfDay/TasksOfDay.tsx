import { FC } from 'react'
// redux
import { useSelector } from 'react-redux'
import { coursesSelector } from '../../../courses/slice/courses.slice'
// types
import { Task } from '../../../courses/components/Task/Task'
import { Date } from '../../types/Date'
import { Task as TaskType } from './../../../courses/entities/task.interface'
// utils
import { compareDates } from '../../utils/compareDates'
import { parseDate } from '../../utils/parseDate'
import styles from './TasksOfDay.module.css'
import { Title } from '../../../../components/Title/Title'

interface TasksOfDayProps {
  day: Date
}

export const TasksOfDay: FC<TasksOfDayProps> = ({ day }) => {
  const courses = useSelector(coursesSelector)

  const tasks: TaskType[] = []

  courses.forEach(course => {
    const tasksWithDeadlineToday = course.tasks.filter(task => {
      return (compareDates(parseDate(task.deadline), day) && !task.done)
    })
    tasks.push(...tasksWithDeadlineToday)
  })

  if (!tasks.length) return null
  
  return (
    <div className={styles.TasksOfDay}>
      <Title>
        Tasks with deadline today:
      </Title>

      <div className={styles.Tasks}>
        {tasks.map(task => (
          <Task 
            name={task.name}
            deadline={task.deadline}
            isRequired={task.isRequired}
            id={task.id}
            done={task.done}
            courseId={task.courseId}
          />
        ))}
      </div>
    </div>
  )
}