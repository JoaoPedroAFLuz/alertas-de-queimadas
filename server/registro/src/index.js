import express from 'express';
import cors from 'cors';

import { insertAlertaHumano } from './db-humano.js';
import { insertAlertaSatelite } from './db-satelite.js';

const PORT = 3000;
const HOST = '0.0.0.0';
const STATUS = 'online'

const app = express();

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  res.json({ status: `Registro está ${STATUS}` });
});

app.post('/alertas/humano', async (req, res) => {
  const alerta = req.body;

  await insertAlertaHumano(alerta);

  res.sendStatus(201);
});

app.post('/alertas/satelite', async (req, res) => {
  const alerta = req.body;

  await insertAlertaSatelite(alerta);

  res.sendStatus(201);
});

app.listen(PORT, HOST, () => {
  console.log(`HTTP server running on ${HOST}:${PORT}`);
});
