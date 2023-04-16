import { faker } from '@faker-js/faker/locale/pt_BR';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import alertas from './satelite2021.json' assert { type: 'json' };
import dotenv from 'dotenv/config';

const PORT = 3000;
const STATUS = 'online';

const app = express();
app.use(cors());
app.use(express.json());

// Método que simula a conexão com um servidor externo.
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Método que emite o alerta para o back-end.
async function emitirAlerta(alerta) {
  const url = `${process.env.REGISTRO_API}/alertas/satelite`;

  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(alerta),
  });
}

// Método que seleciona um alerta aleatoriamente na lista de alertas.
async function simularAlerta(quantidade) {
  for (let i = 0; i < quantidade; i++) {
    const alertaSorteado = faker.datatype.number({ min: 0, max: 184081 });

    // Remove o identificador do alertas para que o banco possa criar um novo.
    const alerta = alertas[alertaSorteado];
    delete alerta['_id'];

    // Chama o método sleep passando o tempo de 3 segundos (3000 ms)
    // await sleep(3000);

    await emitirAlerta(alerta);
  }
}

// Função que conta o tempo que levou para executar o número de alertas recebidos no parâmetro.
// Ao chamar a função tempo de execução é necessário comentar a chamada do sleep na linha 33.
async function tempoDeExecução(quantidadeDeAlertas) {
  const start = new Date().getTime();
  await simularAlerta(quantidadeDeAlertas);
  const end = new Date().getTime();

  let tempoTotal = end - start;
  tempoTotal = Math.round(tempoTotal / 1000);
  console.log(
    `Tempo total para simular ${quantidadeDeAlertas} alertas: ${tempoTotal} segundos.`
  );
}

// Rota que retorna o status atual do serviço
app.get('/status', (req, res) => {
  res.json({ status: `Simulação de alertas de satélites está ${STATUS}` });
});

// Rota que recebe a quantidade de alertas a serem simulados
app.post(
  '/alertas/satelite/simulacao/:quantidadeDeAlertas',
  async (req, res) => {
    try {
      const { quantidadeDeAlertas } = req.params;

      await tempoDeExecução(quantidadeDeAlertas);

      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

app.listen(PORT, () => {
  console.log(`HTTP server running on port: ${PORT}`);
});
