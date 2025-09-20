const ga4Service = require("../services/ga4Service");

class GA4Controller {
  // Obtener métricas para el dashboard
  async getDashboardMetrics(req, res) {
    try {
      const latestMetrics = await ga4Service.getLatestMetrics(5); // Últimos 5 días

      res.json({
        success: true,
        data: latestMetrics,
        message: "Métricas obtenidas exitosamente",
      });
    } catch (error) {
      console.error("Error en getDashboardMetrics:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener métricas del dashboard",
      });
    }
  }

  // Obtener métricas por rango de fechas
  async getMetricsByDateRange(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "startDate y endDate son requeridos",
        });
      }

      const metrics = await ga4Service.getMetricsByDateRange(
        startDate,
        endDate
      );

      res.json({
        success: true,
        data: metrics,
        total: metrics.length,
      });
    } catch (error) {
      console.error("Error en getMetricsByDateRange:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener métricas por rango de fechas",
      });
    }
  }

  // Insertar nuevas métricas (para futura sincronización con GA4)
  async insertMetrics(req, res) {
    try {
      const {
        date,
        activeUsers,
        sessions,
        avgDuration,
        sessionsWithInteraction,
        bounceRate,
      } = req.body;

      // Validaciones básicas
      if (
        !date ||
        !activeUsers ||
        !sessions ||
        !avgDuration ||
        !sessionsWithInteraction ||
        !bounceRate
      ) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos",
        });
      }

      const newMetrics = await ga4Service.insertMetrics({
        date,
        activeUsers,
        sessions,
        avgDuration,
        sessionsWithInteraction,
        bounceRate,
      });

      res.status(201).json({
        success: true,
        data: newMetrics,
        message: "Métricas insertadas exitosamente",
      });
    } catch (error) {
      console.error("Error en insertMetrics:", error);
      res.status(500).json({
        success: false,
        message: "Error al insertar métricas",
      });
    }
  }
}

module.exports = new GA4Controller();
