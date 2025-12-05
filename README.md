# dts-tasks-api

## Purpose
Backend API for creating HMCTS caseworker tasks.  
Supports **task creation only** (no list, update, or delete).  
Designed for clarity, correctness, and demonstration of backend engineering fundamentals.

## Tech Stack
- **Language:** Node.js  
- **Framework:** Express  
- **Database:** SQLite (via better-sqlite3)  
- **Testing:** Jest + Supertest  
- **Documentation:** Markdown (with optional OpenAPI extension)

---

## Features
### `POST /api/tasks`
Creates a new task with:

- `title` (string, required)  
- `description` (string, optional)  
- `status` (required: `pending`, `in_progress`, `completed`)  
- `due_date_time` (ISO 8601 datetime string, required)

Returns:
- The full stored task object including:
  - `id`
  - `title`
  - `description`
  - `status`
  - `due_date_time`
  - `created_at`
  - `updated_at`

### Validation
- `title` must be a non-empty string  
- `status` must be in: `pending`, `in_progress`, `completed`  
- `due_date_time` must be a valid ISO 8601 date string  

### Error Handling
Consistent JSON error format:

```json
{ "error": "message explaining what went wrong" }
```

## Installation
```bash
npm install
npm run migrate
node src/index.js
```

## Running Tests
```bash
npm test
```
