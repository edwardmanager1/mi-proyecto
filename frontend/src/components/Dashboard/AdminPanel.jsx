import "./AdminPanel.css";

function AdminPanel() {
  return (
    <div className="admin-panel">
      <h2>🛠️ Panel de Administrador</h2>
      <div className="admin-cards">
        <div className="admin-card">
          <h3>👥 Gestión de Usuarios</h3>
          <p>Crear, editar y eliminar usuarios</p>
        </div>
        <div className="admin-card">
          <h3>📊 Estadísticas</h3>
          <p>Métricas del sistema</p>
        </div>
        <div className="admin-card">
          <h3>⚙️ Configuración</h3>
          <p>Ajustes del sistema</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
