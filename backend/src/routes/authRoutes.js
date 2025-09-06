// Rutas de autenticación (placeholder temporal)
const express = require('express');
const router = express.Router();

// Ruta temporal de prueba
router.get('/test', (req, res) => {
  res.json({ message: 'Rutas de autenticación funcionando' });
});

module.exports = router;
