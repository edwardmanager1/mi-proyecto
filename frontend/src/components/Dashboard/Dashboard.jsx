import AdminPanel from "./AdminPanel";
import DashboardLayout from "../Layout/DashboardLayout";
import Overview from "../Dashboard/sections/Overview"; // ← Agregar esta importación

function Dashboard({ onLogout }) {
  const userRole = localStorage.getItem("userRole");

  return (
    <DashboardLayout onLogout={onLogout}>
      <div className="dashboard-content">
        <h1>🎯 Dashboard de Marketing Digital</h1>

        {/* AGREGAR ESTA LÍNEA: Mostrar Overview para todos los roles */}
        <Overview />

        {userRole === "administrador" && <AdminPanel />}

        {userRole === "especialista" && (
          <div className="specialist-section">
            <h2>Panel de Especialista</h2>
            <p>Opciones para especialistas</p>
          </div>
        )}

        {userRole === "usuario" && (
          <div className="user-section">
            <h2>Panel de Usuario</h2>
            <p>Bienvenido al sistema de marketing digital</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
