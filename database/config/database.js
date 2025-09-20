const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

// Manejo de errores de conexión
pool.on("error", (err) => {
  console.error("Error inesperado en la conexión a la base de datos:", err);
  process.exit(-1);
});

// Test de conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err.stack);
  } else {
    console.log("✅ Conexión a PostgreSQL exitosa");
    release();
  }
});

module.exports = pool;
