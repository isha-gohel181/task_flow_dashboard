import { Link } from 'react-router-dom'
import { Trash2, Check } from 'lucide-react'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-row ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-left">
        <label className="custom-checkbox-label">
          <input
            type="checkbox"
            className="task-checkbox-input"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className="custom-checkbox">
            {task.completed && <Check size={12} strokeWidth={3} />}
          </span>
        </label>

        <div className="task-details-col">
          <Link to={`/tasks/${task.id}`} className="task-title-link">
            {task.title}
          </Link>
          <span className="task-subtitle">
            Task #{task.id} {task.userId ? `· User #${task.userId}` : ''}
          </span>
        </div>
      </div>

      <div className="task-right">
        <span className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>

        <button 
          className="task-delete-icon-btn" 
          onClick={() => onDelete(task.id)}
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  )
}

export default TaskItem
