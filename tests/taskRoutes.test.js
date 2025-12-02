const request = require('supertest');
const app = require('../src/index');
const db = require('../src/db/database');

beforeEach(() => {
  db.prepare('DELETE FROM tasks').run();
  try {
    db.prepare("DELETE FROM sqlite_sequence WHERE name = 'tasks'").run();
  } catch (err) {
    // ignore if sqlite_sequence doesn't exist
  }
});

describe('POST /api/tasks', () => {

  test('returns 201 and creates task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Route test',
        description: 'Testing route',
        status: 'pending',
        due_date_time: '2025-12-01T10:00:00Z'
      });

    expect(response.status).toBe(201);
    expect(response.body.task.id).toBeDefined();
    expect(response.body.task.title).toBe('Route test');
  });

  test('returns 400 for missing title', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        description: 'No title',
        status: 'pending',
        due_date_time: '2025-12-01T10:00:00Z'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/title/i);
  });

  test('returns 400 for invalid status', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Bad status',
        description: 'Wrong status value',
        status: 'nope',
        due_date_time: '2025-12-01T10:00:00Z'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/status/i);
  });

  test('returns 400 for invalid date', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Bad date',
        description: 'Invalid date',
        status: 'pending',
        due_date_time: 'not-a-date'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/date/i);
  });

});
