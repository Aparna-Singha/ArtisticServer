const { Router } = require("express");
const { authRouter } = require("./auth");
const { imageRouter } = require("./image");
const { artRouter } = require("./art");
const { interactRouter } = require("./interact");

const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/image', imageRouter);
apiRouter.use('/art', artRouter);
apiRouter.use('/interact', interactRouter);

apiRouter.get('/', (_, res) => {
  res.send('Hello <strong>Artistic View API</strong>!');
});

module.exports = {
  apiRouter,
};
