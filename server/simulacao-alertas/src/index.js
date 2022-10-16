import { faker } from '@faker-js/faker/locale/pt_BR';
import fetch from 'node-fetch';
import alertas from './satelite2021.json' assert { type: 'json' };
import dotenv from 'dotenv/config';

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

    // await sleep(3000);

    await emitirAlerta(alerta);
  }
}

// Função que conta o tempo que levou para executar o número de alertas recebidos no parâmetro.
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

// Ao chamar a função tempo de execução é necessário comentar a chamada do sleep na linha 33.
tempoDeExecução(1000);
