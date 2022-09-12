import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { colorDefaultSelector, colorsSelector } from '../../store/slices/colors/colorsSlice'
import { coursesSelector, deleteCourse } from '../../store/slices/courses/coursesSlice'
import { Course } from '../../types/Course.interface'
import { getColorById } from '../../utils/getColorById/getColorById'
import { getCourseById } from '../../utils/getCourseById/getCourseById'
import styles from './CourseSettings.module.css'

interface CourseSettingsProps {}

export const CourseSettings: FC<CourseSettingsProps> = () => {
  const [course, setCourse] = useState<Course | null>(null)
  const CourseSettingsRef = useRef<HTMLDivElement>(null)
  const { id } = useParams()
  const dispatch = useDispatch()

  const navigate = useNavigate()
  
  const courses = useSelector(coursesSelector)
  const colors = useSelector(colorsSelector)
  const defaultColor = useSelector(colorDefaultSelector)

  useEffect(() => {
    const course = getCourseById(courses, Number(id))
    if (!course) return navigate('/')

    setCourse(course)

    const color = getColorById(colors, defaultColor, course.colorId)
    CourseSettingsRef.current?.style.setProperty('--color', color)
  }, [colors, defaultColor, courses, navigate, id])

  function deleteCourseHandler() {
    dispatch(deleteCourse({ id: Number(id) }))
    navigate('/')
  }

  return (
    <div className={styles.CourseSettings} ref={CourseSettingsRef}>
      <div className={styles.CourseHeader}>
        {course?.name}
      </div>

      <div className={styles.CourseActions}>
        <div className={styles.CourseAction}>
          <div className={styles.CourseActionName}>Delete this course</div>
          <button 
            className={styles.CourseActionButton}
            onClick={deleteCourseHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}