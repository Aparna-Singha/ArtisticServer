const { MongoClient } = require('mongodb');

let client = null;
let database = null;

const connect = async (uri) => {
  if (client) return;

  client = new MongoClient(uri);
  await client.connect();
  
  database = client.db('artistic-view');
}

const getCollection = (collectionName) => {
  if (!database) throw new Error('Database not connected');
  return database.collection(collectionName);
}

module.exports = {
  connect,
  getCollection,
};

