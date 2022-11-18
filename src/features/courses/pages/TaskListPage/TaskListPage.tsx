import { FC, useState } from 'react'
import { Header } from '../../../../components/Header/Header'
import { Task } from '../../components/Task/Task'
import { Calendar } from '../../../calendar/components/Calendar/Calendar'
import { parseDate } from '../../../calendar/utils/parseDate'
import { Title } from '../../../../components/Title/Title'
import { useCoursesWithActiveTasks } from '../../hooks/useCoursesWithActiveTasks'
import type { Date } from '../../../calendar/types/Date'
import styles from './TaskListPage.module.css'

interface TaskListPageProps {}

export const TaskListPage: FC<TaskListPageProps> = () => {
  const coursesWithActiveTasks = useCoursesWithActiveTasks()

  const [focusedDate, setFocusedDate] = useState<Date>(parseDate(window.Date.now()))

  return (
    <div className={styles.TaskListPage}>
      <Header />

      <div className={styles.Calendar}>
        <Calendar 
          focusedDate={focusedDate} 
          setFocusedDate={setFocusedDate} 
        />
      </div>

      <div className={styles.Tasks}>
        {Boolean(coursesWithActiveTasks.length) && (
          <Title bold>All tasks:</Title>
        )}
        
        {coursesWithActiveTasks.map(course => (
          <div className={styles.TaskSection} key={course.id}>
            <div className={styles.TaskCourseName}>{course.name}</div>

            {course.tasks.map(task => (
              <div 
                key={`${task.courseId}-${task.id}`}
                className={styles.TaskContainer}
              >
                <Task
                  name={task.name}
                  deadline={task.deadline}
                  courseId={task.courseId}
                  isRequired={task.isRequired}
                  done={task.done}
                  id={task.id}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
