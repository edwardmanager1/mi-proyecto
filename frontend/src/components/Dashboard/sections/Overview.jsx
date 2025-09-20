import React from "react";
import MetricCard from "../../charts/MetricCard";
import ChartContainer from "../../charts/ChartContainer";

const Overview = () => {
  // Datos de ejemplo mejorados
  const metricsData = [
    {
      title: "Active Users",
      value: "43.2K",
      percentage: "3.5%",
      trend: "up",
      icon: "👥",
      color: "purple",
    },
    {
      title: "Sessions",
      value: "24K",
      percentage: "5%",
      trend: "up",
      icon: "📊",
      color: "blue",
    },
    {
      title: "Avg. Session Duration",
      value: "3m 12s",
      percentage: "1.2%",
      trend: "up",
      icon: "⏱️",
      color: "green",
    },
    {
      title: "Sessions with Interaction",
      value: "18.5K",
      percentage: "4.3%",
      trend: "up",
      icon: "💬",
      color: "pink",
    },
    {
      title: "Bounce Rate",
      value: "8%",
      percentage: "2%",
      trend: "down",
      icon: "↗",
      color: "orange",
    },
  ];

  // Obtener usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.nombre || user.name || "Usuario";

  // Obtener fecha y hora actual
  const currentDate = new Date();

  // Formatear fecha
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("es-ES", options);

  // Determinar saludo según la hora del día
  const currentHour = currentDate.getHours();
  let greeting = "Good morning";

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18 || currentHour < 6) {
    greeting = "Good evening";
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-25 via-white to-indigo-25 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {greeting}, {userName}!
        </h1>
        <p className="text-gray-600">It's {formattedDate}</p>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {metricsData.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            percentage={metric.percentage}
            trend={metric.trend}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Gráficos section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer title="Sessions Overview">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
            <p className="text-gray-500">Line Chart will be here</p>
          </div>
        </ChartContainer>

        <ChartContainer title="Conversion Rate">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
            <p className="text-gray-500">Pie Chart will be here</p>
          </div>
        </ChartContainer>
      </div>

      {/* Additional sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer title="Acquisition Channels">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
            <p className="text-gray-500">Bar Chart will be here</p>
          </div>
        </ChartContainer>

        <ChartContainer title="Employment Status">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
            <p className="text-gray-500">Donut Chart will be here</p>
          </div>
        </ChartContainer>

        <ChartContainer title="Performance">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
            <p className="text-gray-500">Metrics will be here</p>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Overview;
