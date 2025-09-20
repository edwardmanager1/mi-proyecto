const pool = require("../config/database");

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Obtener token del header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        error: "Acceso denegado. Token requerido",
      });
    }

    // 2. Verificar token
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "clave_secreta_temporal"
    );

    // 3. Buscar usuario en la base de datos
    const result = await pool.query(
      "SELECT id, nombre, apellido, email, rol FROM users WHERE id = $1",
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Token inválido - usuario no existe",
      });
    }

    // 4. Agregar usuario al request (INCLUYENDO ROL)
    req.user = result.rows[0];
    next();
  } catch (error) {
    console.error("❌ Error en middleware de auth:", error);
    res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};

module.exports = authMiddleware;
