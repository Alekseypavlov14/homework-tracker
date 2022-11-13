import { FC } from 'react'
import { parseDate } from './../../utils/parseDate'
import { compareDates } from './../../utils/compareDates'
import { useActiveTasks } from '../../../courses/hooks/useActiveTasks'
import type { Date } from './../../types/Date'
import styles from './Day.module.css'
import cn from 'classnames'

interface DayProps {
  date: Date
}

export const Day: FC<DayProps> = ({ date }) => {
  const classNames: string[] = []

  const today = parseDate(Date.now())
  if (compareDates(date, today)) classNames.push(styles.Today)

  const activeTasks = useActiveTasks()

  activeTasks.forEach(task => {
    const taskDeadline = parseDate(task.deadline)
    if (compareDates(taskDeadline, date)) {
      return classNames.push(styles.hasDeadlineTask)
    }
  })

  const className = cn(
    styles.Day,
    ...classNames
  )

  return (
    <div className={className}>
      {date.day}
    </div>
  )
}