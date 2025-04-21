const { getCollection } = require('./client');

const createArt = async (art) => {
  const collection = getCollection('arts');
  return await collection.insertOne(art);
}

const getArts = async () => {
  const collection = getCollection('arts');
  return await collection.find({}).toArray();
}

const getArt = async (postId) => {
  const collection = getCollection('arts');
  return await collection.findOne({ postId });
};

module.exports = {
  createArt,
  getArts,
  getArt,
};
