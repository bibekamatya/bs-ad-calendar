import React, { useState } from 'react'
import type { CalendarProps } from '../../types/index.js'
import { useCalendar } from '../../hooks/useCalendar'
import { convertToNepaliNumber, createDateOutput } from '../../utils/dateUtils'
import { createPredefinedRanges } from '../../utils/rangePresets'
import { 
  NEPALI_MONTHS, 
  ENGLISH_MONTHS_BS, 
  ENGLISH_MONTHS_AD, 
  NEPALI_DAYS, 
  ENGLISH_DAYS 
} from '../../constants'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import RangePresets from './RangePresets'
import styles from './Calendar.module.css'

const Calendar: React.FC<CalendarProps> = ({
  calendarType = 'AD',
  value: _value,
  onChange,
  className = '',
  showToday = true,
  disabled = false,
  outputFormat = 'both',
  onDateSelect,
  mode = 'single',
  onRangeSelect,
  showRangePresets = false,
  predefinedRanges,
  onPresetSelect,
  showNepaliMonths = false,
  showNepaliDays = false,
  showNepaliNumbers = false,
  theme = 'light',
  colors
}) => {
  const {
    currentYear,
    currentMonth,
    selectedDate: _selectedDate,
    rangeStart,
    rangeEnd,
    today: _today,
    calendarDays,
    setSelectedDate,
    setRangeStart,
    setRangeEnd,
    navigateMonth,
    isToday,
    isSelected,
    isInRange
  } = useCalendar(calendarType)

  const [activePreset, setActivePreset] = useState<string | undefined>()
  const defaultPresets = createPredefinedRanges()
  const rangePresets = predefinedRanges || defaultPresets

  // Get localized strings
  const months = (calendarType === 'BS' && showNepaliMonths) 
    ? NEPALI_MONTHS
    : calendarType === 'BS'
    ? ENGLISH_MONTHS_BS
    : ENGLISH_MONTHS_AD

  const days = (calendarType === 'BS' && showNepaliDays)
    ? NEPALI_DAYS
    : ENGLISH_DAYS

  const handlePresetSelect = (preset: any, range: any) => {
    if (range.start && range.end) {
      setRangeStart(range.start)
      setRangeEnd(range.end)
      setActivePreset(preset.key)
      onPresetSelect?.(preset, range)
      onRangeSelect?.(range)
    }
  }

  const handleDateSelect = (day: number) => {
    if (disabled) return

    const newDate = { year: currentYear, month: currentMonth, day }

    if (mode === 'range') {
      setActivePreset(undefined) // Clear preset when manually selecting
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(newDate)
        setRangeEnd(null)
      } else {
        const startTimestamp = new Date(rangeStart.year, rangeStart.month, rangeStart.day).getTime()
        const endTimestamp = new Date(newDate.year, newDate.month, newDate.day).getTime()
        
        if (endTimestamp < startTimestamp) {
          setRangeStart(newDate)
          setRangeEnd(rangeStart)
          onRangeSelect?.({ start: newDate, end: rangeStart })
        } else {
          setRangeEnd(newDate)
          onRangeSelect?.({ start: rangeStart, end: newDate })
        }
      }
      return
    }

    // Single date mode
    setSelectedDate(newDate)
    const dateData = createDateOutput(calendarType, currentYear, currentMonth, day, months)
    
    onDateSelect?.(dateData)

    if (onChange) {
      let result: string
      switch (outputFormat) {
        case 'iso':
          result = dateData.ad
          break
        case 'object':
          result = JSON.stringify(dateData)
          break
        case 'both':
        default:
          result = JSON.stringify(dateData)
          break
      }
      onChange(result)
    }
  }

  // Generate CSS variables for theming
  const cssVariables = colors ? Object.entries(colors).reduce((acc, [key, value]) => {
    acc[`--calendar-${key}`] = value
    return acc
  }, {} as Record<string, string>) : {}

  const calendarStyle = {
    ...cssVariables
  }

  return (
    <div 
      className={`${styles.calendar} ${className}`}
      style={calendarStyle}
      data-theme={theme}
    >
      {mode === 'range' && showRangePresets && (
        <RangePresets
          presets={rangePresets}
          calendarType={calendarType}
          onPresetSelect={handlePresetSelect}
          activePreset={activePreset}
        />
      )}

      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        months={months}
        onNavigateMonth={navigateMonth}
        disabled={disabled}
        showNepaliNumbers={showNepaliNumbers}
        convertToNepaliNumber={convertToNepaliNumber}
      />

      <CalendarGrid
        calendarDays={calendarDays}
        days={days}
        onDateSelect={handleDateSelect}
        isSelected={(day) => isSelected(day, mode)}
        isInRange={isInRange}
        isToday={(day) => showToday && isToday(day)}
        disabled={disabled}
        showNepaliNumbers={showNepaliNumbers}
        convertToNepaliNumber={convertToNepaliNumber}
      />
    </div>
  )
}

export default Calendar