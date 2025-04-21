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
const { getArt } = require("../database/art");

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
  const likes = await getLikes(username);

  const likedPosts = [];

  for (const like of likes) {
    const { postId } = like;
    const post = await getArt(postId);
    const liked = await checkLike(username, postId);
    const saved = await checkSave(username, postId);
    
    post.interactions = {
      liked,
      saved,
    };
    
    if (post) likedPosts.push(post);
  }

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
  const saves = await getSaves(username);

  const savedPosts = [];

  for (const save of saves) {
    const { postId } = save;
    const post = await getArt(postId);
    const liked = await checkLike(username, postId);
    const saved = await checkSave(username, postId);
    
    post.interactions = {
      liked,
      saved,
    };
    
    if (post) savedPosts.push(post);
  }

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
