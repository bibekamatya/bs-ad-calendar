import { useState } from 'react'
import { Calendar } from './index'
import './App.css'

function App() {
  const [selectedDateAD, setSelectedDateAD] = useState<string>('')
  const [selectedDateBS, setSelectedDateBS] = useState<string>('')

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>BS-AD Calendar Demo</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        {/* AD Calendar */}
        <div>
          <h3>Gregorian (AD) Calendar</h3>
          <Calendar
            calendarType="AD"
            value={selectedDateAD}
            onChange={setSelectedDateAD}
            showToday={true}
          />
        </div>

        {/* BS Calendar with Range */}
        <div>
          <h3>Bikram Sambat (BS) Calendar - Full Nepali</h3>
          <Calendar
            calendarType="BS"
            mode="range"
            showNepaliMonths={true}
            showNepaliDays={true}
            showNepaliNumbers={true}
            onRangeSelect={(range) => {
              console.log('Range selected:', range)
              setSelectedDateBS(JSON.stringify(range))
            }}
            showToday={true}
          />
          {selectedDateBS && (
            <div style={{ marginTop: '10px', fontSize: '14px' }}>
              <strong>Selected Range:</strong> {selectedDateBS}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App