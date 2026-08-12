import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      {/* Link to="/" navigates to the Dashboard route
          without reloading the page */}
      <Link to="/" className="header-logo">
        TaskFlow
      </Link>
      <nav className="header-nav">
        <Link to="/">Dashboard</Link>
      </nav>
    </header>
  )
}

export default Header
