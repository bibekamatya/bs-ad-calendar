import type { PredefinedRange } from '../types/index.js'
import { getTodayDate } from './dateUtils'
import { addDays, addMonths, getFirstDayOfMonth, getStartOfWeek } from './bsDateHelpers'

export const PRESET_KEYS = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'thisWeek',
  LAST_7_DAYS: 'last7days',
  LAST_30_DAYS: 'last30days',
  THIS_MONTH: 'thisMonth',
  LAST_MONTH: 'lastMonth',
  LAST_3_MONTHS: 'last3months',
  LAST_6_MONTHS: 'last6months',
  LAST_180_DAYS: 'last180days',
  LAST_9_MONTHS: 'last9months',
  LAST_YEAR: 'lastYear'
} as const

export const createPredefinedRanges = (
  keys?: string[],
  labels?: Record<string, string>
): PredefinedRange[] => {
  const allPresets: PredefinedRange[] = [
    {
      key: 'today',
      label: 'Today',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        return { start: today, end: today }
      }
    },
    {
      key: 'yesterday',
      label: 'Yesterday',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const yesterday = addDays(today, -1, calendarType)
        return { start: yesterday, end: yesterday }
      }
    },
    {
      key: 'thisWeek',
      label: 'This Week',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const start = getStartOfWeek(today, calendarType)
        return { start, end: today }
      }
    },
    {
      key: 'last7days',
      label: 'Last 7 Days',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const start = addDays(today, -6, calendarType)
        return { start, end: today }
      }
    },
    {
      key: 'last30days',
      label: 'Last 30 Days',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const start = addDays(today, -29, calendarType)
        return { start, end: today }
      }
    },
    {
      key: 'thisMonth',
      label: 'This Month',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const start = getFirstDayOfMonth(today)
        return { start, end: today }
      }
    },
    {
      key: 'lastMonth',
      label: 'Last Month',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const lastMonthEnd = addDays(getFirstDayOfMonth(today), -1, calendarType)
        const start = getFirstDayOfMonth(lastMonthEnd)
        return { start, end: lastMonthEnd }
      }
    },
    {
      key: 'last3months',
      label: 'Last 3 Months',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const threeMonthsAgo = addMonths(today, -2, calendarType)
        const start = getFirstDayOfMonth(threeMonthsAgo)
        return { start, end: today }
      }
    },
    {
      key: 'last6months',
      label: 'Last 6 Months',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const sixMonthsAgo = addMonths(today, -5, calendarType)
        const start = getFirstDayOfMonth(sixMonthsAgo)
        return { start, end: today }
      }
    },
    {
      key: 'last180days',
      label: 'Last 180 Days',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const start = addDays(today, -179, calendarType)
        return { start, end: today }
      }
    },
    {
      key: 'last9months',
      label: 'Last 9 Months',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const nineMonthsAgo = addMonths(today, -8, calendarType)
        const start = getFirstDayOfMonth(nineMonthsAgo)
        return { start, end: today }
      }
    },
    {
      key: 'lastYear',
      label: 'Last Year',
      getValue: calendarType => {
        const today = getTodayDate(calendarType)
        const lastYear = addMonths(today, -11, calendarType)
        const start = getFirstDayOfMonth(lastYear)
        return { start, end: today }
      }
    }
  ]

  const filtered = keys ? allPresets.filter(preset => keys.includes(preset.key)) : allPresets

  return labels
    ? filtered.map(preset => ({ ...preset, label: labels[preset.key] || preset.label }))
    : filtered
}
