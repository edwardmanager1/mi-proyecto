import React from "react";

const ChartContainer = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}
    >
      {title && <h3 className="text-gray-800 font-medium mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default ChartContainer;
