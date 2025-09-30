import sqlite3 from "sqlite3";

let db;

export async function initDb() {
  db = await new Promise((resolve, reject) => {
    const instance = new sqlite3.Database("./data/app.db", (err) => {
      if (err) {
        return reject(err);
      }
      console.log("Connected to SQLite DB: ./data/app.db");
      resolve(instance);
    });
  });

  await runAsync(
    db,
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE
    )
  `
  );

  await runAsync(
    db,
    `
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      description TEXT NOT NULL,
      duration INTEGER NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `
  );

  console.log("Tables created");
  return db;
}

function runAsync(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

export function getDb() {
  if (!db) throw new Error("Db is not yet initialized");
  return db;
}
