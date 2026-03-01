import express from 'express';
import https from 'node:https';
import path from 'node:path';
import fs from 'node:fs/promises';
import { router } from './routes/router.js';

const HTTPS_PORT = 403;

const app = express();

app.use(express.json());

// serve the website
app.use(express.static(path.join('public')));

// handle requests to /todos
app.use('/todos', router);

app.use((req, res) => {
  res.status(404).json({message: 'Resource not found.'});
});

// start the server
const options = {
  key: await fs.readFile(path.join('cert', 'key.pem')),
  cert: await fs.readFile(path.join('cert', 'cert.pem'))
}

https.createServer(options, app).listen(HTTPS_PORT, () => {
  console.log(`Secure server listening on port ${HTTPS_PORT}`);
});