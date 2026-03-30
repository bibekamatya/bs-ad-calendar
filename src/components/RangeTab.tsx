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

const RangeTab: React.FC<RangeTabProps> = ({ outputAD, outputBS, onADSelect, onBSSelect, copied, onCopyCode, renderRangeOutput }) => {
  const presetKeys = [PRESET_KEYS.THIS_WEEK, PRESET_KEYS.LAST_7_DAYS, PRESET_KEYS.LAST_30_DAYS, PRESET_KEYS.THIS_MONTH, PRESET_KEYS.LAST_MONTH, PRESET_KEYS.LAST_3_MONTHS, PRESET_KEYS.LAST_6_MONTHS]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
      <ExampleCard title="BS Calendar - Presets on Left" codeId="range-bs" copied={copied} onCopyCode={onCopyCode} output={renderRangeOutput(outputBS)}
        code={`<Calendar\n  calendarType="BS"\n  mode="range"\n  showRangePresets\n  rangePresetsPosition="left"\n  onRangeSelect={(range) => console.log(range)}\n/>`}>
        <Calendar calendarType="BS" mode="range" showRangePresets rangePresetsPosition="left" presetKeys={presetKeys} onRangeSelect={onBSSelect} />
      </ExampleCard>

      <ExampleCard title="AD Calendar - Presets on Right" codeId="range-ad-top" copied={copied} onCopyCode={onCopyCode} output={renderRangeOutput(outputAD)}
        code={`<Calendar\n  calendarType="AD"\n  mode="range"\n  showRangePresets\n  rangePresetsPosition="right"\n  onRangeSelect={(range) => console.log(range)}\n/>`}>
        <Calendar calendarType="AD" mode="range" showRangePresets rangePresetsPosition="right" presetKeys={presetKeys} onRangeSelect={onADSelect} />
      </ExampleCard>

      <ExampleCard title="Custom Preset Labels" codeId="range-custom" copied={copied} onCopyCode={onCopyCode} output={null}
        code={`<Calendar\n  calendarType="BS"\n  mode="range"\n  showRangePresets\n  presetKeys={[PRESET_KEYS.LAST_7_DAYS, PRESET_KEYS.THIS_MONTH]}\n  presetLabels={{\n    [PRESET_KEYS.LAST_7_DAYS]: 'पछिल्लो ७ दिन',\n    [PRESET_KEYS.THIS_MONTH]: 'यो महिना'\n  }}\n  onRangeSelect={(range) => console.log(range)}\n/>`}>
        <Calendar calendarType="BS" mode="range" showRangePresets
          presetKeys={[PRESET_KEYS.LAST_7_DAYS, PRESET_KEYS.THIS_MONTH]}
          presetLabels={{ [PRESET_KEYS.LAST_7_DAYS]: 'पछिल्लो ७ दिन', [PRESET_KEYS.THIS_MONTH]: 'यो महिना' }}
          onRangeSelect={() => {}} />
      </ExampleCard>
    </div>
  )
}

export default RangeTab
