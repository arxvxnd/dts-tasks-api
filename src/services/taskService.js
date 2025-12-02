const db = require('../db/database');

const VALID_STATUSES = new Set(['pending', 'in_progress', 'completed']);

class TaskService {
  /**
   * Validate incoming task payload. Throws an Error with a `status` property
   * for HTTP mapping when validation fails.
   */
  validatePayload(payload) {
    if (!payload || typeof payload !== 'object') {
      const err = new Error('Payload must be a JSON object');
      err.status = 400;
      throw err;
    }

    const { title, status, due_date_time } = payload;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      const err = new Error('title is required and must be a non-empty string');
      err.status = 400;
      throw err;
    }

    if (!status || typeof status !== 'string' || !VALID_STATUSES.has(status)) {
      const err = new Error(`status is required and must be one of: ${[...VALID_STATUSES].join(', ')}`);
      err.status = 400;
      throw err;
    }

    if (!due_date_time || typeof due_date_time !== 'string') {
      const err = new Error('due_date_time is required and must be an ISO 8601 string');
      err.status = 400;
      throw err;
    }

    // Basic ISO 8601 check — new Date(...) will produce Invalid Date for bad strings.
    const date = new Date(due_date_time);
    if (Number.isNaN(date.getTime())) {
      const err = new Error('due_date_time must be a valid date/time string in ISO 8601 format');
      err.status = 400;
      throw err;
    }
  }

  /**
   * Create a new task and return the inserted row.
   * Returns an object representing the created task.
   */
  createTask(payload) {
    // Validate first
    this.validatePayload(payload);

    const { title, description = null, status, due_date_time } = payload;
    const now = new Date().toISOString(); // store timestamps in ISO 8601 format

    const insert = db.prepare(`
      INSERT INTO tasks (title, description, status, due_date_time, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(title.trim(), description, status, due_date_time, now, now);

    // result.lastInsertRowid holds the newly created id (better-sqlite3)
    const id = result.lastInsertRowid;

    // Fetch the newly created row to return a complete record
    const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

    return row;
  }
}

module.exports = new TaskService();
