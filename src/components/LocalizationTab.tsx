import React from 'react'
import { Calendar } from '../index'
import type { DateOutput } from '../types'
import ExampleCard from './ExampleCard'

interface LocalizationTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (date: DateOutput) => void
  onBSSelect: (date: DateOutput) => void
  copied: string | null
  onCopyCode: (code: string, id: string) => void
  renderOutput: (output: string) => React.ReactNode
}

const LocalizationTab: React.FC<LocalizationTabProps> = ({
  outputAD,
  outputBS,
  onADSelect,
  onBSSelect,
  copied,
  onCopyCode,
  renderOutput
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))', gap: '20px', justifyContent: 'center', maxWidth: '1400px', margin: '0 auto' }}>
      <ExampleCard
        title="AD - Nepali Numbers"
        code={`<Calendar
  calendarType="AD"
  showNepaliNumbers={true}
  onDateSelect={(date) => console.log(date)}
/>`}
        codeId="local-ad"
        copied={copied}
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
  onDateSelect={(date) => console.log(date)}
/>`}
        codeId="local-bs"
        copied={copied}
        onCopyCode={onCopyCode}
        output={renderOutput(outputBS)}
      >
        <Calendar calendarType="BS" showNepaliMonths={true} showNepaliDays={true} showNepaliNumbers={true} onDateSelect={onBSSelect} />
      </ExampleCard>
    </div>
  )
}

export default LocalizationTab
