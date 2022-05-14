import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

var transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '9c8b381bd846f2',
    pass: 'a65292e603714d',
  },
});

async function enviar() {
  const response = await fetch('http://server-consulta-1:3000/alertas/humano');
  const data = await response.json();

  const { local, dataHora, tipo, observacoes, categoria } = data[0];

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

enviar();
