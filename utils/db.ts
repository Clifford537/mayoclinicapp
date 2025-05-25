// app/utils/db.ts
import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('mydb.db');

export function escapeQuotes(str: string): string {
  return str.replace(/'/g, "''");
}

export function initDb() {
  db.withTransactionSync(() => {
    (db as any).transactionSync((tx: any) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS patients (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
        );
      `);

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS patient_notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          patient_id INTEGER NOT NULL,
          visit_number TEXT NOT NULL,
          date TEXT NOT NULL,
          reason_for_visit TEXT,
          history TEXT,
          vital_signs TEXT,
          physical_exam TEXT,
          assessment TEXT,
          plan TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(patient_id) REFERENCES patients(id)
        );
      `);
    });
  });
}

export default db;
