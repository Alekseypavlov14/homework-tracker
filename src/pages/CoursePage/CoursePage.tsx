import { FC, useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Task } from '../../components/Task/Task'
import { colorDefaultSelector, colorsSelector } from '../../store/slices/colors/colorsSlice'
import { coursesSelector } from '../../store/slices/courses/coursesSlice'
import { Course } from '../../types/Course.interface'
import { getColorById } from '../../utils/getColorById/getColorById'
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
    const course = courses.find(course => course.id === Number(id))
    if (course === undefined) return navigate('/')

    setCourse(course)

    const color = getColorById(colors, defaultColor, course.colorId)
    coursePageRef.current?.style.setProperty('--color', color)
  }, [colors, defaultColor, courses, navigate, id])

  return (
    <div className={styles.CoursePage} ref={coursePageRef}>
      <div className={styles.CourseHeader}>
        {course?.name}
      </div>

      <div className={styles.Tasks}>
        {course?.tasks.map(task => (
          <div className={styles.TaskContainer} key={task.id}>
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
    </div>
  )
}