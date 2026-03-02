import { editTodo } from './todos.js';
import { renderTodos } from './index.js';

/*
 *  element vars
 */
const editTodoModal = document.querySelector('dialog');
const editTodoForm = document.getElementById('edit-todo');

// prepare and show edit todo modal
export async function showEditTodoModal(todoUuid, todoText) {
  document.querySelector('#edit-todo textarea').value = todoText;
  editTodoForm.setAttribute('data-todo-uuid', todoUuid);
  editTodoModal.showModal();
}

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