import React from "react";
import { GiTomato } from "react-icons/gi";
import {
  AiOutlineUnorderedList,
  AiOutlineCalendar,
  AiOutlineBell,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    currentPath === path || (path === "/" && currentPath === "/timer");

  return (
    <aside className="flex">
      {/* Icon rail */}
      <div className="w-16 bg-[#111] flex flex-col items-center py-3 border-r border-gray-800">
        <nav className="flex flex-col items-center gap-3 w-full">
          <button
            onClick={() => navigate("/timer")}
            aria-label="Pomodoro"
            title="Pomodoro"
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              isActive("/")
                ? "text-yellow-400 bg-[#26221f] shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-[#1c1c1c]"
            }`}>
            <GiTomato size={20} />
          </button>

       

          <button
            onClick={() => navigate("/tasks")}
            aria-label="Tasks"
            title="Tasks"
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 ${
              isActive("/tasks")
                ? "text-yellow-400 bg-[#26221f] shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-[#1c1c1c]"
            }`}>
            <AiOutlineUnorderedList size={20} />
          </button>

          <button
            aria-label="Calendar"
            title="Calendar"
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 ${
              isActive("/calendar")
                ? "text-yellow-400 bg-[#26221f] shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-[#1c1c1c]"
            }`}>
            <AiOutlineCalendar size={20} />
          </button>

          <button
            aria-label="Notifications"
            title="Notifications"
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 ${
              isActive("/notifications")
                ? "text-yellow-400 bg-[#26221f] shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-[#1c1c1c]"
            }`}>
            <AiOutlineBell size={20} />
          </button>
        </nav>

        <div className="flex-1" />

        <div className="mb-2">
          <button
            onClick={() => navigate("/profile")}
            aria-label="Profile"
            title="Profile"
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <FaUser size={14} />

          </button>
        </div>
      </div>

      {/* Only show TaskList in tasks route */}
     
    </aside>
  );
};

export default Sidebar;
