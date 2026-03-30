import React, { useState } from 'react'
import { Calendar, DatePicker, PRESET_KEYS } from '../index'
import type { DateOutput } from '../types'

interface CustomizationTabProps {
  outputAD: string
  onADSelect: (date: DateOutput) => void
  copied: string | null
  onCopyCode: (code: string, id: string) => void
  renderOutput: (output: string) => React.ReactNode
}

interface ColorConfig {
  'calendar-background': string
  'calendar-text': string
  'calendar-border': string
  'calendar-hover': string
  'calendar-selected': string
  'calendar-today': string
  'calendar-primary': string
  'calendar-disabled': string
  'presets-background': string
  'presets-border': string
  'preset-btn-background': string
  'preset-btn-text': string
  'preset-btn-active-background': string
  'datepicker-background': string
  'datepicker-text': string
  'datepicker-border': string
}

const DEFAULTS: ColorConfig = {
  'calendar-background': '#ffffff',
  'calendar-text': '#1f2937',
  'calendar-border': '#e5e7eb',
  'calendar-hover': '#f3f4f6',
  'calendar-selected': '#3b82f6',
  'calendar-today': '#dbeafe',
  'calendar-primary': '#1d4ed8',
  'calendar-disabled': '#d1d5db',
  'presets-background': '#f8f9fa',
  'presets-border': '#e9ecef',
  'preset-btn-background': '#ffffff',
  'preset-btn-text': '#495057',
  'preset-btn-active-background': '#3b82f6',
  'datepicker-background': '#ffffff',
  'datepicker-text': '#1f2937',
  'datepicker-border': '#d1d5db',
}

const ColorRow = ({ label, varKey, colors, onChange }: {
  label: string
  varKey: keyof ColorConfig
  colors: ColorConfig
  onChange: (key: keyof ColorConfig, val: string) => void
}) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #f1f5f9' }}>
    <span style={{ fontSize: '12px', color: '#6b7280' }}>{label}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#9ca3af' }}>{colors[varKey]}</span>
      <input type="color" value={colors[varKey]} onChange={e => onChange(varKey, e.target.value)}
        style={{ width: '28px', height: '28px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #e5e7eb', padding: '2px' }} />
    </div>
  </div>
)

const SectionTitle = ({ children }: { children: string }) => (
  <p style={{ fontSize: '11px', fontWeight: 600, color: '#3b82f6', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{children}</p>
)

const CustomizationTab: React.FC<CustomizationTabProps> = ({ outputAD, onADSelect, copied, onCopyCode, renderOutput }) => {
  const [colors, setColors] = useState<ColorConfig>(DEFAULTS)
  const handleChange = (key: keyof ColorConfig, val: string) => setColors(prev => ({ ...prev, [key]: val }))

  const cssVars = Object.entries(colors).reduce((acc, [k, v]) => {
    acc[`--${k}`] = v
    return acc
  }, {} as Record<string, string>)

  const code = `<Calendar
  calendarType="BS"
  colors={{
    primary: '${colors['calendar-primary']}',
    selected: '${colors['calendar-selected']}',
    today: '${colors['calendar-today']}',
    hover: '${colors['calendar-hover']}',
    background: '${colors['calendar-background']}',
    text: '${colors['calendar-text']}',
    border: '${colors['calendar-border']}',
    disabled: '${colors['calendar-disabled']}',
  }}
  onDateSelect={(date) => console.log(date)}
/>`

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      {/* Left: controls */}
      <div>
        <h3 style={{ color: '#111827', fontSize: '16px', fontWeight: 600, marginTop: 0, marginBottom: '16px' }}>Live Color Customization</h3>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
          <SectionTitle>Calendar</SectionTitle>
          {(['calendar-background', 'calendar-text', 'calendar-border', 'calendar-hover', 'calendar-selected', 'calendar-today', 'calendar-primary', 'calendar-disabled'] as (keyof ColorConfig)[]).map(k => (
            <ColorRow key={k} label={k.replace('calendar-', '')} varKey={k} colors={colors} onChange={handleChange} />
          ))}
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
          <SectionTitle>Range Presets</SectionTitle>
          {(['presets-background', 'presets-border', 'preset-btn-background', 'preset-btn-text', 'preset-btn-active-background'] as (keyof ColorConfig)[]).map(k => (
            <ColorRow key={k} label={k.replace('presets-', '').replace('preset-btn-', 'btn-')} varKey={k} colors={colors} onChange={handleChange} />
          ))}
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
          <SectionTitle>DatePicker Input</SectionTitle>
          {(['datepicker-background', 'datepicker-text', 'datepicker-border'] as (keyof ColorConfig)[]).map(k => (
            <ColorRow key={k} label={k.replace('datepicker-', '')} varKey={k} colors={colors} onChange={handleChange} />
          ))}
        </div>

        <button onClick={() => setColors(DEFAULTS)}
          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#f9fafb', color: '#374151', cursor: 'pointer', fontSize: '12px' }}>
          Reset to defaults
        </button>
      </div>

      {/* Right: preview */}
      <div>
        <h3 style={{ color: '#111827', fontSize: '16px', fontWeight: 600, marginTop: 0, marginBottom: '16px' }}>Preview</h3>
        <div style={cssVars as React.CSSProperties}>
          <Calendar calendarType="BS" mode="range" showRangePresets rangePresetsPosition="top"
            presetKeys={[PRESET_KEYS.THIS_MONTH, PRESET_KEYS.LAST_MONTH, PRESET_KEYS.LAST_7_DAYS]}
            onDateSelect={onADSelect} />
          <div style={{ marginTop: '12px' }}>
            <DatePicker calendarType="BS" placeholder="Select date" onDateSelect={onADSelect} />
          </div>
        </div>
        {renderOutput(outputAD)}
        <div style={{ position: 'relative', marginTop: '12px' }}>
          <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '11px', overflow: 'auto', margin: 0 }}>{code}</pre>
          <button onClick={() => onCopyCode(code, 'custom-live')}
            style={{ position: 'absolute', top: '8px', right: '8px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
            {copied === 'custom-live' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomizationTab
