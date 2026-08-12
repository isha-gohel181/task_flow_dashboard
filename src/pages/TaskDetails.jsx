import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { getTask, deleteTask } from '../services/api'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

function TaskDetails({ tasks, setTasks, showToast }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchTask = async () => {
    setLoading(true)
    setError(null)

    // Check if task exists in parent local state first (e.g. newly created tasks)
    const localTask = tasks.find((t) => t.id === Number(id))
    if (localTask && Number(id) > 200) {
      setTask(localTask)
      setLoading(false)
      return
    }

    try {
      const data = await getTask(id)
      setTask(data)
    } catch (err) {
      // Fallback to local state if available
      if (localTask) {
        setTask(localTask)
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [id, tasks])

  // DELETE /todos/:id, update parent state, navigate back
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    setDeleting(true)
    try {
      await deleteTask(id)
      setTasks(tasks.filter((t) => t.id !== Number(id)))
      if (showToast) showToast('Task deleted successfully!', 'delete')
      navigate('/')
    } catch (err) {
      // Fallback local deletion
      setTasks(tasks.filter((t) => t.id !== Number(id)))
      if (showToast) showToast('Task deleted successfully!', 'delete')
      navigate('/')
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorState message={error} onRetry={fetchTask} />
  if (!task) return <ErrorState message="Task not found" onRetry={fetchTask} />

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} />
        <span>Back to Tasks</span>
      </Link>

      <div className="detail-header">
        <h1 className="detail-page-title">Task Details</h1>
        <button
          className="detail-delete-btn"
          onClick={handleDelete}
          disabled={deleting}
        >
          <Trash2 size={16} />
          <span>{deleting ? 'Deleting...' : 'Delete Task'}</span>
        </button>
      </div>

      <div className="detail-main-card">
        <div className="detail-status-row">
          <span className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>

        <h2 className="detail-task-title">{task.title}</h2>
        <div className="detail-task-meta-line">
          Task #{task.id} {task.userId ? `· User #${task.userId}` : ''}
        </div>

        <div className="detail-section">
          <h3 className="detail-section-heading">Description</h3>
          <p className="detail-description-text">
            This is a placeholder description for the task. In a real application, 
            this would contain detailed information about what needs to be done, requirements, 
            and contextual notes.
          </p>
        </div>

        <hr className="detail-divider" />

        <div className="detail-metadata-grid">
          <div className="metadata-item">
            <span className="metadata-label">Task ID</span>
            <span className="metadata-value">{task.id}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">User ID</span>
            <span className="metadata-value">{task.userId || 1}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Status</span>
            <span className="metadata-value">{task.completed ? 'Completed' : 'Pending'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails
