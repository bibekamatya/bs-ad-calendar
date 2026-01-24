import React from 'react'
import { Calendar } from '../index'
import type { DateOutput } from '../types'
import ExampleCard from './ExampleCard'

interface LocalizationTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (data: DateOutput) => void
  onBSSelect: (data: DateOutput) => void
  showCode: string | null
  copied: string | null
  onToggleCode: (id: string) => void
  onCopyCode: (code: string, id: string) => void
  renderOutput: (output: string) => React.ReactNode
}

const LocalizationTab: React.FC<LocalizationTabProps> = ({
  outputAD,
  outputBS,
  onADSelect,
  onBSSelect,
  showCode,
  copied,
  onToggleCode,
  onCopyCode,
  renderOutput
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 320px))', gap: '15px', justifyContent: 'center' }}>
      <ExampleCard
        title="AD - Nepali Numbers"
        code={`<Calendar
  calendarType="AD"
  showNepaliNumbers={true}
  onDateSelect={(data) => console.log(data)}
/>`}
        codeId="local-ad"
        showCode={showCode}
        copied={copied}
        onToggleCode={onToggleCode}
        onCopyCode={onCopyCode}
        output={renderOutput(outputAD)}
      >
        <Calendar calendarType="AD" showNepaliNumbers={true} onDateSelect={onADSelect} />
      </ExampleCard>

      <ExampleCard
        title="BS - Full Nepali"
        code={`<Calendar
  calendarType="BS"
  showNepaliMonths={true}
  showNepaliDays={true}
  showNepaliNumbers={true}
  onDateSelect={(data) => console.log(data)}
/>`}
        codeId="local-bs"
        showCode={showCode}
        copied={copied}
        onToggleCode={onToggleCode}
        onCopyCode={onCopyCode}
        output={renderOutput(outputBS)}
      >
        <Calendar calendarType="BS" showNepaliMonths={true} showNepaliDays={true} showNepaliNumbers={true} onDateSelect={onBSSelect} />
      </ExampleCard>
    </div>
  )
}

export default LocalizationTab
