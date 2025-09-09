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
}

export default new UsersRepository();
