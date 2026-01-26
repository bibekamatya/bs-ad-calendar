import React from 'react'
import CalendarInput from './CalendarInput'
import type { DateOutput } from '../types'

interface DatePickerTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (data: DateOutput) => void
  onBSSelect: (data: DateOutput) => void
  renderOutput: (output: string) => React.ReactNode
}

const DatePickerTab: React.FC<DatePickerTabProps> = ({
  outputAD,
  outputBS,
  onADSelect,
  onBSSelect,
  renderOutput
}) => {
  const adCode = `<CalendarInput
  calendarType="AD"
  placeholder="Select AD date"
  onDateSelect={(data) => console.log(data)}
/>`

  const bsCode = `<CalendarInput
  calendarType="BS"
  placeholder="Select BS date"
  onDateSelect={(data) => console.log(data)}
/>`

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* AD DatePicker */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', background: 'white' }}>
          <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '12px', fontSize: '16px' }}>AD CalendarInput</h3>
          <CalendarInput
            calendarType="AD"
            placeholder="Select AD date"
            onDateSelect={onADSelect}
          />
          {renderOutput(outputAD)}
        </div>

        {/* BS DatePicker */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', background: 'white' }}>
          <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '12px', fontSize: '16px' }}>BS CalendarInput</h3>
          <CalendarInput
            calendarType="BS"
            placeholder="Select BS date"
            onDateSelect={onBSSelect}
          />
          {renderOutput(outputBS)}
        </div>
      </div>
    </div>
  )
}

export default DatePickerTab
