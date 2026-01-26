import React from 'react'
import CalendarInput from './CalendarInput'
import type { DateOutput } from '../types'

interface CalendarInputTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (date: DateOutput) => void
  onBSSelect: (date: DateOutput) => void
  copied: string | null
  onCopyCode: (code: string, id: string) => void
  renderOutput: (output: string) => React.ReactNode
}

const CalendarInputTab: React.FC<CalendarInputTabProps> = ({
  outputAD,
  outputBS,
  onADSelect,
  onBSSelect,
  copied,
  onCopyCode,
  renderOutput
}) => {
  const bsCode = `<CalendarInput
  calendarType="BS"
  placeholder="Select BS date"
  onDateSelect={(date) => console.log(date)}
/>`

  const adCode = `<CalendarInput
  calendarType="AD"
  placeholder="Select AD date"
  onDateSelect={(date) => console.log(date)}
/>`

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* BS CalendarInput */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', background: 'white' }}>
          <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '12px', fontSize: '16px' }}>BS CalendarInput</h3>
          <CalendarInput
            calendarType="BS"
            placeholder="Select BS date"
            onDateSelect={onBSSelect}
          />
          {renderOutput(outputBS)}
          
          <div style={{ position: 'relative', marginTop: '10px' }}>
            <pre style={{ 
              background: '#1f2937', 
              color: '#f9fafb', 
              padding: '12px', 
              borderRadius: '4px', 
              fontSize: '12px', 
              overflow: 'auto',
              margin: 0
            }}>
              {bsCode}
            </pre>
            <button 
              onClick={() => onCopyCode(bsCode, 'datepicker-bs')} 
              style={{ 
                position: 'absolute', 
                top: '8px', 
                right: '8px', 
                padding: '4px 8px', 
                fontSize: '11px', 
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
        </div>

        {/* AD CalendarInput */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', background: 'white' }}>
          <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '12px', fontSize: '16px' }}>AD CalendarInput</h3>
          <CalendarInput
            calendarType="AD"
            placeholder="Select AD date"
            onDateSelect={onADSelect}
          />
          {renderOutput(outputAD)}
          
          <div style={{ position: 'relative', marginTop: '10px' }}>
            <pre style={{ 
              background: '#1f2937', 
              color: '#f9fafb', 
              padding: '12px', 
              borderRadius: '4px', 
              fontSize: '12px', 
              overflow: 'auto',
              margin: 0
            }}>
              {adCode}
            </pre>
            <button 
              onClick={() => onCopyCode(adCode, 'datepicker-ad')} 
              style={{ 
                position: 'absolute', 
                top: '8px', 
                right: '8px', 
                padding: '4px 8px', 
                fontSize: '11px', 
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
        </div>
      </div>
    </div>
  )
}

export default CalendarInputTab
