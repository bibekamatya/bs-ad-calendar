import React from 'react'
import { Calendar } from '../index'
import type { DateOutput } from '../types'
import ExampleCard from './ExampleCard'

interface BasicTabProps {
  outputAD: string
  outputBS: string
  onADSelect: (data: DateOutput) => void
  onBSSelect: (data: DateOutput) => void
  renderOutput: (output: string) => React.ReactNode
}

const BasicTab: React.FC<BasicTabProps> = ({
  outputAD,
  outputBS,
  onADSelect,
  onBSSelect,
  renderOutput
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))', gap: '20px', justifyContent: 'center', maxWidth: '1400px', margin: '0 auto' }}>
      <ExampleCard
        title="AD Calendar"
        output={renderOutput(outputAD)}
      >
        <Calendar calendarType="AD" onDateSelect={onADSelect} />
      </ExampleCard>

      <ExampleCard
        title="BS Calendar"
        output={renderOutput(outputBS)}
      >
        <Calendar calendarType="BS" onDateSelect={onBSSelect} />
      </ExampleCard>
    </div>
  )
}

export default BasicTab
