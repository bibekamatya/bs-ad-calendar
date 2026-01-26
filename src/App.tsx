import { useState } from 'react'
import type { DateOutput, DateRange } from './types'
import BasicTab from './components/BasicTab'
import LocalizationTab from './components/LocalizationTab'
import RangeTab from './components/RangeTab'
import CustomizationTab from './components/CustomizationTab'
import DatePickerTab from './components/DatePickerTab'
import AboutTab from './components/AboutTab'
import Tabs from './components/Tabs'
import './App.css'

type TabType = 'about' | 'basic' | 'localization' | 'range' | 'customization' | 'datepicker'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('about')
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
    <div className="bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">BS-AD Calendar</h1>
          <p className="text-gray-600 text-sm">Modern React calendar component supporting Bikram Sambat (BS) and Gregorian (AD) calendars</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs - Fixed on left */}
          <div className="md:fixed md:left-0 md:top-0 md:h-screen md:w-48 md:overflow-y-auto md:pt-32 md:pl-4 md:pr-4 md:bg-white md:border-r md:border-gray-200 flex-shrink-0">
            <Tabs
              tabs={[
                { id: 'about', label: 'About' },
                { id: 'basic', label: 'Basic' },
                { id: 'datepicker', label: 'CalendarInput' },
                { id: 'range', label: 'Range Selection' },
                { id: 'localization', label: 'Localization' },
                { id: 'customization', label: 'Customization' }
              ]}
              activeTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId as TabType)}
            />
          </div>

          {/* Content */}
          <div className="flex-1 bg-white md:rounded-xl md:shadow-md md:p-8 animate-fadeIn md:ml-56">

      {activeTab === 'about' && <AboutTab />}

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

      {activeTab === 'datepicker' && (
        <DatePickerTab
          outputAD={outputs.ad6 || ''}
          outputBS={outputs.bs6 || ''}
          onADSelect={(data) => handleOutput('ad6', data)}
          onBSSelect={(data) => handleOutput('bs6', data)}
          showCode={showCode}
          copied={copied}
          onToggleCode={toggleCode}
          onCopyCode={copyCode}
          renderOutput={renderOutput}
        />
      )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
