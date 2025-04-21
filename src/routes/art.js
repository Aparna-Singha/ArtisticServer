const { Router } = require("express");
const { createArt, getArts } = require("../database/art");
const { checkLike, checkSave } = require("../database/interact");

const postArt = async (req, res) => {
  const { data } = req.body;

  if (!req.authorized) return res.status(401).json({
    status: 'error',
    message: 'Unauthorized',
  });

  if (!data) return res.status(400).json({
    status: 'error',
    message: 'Data is required',
  });

  const newArt = createArt({
    data,
    postId: data.id,
    user: req.user.username,
  });

  if (!newArt) return res.status(500).json({
    status: 'error',
    message: 'Error creating art',
  });

  return res.status(201).json({
    status: 'success',
    message: 'Art created successfully',
    art: newArt,
  });
};

const getAllArts = async (req, res) => {
  const arts = await getArts();

  if (req.user) {
    for (const art of arts) {
      const { postId } = art;
    
      const liked = await checkLike(req.user.username, postId);
      const saved = await checkSave(req.user.username, postId);
    
      art.interactions = {
        liked,
        saved,
      };
    }
  }

  if (!arts) return res.status(500).json({
    status: 'error',
    message: 'Error getting arts',
  });

  return res.status(200).json({
    status: 'success',
    arts,
  });
}

const artRouter = Router();
artRouter.post('/', postArt);
artRouter.get('/', getAllArts);

module.exports = {
  artRouter,
};
