import React from 'react'

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Tabs */}
      <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible overflow-y-hidden flex-nowrap md:flex-wrap gap-2 pb-4 md:pb-0 px-1 md:w-48">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap md:w-full text-left transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-teal-600 !text-white shadow-lg shadow-teal-600/30 scale-105 md:scale-100'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tabs
