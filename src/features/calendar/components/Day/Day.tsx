import { FC } from 'react'
import { parseDate } from './../../utils/parseDate'
import { areDatesEqual } from '../../utils/areDatesEqual'
import { useActiveTasks } from '../../../courses/hooks/useActiveTasks'
import type { Date } from './../../types/Date'
import { isDateMissed } from '../../utils/isDateMissed'
import styles from './Day.module.css'
import cn from 'classnames'

interface DayProps {
  date: Date
  onClick: () => void
}

export const Day: FC<DayProps> = ({ date, onClick }) => {
  const classNames: string[] = []

  // add styles if it is today
  const today = parseDate(Date.now())
  if (areDatesEqual(date, today)) classNames.push(styles.Today)

  // add styles if task deadline is today
  const activeTasks = useActiveTasks()

  activeTasks.forEach(task => {
    const taskDeadline = parseDate(task.deadline)

    if (areDatesEqual(taskDeadline, date)) {
      classNames.push(styles.hasDeadlineTask)

      // if task is missed
      if (isDateMissed(taskDeadline)) {
        classNames.push(styles.Missed)
      }
    }
  })

  const className = cn(
    styles.Day,
    ...classNames
  )

  return (
    <div 
      className={className}
      onClick={onClick}
    >
      {date.day}
    </div>
  )
}