import React, { useState, useEffect } from "react";
import MetricCard from "../../charts/MetricCard";
import ChartContainer from "../../charts/ChartContainer";

const Overview = () => {
  const [metricsData, setMetricsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.nombre || "Usuario";

  // Obtener fecha actual formateada
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Determinar saludo según la hora del día
  const currentHour = currentDate.getHours();
  let greeting = "Good morning";

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18 || currentHour < 6) {
    // eslint-disable-next-line
    greeting = "Good evening";
  }

  // Obtener métricas reales desde el backend
  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/ga4/dashboard-metrics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener métricas");
      }

      const data = await response.json();
      setMetricsData(data.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  // Datos de ejemplo como fallback
  const fallbackMetrics = [
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

  // Formatear datos desde la API o usar fallback
  const formattedMetrics =
    metricsData.length > 0
      ? [
          {
            title: "Active Users",
            value: metricsData[0]?.active_users?.toString() || "0",
            percentage: "3.5%",
            trend: "up",
            icon: "👥",
            color: "purple",
          },
          {
            title: "Sessions",
            value: metricsData[0]?.sessions?.toString() || "0",
            percentage: "5%",
            trend: "up",
            icon: "📊",
            color: "blue",
          },
          {
            title: "Avg. Duration",
            value: "3m 12s",
            percentage: "1.2%",
            trend: "up",
            icon: "⏱️",
            color: "green",
          },
          {
            title: "With Interaction",
            value: metricsData[0]?.sessions_with_interaction?.toString() || "0",
            percentage: "4.3%",
            trend: "up",
            icon: "💬",
            color: "pink",
          },
          {
            title: "Bounce Rate",
            value: metricsData[0]?.bounce_rate?.toString() + "%" || "0%",
            percentage: "2%",
            trend: "down",
            icon: "↗",
            color: "orange",
          },
        ]
      : fallbackMetrics;

  if (loading) {
    return (
      <div className="p-6 bg-gradient-to-br from-purple-25 via-white to-indigo-25 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <p>Cargando métricas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-purple-25 via-white to-indigo-25 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-25 via-white to-indigo-25 min-h-screen">
      {/* Header */}

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {formattedMetrics.map((metric, index) => (
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

      {/* Resto del código permanece igual */}
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
