const { Router } = require("express");
const {
  checkLike,
  checkSave,
  createLike,
  createSave,
  removeLike,
  removeSave,
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

const interactRouter = Router();
interactRouter.get("/:postId/like", likePost);
interactRouter.get("/:postId/save", savePost);

module.exports = {
  interactRouter,
};
