import { getDb } from "../db/index.js";

class UsersRepository {
  async getUsers() {
    const db = getDb();
    return new Promise((resolve, reject) => {
      db.all("SELECT id AS _id, username FROM users", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  async getUser(id) {
    const db = getDb();
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT id AS _id, username FROM users WHERE id = ?",
        [id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row || null);
        }
      );
    });
  }
  async findByUsername(username) {
    const db = getDb();
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT id AS _id, username FROM users WHERE username = ?",
        [username],
        (err, row) => (err ? reject(err) : resolve(row || null))
      );
    });
  }
  async create(username) {
    const db = getDb();
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (username) VALUES (?)",
        [username],
        function (err) {
          if (err) return reject(err);
          resolve({ _id: this.lastID, username });
        }
      );
    });
  }
  async createExercise(userId, exercise) {
    const db = getDb();
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO exercises (user_id, description, duration, date) 
       VALUES (?, ?, ?, ?)`,
        [
          userId,
          exercise.description,
          exercise.duration,
          exercise.date || new Date().toISOString().slice(0, 10),
        ],
        function (err) {
          if (err) return reject(err);
          resolve({
            _id: this.lastID,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date,
          });
        }
      );
    });
  }
  async countExercises(userId, { from, to }) {
    const db = getDb();
    let sql = `SELECT COUNT(*) as total FROM exercises WHERE user_id = ?`;
    const params = [userId];

    if (from) {
      sql += ` AND date >= ?`;
      params.push(from);
    }
    if (to) {
      sql += ` AND date <= ?`;
      params.push(to);
    }

    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) return reject(err);
        resolve(row.total);
      });
    });
  }

  async getExercises(userId, { from, to, limit }) {
    const db = getDb();
    let sql = `SELECT description, duration, date FROM exercises WHERE user_id = ?`;
    const params = [userId];

    if (from) {
      sql += ` AND date >= ?`;
      params.push(from);
    }
    if (to) {
      sql += ` AND date <= ?`;
      params.push(to);
    }
    sql += ` ORDER BY date ASC`;

    if (limit) {
      sql += ` LIMIT ?`;
      params.push(limit);
    }

    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);

        const formatted = rows.map((r) => ({
          description: r.description,
          duration: r.duration,
          date: new Date(r.date).toDateString(),
        }));

        resolve(formatted);
      });
    });
  }
}

export default new UsersRepository();
