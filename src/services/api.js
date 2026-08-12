const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

// Checks response status and throws an error if not ok
async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
  return response.json()
}

// Fetch all tasks (limited to 10)
export async function getTasks() {
  const response = await fetch(`${BASE_URL}?_limit=10`)
  return handleResponse(response)
}

// Fetch a single task by id
export async function getTask(id) {
  const response = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(response)
}

// Create a new task
export async function createTask(taskData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  })
  return handleResponse(response)
}

// Update an existing task (partial update)
export async function updateTask(id, taskData) {
  // Local tasks (id > 200 or non-numeric) don't exist on JSONPlaceholder server.
  // Return mock success for local items to prevent 404 / fetch errors.
  if (Number(id) > 200) {
    return { id, ...taskData }
  }

  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    })
    return await handleResponse(response)
  } catch (err) {
    // If fetch fails or mock API returns 404, return local update
    console.warn(`API update task fallback for id ${id}:`, err.message)
    return { id, ...taskData }
  }
}

// Delete a task
export async function deleteTask(id) {
  if (Number(id) > 200) {
    return {}
  }

  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })
    return await handleResponse(response)
  } catch (err) {
    console.warn(`API delete task fallback for id ${id}:`, err.message)
    return {}
  }
}