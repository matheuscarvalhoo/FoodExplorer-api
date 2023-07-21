const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.db');

function sqliteConnection() {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log('Connected to the SQlite database.');
        resolve(db);
      }
    });
  });
}

module.exports = sqliteConnection;
