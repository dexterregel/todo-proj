
/*
 *  static vars
 */
const serverProtocol = 'http';
const serverDomain = 'localhost';
const serverPort = '5000';

/*
 *  element vars
 */
const newTodoForm = document.getElementById('new-todo');
const todosContainer = document.getElementById('todos-container');

/*
 *  functions
 */

// gets all todos from the server
async function getTodos() {
  try {
    const res = await fetch(`${serverProtocol}://${serverDomain}:${serverPort}/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

// posts a new todo to the database
async function createTodo(todoData) {
  try {
    const res = await fetch(`${serverProtocol}://${serverDomain}:${serverPort}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData)
    });
    const data = await res.json();
  } catch (err) {
    console.error(err);
  }
}

// edit existing todo
async function updateTodo(todoText) {}

// deletes a todo
async function deleteTodo(todoUuid) {
  try {
    const res = await fetch(`${serverProtocol}://${serverDomain}:${serverPort}/todos`, {
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

// render all todos from server
async function renderTodos() {
  const todos = await getTodos();

  const todosList = document.createElement('div');

  for ({ todo_uuid, todo_text } of todos) {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');
    // todo
    const newTodo = document.createElement('p');
    newTodo.textContent = todo_text;
    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-todo-uuid', todo_uuid);
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    todoContainer.appendChild(deleteBtn);
    todoContainer.appendChild(newTodo);

    todosList.appendChild(todoContainer);
  }

  todosContainer.replaceChildren(todosList);
}

/*
 *  event listeners
 */

newTodoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // get form data for the new todo
  const newTodoFormData = new FormData(newTodoForm);
  const todoUuid = crypto.randomUUID();
  const todoText = newTodoFormData.get('todo-text');

  // format form data
  const todoData = {todoUuid, todoText};
  // send form data to createTodo
  await createTodo(todoData);
  await renderTodos();
  newTodoForm.reset();
});

// for deleting todos
document.addEventListener('click', async (e) => {
  if (e.target.dataset.todoUuid) {
    await deleteTodo(e.target.dataset.todoUuid);
    await renderTodos();
  }
});

/*
 *  init
 */

renderTodos();