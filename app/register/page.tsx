"use client";

import { useState } from "react";
import Loading from "../components/ui/loading";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`http://127.0.0.1:5000/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not create account, please try again.");
        setLoading(false);
        return;
      }
      window.location.href = "/login";
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#F5F2EB] to-[#FAF9F7] flex items-center justify-center px-6 py-10">
      <div className="max-w-md w-full bg-white rounded-xl border border-[#E5E0D9] shadow-sm p-8">
        {/* Heading */}
        <h1 className="text-3xl font-playfair-display text-center text-[#5b56a5] mb-4">
          Create Account
        </h1>
        <p className="text-gray-600 text-center text-sm mb-8">
          Join Al Bayan Academy and begin your journey
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="text-gray-700 text-sm font-light">
              Full Name{" "}
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b56a5]/40"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm font-light">
              Email Address
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b56a5]/40"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Email */}

          {/* Password */}
          <div>
            <label className="text-gray-700 text-sm font-light">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b56a5]/40"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#5b56a5] hover:bg-[#4f4a94] text-white rounded-lg transition-colors"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-6">
          <a href="/login" className="text-sm text-[#5b56a5] hover:underline">
            Already have an account? Login
          </a>
        </div>
      </div>
    </section>
  );
}
