const Database = require('better-sqlite3');
const path = require('path');

// Path to your SQLite file (committed to repo)
const dbPath = path.join(__dirname, 'tasks.db');

const db = new Database(dbPath);

module.exports = db;
