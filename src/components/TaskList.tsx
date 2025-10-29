import React, { useEffect, useRef, useState } from "react";

type Task = {
  id: string;
  text: string;
  completed?: boolean;
};

const STORAGE_KEY = "pomodoro_tasks";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 🧠 Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse stored tasks:", err);
      }
    }
  }, []);

  // 💾 Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (showInput) inputRef.current?.focus();
  }, [showInput]);

  // ➕ Add new task
  const addTask = () => {
    const text = input.trim();
    if (!text) return;

    const newTask: Task = { id: Date.now().toString(), text, completed: false };
    setTasks((prev) => [...prev, newTask]);

    setInput("");
    setShowInput(false);
  };

  // ❌ Cancel adding
  const cancelInput = () => {
    setInput("");
    setShowInput(false);
  };

  // ✅ Mark a task complete/incomplete
  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 🗑️ Delete a task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ⌨️ Keyboard controls
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask();
    if (e.key === "Escape") cancelInput();
  };

  return (
    <div className="w-64 bg-[#252525] p-4 border-r border-gray-700 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-6">Todo Tasks</h2>

        <div className="flex flex-col gap-2">
          {tasks.length === 0 ? (
            <div className="text-gray-500 text-sm h-32 flex items-center justify-center border border-dashed border-neutral-700 rounded-md p-4">
              No tasks for this day
            </div>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-auto">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="text-sm text-gray-300 bg-[#2a2a2a] rounded px-3 py-2 flex items-center justify-between">
                  <span
                    onClick={() => toggleComplete(t.id)}
                    className={`cursor-pointer ${
                      t.completed ? "line-through text-gray-500" : ""
                    }`}>
                    {t.text}
                  </span>
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-400 hover:text-red-100 ml-2 text-xs">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

          {showInput && (
            <div className="mt-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="New task"
                placeholder="Type a task and press Enter"
                className="w-full px-3 py-2 rounded bg-neutral-800 text-sm text-gray-100 placeholder-gray-500"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={addTask}
                  className="px-3 py-1 rounded bg-gray-600 text-sm hover:bg-gray-500">
                  Add
                </button>
                <button
                  onClick={cancelInput}
                  className="px-3 py-1 rounded bg-neutral-700 text-sm hover:bg-neutral-600">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="mt-6 text-sm text-gray-400 hover:text-white transition text-left"
          aria-label="Add new task">
          + Add new task
        </button>
      )}
    </div>
  );
};

export default TaskList;