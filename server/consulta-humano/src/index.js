import express from 'express';
import cors from 'cors';

import { findAll, findOne, findAllFiltrado } from './db-humano.js';

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
  const { pagina, alertasPorPagina } = req.query;

  const alertas = await findAll(Number(pagina), Number(alertasPorPagina));

  res.json(alertas);
});

app.get('/alertas/humano/:id', async (req, res) => {
  const { id } = req.params;

  const alertas = await findOne(id);

  res.json(alertas);
});

app.get('/alertas/humano/filtrado/:cidade', async (req, res) => {
  const { pagina, alertasPorPagina, cidade } = req.params;

  const alertas = await findAllFiltrado(Number(pagina), Number(alertasPorPagina), cidade);

  res.json(alertas);
})

app.listen(PORT, HOST, () => {
  console.log(`HTTP server running on ${HOST}:${PORT}`);
});
