import React, { useState } from 'react'
import { Calendar } from '../index'
import type { DateOutput } from '../types'

interface CustomizationTabProps {
  outputAD: string
  onADSelect: (data: DateOutput) => void
  renderOutput: (output: string) => React.ReactNode
}

const CustomizationTab: React.FC<CustomizationTabProps> = ({
  outputAD,
  onADSelect,
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
      </div>
    </div>
  )
}

export default CustomizationTab
