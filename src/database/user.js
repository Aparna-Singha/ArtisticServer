const { getCollection } = require('./client');

const createUser = async (user) => {
  const collection = getCollection('users');
  
  const existingUser = await collection.findOne({
    username: user.username,
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  return await collection.insertOne(user);
}

const getUser = async (username) => {
  const collection = getCollection('users');
  
  const user = await collection.findOne({
    username,
  });

  return user;
}

module.exports = {
  createUser,
  getUser,
};

