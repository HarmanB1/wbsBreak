import React, { useState } from "react";
import { registerUser, login } from "../api/authConnect"; 
import { NavLink } from "react-router";

export const LogIn = () => {
  const [activeTab, setActiveTab] = useState("signup"); // default: signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const[confirmPassword, setConfirmPassword]= useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (activeTab === "signup") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const data = await registerUser({ name, email, password });
      } else {
        const data = await login(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      {/* Return Button */}
      <NavLink
        to="/"
        className="absolute top-4 left-4 text-orange-600 hover:text-orange-700 font-medium"
      >
        ← Return
      </NavLink>

      <div className="bg-orange-100 rounded-xl shadow-lg w-full max-w-md">
        {/* Tabs */}
        <div className="flex">
          {["signup", "login"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center font-semibold transition duration-200 ${
                activeTab === tab
                  ? tab === "signup"
                    ? "border-b-2 border-orange-500 text-orange-700"
                    : "border-b-2 border-orange-400 text-orange-600"
                  : "text-orange-700/70"
              }`}
            >
              {tab === "signup" ? "Sign Up" : "Login"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <h2
            className={`text-center text-2xl font-bold mb-4 ${
              activeTab === "signup" ? "text-orange-700" : "text-orange-600"
            }`}
          >
            {activeTab === "signup" ? "Create an Account" : "Welcome Back"}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}

         
          {activeTab === "signup" && (
            <>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-orange-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-300 bg-white"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-orange-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-300 bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-orange-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-300 bg-white"
            />
          </div>

          {activeTab === "signup" && (
            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium text-orange-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-orange-300 bg-white"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-orange-400 hover:bg-orange-500 text-white rounded transition disabled:opacity-50"
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
