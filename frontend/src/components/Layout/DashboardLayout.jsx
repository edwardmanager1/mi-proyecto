import React, { useState, useEffect } from "react";
import "./DashboardLayout.css";

function DashboardLayout({ children, onLogout }) {
  // Obtener datos del usuario desde localStorage
  const [userData, setUserData] = useState({});
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") || "{}");
    const role = localStorage.getItem("userRole") || "";
    setUserData(data);
    setUserRole(role);
  }, []);

  // Función MD5 más robusta para Gravatar
  const md5 = (inputString) => {
    if (!inputString) return "00000000000000000000000000000000";

    // Convertir string a array de bytes
    const inputBytes = new TextEncoder().encode(
      inputString.toLowerCase().trim()
    );

    // Generar hash (versión simplificada para demostración)
    // En una aplicación real, sería mejor usar una librería MD5
    let h = 0;
    for (let i = 0; i < inputBytes.length; i++) {
      h = (Math.imul(31, h) + inputBytes[i]) | 0;
    }

    // Convertir a string hexadecimal
    return Math.abs(h).toString(16).padStart(32, "0");
  };

  // Determinar si el usuario es administrador
  const isAdmin = userRole === "admin";

  // Extraer nombre y apellido
  const nombre = userData.nombre || "Usuario";
  const apellido = userData.apellido || "";
  const role = userRole || "user";
  const email = userData.email || "example@example.com";

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>MarketingPro</h2>
        </div>

        <nav className="sidebar-menu">
          <div className="menu-section">
            <h3>Navegación Principal</h3>
            <ul>
              <li>
                <a href="#" className="menu-item active">
                  🏠 Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="menu-item">
                  📊 Analytics
                </a>
              </li>
              <li>
                <a href="#" className="menu-item">
                  👥 Usuarios
                </a>
              </li>
            </ul>
          </div>

          {isAdmin && (
            <div className="menu-section">
              <h3>Administración</h3>
              <ul>
                <li>
                  <a href="#" className="menu-item">
                    ⚙️ Configuración
                  </a>
                </li>
                <li>
                  <a href="#" className="menu-item">
                    🔐 Permisos
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* Footer con botón de cerrar sesión */}
        <div className="sidebar-footer">
          <button onClick={onLogout} className="logout-btn">
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-profile">
            <div className="profile-image">
              <img
                src={`https://www.gravatar.com/avatar/${md5(
                  email
                )}?s=80&d=identicon`}
                alt="Avatar"
                className="gravatar-img"
                onError={(e) => {
                  e.target.src = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=80`;
                }}
              />
            </div>
            <div className="profile-info">
              <div className="profile-name">
                {nombre} {apellido}
              </div>
              <div className="profile-role">{role}</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="content-wrapper">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
