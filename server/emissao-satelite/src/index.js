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
  clientId: 'emissor-satelite',
});

//Define o tópico que será consumido
const topic = 'alerta-satelite';

// Define o grupo do consumidor
const consumer = kafka.consumer({ groupId: 'alerta-satelite' });

async function enviar(alerta) {
  try {
    const { municipio, frp, satelite } = alerta;
    const { $date: dataHora } = alerta.datahora;

    await transport.sendMail({
      from: 'Alertas de Queimadas <alertas@queimadas.com.br>',
      to: 'Fulano <fulano@silva.com.br',
      subject: 'Novo alerta de queimada do seu interesse',
      html: [
        '<h1>Alerta enviado por satélite: </h1>',
        `<p>Local: ${municipio}</p>`,
        `<p>Data e hora: ${dataHora}</p>`,
        `<p>Satélite observador: ${satelite}</p>`,
        `<p>FRP: ${frp}</p>`,
      ].join('\n'),
    });

    console.log('E-mail enviado.');
  } catch (error) {
    console.log(error);
  }
}

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const alerta = JSON.parse(message.value);

      enviar(alerta);
    },
  });
}

run().catch(console.error);
