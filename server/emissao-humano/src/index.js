import 'dotenv/config';
import nodemailer from 'nodemailer';
import { Kafka } from 'kafkajs';

// Criada conexão com o servidor de e-mail
var transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Cria conexão com o kafka
const kafka = new Kafka({
  brokers: ['kafka:9092'],
  clientId: 'emissor-humano',
});

//Define o tópico que será consumido
const topic = 'alerta-humano';

// Define o grupo do consumidor
const consumer = kafka.consumer({ groupId: 'alerta-humano' });

async function enviar(alerta) {
  try {
    const { local, dataHora, tipo, observacoes, categoria } = alerta;

    await transport.sendMail({
      from: 'Alertas de Queimadas <alertas@queimadas.com.br>',
      to: 'Fulano <fulano@silva.com.br',
      subject: 'Novo alerta de queimada do seu interesse',
      html: [
        '<h1>Alerta enviado por humano: </h1>',
        `<p>Local: ${local}</p>`,
        `<p>Data e hora: ${dataHora}</p>`,
        `<p>Tipo: ${tipo}</p>`,
        `<p>Observações: ${observacoes}</p>`,
        `<p>Categoria: ${categoria}</p>`,
      ].join('\n'),
    });

    console.log('Email enviado');
  } catch (error) {
    console.log(error);
  }
}

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: ({ message }) => {
      const alerta = JSON.parse(message.value);

      enviar(alerta);
    },
  });
}

run().catch(console.error);
