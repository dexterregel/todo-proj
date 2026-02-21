
import { getDbConnection } from '../database/getDbConnection.js';

export async function getTodos(req, res) {
  try {
    const dbConn = await getDbConnection();
    const todos = await dbConn.all(`
      SELECT * FROM todos
    `);
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
  }
}

export async function createTodo(req, res) {
  try {
    const dbConn = await getDbConnection();
    const todos = await dbConn.run(`
      INSERT INTO todos (todo_uuid, todo_text, date_created)
      VALUES (?, ?, ?)
    `), [req.];
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
  }
}