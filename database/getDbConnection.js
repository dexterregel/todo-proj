import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'node:path';

export async function getDbConnection() {
  return await open({
    // the path to the filename must be relative to server.js
    filename: path.join('database', 'database.db'),
    driver: sqlite3.Database
  });
}