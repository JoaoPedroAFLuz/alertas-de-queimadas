import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_SATELITE_URL);
const database = client.db('alertas');
const collection = database.collection('satelite2021');

export async function findAllSatelite() {
  try {
    await client.connect();
    let alertas = [];

    const cursor = collection.find();

    await cursor.forEach(alerta => alertas.push(alerta))

    return alertas;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
