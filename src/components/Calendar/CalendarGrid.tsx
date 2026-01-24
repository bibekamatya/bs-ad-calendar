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
      {calendarDays.map((day, index) => (
        <div
          key={index}
          className={`${styles.day} ${
            day === null ? styles.dayOtherMonth :
            isSelected(day) ? styles.daySelected :
            isInRange(day) ? styles.dayToday :
            isToday(day) ? styles.dayToday : ''
          } ${disabled ? styles.dayDisabled : ''}`}
          onClick={() => day && onDateSelect(day)}
        >
          {day ? (showNepaliNumbers ? convertToNepaliNumber(day) : day) : ''}
        </div>
      ))}
    </div>
  )
}

export default CalendarGrid