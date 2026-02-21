import express from 'express';
import { getTodos, createTodo } from '../controllers/todosController.js';

export const router = express.Router();

router.get('/', getTodos);

router.post('/', createTodo);