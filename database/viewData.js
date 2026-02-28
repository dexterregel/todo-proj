import { getDbConnection } from './getDbConnection.js';

async function viewData() {
  const db = await getDbConnection();

  console.table(await db.all(`SELECT * FROM users`));
  console.table(await db.all(`SELECT * FROM todos`));
}

viewData();