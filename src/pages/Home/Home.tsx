import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Course } from '../../components/Course/Course'
import { Header } from '../../components/Header/Header'
import { coursesSelector } from '../../store/slices/courses/coursesSlice'
import styles from './Home.module.css'

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const courses = useSelector(coursesSelector)
  
  return (
    <div className={styles.Home}>
      <Header />

      <div className={styles.Courses}>
        {courses.map(course => (
          <div className={styles.Course} key={course.id}>
            <Course 
              name={course.name} 
              colorId={course.colorId} 
            />
          </div>
        ))}
      </div>
    </div>
  )
}