import type { Date } from "../types/Date"

export function compareDates(date1: Date, date2: Date) {
  const dateInMilliseconds1 = new Date(date1.year, date1.month, date1.day).getTime()
  const dateInMilliseconds2 = new Date(date2.year, date2.month, date2.day).getTime()

  return dateInMilliseconds1 - dateInMilliseconds2
} 