import React, { useState, useRef, useEffect } from 'react'
import Calendar from '../Calendar'
import type { DateOutput, CalendarProps } from '../../types'
import styles from './CalendarInput.module.css'

interface CalendarInputProps extends Omit<CalendarProps, 'onDateSelect'> {
  placeholder?: string
  format?: string
  onDateSelect?: (date: DateOutput) => void
  inputClassName?: string
  popupClassName?: string
  style?: React.CSSProperties
  inputStyle?: React.CSSProperties
  icon?: React.ReactNode
  showIcon?: boolean
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  placeholder = 'Select date',
  format = 'YYYY-MM-DD',
  onDateSelect,
  inputClassName = '',
  popupClassName = '',
  style,
  inputStyle,
  icon,
  showIcon = true,
  calendarType = 'AD',
  ...calendarProps
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<DateOutput | null>(null)
  const [inputValue, setInputValue] = useState('')
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
    const displayValue = calendarType === 'BS' ? date.bs : date.ad
    setInputValue(displayValue)
    setIsOpen(false)
    onDateSelect?.(date)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const cursorPosition = e.target.selectionStart || 0
    const prevLength = inputValue.length
    
    // Allow clearing the input
    if (value === '') {
      setInputValue('')
      return
    }
    
    // Only auto-format if typing at the end
    const isTypingAtEnd = cursorPosition === value.length
    
    if (isTypingAtEnd && value.length > prevLength) {
      // User is typing at the end - apply auto-formatting
      const digits = value.replace(/[^0-9]/g, '')
      let formatted = digits
      
      if (digits.length > 4 && digits.length <= 6) {
        formatted = digits.slice(0, 4) + '-' + digits.slice(4)
      } else if (digits.length > 6) {
        formatted = digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6, 8)
      }
      
      setInputValue(formatted)
    } else {
      // User is editing in the middle - allow free editing
      const sanitized = value.replace(/[^0-9-]/g, '')
      if (sanitized.length <= 10) {
        setInputValue(sanitized)
      }
    }
  }

  const handleInputBlur = () => {
    const value = inputValue.trim()
    if (!value) {
      setSelectedDate(null)
      return
    }

    // Parse YYYY-MM-DD format
    const dateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (dateMatch) {
      const [, year, month, day] = dateMatch
      const m = parseInt(month)
      const d = parseInt(day)
      
      // Validate date ranges
      if (m < 1 || m > 12 || d < 1 || d > 32) {
        setInputValue(selectedDate ? (calendarType === 'BS' ? selectedDate.formatted.bs : selectedDate.formatted.ad) : '')
        return
      }
      
      const parsedDate: DateOutput = {
        bs: calendarType === 'BS' ? `${year}-${month}-${day}` : '',
        ad: calendarType === 'AD' ? `${year}-${month}-${day}` : '',
        formatted: {
          bs: calendarType === 'BS' ? value : '',
          ad: calendarType === 'AD' ? value : ''
        }
      }
      setSelectedDate(parsedDate)
      onDateSelect?.(parsedDate)
    } else if (value.length < 10) {
      // Incomplete date, reset to previous or empty
      setInputValue(selectedDate ? (calendarType === 'BS' ? selectedDate.formatted.bs : selectedDate.formatted.ad) : '')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
      setIsOpen(false)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className={`${styles.datePicker} ${inputClassName}`} ref={containerRef} style={style}>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder || 'YYYY-MM-DD'}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={styles.input}
        style={inputStyle}
        aria-label="Date picker input"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        maxLength={10}
      />
      <button
        type="button"
        className={styles.iconButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle calendar"
        style={{ display: showIcon ? 'flex' : 'none' }}
      >
        {icon || (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        )}
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

export default CalendarInput
