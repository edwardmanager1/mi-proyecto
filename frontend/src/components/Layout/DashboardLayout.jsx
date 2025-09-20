import React from "react";
import UserProfile from "../UserProfile/UserProfile";

const DashboardLayout = ({ children, onLogout }) => {
  return (
    <div className="dashboard-layout flex h-screen">
      {/* Sidebar */}
      <div className="sidebar bg-gradient-to-b from-purple-800 to-indigo-800 text-white w-64 p-4">
        {/* Logo */}
        <div className="logo-section mb-8">
          <h1 className="text-2xl font-bold text-white">MarketingPro</h1>
          <p className="text-purple-200 text-sm">Digital Analytics Platform</p>
        </div>

        {/* Perfil de usuario */}
        <UserProfile />

        {/* Separador */}
        <div className="my-6 border-t border-purple-600"></div>

        {/* Navegación */}
        <nav className="navigation">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg bg-purple-700"
              >
                <span>📊</span>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-purple-700"
              >
                <span>📈</span>
                <span className="ml-3">Analytics</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-purple-700"
              >
                <span>👥</span>
                <span className="ml-3">Users</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="mt-8 pt-6 border-t border-purple-600">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-red-600 hover:bg-red-700"
          >
            <span>🚪</span>
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
