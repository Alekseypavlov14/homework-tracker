import { FC, useState } from 'react'
import { getDaysArrayFromMonth } from './../../utils/getDaysArrayFromMonth'
import { getMonthFromDate } from './../../utils/getMonthFromDate'
import { getPrevDaysAmountOfMonth } from './../../utils/getPrevDaysAmountOfMonth'
import { getNextDaysAmountOfMonth } from './../../utils/getNextDaysAmountOfMonth'
import { getRangeFromNumber } from './../../utils/getRangeFromNumber'
import { shortedDaysOfWeek } from './../../constants/daysOfWeek'
import { WeekDay } from './../WeekDay/WeekDay'
import { parseDate } from './../../utils/parseDate'
import { months } from './../../constants/months'
import { Day } from './../Day/Day'
import styles from './Calendar.module.css'

interface CalendarProps {}

export const Calendar: FC<CalendarProps> = () => {
  const month = getMonthFromDate(parseDate(Date.now()))
  const [currentMonth, setCurrentMonth] = useState(month)

  const setNextMonth = () => {
    let newMonthNumber = currentMonth.number + 1
    let newMonthYear = currentMonth.year

    if (newMonthNumber >= months.length) {
      newMonthNumber = 0
      newMonthYear += 1
    }

    setCurrentMonth({
      number: newMonthNumber,
      year: newMonthYear
    })
  }

  const setPrevMonth = () => {
    let newMonthNumber = currentMonth.number - 1
    let newMonthYear = currentMonth.year

    if (newMonthNumber < 0) {
      newMonthNumber = months.length - 1
      newMonthYear -= 1
    }

    setCurrentMonth({
      number: newMonthNumber,
      year: newMonthYear
    })
  }

  const daysArray = getDaysArrayFromMonth(currentMonth)

  const prevDaysAmount = getPrevDaysAmountOfMonth(currentMonth)
  const nextDaysAmount = getNextDaysAmountOfMonth(currentMonth)

  const prevDays = getRangeFromNumber(prevDaysAmount)
  const nextDays = getRangeFromNumber(nextDaysAmount)

  return (
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
          <Day key={index} date={day} />
        ))}

        {nextDays.map(day => <div key={day} />)}
      </div>
    </div>
  )
}