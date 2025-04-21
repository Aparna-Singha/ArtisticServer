const { getUser } = require("../database/user");

const authMiddleware = async (req, _, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.authorized = false;
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    req.authorized = false;
    return next();
  }

  req.authorized = true;
  req.user = await getUser(token);

  if (!req.user) {
    req.authorized = false;
    return next();
  }

  next();
}

module.exports = {
  authMiddleware,
};
