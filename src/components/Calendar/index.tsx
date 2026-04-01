import React, { useState } from 'react'
import type { CalendarProps, DateInfo, PredefinedRange, DateRange, DateRangeOutput } from '../../types/index.js'
import { useCalendar } from '../../hooks/useCalendar'
import { convertToNepaliNumber, createDateOutput, isDateDisabled } from '../../utils/dateUtils'
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
const Calendar: React.FC<CalendarProps> = ({
  calendarType = 'AD',
  value,
  onChange,
  className = '',
  showToday = true,
  disabled = false,
  outputFormat = 'both',
  onDateSelect,
  mode = 'single',
  onRangeSelect,
  showRangePresets = false,
  rangePresetsPosition = 'top',
  predefinedRanges,
  presetKeys,
  presetLabels,
  onPresetSelect,
  renderPresets,
  showNepaliMonths = false,
  showNepaliDays = false,
  showNepaliNumbers = false,
  theme = 'light',
  colors,
  minDate,
  maxDate
}) => {
  const {
    currentYear,
    currentMonth,
    rangeStart,
    rangeEnd,
    calendarDays,
    setSelectedDate,
    setRangeStart,
    setRangeEnd,
    setCurrentYear,
    setCurrentMonth,
    navigateMonth,
    isToday,
    isSelected,
    isInRange
  } = useCalendar(calendarType, value)

  const [activePreset, setActivePreset] = useState<string | undefined>()
  const rangePresets = predefinedRanges || createPredefinedRanges(presetKeys, presetLabels)

  const toRangeOutput = (start: DateInfo, end: DateInfo): DateRangeOutput => ({
    start: createDateOutput(calendarType, start.year, start.month, start.day, months),
    end: createDateOutput(calendarType, end.year, end.month, end.day, months)
  })

  // Get localized strings
  const months =
    calendarType === 'BS' && showNepaliMonths
      ? NEPALI_MONTHS
      : calendarType === 'BS'
        ? ENGLISH_MONTHS_BS
        : ENGLISH_MONTHS_AD

  const days = calendarType === 'BS' && showNepaliDays ? NEPALI_DAYS : ENGLISH_DAYS

  const handlePresetSelect = (preset: PredefinedRange, range: DateRange) => {
    if (range.start && range.end) {
      setRangeStart(range.start)
      setRangeEnd(range.end)
      setCurrentYear(range.start.year)
      setCurrentMonth(range.start.month)
      setActivePreset(preset.key)
      onPresetSelect?.(preset, range)
      onRangeSelect?.(toRangeOutput(range.start, range.end))
    }
  }

  const handleCustomRangeChange = (start: DateInfo, end: DateInfo) => {
    setRangeStart(start)
    setRangeEnd(end)
    setActivePreset(undefined)
    onRangeSelect?.(toRangeOutput(start, end))
  }

  const handleDateSelect = (day: number) => {
    if (disabled) return
    const newDate = { year: currentYear, month: currentMonth, day }
    if (isDateDisabled(newDate, minDate, maxDate)) return
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
          onRangeSelect?.(toRangeOutput(newDate, rangeStart))
        } else {
          setRangeEnd(newDate)
          onRangeSelect?.(toRangeOutput(rangeStart, newDate))
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return

    switch (event.key) {
      case 'ArrowLeft':
        navigateMonth(-1)
        break
      case 'ArrowRight':
        navigateMonth(1)
        break
      case 'ArrowUp':
        navigateMonth(-12)
        break
      case 'ArrowDown':
        navigateMonth(12)
        break
      case 'PageUp':
        event.shiftKey ? navigateMonth(-12) : navigateMonth(-1)
        break
      case 'PageDown':
        event.shiftKey ? navigateMonth(12) : navigateMonth(1)
        break
      default:
        return
    }
    event.preventDefault()
  }

  // Generate CSS variables for theming
  const cssVariables = colors
    ? Object.entries(colors).reduce(
        (acc, [key, value]) => {
          acc[`--calendar-${key}`] = value
          return acc
        },
        {} as Record<string, string>
      )
    : {}

  const calendarStyle = {
    ...cssVariables
  }

  return (
    <div
      className={`bsac-calendar ${className}`}
      style={calendarStyle}
      data-theme={theme}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label="Calendar"
    >
      {mode === 'range' && renderPresets && (
        <div style={{ display: 'flex', gap: '16px' }}>
          <div>{renderPresets({ onRangeChange: handleCustomRangeChange })}</div>
          <div style={{ flex: 1 }}>
            <CalendarHeader
              currentMonth={currentMonth}
              currentYear={currentYear}
              months={months}
              onNavigateMonth={navigateMonth}
              onYearChange={setCurrentYear}
              onMonthChange={setCurrentMonth}
              disabled={disabled}
              showNepaliNumbers={showNepaliNumbers}
              convertToNepaliNumber={convertToNepaliNumber}
              calendarType={calendarType}
            />
            <CalendarGrid
              calendarDays={calendarDays}
              days={days}
              onDateSelect={handleDateSelect}
              isSelected={day => isSelected(day, mode)}
              isInRange={isInRange}
              isToday={day => showToday && isToday(day)}
              isDisabled={day =>
                isDateDisabled({ year: currentYear, month: currentMonth, day }, minDate, maxDate)
              }
              disabled={disabled}
              showNepaliNumbers={showNepaliNumbers}
              convertToNepaliNumber={convertToNepaliNumber}
            />
          </div>
        </div>
      )}

      {mode === 'range' &&
        showRangePresets &&
        rangePresetsPosition === 'left' &&
        !renderPresets && (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'nowrap' }}>
            <RangePresets
              presets={rangePresets}
              calendarType={calendarType}
              onPresetSelect={handlePresetSelect}
              activePreset={activePreset}
              position="left"
            />
            <div>
              <CalendarHeader
                currentMonth={currentMonth}
                currentYear={currentYear}
                months={months}
                onNavigateMonth={navigateMonth}
                onYearChange={setCurrentYear}
                onMonthChange={setCurrentMonth}
                disabled={disabled}
                showNepaliNumbers={showNepaliNumbers}
                convertToNepaliNumber={convertToNepaliNumber}
                calendarType={calendarType}
              />
              <CalendarGrid
                calendarDays={calendarDays}
                days={days}
                onDateSelect={handleDateSelect}
                isSelected={day => isSelected(day, mode)}
                isInRange={isInRange}
                isToday={day => showToday && isToday(day)}
                isDisabled={day =>
                  isDateDisabled({ year: currentYear, month: currentMonth, day }, minDate, maxDate)
                }
                disabled={disabled}
                showNepaliNumbers={showNepaliNumbers}
                convertToNepaliNumber={convertToNepaliNumber}
              />
            </div>
          </div>
        )}

      {mode === 'range' &&
        showRangePresets &&
        rangePresetsPosition === 'right' &&
        !renderPresets && (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'nowrap' }}>
            <div>
              <CalendarHeader
                currentMonth={currentMonth}
                currentYear={currentYear}
                months={months}
                onNavigateMonth={navigateMonth}
                onYearChange={setCurrentYear}
                onMonthChange={setCurrentMonth}
                disabled={disabled}
                showNepaliNumbers={showNepaliNumbers}
                convertToNepaliNumber={convertToNepaliNumber}
                calendarType={calendarType}
              />
              <CalendarGrid
                calendarDays={calendarDays}
                days={days}
                onDateSelect={handleDateSelect}
                isSelected={day => isSelected(day, mode)}
                isInRange={isInRange}
                isToday={day => showToday && isToday(day)}
                isDisabled={day =>
                  isDateDisabled({ year: currentYear, month: currentMonth, day }, minDate, maxDate)
                }
                disabled={disabled}
                showNepaliNumbers={showNepaliNumbers}
                convertToNepaliNumber={convertToNepaliNumber}
              />
            </div>
            <RangePresets
              presets={rangePresets}
              calendarType={calendarType}
              onPresetSelect={handlePresetSelect}
              activePreset={activePreset}
              position="right"
            />
          </div>
        )}

      {(!mode ||
        mode === 'single' ||
        (!showRangePresets && !renderPresets) ||
        rangePresetsPosition === 'top' ||
        rangePresetsPosition === 'bottom') && (
        <>
          {mode === 'range' && showRangePresets && rangePresetsPosition === 'top' && (
            <RangePresets
              presets={rangePresets}
              calendarType={calendarType}
              onPresetSelect={handlePresetSelect}
              activePreset={activePreset}
              position="top"
            />
          )}
          <CalendarHeader
            currentMonth={currentMonth}
            currentYear={currentYear}
            months={months}
            onNavigateMonth={navigateMonth}
            onYearChange={setCurrentYear}
            onMonthChange={setCurrentMonth}
            disabled={disabled}
            showNepaliNumbers={showNepaliNumbers}
            convertToNepaliNumber={convertToNepaliNumber}
            calendarType={calendarType}
          />
          <CalendarGrid
            calendarDays={calendarDays}
            days={days}
            onDateSelect={handleDateSelect}
            isSelected={day => isSelected(day, mode)}
            isInRange={isInRange}
            isToday={day => showToday && isToday(day)}
            isDisabled={day =>
              isDateDisabled({ year: currentYear, month: currentMonth, day }, minDate, maxDate)
            }
            disabled={disabled}
            showNepaliNumbers={showNepaliNumbers}
            convertToNepaliNumber={convertToNepaliNumber}
          />
          {mode === 'range' && showRangePresets && rangePresetsPosition === 'bottom' && (
            <RangePresets
              presets={rangePresets}
              calendarType={calendarType}
              onPresetSelect={handlePresetSelect}
              activePreset={activePreset}
              position="bottom"
            />
          )}
        </>
      )}
    </div>
  )
}

export default Calendar

// Example usage with custom presets:
/*
<Calendar
  mode="range"
  renderPresets={({ onRangeChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <button onClick={() => onRangeChange(
        { year: 2024, month: 0, day: 1 },
        { year: 2024, month: 11, day: 31 }
      )}>
        Full Year 2024
      </button>
      <button onClick={() => onRangeChange(
        { year: 2024, month: 0, day: 1 },
        { year: 2024, month: 2, day: 31 }
      )}>
        Q1 2024
      </button>
    </div>
  )}
/>
*/
