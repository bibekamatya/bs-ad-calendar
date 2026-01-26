import React from 'react'
import type { CalendarGridProps } from '../../types/index.js'
import styles from './Calendar.module.css'

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
    <div className={styles.grid}>
      {/* Day headers */}
      {days.map(day => (
        <div key={day} className={styles.dayHeader}>
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {calendarDays.map((day, index) => {
        const dayDisabled = day ? isDisabled?.(day) || disabled : false
        return (
          <div
            key={index}
            className={`${styles.day} ${
              day === null
                ? styles.dayOtherMonth
                : dayDisabled
                  ? styles.dayDisabled
                  : isSelected(day)
                    ? styles.daySelected
                    : isInRange(day)
                      ? styles.dayInRange
                      : isToday(day)
                        ? styles.dayToday
                        : ''
            }`}
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
