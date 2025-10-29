import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TimerPanel from "./components/TimerPanel";
import Calendar from "./components/Calendar";
import Notifications from "./components/Notification";
import TaskList from "./components/TaskList";
import Sidebar from "./components/Sidebar";

// Placeholder components for routes that aren't implemented yet



const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#121212] text-white">
        {/* Header */}
        <header className="h-16 w-full bg-[#1f1f1f] flex items-center justify-between px-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
          <nav className="flex gap-4">
            <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
              Profile
            </button>
            <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition">
              Settings
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          {/* Main Panel */}
          <main className="flex-1 p-6 flex flex-col overflow-auto">
            <Routes>
             
              <Route path="/timer" element={<TimerPanel />} />
              <Route path="/tasks" element={<TaskList />} />
             
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
