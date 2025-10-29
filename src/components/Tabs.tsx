import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Tabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Only show tabs on timer route
  if (currentPath !== "/" && currentPath !== "/timer") return null;

  const isActive = (path: string) =>
    currentPath === path || (path === "/timer" && currentPath === "/");

  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={() => navigate("/timer")}
        className={`px-3 py-1 rounded transition ${
          isActive("/timer")
            ? "bg-gray-600 text-white"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}>
        Timer
      </button>
      <button
        onClick={() => navigate("/tasks")}
        className={`px-3 py-1 rounded transition ${
          currentPath === "/tasks"
            ? "bg-gray-600 text-white"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}>
        Tasks
      </button>
    </div>
  );
};

export default Tabs;
