import express from 'express';
import session from 'express-session';
import path from 'node:path';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { todosRouter } from './routes/todos.js';

const app = express();
const PORT = 5000;
dotenv.config();

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}));

// serve static files
app.use(express.static(path.join('public')));

// handle requests
app.use('/auth', authRouter);
app.use('/todos', todosRouter);

app.use((req, res) => {
  res.status(404).json({message: 'Resource not found.'});
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});

/*
you need to:
create a users db table
  done
create routes for the user signup
create frontend code for the user signup
  username primary key
  password
  email address
create backend code for the user signup
create backend code for the user login
create frontend code for the user login
add routes for the user logout
create backend code for the user logout
create frontend code for the user logout
attach all todos to a user id
have the app get and show only todos attached to their own user id
protect the todo routes
*/