# TaskFlow Dashboard

A responsive task management dashboard built with React. Features CRUD operations, routing, API integration, and loading/error handling.

## Tech Stack

- React
- React Router DOM
- Plain CSS
- JavaScript (ES6+)
- Fetch API
- Vite (build tool)

## API

Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock REST API.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos?_limit=10 | Fetch all tasks |
| GET | /todos/:id | Fetch a single task |
| POST | /todos | Create a new task |
| PATCH | /todos/:id | Update a task |
| DELETE | /todos/:id | Delete a task |

> **Note:** JSONPlaceholder is a mock API. POST, PATCH, and DELETE return successful responses but do not persist changes. Local React state is updated to reflect all operations.

## Features

- Dashboard with task list and completed task counter
- Add new tasks with disabled state during API request
- Toggle task completion (checkbox with line-through styling)
- Delete tasks from the dashboard or task details page
- Task details page showing Task ID, User ID, Title, Status, and Description
- Loading spinner, error state with retry, and empty state
- Fully responsive (mobile, tablet, desktop)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation

```bash
git clone https://github.com/isha-gohel181/task_flow_dashboard.git
cd task_flow_dashboard
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── AddTask.jsx       # Add task form with disabled state
│   ├── EmptyState.jsx    # Empty list message
│   ├── ErrorState.jsx    # Error message with retry button
│   ├── Header.jsx        # App header with completed counter
│   ├── Loading.jsx       # Loading spinner
│   ├── TaskItem.jsx      # Single task row (checkbox, title, delete)
│   └── TaskList.jsx      # Task list container
├── pages/
│   ├── Dashboard.jsx     # Main dashboard (CRUD operations)
│   └── TaskDetails.jsx   # Task detail view with delete
├── services/
│   └── api.js            # Fetch API service (CRUD functions)
├── App.jsx               # Root component with routes
├── App.css               # Component styles
├── index.css             # Global styles and design tokens
└── main.jsx              # Entry point with BrowserRouter
```
