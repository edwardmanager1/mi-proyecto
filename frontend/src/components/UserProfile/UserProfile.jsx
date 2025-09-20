import React from "react";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.nombre || "Usuario";
  const userLastName = user.apellido || "";
  const userRole = user.rol || "Usuario";
  const userEmail = user.email || "";

  // Determinar saludo según la hora
  const currentHour = new Date().getHours();
  let greeting = "Good morning";

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18 || currentHour < 6) {
    greeting = "Good evening";
  }

  return (
    <div className="user-profile-sidebar p-4 text-center">
      {/* Avatar/Imagen del usuario */}
      <div className="mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
          {userName.charAt(0)}
          {userLastName.charAt(0)}
        </div>
      </div>

      {/* Saludo y nombre */}
      <div className="mb-2">
        <p className="text-white text-sm font-medium">{greeting}</p>
        <h3 className="text-white font-semibold text-lg">
          {userName} {userLastName}
        </h3>
      </div>

      {/* Rol y email */}
      <div className="text-gray-300 text-xs">
        <p className="capitalize">{userRole}</p>
        <p className="truncate">{userEmail}</p>

        {/* Fecha */}

        <p className="text-gray-300 text-xs">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
