import { FC, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { colorsSelector } from '../../store/slices/colors/colorsSlice'
import { createCourse } from '../../store/slices/courses/coursesSlice'
import styles from './NewCourse.module.css'

interface NewCourseProps {}

export const NewCourse: FC<NewCourseProps> = () => {
  const [courseName, setCourseName] = useState<string>('')
  const [zoomLink, setZoomLink] = useState<string | null>(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const colors = useSelector(colorsSelector)

  function updateCourseName(e: ChangeEvent<HTMLInputElement>) {
    setCourseName(e.target.value)
  }

  function updateZoomLink(e: ChangeEvent<HTMLInputElement>) {
    setZoomLink(e.target.value)
  }

  function AddNewCourse() {
    if (courseName.length === 0) return

    const newColorId = Math.ceil(Math.random() * (colors.length - 1) + 1)

    dispatch(createCourse({
      name: courseName,
      zoomLink: zoomLink,
      colorId: newColorId
    }))

    navigate('/')
  }

  return (
    <div className={styles.NewCourse}>
      <div className={styles.AddCoursePalette}>
        <div className={styles.Title}>New Course</div>

        <form className={styles.Form}>
          <div className={styles.FormSection}>
            <div className={styles.FormSectionName}>
              The name of the course
            </div>
            <input onChange={updateCourseName} />
          </div>

          <div className={styles.FormSection}>
            <div className={styles.FormSectionName}>
              Zoom Link
            </div>
            <input onChange={updateZoomLink} />
          </div>
        </form>

        <button 
          className={styles.Button}
          onClick={AddNewCourse}
        >
          Create
        </button>
      </div>
    </div>
  )
}