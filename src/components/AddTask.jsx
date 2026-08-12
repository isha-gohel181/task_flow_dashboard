import { useState } from 'react'
import { Plus } from 'lucide-react'

function AddTask({ onAdd, adding }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <div className="add-task-card">
      <h3 className="add-task-heading">Add a new task</h3>
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="add-task-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={adding}
        />
        <button type="submit" className="add-task-btn" disabled={adding}>
          <Plus size={16} />
          <span>{adding ? 'Adding...' : 'Add Task'}</span>
        </button>
      </form>
    </div>
  )
}

export default AddTask
