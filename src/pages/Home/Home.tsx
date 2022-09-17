import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Course } from '../../components/Course/Course'
import { Header } from '../../components/Header/Header'
import { coursesSelector, updateZoomLink } from '../../store/slices/courses/coursesSlice'
import styles from './Home.module.css'

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const courses = useSelector(coursesSelector)
  const navigate = useNavigate()

  const openCoursePage = (courseId: number) => {
    return () => navigate(`/courses/${courseId}`)
  }

  const updateAllCourses = () => {
    courses.forEach(course => {
      updateZoomLink({ id: course.id, zoomLink: '' })
    })
  }

  const openNewCoursePage = () => navigate('/courses/new')
  
  return (
    <div className={styles.Home}>
      <Header />

      <button onClick={updateAllCourses}>Update zoom link</button>

      <div className={styles.Courses}>
        <div className={styles.Course}>
          <div className={styles.TaskListLinkBlock}>
            <Link className={styles.TaskListLink} to='/tasks'>
              All the tasks
            </Link>
          </div>
        </div>

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

      <button 
        className={styles.AddCourseButton}
        onClick={openNewCoursePage}
      >
        +
      </button>
    </div>
  )
}