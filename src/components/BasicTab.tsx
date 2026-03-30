import React from 'react'
import { Calendar } from '../index'
import type { DateOutput } from '../types'
import ExampleCard from './ExampleCard'

interface BasicTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (date: DateOutput) => void
  onBSSelect: (date: DateOutput) => void
  copied: string | null
  onCopyCode: (code: string, id: string) => void
  renderOutput: (output: string) => React.ReactNode
}

const BasicTab: React.FC<BasicTabProps> = ({ outputAD, outputBS, onADSelect, onBSSelect, copied, onCopyCode, renderOutput }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))', gap: '20px', justifyContent: 'center' }}>
      <ExampleCard title="BS Calendar" code={`<Calendar\n  calendarType="BS"\n  onDateSelect={(date) => console.log(date)}\n/>`} codeId="basic-bs" copied={copied} onCopyCode={onCopyCode} output={renderOutput(outputBS)}>
        <Calendar calendarType="BS" onDateSelect={onBSSelect} />
      </ExampleCard>
      <ExampleCard title="AD Calendar" code={`<Calendar\n  calendarType="AD"\n  onDateSelect={(date) => console.log(date)}\n/>`} codeId="basic-ad" copied={copied} onCopyCode={onCopyCode} output={renderOutput(outputAD)}>
        <Calendar calendarType="AD" onDateSelect={onADSelect} />
      </ExampleCard>
    </div>
  )
}

export default BasicTab
