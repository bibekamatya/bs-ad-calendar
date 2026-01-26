import React from 'react'
import { Calendar } from '../index'
import type { DateRange } from '../types'
import ExampleCard from './ExampleCard'

interface RangeTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (range: DateRange) => void
  onBSSelect: (range: DateRange) => void
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', maxWidth: '800px', margin: '0 auto' }}>
      <ExampleCard
        title="Range Selection with Presets"
        code={`<Calendar
  calendarType="AD"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="left"
  onRangeSelect={(range) => console.log(range)}
/>`}
        codeId="range-basic"
        copied={copied}
        onCopyCode={onCopyCode}
        output={renderRangeOutput(outputAD)}
      >
        <Calendar calendarType="AD" mode="range" showRangePresets={true} rangePresetsPosition="left" onRangeSelect={onADSelect} />
      </ExampleCard>

      <ExampleCard
        title="Custom Predefined Ranges"
        code={`<Calendar
  calendarType="AD"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="left"
  predefinedRanges={[
    {
      key: 'last30days',
      label: 'Last 30 Days',
      getValue: (type) => ({
        start: { year: 2024, month: 0, day: 1 },
        end: { year: 2024, month: 0, day: 31 }
      })
    },
    {
      key: 'last180days',
      label: 'Last 180 Days',
      getValue: (type) => ({
        start: { year: 2023, month: 6, day: 1 },
        end: { year: 2024, month: 0, day: 31 }
      })
    }
  ]}
  onRangeSelect={(range) => console.log(range)}
/>`}
        codeId="range-custom"
        copied={copied}
        onCopyCode={onCopyCode}
        output={renderRangeOutput(outputBS)}
      >
        <Calendar calendarType="AD" mode="range" showRangePresets={true} rangePresetsPosition="left" predefinedRanges={[
          {
            key: 'last30days',
            label: 'Last 30 Days',
            getValue: () => ({ start: { year: 2024, month: 0, day: 1 }, end: { year: 2024, month: 0, day: 31 } })
          },
          {
            key: 'last180days',
            label: 'Last 180 Days',
            getValue: () => ({ start: { year: 2023, month: 6, day: 1 }, end: { year: 2024, month: 0, day: 31 } })
          }
        ]} onRangeSelect={onBSSelect} />
      </ExampleCard>
    </div>
  )
}

export default RangeTab
