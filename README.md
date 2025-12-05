# dts-tasks-frontend

## Purpose
Frontend interface for creating HMCTS caseworker tasks.  
Provides a simple form allowing users to submit task details to the backend API and view the created record.  
Designed for clarity, usability, and demonstration of fundamental frontend engineering practice.

## Tech Stack
- **Language:** JavaScript (ES Modules)
- **Framework:** React (via Vite)
- **Communication:** Fetch API (POST request to backend)
- **State management:** React hooks
- **Styling:** Inline component styles (dark-mode friendly)

---

## Features

### Task Creation UI
Allows entry of:

- `title` (required)
- `description` (optional)
- `status` (`pending`, `in_progress`, `completed`)
- `due date/time` (via datetime-local input)

### API Integration
Sends the form payload to:

---

## Features

### Task Creation UI
Allows entry of:

- `title` (required)
- `description` (optional)
- `status` (`pending`, `in_progress`, `completed`)
- `due date/time` (via datetime-local input)

### API Integration
Sends the form payload to:

POST http://localhost:5000/api/tasks

Displays:

- Success message and full returned task record
- Error message if validation fails or the server rejects input

### Dark-Mode Friendly Layout
- Centred card UI
- High-contrast input/control styles
- Clear feedback and error messages

---

## Installation

```bash
npm install
npm run dev
```

Default development URL:
http://localhost:5173

Backend required and expected to be running at:
http://localhost:5000/api

## Usage

### 1. Run the backend API

```bash
node src/index.js
```

### 2. Start the frontend
```bash
npm run dev
```

### 3. Open the application in your browser
```bash
http://localhost:5173
```

### 4. Submit a task through the form
Enter a title, select status, pick a due date/time, optionally add a description, then submit to create a task.
