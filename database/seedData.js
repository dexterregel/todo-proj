import { getDbConnection } from './getDbConnection.js';
import { userData } from './userData.js';
import { todoData } from './todoData.js';

async function seedData() {
  const dbConn = await getDbConnection();
  dbConn.exec('BEGIN TRANSACTION');

  for (const { user_uuid, username, email, password } of userData) {
    await dbConn.run(`
      INSERT INTO users (user_uuid, username, email, password)
      VALUES (?, ?, ?, ?)
    `, [user_uuid, username, email, password]);
  }
  
  for (const { user_uuid, todo_uuid, todo_text, date_created } of todoData) {
    await dbConn.run(`
      INSERT INTO todos (user_uuid, todo_uuid, todo_text, date_created)
      VALUES (?, ?, ?, ?)
    `, [user_uuid, todo_uuid, todo_text, date_created]);
  }

  await dbConn.exec('COMMIT')
  
  console.log('All data inserted');

  await dbConn.close();
}

seedData();