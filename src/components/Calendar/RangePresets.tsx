import React from 'react'
import type { PredefinedRange, DateRange } from '../../types/index.js'

interface RangePresetsProps {
  presets: PredefinedRange[]
  calendarType: 'BS' | 'AD'
  onPresetSelect: (preset: PredefinedRange, range: DateRange) => void
  activePreset?: string
}

const RangePresets: React.FC<RangePresetsProps> = ({
  presets,
  calendarType,
  onPresetSelect,
  activePreset
}) => {
  const handlePresetClick = (preset: PredefinedRange) => {
    const range = preset.getValue(calendarType)
    onPresetSelect(preset, range)
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '16px',
      padding: '12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '6px',
      border: '1px solid #e9ecef'
    }}>
      {presets.map(preset => (
        <button
          key={preset.key}
          onClick={() => handlePresetClick(preset)}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            backgroundColor: activePreset === preset.key ? '#007bff' : '#ffffff',
            color: activePreset === preset.key ? '#ffffff' : '#495057',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}

export default RangePresets