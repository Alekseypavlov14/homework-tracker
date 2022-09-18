import { FC, useEffect, useRef, useState } from 'react'
import { colorDefaultSelector, colorsSelector } from '../../store/slices/colors/colorsSlice'
import { coursesSelector, deleteCourse } from '../../store/slices/courses/coursesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourseById } from '../../utils/getCourseById/getCourseById'
import { getColorById } from '../../utils/getColorById/getColorById'
import { ConfirmPopup } from '../../components/ConfirmPopup/ConfirmPopup'
import { Course } from '../../types/Course.interface'
import { useInteraction } from '../../hooks/useInteraction'
import styles from './CourseSettings.module.css'
import { Anchor } from '../../components/Anchor/Anchor'

interface CourseSettingsProps {}

export const CourseSettings: FC<CourseSettingsProps> = () => {
  const [course, setCourse] = useState<Course | null>(null)
  const [interaction, pushInteraction] = useInteraction()
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
    pushInteraction({
      message: 'Are you sure you want to delete the course?',
      confirm() {
        dispatch(deleteCourse({ id: Number(id) }))
        navigate('/')
      }
    })
  }

  const ZoomLinkOrText = course?.zoomLink?.length ? (
    <Anchor 
      href={course.zoomLink}
      children={course.zoomLink}
    />
  ) : (
    <>There isn`t a link</>
  )

  return (
    <div className={styles.CourseSettings} ref={CourseSettingsRef}>
      <div className={styles.CourseHeader}>
        {course?.name}
      </div>

      <div className={styles.CourseActions}>
        <div className={styles.CourseAction}>
          <div className={styles.CourseActionHeader}>
            <div className={styles.CourseActionName}>
              Zoom Link:
            </div>
            <button 
              className={styles.CourseActionButton}
              onClick={() => {}}
            >
              Update
            </button>
          </div>
          <div className={styles.CourseActionContent}>
            {ZoomLinkOrText}
          </div>
        </div>
      </div>

      <div className={styles.DangerActions}>
        <div className={styles.Title}>Danger zone:</div>
        <div className={styles.CourseAction}>
          <div className={styles.CourseActionHeader}>
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

      {interaction && (
        <ConfirmPopup 
          message={interaction.message}
          confirm={interaction.confirm}
          cancel={interaction.cancel}
        />
      )}
    </div>
  )
}