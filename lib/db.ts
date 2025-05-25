import * as Crypto from 'expo-crypto';
import { openDatabaseSync } from 'expo-sqlite';

// Define SQLiteSyncTransaction type
type SQLiteSyncTransaction = {
  executeSql: (
    sqlStatement: string,
    args?: (string | number | null)[]
  ) => {
    rows: {
      _array: any[];
      length: number;
    };
  };
};

const db = openDatabaseSync('app.db');

// --- Initialize DB ---
export function initializeDatabase() {
  try {
    db.withTransactionSync(function (this: SQLiteSyncTransaction) {
      this.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL
        );
      `);

      this.executeSql(`
        CREATE TABLE IF NOT EXISTS visits (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          visit_date TEXT NOT NULL,
          notes TEXT,
          FOREIGN KEY(user_id) REFERENCES users(id)
        );
      `);

      this.executeSql(`
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          visit_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(visit_id) REFERENCES visits(id)
        );
      `);
    });

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('DB init error:', error);
  }
}

// Alias for initializeDatabase
export { initializeDatabase as initDB };

// --- Auth helpers ---
async function hashPassword(password: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}

export async function registerUser(
  username: string,
  password: string
): Promise<boolean> {
  const password_hash = await hashPassword(password);

  try {
    db.withTransactionSync(function (this: SQLiteSyncTransaction) {
      this.executeSql(
        'INSERT INTO users (username, password_hash) VALUES (?, ?);',
        [username, password_hash]
      );
    });
    return true;
  } catch (error) {
    console.error('Register error:', error);
    return false;
  }
}

export async function loginUser(
  username: string,
  password: string
): Promise<boolean> {
  const password_hash = await hashPassword(password);

  try {
    let userFound = false;

    db.withTransactionSync(function (this: SQLiteSyncTransaction) {
      const result = this.executeSql(
        'SELECT * FROM users WHERE username = ? AND password_hash = ?;',
        [username, password_hash]
      );
      userFound = result.rows.length > 0;
    });

    return userFound;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}

// New: Get user by username
export function getUserByEmail(username: string): Promise<any | null> {
  return new Promise((resolve, reject) => {
    let user = null;
    try {
      db.withTransactionSync(function (this: SQLiteSyncTransaction) {
        const result = this.executeSql(
          'SELECT * FROM users WHERE username = ?;',
          [username]
        );
        if (result.rows.length > 0) {
          user = result.rows._array[0];
        }
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}

// --- Visits CRUD ---
export function addVisit(userId: number, visitDate: string, notes: string) {
  try {
    db.withTransactionSync(function (this: SQLiteSyncTransaction) {
      this.executeSql(
        'INSERT INTO visits (user_id, visit_date, notes) VALUES (?, ?, ?);',
        [userId, visitDate, notes]
      );
    });
  } catch (error) {
    console.error('Add visit error:', error);
  }
}

export function getVisits(userId: number, callback: (visits: any[]) => void) {
  try {
    db.withTransactionSync(function (this: SQLiteSyncTransaction) {
      const result = this.executeSql(
        'SELECT * FROM visits WHERE user_id = ? ORDER BY visit_date DESC;',
        [userId]
      );
      callback(result.rows._array);
    });
  } catch (error) {
    console.error('Get visits error:', error);
    callback([]);
  }
}

export function updateVisitNotes(visitId: number, notes: string) {
  try {
    db.withTransactionSync(function (this: SQLiteSyncTransaction) {
      this.executeSql(
        'UPDATE visits SET notes = ? WHERE id = ?;',
        [notes, visitId]
      );
    });
  } catch (error) {
    console.error('Update notes error:', error);
  }
}
