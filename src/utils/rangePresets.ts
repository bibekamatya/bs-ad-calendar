import type { PredefinedRange } from '../types/index.js'
import { getTodayDate } from './dateUtils'

export const createPredefinedRanges = (): PredefinedRange[] => [
  {
    key: 'today',
    label: 'Today',
    getValue: (calendarType) => {
      const today = getTodayDate(calendarType)
      return { start: today, end: today }
    }
  },
  {
    key: 'yesterday',
    label: 'Yesterday',
    getValue: (calendarType) => {
      const today = getTodayDate(calendarType)
      const yesterday = { ...today, day: today.day - 1 }
      return { start: yesterday, end: yesterday }
    }
  },
  {
    key: 'last7days',
    label: 'Last 7 Days',
    getValue: (calendarType) => {
      const today = getTodayDate(calendarType)
      const start = { ...today, day: today.day - 6 }
      return { start, end: today }
    }
  },
  {
    key: 'last30days',
    label: 'Last 30 Days',
    getValue: (calendarType) => {
      const today = getTodayDate(calendarType)
      const start = { ...today, day: today.day - 29 }
      return { start, end: today }
    }
  },
  {
    key: 'thisMonth',
    label: 'This Month',
    getValue: (calendarType) => {
      const today = getTodayDate(calendarType)
      const start = { ...today, day: 1 }
      return { start, end: today }
    }
  },
  {
    key: 'lastMonth',
    label: 'Last Month',
    getValue: (calendarType) => {
      const today = getTodayDate(calendarType)
      const lastMonth = today.month === 0 ? 11 : today.month - 1
      const lastMonthYear = today.month === 0 ? today.year - 1 : today.year
      const start = { year: lastMonthYear, month: lastMonth, day: 1 }
      const end = { year: lastMonthYear, month: lastMonth, day: 30 } // Simplified
      return { start, end }
    }
  },
  {
    key: 'last3months',
    label: 'Last 3 Months',
    getValue: (calendarType) => {
      const today = getTodayDate(calendarType)
      const threeMonthsAgo = {
        year: today.month < 3 ? today.year - 1 : today.year,
        month: today.month < 3 ? today.month + 9 : today.month - 3,
        day: 1
      }
      return { start: threeMonthsAgo, end: today }
    }
  },
  {
    key: 'last180days',
    label: 'Last 180 Days',
    getValue: (calendarType) => {
      const today = getTodayDate(calendarType)
      const start = { ...today, day: today.day - 179 }
      return { start, end: today }
    }
  }
]