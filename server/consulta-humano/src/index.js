import express from 'express';
import cors from 'cors';

import { findAll, findOne } from './db-humano.js';

const PORT = 3000;
const HOST = '0.0.0.0';
const STATUS = 'online';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  res.json({ status: `Consulta dos alertas de humanos está ${STATUS}` });
});

app.get('/alertas/humano', async (req, res) => {
  const alertas = await findAll();

  res.json(alertas);
});

app.get('/alertas/humano/:id', async (req, res) => {
  const { id } = req.params;

  const alertas = await findOne(id);

  res.json(alertas);
});

app.listen(PORT, HOST, () => {
  console.log(`HTTP server running on ${HOST}:${PORT}`);
});
