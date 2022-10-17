import { Router } from 'express';
import { insertAlertaHumano } from './db-humano.js';
import { insertAlertaSatelite } from './db-satelite.js';

const routes = new Router();

const STATUS = 'online';

// Rota que retorna o status atual do serviço
routes.get('/status', (req, res) => {
  return res.json({ status: `Registro está ${STATUS}` });
});

// Rota que recebe o alerta emitido por humano, insere-o no banco de dados, envia-o para o kafka e retorna o status de criado com sucesso.
routes.post('/alertas/humano', async (req, res) => {
  try {
    let alerta = req.body;

    // Formata a string do local
    alerta.local = alerta.local
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();

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

    console.log('Alerta registrado:', alerta);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Rota que recebe o alerta emitido por satelite, insere-o no banco de dados, envia-o para o kafka e retorna o status de criado com sucesso.
routes.post('/alertas/satelite', async (req, res) => {
  try {
    const alerta = req.body;

    // Formata a string do municipio
    alerta.municipio = alerta.municipio
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();

    // Insere o alerta no banco de dados dos alertas de satélites
    await insertAlertaSatelite(alerta);

    // Envia o alerta para o tópico dos alertas de satélite no kafka
    // await req.producer.send({
    //   topic: 'alerta-satelite',
    //   messages: [
    //     {
    //       value: JSON.stringify(alerta),
    //     },
    //   ],
    // });

    console.log('Alerta registrado:', alerta);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default routes;
