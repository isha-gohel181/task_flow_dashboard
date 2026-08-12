import { Link } from 'react-router-dom'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <Link to={`/tasks/${task.id}`} className="task-title">
          {task.title}
        </Link>
      </div>
      <div className="task-actions">
        <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
        <button className="task-delete-btn" onClick={() => onDelete(task.id)}>
          ✕
        </button>
      </div>
    </li>
  )
}

export default TaskItem
