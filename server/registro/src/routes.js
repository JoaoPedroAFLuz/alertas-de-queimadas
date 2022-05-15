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

  // Insere o alerta no banco de dados dos alertas humanos
  await insertAlertaHumano(alerta);

  // Envia o alerta para o tópico dos alertas humanos no kafka
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

  // Insere o alerta no banco de dados dos alertas de satélites
  await insertAlertaSatelite(alerta);

  // Envia o alerta para o tópico dos alertas de satélite no kafka
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
