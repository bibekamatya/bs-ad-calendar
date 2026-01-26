import NepaliDate from 'nepali-datetime'
import type { DateInfo } from '../types/index.js'
import { getDaysInMonth } from './dateUtils'

/**
 * Add or subtract days from a BS or AD date
 */
export const addDays = (date: DateInfo, days: number, calendarType: 'BS' | 'AD'): DateInfo => {
  if (calendarType === 'BS') {
    try {
      const bsDate = new NepaliDate(date.year, date.month, date.day)
      const adDate = new Date(
        bsDate.getEnglishYear(),
        bsDate.getEnglishMonth(),
        bsDate.getEnglishDate()
      )
      adDate.setDate(adDate.getDate() + days)
      const newBsDate = NepaliDate.fromEnglishDate(
        adDate.getFullYear(),
        adDate.getMonth(),
        adDate.getDate()
      )
      return { year: newBsDate.getYear(), month: newBsDate.getMonth(), day: newBsDate.getDate() }
    } catch {
      return date
    }
  } else {
    const adDate = new Date(date.year, date.month, date.day)
    adDate.setDate(adDate.getDate() + days)
    return { year: adDate.getFullYear(), month: adDate.getMonth(), day: adDate.getDate() }
  }
}

/**
 * Add or subtract months from a BS or AD date
 */
export const addMonths = (date: DateInfo, months: number, calendarType: 'BS' | 'AD'): DateInfo => {
  if (calendarType === 'BS') {
    try {
      let newYear = date.year
      let newMonth = date.month + months

      while (newMonth < 0) {
        newYear -= 1
        newMonth += 12
      }
      while (newMonth >= 12) {
        newYear += 1
        newMonth -= 12
      }

      const daysInNewMonth = getDaysInMonth('BS', newYear, newMonth)
      const newDay = Math.min(date.day, daysInNewMonth)

      return { year: newYear, month: newMonth, day: newDay }
    } catch {
      return date
    }
  } else {
    const adDate = new Date(date.year, date.month, date.day)
    adDate.setMonth(adDate.getMonth() + months)
    return { year: adDate.getFullYear(), month: adDate.getMonth(), day: adDate.getDate() }
  }
}

/**
 * Get the first day of the month for a given date
 */
export const getFirstDayOfMonth = (date: DateInfo): DateInfo => {
  return { year: date.year, month: date.month, day: 1 }
}

/**
 * Get the last day of the month for a given date
 */
export const getLastDayOfMonth = (date: DateInfo, calendarType: 'BS' | 'AD'): DateInfo => {
  const daysInMonth = getDaysInMonth(calendarType, date.year, date.month)
  return { year: date.year, month: date.month, day: daysInMonth }
}

/**
 * Get the first day of the week (Sunday) for a given date
 */
export const getStartOfWeek = (date: DateInfo, calendarType: 'BS' | 'AD'): DateInfo => {
  if (calendarType === 'BS') {
    try {
      const bsDate = new NepaliDate(date.year, date.month, date.day)
      const dayOfWeek = bsDate.getDay()
      return addDays(date, -dayOfWeek, 'BS')
    } catch {
      return date
    }
  } else {
    const adDate = new Date(date.year, date.month, date.day)
    const dayOfWeek = adDate.getDay()
    adDate.setDate(adDate.getDate() - dayOfWeek)
    return { year: adDate.getFullYear(), month: adDate.getMonth(), day: adDate.getDate() }
  }
}
