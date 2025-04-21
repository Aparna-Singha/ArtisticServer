const { getCollection } = require('./client');

const createArt = async (art) => {
  const collection = getCollection('arts');
  return await collection.insertOne(art);
}

const getArts = async () => {
  const collection = getCollection('arts');
  return await collection.find({}).toArray();
}

module.exports = {
  createArt,
  getArts,
};

