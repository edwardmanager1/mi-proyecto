import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AuthForm from "./components/AuthForm/AuthForm";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [backendData, setBackendData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [passwordStrength, setPasswordStrength] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Primero define validatePasswordStrength
  const validatePasswordStrength = (password) => {
    if (password.length < 8) return "Muy débil - Mínimo 8 caracteres";
    if (!/[A-Z]/.test(password)) return "Débil - Incluye mayúsculas";
    if (!/[0-9]/.test(password)) return "Media - Incluye números";
    if (!/[!@#$%^&*]/.test(password)) return "Fuerte - Incluye símbolos";
    return "Muy fuerte";
  };

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
    confirmPassword: "", // ← AÑADE ESTE CAMPO
    lastName: "", // ← Y ESTE TAMBIÉN
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
    // Al inicio de handleRegister, añade:
    if (registerData.password !== registerData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);

      return; // Detiene la ejecución
    }

    // Después de la validación de coincidencia, añade:
    const strength = validatePasswordStrength(registerData.password);
    if (strength.includes("Muy débil") || strength.includes("Débil")) {
      setError("La contraseña es demasiado débil: " + strength);
      setLoading(false);
      return;
    }

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
      setSuccessMessage("✅ Usuario registrado exitosamente!");
      setError(null);

      // Limpiar formulario COMPLETO
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        lastName: "",
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

    if (name === "password") {
      setPasswordStrength(validatePasswordStrength(value));
    }
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
      {isAuthenticated ? (
        <>
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
          <Dashboard />
        </>
      ) : (
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

          <AuthForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            loginData={loginData}
            registerData={registerData}
            onLoginChange={handleLoginChange}
            onRegisterChange={handleRegisterChange}
            loading={loading}
            passwordError={error}
            passwordStrength={passwordStrength}
            onTabChange={() => {
              setSuccessMessage("");
              setError("");
            }}
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

          {successMessage && (
            <div
              style={{
                color: "green",
                background: "#e8f5e9",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #4caf50",
                margin: "15px 0",
              }}
            >
              ✅ {successMessage}
            </div>
          )}
        </>
      )}
    </>
  );
}
export default App;
