const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./src/config/database');

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba de base de datos
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as postgres_version');
    res.json({
      message: '✅ Conexión a PostgreSQL exitosa',
      data: result.rows[0],
      status: 200
    });
  } catch (error) {
    res.status(500).json({
      error: '❌ Error conectando a PostgreSQL',
      details: error.message
    });
  }
});

// Ruta de prueba del servidor
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '¡Backend funcionando correctamente!', 
    status: 200,
    timestamp: new Date().toISOString()
  });
});

// Ruta de salud/health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor en funcionamiento',
    environment: process.env.NODE_ENV
  });
});

// Ruta temporal para testear la tabla users
app.get('/api/test-users', async (req, res) => {
  try {
    const User = require('./src/models/User');
    const users = await User.getAll();
    res.json({
      message: '✅ Tabla users funciona correctamente',
      users: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      error: '❌ Error accediendo a la tabla users',
      details: error.message
    });
  }
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`⏰ Iniciado en: ${new Date().toLocaleString()}`);
  console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Configurado' : 'No configurado'}`);
  console.log(`🗄️  Base de datos: ${process.env.DB_NAME || 'No configurada'}`);
});

module.exports = app;