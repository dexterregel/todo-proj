import express from 'express';
import path from 'node:path';
import cors from 'cors';
import { router } from './routes/router.js';

const PORT = 5000;

const app = express();

// app.use(cors());

// serve the website
app.use(express.static(path.join('./public')));

// handle requests to /todos
app.use('/todos', router);

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});