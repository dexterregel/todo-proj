import {
  createTodo,
  getTodos,
  deleteTodo
} from './todos.js';
import { showEditTodoModal } from './editTodos.js';

/*
 *  static vars
 */
const serverProtocol = 'https';
const serverDomain = 'localhost';
const serverPort = '403';
export const serverUrl = `${serverProtocol}://${serverDomain}:${serverPort}`;

/*
 *  element vars
 */
const newTodoForm = document.getElementById('new-todo');
const todosContainer = document.getElementById('todos-container');

// render all todos from server
export async function renderTodos() {
  const todos = await getTodos();

  if (todos.length > 0) {
    const todosList = document.createElement('div');

    for (const { todo_uuid, todo_text } of todos) {
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

// for deleting and editing todos
document.addEventListener('click', async (e) => {
  if (e.target.dataset.todoUuid) {
    const todoUuid = e.target.dataset.todoUuid;
    const btnAction = e.target.dataset.action;
    if (btnAction === 'delete') {
      await deleteTodo(todoUuid);
      await renderTodos();
    } else if (btnAction === 'open-edit-todo-modal') {
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