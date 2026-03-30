import React, { useState } from 'react'
import type { CalendarHeaderProps } from '../../types/index.js'
import MonthYearPicker from './MonthYearPicker'

interface ExtendedCalendarHeaderProps extends CalendarHeaderProps {
  onYearChange: (year: number) => void
  onMonthChange: (month: number) => void
  calendarType: 'BS' | 'AD'
}

const CalendarHeader: React.FC<ExtendedCalendarHeaderProps> = ({
  currentMonth,
  currentYear,
  months,
  onNavigateMonth,
  onYearChange,
  onMonthChange,
  disabled = false,
  showNepaliNumbers = false,
  convertToNepaliNumber,
  calendarType
}) => {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div className="bsac-header">
      <button className="bsac-nav-btn" onClick={() => onNavigateMonth(-12)} disabled={disabled} aria-label="Previous year">«</button>
      <button className="bsac-nav-btn" onClick={() => onNavigateMonth(-1)} disabled={disabled} aria-label="Previous month">‹</button>
      <button className="bsac-month-year-btn" onClick={() => setShowPicker(true)} disabled={disabled}>
        {months[currentMonth]} {showNepaliNumbers ? convertToNepaliNumber(currentYear) : currentYear}
      </button>
      <button className="bsac-nav-btn" onClick={() => onNavigateMonth(1)} disabled={disabled} aria-label="Next month">›</button>
      <button className="bsac-nav-btn" onClick={() => onNavigateMonth(12)} disabled={disabled} aria-label="Next year">»</button>

      {showPicker && (
        <MonthYearPicker
          currentYear={currentYear}
          currentMonth={currentMonth}
          months={months}
          onYearChange={onYearChange}
          onMonthChange={onMonthChange}
          onClose={() => setShowPicker(false)}
          showNepaliNumbers={showNepaliNumbers}
          convertToNepaliNumber={convertToNepaliNumber}
          calendarType={calendarType}
        />
      )}
    </div>
  )
}

export default CalendarHeader
