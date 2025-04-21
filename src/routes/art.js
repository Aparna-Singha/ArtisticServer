const { Router } = require("express");
const { createArt, getArts } = require("../database/art");

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
  if (!req.authorized) return res.status(401).json({
    status: 'error',
    message: 'Unauthorized',
  });

  const arts = await getArts();

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
