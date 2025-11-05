import React, { useState } from "react";

interface LoginProps {
  onLogin: (user: { name: string; email: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [emailOrName, setEmailOrName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrName || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Here you could check credentials, or just simulate login for now
    const user = {
      name: emailOrName.includes("@") ? emailOrName.split("@")[0] : emailOrName,
      email: emailOrName.includes("@") ? emailOrName : `${emailOrName}@demo.com`,
    };

    localStorage.setItem("app:user", JSON.stringify(user)); // persist login
    onLogin(user);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1b1b1b]">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 p-8 rounded-xl shadow-lg w-80"
      >
        <h2 className="text-xl font-semibold text-white mb-6 text-center">
          Login
        </h2>

        {error && (
          <div className="text-red-400 text-sm mb-3 text-center">{error}</div>
        )}

        <label className="block mb-4">
          <span className="text-gray-400 text-sm">Username or Email</span>
          <input
            type="text"
            value={emailOrName}
            onChange={(e) => setEmailOrName(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white focus:outline-none"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-400 text-sm">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded bg-neutral-800 text-white focus:outline-none"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded transition"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;