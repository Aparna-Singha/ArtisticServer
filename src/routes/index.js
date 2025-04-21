const { Router } = require("express");
const { authRouter } = require("./auth");
const { imageRouter } = require("./image");
const { artRouter } = require("./art");

const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/image', imageRouter);
apiRouter.use('/art', artRouter);

apiRouter.get('/', (_, res) => {
  res.send('Hello <strong>Artistic View API</strong>!');
});

module.exports = {
  apiRouter,
};
