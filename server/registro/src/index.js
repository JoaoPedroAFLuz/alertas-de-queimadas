import express from 'express';
import cors from 'cors';
import { Kafka, Partitioners } from 'kafkajs';

import routes from './routes.js';

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

// Conecta com o kafka
const kafka = new Kafka({
  clientId: 'api',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

app.use(cors());
app.use(express.json());

// Disponibiliza o producer para todas as rotas
app.use((req, res, next) => {
  req.producer = producer;
  return next();
});

// Cadastra as rotas da aplicação
app.use(routes);

async function run() {
  await producer.connect();

  app.listen(3000, () => {
    console.log(`HTTP server running on ${HOST}:${PORT}`);
  });
}

run().catch(console.error);
