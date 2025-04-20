const authMiddleware = (req, _, next) => {
  req.authorized = false;
  next();
}

module.exports = {
  authMiddleware,
};
