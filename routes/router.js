import express from 'express';
import {
  getTodos,
  createTodo,
  deleteTodo
} from '../controllers/todosController.js';

export const router = express.Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.delete('/', deleteTodo)