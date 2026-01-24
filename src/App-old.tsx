import { useState } from 'react'
import { Calendar } from './index'
import type { DateOutput, DateRange } from './types'
import './App.css'

type TabType = 'basic' | 'localization' | 'range' | 'advanced' | 'customization'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('basic')
  const [outputAD1, setOutputAD1] = useState<string>('')
  const [outputBS1, setOutputBS1] = useState<string>('')
  const [outputAD2, setOutputAD2] = useState<string>('')
  const [outputBS2, setOutputBS2] = useState<string>('')
  const [outputAD3, setOutputAD3] = useState<string>('')
  const [outputBS3, setOutputBS3] = useState<string>('')
  const [outputAD4, setOutputAD4] = useState<string>('')
  const [outputBS4, setOutputBS4] = useState<string>('')
  const [outputAD5, setOutputAD5] = useState<string>('')
  const [outputBS5, setOutputBS5] = useState<string>('')

  const [showCode, setShowCode] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
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

      {/* Basic Tab */}
      {activeTab === 'basic' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 320px))', gap: '15px', justifyContent: 'center' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', background: 'white' }}>
            <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>AD Calendar</h3>
            <Calendar calendarType="AD" onDateSelect={(data: DateOutput) => setOutputAD1(JSON.stringify(data))} />
            {renderOutput(outputAD1)}
            <button onClick={() => setShowCode(showCode === 'basic-ad' ? null : 'basic-ad')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', color: '#111827' }}>
              {showCode === 'basic-ad' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'basic-ad' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
                  {`<Calendar
  calendarType="AD"
  onDateSelect={(data) => console.log(data)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="AD"
  onDateSelect={(data) => console.log(data)}
/>`, 'basic-ad')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
                  {copied === 'basic-ad' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', background: 'white' }}>
            <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>BS Calendar</h3>
            <Calendar calendarType="BS" onDateSelect={(data: DateOutput) => setOutputBS1(JSON.stringify(data))} />
            {renderOutput(outputBS1)}
            <button onClick={() => setShowCode(showCode === 'basic-bs' ? null : 'basic-bs')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', color: '#111827' }}>
              {showCode === 'basic-bs' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'basic-bs' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
                  {`<Calendar
  calendarType="BS"
  onDateSelect={(data) => console.log(data)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="BS"
  onDateSelect={(data) => console.log(data)}
/>`, 'basic-bs')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
                  {copied === 'basic-bs' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Localization Tab */}
      {activeTab === 'localization' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 320px))', gap: '15px', justifyContent: 'center' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', background: 'white' }}>
            <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>AD - Nepali Numbers</h3>
            <Calendar calendarType="AD" showNepaliNumbers={true} onDateSelect={(data: DateOutput) => setOutputAD2(JSON.stringify(data))} />
            {renderOutput(outputAD2)}
            <button onClick={() => setShowCode(showCode === 'local-ad' ? null : 'local-ad')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', color: '#111827' }}>
              {showCode === 'local-ad' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'local-ad' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
                  {`<Calendar
  calendarType="AD"
  showNepaliNumbers={true}
  onDateSelect={(data) => console.log(data)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="AD"
  showNepaliNumbers={true}
  onDateSelect={(data) => console.log(data)}
/>`, 'local-ad')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
                  {copied === 'local-ad' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', background: 'white' }}>
            <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>BS - Full Nepali</h3>
            <Calendar calendarType="BS" showNepaliMonths={true} showNepaliDays={true} showNepaliNumbers={true} onDateSelect={(data: DateOutput) => setOutputBS2(JSON.stringify(data))} />
            {renderOutput(outputBS2)}
            <button onClick={() => setShowCode(showCode === 'local-bs' ? null : 'local-bs')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', color: '#111827' }}>
              {showCode === 'local-bs' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'local-bs' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
                  {`<Calendar
  calendarType="BS"
  showNepaliMonths={true}
  showNepaliDays={true}
  showNepaliNumbers={true}
  onDateSelect={(data) => console.log(data)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="BS"
  showNepaliMonths={true}
  showNepaliDays={true}
  showNepaliNumbers={true}
  onDateSelect={(data) => console.log(data)}
/>`, 'local-bs')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
                  {copied === 'local-bs' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Range Tab */}
      {activeTab === 'range' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: '600px', margin: '0 auto', gap: '15px', justifyContent: 'center' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', background: 'white' }}>
            <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>AD Range Picker with Presets</h3>
            <Calendar calendarType="AD" mode="range" showRangePresets={true} rangePresetsPosition="left" onRangeSelect={(range: DateRange) => setOutputAD3(JSON.stringify(range))} />
            {renderRangeOutput(outputAD3)}
            <button onClick={() => setShowCode(showCode === 'range-ad' ? null : 'range-ad')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', color: '#111827' }}>
              {showCode === 'range-ad' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'range-ad' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
                  {`<Calendar
  calendarType="AD"
  mode="range"
  onRangeSelect={(range) => console.log(range)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="AD"
  mode="range"
  onRangeSelect={(range) => console.log(range)}
/>`, 'range-ad')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
                  {copied === 'range-ad' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', background: 'white' }}>
            <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>BS Range Picker with Presets</h3>
            <Calendar calendarType="BS" mode="range" showRangePresets={true} rangePresetsPosition="left" onRangeSelect={(range: DateRange) => setOutputBS3(JSON.stringify(range))} />
            {renderRangeOutput(outputBS3)}
            <button onClick={() => setShowCode(showCode === 'range-bs' ? null : 'range-bs')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', color: '#111827' }}>
              {showCode === 'range-bs' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'range-bs' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
                  {`<Calendar
  calendarType="BS"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="left"
  onRangeSelect={(range) => console.log(range)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="BS"
  mode="range"
  showRangePresets={true}
  rangePresetsPosition="left"
  onRangeSelect={(range) => console.log(range)}
/>`, 'range-bs')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
                  {copied === 'range-bs' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Advanced Tab */}
      {activeTab === 'advanced' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 320px))', gap: '15px', justifyContent: 'center' }}>
          <div style={{ border: '1px solid #374151', borderRadius: '8px', padding: '15px', background: '#1f2937' }}>
            <h3 style={{ color: '#f9fafb', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>AD Dark Theme</h3>
            <Calendar calendarType="AD" theme="dark" minDate="2024-01-01" maxDate="2024-12-31" onDateSelect={(data: DateOutput) => setOutputAD4(JSON.stringify(data))} />
            {outputAD4 && (
              <div style={{ background: '#111827', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '13px', marginTop: '10px' }}>
                <div><strong>BS:</strong> {JSON.parse(outputAD4).bs}</div>
                <div><strong>AD:</strong> {JSON.parse(outputAD4).ad}</div>
                <div style={{ marginTop: '8px' }}><strong>Formatted:</strong></div>
                <div style={{ marginLeft: '10px' }}>BS: {JSON.parse(outputAD4).formatted.bs}</div>
                <div style={{ marginLeft: '10px' }}>AD: {JSON.parse(outputAD4).formatted.ad}</div>
              </div>
            )}
            <button onClick={() => setShowCode(showCode === 'adv-ad' ? null : 'adv-ad')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
              {showCode === 'adv-ad' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'adv-ad' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#000', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
                  {`<Calendar
  calendarType="AD"
  theme="dark"
  minDate="2024-01-01"
  maxDate="2024-12-31"
  onDateSelect={(data) => console.log(data)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="AD"
  theme="dark"
  minDate="2024-01-01"
  maxDate="2024-12-31"
  onDateSelect={(data) => console.log(data)}
/>`, 'adv-ad')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#000', color: '#f9fafb' }}>
                  {copied === 'adv-ad' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>

          <div style={{ border: '1px solid #374151', borderRadius: '8px', padding: '15px', background: '#1f2937' }}>
            <h3 style={{ color: '#f9fafb', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>BS Dark Theme</h3>
            <Calendar calendarType="BS" theme="dark" minDate="2081-01-01" maxDate="2081-12-30" onDateSelect={(data: DateOutput) => setOutputBS4(JSON.stringify(data))} />
            {outputBS4 && (
              <div style={{ background: '#111827', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '13px', marginTop: '10px' }}>
                <div><strong>BS:</strong> {JSON.parse(outputBS4).bs}</div>
                <div><strong>AD:</strong> {JSON.parse(outputBS4).ad}</div>
                <div style={{ marginTop: '8px' }}><strong>Formatted:</strong></div>
                <div style={{ marginLeft: '10px' }}>BS: {JSON.parse(outputBS4).formatted.bs}</div>
                <div style={{ marginLeft: '10px' }}>AD: {JSON.parse(outputBS4).formatted.ad}</div>
              </div>
            )}
            <button onClick={() => setShowCode(showCode === 'adv-bs' ? null : 'adv-bs')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
              {showCode === 'adv-bs' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'adv-bs' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#000', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
                  {`<Calendar
  calendarType="BS"
  theme="dark"
  minDate="2081-01-01"
  maxDate="2081-12-30"
  onDateSelect={(data) => console.log(data)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="BS"
  theme="dark"
  minDate="2081-01-01"
  maxDate="2081-12-30"
  onDateSelect={(data) => console.log(data)}
/>`, 'adv-bs')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#000', color: '#f9fafb' }}>
                  {copied === 'adv-bs' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App


      {/* Customization Tab */}
      {activeTab === 'customization' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 320px))', gap: '15px', justifyContent: 'center' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', background: 'white' }}>
            <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>Custom Colors</h3>
            <Calendar 
              calendarType="AD" 
              colors={{
                primary: '#10b981',
                selected: '#10b981',
                today: '#d1fae5',
                hover: '#f0fdf4'
              }}
              onDateSelect={(data: DateOutput) => setOutputAD5(JSON.stringify(data))} 
            />
            {outputAD5 && (
              <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', marginTop: '10px', color: '#111827' }}>
                <div><strong>BS:</strong> {JSON.parse(outputAD5).bs}</div>
                <div><strong>AD:</strong> {JSON.parse(outputAD5).ad}</div>
              </div>
            )}
            <button onClick={() => setShowCode(showCode === 'custom-ad' ? null : 'custom-ad')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', color: '#111827' }}>
              {showCode === 'custom-ad' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'custom-ad' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
{`<Calendar
  calendarType="AD"
  colors={{
    primary: '#10b981',
    selected: '#10b981',
    today: '#d1fae5',
    hover: '#f0fdf4'
  }}
  onDateSelect={(data) => console.log(data)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="AD"
  colors={{
    primary: '#10b981',
    selected: '#10b981',
    today: '#d1fae5',
    hover: '#f0fdf4'
  }}
  onDateSelect={(data) => console.log(data)}
/>`, 'custom-ad')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
                  {copied === 'custom-ad' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', background: 'white' }}>
            <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>Custom Purple Theme</h3>
            <Calendar 
              calendarType="BS" 
              colors={{
                primary: '#9333ea',
                selected: '#9333ea',
                today: '#f3e8ff',
                hover: '#faf5ff',
                border: '#e9d5ff'
              }}
              onDateSelect={(data: DateOutput) => setOutputBS5(JSON.stringify(data))} 
            />
            {outputBS5 && (
              <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', marginTop: '10px', color: '#111827' }}>
                <div><strong>BS:</strong> {JSON.parse(outputBS5).bs}</div>
                <div><strong>AD:</strong> {JSON.parse(outputBS5).ad}</div>
              </div>
            )}
            <button onClick={() => setShowCode(showCode === 'custom-bs' ? null : 'custom-bs')} style={{ marginTop: '10px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #e5e7eb', background: 'white', color: '#111827' }}>
              {showCode === 'custom-bs' ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode === 'custom-bs' && (
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '12px', borderRadius: '4px', fontSize: '12px', marginTop: '10px', overflow: 'auto' }}>
{`<Calendar
  calendarType="BS"
  colors={{
    primary: '#9333ea',
    selected: '#9333ea',
    today: '#f3e8ff',
    hover: '#faf5ff',
    border: '#e9d5ff'
  }}
  onDateSelect={(data) => console.log(data)}
/>`}
                </pre>
                <button onClick={() => copyCode(`<Calendar
  calendarType="BS"
  colors={{
    primary: '#9333ea',
    selected: '#9333ea',
    today: '#f3e8ff',
    hover: '#faf5ff',
    border: '#e9d5ff'
  }}
  onDateSelect={(data) => console.log(data)}
/>`, 'custom-bs')} style={{ position: 'absolute', top: '15px', right: '10px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #374151', background: '#111827', color: '#f9fafb' }}>
                  {copied === 'custom-bs' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
