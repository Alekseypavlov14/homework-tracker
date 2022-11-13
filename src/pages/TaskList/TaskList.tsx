import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Header } from '../../components/Header/Header'
import { Task } from '../../features/courses/components/Task/Task'
import { Task as TaskType } from './../../features/courses/entities/task.interface'
import { coursesSelector } from './../../features/courses/slice/courses.slice'
import { Calendar } from '../../features/calendar/components/Calendar/Calendar'
import styles from './TaskList.module.css'

interface TaskListProps {}

export const TaskList: FC<TaskListProps> = () => {
  const courses = useSelector(coursesSelector)

  const taskActiveFilterFunc = (task: TaskType) => !task.done

  const coursesWithActiveTasks = courses.filter(course => {
    return course.tasks.filter(taskActiveFilterFunc).length
  })

  return (
    <div className={styles.TaskList}>
      <Header />

      <div className={styles.Calendar}>
        <Calendar />
      </div>

      <div className={styles.Tasks}>
        {coursesWithActiveTasks.map(course => (
          <div className={styles.TaskSection} key={course.id}>
            <div className={styles.TaskCourseName}>{course.name}</div>

            {course.tasks.filter(taskActiveFilterFunc).map(task => (
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
                  key={`${task.courseId}-${task.id}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
