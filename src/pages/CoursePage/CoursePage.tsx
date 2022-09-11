import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { coursesSelector } from '../../store/slices/courses/coursesSlice'
import { Course } from '../../types/Course.interface'
import styles from './CoursePage.module.css'

interface CoursePageProps {}

export const CoursePage: FC<CoursePageProps> = () => {
  const [course, setCourse] = useState<Course | null>(null)
  const courses = useSelector(coursesSelector)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const course = courses.find(course => course.id === Number(id))

    if (course === undefined) return navigate('/')
    setCourse(course)
  }, [courses, navigate, id])

  return (
    <div className={styles.CoursePage}>
      {course?.name}
    </div>
  )
}