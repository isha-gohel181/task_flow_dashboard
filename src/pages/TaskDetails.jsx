import { useParams, useNavigate, Link } from 'react-router-dom'

// Same sample data — in a real app you'd fetch by id.
const sampleTasks = [
  { id: 1, title: 'Design homepage wireframe', status: 'In Progress',
    description: 'Create low-fidelity wireframes for the homepage layout including hero section, features grid, and footer.' },
  { id: 2, title: 'Set up project repository',  status: 'Completed',
    description: 'Initialize Git repo, configure CI/CD pipeline, and add branch protection rules.' },
  { id: 3, title: 'Write API documentation',    status: 'Pending',
    description: 'Document all REST endpoints with request/response examples using OpenAPI spec.' },
]

function TaskDetails() {
  // ① Pull the :id parameter from the URL
  const { id } = useParams()

  // ② Get the navigate function for programmatic navigation
  const navigate = useNavigate()

  // ③ Find the matching task (id from URL is always a string)
  const task = sampleTasks.find((t) => t.id === Number(id))

  // ④ Handle "not found"
  if (!task) {
    return (
      <section className="task-details">
        <h1>Task not found</h1>
        <p>No task with id "{id}" exists.</p>
        {/* Link navigates back to the dashboard */}
        <Link to="/" className="back-link">← Back to Dashboard</Link>
      </section>
    )
  }

  return (
    <section className="task-details">
      {/* Button uses navigate(-1) to go back one step in history,
          or navigate('/') to go to a specific route */}
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Dashboard
      </button>

      <div className="detail-card">
        <h1>{task.title}</h1>
        <span className={`task-status status-${task.status.toLowerCase().replace(' ', '-')}`}>
          {task.status}
        </span>
        <p className="detail-description">{task.description}</p>
        <p className="detail-id">Task ID: {id}</p>
      </div>
    </section>
  )
}

export default TaskDetails
