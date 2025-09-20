const fs = require("fs");
const path = require("path");
const pool = require("./config/database");

async function runMigrations() {
  try {
    const migrationsDir = path.join(__dirname, "migrations");
    console.log("📦 Buscando migraciones en:", migrationsDir);

    if (!fs.existsSync(migrationsDir)) {
      console.log("❌ No se encontró el directorio de migraciones");
      return;
    }

    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    console.log("📦 Migraciones encontradas:", migrationFiles);

    for (const file of migrationFiles) {
      try {
        console.log(`🚀 Ejecutando migración: ${file}`);
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, "utf8");

        const statements = sql
          .split(";")
          .filter((statement) => statement.trim().length > 0);

        for (const statement of statements) {
          if (statement.trim()) {
            await pool.query(statement);
          }
        }

        console.log(`✅ ${file} ejecutada exitosamente`);
      } catch (error) {
        console.error(`❌ Error en migración ${file}:`, error.message);
        throw error;
      }
    }

    console.log("🎉 Todas las migraciones completadas exitosamente");
  } catch (error) {
    console.error("❌ Error general:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
