import { FC, useState, useEffect, useRef } from 'react'
import { colorDefaultSelector, colorsSelector } from '../../store/slices/colors/colorsSlice'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Task as TaskType } from '../../types/Task.interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { coursesSelector } from '../../store/slices/courses/coursesSlice'
import { getCourseById } from '../../utils/getCourseById/getCourseById'
import { getColorById } from '../../utils/getColorById/getColorById'
import { TaskPalette } from '../../components/TaskPalette/TaskPalette'
import { useSelector } from 'react-redux'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Course } from '../../types/Course.interface'
import { Task } from '../../components/Task/Task'
import styles from './CoursePage.module.css'

interface CoursePageProps {}

export const CoursePage: FC<CoursePageProps> = () => {
  const [course, setCourse] = useState<Course | null>(null)
  const coursePageRef = useRef<HTMLDivElement>(null)
  
  const { id } = useParams()
  const navigate = useNavigate()
  
  const courses = useSelector(coursesSelector)
  const colors = useSelector(colorsSelector)
  const defaultColor = useSelector(colorDefaultSelector)

  useEffect(() => {
    const course = getCourseById(courses, Number(id))
    if (!course) return navigate('/')

    setCourse(course)

    const color = getColorById(colors, defaultColor, course.colorId)
    coursePageRef.current?.style.setProperty('--color', color)
  }, [colors, defaultColor, courses, navigate, id])

  function orderTasks(tasks: TaskType[] | undefined) {
    if (!tasks) return []

    const notDoneTasks = tasks.filter(task => !task.done)
    const doneTasks = tasks.filter(task => task.done)

    const resultTasksArray = notDoneTasks.concat(doneTasks)
    return resultTasksArray
  }

  return (
    <div className={styles.CoursePage} ref={coursePageRef}>
      <div className={styles.CourseHeader}>
        <div className={styles.CourseName}>
          {course?.name}
        </div>
        <Link className={styles.CourseSettings} to='settings'>
          <FontAwesomeIcon icon={faEllipsisV} />
        </Link>
      </div>

      <div className={styles.Tasks}>
        {orderTasks(course?.tasks).map(task => (
          <div 
            className={styles.TaskContainer}
            key={task.id}
          >
            <Task 
              name={task.name} 
              deadline={task.deadline}
              isRequired={task.isRequired}
              id={task.id}
              done={task.done}
              courseId={task.courseId}
              key={task.id}
            />
          </div>
        ))}
      </div>

      <TaskPalette courseId={course?.id!} />
    </div>
  )
}