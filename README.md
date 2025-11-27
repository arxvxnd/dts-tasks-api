# dts-tasks-api

## Purpose
Backend API for creating HMCTS caseworker tasks. Supports creation only. No update, delete, or list operations.

## Planned Tech Stack
- Language: Node.js
- Framework: Express
- Database: SQLite
- Testing: Jest
- Documentation: Markdown and optional OpenAPI specification

## Planned Features
- POST /tasks endpoint
- Accepts: title, optional description, status, due_date_time
- Returns: full stored task object including id, created_at, and updated_at
- Input validation and structured error responses

## To Be Added Later
- Installation and setup steps
- Environment variable configuration
- Database migration instructions
- Running tests
- API documentation
- Example payloads and responses
- Screenshots (optional)

## Design Decisions
- Status values: todo, in_progress, done
- Validation:
  - title required
  - status must match allowed values
  - due_date_time must be a valid ISO 8601 datetime
- Error handling: consistent JSON error format for validation and server errors
