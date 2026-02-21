import express from 'express';
import path from 'node:path';

const PORT = 5000;

const app = express();

app.use(express.static(path.join('public')));

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});