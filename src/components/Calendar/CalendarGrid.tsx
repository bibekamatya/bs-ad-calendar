import React from 'react'
import type { CalendarGridProps } from '../../types/index.js'

const CalendarGrid: React.FC<CalendarGridProps> = ({
  calendarDays,
  days,
  onDateSelect,
  isSelected,
  isInRange,
  isToday,
  isDisabled,
  disabled = false,
  showNepaliNumbers = false,
  convertToNepaliNumber
}) => {
  return (
    <div className="bsac-grid">
      {days.map(day => (
        <div key={day} className="bsac-day-header">{day}</div>
      ))}
      {calendarDays.map((day, index) => {
        const dayDisabled = day ? isDisabled?.(day) || disabled : false
        const selected = day ? isSelected(day) : false
        const inRange = day ? isInRange(day) : false
        const today = day ? isToday(day) : false

        const cls = [
          'bsac-day',
          !day ? 'bsac-day-empty' :
          dayDisabled ? 'bsac-day-disabled' :
          selected ? 'bsac-day-selected' :
          inRange ? 'bsac-day-in-range' :
          today ? 'bsac-day-today' : ''
        ].filter(Boolean).join(' ')

        return (
          <div
            key={index}
            className={cls}
            onClick={() => day && !dayDisabled && onDateSelect(day)}
          >
            {day ? (showNepaliNumbers ? convertToNepaliNumber(day) : day) : ''}
          </div>
        )
      })}
    </div>
  )
}

export default CalendarGrid
