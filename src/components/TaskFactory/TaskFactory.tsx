import { FC, useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../../store/slices/courses/coursesSlice'
import { formatDate } from '../../utils/formatDate/formatDate'
import styles from './TaskFactory.module.css'

interface TaskFactoryProps {
  courseId: number
  closePalette: () => void
}

export const TaskFactory: FC<TaskFactoryProps> = ({ courseId, closePalette }) => {
  const [taskName, setTaskName] = useState('')
  const [taskDeadline, setTaskDeadline] = useState<number>(Date.now())
  const dispatch = useDispatch()

  const addTask = () => {
    if (taskName.length === 0) return
    if (!taskDeadline) return

    dispatch(createTask({
      name: taskName,
      deadline: taskDeadline,
      isRequired: true,
      courseId: courseId
    }))

    setTaskName('')
    setTaskDeadline(Date.now())

    closePalette()
  }

  function updateName(e: ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value
    setTaskName(newName)
  }

  function updateDeadline(e: ChangeEvent<HTMLInputElement>) {
    const deadline = new Date(e.target.value).getTime()
    setTaskDeadline(deadline)
  }

  function formalizeDate(deadline: number) {
    const { day, month, year} = formatDate(deadline)
    return `${year}-${month}-${day}`
  }

  return (
    <div className={styles.TaskFactory}>
      <div className={styles.TaskName}>
        <span className={styles.Label}>
          Name
        </span>

        <input
          className={styles.TaskNameInput}
          placeholder="Task name ..."
          onChange={updateName}
          value={taskName}
          type="text" 
        />
      </div>

      <div className={styles.TaskDeadline}>
        <span className={styles.Label}>
          Deadline
        </span>

        <input
          className={styles.TaskDeadlineInput}
          onChange={updateDeadline}
          value={formalizeDate(taskDeadline)}
          type="date"
        />
      </div>

      <button className={styles.TaskButton} onClick={addTask}>
        Add
      </button>
    </div>
  )
}