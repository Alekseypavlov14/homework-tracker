import { FC, useEffect, useRef, useState } from 'react'
import { colorDefaultSelector, colorsSelector } from './../../../colors/slice/colors.slice'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteCourseAction } from './../../components/DeleteCourseAction/DeleteCourseAction'
import { coursesSelector } from './../../slice/courses.slice'
import { ZoomLinkAction } from './../../components/ZoomLinkAction/ZoomLinkAction'
import { getCourseById } from './../../utils/getCourseById'
import { getColorById } from './../../../colors/utils/getColorById'
import { useSelector } from 'react-redux'
import { Course } from './../../entities/course.interface'
import styles from './CourseSettings.module.css'

interface CourseSettingsProps {}

export const CourseSettings: FC<CourseSettingsProps> = () => {
  const [course, setCourse] = useState<Course | null>(null)
  const CourseSettingsRef = useRef<HTMLDivElement>(null)
  
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
    CourseSettingsRef.current?.style.setProperty('--color', color)
  }, [colors, defaultColor, courses, navigate, id])

  return (
    <div className={styles.CourseSettings} ref={CourseSettingsRef}>
      <div className={styles.CourseHeader}>
        {course?.name}
      </div>

      <div className={styles.CourseActions}>
        <ZoomLinkAction 
          link={course?.zoomLink || ''} 
          id={course?.id || 0}
        />
      </div>

      <div className={styles.DangerActions}>
        <div className={styles.DangerActionsTitle}>Danger zone:</div>
        <DeleteCourseAction id={course?.id!} />
      </div>
    </div>
  )
}