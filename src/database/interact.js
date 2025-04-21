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
}

const createSave = async (username, postId) => {
  const collection = getCollection('saves');
  const existingSave = await collection.findOne({ username, postId });
  if (existingSave) return;
  
  collection.insertOne({
    username,
    postId,
  });
}

const removeSave = async (username, postId) => {
  const collection = getCollection('saves');
  const existingSave = await collection.findOne({ username, postId });
  if (!existingSave) return;
  
  collection.deleteOne({
    username,
    postId,
  });
}

const checkSave = async (username, postId) => {
  const collection = getCollection('saves');
  const existingSave = await collection.findOne({ username, postId });
  return !!existingSave;
}

const createComment = async (username, postId, comment) => {
  const collection = getCollection('comments');
  const existingComment = await collection.findOne({ username, postId, comment });
  if (existingComment) return;
  
  collection.insertOne({
    username,
    postId,
    comment,
  });
}

const removeComment = async (username, postId, comment) => {
  const collection = getCollection('comments');
  const existingComment = await collection.findOne({ username, postId, comment });
  if (!existingComment) return;
  
  collection.deleteOne({
    username,
    postId,
    comment,
  });
}

module.exports = {
  createLike,
  removeLike,
  checkLike,
  createSave,
  removeSave,
  checkSave,
  createComment,
  removeComment,
}
