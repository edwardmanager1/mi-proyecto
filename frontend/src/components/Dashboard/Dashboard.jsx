import "./Dashboard.css";

function Dashboard() {
  const userRole = localStorage.getItem("userRole");
  const userName = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).nombre
    : "Usuario";

  return (
    <div className="dashboard">
      <h1>🎯 Dashboard de Marketing Digital</h1>
      <p>
        Bienvenido/a, {userName} ({userRole})
      </p>

      {userRole === "administrador" && (
        <div className="admin-section">
          <h2>Panel de Administrador</h2>
          <p>Opciones exclusivas para administradores</p>
        </div>
      )}

      {userRole === "especialista" && (
        <div className="specialist-section">
          <h2>Panel de Especialista</h2>
          <p>Opciones para especialistas</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
