import express from 'express';
import {
  createTodo,
  getTodos,
  editTodo,
  deleteTodo
} from '../controllers/todosController.js';

export const todosRouter = express.Router();

todosRouter.post('/', createTodo);

todosRouter.get('/', getTodos);

todosRouter.put('/', editTodo);

todosRouter.delete('/', deleteTodo);