import { FC } from 'react'
// types
import { Course } from '../../../courses/entities/course.interface'
import { Task } from '../../../courses/components/Task/Task'
import { Date } from '../../types/Date'
// components
import { Title } from '../../../../components/Title/Title'
// utils
import { areDatesEqual } from '../../utils/areDatesEqual'
import { parseDate } from '../../utils/parseDate'
// hooks
import { useCoursesWithActiveTasks } from '../../../courses/hooks/useCoursesWithActiveTasks'
import styles from './TasksOfDay.module.css'

interface TasksOfDayProps {
  day: Date
}

export const TasksOfDay: FC<TasksOfDayProps> = ({ day }) => {
  const coursesWithActiveTasks: Course[] = useCoursesWithActiveTasks()

  const coursesWithActiveTasksToday = coursesWithActiveTasks.map(course => ({
    ...course,
    tasks: course.tasks.filter(task => areDatesEqual(parseDate(task.deadline), day))
  })).filter(course => course.tasks.length)

  if (!coursesWithActiveTasksToday.length) return null

  return (
    <div className={styles.TasksOfDay}>
      <Title bold>
        Tasks with deadline at this day:
      </Title>

      {coursesWithActiveTasksToday.map(course => (
        <div 
          className={styles.CourseSection}
          key={course.id}
        >
          <div className={styles.CourseName}>
            {course.name}
          </div>

          <div className={styles.CourseTasks}>
            {course.tasks.map(task => (
              <div 
                className={styles.Task}
                key={`${task.courseId}-${task.id}`}
              >
                <Task 
                  name={task.name}
                  deadline={task.deadline}
                  isRequired={task.isRequired}
                  id={task.id}
                  done={task.done}
                  courseId={task.courseId}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}