import React from 'react'
import type { PredefinedRange, DateRange } from '../../types/index.js'

interface RangePresetsProps {
  presets: PredefinedRange[]
  calendarType: 'BS' | 'AD'
  onPresetSelect: (preset: PredefinedRange, range: DateRange) => void
  activePreset?: string
  position?: 'top' | 'right' | 'bottom' | 'left'
}

const RangePresets: React.FC<RangePresetsProps> = ({
  presets,
  calendarType,
  onPresetSelect,
  activePreset,
  position = 'top'
}) => {
  const handlePresetClick = (preset: PredefinedRange) => {
    const range = preset.getValue(calendarType)
    onPresetSelect(preset, range)
  }

  return (
    <div className={`bsac-presets bsac-presets--${position}`}>
      {presets.map(preset => (
        <button
          key={preset.key}
          onClick={() => handlePresetClick(preset)}
          className={`bsac-preset-btn${activePreset === preset.key ? ' bsac-preset-btn--active' : ''}`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}

export default RangePresets
