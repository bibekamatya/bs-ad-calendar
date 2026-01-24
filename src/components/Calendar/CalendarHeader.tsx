import React from 'react'
import type { CalendarHeaderProps } from '../../types/index.js'
import styles from './Calendar.module.css'

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  currentYear,
  months,
  onNavigateMonth,
  disabled = false,
  showNepaliNumbers = false,
  convertToNepaliNumber
}) => {
  return (
    <div className={styles.header}>
      <button 
        className={styles.navButton}
        onClick={() => onNavigateMonth(-1)}
        disabled={disabled}
        aria-label="Previous month"
      >
        ‹
      </button>
      <div className={styles.monthYear}>
        {months[currentMonth]} {showNepaliNumbers ? convertToNepaliNumber(currentYear) : currentYear}
      </div>
      <button 
        className={styles.navButton}
        onClick={() => onNavigateMonth(1)}
        disabled={disabled}
        aria-label="Next month"
      >
        ›
      </button>
    </div>
  )
}

export default CalendarHeader