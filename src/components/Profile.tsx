import React from "react";
import type { User } from "./types";

interface ProfileProps {
  user?: User; // user is optional now
  onLogin?: () => void; // optional callback for login button
  onLogout?: () => void; // optional logout handler
}

const Profile: React.FC<ProfileProps> = ({ user, onLogin, onLogout }) => {
  if (!user) {
    // 🔒 Not logged in view
    return (
      <div className="text-center p-4 text-gray-300">
        <p className="mb-3">You need to be logged in.</p>
        <button
          onClick={onLogin}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition">
          Log In
        </button>
      </div>
    );
  }

  // 👤 Logged-in view
  return (
    <div className="flex flex-col items-center p-4 bg-[#1b1b1b] rounded-lg">
      {user.avatar && (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full mb-3"
        />
      )}
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-400 mb-3">{user.email}</p>

      <div className="flex gap-3">
        <button
          className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm">
          Settings
        </button>
        <button
          onClick={onLogout}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;