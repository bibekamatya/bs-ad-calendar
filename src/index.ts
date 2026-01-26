// Main component
export { default as Calendar } from './components/Calendar'
export { default as CalendarInput } from './components/CalendarInput'

// Legacy export for backward compatibility
export { default as DatePicker } from './components/CalendarInput'

// Types
export type {
  DateInfo,
  DateRange,
  DateOutput,
  PredefinedRange,
  CalendarProps,
  CalendarHeaderProps,
  CalendarGridProps
} from './types'

// Utilities
export {
  convertToNepaliNumber,
  getDaysInMonth,
  getFirstDayOfMonth,
  getTodayDate,
  createDateOutput,
  isDateInRange
} from './utils/dateUtils'

export { createPredefinedRanges, PRESET_KEYS } from './utils/rangePresets'

// Constants
export {
  NEPALI_MONTHS,
  ENGLISH_MONTHS_BS,
  ENGLISH_MONTHS_AD,
  NEPALI_DAYS,
  ENGLISH_DAYS,
  NEPALI_DIGITS,
  DEFAULT_COLORS
} from './constants'

// Hooks
export { useCalendar } from './hooks/useCalendar'
