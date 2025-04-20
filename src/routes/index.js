const { Router } = require("express");
const { authRouter } = require("./auth");

const apiRouter = Router();
apiRouter.use('/auth', authRouter);

apiRouter.get('/', (req, res) => {
  res.send('Hello <strong>Artistic View API</strong>!');
});

module.exports = {
  apiRouter,
};

