import { useState, useMemo, useEffect } from 'react'
import type { DateInfo, CalendarProps } from '../types/index.js'
import { getTodayDate, getDaysInMonth, getFirstDayOfMonth, parseDate } from '../utils/dateUtils'

export const useCalendar = (calendarType: CalendarProps['calendarType'] = 'AD', initialValue?: string) => {
  const today = useMemo(() => getTodayDate(calendarType), [calendarType])

  const parsedInitial = useMemo(() => initialValue ? parseDate(initialValue) : null, [initialValue])

  const [currentYear, setCurrentYear] = useState(parsedInitial?.year ?? today.year)
  const [currentMonth, setCurrentMonth] = useState(parsedInitial?.month ?? today.month)
  const [selectedDate, setSelectedDate] = useState<DateInfo | null>(parsedInitial)
  const [rangeStart, setRangeStart] = useState<DateInfo | null>(null)
  const [rangeEnd, setRangeEnd] = useState<DateInfo | null>(null)

  // Only sync calendar position when calendarType changes
  useEffect(() => {
    const parsed = initialValue ? parseDate(initialValue) : null
    if (parsed) {
      setCurrentYear(parsed.year)
      setCurrentMonth(parsed.month)
    } else {
      setCurrentYear(today.year)
      setCurrentMonth(today.month)
    }
  }, [calendarType])

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(calendarType, currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(calendarType, currentYear, currentMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }, [currentYear, currentMonth, calendarType])

  const navigateMonth = (direction: number) => {
    const totalMonths = direction
    let newMonth = currentMonth + totalMonths
    let newYear = currentYear

    while (newMonth > 11) {
      newMonth -= 12
      newYear += 1
    }
    while (newMonth < 0) {
      newMonth += 12
      newYear -= 1
    }

    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  const isToday = (day: number): boolean => {
    return currentYear === today.year && currentMonth === today.month && day === today.day
  }

  const isSelected = (day: number, mode: CalendarProps['mode'] = 'single'): boolean => {
    if (mode === 'range') {
      return (
        !!(
          rangeStart &&
          rangeStart.year === currentYear &&
          rangeStart.month === currentMonth &&
          rangeStart.day === day
        ) ||
        !!(
          rangeEnd &&
          rangeEnd.year === currentYear &&
          rangeEnd.month === currentMonth &&
          rangeEnd.day === day
        )
      )
    }

    const result = !!(
      selectedDate &&
      selectedDate.year === currentYear &&
      selectedDate.month === currentMonth &&
      selectedDate.day === day
    )
    return result
  }

  const isInRange = (day: number): boolean => {
    if (!rangeStart || !rangeEnd) return false

    const currentTimestamp = new Date(currentYear, currentMonth, day).getTime()
    const startTimestamp = new Date(rangeStart.year, rangeStart.month, rangeStart.day).getTime()
    const endTimestamp = new Date(rangeEnd.year, rangeEnd.month, rangeEnd.day).getTime()

    return currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp
  }

  return {
    // State
    currentYear,
    currentMonth,
    selectedDate,
    rangeStart,
    rangeEnd,
    today,
    calendarDays,

    // Actions
    setCurrentYear,
    setCurrentMonth,
    setSelectedDate,
    setRangeStart,
    setRangeEnd,
    navigateMonth,

    // Helpers
    isToday,
    isSelected,
    isInRange
  }
}
