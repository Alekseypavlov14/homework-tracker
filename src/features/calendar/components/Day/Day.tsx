import { FC } from 'react'
import { parseDate } from './../../utils/parseDate'
import { compareDates } from './../../utils/compareDates'
import type { Date } from './../../types/Date'
import styles from './Day.module.css'
import cn from 'classnames'

interface DayProps {
  date: Date
}

export const Day: FC<DayProps> = ({ date }) => {
  const today = parseDate(Date.now())

  const isToday = compareDates(date, today)

  const classNames = cn(
    styles.Day,
    isToday && styles.Today
  )

  return (
    <div className={classNames}>
      {date.day}
    </div>
  )
}