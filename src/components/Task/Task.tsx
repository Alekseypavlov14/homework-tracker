import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTask } from '../../store/slices/courses/coursesSlice'
import { Task as TaskType } from './../../types/Task.interface'
import { formatDate } from '../../utils/formatDate/formatDate'
import cn from 'classnames'
import styles from './Task.module.css'

interface TaskProps extends TaskType {}

export const Task: FC<TaskProps> = ({
  name,
  deadline,
  done,
  courseId,
  id
}) => {
  const dispatch = useDispatch()

  function formalizeDate(date: number) {
    const { day, month, year } = formatDate(date)
    return `${day}.${month}.${year}`
  }

  const toggleHandler = () => {
    dispatch(toggleTask({ courseId, id }))
  }

  return (
    <div className={cn(styles.Task, done && styles.Done)}>
      <div className={styles.TaskData}>
        <div className={styles.TaskName}>{name}</div>
        <div className={styles.TaskDeadline}>{formalizeDate(deadline)}</div>
      </div>
      <div className={styles.TaskButtonBlock}>
        <button className={styles.TaskButton} onClick={toggleHandler}>
          done
        </button>
      </div>
    </div>
  )
}