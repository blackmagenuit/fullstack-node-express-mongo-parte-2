const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const wordpressRoutes = require('./src/routes/wordpressRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wordpress', wordpressRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
  });
});

const connectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.connection;
  }

  let mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('MONGO_URI no configurada para producción');
    }

    const memoryServer = await MongoMemoryServer.create();
    mongoUri = memoryServer.getUri('fullstack_db');
    process.env.MONGO_URI = mongoUri;
    console.log('Usando MongoDB en memoria para desarrollo');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB conectado');
    return mongoose.connection;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      const memoryServer = await MongoMemoryServer.create();
      const fallbackUri = memoryServer.getUri('fullstack_db');
      process.env.MONGO_URI = fallbackUri;
      await mongoose.connect(fallbackUri);
      console.log('MongoDB local no disponible; usando MongoDB en memoria');
      return mongoose.connection;
    }
    throw error;
  }
};

const startServer = async () => {
  try {
    await connectDatabase();

    if (require.main === module) {
      app.listen(PORT, () => {
        console.log(`Servidor backend escuchando en puerto ${PORT}`);
      });
    }
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exitCode = 1;
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
