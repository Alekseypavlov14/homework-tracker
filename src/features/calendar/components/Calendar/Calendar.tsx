import { FC, useState } from 'react'
// utils
import { getDaysArrayFromMonth } from './../../utils/getDaysArrayFromMonth'
import { getMonthFromDate } from './../../utils/getMonthFromDate'
import { getPrevDaysRange } from '../../utils/getPrevDaysRange'
import { getNextDaysRange } from '../../utils/getNextDaysRange'
import { getPrevMonth } from '../../utils/getPrevMonth'
import { getNextMonth } from '../../utils/getNextMonth'
import { parseDate } from './../../utils/parseDate'
// constants
import { shortedDaysOfWeek } from './../../constants/daysOfWeek'
import { months } from './../../constants/months'
// components
import { TasksOfDay } from '../TasksOfDay/TasksOfDay'
import { WeekDay } from './../WeekDay/WeekDay'
import { Day } from './../Day/Day'
// types
import type { Date } from '../../types/Date'
import { Month } from '../../types/Month'
// redux
import styles from './Calendar.module.css'

interface CalendarProps {
  focusedDate: Date
  setFocusedDate: (date: Date) => void
}

export const Calendar: FC<CalendarProps> = ({ focusedDate, setFocusedDate }) => {
  const month = getMonthFromDate(parseDate(Date.now()))
  const [currentMonth, setCurrentMonth] = useState<Month>(month)

  const setPrevMonth = () => setCurrentMonth(getPrevMonth(currentMonth))
  const setNextMonth = () => setCurrentMonth(getNextMonth(currentMonth))

  const focusDateHandler = (date: Date) => {
    return () => setFocusedDate(date)
  }

  const daysArray = getDaysArrayFromMonth(currentMonth)

  const prevDays = getPrevDaysRange(currentMonth)
  const nextDays = getNextDaysRange(currentMonth)

  return (
    <>
      <div className={styles.Calendar}>
        <div className={styles.CalendarState}>
          <button onClick={setPrevMonth}>&lt;</button>
          {months[currentMonth.number]} {currentMonth.year}
          <button onClick={setNextMonth}>&gt;</button>
        </div>
  
        <div className={styles.CalendarWeekDays}>
          {shortedDaysOfWeek.map(day => (
            <WeekDay key={day} day={day} />
          ))}
        </div>
  
        <div className={styles.CalendarBody}>
          {prevDays.map(day => <div key={day} />)}
  
          {daysArray.map((day, index) => (
            <Day 
              onClick={focusDateHandler(day)}
              key={`${day}-${index}`} 
              date={day} 
            />
          ))}
  
          {nextDays.map(day => <div key={day} />)}
        </div>
      </div>
  
      <TasksOfDay day={focusedDate} />
    </>
  )
}