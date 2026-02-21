
const serverIp = 'localhost';
const serverPort = '5000';

const newTodoForm = document.getElementById('new-todo');
const todosContainer = document.getElementById('todos-container');

newTodoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await createTodo();
})



// new todo
async function createTodo() {
    try {
    const res = await fetch(`http://${serverIp}:${serverPort}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
// edit existing todo
async function updateTodo(todoText) {}
// delete todo
function deleteTodo(todoId) {}
// delete all todos

// get all todos
async function getTodos() {
  try {
    const res = await fetch(`http://${serverIp}:${serverPort}/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}



async function renderTodos() {
  const todos = await getTodos();
  todosContainer.textContent = todos;
}

renderTodos();