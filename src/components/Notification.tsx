import React from "react";

const Notifications: React.FC = () => {
  // Placeholder notifications array
  const notifications = [
    { id: 1, message: "Time to start your next Pomodoro!", time: "09:00 AM" },
    { id: 2, message: "Break is over. Back to focus!", time: "09:25 AM" },
  ];

  return (
    <div className="flex flex-col h-full p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-400">No notifications yet</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className="bg-[#1f1f1f] p-4 rounded-md border border-gray-700"
            >
              <p className="text-white">{notif.message}</p>
              <p className="text-gray-400 text-sm">{notif.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;