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
  try {
    res.json({
      status: `Consulta dos alertas emitidos por humanos está ${STATUS}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/alertas/humano', async (req, res) => {
  try {
    const { pagina, alertasPorPagina, cidade } = req.query;

    const alertas = await findAll(
      Number(pagina),
      Number(alertasPorPagina),
      cidade
    );

    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/alertas/humano/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const alertas = await findOne(id);

    return res.json(alertas);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`HTTP server running on ${HOST}:${PORT}`);
});
