import { getDbConnection } from '../database/getDbConnection.js';
import { v4 as uuidv4 } from 'uuid';

export async function getTodos(req, res) {
  try {
    const dbConn = await getDbConnection();
    const todos = await dbConn.all(`
      SELECT * FROM todos
      ORDER BY date_created ASC
    `);

    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
  }
}

export async function createTodo(req, res) {
  try {
    const dbConn = await getDbConnection();
    await dbConn.exec('BEGIN TRANSACTION');
    await dbConn.run(`
      INSERT INTO todos (todo_uuid, todo_text, date_created)
      VALUES (?, ?, ?)
    `, [uuidv4(), req.body.todoText, new Date().toISOString()]);
    await dbConn.exec('COMMIT');

    res.status(201).json(req.body);
  } catch (err) {
    dbConn.exec('ROLLBACK');
    console.error(err);
  }
}

export async function deleteTodo(req, res) {
  try {
    const dbConn = await getDbConnection();
    await dbConn.exec('BEGIN TRANSACTION');
    await dbConn.run(`
      DELETE FROM todos
      WHERE todo_uuid = ?
    `, [req.body.todoUuid]);
    await dbConn.exec('COMMIT');

    res.status(204).json();
  } catch (err) {
    dbConn.exec('ROLLBACK');
    console.error(err);
  }
}