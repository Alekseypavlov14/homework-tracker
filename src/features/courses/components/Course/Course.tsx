import { FC, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { colorDefaultSelector, colorsSelector } from '../../../colors/slice/colors.slice'
import { getColorById } from '../../../colors/utils/getColorById'
import styles from './Course.module.css'

interface CourseProps {
  name: string
  colorId: number
}

export const Course: FC<CourseProps> = ({ name, colorId }) => {
  const courseRef = useRef<HTMLDivElement>(null)

  // colors
  const colors = useSelector(colorsSelector)
  const defaultColor = useSelector(colorDefaultSelector)
  
  useEffect(() => {
    const color = getColorById(colors, defaultColor, colorId)
    courseRef.current?.style.setProperty('--color', color)
  }, [colors, defaultColor, colorId])

  return (
    <div className={styles.Course} ref={courseRef}>
      <div className={styles.CourseName}>
        {name}
      </div>
    </div>
  )
}
