const express = require("express");
const router = express.Router();
const ga4Controller = require("../controllers/ga4Controller");

// Importar el middleware de autenticación que ya existe en server.js
const authMiddleware = require("../middlewares/authMiddleware");

// Rutas protegidas para métricas
router.get(
  "/dashboard-metrics",
  authMiddleware,
  ga4Controller.getDashboardMetrics
);
router.get(
  "/metrics-by-date",
  authMiddleware,
  ga4Controller.getMetricsByDateRange
);
router.post("/metrics", authMiddleware, ga4Controller.insertMetrics);

module.exports = router;
