const { Router } = require("express");
const { getUser, createUser } = require("../database/user");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({
    message: 'Username and password are required',
  });

  const user = await getUser(username);
  if (!user) return res.status(401).json({
    message: 'Invalid username or password',
  });

  if (user.password !== password) return res.status(401).json({
    message: 'Invalid username or password',
  });

  return res.status(200).json({
    status: 'success',
    token: user.username,
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) return res.status(400).json({
    status: 'error',
    message: 'Username, password and email are required',
  });

  const user = await getUser(username);

  if (user) return res.status(409).json({
    status: 'error',
    message: 'User already exists',
  });

  const newUser = {
    username,
    password,
    email,
  };

  const createdUser = await createUser(newUser);
  console.log('Created user:', createdUser);

  if (!createdUser) return res.status(500).json({
    status: 'error',
    message: 'Error creating user',
  });

  return res.status(201).json({
    status: 'success',
    token: createdUser.username,
    user: {
      username: createdUser.username,
      email: createdUser.email,
    },
  });
}

const authRouter = Router();
authRouter.post('/login', login);
authRouter.post('/register', register);

module.exports = {
  authRouter,
};
