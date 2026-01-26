import React from 'react'

interface ExampleCardProps {
  title: string
  children: React.ReactNode
  output?: React.ReactNode
  code?: string
  codeId?: string
  copied?: string | null
  onCopyCode?: (code: string, id: string) => void
  isDark?: boolean
}

const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  children,
  output,
  code,
  codeId,
  copied,
  onCopyCode,
  isDark = false
}) => {
  return (
    <div
      style={{
        border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '15px',
        background: isDark ? '#1f2937' : 'white'
      }}
    >
      <h3
        style={{
          color: isDark ? '#f9fafb' : '#111827',
          marginTop: 0,
          marginBottom: '10px',
          fontSize: '16px'
        }}
      >
        {title}
      </h3>
      {children}
      {output}
      {code && (
        <div style={{ position: 'relative', marginTop: '10px' }}>
          <pre
            style={{
              background: isDark ? '#000' : '#1f2937',
              color: '#f9fafb',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              margin: 0
            }}
          >
            {code}
          </pre>
          {codeId && onCopyCode && (
            <button
              onClick={() => onCopyCode(code, codeId)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                padding: '4px 8px',
                fontSize: '11px',
                cursor: 'pointer',
                borderRadius: '4px',
                border: '1px solid #374151',
                background: '#111827',
                color: '#f9fafb'
              }}
            >
              {copied === codeId ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ExampleCard
