import React from "react";

const MetricCard = ({
  title,
  value,
  percentage,
  trend,
  icon,
  color = "purple",
}) => {
  // Configuración de colores para cada tarjeta
  const colorConfig = {
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-purple-100",
      border: "border-purple-200",
      text: "text-purple-700",
      percentageBg: "bg-purple-500",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
      border: "border-blue-200",
      text: "text-blue-700",
      percentageBg: "bg-blue-500",
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 to-green-100",
      border: "border-green-200",
      text: "text-green-700",
      percentageBg: "bg-green-500",
    },
    pink: {
      bg: "bg-gradient-to-br from-pink-50 to-pink-100",
      border: "border-pink-200",
      text: "text-pink-700",
      percentageBg: "bg-pink-500",
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50 to-orange-100",
      border: "border-orange-200",
      text: "text-orange-700",
      percentageBg: "bg-orange-500",
    },
  };

  const colors = colorConfig[color] || colorConfig.purple;
  const trendIcon = trend === "up" ? "↗" : "↘";
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";

  return (
    <div
      className={`${colors.bg} rounded-2xl p-4 border ${colors.border} shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* Título */}
      <div className="flex justify-between items-start mb-2">
        <h3
          className={`${colors.text} text-xs font-semibold uppercase tracking-wide`}
        >
          {title}
        </h3>
        <div className="text-base">{icon}</div>
      </div>

      {/* Valor principal y porcentaje en misma línea */}
      <div className="flex items-end justify-between">
        <span className="text-xl font-bold text-gray-800">{value}</span>

        {percentage && (
          <div className={`flex items-center ${trendColor}`}>
            <span className="text-xs font-semibold">
              {trendIcon} {percentage}
            </span>
          </div>
        )}
      </div>

      {/* Texto "vs last month" */}
      {percentage && (
        <div className="mt-1">
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
