const taskService = require('../src/services/taskService');
const db = require('../src/db/database');

// Clean the database before every test
beforeEach(() => {
  db.prepare('DELETE FROM tasks').run();
  db.prepare("DELETE FROM sqlite_sequence WHERE name = 'tasks'").run();
});


describe('TaskService.createTask', () => {

  test('creates a task successfully', () => {
    const payload = {
      title: 'Test Task',
      description: 'Sample description',
      status: 'pending',
      due_date_time: '2025-12-01T10:00:00Z'
    };

    const task = taskService.createTask(payload);

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Sample description');
    expect(task.status).toBe('pending');
    expect(task.due_date_time).toBe('2025-12-01T10:00:00Z');
    expect(task.created_at).toBeDefined();
    expect(task.updated_at).toBeDefined();
  });

  test('throws for missing title', () => {
    const payload = {
      description: 'Missing title!',
      status: 'pending',
      due_date_time: '2025-12-01T10:00:00Z'
    };

    expect(() => taskService.createTask(payload)).toThrow('title is required');
  });

  test('throws for invalid status', () => {
    const payload = {
      title: 'Bad status test',
      description: 'Invalid status value',
      status: 'something_invalid',
      due_date_time: '2025-12-01T10:00:00Z'
    };

    expect(() => taskService.createTask(payload)).toThrow('status is required');
  });

  test('throws for invalid date', () => {
    const payload = {
      title: 'Bad date test',
      description: 'Invalid date',
      status: 'pending',
      due_date_time: 'not-a-date'
    };

    expect(() => taskService.createTask(payload)).toThrow('due_date_time must be a valid');
  });

});
