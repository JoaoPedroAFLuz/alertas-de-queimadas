import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_HUMANO_URL);
const database = client.db('alertas');
const collection = database.collection('satelite2021');

export async function insertAlertaSatelite(alerta) {
  try {
    await client.connect();

    await collection.insertOne(alerta);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
