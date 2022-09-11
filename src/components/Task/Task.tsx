import { FC } from 'react'
import { Task as TaskType } from './../../types/Task.interface'
import styles from './Task.module.css'

interface TaskProps extends TaskType {}

export const Task: FC<TaskProps> = ({
  name,
  deadline,
  isRequired,
  id
}) => {
  return (
    <div className={styles.Task}>
      <div className={styles.TaskName}>{name}</div>
      <div className={styles.TaskDeadline}>{deadline.getTime()}</div>
    </div>
  )
}