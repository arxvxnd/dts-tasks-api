const fs = require('fs');
const path = require('path');
const db = require('./database');

function runMigrations() {
    const migrationsDir = path.join(__dirname, '../../migrations');

    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));

    files.sort().forEach(file => {
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        console.log(`Running migration: ${file}`);
        db.exec(sql);
    });

    console.log('All migrations executed.');
}

runMigrations();
