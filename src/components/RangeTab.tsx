import React from 'react'
import { Calendar } from '../index'
import type { DateRange } from '../types'
import ExampleCard from './ExampleCard'

interface RangeTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (range: DateRange) => void
  onBSSelect: (range: DateRange) => void
  showCode: string | null
  copied: string | null
  onToggleCode: (id: string) => void
  onCopyCode: (code: string, id: string) => void
  renderRangeOutput: (output: string) => React.ReactNode
}

const RangeTab: React.FC<RangeTabProps> = ({
  outputAD,
  outputBS,
  onADSelect,
  onBSSelect,
  showCode,
  copied,
  onToggleCode,
  onCopyCode,
  renderRangeOutput
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
      <ExampleCard
        title="AD Range Picker with Presets"
        code={`<Calendar
  calendarType="AD"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="left"
  onRangeSelect={(range) => console.log(range)}
/>`}
        codeId="range-ad"
        showCode={showCode}
        copied={copied}
        onToggleCode={onToggleCode}
        onCopyCode={onCopyCode}
        output={renderRangeOutput(outputAD)}
      >
        <Calendar calendarType="AD" mode="range" showRangePresets={true} rangePresetsPosition="left" onRangeSelect={onADSelect} />
      </ExampleCard>

      <ExampleCard
        title="BS Range Picker with Presets"
        code={`<Calendar
  calendarType="BS"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="left"
  onRangeSelect={(range) => console.log(range)}
/>`}
        codeId="range-bs"
        showCode={showCode}
        copied={copied}
        onToggleCode={onToggleCode}
        onCopyCode={onCopyCode}
        output={renderRangeOutput(outputBS)}
      >
        <Calendar calendarType="BS" mode="range" showRangePresets={true} rangePresetsPosition="left" onRangeSelect={onBSSelect} />
      </ExampleCard>
    </div>
  )
}

export default RangeTab
