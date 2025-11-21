const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const { initRedis } = require('./config/redisClient');

const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

connectDB().catch(err => console.error('DB conn error', err));
initRedis();

app.use(rateLimiter);

app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.send({ status: 'ok', service: 'newsradar-backend' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
