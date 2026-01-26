import React from 'react'

interface ExampleCardProps {
  title: string
  children: React.ReactNode
  output?: React.ReactNode
  code: string
  codeId: string
  showCode: string | null
  copied: string | null
  onToggleCode: (id: string) => void
  onCopyCode: (code: string, id: string) => void
  isDark?: boolean
}

const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  children,
  output,
  code,
  codeId,
  showCode,
  copied,
  onToggleCode,
  onCopyCode,
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
      <button 
        onClick={() => onToggleCode(codeId)} 
        style={{ 
          marginTop: '10px', 
          padding: '6px 12px', 
          fontSize: '12px', 
          cursor: 'pointer', 
          borderRadius: '4px', 
          border: isDark ? '1px solid #374151' : '1px solid #e5e7eb', 
          background: isDark ? '#111827' : 'white', 
          color: isDark ? '#f9fafb' : '#111827' 
        }}
      >
        {showCode === codeId ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode === codeId && (
        <div style={{ position: 'relative' }}>
          <pre style={{ 
            background: isDark ? '#000' : '#1f2937', 
            color: '#f9fafb', 
            padding: '12px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            marginTop: '10px', 
            overflow: 'auto' 
          }}>
            {code}
          </pre>
          <button 
            onClick={() => onCopyCode(code, codeId)} 
            style={{ 
              position: 'absolute', 
              top: '15px', 
              right: '10px', 
              padding: '4px 8px', 
              fontSize: '11px', 
              cursor: 'pointer', 
              borderRadius: '4px', 
              border: '1px solid #374151', 
              background: isDark ? '#000' : '#111827', 
              color: '#f9fafb' 
            }}
          >
            {copied === codeId ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}

export default ExampleCard
