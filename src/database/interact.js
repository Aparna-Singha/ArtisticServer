const { getCollection } = require("./client");

const createLike = async (username, postId) => {
  const collection = getCollection('likes');
  const existingLike = await collection.findOne({ username, postId });
  if (existingLike) return;

  collection.insertOne({
    username,
    postId,
  });
};

const removeLike = async (username, postId) => {
  const collection = getCollection('likes');
  const existingLike = await collection.findOne({ username, postId });
  if (!existingLike) return;

  collection.deleteOne({
    username,
    postId,
  });
};

const checkLike = async (username, postId) => {
  const collection = getCollection('likes');
  const existingLike = await collection.findOne({ username, postId });
  return !!existingLike;
};

const getLikes = async (username) => {
  const collection = getCollection('likes');
  return await collection.find({ username }).toArray();
};

const createSave = async (username, postId) => {
  const collection = getCollection('saves');
  const existingSave = await collection.findOne({ username, postId });
  if (existingSave) return;
  
  collection.insertOne({
    username,
    postId,
  });
};

const removeSave = async (username, postId) => {
  const collection = getCollection('saves');
  const existingSave = await collection.findOne({ username, postId });
  if (!existingSave) return;
  
  collection.deleteOne({
    username,
    postId,
  });
};

const checkSave = async (username, postId) => {
  const collection = getCollection('saves');
  const existingSave = await collection.findOne({ username, postId });
  return !!existingSave;
};

const getSaves = async (username) => {
  const collection = getCollection('saves');
  return await collection.find({ username }).toArray();
};

const createComment = async (username, postId, comment) => {
  const collection = getCollection('comments');
  const existingComment = await collection.findOne({
    username,
    postId,
    comment,
  });
  
  if (existingComment) return;
  collection.insertOne({
    username,
    postId,
    comment,
  });
};

const removeComment = async (username, postId, comment) => {
  const collection = getCollection('comments');
  const existingComment = await collection.findOne({
    username,
    postId,
    comment,
  });
  
  if (!existingComment) return;
  collection.deleteOne({
    username,
    postId,
    comment,
  });
};

module.exports = {
  createLike,
  removeLike,
  checkLike,
  getLikes,
  createSave,
  removeSave,
  checkSave,
  getSaves,
  createComment,
  removeComment,
};
