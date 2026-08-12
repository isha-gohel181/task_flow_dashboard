import { ListTodo, Clock, CheckCircle2 } from 'lucide-react'

function StatsCards({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending = total - completed

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">TOTAL TASKS</span>
          <div className="stat-icon icon-blue">
            <ListTodo size={18} />
          </div>
        </div>
        <div className="stat-value">{total}</div>
        <div className="stat-description">All tasks in workflow</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">PENDING</span>
          <div className="stat-icon icon-amber">
            <Clock size={18} />
          </div>
        </div>
        <div className="stat-value">{pending}</div>
        <div className="stat-description">Need attention</div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-label">COMPLETED</span>
          <div className="stat-icon icon-green">
            <CheckCircle2 size={18} />
          </div>
        </div>
        <div className="stat-value">{completed}</div>
        <div className="stat-description">Great progress</div>
      </div>
    </div>
  )
}

export default StatsCards
