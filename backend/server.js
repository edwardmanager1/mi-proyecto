const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./src/config/database");

// Importar rutas
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

// Ruta de prueba de base de datos
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() as current_time, version() as postgres_version"
    );
    res.json({
      message: "✅ Conexión a PostgreSQL exitosa",
      data: result.rows[0],
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: "❌ Error conectando a PostgreSQL",
      details: error.message,
    });
  }
});

// Ruta de prueba del servidor
app.get("/api/test", (req, res) => {
  res.json({
    message: "¡Backend funcionando correctamente!",
    status: 200,
    timestamp: new Date().toISOString(),
  });
});

// Ruta de salud/health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Servidor en funcionamiento",
    environment: process.env.NODE_ENV,
  });
});

// Ruta temporal para testear la tabla users
app.get("/api/test-users", async (req, res) => {
  try {
    const User = require("./src/models/User");
    const users = await User.getAll();
    res.json({
      message: "✅ Tabla users funciona correctamente",
      users: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      error: "❌ Error accediendo a la tabla users",
      details: error.message,
    });
  }
});

// Ruta para registrar nuevos usuarios
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Todos los campos son requeridos: name, email, password",
      });
    }

    // Separar nombre y apellido (asumiendo que el nombre completo viene en "name")
    const nameParts = name.split(" ");
    const nombre = nameParts[0]; // Primer nombre
    const apellido = nameParts.slice(1).join(" ") || ""; // El resto como apellido

    // 1. Verificar si el usuario ya existe
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        error: "El usuario ya existe con este email",
      });
    }

    // 2. Hashear el password antes de guardar
    const bcrypt = require("bcryptjs");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Insertar en la base de datos con password hasheado
    const result = await pool.query(
      "INSERT INTO users (nombre, apellido, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, apellido, email, hashedPassword] // ← Ahora envía el password hasheado
    );

    const newUser = result.rows[0];

    // 3. Responder con éxito
    res.status(201).json({
      message: "✅ Usuario registrado exitosamente en la base de datos",
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});

//// codigo IA

// Ruta para login de usuarios
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        error: "Email y password son requeridos",
      });
    }

    // 1. Buscar usuario en la base de datos
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    const user = result.rows[0];

    // 2. Verificar password (por ahora comparación directa ya que no está hasheado)
    // 2. Verificar password hasheado
    const bcrypt = require("bcryptjs");
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    // 3. Generar token JWT (usaremos una clave temporal por ahora)
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "clave_secreta_temporal",
      { expiresIn: "24h" }
    );

    // 4. Responder con éxito y token
    res.json({
      message: "✅ Login exitoso",
      token: token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
});

////// final IA

// Middleware de autenticación JWT
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
      "SELECT id, nombre, apellido, email FROM users WHERE id = $1",
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Token inválido - usuario no existe",
      });
    }

    // 4. Agregar usuario al request
    req.user = result.rows[0];
    next(); // Continuar a la ruta protegida
  } catch (error) {
    console.error("❌ Error en middleware de auth:", error);
    res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};

// Ruta protegida de ejemplo - Solo usuarios autenticados
app.get("/api/perfil", authMiddleware, (req, res) => {
  res.json({
    message: "✅ Acceso permitido a ruta protegida",
    user: req.user,
    timestamp: new Date().toISOString(),
  });
});

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
});

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`⏰ Iniciado en: ${new Date().toLocaleString()}`);
  console.log(
    `🔐 JWT Secret: ${
      process.env.JWT_SECRET ? "Configurado" : "No configurado"
    }`
  );
  console.log(`🗄️  Base de datos: ${process.env.DB_NAME || "No configurada"}`);
});

module.exports = app;
