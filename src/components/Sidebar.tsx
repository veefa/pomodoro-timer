import React from "react";
import { GiTomato } from "react-icons/gi";
import { IoTimerOutline } from "react-icons/io5";
import {
  AiOutlineUnorderedList,
  AiOutlinePieChart,
  AiOutlineCalendar,
  AiOutlineBell,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import TaskList from "./TaskList";

const Sidebar: React.FC = () => {
  return (
    <aside className="flex">
      {/* Icon rail */}
      <div className="w-16 bg-[#111] flex flex-col items-center py-3 border-r border-gray-800">
        <nav className="flex flex-col items-center gap-3 w-full">
          <button
            aria-label="Pomodoro"
            title="Pomodoro"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-yellow-400 bg-[#26221f] shadow-sm transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <GiTomato size={20} />
          </button>

          <button
            aria-label="Timer"
            title="Timer"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1c1c1c] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600">
            <IoTimerOutline size={18} />
          </button>

          <button
            aria-label="Tasks"
            title="Tasks"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1c1c1c] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600">
            <AiOutlineUnorderedList size={20} />
          </button>

          <button
            aria-label="Reports"
            title="Reports"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1c1c1c] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600">
            <AiOutlinePieChart size={20} />
          </button>

          <button
            aria-label="Calendar"
            title="Calendar"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1c1c1c] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600">
            <AiOutlineCalendar size={20} />
          </button>

          <button
            aria-label="Notifications"
            title="Notifications"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1c1c1c] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600">
            <AiOutlineBell size={20} />
          </button>
        </nav>

        <div className="flex-1" />

        <div className="mb-2">
          <button
            aria-label="Profile"
            title="Profile"
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-100 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <FaUser size={14} />
          </button>
        </div>
      </div>

      <TaskList />
    </aside>
  );
};

export default Sidebar;
