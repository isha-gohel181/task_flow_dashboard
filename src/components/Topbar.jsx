import { Menu } from 'lucide-react'

function Topbar({ onMenuClick, completedCount = 0, totalCount = 0 }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button 
          className="mobile-menu-toggle" 
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <div className="topbar-title-group">
          <h1 className="topbar-title">TaskFlow Dashboard</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="completed-counter-badge">
          <span className="counter-dot" />
          <span>{completedCount} / {totalCount} Completed</span>
        </div>
      </div>
    </header>
  )
}

export default Topbar
