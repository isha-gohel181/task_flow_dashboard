import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTask, deleteTask } from '../services/api'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

function TaskDetails({ tasks, setTasks }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchTask = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTask(id)
      setTask(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [id])

  // DELETE /todos/:id, update parent state, navigate back
  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteTask(id)
      setTasks(tasks.filter((t) => t.id !== Number(id)))
      navigate('/')
    } catch (err) {
      alert('Failed to delete task: ' + err.message)
      setDeleting(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorState message={error} onRetry={fetchTask} />

  return (
    <section className="task-details">
      <div className="detail-top-bar">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back
        </button>
        <button
          className="detail-delete-btn"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete Task'}
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-row">
          <span className="detail-label">Task ID</span>
          <span className="detail-value">{task.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">User ID</span>
          <span className="detail-value">{task.userId}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Title</span>
          <span className="detail-value">{task.title}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Description</span>
          <span className="detail-value detail-description">
            This is a placeholder description for the task. In a real application,
            this would contain detailed information about what needs to be done.
          </span>
        </div>
      </div>
    </section>
  )
}

export default TaskDetails
