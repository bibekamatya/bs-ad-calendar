import React, { useState } from 'react'
import { Calendar } from '../index'
import type { DateOutput } from '../types'

interface CustomizationTabProps {
  outputAD: string
  onADSelect: (data: DateOutput) => void
  showCode: string | null
  copied: string | null
  onToggleCode: (id: string) => void
  onCopyCode: (code: string, id: string) => void
  renderOutput: (output: string) => React.ReactNode
}

const CustomizationTab: React.FC<CustomizationTabProps> = ({
  outputAD,
  onADSelect,
  showCode,
  copied,
  onToggleCode,
  onCopyCode,
  renderOutput
}) => {
  const [colors, setColors] = useState({
    primary: '#3b82f6',
    selected: '#3b82f6',
    today: '#dbeafe',
    hover: '#eff6ff'
  })

  const handleColorChange = (key: string, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }))
  }

  const code = `<Calendar
  calendarType="AD"
  colors={{
    primary: '${colors.primary}',
    selected: '${colors.selected}',
    today: '${colors.today}',
    hover: '${colors.hover}'
  }}
  onDateSelect={(data) => console.log(data)}
/>`

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ border: 'none', borderRadius: '0px', padding: '0px', background: 'transparent' }}>
        <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '8px', fontSize: '16px' }}>Live Color Customization</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          <div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px', fontWeight: '500', color: '#111827' }}>Primary Color</label>
              <small style={{ display: 'block', marginBottom: '3px', fontSize: '10px', color: '#6b7280' }}>Text color for today's date</small>
              <input type="color" value={colors.primary} onChange={(e) => handleColorChange('primary', e.target.value)} style={{ width: '28px', height: '28px', cursor: 'pointer', borderRadius: '50%', border: '2px solid #e5e7eb' }} />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px', fontWeight: '500', color: '#111827' }}>Selected Color</label>
              <small style={{ display: 'block', marginBottom: '3px', fontSize: '10px', color: '#6b7280' }}>Background for selected date</small>
              <input type="color" value={colors.selected} onChange={(e) => handleColorChange('selected', e.target.value)} style={{ width: '28px', height: '28px', cursor: 'pointer', borderRadius: '50%', border: '2px solid #e5e7eb' }} />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px', fontWeight: '500', color: '#111827' }}>Today Color</label>
              <small style={{ display: 'block', marginBottom: '3px', fontSize: '10px', color: '#6b7280' }}>Background for today's date</small>
              <input type="color" value={colors.today} onChange={(e) => handleColorChange('today', e.target.value)} style={{ width: '28px', height: '28px', cursor: 'pointer', borderRadius: '50%', border: '2px solid #e5e7eb' }} />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', marginBottom: '3px', fontSize: '12px', fontWeight: '500', color: '#111827' }}>Hover Color</label>
              <small style={{ display: 'block', marginBottom: '3px', fontSize: '10px', color: '#6b7280' }}>Background on date hover</small>
              <input type="color" value={colors.hover} onChange={(e) => handleColorChange('hover', e.target.value)} style={{ width: '28px', height: '28px', cursor: 'pointer', borderRadius: '50%', border: '2px solid #e5e7eb' }} />
            </div>
          </div>

          <div>
            <Calendar 
              calendarType="AD" 
              colors={colors}
              onDateSelect={onADSelect} 
            />
          </div>
        </div>

        {renderOutput(outputAD)}

        <button 
          onClick={() => onToggleCode('custom-live')} 
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
              {code}
            </pre>
            <button 
              onClick={() => onCopyCode(code, 'custom-live')} 
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
              {copied === 'custom-live' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomizationTab
