import React from "react"

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#252525] p-4 border-r border-gray-700 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-6">Pomodoro Tasks</h2>
        <div className="text-gray-500 text-sm h-full flex items-center justify-center border border-dashed border-neutral-700 rounded-md p-4">
          No tasks for this day
        </div>
      </div>

      <button className="mt-6 text-sm text-gray-400 hover:text-white transition">
        + Add new task
      </button>
    </div>
  )
}

export default Sidebar