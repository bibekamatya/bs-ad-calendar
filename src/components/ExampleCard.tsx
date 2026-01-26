import React from 'react'

interface ExampleCardProps {
  title: string
  children: React.ReactNode
  output?: React.ReactNode
  isDark?: boolean
}

const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  children,
  output,
  isDark = false
}) => {
  return (
    <div style={{ 
      border: isDark ? '1px solid #374151' : '1px solid #e5e7eb', 
      borderRadius: '8px', 
      padding: '15px', 
      background: isDark ? '#1f2937' : 'white' 
    }}>
      <h3 style={{ 
        color: isDark ? '#f9fafb' : '#111827', 
        marginTop: 0, 
        marginBottom: '10px', 
        fontSize: '16px' 
      }}>
        {title}
      </h3>
      {children}
      {output}
    </div>
  )
}

export default ExampleCard
