import { useState, useMemo, useEffect } from 'react'
import type { DateInfo, CalendarProps } from '../types/index.js'
import { getTodayDate, getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils'

export const useCalendar = (calendarType: CalendarProps['calendarType'] = 'AD') => {
  const today = useMemo(() => getTodayDate(calendarType), [calendarType])
  
  const [currentYear, setCurrentYear] = useState(today.year)
  const [currentMonth, setCurrentMonth] = useState(today.month)
  const [selectedDate, setSelectedDate] = useState<DateInfo | null>(null)
  const [rangeStart, setRangeStart] = useState<DateInfo | null>(null)
  const [rangeEnd, setRangeEnd] = useState<DateInfo | null>(null)

  // Update calendar when type changes
  useEffect(() => {
    setCurrentYear(today.year)
    setCurrentMonth(today.month)
  }, [today.year, today.month])

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
    return currentYear === today.year && 
           currentMonth === today.month && 
           day === today.day
  }

  const isSelected = (day: number, mode: CalendarProps['mode'] = 'single'): boolean => {
    if (mode === 'range') {
      return !!(rangeStart &&
                rangeStart.year === currentYear &&
                rangeStart.month === currentMonth &&
                rangeStart.day === day) ||
             !!(rangeEnd &&
                rangeEnd.year === currentYear &&
                rangeEnd.month === currentMonth &&
                rangeEnd.day === day)
    }

    return !!(selectedDate &&
              selectedDate.year === currentYear &&
              selectedDate.month === currentMonth &&
              selectedDate.day === day)
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