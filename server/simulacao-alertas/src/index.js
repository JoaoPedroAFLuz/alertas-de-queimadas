import dotenv from 'dotenv/config.js';
import { faker } from '@faker-js/faker/locale/pt_BR';
import fetch from 'node-fetch';
import alertas from './satelite2021.json' assert { type: 'json' };

// const listaSatelites = ['Aqua Tarde', 'Terra Manhã', 'GOES-16'];
// const listaCategoria = [
//   'Lento ou em chamas',
//   'Rasteiro',
//   'Ativo',
//   'Tocha',
//   'Copa',
//   'Irregular e extremo',
// ];
// const listaCaracteristicas = ['Em fogueira', 'Em vegetação', 'Em linha'];
// const listaTempo = [
//   'Céu claro',
//   'Névoa ou fumaça',
//   'Névoa úmida',
//   'Nevoeiro',
//   'Chuvisco',
//   'Chuva',
//   'Chuva trovoada',
// ];

// let alerta = {
//   local: '',
//   latitude: '',
//   longitude: '',
//   altitude: '',
//   dataHora: '',
//   categoria: '',
//   caracteristicas: '',
//   tempo: '',
//   satelite: '',
// };

// const gerarAlerta = (satelite) => {
//   alerta.local = faker.address.cityName();
//   alerta.latitude = faker.address.latitude();
//   alerta.longitude = faker.address.longitude();
//   alerta.altitude = faker.datatype.number({ min: 0, max: 1600 });
//   alerta.dataHora = faker.date.recent();
//   alerta.categoria =
//     listaCategoria[
//       faker.datatype.number({ min: 0, max: listaCategoria.length - 1 })
//     ];
//   alerta.caracteristicas =
//     listaCaracteristicas[
//       faker.datatype.number({ min: 0, max: listaCaracteristicas.length - 1 })
//     ];
//   alerta.tempo =
//     listaTempo[faker.datatype.number({ min: 0, max: listaTempo.length - 1 })];

//   if (satelite) {
//     alerta.satelite =
//       listaSatelites[
//         faker.datatype.number({ min: 0, max: listaSatelites.length - 1 })
//       ];
//     return emitirAlerta(alerta, true);
//   }

//   return emitirAlerta(alerta, false);
// };

// gerarAlerta(false);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function emitirAlerta(alerta, satelite) {
  const url = satelite
    ? `${process.env.REGISTRO_API}/alertas/satelite`
    : `${process.env.REGISTRO_API}/alertas/humano`;

    console.log(url)

  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(alerta),
  });
}

async function simularAlerta(quantidade) {
  for (let i = 0; i < quantidade; i++) {
    const alertaSorteado = faker.datatype.number({ min: 0, max: 184081 });

    const alerta = alertas[alertaSorteado];
    delete alerta['_id'];

    await sleep(3000);

    await emitirAlerta(alerta, true);
  }
}

simularAlerta(5);
