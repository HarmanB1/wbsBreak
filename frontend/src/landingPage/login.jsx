import React, { useState } from "react";
import { registerUser } from "../api/authConnect"; // Replace with actual login API

export const LogIn = () => {
  const [activeTab, setActiveTab] = useState("signup"); // default: signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (activeTab === "signup") {
        const data = await registerUser(email, password);
        console.log("Signed up:", data);
      } else {
        // Add your loginUser logic here
        console.log("Login attempt with", email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        {/* Tabs */}
        <div className="flex">
          {["signup", "login"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center font-semibold ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab === "signup" ? "Sign Up" : "Login"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-center text-2xl font-bold mb-4">
            {activeTab === "signup" ? "Create an Account" : "Welcome Back"}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading
              ? activeTab === "signup"
                ? "Signing Up..."
                : "Logging In..."
              : activeTab === "signup"
              ? "Sign Up"
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
