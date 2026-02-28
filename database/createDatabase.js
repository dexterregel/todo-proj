import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';

async function createDatabase() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  await db.exec('BEGIN TRANSACTION');

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_uuid UUID PRIMARY KEY NOT NULL,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      user_uuid UUID NOT NULL,
      todo_uuid UUID PRIMARY KEY NOT NULL,
      todo_text TEXT NOT NULL,
      date_created TEXT NOT NULL,
      FOREIGN KEY (user_uuid) REFERENCES users(user_uuid)
    )
  `);

  await db.exec('COMMIT');

  await db.close();
}

await createDatabase();