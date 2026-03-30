import React, { useState } from 'react'

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
  convertToNepaliNumber = n => n.toString(),
  calendarType
}) => {
  const [yearRangeStart, setYearRangeStart] = useState(Math.floor(currentYear / 12) * 12)
  const minYear = calendarType === 'BS' ? 2000 : 1944
  const maxYear = calendarType === 'BS' ? 2100 : 2043

  return (
    <div className="bsac-picker-overlay" onClick={onClose}>
      <div className="bsac-picker-content" onClick={e => e.stopPropagation()}>
        <div className="bsac-picker-header">
          <h3>Select Month & Year</h3>
          <button className="bsac-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="bsac-picker-body">
          <div className="bsac-picker-section">
            <div className="bsac-picker-section-header">
              <label>Year</label>
              <div className="bsac-year-nav">
                <button onClick={() => setYearRangeStart(Math.max(minYear, yearRangeStart - 12))} disabled={yearRangeStart <= minYear}>«</button>
                <span>
                  {showNepaliNumbers ? convertToNepaliNumber(yearRangeStart) : yearRangeStart}
                  {' – '}
                  {showNepaliNumbers ? convertToNepaliNumber(yearRangeStart + 11) : yearRangeStart + 11}
                </span>
                <button onClick={() => setYearRangeStart(Math.min(maxYear - 11, yearRangeStart + 12))} disabled={yearRangeStart + 11 >= maxYear}>»</button>
              </div>
            </div>
            <div className="bsac-year-grid">
              {Array.from({ length: 12 }, (_, i) => {
                const year = yearRangeStart + i
                if (year > maxYear) return null
                return (
                  <button
                    key={year}
                    onClick={() => onYearChange(year)}
                    className={year === currentYear ? 'bsac-selected' : ''}
                  >
                    {showNepaliNumbers ? convertToNepaliNumber(year) : year}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="bsac-picker-section">
            <label>Month</label>
            <div className="bsac-month-grid">
              {months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => { onMonthChange(index); onClose() }}
                  className={index === currentMonth ? 'bsac-selected' : ''}
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
