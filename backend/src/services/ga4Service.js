const pool = require("../config/database");

class GA4Service {
  // OBTENER MÉTRICAS POR FECHA
  async getMetricsByDate(date) {
    try {
      const query = `
        SELECT * FROM ga4_metrics 
        WHERE metric_date = $1
      `;
      const result = await pool.query(query, [date]);
      return result.rows[0];
    } catch (error) {
      console.error("Error getting metrics:", error);
      throw error;
    }
  }

  // OBTENER MÉTRICAS POR RANGO DE FECHAS
  async getMetricsByDateRange(startDate, endDate) {
    try {
      const query = `
        SELECT * FROM ga4_metrics 
        WHERE metric_date BETWEEN $1 AND $2
        ORDER BY metric_date DESC
      `;
      const result = await pool.query(query, [startDate, endDate]);
      return result.rows;
    } catch (error) {
      console.error("Error getting metrics by range:", error);
      throw error;
    }
  }

  // INSERTAR NUEVAS MÉTRICAS
  async insertMetrics(metricsData) {
    try {
      const query = `
        INSERT INTO ga4_metrics 
        (metric_date, active_users, sessions, avg_session_duration, sessions_with_interaction, bounce_rate)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const values = [
        metricsData.date,
        metricsData.activeUsers,
        metricsData.sessions,
        metricsData.avgDuration,
        metricsData.sessionsWithInteraction,
        metricsData.bounceRate,
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error inserting metrics:", error);
      throw error;
    }
  }

  // OBTENER ÚLTIMAS MÉTRICAS (para dashboard)
  async getLatestMetrics(days = 7) {
    try {
      const query = `
        SELECT * FROM ga4_metrics 
        ORDER BY metric_date DESC 
        LIMIT $1
      `;
      const result = await pool.query(query, [days]);
      return result.rows;
    } catch (error) {
      console.error("Error getting latest metrics:", error);
      throw error;
    }
  }
}

module.exports = new GA4Service();
