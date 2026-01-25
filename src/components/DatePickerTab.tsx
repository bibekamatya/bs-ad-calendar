import React from 'react'
import CalendarInput from './CalendarInput'
import type { DateOutput } from '../types'

interface DatePickerTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (data: DateOutput) => void
  onBSSelect: (data: DateOutput) => void
  copied: string | null
  onToggleCode: (id: string) => void
  onCopyCode: (code: string, id: string) => void
  renderOutput: (output: string) => React.ReactNode
}

const DatePickerTab: React.FC<DatePickerTabProps> = ({
  outputAD,
  outputBS,
  onADSelect,
  onBSSelect,
  copied,
  onToggleCode,
  onCopyCode,
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
          
          <button 
            onClick={() => onToggleCode('datepicker-ad')} 
            style={{ 
              marginTop: '10px', 
              padding: '6px 12px', 
              fontSize: '12px', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              border: '1px solid #e5e7eb', 
              background: 'white', 
              color: '#111827' 
            }}
          >
            Hide Code
          </button>

          {true && (
            <div style={{ position: 'relative', marginTop: '15px' }}>
              <pre style={{ 
                background: '#1f2937', 
                color: '#f9fafb', 
                padding: '15px', 
                borderRadius: '4px', 
                fontSize: '13px', 
                overflow: 'auto' 
              }}>
                {adCode}
              </pre>
              <button 
                onClick={() => onCopyCode(adCode, 'datepicker-ad')} 
                style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  right: '15px', 
                  padding: '6px 12px', 
                  fontSize: '12px', 
                  cursor: 'pointer', 
                  borderRadius: '4px', 
                  border: '1px solid #374151', 
                  background: '#111827', 
                  color: '#f9fafb' 
                }}
              >
                {copied === 'datepicker-ad' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          )}
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
          
          <button 
            onClick={() => onToggleCode('datepicker-bs')} 
            style={{ 
              marginTop: '10px', 
              padding: '6px 12px', 
              fontSize: '12px', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              border: '1px solid #e5e7eb', 
              background: 'white', 
              color: '#111827' 
            }}
          >
            Hide Code
          </button>

          {true && (
            <div style={{ position: 'relative', marginTop: '15px' }}>
              <pre style={{ 
                background: '#1f2937', 
                color: '#f9fafb', 
                padding: '15px', 
                borderRadius: '4px', 
                fontSize: '13px', 
                overflow: 'auto' 
              }}>
                {bsCode}
              </pre>
              <button 
                onClick={() => onCopyCode(bsCode, 'datepicker-bs')} 
                style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  right: '15px', 
                  padding: '6px 12px', 
                  fontSize: '12px', 
                  cursor: 'pointer', 
                  borderRadius: '4px', 
                  border: '1px solid #374151', 
                  background: '#111827', 
                  color: '#f9fafb' 
                }}
              >
                {copied === 'datepicker-bs' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DatePickerTab
