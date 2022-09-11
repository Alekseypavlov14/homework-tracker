import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Course } from '../../components/Course/Course'
import { Header } from '../../components/Header/Header'
import { coursesSelector } from '../../store/slices/courses/coursesSlice'
import styles from './Home.module.css'

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const courses = useSelector(coursesSelector)
  const navigate = useNavigate()

  const openCoursePage = (courseId: number) => {
    return () => navigate(`/courses/${courseId}`)
  }
  
  return (
    <div className={styles.Home}>
      <Header />

      <div className={styles.Courses}>
        {courses.map(course => (
          <div 
            className={styles.Course} 
            onClick={openCoursePage(course.id)}
            key={course.id}
          >
            <Course 
              name={course.name} 
              colorId={course.colorId} 
            />
          </div>
        ))}
      </div>

      <button className={styles.AddCourseButton}>+</button>
    </div>
  )
}