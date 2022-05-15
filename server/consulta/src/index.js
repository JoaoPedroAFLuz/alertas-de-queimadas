import express from 'express';
import cors from 'cors';

import { findAllHumano } from './db-humano.js';
import { findAllSatelite } from './db-satelite.js';

const PORT = 3000;
const HOST = '0.0.0.0';
const STATUS = 'online';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  res.json({ status: `Consulta está ${STATUS}` });
});

app.get('/alertas', async (req, res) => {
  let alertas = [];

  const alertasHumano = await findAllHumano();

  alertasHumano.forEach((alerta) => {
    alertas.push(alerta);
  });

  const alertasSatelite = await findAllSatelite();
  
  alertasSatelite.forEach((alerta) => {
    alertas.push(alerta);
  });

  res.json(alertas);
});

app.get('/alertas/humano', async (req, res) => {
  const alertas = await findAllHumano();

  res.json(alertas);
});

app.get('/alertas/satelite', async (req, res) => {
  const alertas = await findAllSatelite();

  res.json(alertas);
});

app.listen(PORT, HOST, () => {
  console.log(`HTTP server running on ${HOST}:${PORT}`);
});
