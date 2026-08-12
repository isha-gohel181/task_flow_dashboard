import { useState } from 'react'
import { createTask, updateTask, deleteTask } from '../services/api'
import StatsCards from '../components/StatsCards'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'

function Dashboard({ tasks, setTasks, showToast }) {
  const [adding, setAdding] = useState(false)

  // POST to /todos, then add to local state
  const handleAddTask = async (title) => {
    setAdding(true)
    try {
      const data = await createTask({ title, completed: false, userId: 1 })
      // Use Date.now() for unique id since JSONPlaceholder always returns id: 201
      setTasks([{ ...data, id: Date.now() }, ...tasks])
      if (showToast) showToast('Task added successfully!', 'success')
    } catch (err) {
      if (showToast) showToast('Failed to add task: ' + err.message, 'delete')
    } finally {
      setAdding(false)
    }
  }

  // PATCH /todos/:id, then update local state
  const handleToggle = async (id) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    const newStatus = !task.completed

    // Update local state immediately for responsiveness
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: newStatus } : t
    ))

    if (showToast) {
      showToast(newStatus ? 'Task marked as completed!' : 'Task marked as pending!', 'info')
    }

    try {
      await updateTask(id, { completed: newStatus })
    } catch (err) {
      // Revert on failure
      setTasks(tasks.map((t) =>
        t.id === id ? { ...t, completed: task.completed } : t
      ))
      if (showToast) showToast('Failed to update task: ' + err.message, 'delete')
    }
  }

  // DELETE /todos/:id, then remove from local state
  const handleDelete = async (id) => {
    const previousTasks = [...tasks]
    setTasks(tasks.filter((t) => t.id !== id))
    if (showToast) showToast('Task deleted successfully!', 'delete')

    try {
      await deleteTask(id)
    } catch (err) {
      // Revert on failure
      setTasks(previousTasks)
      if (showToast) showToast('Failed to delete task: ' + err.message, 'delete')
    }
  }

  const pendingCount = tasks.filter((t) => !t.completed).length

  return (
    <div className="dashboard-content">
      <StatsCards tasks={tasks} />

      <AddTask onAdd={handleAddTask} adding={adding} />

      <section className="task-section">
        <div className="task-section-header">
          <div className="task-section-title-group">
            <h2>All Tasks</h2>
            <span className="task-count-badge">{pendingCount} pending</span>
          </div>
        </div>

        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </section>
    </div>
  )
}

export default Dashboard
