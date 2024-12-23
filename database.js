
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, role TEXT)");
  db.run("CREATE TABLE availability (id INTEGER PRIMARY KEY, professor_id INTEGER, time_slot TEXT)");
  db.run("CREATE TABLE appointments (id INTEGER PRIMARY KEY, student_id INTEGER, professor_id INTEGER, time_slot TEXT)");
});

module.exports = db;
