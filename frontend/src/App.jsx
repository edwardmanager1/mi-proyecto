import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AuthForm from "./components/AuthForm/AuthForm";
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      // Guardar token y datos de usuario en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthenticated(true); // ← Agrega esta línea
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setBackendData({});
    alert("✅ Sesión cerrada exitosamente");
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
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "#ff4757",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🚪 Cerrar Sesión
          </button>
        )}
      </div>
      <h1>Vite + React + Authentication</h1>

      <AuthForm
        onLogin={handleLogin}
        onRegister={handleRegister}
        loginData={loginData}
        registerData={registerData}
        onLoginChange={handleLoginChange}
        onRegisterChange={handleRegisterChange}
        loading={loading}
      />

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
