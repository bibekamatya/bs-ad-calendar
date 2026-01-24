import React, { useState, useRef, useEffect } from 'react'
import Calendar from '../Calendar'
import type { DateOutput, CalendarProps } from '../../types'
import styles from './DatePicker.module.css'

interface DatePickerProps extends Omit<CalendarProps, 'onDateSelect'> {
  placeholder?: string
  format?: string
  onDateSelect?: (date: DateOutput) => void
  inputClassName?: string
  popupClassName?: string
}

const DatePicker: React.FC<DatePickerProps> = ({
  placeholder = 'Select date',
  format = 'YYYY-MM-DD',
  onDateSelect,
  inputClassName = '',
  popupClassName = '',
  calendarType = 'AD',
  ...calendarProps
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<DateOutput | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleDateSelect = (date: DateOutput) => {
    setSelectedDate(date)
    setIsOpen(false)
    onDateSelect?.(date)
  }

  const displayValue = selectedDate 
    ? (calendarType === 'BS' ? selectedDate.formatted.bs : selectedDate.formatted.ad)
    : ''

  return (
    <div className={`${styles.datePicker} ${inputClassName}`} ref={containerRef}>
      <input
        type="text"
        value={displayValue}
        placeholder={placeholder}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        className={styles.input}
        aria-label="Date picker input"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      />
      <button
        type="button"
        className={styles.iconButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle calendar"
      >
        📅
      </button>
      
      {isOpen && (
        <div className={`${styles.popup} ${popupClassName}`}>
          <Calendar
            calendarType={calendarType}
            onDateSelect={handleDateSelect}
            {...calendarProps}
          />
        </div>
      )}
    </div>
  )
}

export default DatePicker
