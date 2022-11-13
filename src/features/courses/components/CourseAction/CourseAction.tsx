import { FC, ReactNode } from 'react'
import styles from './CourseAction.module.css'

interface CourseActionProps {
  title: string
  buttonText: string
  buttonAction: () => void
  children?: ReactNode,
  danger?: boolean
}

export const CourseAction: FC<CourseActionProps> = ({
  title,
  buttonText,
  buttonAction,
  children,
  danger
}) => {
  const className = danger ? styles.DangerCourseAction : styles.CourseAction

  return (
    <div className={className}>
      <div className={styles.CourseActionHeader}>
        <div className={styles.CourseActionName}>
          {title}
        </div>
        <button 
          className={styles.CourseActionButton}
          onClick={buttonAction}
        >
          {buttonText}
        </button>
      </div>
      <div className={styles.CourseActionContent}>
        {children}
      </div>
    </div>
  )
}