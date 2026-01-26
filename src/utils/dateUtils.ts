import NepaliDate from 'nepali-datetime'
import type { DateInfo } from '../types/index.js'
import { NEPALI_DIGITS, ENGLISH_MONTHS_BS } from '../constants'

interface DateOutput {
  bs: string
  ad: string
  formatted: {
    bs: string
    ad: string
  }
}

export const convertToNepaliNumber = (num: number): string => {
  return num
    .toString()
    .split('')
    .map(digit => NEPALI_DIGITS[parseInt(digit)])
    .join('')
}

export const getDaysInMonth = (calendarType: 'BS' | 'AD', year: number, month: number): number => {
  if (calendarType === 'BS') {
    try {
      // Create dates for the first and last day of the month to calculate days
      const nextMonth =
        month === 11 ? new NepaliDate(year + 1, 0, 1) : new NepaliDate(year, month + 1, 1)
      // Get the date of the day before the first day of next month
      const lastDayOfMonth = new NepaliDate(nextMonth.getTime() - 24 * 60 * 60 * 1000)
      return lastDayOfMonth.getDate()
    } catch {
      return 30
    }
  }
  return new Date(year, month + 1, 0).getDate()
}

export const getFirstDayOfMonth = (
  calendarType: 'BS' | 'AD',
  year: number,
  month: number
): number => {
  if (calendarType === 'BS') {
    try {
      const bsDate = new NepaliDate(year, month, 1)
      return bsDate.getDay() || 0
    } catch {
      return 0
    }
  }
  return new Date(year, month, 1).getDay()
}

export const getTodayDate = (calendarType: 'BS' | 'AD'): DateInfo => {
  const now = new Date()
  if (calendarType === 'BS') {
    try {
      const bsDate = NepaliDate.fromEnglishDate(now.getFullYear(), now.getMonth(), now.getDate())
      return { year: bsDate.getYear(), month: bsDate.getMonth(), day: bsDate.getDate() }
    } catch {
      return { year: 2081, month: 0, day: 1 }
    }
  }
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() }
}

export const createDateOutput = (
  calendarType: 'BS' | 'AD',
  year: number,
  month: number,
  day: number,
  months: string[]
): DateOutput => {
  if (calendarType === 'BS') {
    try {
      const bsDate = new NepaliDate(year, month, day)
      const adDate = new Date(
        bsDate.getEnglishYear(),
        bsDate.getEnglishMonth(),
        bsDate.getEnglishDate()
      )
      const isoDate = adDate.toISOString().split('T')[0]
      const bsDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

      return {
        bs: bsDateStr,
        ad: isoDate,
        formatted: {
          bs: `${months[month]} ${day}, ${year}`,
          ad: new Date(
            bsDate.getEnglishYear(),
            bsDate.getEnglishMonth(),
            bsDate.getEnglishDate()
          ).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        }
      }
    } catch {
      const bsDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      return {
        bs: bsDateStr,
        ad: bsDateStr,
        formatted: {
          bs: `${months[month]} ${day}, ${year}`,
          ad: `${months[month]} ${day}, ${year}`
        }
      }
    }
  } else {
    const adDate = new Date(year, month, day)
    const isoDate = adDate.toISOString().split('T')[0]

    try {
      const bsDate = NepaliDate.fromEnglishDate(year, month, day)
      const bsDateStr = `${bsDate.getYear()}-${String(bsDate.getMonth() + 1).padStart(2, '0')}-${String(bsDate.getDate()).padStart(2, '0')}`

      return {
        ad: isoDate,
        bs: bsDateStr,
        formatted: {
          ad: adDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          bs: `${ENGLISH_MONTHS_BS[bsDate.getMonth()]} ${bsDate.getDate()}, ${bsDate.getYear()}`
        }
      }
    } catch {
      return {
        ad: isoDate,
        bs: isoDate,
        formatted: {
          ad: adDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          bs: adDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        }
      }
    }
  }
}

export const isDateInRange = (date: DateInfo, start: DateInfo, end: DateInfo): boolean => {
  const dateTimestamp = new Date(date.year, date.month, date.day).getTime()
  const startTimestamp = new Date(start.year, start.month, start.day).getTime()
  const endTimestamp = new Date(end.year, end.month, end.day).getTime()

  return dateTimestamp >= startTimestamp && dateTimestamp <= endTimestamp
}

export const parseDate = (dateStr: string): DateInfo | null => {
  try {
    const [year, month, day] = dateStr.split('-').map(Number)
    if (!year || !month || !day) return null
    return { year, month: month - 1, day }
  } catch {
    return null
  }
}

export const isDateDisabled = (
  date: DateInfo,
  minDate?: string,
  maxDate?: string
): boolean => {
  if (!minDate && !maxDate) return false

  const dateTimestamp = new Date(date.year, date.month, date.day).getTime()

  if (minDate) {
    const min = parseDate(minDate)
    if (min) {
      const minTimestamp = new Date(min.year, min.month, min.day).getTime()
      if (dateTimestamp < minTimestamp) return true
    }
  }

  if (maxDate) {
    const max = parseDate(maxDate)
    if (max) {
      const maxTimestamp = new Date(max.year, max.month, max.day).getTime()
      if (dateTimestamp > maxTimestamp) return true
    }
  }

  return false
}
