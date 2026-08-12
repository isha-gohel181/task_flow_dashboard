import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getTasks } from './services/api'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import TaskDetails from './pages/TaskDetails'
import Loading from './components/Loading'
import ErrorState from './components/ErrorState'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) return <Loading />
  if (error) return <ErrorState message={error} onRetry={fetchTasks} />

  return (
    <>
      <Header completedCount={completedCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              tasks={tasks}
              setTasks={setTasks}
            />
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <TaskDetails
              tasks={tasks}
              setTasks={setTasks}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
