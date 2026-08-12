import { Link, useLocation } from 'react-router-dom'
import { Zap, LayoutDashboard, CheckSquare } from 'lucide-react'

function Sidebar({ mobileOpen, setMobileOpen }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div>
          <div className="sidebar-brand">
            <Zap className="brand-icon" size={22} />
            <span className="brand-title">TaskFlow</span>
          </div>

          <nav className="sidebar-nav">
            <Link 
              to="/" 
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </Link>
            <Link 
              to="/" 
              className={`nav-item ${location.pathname.startsWith('/tasks') || location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <CheckSquare size={18} />
              <span>My Tasks</span>
            </Link>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="avatar">IG</div>
          <div className="user-info">
            <div className="user-name">Isha Gohel</div>
            <div className="user-role">Frontend Dev</div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
