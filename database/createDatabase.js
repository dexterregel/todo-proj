import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';

async function createDatabase() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      todo_uuid UUID PRIMARY KEY NOT NULL,
      todo_text TEXT NOT NULL,
      date_created TEXT NOT NULL
    )
  `);

  await db.close();
}

await createDatabase();