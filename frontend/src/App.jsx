import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [backendData, setBackendData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para hacer la petición al backend
  const fetchDataFromBackend = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/db-test");

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      setBackendData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Nueva sección para conectar con el backend */}
      <div className="card">
        <h2>Conexión con Backend</h2>
        <button onClick={fetchDataFromBackend} disabled={loading}>
          {loading ? "Cargando..." : "Obtener datos del backend"}
        </button>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>Error: {error}</div>
        )}

        {backendData.message && (
          <div style={{ marginTop: "10px" }}>
            <strong>Respuesta del backend:</strong>
            <pre>{JSON.stringify(backendData, null, 2)}</pre>
          </div>
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
