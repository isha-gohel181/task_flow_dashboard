import { Link } from 'react-router-dom'

function Header({ completedCount = 0 }) {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        TaskFlow Dashboard
      </Link>
      <span className="header-counter">
        {completedCount} completed
      </span>
    </header>
  )
}

export default Header
