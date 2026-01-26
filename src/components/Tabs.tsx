import React from 'react'

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <>
      {/* Mobile: Dropdown */}
      <div className="md:hidden mb-4">
        <select
          value={activeTab}
          onChange={e => onTabChange(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            background: '#ffffff',
            color: '#111827',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          {tabs.map(tab => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: Vertical tabs */}
      <div className="hidden md:flex md:flex-col gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-teal-600 !text-white shadow-lg shadow-teal-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  )
}

export default Tabs
