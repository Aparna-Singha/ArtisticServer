require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connect } = require('./src/database/client');
const { apiRouter } = require('./src/routes');
const { authMiddleware } = require('./src/middlewares/auth');

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use('/api', apiRouter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (_, res) => {
  res.send('Hello <strong>Artistic View API</strong>!');
});

connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running at`);
    console.log(`\thttp://localhost:${PORT}`);
  });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

