// ─── main.jsx ───────────────────────────────────────────────
// This is the entry point of the app.
// We wrap <App /> in <BrowserRouter> here so that routing
// is available everywhere in the component tree.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter uses the browser's History API to keep
        the URL in sync with the UI. Placing it here means
        every child component can use Link, useNavigate, etc. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
