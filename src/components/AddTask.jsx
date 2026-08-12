import { useState } from 'react'

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
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task-input"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={adding}
      />
      <button type="submit" className="add-task-btn" disabled={adding}>
        {adding ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}

export default AddTask
