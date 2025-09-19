import { useState } from "react";
import AuthForm from "./components/AuthForm/AuthForm";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import ErrorModal from "./components/ErrorModal";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [passwordStrength, setPasswordStrength] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false); // Estado para controlar el modal
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error para el modal

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
      console.log("Enviando datos de login:", loginData);

      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      console.log("Respuesta del servidor - Status:", response.status);
      console.log("Respuesta del servidor - OK:", response.ok);

      // Primero verificar si hay error de conexión
      if (!response.ok) {
        let errorMessage = "";

        try {
          const errorData = await response.json();
          console.log("Datos de error del servidor:", errorData);
          errorMessage =
            errorData.error || errorData.message || `Error ${response.status}`;
        } catch (parseError) {
          console.log("No se pudo parsear respuesta de error:", parseError);
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }

        // Verificar el tipo de error basado en el mensaje
        if (
          errorMessage.toLowerCase().includes("contraseña") ||
          errorMessage.toLowerCase().includes("password")
        ) {
          throw new Error("Contraseña incorrecta");
        } else if (
          errorMessage.toLowerCase().includes("usuario") ||
          errorMessage.toLowerCase().includes("user") ||
          response.status === 404
        ) {
          throw new Error("Usuario no registrado en la aplicación");
        } else {
          throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log("Login exitoso - Datos:", data);

      // Guardar token y datos de usuario en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.rol);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthenticated(true);
      alert("✅ Login exitoso! Token: " + data.token.substring(0, 20) + "...");

      // Limpiar formulario
      setLoginData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("Error capturado:", err.message);

      // Mostrar error en el modal
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("Network Error")
      ) {
        setErrorMessage("Error de conexión. Verifica tu internet.");
      } else {
        setErrorMessage(err.message);
      }
      setShowErrorModal(true);
      setError(err.message);
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

      await response.json();
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
      // Mostrar error en el modal
      setErrorMessage(err.message);
      setShowErrorModal(true);
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
    alert("✅ Sesión cerrada exitosamente");
  };

  // Función para cerrar el modal de error
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
    setError(null);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Dashboard onLogout={handleLogout} />
        </>
      ) : (
        <>
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

          {/* Modal de error */}
          <ErrorModal
            isOpen={showErrorModal}
            onClose={handleCloseErrorModal}
            message={errorMessage}
          />

          {/* Mostrar errores (se mantiene por compatibilidad pero se ocultará cuando showErrorModal esté activo) */}
          {error && !showErrorModal && (
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
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "12px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ fontSize: "50px", marginBottom: "15px" }}>✅</div>
                <h3 style={{ marginBottom: "20px", color: "#2e7d32" }}>
                  {successMessage}
                </h3>
                <button
                  onClick={() => {
                    setSuccessMessage("");
                    setPasswordStrength("");
                    // Cambiar automáticamente a login
                    document
                      .querySelectorAll(".form")
                      .forEach((form) => form.classList.remove("active"));
                    document
                      .querySelectorAll(".tab")
                      .forEach((tab) => tab.classList.remove("active"));
                    document
                      .getElementById("login-form")
                      .classList.add("active");
                    document
                      .querySelector('[data-tab="login"]')
                      .classList.add("active");
                  }}
                  style={{
                    background: "#4361ee",
                    color: "white",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Aceptar
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
