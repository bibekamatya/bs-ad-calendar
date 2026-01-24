import React from 'react'
import { Calendar } from '../index'
import type { DateOutput } from '../types'
import ExampleCard from './ExampleCard'

interface AdvancedTabProps {
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

const AdvancedTab: React.FC<AdvancedTabProps> = ({
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
        title="AD Dark Theme"
        code={`<Calendar
  calendarType="AD"
  theme="dark"
  minDate="2024-01-01"
  maxDate="2024-12-31"
  onDateSelect={(data) => console.log(data)}
/>`}
        codeId="adv-ad"
        showCode={showCode}
        copied={copied}
        onToggleCode={onToggleCode}
        onCopyCode={onCopyCode}
        output={renderOutput(outputAD)}
        isDark={true}
      >
        <Calendar calendarType="AD" theme="dark" minDate="2024-01-01" maxDate="2024-12-31" onDateSelect={onADSelect} />
      </ExampleCard>

      <ExampleCard
        title="BS Dark Theme"
        code={`<Calendar
  calendarType="BS"
  theme="dark"
  minDate="2081-01-01"
  maxDate="2081-12-30"
  onDateSelect={(data) => console.log(data)}
/>`}
        codeId="adv-bs"
        showCode={showCode}
        copied={copied}
        onToggleCode={onToggleCode}
        onCopyCode={onCopyCode}
        output={renderOutput(outputBS)}
        isDark={true}
      >
        <Calendar calendarType="BS" theme="dark" minDate="2081-01-01" maxDate="2081-12-30" onDateSelect={onBSSelect} />
      </ExampleCard>
    </div>
  )
}

export default AdvancedTab
