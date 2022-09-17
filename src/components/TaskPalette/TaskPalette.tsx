import { FC, useState } from 'react'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskFactory } from '../TaskFactory/TaskFactory'
import styles from './TaskPalette.module.css'
import cn from 'classnames'

interface TaskPaletteProps {
  courseId: number
}

export const TaskPalette: FC<TaskPaletteProps> = ({ courseId }) => {
  const [isPaletteOpened, setPaletteOpened] = useState<boolean>(false)

  function togglePalette() {
    setPaletteOpened(value => !value)
  }

  function closePalette() {
    setPaletteOpened(false)
  }

  const classList = cn(styles.TaskPalette, isPaletteOpened && styles.Opened)

  const arrow = isPaletteOpened ? faAngleDown : faAngleUp

  return (
    <div className={classList}>
      <button className={styles.ArrowButton} onClick={togglePalette}>
        Add new task &nbsp;
        <FontAwesomeIcon className={styles.Arrow} icon={arrow} />
      </button>

      {isPaletteOpened && (
        <TaskFactory courseId={courseId} closePalette={closePalette} />
      )}
    </div>
  )
}
