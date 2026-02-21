
import { getDbConnection } from './getDbConnection.js';
import { todoData } from './data.js';

async function seedData() {
  const dbConn = await getDbConnection();
  dbConn.exec('BEGIN TRANSACTION');
  
  for (const { todo_uuid, todo_text, date_created } of todoData) {
    await dbConn.run(`
      INSERT INTO todos (todo_uuid, todo_text, date_created)
      VALUES (?, ?, ?)
    `, [todo_uuid, todo_text, date_created]);
  }

  await dbConn.exec('COMMIT')
  
  console.log('All data inserted');

  await dbConn.close();
}

seedData();