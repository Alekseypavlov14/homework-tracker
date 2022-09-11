import { FC, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { colorDefaultSelector, colorsSelector } from '../../store/slices/colors/colorsSlice'
import styles from './Course.module.css'

interface CourseProps {
  name: string
  colorId: number
}

export const Course: FC<CourseProps> = ({ name, colorId }) => {
  const courseRef = useRef<HTMLDivElement>(null)
  const colors = useSelector(colorsSelector)
  const defaultColor = useSelector(colorDefaultSelector)
  
  useEffect(() => {
    const color = colors.find(color => color.id === colorId) || defaultColor
    courseRef.current?.style.setProperty('--color', color.value)
  }, [colors, defaultColor, colorId])

  return (
    <div className={styles.Course} ref={courseRef}>
      <div className={styles.CourseName}>
        {name}
      </div>
    </div>
  )
}
