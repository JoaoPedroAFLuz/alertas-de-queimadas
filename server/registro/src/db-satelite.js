import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_SATELITE_URL);
const database = client.db('alertas');
const collection = database.collection('satelite2021');
client.connect();

export async function insertAlertaSatelite(alerta) {
  try {
    await collection.insertOne(alerta);
  } catch (e) {
    console.log(e);
  }
}
