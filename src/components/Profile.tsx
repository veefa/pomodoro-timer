import React, { useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Load user from localStorage when page loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const newUser = { name: email.split("@")[0], email };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // If not logged in → show login form
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white">
        <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-md w-80 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-neutral-800 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-neutral-800 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded bg-gray-600 hover:bg-gray-500 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Logged-in view → just show name & logout at bottom
  return (
    <div className="flex flex-col justify-between h-full text-white p-6">
      {/* Top section: username */}
      <div>
        <h2 className="text-2xl text-gray-300 font-semibold mb-2">Welcome {user.name},</h2>
      </div>

      {/* Bottom section: logout button */}
      <div className="flex justify-center items-end flex-1">
  <button
    onClick={handleLogout}
    className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-sm mb-4"
  >
    Log out
  </button>
</div>
    </div>
  );
};

export default Profile;