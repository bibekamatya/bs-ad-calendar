import React, { useState } from 'react'
import styles from './Calendar.module.css'

interface MonthYearPickerProps {
  currentYear: number
  currentMonth: number
  months: string[]
  onYearChange: (year: number) => void
  onMonthChange: (month: number) => void
  onClose: () => void
  showNepaliNumbers?: boolean
  convertToNepaliNumber?: (num: number) => string
  calendarType: 'BS' | 'AD'
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  currentYear,
  currentMonth,
  months,
  onYearChange,
  onMonthChange,
  onClose,
  showNepaliNumbers = false,
  convertToNepaliNumber = (n) => n.toString(),
  calendarType
}) => {
  const [yearRangeStart, setYearRangeStart] = useState(
    Math.floor(currentYear / 12) * 12
  )

  const minYear = calendarType === 'BS' ? 2000 : 1944
  const maxYear = calendarType === 'BS' ? 2100 : 2043

  return (
    <div 
      className={styles.pickerOverlay}
      onClick={onClose}
    >
      <div 
        className={styles.pickerContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.pickerHeader}>
          <h3>Select Month & Year</h3>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        <div className={styles.pickerBody}>
          {/* Year Selection */}
          <div className={styles.pickerSection}>
            <div className={styles.pickerSectionHeader}>
              <label>Year</label>
              <div className={styles.yearNav}>
                <button 
                  onClick={() => setYearRangeStart(Math.max(minYear, yearRangeStart - 12))}
                  disabled={yearRangeStart <= minYear}
                >«</button>
                <span>{showNepaliNumbers ? convertToNepaliNumber(yearRangeStart) : yearRangeStart} - {showNepaliNumbers ? convertToNepaliNumber(yearRangeStart + 11) : yearRangeStart + 11}</span>
                <button 
                  onClick={() => setYearRangeStart(Math.min(maxYear - 11, yearRangeStart + 12))}
                  disabled={yearRangeStart + 11 >= maxYear}
                >»</button>
              </div>
            </div>
            <div className={styles.yearGrid}>
              {Array.from({ length: 12 }, (_, i) => {
                const year = yearRangeStart + i
                if (year > maxYear) return null
                return (
                  <button
                    key={year}
                    onClick={() => onYearChange(year)}
                    className={year === currentYear ? styles.selected : ''}
                  >
                    {showNepaliNumbers ? convertToNepaliNumber(year) : year}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Month Selection */}
          <div className={styles.pickerSection}>
            <label>Month</label>
            <div className={styles.monthGrid}>
              {months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onMonthChange(index)
                    onClose()
                  }}
                  className={index === currentMonth ? styles.selected : ''}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthYearPicker
