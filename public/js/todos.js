import { serverUrl } from './index.js';

// gets all todos from the server
export async function getTodos() {
  try {
    const res = await fetch(`${serverUrl}/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// posts a new todo to the database
export async function createTodo(todoText) {
  try {
    const res = await fetch(`${serverUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({todoText})
    });
    const data = await res.json();
  } catch (err) {
    console.error(err);
  }
}

// edit existing todo
export async function editTodo(todoUuid, todoText) {
  try {
    const res = await fetch(`${serverUrl}/todos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({todoUuid, todoText})
    });
    // check if response code is OK
  } catch (err) {
    console.error(err);
  }
}

// deletes a todo
export async function deleteTodo(todoUuid) {
  try {
    const res = await fetch(`${serverUrl}/todos`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({todoUuid})
    });
    // check if response code is OK
  } catch (err) {
    console.error(err);
  }
}