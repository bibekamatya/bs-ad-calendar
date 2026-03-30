import React from 'react'
import { Calendar, PRESET_KEYS } from '../index'
import type { DateRangeOutput } from '../types'
import ExampleCard from './ExampleCard'

interface RangeTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (range: DateRangeOutput) => void
  onBSSelect: (range: DateRangeOutput) => void
  copied: string | null
  onCopyCode: (code: string, id: string) => void
  renderRangeOutput: (output: string) => React.ReactNode
}

const RangeTab: React.FC<RangeTabProps> = ({
  outputAD,
  outputBS,
  onADSelect,
  onBSSelect,
  copied,
  onCopyCode,
  renderRangeOutput
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '15px',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      <ExampleCard
        title="BS Calendar - Presets on Left"
        code={`<Calendar
  calendarType="BS"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="left"
  presetKeys={[
    PRESET_KEYS.THIS_WEEK,
    PRESET_KEYS.LAST_7_DAYS,
    PRESET_KEYS.LAST_30_DAYS,
    PRESET_KEYS.THIS_MONTH,
    PRESET_KEYS.LAST_MONTH,
    PRESET_KEYS.LAST_3_MONTHS,
    PRESET_KEYS.LAST_6_MONTHS
  ]}
  onRangeSelect={(range) => console.log(range)}
/>`}
        codeId="range-bs"
        copied={copied}
        onCopyCode={onCopyCode}
        output={renderRangeOutput(outputBS)}
      >
        <div style={{ maxWidth: 'fit-content' }}>
          <Calendar
            calendarType="BS"
            mode="range"
            showRangePresets={true}
            rangePresetsPosition="left"
            presetKeys={[
              PRESET_KEYS.THIS_WEEK,
              PRESET_KEYS.LAST_7_DAYS,
              PRESET_KEYS.LAST_30_DAYS,
              PRESET_KEYS.THIS_MONTH,
              PRESET_KEYS.LAST_MONTH,
              PRESET_KEYS.LAST_3_MONTHS,
              PRESET_KEYS.LAST_6_MONTHS
            ]}
            onRangeSelect={onBSSelect}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="AD Calendar - Presets on Right"
        code={`<Calendar
  calendarType="AD"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="right"
  presetKeys={[
    PRESET_KEYS.THIS_WEEK,
    PRESET_KEYS.LAST_7_DAYS,
    PRESET_KEYS.LAST_30_DAYS,
    PRESET_KEYS.THIS_MONTH,
    PRESET_KEYS.LAST_MONTH,
    PRESET_KEYS.LAST_3_MONTHS,
    PRESET_KEYS.LAST_6_MONTHS
  ]}
  onRangeSelect={(range) => console.log(range)}
/>`}
        codeId="range-ad-top"
        copied={copied}
        onCopyCode={onCopyCode}
        output={renderRangeOutput(outputAD)}
      >
        <div style={{ maxWidth: 'fit-content' }}>
          <Calendar
            calendarType="AD"
            mode="range"
            showRangePresets={true}
            rangePresetsPosition="right"
            presetKeys={[
              PRESET_KEYS.THIS_WEEK,
              PRESET_KEYS.LAST_7_DAYS,
              PRESET_KEYS.LAST_30_DAYS,
              PRESET_KEYS.THIS_MONTH,
              PRESET_KEYS.LAST_MONTH,
              PRESET_KEYS.LAST_3_MONTHS,
              PRESET_KEYS.LAST_6_MONTHS
            ]}
            onRangeSelect={onADSelect}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Filtered Presets"
        code={`import { Calendar, PRESET_KEYS } from 'bs-ad-calendar-react'

<Calendar
  calendarType="AD"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="left"
  presetKeys={[
    PRESET_KEYS.LAST_7_DAYS,
    PRESET_KEYS.LAST_30_DAYS,
    PRESET_KEYS.THIS_MONTH,
    PRESET_KEYS.LAST_YEAR
  ]}
  onRangeSelect={(range) => console.log(range)}
/>`}
        codeId="range-ad"
        copied={copied}
        onCopyCode={onCopyCode}
        output={null}
      >
        <div style={{ maxWidth: 'fit-content' }}>
          <Calendar
            calendarType="AD"
            mode="range"
            showRangePresets={true}
            rangePresetsPosition="left"
            presetKeys={[
              PRESET_KEYS.LAST_7_DAYS,
              PRESET_KEYS.LAST_30_DAYS,
              PRESET_KEYS.THIS_MONTH,
              PRESET_KEYS.LAST_YEAR
            ]}
            onRangeSelect={() => {}}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Preset Labels"
        code={`import { Calendar, PRESET_KEYS } from 'bs-ad-calendar-react'

<Calendar
  calendarType="AD"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="left"
  presetKeys={[
    PRESET_KEYS.LAST_7_DAYS,
    PRESET_KEYS.LAST_30_DAYS,
    PRESET_KEYS.THIS_MONTH
  ]}
  presetLabels={{
    [PRESET_KEYS.LAST_7_DAYS]: 'Past Week',
    [PRESET_KEYS.LAST_30_DAYS]: 'Past Month',
    [PRESET_KEYS.THIS_MONTH]: 'Current Month'
  }}
  onRangeSelect={(range) => console.log(range)}
/>`}
        codeId="range-custom"
        copied={copied}
        onCopyCode={onCopyCode}
        output={null}
      >
        <div style={{ maxWidth: 'fit-content' }}>
          <Calendar
            calendarType="AD"
            mode="range"
            showRangePresets={true}
            rangePresetsPosition="left"
            presetKeys={[PRESET_KEYS.LAST_7_DAYS, PRESET_KEYS.LAST_30_DAYS, PRESET_KEYS.THIS_MONTH]}
            presetLabels={{
              [PRESET_KEYS.LAST_7_DAYS]: 'Past Week',
              [PRESET_KEYS.LAST_30_DAYS]: 'Past Month',
              [PRESET_KEYS.THIS_MONTH]: 'Current Month'
            }}
            onRangeSelect={() => {}}
          />
        </div>
      </ExampleCard>
    </div>
  )
}

export default RangeTab
