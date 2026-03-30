import React, { useState, useRef, useEffect } from 'react'
import NepaliDate from 'nepali-datetime'
import Calendar from '../Calendar'
import type { DateOutput, CalendarProps } from '../../types'

interface CalendarInputProps extends Omit<CalendarProps, 'onDateSelect'> {
  placeholder?: string
  format?: string
  defaultValue?: string // AD ISO date string YYYY-MM-DD
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
  defaultValue,
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
  const [inputValue, setInputValue] = useState(() => {
    if (!defaultValue) return ''
    if (calendarType === 'BS') {
      try {
        const [y, m, d] = defaultValue.split('-').map(Number)
        const bs = NepaliDate.fromEnglishDate(y, m - 1, d)
        return `${bs.getYear()}-${String(bs.getMonth() + 1).padStart(2, '0')}-${String(bs.getDate()).padStart(2, '0')}`
      } catch { return defaultValue }
    }
    return defaultValue
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [popupPos, setPopupPos] = useState<React.CSSProperties>({ visibility: 'hidden' })

  const calculatePosition = () => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const popupHeight = popupRef.current?.offsetHeight || 360
    const popupWidth = popupRef.current?.offsetWidth || 280
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceRight = window.innerWidth - rect.left

    const top = spaceBelow >= popupHeight + 8
      ? rect.bottom + 8
      : Math.max(8, rect.top - popupHeight - 8)

    const left = spaceRight >= popupWidth
      ? rect.left
      : Math.max(8, rect.right - popupWidth)

    setPopupPos({ top, left, visibility: 'visible' })
  }

  useEffect(() => {
    if (isOpen) {
      // Calculate after render so popupRef has dimensions
      requestAnimationFrame(calculatePosition)
      window.addEventListener('scroll', calculatePosition, true)
      window.addEventListener('resize', calculatePosition)
    }
    return () => {
      window.removeEventListener('scroll', calculatePosition, true)
      window.removeEventListener('resize', calculatePosition)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleDateSelect = (date: DateOutput) => {
    setSelectedDate(date)
    setInputValue(calendarType === 'BS' ? date.bs : date.ad)
    setIsOpen(false)
    onDateSelect?.(date)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') { setInputValue(''); return }
    const isTypingAtEnd = (e.target.selectionStart || 0) === value.length
    if (isTypingAtEnd && value.length > inputValue.length) {
      const digits = value.replace(/[^0-9]/g, '')
      let formatted = digits
      if (digits.length > 4 && digits.length <= 6) formatted = digits.slice(0, 4) + '-' + digits.slice(4)
      else if (digits.length > 6) formatted = digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6, 8)
      setInputValue(formatted)
    } else {
      const sanitized = value.replace(/[^0-9-]/g, '')
      if (sanitized.length <= 10) setInputValue(sanitized)
    }
  }

  const handleInputBlur = () => {
    const value = inputValue.trim()
    if (!value) { setSelectedDate(null); return }
    const dateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (dateMatch) {
      const [, year, month, day] = dateMatch
      const m = parseInt(month), d = parseInt(day)
      if (m < 1 || m > 12 || d < 1 || d > 32) {
        setInputValue(selectedDate ? (calendarType === 'BS' ? selectedDate.bs : selectedDate.ad) : '')
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
      setInputValue(selectedDate ? (calendarType === 'BS' ? selectedDate.bs : selectedDate.ad) : '')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { handleInputBlur(); setIsOpen(false) }
    else if (e.key === 'Escape') setIsOpen(false)
  }

  return (
    <div className="bsac-datepicker" ref={containerRef} style={style}>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={`bsac-input ${inputClassName}`}
        style={inputStyle}
        aria-label="Date picker input"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        maxLength={10}
      />
      <button
        type="button"
        className="bsac-icon-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle calendar"
        style={{ display: showIcon ? 'flex' : 'none' }}
      >
        {icon || (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div ref={popupRef} className={`bsac-popup ${popupClassName}`} style={popupPos}>
          <Calendar calendarType={calendarType} onDateSelect={handleDateSelect} {...calendarProps} />
        </div>
      )}
    </div>
  )
}

export default CalendarInput
