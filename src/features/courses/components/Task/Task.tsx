import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, toggleTask } from './../../slice/courses.slice'
import { Task as TaskType } from './../../entities/task.interface'
import { formatDate } from '../../utils/formatDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { parseDate } from '../../../calendar/utils/parseDate'
import { isDateMissed } from '../../../calendar/utils/isDateMissed'
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

  function isTaskMissed(deadline: number) {
    const deadlineDate = parseDate(deadline)
    return isDateMissed(deadlineDate)
  }

  const deadlineClassNames = cn(
    styles.TaskDeadline, 
    isTaskMissed(deadline) && styles.Missed
  )

  return (
    <div 
      className={cn(styles.Task, done && styles.Done)}
      onClick={toggleHandler}
    >
      <div className={styles.TaskData}>
        <div className={styles.TaskName}>
          {name}
        </div>
        <div className={deadlineClassNames}>
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