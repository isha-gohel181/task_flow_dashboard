import { useState, useEffect } from 'react'
import { getTasks } from '../services/api'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

function Dashboard() {
  // State for the task list, loading flag, and error message
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch tasks from the API when the component mounts
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

  // useEffect runs once on mount (empty dependency array)
  useEffect(() => {
    fetchTasks()
  }, [])

  // Add a new task to the local list
  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    }
    setTasks([newTask, ...tasks])
  }

  // Toggle task completed status
  const handleToggle = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Delete a task from the local list
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Show loading spinner while fetching
  if (loading) return <Loading />

  // Show error with retry button if fetch failed
  if (error) return <ErrorState message={error} onRetry={fetchTasks} />

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <p className="dashboard-subtitle">
          {tasks.filter((t) => !t.completed).length} tasks remaining
        </p>
      </div>

      <AddTask onAdd={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </section>
  )
}

export default Dashboard
