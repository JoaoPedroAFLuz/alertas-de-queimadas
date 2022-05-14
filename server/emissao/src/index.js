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
  clientId: 'emissor',
});

//Define o tópico que será consumido
const topic = 'alerta-humano';

// Define o grupo do consumidor
const consumer = kafka.consumer({ groupId: 'alerta-humano' });

async function enviar(alerta) {
  const { local, dataHora, tipo, observacoes, categoria } = alerta;

  await transport.sendMail({
    from: 'Alertas de Queimadas <alertas@queimadas.com.br>',
    to: 'Fulano <fulano@silva.com.br',
    subject: 'Novo alerta de queimada do seu interesse',
    html: [
      '<h1>Alerta: </h1>',
      `<p>Local: ${local}</p>`,
      `<p>Data e hora: ${dataHora}</p>`,
      `<p>Tipo: ${tipo}</p>`,
      `<p>Observações: ${observacoes}</p>`,
      `<p>Categoria: ${categoria}</p>`,
    ].join('\n'),
  });
}

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      const alerta = JSON.parse(message.value);

      enviar(alerta);
    },
  });
}

run().catch(console.error);
