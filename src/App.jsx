import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import TaskDetails from './pages/TaskDetails'
import './App.css'

function App() {
  return (
    <>
      {/* Header appears on every page, outside of <Routes> */}
      <Header />

      {/* Route table — only ONE of these renders at a time */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </>
  )
}

export default App
