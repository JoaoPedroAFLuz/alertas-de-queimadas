import nodemailer from 'nodemailer';
import { Kafka } from 'kafkajs';

// Criada conexão com o servidor de e-mail
var transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '9c8b381bd846f2',
    pass: 'a65292e603714d',
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
