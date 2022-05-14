import { Router } from 'express';
import { insertAlertaHumano } from './db-humano.js';
import { insertAlertaSatelite } from './db-satelite.js';

const routes = new Router();

const STATUS = 'online';

routes.get('/status', (req, res) => {
  return res.json({ status: `Registro está ${STATUS}` });
});

routes.post('/alertas/humano', async (req, res) => {
  const alerta = req.body;

  await insertAlertaHumano(alerta);

  await req.producer.send({
    topic: 'alerta-humano',
    messages: [
      {
        value: JSON.stringify(alerta),
      },
    ],
  });

  return res.sendStatus(201);
});

routes.post('/alertas/satelite', async (req, res) => {
  const alerta = req.body;

  await insertAlertaSatelite(alerta);

  await req.producer.send({
    topic: 'alerta-satelite',
    messages: [
      {
        value: JSON.stringify(alerta),
      },
    ],
  });

  return res.sendStatus(201);
});

export default routes;
