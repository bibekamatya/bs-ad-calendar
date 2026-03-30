import { useState } from 'react'
import type { DateOutput, DateRangeOutput } from './types'
import BasicTab from './components/BasicTab'
import LocalizationTab from './components/LocalizationTab'
import RangeTab from './components/RangeTab'
import CustomizationTab from './components/CustomizationTab'
import CalendarInputTab from './components/CalendarInputTab'
import AboutTab from './components/AboutTab'
import Tabs from './components/Tabs'
import './App.css'

type TabType = 'about' | 'basic' | 'localization' | 'range' | 'customization' | 'calendarinput'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('about')
  const [outputs, setOutputs] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)

  const handleOutput = (key: string, date: DateOutput) => {
    setOutputs(prev => ({ ...prev, [key]: JSON.stringify(date) }))
  }

  const handleRangeOutput = (key: string, range: DateRangeOutput) => {
    setOutputs(prev => ({ ...prev, [key]: JSON.stringify(range) }))
  }

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const renderOutput = (output: string) => {
    if (!output) return null
    const date = JSON.parse(output)
    return (
      <div
        style={{
          background: '#f3f4f6',
          padding: '12px',
          borderRadius: '4px',
          fontSize: '13px',
          marginTop: '10px',
          color: '#111827'
        }}
      >
        <div>
          <strong>BS:</strong> {date.bs}
        </div>
        <div>
          <strong>AD:</strong> {date.ad}
        </div>
        <div style={{ marginTop: '8px' }}>
          <strong>Formatted:</strong>
        </div>
        <div style={{ marginLeft: '10px' }}>BS: {date.formatted.bs}</div>
        <div style={{ marginLeft: '10px' }}>AD: {date.formatted.ad}</div>
      </div>
    )
  }

  const renderRangeOutput = (output: string) => {
    if (!output) return null
    const range = JSON.parse(output)
    return (
      <div
        style={{
          background: '#f3f4f6',
          padding: '12px',
          borderRadius: '4px',
          fontSize: '13px',
          marginTop: '10px',
          color: '#111827'
        }}
      >
        <div><strong>Start BS:</strong> {range.start?.bs}</div>
        <div><strong>Start AD:</strong> {range.start?.ad}</div>
        <div style={{ marginTop: '6px' }}><strong>End BS:</strong> {range.end?.bs}</div>
        <div><strong>End AD:</strong> {range.end?.ad}</div>
      </div>
    )
  }

  return (
    <div className="bg-linear-to-br from-gray-50 via-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">BS-AD Calendar</h1>
          <p className="text-gray-600 text-sm">
            Modern React calendar component supporting Bikram Sambat (BS) and Gregorian (AD)
            calendars
          </p>
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
                { id: 'basic', label: 'Basic Calendar' },
                { id: 'calendarinput', label: 'Calendar Input' },
                { id: 'range', label: 'Range Selection' },
                { id: 'localization', label: 'Localization' },
                { id: 'customization', label: 'Customization' }
              ]}
              activeTab={activeTab}
              onTabChange={tabId => setActiveTab(tabId as TabType)}
            />
          </div>

          {/* Content */}
          <div className="flex-1 bg-white md:rounded-xl md:shadow-md md:p-8 animate-fadeIn md:ml-56">
            {activeTab === 'about' && <AboutTab />}

            {activeTab === 'basic' && (
              <BasicTab
                outputAD={outputs.ad1 || ''}
                outputBS={outputs.bs1 || ''}
                onADSelect={date => handleOutput('ad1', date)}
                onBSSelect={date => handleOutput('bs1', date)}
                copied={copied}
                onCopyCode={copyCode}
                renderOutput={renderOutput}
              />
            )}

            {activeTab === 'localization' && (
              <LocalizationTab
                outputAD={outputs.ad2 || ''}
                outputBS={outputs.bs2 || ''}
                onADSelect={date => handleOutput('ad2', date)}
                onBSSelect={date => handleOutput('bs2', date)}
                copied={copied}
                onCopyCode={copyCode}
                renderOutput={renderOutput}
              />
            )}

            {activeTab === 'range' && (
              <RangeTab
                outputAD={outputs.ad3 || ''}
                outputBS={outputs.bs3 || ''}
                onADSelect={range => handleRangeOutput('ad3', range)}
                onBSSelect={range => handleRangeOutput('bs3', range)}
                copied={copied}
                onCopyCode={copyCode}
                renderRangeOutput={renderRangeOutput}
              />
            )}

            {activeTab === 'customization' && (
              <CustomizationTab
                outputAD={outputs.ad5 || ''}
                onADSelect={date => handleOutput('ad5', date)}
                copied={copied}
                onCopyCode={copyCode}
                renderOutput={renderOutput}
              />
            )}

            {activeTab === 'calendarinput' && (
              <CalendarInputTab
                outputAD={outputs.ad6 || ''}
                outputBS={outputs.bs6 || ''}
                onADSelect={date => handleOutput('ad6', date)}
                onBSSelect={date => handleOutput('bs6', date)}
                copied={copied}
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
