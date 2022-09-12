import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Header } from '../../components/Header/Header'
import { Task } from '../../components/Task/Task'
import { coursesSelector } from '../../store/slices/courses/coursesSlice'
import { getCourseById } from '../../utils/getCourseById/getCourseById'
import styles from './TaskList.module.css'

interface TaskListProps {}

export const TaskList: FC<TaskListProps> = () => {
  const courses = useSelector(coursesSelector)

  const tasks = courses
    .map(course => course.tasks) 
    .reduce((tasks, task) => tasks.concat(task), [])

  return (
    <div className={styles.TaskList}>
      <Header />

      <div className={styles.Tasks}>
        {tasks.map(task => (
          <div className={styles.TaskContainer}>
            <div className={styles.TaskCourseName}>
              {getCourseById(courses, task.courseId)?.name}
            </div>

            <Task 
              name={task.name}
              deadline={task.deadline}
              courseId={task.courseId}
              isRequired={task.isRequired}
              done={task.done}
              id={task.id}
              key={`${task.courseId}.${task.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}