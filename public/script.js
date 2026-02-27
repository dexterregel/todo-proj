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
const editTodoModal = document.querySelector('dialog');
const editTodoForm = document.getElementById('edit-todo');
const todosContainer = document.getElementById('todos-container');

/*
 *  todo functions
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
async function createTodo(todoText) {
  try {
    const res = await fetch(`${serverProtocol}://${serverDomain}:${serverPort}/todos`, {
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
async function editTodo(todoUuid, todoText) {
  try {
    const res = await fetch(`${serverProtocol}://${serverDomain}:${serverPort}/todos`, {
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

  if (todos.length > 0) {
    const todosList = document.createElement('div');

    for ({ todo_uuid, todo_text } of todos) {
      const todoContainer = document.createElement('div');
      todoContainer.classList.add('todo-container');

      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn-container');

      // delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.setAttribute('data-todo-uuid', todo_uuid);
      deleteBtn.setAttribute('data-action', 'delete');
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa-solid', 'fa-xmark');
      deleteBtn.appendChild(deleteIcon);

      // edit button
      const editBtn = document.createElement('button');
      editBtn.setAttribute('data-todo-uuid', todo_uuid);
      editBtn.setAttribute('data-action', 'open-edit-todo-modal');
      const editIcon = document.createElement('i');
      editIcon.classList.add('fa-solid', 'fa-pencil');
      editBtn.appendChild(editIcon);

      // todo
      const newTodo = document.createElement('p');
      newTodo.textContent = todo_text;

      btnContainer.appendChild(deleteBtn);
      btnContainer.appendChild(editBtn);
      todoContainer.appendChild(btnContainer);
      todoContainer.appendChild(newTodo);

      todosList.appendChild(todoContainer);
    }

    todosContainer.replaceChildren(todosList);
  } else {
    todosContainer.textContent = 'Could not retrieve to-dos';
  }
}

/*
 *  layout
 */

// prepare and show edit todo modal
async function showEditTodoModal(todoUuid, todoText) {
  document.querySelector('#edit-todo textarea').value = todoText;
  editTodoForm.setAttribute('data-todo-uuid', todoUuid);
  editTodoModal.showModal();
}

/*
 *  event listeners
 */

// create new todo
newTodoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // get form data for the new todo
  const newTodoFormData = new FormData(newTodoForm);
  const todoText = newTodoFormData.get('todo-text');

  // send form data to createTodo
  await createTodo(todoText);
  await renderTodos();
  newTodoForm.reset();
});

// send updated todo data to the server
editTodoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const editTodoFormData = new FormData(editTodoForm);
  const editTodoText = editTodoFormData.get('edit-todo-text');
  await editTodo(e.target.dataset.todoUuid, editTodoText);
  await renderTodos();
  editTodoModal.close();
});

// for closing the edit todo modal
document.querySelector('button.close').addEventListener('click', () => {
  editTodoModal.close();
});

// for deleting and editing todos
document.addEventListener('click', async (e) => {
  if (e.target.dataset.todoUuid) {
    const todoUuid = e.target.dataset.todoUuid;
    const action = e.target.dataset.action;
    if (action === 'delete') {
      await deleteTodo(todoUuid);
      await renderTodos();
    } else if (action === 'open-edit-todo-modal') {
      const parentTodoContainer = e.target.closest('.todo-container');
      const todoText = parentTodoContainer.querySelector('p').textContent;
      showEditTodoModal(todoUuid, todoText);
    }
  }
});

/*
 *  init
 */

renderTodos();