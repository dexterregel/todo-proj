import express from 'express';
import {
  createTodo,
  getTodos,
  editTodo,
  deleteTodo
} from '../controllers/todosController.js';

export const router = express.Router();

router.post('/', createTodo);

router.get('/', getTodos);

router.put('/', editTodo);

router.delete('/', deleteTodo)