import React from "react";

const Tabs: React.FC = () => {
  return (
    <div className="flex gap-4 mb-4">
      <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition">
        Timer
      </button>
      <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition">
        Tasks
      </button>
    </div>
  );
};

export default Tabs;