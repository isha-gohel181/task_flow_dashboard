import { useState } from 'react'
import { createTask, updateTask, deleteTask } from '../services/api'
import AddTask from '../components/AddTask'
import TaskList from '../components/TaskList'

function Dashboard({ tasks, setTasks }) {
  const [adding, setAdding] = useState(false)

  // POST to /todos, then add to local state
  const handleAddTask = async (title) => {
    setAdding(true)
    try {
      const data = await createTask({ title, completed: false, userId: 1 })
      // Use Date.now() for unique id since JSONPlaceholder always returns id: 201
      setTasks([{ ...data, id: Date.now() }, ...tasks])
    } catch (err) {
      alert('Failed to add task: ' + err.message)
    } finally {
      setAdding(false)
    }
  }

  // PATCH /todos/:id, then update local state
  const handleToggle = async (id) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    // Update local state immediately for responsiveness
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))

    try {
      await updateTask(id, { completed: !task.completed })
    } catch (err) {
      // Revert on failure
      setTasks(tasks.map((t) =>
        t.id === id ? { ...t, completed: task.completed } : t
      ))
      alert('Failed to update task: ' + err.message)
    }
  }

  // DELETE /todos/:id, then remove from local state
  const handleDelete = async (id) => {
    const previousTasks = [...tasks]
    setTasks(tasks.filter((t) => t.id !== id))

    try {
      await deleteTask(id)
    } catch (err) {
      // Revert on failure
      setTasks(previousTasks)
      alert('Failed to delete task: ' + err.message)
    }
  }

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <p className="dashboard-subtitle">
          {tasks.filter((t) => !t.completed).length} tasks remaining
        </p>
      </div>

      <AddTask onAdd={handleAddTask} adding={adding} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </section>
  )
}

export default Dashboard
