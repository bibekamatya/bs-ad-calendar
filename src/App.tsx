import { useState } from 'react'
import type { DateOutput, DateRange } from './types'
import BasicTab from './components/BasicTab'
import LocalizationTab from './components/LocalizationTab'
import RangeTab from './components/RangeTab'
import AdvancedTab from './components/AdvancedTab'
import CustomizationTab from './components/CustomizationTab'
import './App.css'

type TabType = 'basic' | 'localization' | 'range' | 'advanced' | 'customization'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('basic')
  const [outputs, setOutputs] = useState<Record<string, string>>({})
  const [showCode, setShowCode] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const handleOutput = (key: string, data: DateOutput) => {
    setOutputs(prev => ({ ...prev, [key]: JSON.stringify(data) }))
  }

  const handleRangeOutput = (key: string, range: DateRange) => {
    setOutputs(prev => ({ ...prev, [key]: JSON.stringify(range) }))
  }

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleCode = (id: string) => {
    setShowCode(showCode === id ? null : id)
  }

  const tabStyle = (tab: TabType) => ({
    padding: '12px 24px',
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
    background: activeTab === tab ? '#eff6ff' : 'white',
    color: activeTab === tab ? '#3b82f6' : '#6b7280',
    fontWeight: activeTab === tab ? '600' : '400',
    transition: 'all 0.2s'
  })

  const renderOutput = (output: string) => {
    if (!output) return null
    const data = JSON.parse(output)
    return (
      <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', marginTop: '10px', color: '#111827' }}>
        <div><strong>BS:</strong> {data.bs}</div>
        <div><strong>AD:</strong> {data.ad}</div>
        <div style={{ marginTop: '8px' }}><strong>Formatted:</strong></div>
        <div style={{ marginLeft: '10px' }}>BS: {data.formatted.bs}</div>
        <div style={{ marginLeft: '10px' }}>AD: {data.formatted.ad}</div>
      </div>
    )
  }

  const renderRangeOutput = (output: string) => {
    if (!output) return null
    const range = JSON.parse(output)
    return (
      <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', marginTop: '10px', color: '#111827' }}>
        <div><strong>Start:</strong> {range.start?.year}-{String(range.start?.month + 1).padStart(2, '0')}-{String(range.start?.day).padStart(2, '0')}</div>
        <div><strong>End:</strong> {range.end?.year}-{String(range.end?.month + 1).padStart(2, '0')}-{String(range.end?.day).padStart(2, '0')}</div>
      </div>
    )
  }

  return (
    <div className="App" style={{ background: '#f9fafb', minHeight: '100vh', paddingTop: '10px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '15px', color: '#111827', fontSize: '24px' }}>BS-AD Calendar Examples</h1>

      <div style={{ display: 'flex', gap: '0', marginBottom: '15px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', justifyContent: 'center' }}>
        <button onClick={() => setActiveTab('basic')} style={tabStyle('basic')}>Basic</button>
        <button onClick={() => setActiveTab('localization')} style={tabStyle('localization')}>Localization</button>
        <button onClick={() => setActiveTab('range')} style={tabStyle('range')}>Range Selection</button>
        <button onClick={() => setActiveTab('customization')} style={tabStyle('customization')}>Customization</button>
        <button onClick={() => setActiveTab('advanced')} style={tabStyle('advanced')}>Advanced</button>
      </div>

      {activeTab === 'basic' && (
        <BasicTab
          outputAD={outputs.ad1 || ''}
          outputBS={outputs.bs1 || ''}
          onADSelect={(data) => handleOutput('ad1', data)}
          onBSSelect={(data) => handleOutput('bs1', data)}
          showCode={showCode}
          copied={copied}
          onToggleCode={toggleCode}
          onCopyCode={copyCode}
          renderOutput={renderOutput}
        />
      )}

      {activeTab === 'localization' && (
        <LocalizationTab
          outputAD={outputs.ad2 || ''}
          outputBS={outputs.bs2 || ''}
          onADSelect={(data) => handleOutput('ad2', data)}
          onBSSelect={(data) => handleOutput('bs2', data)}
          showCode={showCode}
          copied={copied}
          onToggleCode={toggleCode}
          onCopyCode={copyCode}
          renderOutput={renderOutput}
        />
      )}

      {activeTab === 'range' && (
        <RangeTab
          outputAD={outputs.ad3 || ''}
          outputBS={outputs.bs3 || ''}
          onADSelect={(range) => handleRangeOutput('ad3', range)}
          onBSSelect={(range) => handleRangeOutput('bs3', range)}
          showCode={showCode}
          copied={copied}
          onToggleCode={toggleCode}
          onCopyCode={copyCode}
          renderRangeOutput={renderRangeOutput}
        />
      )}

      {activeTab === 'advanced' && (
        <AdvancedTab
          outputAD={outputs.ad4 || ''}
          outputBS={outputs.bs4 || ''}
          onADSelect={(data) => handleOutput('ad4', data)}
          onBSSelect={(data) => handleOutput('bs4', data)}
          showCode={showCode}
          copied={copied}
          onToggleCode={toggleCode}
          onCopyCode={copyCode}
          renderOutput={renderOutput}
        />
      )}

      {activeTab === 'customization' && (
        <CustomizationTab
          outputAD={outputs.ad5 || ''}
          onADSelect={(data) => handleOutput('ad5', data)}
          showCode={showCode}
          copied={copied}
          onToggleCode={toggleCode}
          onCopyCode={copyCode}
          renderOutput={renderOutput}
        />
      )}
    </div>
  )
}

export default App
