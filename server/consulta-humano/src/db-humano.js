import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_HUMANO_URL);
const database = client.db('alertas');
const collection = database.collection('humano2021');
await client.connect();

export async function findAll(pagina = 1, alertasPorPagina = 6, cidade = '') {
  try {
    let alertas = [];

    cidade = cidade
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .trim();

    const alertasPagina = (pagina - 1) * alertasPorPagina;

    const cursor = collection
      .find({ local: { $regex: cidade, $options: 'i' } })
      .sort({ dataHora: -1 })
      .limit(alertasPorPagina)
      .skip(alertasPagina);

    await cursor.forEach((alerta) => alertas.push(alerta));

    return alertas;
  } catch (e) {
    console.log(e);
  }
}

export async function findOne(id) {
  const alerta = await collection.findOne({ _id: ObjectId(id) });

  if (!alerta) {
    const error = new Error('Nenhum alerta encontrado com o id: ' + id);
    error.statusCode = 404;
    throw error;
  }

  return alerta;
}
