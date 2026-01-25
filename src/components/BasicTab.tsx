import React from 'react'
import { Calendar } from '../index'
import type { DateOutput } from '../types'
import ExampleCard from './ExampleCard'

interface BasicTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (data: DateOutput) => void
  onBSSelect: (data: DateOutput) => void
  copied: string | null
  onToggleCode: (id: string) => void
  onCopyCode: (code: string, id: string) => void
  renderOutput: (output: string) => React.ReactNode
}

const BasicTab: React.FC<BasicTabProps> = ({
  outputAD,
  outputBS,
  onADSelect,
  onBSSelect,
  copied,
  onToggleCode,
  onCopyCode,
  renderOutput
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))', gap: '20px', justifyContent: 'center', maxWidth: '1400px', margin: '0 auto' }}>
      <ExampleCard
        title="AD Calendar"
        code={`<Calendar
  calendarType="AD"
  onDateSelect={(data) => console.log(data)}
/>`}
        codeId="basic-ad"
        showCode="basic-ad"
        copied={copied}
        onToggleCode={onToggleCode}
        onCopyCode={onCopyCode}
        output={renderOutput(outputAD)}
      >
        <Calendar calendarType="AD" onDateSelect={onADSelect} />
      </ExampleCard>

      <ExampleCard
        title="BS Calendar"
        code={`<Calendar
  calendarType="BS"
  onDateSelect={(data) => console.log(data)}
/>`}
        codeId="basic-bs"
        showCode="basic-bs"
        copied={copied}
        onToggleCode={onToggleCode}
        onCopyCode={onCopyCode}
        output={renderOutput(outputBS)}
      >
        <Calendar calendarType="BS" onDateSelect={onBSSelect} />
      </ExampleCard>
    </div>
  )
}

export default BasicTab
