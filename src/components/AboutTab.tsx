import React, { useState } from 'react'

const AboutTab: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About BS-AD Calendar</h2>
        <p className="text-gray-600 mb-4">
          A modern, feature-rich React calendar component supporting both Bikram Sambat (BS) and Gregorian (AD) calendars with full TypeScript support.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="text-teal-600 font-semibold">Dual Calendar</div>
            <div className="text-sm text-gray-600">BS & AD support</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="text-teal-600 font-semibold">Customizable</div>
            <div className="text-sm text-gray-600">Themes & colors</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="text-teal-600 font-semibold">TypeScript</div>
            <div className="text-sm text-gray-600">Full type support</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="text-teal-600 font-semibold">Responsive</div>
            <div className="text-sm text-gray-600">Mobile friendly</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="text-teal-600 font-semibold">Accessible</div>
            <div className="text-sm text-gray-600">ARIA labels</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg">
            <div className="text-teal-600 font-semibold">Localization</div>
            <div className="text-sm text-gray-600">Nepali support</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation</h2>
        <div style={{ position: 'relative' }}>
          <div style={{ background: '#1f2937', color: '#ffffff', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', overflow: 'auto', border: '1px solid #374151' }}>
            <div>$ npm install bs-ad-calendar-react</div>
          </div>
          <button
            onClick={() => copyCode('npm install bs-ad-calendar-react', 'install')}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px 8px',
              fontSize: '11px',
              background: '#0d9488',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            {copied === 'install' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
        <div style={{ position: 'relative' }}>
          <div style={{ background: '#1f2937', color: '#ffffff', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', overflow: 'auto', border: '1px solid #374151' }}>
            <pre style={{ margin: 0 }}>{`import { Calendar } from 'bs-ad-calendar-react'

function App() {
  return (
    <Calendar
      calendarType="BS"
      onDateSelect={(date) => console.log(date)}
    />
  )
}`}</pre>
          </div>
          <button
            onClick={() => copyCode(`import { Calendar } from 'bs-ad-calendar-react'

function App() {
  return (
    <Calendar
      calendarType="BS"
      onDateSelect={(date) => console.log(date)}
    />
  )
}`, 'quickstart')}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px 8px',
              fontSize: '11px',
              background: '#0d9488',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            {copied === 'quickstart' ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Links</h2>
        <div className="space-y-2">
          <a href="https://github.com/bibekamatya/bs-ad-calendar" target="_blank" rel="noopener noreferrer" className="block text-teal-600 hover:text-teal-700 font-medium">
            → GitHub Repository
          </a>
          <a href="https://www.npmjs.com/package/bs-ad-calendar-react" target="_blank" rel="noopener noreferrer" className="block text-teal-600 hover:text-teal-700 font-medium">
            → NPM Package
          </a>
          <a href="https://github.com/bibekamatya/bs-ad-calendar/issues" target="_blank" rel="noopener noreferrer" className="block text-teal-600 hover:text-teal-700 font-medium">
            → Report Issues
          </a>
        </div>
      </section>
    </div>
  )
}

export default AboutTab
