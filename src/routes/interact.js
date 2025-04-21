const { Router } = require("express");
const {
  checkLike,
  checkSave,
  createLike,
  createSave,
  removeLike,
  removeSave,
  getLikes,
  getSaves,
} = require("../database/interact");

const likePost = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const { postId } = req.params;
  const username = req.user.username;

  const liked = await checkLike(username, postId);

  if (!liked) {
    await createLike(username, postId);
    return res.status(200).json({ message: "Post liked" });
  } else {
    await removeLike(username, postId);
    return res.status(200).json({ message: "Post unliked" });
  }
}

const getLikedPosts = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const username = req.user.username;
  const likedPosts = await getLikes(username);

  return res.status(200).json(likedPosts);
}

const savePost = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const { postId } = req.params;
  const username = req.user.username;

  const saved = await checkSave(username, postId);
  
  if (!saved) {
    await createSave(username, postId);
    return res.status(200).json({ message: "Post saved" });
  } else {
    await removeSave(username, postId);
    return res.status(200).json({ message: "Post unsaved" });
  }
}

const getSavedPosts = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const username = req.user.username;
  const savedPosts = await getSaves(username);

  return res.status(200).json(savedPosts);
}

const interactRouter = Router();
interactRouter.get("/:postId/like", likePost);
interactRouter.get("/:postId/save", savePost);
interactRouter.get("/likes", getLikedPosts);
interactRouter.get("/saves", getSavedPosts);

module.exports = {
  interactRouter,
};
