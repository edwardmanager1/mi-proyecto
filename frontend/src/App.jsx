import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [backendData, setBackendData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register

  // Estado para el formulario de login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Estado para el formulario de registro
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Función para login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      setBackendData(data);
      alert("✅ Login exitoso! Token: " + data.token.substring(0, 20) + "...");

      // Limpiar formulario
      setLoginData({
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.message);
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para registro
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      setBackendData(data);
      alert("✅ Usuario registrado exitosamente!");

      // Limpiar formulario
      setRegisterData({
        name: "",
        email: "",
        password: "",
      });

      // Cambiar a login después de registrar
      setIsLogin(true);
    } catch (err) {
      setError(err.message);
      console.error("Error en registro:", err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en los inputs de login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Manejar cambios en los inputs de registro
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Authentication</h1>

      {/* Selector Login/Register */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setIsLogin(true)}
          style={{
            marginRight: "10px",
            backgroundColor: isLogin ? "#6e8efb" : "#ccc",
          }}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          style={{ backgroundColor: !isLogin ? "#6e8efb" : "#ccc" }}
        >
          Registro
        </button>
      </div>

      {/* Formulario de Login */}
      {isLogin && (
        <div className="card">
          <h2>🔐 Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "15px" }}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="tu.email@ejemplo.com"
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Tu contraseña"
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Iniciando sesión..." : "🚀 Iniciar Sesión"}
            </button>
          </form>
        </div>
      )}

      {/* Formulario de Registro */}
      {!isLogin && (
        <div className="card">
          <h2>📝 Registro de Usuario</h2>
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: "15px" }}>
              <label>Nombre completo:</label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                placeholder="Ej: Edward Sánchez"
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="tu.email@ejemplo.com"
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="Mínimo 6 caracteres"
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "📋 Registrar Usuario"}
            </button>
          </form>
        </div>
      )}

      {/* Mostrar errores */}
      {error && (
        <div
          style={{
            color: "red",
            marginTop: "20px",
            padding: "10px",
            background: "#ffe6e6",
            borderRadius: "5px",
          }}
        >
          Error: {error}
        </div>
      )}

      {/* Mostrar respuesta del servidor */}
      {backendData.message && (
        <div className="card">
          <h3>Respuesta del servidor:</h3>
          <pre>{JSON.stringify(backendData, null, 2)}</pre>
        </div>
      )}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
