import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, toggleTask } from '../../store/slices/courses/coursesSlice'
import { Task as TaskType } from './../../types/Task.interface'
import { formatDate } from '../../utils/formatDate/formatDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
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

  const deleteHandler = () => {
    dispatch(deleteTask({ courseId, id }))
  }

  return (
    <div 
      className={cn(styles.Task, done && styles.Done)}
      onClick={toggleHandler}
    >
      <div className={styles.TaskData}>
        <div className={styles.TaskName}>
          {name}
        </div>
        <div className={styles.TaskDeadline}>
          {formalizeDate(deadline)}
        </div>
      </div>

      <div className={styles.TaskButtonBlock}>
        <button 
          className={styles.TaskButton}
          onClick={deleteHandler}
        >
          <FontAwesomeIcon 
            className={styles.TaskButtonIcon} 
            icon={faTrashCan} 
          />
        </button>
      </div>
    </div>
  )
}