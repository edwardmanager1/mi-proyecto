export const getUserData = () => {
  // Obtener y normalizar el rol - ESTANDARIZAR a "administrador"
  const rawRole = localStorage.getItem("userRole") || "";
  const role = rawRole.toLowerCase().trim();

  // Determinar si es administrador - ACEPTAR MÚLTIPLES VARIANTES
  const isAdmin =
    role === "admin" ||
    role === "administrador" ||
    role === "administrator" ||
    role === "adm" ||
    role.includes("admin");

  // Obtener y normalizar datos del usuario
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  // ESTANDARIZAR el rol para que siempre sea "administrador"
  const standardizedRole = isAdmin ? "administrador" : role;

  return {
    role: standardizedRole, // <-- Ahora siempre será "administrador" para admins
    isAdmin: isAdmin,
    nombre: userData.nombre || "Usuario",
    apellido: userData.apellido || "",
    email: userData.email || "",
  };
};

export const getInitials = (nombre, apellido) => {
  const first = nombre ? nombre[0] : "U";
  const last = apellido ? apellido[0] : "";
  return `${first}${last}`.toUpperCase();
};

// Función adicional para asegurar consistencia al guardar el rol
export const setUserRole = (role) => {
  const normalizedRole = role.toLowerCase().trim();
  localStorage.setItem("userRole", normalizedRole);
};
