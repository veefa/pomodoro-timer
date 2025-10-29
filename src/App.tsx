import React from "react";


import TimerPanel from "./components/TimerPanel";
import Tabs from "./components/Tabs";
//import TaskList from "./components/TaskList";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
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
          <Tabs />
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <TimerPanel />
            {/* <TaskList /> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
