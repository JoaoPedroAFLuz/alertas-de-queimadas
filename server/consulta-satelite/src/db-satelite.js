import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_SATELITE_URL);
const database = client.db('alertas');
const collection = database.collection('satelite2021');
await client.connect();

export async function findAll(pagina, alertasPorPagina, cidade) {
  try {
    let alertas = [];

    cidade = cidade
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .trim();

    const alertasPagina = (pagina - 1) * alertasPorPagina;

    let cursor;

    if (cidade) {
      cursor = collection
        .find({ municipio: cidade })
        .sort({ datahora: -1 })
        .limit(alertasPorPagina)
        .skip(alertasPagina);
    } else {
      cursor = collection
        .find({})
        .sort({ datahora: -1 })
        .limit(alertasPorPagina)
        .skip(alertasPagina);
    }

    await cursor.forEach((alerta) => alertas.push(alerta));

    return alertas;
  } catch (e) {
    console.log(e);
  }
}

export async function findOne(id) {
  try {
    const alerta = await collection.findOne({ _id: ObjectId(id) });

    return alerta;
  } catch (e) {
    console.log(e);
  }
}
