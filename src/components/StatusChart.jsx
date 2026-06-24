function StatusChart({ students }) {
  const statusCounts = {
    'Excellent': 0,
    'On Track': 0,
    'Needs Help': 0,
    'At Risk': 0
  }

  students.forEach((student) => {
    if (statusCounts[student.status] !== undefined) {
      statusCounts[student.status]++
    }
  })

  const total = students.length || 1

  return (
    <section className="panel status-chart-panel">
      <div className="panel-header">
        <div>
          <h2>Project Health</h2>
          <p>Distribution of student status</p>
        </div>
      </div>
      <div style={{ display: 'grid', gap: '14px', marginTop: '8px' }}>
        {Object.entries(statusCounts).map(([status, count]) => {
          const percentage = (count / total) * 100
          
          let barBg = '#ef4444' // At Risk (Danger)
          if (status === 'Excellent') barBg = '#10b981' // Green
          else if (status === 'On Track') barBg = '#3b82f6' // Blue
          else if (status === 'Needs Help') barBg = '#f59e0b' // Orange

          return (
            <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ minWidth: '85px', fontSize: '0.82rem', fontWeight: 700 }}>{status}</span>
              <div style={{ flex: 1, height: '10px', background: '#edf0f5', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: barBg,
                    borderRadius: '999px',
                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.82rem', minWidth: '16px', textAlign: 'right', fontWeight: 800 }}>{count}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default StatusChart
