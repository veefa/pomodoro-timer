import React from "react";

const TaskList: React.FC = () => {
  return (
    <div className="bg-[#252525] p-4 rounded-md border border-gray-700 w-full">
      <h3 className="text-lg mb-2">Today's Tasks</h3>
      <div className="text-gray-400 text-sm flex items-center justify-center h-32 border border-dashed border-gray-600 rounded">
        No tasks added yet
      </div>
    </div>
  );
};

export default TaskList;