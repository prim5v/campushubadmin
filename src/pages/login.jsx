import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import { Button } from "../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", otp: "" });
  const [error, setError] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setAttemptsLeft(null);
    setLoading(true);

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.error || "Login failed");
      if (err?.attempts_left !== undefined) setAttemptsLeft(err.attempts_left);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-200 p-10">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Admin Portal
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter your credentials to access the dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP Code
            </label>
            <input
              type="text"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              required
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">
              {error}
              {attemptsLeft !== null && <div>Attempts left: {attemptsLeft}</div>}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CampusHub. All rights reserved.
        </div>
      </div>
    </div>
  );
}