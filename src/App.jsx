import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getTasks } from './services/api'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Toast from './components/Toast'
import Dashboard from './pages/Dashboard'
import TaskDetails from './pages/TaskDetails'
import Loading from './components/Loading'
import ErrorState from './components/ErrorState'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  return (
    <div className="app-container">
      <Sidebar 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
      />

      <div className="main-wrapper">
        <Topbar 
          onMenuClick={() => setMobileOpen(true)}
          completedCount={completedCount}
          totalCount={totalCount}
        />

        <main className="main-content">
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchTasks} />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    tasks={tasks}
                    setTasks={setTasks}
                    showToast={showToast}
                  />
                }
              />
              <Route
                path="/tasks/:id"
                element={
                  <TaskDetails
                    tasks={tasks}
                    setTasks={setTasks}
                    showToast={showToast}
                  />
                }
              />
            </Routes>
          )}
        </main>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}

export default App
