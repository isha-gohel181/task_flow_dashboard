import { Link } from 'react-router-dom'

// Some sample tasks so the page isn't empty.
// In a real app these would come from an API or context.
const sampleTasks = [
  { id: 1, title: 'Design homepage wireframe', status: 'In Progress' },
  { id: 2, title: 'Set up project repository',  status: 'Completed' },
  { id: 3, title: 'Write API documentation',    status: 'Pending' },
]

function Dashboard() {
  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <p className="dashboard-subtitle">Your tasks at a glance</p>

      <ul className="task-list">
        {sampleTasks.map((task) => (
          <li key={task.id} className="task-card">
            {/* Link builds the URL dynamically: /tasks/1, /tasks/2, etc. */}
            <Link to={`/tasks/${task.id}`} className="task-link">
              <span className="task-title">{task.title}</span>
              <span className={`task-status status-${task.status.toLowerCase().replace(' ', '-')}`}>
                {task.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Dashboard
