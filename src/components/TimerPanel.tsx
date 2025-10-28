import React from "react"


 
const Sidebar: React.FC = () => {
    return (  
    <div className="w-64 bg-[#252525] p-4 border-r border-gray-700">
      <h2 className="text-2xl mb-4">Tasks</h2>
      <div className="text-gray-500 text-sm h-full flex items-center justify-center border border-dashed border-neutral-700 rounded-md p-4">
        No tasks for this day
      </div>
    </div>
    );
}
 
export default Sidebar;