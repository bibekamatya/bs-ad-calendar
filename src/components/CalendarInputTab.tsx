import React from 'react'
import CalendarInput from './CalendarInput'
import type { DateOutput } from '../types'

interface CalendarInputTabProps {
  isDark?: boolean
  outputAD: string
  outputBS: string
  onADSelect: (date: DateOutput) => void
  onBSSelect: (date: DateOutput) => void
  copied: string | null
  onCopyCode: (code: string, id: string) => void
  renderOutput: (output: string) => React.ReactNode
}

const CalendarInputTab: React.FC<CalendarInputTabProps> = ({ isDark = false, outputAD, outputBS, onADSelect, onBSSelect, copied, onCopyCode, renderOutput }) => {
  const today = new Date().toISOString().split('T')[0]

  const cardStyle: React.CSSProperties = {
    border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
    borderRadius: '8px',
    padding: '16px',
    background: isDark ? '#0f172a' : 'white'
  }

  const titleStyle: React.CSSProperties = {
    color: isDark ? '#f1f5f9' : '#111827',
    marginTop: 0,
    marginBottom: '12px',
    fontSize: '15px',
    fontWeight: 600
  }

  const bsCode = `const today = new Date().toISOString().split('T')[0]

<DatePicker
  calendarType="BS"
  placeholder="Select BS date"
  defaultValue={today}
  onDateSelect={(date) => console.log(date)}
/>`

  const adCode = `const today = new Date().toISOString().split('T')[0]

<DatePicker
  calendarType="AD"
  placeholder="Select AD date"
  defaultValue={today}
  onDateSelect={(date) => console.log(date)}
/>`

  const codeStyle: React.CSSProperties = { background: '#0f172a', color: '#e2e8f0', padding: '12px', borderRadius: '6px', fontSize: '12px', overflow: 'auto', margin: 0, border: '1px solid #1e293b' }
  const copyBtnStyle: React.CSSProperties = { position: 'absolute', top: '8px', right: '8px', padding: '3px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #334155', background: '#1e293b', color: '#94a3b8' }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      <div style={cardStyle}>
        <h3 style={titleStyle}>BS DatePicker</h3>
        <CalendarInput calendarType="BS" placeholder="Select BS date" defaultValue={today} onDateSelect={onBSSelect} />
        {renderOutput(outputBS)}
        <div style={{ position: 'relative', marginTop: '10px' }}>
          <pre style={codeStyle}>{bsCode}</pre>
          <button onClick={() => onCopyCode(bsCode, 'datepicker-bs')} style={copyBtnStyle}>
            {copied === 'datepicker-bs' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={titleStyle}>AD DatePicker</h3>
        <CalendarInput calendarType="AD" placeholder="Select AD date" defaultValue={today} onDateSelect={onADSelect} />
        {renderOutput(outputAD)}
        <div style={{ position: 'relative', marginTop: '10px' }}>
          <pre style={codeStyle}>{adCode}</pre>
          <button onClick={() => onCopyCode(adCode, 'datepicker-ad')} style={copyBtnStyle}>
            {copied === 'datepicker-ad' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CalendarInputTab
